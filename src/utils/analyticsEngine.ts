import {
  RawTweet,
  CleanedTweet,
  InfluentialUser,
  SentimentSummary,
  MentionRecord,
  WordFrequency,
  NetworkNode,
  NetworkEdge,
  CommunityRecord,
  WeekdayStats,
  AnalysisWeights,
  AnalysisResults,
  DatasetStats
} from '../types/analytics';
import { ENGLISH_STOPWORDS, SENTIMENT_LEXICON } from './stopwords';

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const SHORT_WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Palette for community clusters
const COMMUNITY_COLORS = [
  '#8b5cf6', // Purple
  '#3b82f6', // Blue
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#f97316', // Orange
  '#6366f1'  // Indigo
];

/**
 * Text Preprocessing & Cleaning (mimicking Python pandas/re/nltk steps)
 */
export function cleanTweetText(rawText: string): {
  cleanedText: string;
  mentions: string[];
  hashtags: string[];
} {
  if (!rawText) return { cleanedText: '', mentions: [], hashtags: [] };

  // 1. Extract mentions using regex r'@(\w+)'
  const mentionMatches = rawText.match(/@(\w+)/g) || [];
  const mentions = mentionMatches.map(m => m.replace('@', '').toLowerCase());

  // 2. Extract hashtags using regex r'#(\w+)'
  const hashtagMatches = rawText.match(/#(\w+)/g) || [];
  const hashtags = hashtagMatches.map(h => h.toLowerCase());

  // 3. Remove URLs (http:// or https://)
  let text = rawText.replace(/https?:\/\/\S+/gi, '');

  // 4. Remove special characters and redundant whitespace, keep words
  text = text.replace(/[^a-zA-Z0-9\s#@]/g, ' ');
  text = text.replace(/\s+/g, ' ').trim().toLowerCase();

  return {
    cleanedText: text,
    mentions,
    hashtags
  };
}

/**
 * Lexicon-based Sentiment Analyzer (mimicking VADER / TextBlob polarity)
 */
export function calculateTweetSentiment(text: string): {
  score: number;
  category: 'positive' | 'negative' | 'neutral';
} {
  const words = text.toLowerCase().match(/\b[a-zA-Z]{2,}\b/g) || [];
  if (words.length === 0) return { score: 0, category: 'neutral' };

  let totalScore = 0;
  let scoredWordsCount = 0;

  for (const word of words) {
    if (SENTIMENT_LEXICON[word] !== undefined) {
      totalScore += SENTIMENT_LEXICON[word];
      scoredWordsCount++;
    }
  }

  // Normalize score between -1.0 and 1.0
  const normalizedScore = scoredWordsCount > 0 ? Math.max(-1, Math.min(1, totalScore / (scoredWordsCount * 2.5))) : 0;

  let category: 'positive' | 'negative' | 'neutral' = 'neutral';
  if (normalizedScore > 0.05) {
    category = 'positive';
  } else if (normalizedScore < -0.05) {
    category = 'negative';
  }

  return { score: normalizedScore, category };
}

/**
 * MinMaxScaler function: (x - min) / (max - min)
 */
function minMaxScale(val: number, min: number, max: number): number {
  if (max === min) return val > 0 ? 1 : 0;
  return Math.max(0, Math.min(1, (val - min) / (max - min)));
}

/**
 * Clean and Preprocess raw dataset
 */
export function preprocessDataset(rawTweets: RawTweet[]): {
  cleaned: CleanedTweet[];
  missingCount: number;
  duplicateCount: number;
} {
  let missingCount = 0;
  let duplicateCount = 0;
  const seenKeys = new Set<string>();
  const cleaned: CleanedTweet[] = [];

  for (let i = 0; i < rawTweets.length; i++) {
    const raw = rawTweets[i];

    // Check missing values
    if (!raw.text || !raw.user_name) {
      missingCount++;
      continue;
    }

    // Deduplication key: combination of user_name and text substring
    const dedupKey = `${raw.user_name.toLowerCase().trim()}_${raw.text.trim().slice(0, 60)}`;
    if (seenKeys.has(dedupKey)) {
      duplicateCount++;
      continue;
    }
    seenKeys.add(dedupKey);

    const { cleanedText, mentions, hashtags } = cleanTweetText(raw.text);
    const { score, category } = calculateTweetSentiment(raw.text);

    // Parse date
    let date = new Date(raw.created_at);
    if (isNaN(date.getTime())) {
      date = new Date(); // fallback
    }

    const dayIndex = date.getDay(); // 0-6
    const weekday = WEEKDAYS[dayIndex];

    const retweets = Number(raw.retweet_count) || 0;
    const likes = Number(raw.favorite_count) || 0;
    const followers = Number(raw.followers_count) || 0;

    // Reach formula: followers * (retweets + 1)
    const reach = followers * (retweets + 1);

    cleaned.push({
      id: String(raw.id || `tw_${i}`),
      userName: raw.user_name.trim().toLowerCase(),
      screenName: raw.user_screen_name || raw.user_name,
      rawText: raw.text,
      cleanedText,
      createdAt: date,
      weekday,
      weekdayIndex: dayIndex,
      retweets,
      likes,
      followers,
      mentions,
      hashtags,
      sentiment: category,
      sentimentScore: score,
      reach
    });
  }

  return { cleaned, missingCount, duplicateCount };
}

/**
 * Compute Influential Users with MinMaxScaler & Weighted Scoring
 */
export function computeInfluentialUsers(
  cleaned: CleanedTweet[],
  weights: AnalysisWeights = { retweets: 0.4, likes: 0.3, followers: 0.3 }
): InfluentialUser[] {
  const userMap = new Map<string, {
    screenName: string;
    followers: number;
    totalLikes: number;
    totalRetweets: number;
    tweetCount: number;
    sentimentSum: number;
    reach: number;
  }>();

  for (const tweet of cleaned) {
    const key = tweet.userName;
    const existing = userMap.get(key);
    if (!existing) {
      userMap.set(key, {
        screenName: tweet.screenName,
        followers: tweet.followers,
        totalLikes: tweet.likes,
        totalRetweets: tweet.retweets,
        tweetCount: 1,
        sentimentSum: tweet.sentimentScore,
        reach: tweet.reach
      });
    } else {
      existing.followers = Math.max(existing.followers, tweet.followers);
      existing.totalLikes += tweet.likes;
      existing.totalRetweets += tweet.retweets;
      existing.tweetCount += 1;
      existing.sentimentSum += tweet.sentimentScore;
      existing.reach += tweet.reach;
    }
  }

  const usersArray = Array.from(userMap.entries()).map(([userName, data]) => ({
    userName,
    ...data,
    avgEngagement: data.tweetCount > 0 ? (data.totalLikes + data.totalRetweets) / data.tweetCount : 0,
    avgSentiment: data.tweetCount > 0 ? data.sentimentSum / data.tweetCount : 0
  }));

  if (usersArray.length === 0) return [];

  // Find min and max for MinMaxScaler
  const followersList = usersArray.map(u => u.followers);
  const likesList = usersArray.map(u => u.totalLikes);
  const retweetsList = usersArray.map(u => u.totalRetweets);

  const minF = Math.min(...followersList);
  const maxF = Math.max(...followersList);

  const minL = Math.min(...likesList);
  const maxL = Math.max(...likesList);

  const minR = Math.min(...retweetsList);
  const maxR = Math.max(...retweetsList);

  // Normalize weights so sum equals 1.0
  const weightTotal = (weights.retweets + weights.likes + weights.followers) || 1;
  const wR = weights.retweets / weightTotal;
  const wL = weights.likes / weightTotal;
  const wF = weights.followers / weightTotal;

  // Compute scaled metrics and final score
  const scoredUsers = usersArray.map(u => {
    const normF = minMaxScale(u.followers, minF, maxF);
    const normL = minMaxScale(u.totalLikes, minL, maxL);
    const normR = minMaxScale(u.totalRetweets, minR, maxR);

    // Weighted influence score on a 0 - 100 scale
    const influenceScore = (wR * normR + wL * normL + wF * normF) * 100;

    let primarySentiment = 'Neutral';
    if (u.avgSentiment > 0.1) primarySentiment = 'Positive';
    else if (u.avgSentiment < -0.1) primarySentiment = 'Negative';

    return {
      rank: 0,
      userName: u.userName,
      screenName: u.screenName,
      followers: u.followers,
      totalLikes: u.totalLikes,
      totalRetweets: u.totalRetweets,
      tweetCount: u.tweetCount,
      avgEngagementPerTweet: Math.round(u.avgEngagement),
      reach: u.reach,
      normalizedFollowers: Number(normF.toFixed(4)),
      normalizedLikes: Number(normL.toFixed(4)),
      normalizedRetweets: Number(normR.toFixed(4)),
      influenceScore: Number(influenceScore.toFixed(2)),
      primarySentiment
    };
  });

  // Sort descending by influence score
  scoredUsers.sort((a, b) => b.influenceScore - a.influenceScore);

  // Assign ranks
  scoredUsers.forEach((u, idx) => {
    u.rank = idx + 1;
  });

  return scoredUsers;
}

/**
 * Sentiment Summary
 */
export function computeSentimentSummary(cleaned: CleanedTweet[]): SentimentSummary {
  const total = cleaned.length;
  if (total === 0) {
    return {
      positiveCount: 0,
      negativeCount: 0,
      neutralCount: 0,
      positivePct: 0,
      negativePct: 0,
      neutralPct: 0,
      avgScore: 0
    };
  }

  let pos = 0;
  let neg = 0;
  let neu = 0;
  let scoreSum = 0;

  for (const t of cleaned) {
    if (t.sentiment === 'positive') pos++;
    else if (t.sentiment === 'negative') neg++;
    else neu++;
    scoreSum += t.sentimentScore;
  }

  return {
    positiveCount: pos,
    negativeCount: neg,
    neutralCount: neu,
    positivePct: Number(((pos / total) * 100).toFixed(1)),
    negativePct: Number(((neg / total) * 100).toFixed(1)),
    neutralPct: Number(((neu / total) * 100).toFixed(1)),
    avgScore: Number((scoreSum / total).toFixed(3))
  };
}

/**
 * Top Mentioned Users Analysis
 */
export function computeMentions(cleaned: CleanedTweet[]): MentionRecord[] {
  const mentionCountMap = new Map<string, number>();

  for (const tweet of cleaned) {
    for (const mention of tweet.mentions) {
      mentionCountMap.set(mention, (mentionCountMap.get(mention) || 0) + 1);
    }
  }

  const totalMentions = Array.from(mentionCountMap.values()).reduce((a, b) => a + b, 0);
  const sorted = Array.from(mentionCountMap.entries())
    .map(([userName, count]) => ({
      userName,
      count,
      percentage: totalMentions > 0 ? Number(((count / totalMentions) * 100).toFixed(1)) : 0,
      inDegree: count
    }))
    .sort((a, b) => b.count - a.count);

  return sorted.slice(0, 15).map((item, idx) => ({
    rank: idx + 1,
    ...item
  }));
}

/**
 * Top 20 Frequently Used Words (excluding Stopwords)
 */
export function computeTrendingWords(cleaned: CleanedTweet[], topN = 20): WordFrequency[] {
  const wordCountMap = new Map<string, number>();

  for (const tweet of cleaned) {
    const words = tweet.cleanedText.match(/\b[a-zA-Z]{3,}\b/g) || [];
    for (const w of words) {
      if (!ENGLISH_STOPWORDS.has(w) && w.length >= 3) {
        wordCountMap.set(w, (wordCountMap.get(w) || 0) + 1);
      }
    }
  }

  const total = Array.from(wordCountMap.values()).reduce((a, b) => a + b, 0);
  const sorted = Array.from(wordCountMap.entries())
    .map(([word, count]) => ({
      word,
      count,
      percentage: total > 0 ? Number(((count / total) * 100).toFixed(2)) : 0
    }))
    .sort((a, b) => b.count - a.count);

  return sorted.slice(0, topN);
}

/**
 * Top Trending Hashtags
 */
export function computeTrendingHashtags(cleaned: CleanedTweet[], topN = 10): WordFrequency[] {
  const hashtagMap = new Map<string, number>();

  for (const tweet of cleaned) {
    for (const tag of tweet.hashtags) {
      hashtagMap.set(tag, (hashtagMap.get(tag) || 0) + 1);
    }
  }

  const total = Array.from(hashtagMap.values()).reduce((a, b) => a + b, 0);
  return Array.from(hashtagMap.entries())
    .map(([word, count]) => ({
      word,
      count,
      percentage: total > 0 ? Number(((count / total) * 100).toFixed(1)) : 0
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);
}

/**
 * Social Network Graph Construction, Degree Centrality, PageRank, and Community Detection
 */
export function computeSocialNetworkGraph(
  cleaned: CleanedTweet[]
): {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  communities: CommunityRecord[];
} {
  // Edge weight: number of mentions from source to target
  const edgeMap = new Map<string, { source: string; target: string; weight: number }>();
  const allUserIds = new Set<string>();
  const userFollowersMap = new Map<string, number>();

  for (const tweet of cleaned) {
    const source = tweet.userName;
    allUserIds.add(source);
    userFollowersMap.set(source, Math.max(userFollowersMap.get(source) || 0, tweet.followers));

    for (const mention of tweet.mentions) {
      // Exclude empty mentions and self-mentions
      if (!mention || mention.toLowerCase() === source.toLowerCase()) continue;
      allUserIds.add(mention);
      if (!userFollowersMap.has(mention)) {
        userFollowersMap.set(mention, 50000); // baseline
      }

      const edgeKey = `${source}->${mention}`;
      const existing = edgeMap.get(edgeKey);
      if (existing) {
        existing.weight += 1;
      } else {
        edgeMap.set(edgeKey, { source, target: mention, weight: 1 });
      }
    }
  }

  const edges: NetworkEdge[] = Array.from(edgeMap.values());
  const nodeIds = Array.from(allUserIds);
  const N = nodeIds.length;

  if (N === 0) {
    return { nodes: [], edges: [], communities: [] };
  }

  // 1. Calculate In-Degree and Out-Degree
  const inDegreeMap = new Map<string, number>();
  const outDegreeMap = new Map<string, number>();
  const inEdgesMap = new Map<string, { source: string; weight: number }[]>();
  const adjacencyList = new Map<string, string[]>(); // out-neighbors
  const inNeighbors = new Map<string, string[]>(); // in-neighbors

  for (const id of nodeIds) {
    inDegreeMap.set(id, 0);
    outDegreeMap.set(id, 0);
    inEdgesMap.set(id, []);
    adjacencyList.set(id, []);
    inNeighbors.set(id, []);
  }

  for (const edge of edges) {
    outDegreeMap.set(edge.source, (outDegreeMap.get(edge.source) || 0) + edge.weight);
    inDegreeMap.set(edge.target, (inDegreeMap.get(edge.target) || 0) + edge.weight);
    inEdgesMap.get(edge.target)?.push({ source: edge.source, weight: edge.weight });
    adjacencyList.get(edge.source)?.push(edge.target);
    inNeighbors.get(edge.target)?.push(edge.source);
  }

  // Degree Centrality formula: C_D(v) = degree(v) / (N - 1)
  const denom = N > 1 ? N - 1 : 1;

  // 2. Compute PageRank using standard Weighted Power Iteration (alpha = 0.85)
  // Matching NetworkX nx.pagerank(G, alpha=0.85, weight='weight')
  const alpha = 0.85;
  const maxIterations = 100;
  const tolerance = 1e-6;

  let pageRank = new Map<string, number>();
  // Initial uniform probability: sum(PR) = 1.0
  for (const id of nodeIds) {
    pageRank.set(id, 1 / N);
  }

  for (let iter = 0; iter < maxIterations; iter++) {
    const nextRank = new Map<string, number>();
    let danglingSum = 0;

    for (const id of nodeIds) {
      const outWeight = outDegreeMap.get(id) || 0;
      if (outWeight === 0) {
        danglingSum += pageRank.get(id) || 0;
      }
    }

    let diff = 0;
    for (const id of nodeIds) {
      let sumIncoming = 0;
      const incomingEdges = inEdgesMap.get(id) || [];
      for (const inEdge of incomingEdges) {
        const srcTotalOutWeight = outDegreeMap.get(inEdge.source) || 1;
        sumIncoming += (pageRank.get(inEdge.source) || 0) * (inEdge.weight / srcTotalOutWeight);
      }

      const newPR = (1 - alpha) / N + alpha * (sumIncoming + danglingSum / N);
      nextRank.set(id, newPR);
      diff += Math.abs(newPR - (pageRank.get(id) || 0));
    }

    pageRank = nextRank;
    if (diff < tolerance) {
      break;
    }
  }

  // 3. Community Detection using Label Propagation Algorithm
  // An efficient modularity-friendly clustering approach in graph theory
  const communityMap = new Map<string, number>();
  // Initial assignment: each node has unique community
  nodeIds.forEach((id, idx) => {
    communityMap.set(id, idx);
  });

  const numLpaIters = 15;
  for (let i = 0; i < numLpaIters; i++) {
    // Shuffle nodeIds for unbiased propagation
    const shuffled = [...nodeIds].sort(() => Math.random() - 0.5);
    for (const id of shuffled) {
      const neighbors = [
        ...(adjacencyList.get(id) || []),
        ...(inNeighbors.get(id) || [])
      ];

      if (neighbors.length === 0) continue;

      // Count neighbor community frequencies
      const freq = new Map<number, number>();
      for (const n of neighbors) {
        const comm = communityMap.get(n)!;
        freq.set(comm, (freq.get(comm) || 0) + 1);
      }

      // Find highest frequency community
      let maxComm = communityMap.get(id)!;
      let maxCount = -1;
      for (const [comm, count] of freq.entries()) {
        if (count > maxCount) {
          maxCount = count;
          maxComm = comm;
        }
      }
      communityMap.set(id, maxComm);
    }
  }

  // Normalize community IDs to consecutive integers 0, 1, 2...
  const rawCommunitySizes = new Map<number, number>();
  for (const comm of communityMap.values()) {
    rawCommunitySizes.set(comm, (rawCommunitySizes.get(comm) || 0) + 1);
  }

  // Sort communities by size descending
  const sortedCommIds = Array.from(rawCommunitySizes.entries())
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);

  const commIdRemap = new Map<number, number>();
  sortedCommIds.forEach((oldId, newIdx) => {
    commIdRemap.set(oldId, newIdx);
  });

  const finalNodes: NetworkNode[] = nodeIds.map(id => {
    const inDeg = inDegreeMap.get(id) || 0;
    const outDeg = outDegreeMap.get(id) || 0;
    const totalDeg = inDeg + outDeg;
    const commId = commIdRemap.get(communityMap.get(id)!) ?? 0;
    const color = COMMUNITY_COLORS[commId % COMMUNITY_COLORS.length];

    return {
      id,
      label: `@${id}`,
      followers: userFollowersMap.get(id) || 10000,
      inDegree: inDeg,
      outDegree: outDeg,
      degreeCentrality: Number((totalDeg / denom).toFixed(4)),
      inDegreeCentrality: Number((inDeg / denom).toFixed(4)),
      pageRank: Number(((pageRank.get(id) || 0) * 100).toFixed(4)),
      communityId: commId,
      communityColor: color
    };
  });

  // Compile Community records
  const communityClusters = new Map<number, string[]>();
  finalNodes.forEach(node => {
    if (!communityClusters.has(node.communityId)) {
      communityClusters.set(node.communityId, []);
    }
    communityClusters.get(node.communityId)!.push(node.id);
  });

  const communityRecords: CommunityRecord[] = Array.from(communityClusters.entries())
    .map(([commId, memberIds]) => {
      // Find top users by PageRank in this community
      const topMembers = memberIds
        .map(mid => finalNodes.find(n => n.id === mid)!)
        .filter(Boolean)
        .sort((a, b) => b.pageRank - a.pageRank)
        .slice(0, 4)
        .map(m => `@${m.id}`);

      // Gather keywords from tweets by members of this community
      const memberSet = new Set(memberIds);
      const commTweets = cleaned.filter(t => memberSet.has(t.userName));
      const wordFreq = computeTrendingWords(commTweets, 3).map(w => `#${w.word}`);

      const size = memberIds.length;
      const percentage = Number(((size / N) * 100).toFixed(1));

      const commNames = [
        'AI Foundation & LLM Leaders',
        'Open Source & PyTorch Ecosystem',
        'Industry Analysts & Tech News',
        'Research, Academic & Graph Theory',
        'DevOps, Hardware & Cloud Systems',
        'Community Practitioners & Creators'
      ];

      return {
        id: commId,
        name: commNames[commId] || `Community Cluster #${commId + 1}`,
        size,
        percentage,
        color: COMMUNITY_COLORS[commId % COMMUNITY_COLORS.length],
        leadUsers: topMembers,
        dominantKeywords: wordFreq.length > 0 ? wordFreq : ['#AI', '#Tech', '#OpenSource']
      };
    })
    .sort((a, b) => b.size - a.size);

  return {
    nodes: finalNodes,
    edges,
    communities: communityRecords
  };
}

/**
 * Weekday Activity Aggregation (Monday - Sunday breakdown)
 */
export function computeWeekdayActivity(cleaned: CleanedTweet[]): WeekdayStats[] {
  // Day order starting from Monday
  const order = [1, 2, 3, 4, 5, 6, 0]; // Mon, Tue, Wed, Thu, Fri, Sat, Sun

  return order.map(dayIdx => {
    const dayTweets = cleaned.filter(t => t.weekdayIndex === dayIdx);
    const count = dayTweets.length;
    const likes = dayTweets.reduce((acc, t) => acc + t.likes, 0);
    const retweets = dayTweets.reduce((acc, t) => acc + t.retweets, 0);
    const avgEngagement = count > 0 ? Math.round((likes + retweets) / count) : 0;
    const posCount = dayTweets.filter(t => t.sentiment === 'positive').length;
    const posPct = count > 0 ? Number(((posCount / count) * 100).toFixed(1)) : 0;

    return {
      weekday: WEEKDAYS[dayIdx],
      shortName: SHORT_WEEKDAYS[dayIdx],
      dayIndex: dayIdx,
      tweetCount: count,
      totalLikes: likes,
      totalRetweets: retweets,
      avgEngagement,
      positiveSentimentPct: posPct
    };
  });
}

/**
 * Full Pipeline Runner
 */
export function runAnalysis(
  rawTweets: RawTweet[],
  weights: AnalysisWeights = { retweets: 0.4, likes: 0.3, followers: 0.3 },
  isSampleData = true,
  datasetName = 'Benchmark Kaggle Twitter Dataset'
): AnalysisResults {
  const { cleaned, missingCount, duplicateCount } = preprocessDataset(rawTweets);
  const influentialUsers = computeInfluentialUsers(cleaned, weights);
  const sentiment = computeSentimentSummary(cleaned);
  const mentions = computeMentions(cleaned);
  const trendingWords = computeTrendingWords(cleaned, 20);
  const trendingHashtags = computeTrendingHashtags(cleaned, 10);
  const { nodes: graphNodes, edges: graphEdges, communities } = computeSocialNetworkGraph(cleaned);
  const weekdayStats = computeWeekdayActivity(cleaned);

  // Overall dataset summary stats
  const totalRetweets = cleaned.reduce((acc, t) => acc + t.retweets, 0);
  const totalLikes = cleaned.reduce((acc, t) => acc + t.likes, 0);
  const uniqueUsers = new Set(cleaned.map(t => t.userName)).size;
  const avgFollowers = uniqueUsers > 0
    ? Math.round(influentialUsers.reduce((acc, u) => acc + u.followers, 0) / uniqueUsers)
    : 0;

  const dates = cleaned.map(t => t.createdAt.getTime()).filter(t => !isNaN(t));
  let startDate = 'N/A';
  let endDate = 'N/A';
  if (dates.length > 0) {
    startDate = new Date(Math.min(...dates)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    endDate = new Date(Math.max(...dates)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  const stats: DatasetStats = {
    totalTweets: cleaned.length,
    uniqueUsers,
    totalRetweets,
    totalLikes,
    avgFollowers,
    totalMentions: mentions.reduce((acc, m) => acc + m.count, 0),
    dateRange: { start: startDate, end: endDate },
    missingValuesHandled: missingCount,
    duplicatesRemoved: duplicateCount
  };

  return {
    stats,
    cleanedTweets: cleaned,
    influentialUsers,
    sentiment,
    mentions,
    trendingWords,
    trendingHashtags,
    graphNodes,
    graphEdges,
    communities,
    weekdayStats,
    isSampleData,
    datasetName
  };
}

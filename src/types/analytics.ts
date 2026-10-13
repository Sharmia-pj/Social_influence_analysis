export interface RawTweet {
  id?: string | number;
  user_name: string;
  user_screen_name?: string;
  text: string;
  created_at: string;
  retweet_count: number;
  favorite_count: number;
  followers_count: number;
  user_location?: string;
  hashtags?: string;
}

export interface CleanedTweet {
  id: string;
  userName: string;
  screenName: string;
  rawText: string;
  cleanedText: string;
  createdAt: Date;
  weekday: string;
  weekdayIndex: number;
  retweets: number;
  likes: number;
  followers: number;
  mentions: string[];
  hashtags: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number;
  reach: number;
}

export interface InfluentialUser {
  rank: number;
  userName: string;
  screenName: string;
  followers: number;
  totalLikes: number;
  totalRetweets: number;
  tweetCount: number;
  avgEngagementPerTweet: number;
  reach: number;
  normalizedFollowers: number;
  normalizedLikes: number;
  normalizedRetweets: number;
  influenceScore: number;
  primarySentiment: string;
}

export interface SentimentSummary {
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
  positivePct: number;
  negativePct: number;
  neutralPct: number;
  avgScore: number;
}

export interface MentionRecord {
  rank: number;
  userName: string;
  count: number;
  percentage: number;
  inDegree: number;
}

export interface WordFrequency {
  word: string;
  count: number;
  percentage: number;
}

export interface NetworkNode {
  id: string;
  label: string;
  followers: number;
  inDegree: number;
  outDegree: number;
  degreeCentrality: number;
  inDegreeCentrality: number;
  pageRank: number;
  communityId: number;
  communityColor: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface NetworkEdge {
  source: string;
  target: string;
  weight: number;
}

export interface CommunityRecord {
  id: number;
  name: string;
  size: number;
  percentage: number;
  color: string;
  leadUsers: string[];
  dominantKeywords: string[];
}

export interface WeekdayStats {
  weekday: string;
  shortName: string;
  dayIndex: number;
  tweetCount: number;
  totalLikes: number;
  totalRetweets: number;
  avgEngagement: number;
  positiveSentimentPct: number;
}

export interface DatasetStats {
  totalTweets: number;
  uniqueUsers: number;
  totalRetweets: number;
  totalLikes: number;
  avgFollowers: number;
  totalMentions: number;
  dateRange: { start: string; end: string };
  missingValuesHandled: number;
  duplicatesRemoved: number;
}

export interface AnalysisWeights {
  retweets: number;
  likes: number;
  followers: number;
}

export interface AnalysisResults {
  stats: DatasetStats;
  cleanedTweets: CleanedTweet[];
  influentialUsers: InfluentialUser[];
  sentiment: SentimentSummary;
  mentions: MentionRecord[];
  trendingWords: WordFrequency[];
  trendingHashtags: WordFrequency[];
  graphNodes: NetworkNode[];
  graphEdges: NetworkEdge[];
  communities: CommunityRecord[];
  weekdayStats: WeekdayStats[];
  isSampleData: boolean;
  datasetName: string;
}

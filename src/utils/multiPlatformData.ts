import { InfluencerProfile, PlatformConfig, MultiPlatformWeights, InfluencerCategory } from '../types/multiPlatform';
import { POLITICIANS_DATA } from './politiciansData';
import { CINEMA_DATA } from './cinemaData';

export const PLATFORM_CONFIGS: Record<string, PlatformConfig> = {
  all: {
    id: 'all',
    name: 'All Platforms',
    displayName: 'All Social Platforms',
    audienceTerm: 'Audience (Followers / Fans / Subscribers)',
    primaryColor: '#7c3aed',
    accentBg: '#f5f3ff',
    accentBorder: '#ddd6fe',
    engagementFormula: 'Composite average interaction score across platforms',
    denominatorExplanation: 'Total recorded public audience size across supported channels',
    disclaimer: 'Platform metrics are normalized per channel. Follower numbers across distinct platforms are not directly equivalent.',
    apiStatus: 'Source-Verified Benchmark'
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    displayName: 'Facebook Public Pages',
    audienceTerm: 'Page Followers / Fans',
    primaryColor: '#1877f2',
    accentBg: '#eff6ff',
    accentBorder: '#bfdbfe',
    engagementFormula: 'ER = ((Reactions + Comments + Shares) / Page Followers) × 100',
    denominatorExplanation: 'Total public Page follower / subscriber count (strictly excluding private personal profiles)',
    disclaimer: 'Public Facebook Page insights only. Private personal profiles are strictly protected and never accessed.',
    apiStatus: 'Source-Verified Benchmark'
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    displayName: 'Instagram Profiles',
    audienceTerm: 'Followers',
    primaryColor: '#e1306c',
    accentBg: '#fdf2f8',
    accentBorder: '#fbcfe8',
    engagementFormula: 'ER = ((Avg Likes + Avg Comments) / Total Followers) × 100',
    denominatorExplanation: 'Total public follower count at benchmark sampling timestamp',
    disclaimer: 'Meta Graph API public creator metrics format. Only public posts and insights evaluated.',
    apiStatus: 'Source-Verified Benchmark'
  },
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    displayName: 'YouTube Channels',
    audienceTerm: 'Subscribers',
    primaryColor: '#ef4444',
    accentBg: '#fef2f2',
    accentBorder: '#fecaca',
    engagementFormula: 'ER = ((Avg Video Likes + Avg Comments) / Avg Video Views) × 100',
    denominatorExplanation: 'Average video view count (measuring active viewer response rather than passive subscriber pool)',
    disclaimer: 'YouTube Data API v3 channel and video statistics structure. Subscribers are not interchangeable with social followers.',
    apiStatus: 'Source-Verified Benchmark'
  },
  twitter: {
    id: 'twitter',
    name: 'Twitter / X',
    displayName: 'Twitter / X Accounts',
    audienceTerm: 'Followers',
    primaryColor: '#0f172a',
    accentBg: '#f8fafc',
    accentBorder: '#e2e8f0',
    engagementFormula: 'ER = ((Likes + Replies + Retweets) / Followers) × 100',
    denominatorExplanation: 'Total public Twitter broadcast subscribers and followers',
    disclaimer: 'Twitter / X public metrics sampling format. Topological interaction graphs available for verified datasets.',
    apiStatus: 'Source-Verified Benchmark'
  }
};

export const DEFAULT_WEIGHTS: MultiPlatformWeights = {
  audience: 0.35,
  engagement: 0.35,
  interactions: 0.20,
  views: 0.00,
  consistency: 0.10
};

// Unified Source-Verified Dataset (Snapshot date: 12 October 2026)
export const DEMO_INFLUENCERS: InfluencerProfile[] = [
  ...POLITICIANS_DATA,
  ...CINEMA_DATA
];

export function calculateRankings(
  influencers: InfluencerProfile[],
  weights: MultiPlatformWeights = DEFAULT_WEIGHTS,
  rankingMode: string = 'influenceScore'
): InfluencerProfile[] {
  if (!influencers || influencers.length === 0) return [];

  // Find min and max for normalization
  const audiences = influencers.map((i) => i.followers);
  const engagements = influencers.map((i) => i.engagementRate);
  const interactions = influencers.map((i) => i.avgLikes + i.avgComments + (i.avgShares || 0));

  const minAud = Math.min(...audiences);
  const maxAud = Math.max(...audiences);

  const minEng = Math.min(...engagements);
  const maxEng = Math.max(...engagements);

  const minInt = Math.min(...interactions);
  const maxInt = Math.max(...interactions);

  const norm = (val: number, min: number, max: number): number => {
    if (max === min) return 0.5;
    return Math.max(0, Math.min(1, (val - min) / (max - min)));
  };

  const totalW = weights.audience + weights.engagement + weights.interactions + weights.consistency || 1;
  const wAud = weights.audience / totalW;
  const wEng = weights.engagement / totalW;
  const wInt = weights.interactions / totalW;
  const wCon = weights.consistency / totalW;

  const scored = influencers.map((inf) => {
    const normAud = norm(inf.followers, minAud, maxAud);
    const normEng = norm(inf.engagementRate, minEng, maxEng);
    const totalInteractions = inf.avgLikes + inf.avgComments + (inf.avgShares || 0);
    const normInt = norm(totalInteractions, minInt, maxInt);
    const normCon = inf.postingConsistencyScore;

    const score = 100 * (
      wAud * normAud +
      wEng * normEng +
      wInt * normInt +
      wCon * normCon
    );

    return {
      ...inf,
      influenceScore: Number(score.toFixed(2))
    };
  });

  const sorted = scored.sort((a, b) => {
    if (rankingMode === 'followers') return b.followers - a.followers;
    if (rankingMode === 'engagement') return b.engagementRate - a.engagementRate;
    return b.influenceScore - a.influenceScore;
  });

  return sorted.map((item, idx) => ({
    ...item,
    rankingPosition: idx + 1
  }));
}

export function generateRankingExplanation(
  influencer: InfluencerProfile,
  allInCategoryPlatform: InfluencerProfile[],
  rankingMode: string,
  platform: string,
  category: InfluencerCategory,
  weights: MultiPlatformWeights = DEFAULT_WEIGHTS
): {
  headline: string;
  detailedReason: string;
  formula: string;
  scoreDescription: string;
} {
  const rank = influencer.rankingPosition || 1;
  const total = allInCategoryPlatform.length;
  const platformName = PLATFORM_CONFIGS[platform]?.name || platform;
  const audienceLabel = influencer.audienceLabel;

  if (rankingMode === 'followers') {
    const higherCount = rank - 1;
    const lowerCount = total - rank;
    const isTop = rank === 1;

    return {
      headline: `Ranked #${rank} by ${audienceLabel} Size in ${category}`,
      detailedReason: isTop
        ? `This account ranks first by ${audienceLabel.toLowerCase()} within the ${category} category on ${platformName} because its recorded count (${influencer.followers.toLocaleString()}) is higher than the other ${total - 1} accounts in this dataset.`
        : `This account ranks #${rank} among ${total} profiles in ${category} on ${platformName}. There are ${higherCount} profile${higherCount > 1 ? 's' : ''} with a larger recorded audience and ${lowerCount} profile${lowerCount > 1 ? 's' : ''} with a smaller audience.`,
      formula: `Audience Count Sorting: Order profiles descending by recorded ${audienceLabel}.`,
      scoreDescription: `${influencer.followers.toLocaleString()} ${audienceLabel} recorded.`
    };
  }

  if (rankingMode === 'engagement') {
    const isTop = rank === 1;
    const formulaStr = platform === 'youtube'
      ? 'ER = ((Avg Likes + Avg Comments) / Avg Video Views) × 100'
      : platform === 'facebook'
      ? 'ER = ((Reactions + Comments + Shares) / Page Followers) × 100'
      : 'ER = ((Avg Likes + Avg Comments) / Followers) × 100';

    return {
      headline: `Ranked #${rank} by Engagement Rate (${influencer.engagementRate.toFixed(2)}%)`,
      detailedReason: isTop
        ? `This account achieves the highest engagement rate (${influencer.engagementRate.toFixed(2)}%) in ${category} on ${platformName}. This means audience members respond with active interactions (likes, comments, reposts) at a higher percentage relative to audience size than any other account in the cohort.`
        : `This account ranks #${rank} of ${total} accounts by engagement efficiency (${influencer.engagementRate.toFixed(2)}%). Its interactions average ${influencer.avgLikes.toLocaleString()} likes and ${influencer.avgComments.toLocaleString()} comments per recorded broadcast.`,
      formula: formulaStr,
      scoreDescription: `${influencer.engagementRate.toFixed(2)}% interaction ratio.`
    };
  }

  // Overall influence score
  const isTop = rank === 1;
  return {
    headline: `Ranked #${rank} by Overall Influence Score (${influencer.influenceScore.toFixed(1)} / 100)`,
    detailedReason: isTop
      ? `This account achieves the highest multi-criteria composite score (${influencer.influenceScore.toFixed(1)}/100) in ${category} on ${platformName}. It balances substantial reach (${influencer.followers.toLocaleString()} ${audienceLabel.toLowerCase()}) with strong audience responsiveness (${influencer.engagementRate.toFixed(2)}% ER) and steady publishing frequency (${influencer.postingFrequency}).`
      : `This account ranks #${rank} of ${total} with an Overall Influence Score of ${influencer.influenceScore.toFixed(1)}/100, combining normalized audience reach, interaction volume, and publishing consistency.`,
    formula: `Composite Score = 100 × [${(weights.audience * 100).toFixed(0)}% Norm(Audience) + ${(weights.engagement * 100).toFixed(0)}% Norm(ER) + ${(weights.interactions * 100).toFixed(0)}% Norm(Interactions) + ${(weights.consistency * 100).toFixed(0)}% Consistency]`,
    scoreDescription: `${influencer.influenceScore.toFixed(1)} / 100 (MinMaxScaler Normalized)`
  };
}

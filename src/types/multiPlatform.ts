export type PlatformType = 'all' | 'instagram' | 'facebook' | 'twitter' | 'youtube';

export type InfluencerCategory =
  | 'Tamil Nadu Politicians'
  | 'Tamil Cinema Celebrities';

export type RankingMode =
  | 'influenceScore'
  | 'followers'
  | 'engagement';

export interface MultiPlatformWeights {
  audience: number;
  engagement: number;
  interactions: number;
  views: number;
  consistency: number;
}

export interface PostMetric {
  id: string;
  titleOrText: string;
  date: string;
  likes: number;
  comments: number;
  shares?: number;
  views?: number;
  type?: 'photo' | 'reel' | 'video' | 'post' | 'tweet' | 'short';
}

export interface InfluencerProfile {
  id: string;
  handle: string;
  name: string;
  platform: 'instagram' | 'facebook' | 'twitter' | 'youtube';
  category: InfluencerCategory;
  party?: string; // Verified political party for TN Politicians (DMK, AIADMK, TVK, BJP TN, etc.)
  profession?: string; // Verified profession for Tamil Cinema (Actor, Actress, Director, Music Composer)
  officialProfileUrl: string; // Official link to the public social media profile
  avatarUrl?: string; // Authentic portrait or thumbnail URL from authorized public domain / official source
  verified: boolean;
  followers: number; // Followers on IG/Twitter, Page Likes on FB, Subscribers on YT
  audienceLabel: 'Followers' | 'Page Likes / Fans' | 'Subscribers';
  engagementRate: number; // percentage (e.g. 4.8)
  avgLikes: number;
  avgComments: number;
  avgShares?: number; // Shares on FB, Retweets on Twitter
  avgViews?: number; // Reel views on IG, Video views on YT/FB
  totalPosts: number;
  postingFrequency: string; // e.g. "4.2 posts/week"
  postingConsistencyScore: number; // 0 to 1
  reachEstimate: number;
  monthlyGrowthPct: number;
  sentiment: 'Positive' | 'Neutral' | 'Mixed';
  influenceScore: number; // 0 to 100
  bio: string;
  country: string;
  
  // Real-world evidence & source verification fields
  dataSource: string; // Specific source description
  statSourceUrl: string; // Traceable direct URL where statistics were retrieved
  lastUpdated: string; // Human-readable date
  statRetrievalTimestamp: string; // Precise ISO/IST timestamp
  statRetrievalStatus: 'Verified Public Profile' | 'Live Platform API Benchmark' | 'Documented Academic Archive';
  identityVerificationSource: string; // Reliable citation confirming identity (e.g. TN Assembly Gazette, Nadigar Sangam)
  officialWebsiteUrl?: string; // Official portal / foundation site
  publicEmail?: string; // Official public email if explicitly documented (never guessed or fabricated)
  dataTransparencyNotes?: string; // Detailed academic notes for college professor review
  
  rankingPosition?: number; // Position in active ranking
  rankingReason?: string; // Dynamic calculation explanation
  recentPosts: PostMetric[];
  historicalGrowth: Array<{ month: string; audience: number; engagementRate: number }>;
}

export interface PlatformConfig {
  id: PlatformType;
  name: string;
  displayName: string;
  audienceTerm: string;
  primaryColor: string;
  accentBg: string;
  accentBorder: string;
  engagementFormula: string;
  denominatorExplanation: string;
  disclaimer: string;
  apiStatus: 'Source-Verified Benchmark' | 'CSV Imported Data' | 'Live API Data' | 'API Not Connected';
}

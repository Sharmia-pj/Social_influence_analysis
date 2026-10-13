import React, { useState, useMemo } from 'react';
import {
  Film,
  Filter,
  Search,
  ExternalLink,
  CheckCircle,
  Award,
  TrendingUp,
  Heart,
  MessageCircle,
  Share2,
  Calendar,
  Layers,
  ArrowLeft,
  ShieldCheck,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Sliders,
  ChevronRight,
  Info,
  Sparkles
} from 'lucide-react';
import {
  InfluencerProfile,
  PlatformType,
  RankingMode,
  MultiPlatformWeights
} from '../types/multiPlatform';
import {
  PLATFORM_CONFIGS,
  DEFAULT_WEIGHTS,
  calculateRankings
} from '../utils/multiPlatformData';
import { LeaderboardBar, BarChart } from './Charts';
import { VerifiedAvatar } from './VerifiedAvatar';

interface Props {
  allInfluencers: InfluencerProfile[];
  onOpenProfile: (influencer: InfluencerProfile) => void;
  onReturnHome: () => void;
  weights?: MultiPlatformWeights;
}

export const CinemaPage: React.FC<Props> = ({
  allInfluencers,
  onOpenProfile,
  onReturnHome,
  weights = DEFAULT_WEIGHTS
}) => {
  const [platform, setPlatform] = useState<PlatformType>('facebook');
  const [rankingMode, setRankingMode] = useState<RankingMode>('influenceScore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfession, setSelectedProfession] = useState<string>('all');

  // Filter only Tamil Cinema Celebrities
  const categoryInfluencers = useMemo(() => {
    return allInfluencers.filter((inf) => inf.category === 'Tamil Cinema Celebrities');
  }, [allInfluencers]);

  // Available professions
  const professions = useMemo(() => {
    const set = new Set<string>();
    categoryInfluencers.forEach((inf) => {
      if (inf.profession) set.add(inf.profession);
    });
    return Array.from(set);
  }, [categoryInfluencers]);

  // Filter by platform
  const platformFiltered = useMemo(() => {
    if (platform === 'all') return categoryInfluencers;
    return categoryInfluencers.filter((inf) => inf.platform === platform);
  }, [categoryInfluencers, platform]);

  // Calculate rankings within this platform cohort
  const ranked = useMemo(() => {
    return calculateRankings(platformFiltered, weights, rankingMode);
  }, [platformFiltered, weights, rankingMode]);

  // Apply search query and profession filter
  const displayed = useMemo(() => {
    return ranked.filter((inf) => {
      const matchesSearch =
        inf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inf.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (inf.profession && inf.profession.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesProfession =
        selectedProfession === 'all' || inf.profession === selectedProfession;
      return matchesSearch && matchesProfession;
    });
  }, [ranked, searchQuery, selectedProfession]);

  const platformConfig = PLATFORM_CONFIGS[platform] || PLATFORM_CONFIGS.twitter;

  // Chart data
  const chartData = useMemo(() => {
    return displayed.slice(0, 8).map((inf) => ({
      label: inf.name.split(' ')[0] || inf.name,
      value:
        rankingMode === 'followers'
          ? inf.followers
          : rankingMode === 'engagement'
          ? inf.engagementRate
          : inf.influenceScore,
      subLabel:
        rankingMode === 'followers'
          ? `${(inf.followers / 1000000).toFixed(2)}M ${inf.audienceLabel}`
          : rankingMode === 'engagement'
          ? `${inf.engagementRate}% ER`
          : `Score: ${inf.influenceScore}`
    }));
  }, [displayed, rankingMode]);

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation & Back to Category Selection */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <button
            onClick={onReturnHome}
            className="hover:text-indigo-600 transition-colors flex items-center gap-1 font-semibold text-slate-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Category Selection
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-indigo-700 font-bold">Tamil Cinema Celebrities</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold uppercase">{platformConfig.name}</span>
        </div>

        <button
          onClick={onReturnHome}
          className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Categories
        </button>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50/40 to-white border border-indigo-200/90 rounded-3xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/25 shrink-0">
              <Film className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                  CATEGORY 02
                </span>
                <span className="text-xs font-bold text-slate-500">Tamil Cinema Industry</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                Tamil Cinema Celebrities Ranking
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Digital reach, fan interaction efficiency, and composite social authority benchmarks for leading Tamil actors, actresses, and creators.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto bg-white border border-indigo-200 rounded-2xl px-3 py-2 text-xs shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="text-[11px]">
              <span className="font-bold text-slate-900 block">Verified Public Profiles</span>
              <span className="text-slate-500">Sampled Oct 2026 Benchmark</span>
            </div>
          </div>
        </div>

        {/* Platform Selection Tabs */}
        <div className="mt-6 pt-5 border-t border-indigo-100/90 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-white border border-slate-200/90 rounded-2xl p-1 shadow-2xs overflow-x-auto max-w-full">
            <button
              onClick={() => setPlatform('facebook')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                platform === 'facebook'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Facebook className="w-3.5 h-3.5 text-blue-200" />
              <span>Facebook</span>
              <span className={`text-[9px] px-1 py-0.2 rounded font-mono uppercase ${
                platform === 'facebook' ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-700'
              }`}>
                Priority
              </span>
            </button>

            <button
              onClick={() => setPlatform('instagram')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                platform === 'instagram'
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Instagram className="w-3.5 h-3.5 text-pink-200" />
              <span>Instagram</span>
            </button>

            <button
              onClick={() => setPlatform('youtube')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                platform === 'youtube'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Youtube className="w-3.5 h-3.5 text-red-200" />
              <span>YouTube</span>
            </button>

            <button
              onClick={() => setPlatform('twitter')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                platform === 'twitter'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Twitter className="w-3.5 h-3.5 text-sky-400" />
              <span>Twitter / X</span>
            </button>

            <button
              onClick={() => setPlatform('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                platform === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-indigo-200" />
              <span>All Channels</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            Showing <strong className="text-slate-900">{displayed.length}</strong> celebrities on {platformConfig.name}
          </div>
        </div>
      </div>

      {/* Ranking Mode Filters & Search Controls */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* 3 Required Ranking Modes */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono mr-1">
            Ranking Mode:
          </span>
          <button
            onClick={() => setRankingMode('influenceScore')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              rankingMode === 'influenceScore'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Highest Overall Score</span>
          </button>

          <button
            onClick={() => setRankingMode('followers')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              rankingMode === 'followers'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Highest {platformConfig.audienceTerm}</span>
          </button>

          <button
            onClick={() => setRankingMode('engagement')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              rankingMode === 'engagement'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Highest Engagement Rate</span>
          </button>
        </div>

        {/* Search & Profession Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search celebrity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-indigo-600"
            />
          </div>

          <select
            value={selectedProfession}
            onChange={(e) => setSelectedProfession(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-medium focus:outline-hidden cursor-pointer"
          >
            <option value="all">All Professions ({professions.length})</option>
            {professions.map((prof) => (
              <option key={prof} value={prof}>
                {prof}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Transparency & Formula Card */}
      <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-2xl p-4 text-xs text-slate-700 space-y-1">
        <div className="flex items-center gap-2 font-bold text-indigo-900">
          <Info className="w-4 h-4 text-indigo-700" />
          <span>Active Ranking Method:</span>
          <span className="font-mono text-indigo-800 uppercase">
            {rankingMode === 'influenceScore'
              ? 'Multi-Criteria MinMaxScaler Overall Influence Formula'
              : rankingMode === 'followers'
              ? 'Audience Volume Order'
              : 'Interaction Engagement Rate Ratio'}
          </span>
        </div>
        <p className="text-slate-600 leading-relaxed">
          {rankingMode === 'influenceScore'
            ? 'Score = 100 × [0.35 × Norm(Audience) + 0.35 × Norm(Engagement Rate) + 0.20 × Norm(Interactions) + 0.10 × Consistency]. Evaluates real celebrity viral impact beyond raw follower size.'
            : rankingMode === 'followers'
            ? `Orders accounts strictly by recorded ${platformConfig.audienceTerm}. Follower numbers differ substantially across Instagram, YouTube, and X.`
            : `Formula: ${platformConfig.engagementFormula}. Isolates how aggressively cinema fans engage with posts relative to the account size.`}
        </p>
      </div>

      {/* Visual Chart Overview */}
      {chartData.length > 0 && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" /> Top Ranked Cinema Celebrities ({platformConfig.name})
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">
              Top 8 visualized
            </span>
          </div>
          <BarChart data={chartData} />
        </div>
      )}

      {/* CINEMA CELEBRITIES CARDS LEADERBOARD */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
          <span>Cinema Celebrity Leaderboard Rankings</span>
          <span className="text-xs font-normal text-slate-500">
            Click any star profile to inspect verification evidence & calculation breakdown
          </span>
        </h3>

        {displayed.length === 0 ? (
          <div className="p-8 text-center bg-white border border-slate-200 rounded-2xl text-xs text-slate-500">
            No cinema celebrities found matching your search and profession filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayed.map((inf) => {
              const rank = inf.rankingPosition || 1;
              const rankBadgeBg =
                rank === 1
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : rank === 2
                  ? 'bg-slate-200 text-slate-800 border-slate-300'
                  : rank === 3
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-slate-100 text-slate-700 border-slate-200';

              return (
                <div
                  key={inf.id}
                  onClick={() => onOpenProfile(inf)}
                  className="bg-white border border-slate-200/90 hover:border-indigo-500/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between gap-4"
                >
                  <div>
                    {/* Top row: Rank, Profession badge, Platform, Verified */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-black border ${rankBadgeBg}`}>
                          #{rank}
                        </span>
                        {inf.profession && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200 truncate max-w-[170px]">
                            {inf.profession}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 uppercase">
                          {inf.platform}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Verified
                        </span>
                      </div>
                    </div>

                    {/* Celebrity Identity */}
                    <div className="flex items-start gap-3.5">
                      <VerifiedAvatar
                        name={inf.name}
                        avatarUrl={inf.avatarUrl}
                        category={inf.category}
                        officialProfileUrl={inf.officialProfileUrl}
                        size="lg"
                        clickable={true}
                        className="group-hover:scale-105 transition-transform shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-base font-bold text-slate-900 truncate group-hover:text-indigo-700 transition-colors flex items-center gap-1.5">
                            <span>{inf.name}</span>
                            {inf.verified && (
                              <span title="Verified Artist / Creator">
                                <CheckCircle className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                              </span>
                            )}
                          </h4>
                          <a
                            href={inf.officialProfileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors shrink-0"
                            title="Open Official Profile"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                        <p className="text-xs font-mono text-indigo-600 truncate">{inf.handle}</p>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{inf.bio}</p>
                        <div className="mt-1 flex items-center gap-1.5 text-[10px] text-slate-400">
                          <span className="truncate" title={inf.identityVerificationSource}>
                            Ref: {inf.identityVerificationSource.substring(0, 36)}...
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
                      <div className="p-2 rounded-xl bg-slate-50">
                        <span className="text-[10px] text-slate-500 block uppercase font-mono">
                          {inf.audienceLabel}
                        </span>
                        <span className="text-xs font-extrabold text-slate-900 font-mono">
                          {(inf.followers / 1000000).toFixed(2)}M
                        </span>
                      </div>

                      <div className="p-2 rounded-xl bg-slate-50">
                        <span className="text-[10px] text-slate-500 block uppercase font-mono">
                          Engage Rate
                        </span>
                        <span className="text-xs font-extrabold text-emerald-700 font-mono">
                          {inf.engagementRate.toFixed(2)}%
                        </span>
                      </div>

                      <div className="p-2 rounded-xl bg-indigo-50/70 border border-indigo-100">
                        <span className="text-[10px] text-indigo-700 block uppercase font-mono font-bold">
                          Overall Score
                        </span>
                        <span className="text-xs font-extrabold text-indigo-900 font-mono">
                          {inf.influenceScore.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Row: Data source & click to verify button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <div className="text-slate-500 flex items-center gap-1.5 truncate max-w-[210px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span className="truncate text-[10px]">{inf.statRetrievalStatus} ({inf.lastUpdated})</span>
                    </div>

                    <span className="text-xs font-bold text-indigo-600 group-hover:text-indigo-800 flex items-center gap-1">
                      <span>Evidence & Audit</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

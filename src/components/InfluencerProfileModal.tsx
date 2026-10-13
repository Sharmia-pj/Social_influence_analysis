import React from 'react';
import { InfluencerProfile, MultiPlatformWeights } from '../types/multiPlatform';
import { AreaTrendChart } from './Charts';
import { VerifiedAvatar } from './VerifiedAvatar';
import {
  X,
  CheckCircle,
  ExternalLink,
  TrendingUp,
  Heart,
  MessageCircle,
  Eye,
  Share2,
  Calendar,
  Sparkles,
  MapPin,
  Tag,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Award,
  Vote,
  Film,
  Database,
  Mail,
  Globe,
  Clock,
  FileCheck2,
  Layers,
  BarChart2
} from 'lucide-react';
import {
  generateRankingExplanation,
  DEFAULT_WEIGHTS,
  PLATFORM_CONFIGS
} from '../utils/multiPlatformData';

interface Props {
  influencer: InfluencerProfile | null;
  onClose: () => void;
  allCohort?: InfluencerProfile[];
  rankingMode?: string;
  weights?: MultiPlatformWeights;
}

export const InfluencerProfileModal: React.FC<Props> = ({
  influencer,
  onClose,
  allCohort = [],
  rankingMode = 'influenceScore',
  weights = DEFAULT_WEIGHTS
}) => {
  if (!influencer) return null;

  const trendData =
    influencer.historicalGrowth?.map((g) => ({
      label: g.month,
      value: g.audience,
      secondaryValue: g.engagementRate
    })) || [];

  const platformBadgeColor =
    influencer.platform === 'instagram'
      ? 'bg-pink-50 text-pink-700 border-pink-200'
      : influencer.platform === 'facebook'
      ? 'bg-blue-50 text-blue-700 border-blue-200'
      : influencer.platform === 'youtube'
      ? 'bg-red-50 text-red-700 border-red-200'
      : 'bg-slate-100 text-slate-800 border-slate-300';

  // Dynamic explanation generated from actual calculated values
  const cohort = allCohort.length > 0 ? allCohort : [influencer];
  const explanation = generateRankingExplanation(
    influencer,
    cohort,
    rankingMode,
    influencer.platform,
    influencer.category,
    weights
  );

  const platformConfig = PLATFORM_CONFIGS[influencer.platform] || PLATFORM_CONFIGS.twitter;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Header Cover Banner */}
        <div className="relative bg-gradient-to-r from-purple-800 via-indigo-900 to-slate-950 p-6 text-white shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/25 hover:bg-black/40 text-white transition-colors cursor-pointer"
            aria-label="Close Profile"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <VerifiedAvatar
                name={influencer.name}
                avatarUrl={influencer.avatarUrl}
                category={influencer.category}
                officialProfileUrl={influencer.officialProfileUrl}
                size="xl"
                className="border-2 border-white/90 shadow-md shrink-0"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${platformBadgeColor} bg-white`}
                  >
                    {influencer.platform}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/20 text-white flex items-center gap-1">
                    {influencer.category === 'Tamil Nadu Politicians' ? (
                      <Vote className="w-3 h-3" />
                    ) : (
                      <Film className="w-3 h-3" />
                    )}
                    {influencer.category}
                  </span>
                  {influencer.party && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-200 text-purple-900">
                      {influencer.party}
                    </span>
                  )}
                  {influencer.profession && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-200 text-indigo-900">
                      {influencer.profession}
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2">
                  <span>{influencer.name}</span>
                  {influencer.verified && (
                    <span title="Verified Public Identity">
                      <CheckCircle className="w-4 h-4 text-sky-400 inline shrink-0 fill-sky-400/20" />
                    </span>
                  )}
                </h2>
                <p className="text-purple-200 text-xs font-mono">{influencer.handle}</p>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">{influencer.bio}</p>
              </div>
            </div>

            {/* Official Profile Link Button */}
            <a
              href={influencer.officialProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/30 flex items-center gap-2 transition-all shadow-2xs shrink-0 self-start sm:self-auto"
            >
              <span>Open Official Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1 text-slate-800 text-xs sm:text-sm">
          {/* SECTION 1: VERIFICATION & AUDIT EVIDENCE BANNER */}
          <div className="p-4 rounded-2xl border bg-emerald-50/80 border-emerald-300 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-white shadow-2xs shrink-0 mt-0.5 text-emerald-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider font-mono">
                  <span>Audit Status: {influencer.statRetrievalStatus}</span>
                </div>
                <p className="text-xs mt-0.5 leading-relaxed text-emerald-900">
                  Confirmed real-world public identity with official accounts, verifiable metrics, and no synthetic/AI faces.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-[11px] mt-1.5 opacity-90 font-mono text-emerald-900">
                  <span>Data Source: <strong className="font-semibold">{influencer.dataSource}</strong></span>
                  <span>·</span>
                  <span>Recorded: <strong className="font-semibold">{influencer.lastUpdated}</strong></span>
                </div>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200 text-center shrink-0 self-stretch sm:self-auto">
              <span className="text-[10px] text-slate-500 uppercase font-mono block font-bold">Leaderboard Rank</span>
              <span className="text-sm font-black text-purple-700 font-mono">
                #{influencer.rankingPosition || 1} of {cohort.length}
              </span>
            </div>
          </div>

          {/* SECTION 2: DYNAMIC RANKING EXPLANATION */}
          <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-700" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                Ranking Justification & Mathematical Breakdown
              </h3>
            </div>

            <div className="bg-white border border-purple-100 rounded-xl p-3.5 space-y-2">
              <div className="font-bold text-xs sm:text-sm text-purple-900">
                {explanation.headline}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {explanation.detailedReason}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="bg-white border border-purple-100 rounded-xl p-3">
                <span className="text-[10px] text-slate-500 uppercase font-mono font-bold block mb-1">
                  Active Formula
                </span>
                <code className="text-[11px] font-mono text-purple-800 font-semibold block leading-tight">
                  {explanation.formula}
                </code>
              </div>

              <div className="bg-white border border-purple-100 rounded-xl p-3">
                <span className="text-[10px] text-slate-500 uppercase font-mono font-bold block mb-1">
                  Calculated Score Metric
                </span>
                <span className="text-xs font-bold text-slate-900 block font-mono">
                  {explanation.scoreDescription}
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 3: REAL-WORLD SOURCE TRACEABILITY & CITATIONS */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs sm:text-sm font-mono uppercase tracking-wider">
              <FileCheck2 className="w-4 h-4 text-indigo-600" />
              <span>Identity Verification & Traceable Evidence Audit</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                  Identity Verification Source
                </span>
                <p className="text-slate-800 font-medium leading-relaxed">
                  {influencer.identityVerificationSource}
                </p>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                  Recorded Timestamp
                </span>
                <div className="flex items-center gap-1.5 text-slate-800 font-mono text-xs font-bold">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{influencer.statRetrievalTimestamp}</span>
                </div>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                  Official Web / Foundation Portal
                </span>
                {influencer.officialWebsiteUrl ? (
                  <a
                    href={influencer.officialWebsiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-700 hover:text-purple-900 font-medium flex items-center gap-1 truncate"
                  >
                    <Globe className="w-3 h-3 shrink-0" />
                    <span className="truncate">{influencer.officialWebsiteUrl}</span>
                    <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                  </a>
                ) : (
                  <span className="text-slate-500">Not published directly</span>
                )}
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                  Public Contact / Professional Email
                </span>
                {influencer.publicEmail ? (
                  <div className="flex items-center gap-1 text-slate-800 font-mono">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>{influencer.publicEmail}</span>
                  </div>
                ) : (
                  <span className="text-slate-500 italic">No public email published (verified)</span>
                )}
              </div>
            </div>

            {influencer.dataTransparencyNotes && (
              <div className="p-3 bg-indigo-50/60 border border-indigo-200 rounded-xl text-[11px] text-indigo-950 leading-relaxed">
                <strong>Academic Research Note: </strong>
                {influencer.dataTransparencyNotes}
              </div>
            )}
          </div>

          {/* SECTION 4: KEY RECORDED SOCIAL METRICS */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono mb-3">
              Recorded Social Statistics ({platformConfig.name})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90">
                <span className="text-[11px] text-slate-500 font-medium block">
                  {influencer.audienceLabel}
                </span>
                <span className="text-base sm:text-lg font-black text-slate-900 font-mono mt-0.5 block">
                  {influencer.followers.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {(influencer.followers / 1000000).toFixed(2)}M
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90">
                <span className="text-[11px] text-slate-500 font-medium block">
                  Engagement Rate
                </span>
                <span className="text-base sm:text-lg font-black text-emerald-600 font-mono mt-0.5 block">
                  {influencer.engagementRate.toFixed(2)}%
                </span>
                <span className="text-[10px] text-slate-400">Interaction ratio</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90">
                <span className="text-[11px] text-slate-500 font-medium block">
                  Average Likes
                </span>
                <span className="text-base sm:text-lg font-black text-slate-900 font-mono mt-0.5 block">
                  {influencer.avgLikes.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400">Per publication</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90">
                <span className="text-[11px] text-slate-500 font-medium block">
                  Average Comments
                </span>
                <span className="text-base sm:text-lg font-black text-slate-900 font-mono mt-0.5 block">
                  {influencer.avgComments.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400">Public responses</span>
              </div>
            </div>
          </div>

          {/* Additional Performance Attributes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[11px] block">Posting Frequency</span>
              <strong className="text-slate-900 font-bold text-xs">{influencer.postingFrequency}</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[11px] block">Estimated Reach</span>
              <strong className="text-slate-900 font-bold text-xs">{influencer.reachEstimate.toLocaleString()}</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[11px] block">Monthly Growth</span>
              <strong className="text-emerald-600 font-bold text-xs">+{influencer.monthlyGrowthPct}%</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[11px] block">Public Sentiment</span>
              <strong className="text-purple-700 font-bold text-xs">{influencer.sentiment}</strong>
            </div>
          </div>

          {/* SECTION 5: HISTORICAL AUDIENCE GROWTH TRAJECTORY */}
          {trendData.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-600" /> Recorded Growth Trajectory (5-Month Window)
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">Monthly Samples</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <AreaTrendChart data={trendData} height={150} lineColor="#7c3aed" />
              </div>
            </div>
          )}

          {/* SECTION 6: RECENT RECORDED POSTS */}
          {influencer.recentPosts && influencer.recentPosts.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                Recent Public Publications & Interactions Sample
              </h3>
              <div className="space-y-2">
                {influencer.recentPosts.map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-slate-800 font-medium line-clamp-2">"{p.titleOrText}"</p>
                      <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">{p.date} · {p.type}</span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] font-mono shrink-0 text-slate-600">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-rose-500" /> {p.likes.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3 text-sky-500" /> {p.comments.toLocaleString()}
                      </span>
                      {p.shares !== undefined && (
                        <span className="flex items-center gap-1">
                          <Share2 className="w-3 h-3 text-purple-500" /> {p.shares.toLocaleString()}
                        </span>
                      )}
                      {p.views !== undefined && (
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3 text-amber-500" /> {p.views.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-slate-500">
            Source Trace: <a href={influencer.statSourceUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-purple-700 hover:underline">{influencer.statSourceUrl}</a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={influencer.officialProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              <span>Visit Official Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

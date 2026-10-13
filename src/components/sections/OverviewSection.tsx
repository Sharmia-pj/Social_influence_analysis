import React from 'react';
import { AnalysisResults } from '../../types/analytics';
import {
  Users,
  MessageSquare,
  Share2,
  Heart,
  TrendingUp,
  Network,
  Sparkles,
  GitBranch,
  ArrowRight,
  ShieldAlert,
  BarChart3,
  Calendar,
  Layers,
  Award,
  BookOpen
} from 'lucide-react';

interface Props {
  results: AnalysisResults;
  onNavigateSection: (sectionId: string) => void;
  onOpenUploader: () => void;
  onOpenSummary?: () => void;
}

export const OverviewSection: React.FC<Props> = ({ results, onNavigateSection, onOpenUploader, onOpenSummary }) => {
  const { stats, influentialUsers, sentiment, isSampleData, datasetName } = results;

  const kpis = [
    {
      title: 'Total Tweets Analyzed',
      value: stats.totalTweets.toLocaleString(),
      subtitle: `${stats.duplicatesRemoved} duplicates pruned`,
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50/70 border-purple-200/80'
    },
    {
      title: 'Unique Network Users',
      value: stats.uniqueUsers.toLocaleString(),
      subtitle: `${results.graphNodes.length} graph nodes`,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50/70 border-blue-200/80'
    },
    {
      title: 'Total Retweets Recorded',
      value: stats.totalRetweets.toLocaleString(),
      subtitle: `Weighted virality factor`,
      icon: Share2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50/70 border-emerald-200/80'
    },
    {
      title: 'Total Likes / Favorites',
      value: stats.totalLikes.toLocaleString(),
      subtitle: `Audience resonance metric`,
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50/70 border-pink-200/80'
    },
    {
      title: 'Top Influencer',
      value: influentialUsers[0] ? `@${influentialUsers[0].userName}` : 'N/A',
      subtitle: influentialUsers[0] ? `Score: ${influentialUsers[0].influenceScore.toFixed(1)}/100` : '',
      icon: TrendingUp,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50/70 border-amber-200/80'
    },
    {
      title: 'Network Communities',
      value: results.communities.length.toString(),
      subtitle: `Louvain clusters detected`,
      icon: Network,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50/70 border-indigo-200/80'
    }
  ];

  const methodologySteps = [
    {
      step: '01',
      title: 'Data Preprocessing',
      desc: 'Clean tweet text, remove URLs, strip punctuation, extract mentions and timestamps.',
      id: 'cleaning'
    },
    {
      step: '02',
      title: 'Feature Scaling & Scoring',
      desc: 'Apply MinMaxScaler to likes, retweets, and followers; calculate weighted influence scores.',
      id: 'influential'
    },
    {
      step: '03',
      title: 'Sentiment & NLP',
      desc: 'Lexicon polarity scoring, stopword removal, and top 20 frequency extraction.',
      id: 'sentiment'
    },
    {
      step: '04',
      title: 'Network Graph Modeling',
      desc: 'Construct directed mention graph with NetworkX, calculate PageRank & Degree Centrality.',
      id: 'network'
    },
    {
      step: '05',
      title: 'Community & Temporal',
      desc: 'Partition graph with modularity clustering and analyze tweet activity patterns across weekdays.',
      id: 'communities'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Banner - Modern Light Theme */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50/50 to-white border border-purple-200/90 p-6 sm:p-8 shadow-xs">
        <div className="relative z-10 max-w-3xl space-y-3.5">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-mono text-purple-700 font-bold uppercase tracking-wider bg-purple-100/70 px-2 py-0.5 rounded-full border border-purple-200">
              College Capstone Project
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-600 font-medium">Data Science & Social Graph Analytics</span>
            {isSampleData && (
              <>
                <span className="text-slate-400">·</span>
                <span className="px-2 py-0.5 rounded text-[11px] bg-amber-50 text-amber-800 border border-amber-300 font-mono font-medium">
                  Sample Benchmark Dataset Active
                </span>
              </>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Social Network Influence Analytics
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            A comprehensive data science framework converting raw Twitter engagement streams into structural network
            intelligence. This system identifies influential thought leaders using normalized weighted formulas,
            evaluates tweet sentiment polarities, constructs directed interaction graphs, calculates PageRank and degree
            centralities, detects modular communities, and analyzes temporal weekday broadcast rhythms.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigateSection('influential')}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs shadow-purple-600/30 transition-all"
            >
              Explore Influential Rankings <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateSection('network')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-all border border-slate-200 shadow-2xs"
            >
              <Network className="w-4 h-4 text-purple-600" /> Interactive Graph
            </button>
            {onOpenSummary && (
              <button
                onClick={onOpenSummary}
                className="px-4 py-2.5 rounded-xl bg-purple-100/70 hover:bg-purple-100 text-purple-900 text-xs font-semibold flex items-center gap-2 transition-all border border-purple-200"
              >
                <Sparkles className="w-4 h-4 text-purple-600" /> Executive Submission Report
              </button>
            )}
            <button
              onClick={onOpenUploader}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-all border border-slate-200 shadow-2xs"
            >
              Upload Kaggle CSV
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-purple-600" /> Executive Analytics Summary
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            {datasetName}
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border ${kpi.bgColor} bg-white transition-all hover:shadow-xs hover:-translate-y-0.5`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500 font-medium truncate">{kpi.title}</span>
                  <Icon className={`w-4 h-4 ${kpi.color} shrink-0`} />
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono tracking-tight">
                  {kpi.value}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 truncate">
                  {kpi.subtitle}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Methodology Pipeline Flow */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" /> Project Methodology & Analytical Workflow
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              The 5-stage sequential pipeline executing Python data science and graph theory operations
            </p>
          </div>
          <button
            onClick={() => onNavigateSection('python')}
            className="text-xs text-purple-600 hover:text-purple-700 font-semibold underline flex items-center gap-1"
          >
            View Python Code <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-1">
          {methodologySteps.map((m, idx) => (
            <div
              key={idx}
              onClick={() => onNavigateSection(m.id)}
              className="group p-4 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-purple-300 hover:bg-purple-50/40 cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono font-bold text-purple-600 mb-2 block">{m.step}</span>
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition-colors mb-1">
                  {m.title}
                </h3>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {m.desc}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400 group-hover:text-purple-600">
                <span>Inspect details</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Findings Snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top 3 Influencers Preview */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-500" /> Top Influencers Preview
            </h3>
            <button
              onClick={() => onNavigateSection('influential')}
              className="text-xs text-purple-600 hover:text-purple-700 font-semibold"
            >
              Full Top 10 →
            </button>
          </div>
          <div className="space-y-2">
            {influentialUsers.slice(0, 3).map((u) => (
              <div
                key={u.userName}
                className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 flex items-center justify-between gap-3 text-xs hover:border-purple-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 font-mono font-bold flex items-center justify-center text-[10px]">
                    #{u.rank}
                  </span>
                  <div>
                    <span className="font-bold text-slate-900">@{u.userName}</span>
                    <span className="text-slate-500 text-[11px] block">{u.screenName}</span>
                  </div>
                </div>
                <div className="text-right font-mono">
                  <span className="text-purple-700 font-extrabold">{u.influenceScore.toFixed(1)}</span>
                  <span className="text-slate-400 text-[10px] block">/ 100</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment & Graph Distribution Snapshot */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" /> Sentiment Breakdown
            </h3>
            <button
              onClick={() => onNavigateSection('sentiment')}
              className="text-xs text-purple-600 hover:text-purple-700 font-semibold"
            >
              Detailed NLP →
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200">
              <span className="text-[11px] text-emerald-800 font-semibold block">Positive</span>
              <span className="text-xl font-extrabold text-emerald-700 font-mono">{sentiment.positivePct}%</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">{sentiment.positiveCount} tweets</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-700 font-semibold block">Neutral</span>
              <span className="text-xl font-extrabold text-slate-800 font-mono">{sentiment.neutralPct}%</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">{sentiment.neutralCount} tweets</span>
            </div>
            <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200">
              <span className="text-[11px] text-rose-800 font-semibold block">Negative</span>
              <span className="text-xl font-extrabold text-rose-700 font-mono">{sentiment.negativePct}%</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">{sentiment.negativeCount} tweets</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

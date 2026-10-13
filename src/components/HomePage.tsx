import React from 'react';
import {
  Vote,
  Film,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Scale,
  Database,
  Layers,
  Sparkles,
  Users,
  CheckCircle2,
  ExternalLink,
  Facebook,
  Instagram,
  Youtube,
  Twitter
} from 'lucide-react';
import { InfluencerCategory } from '../types/multiPlatform';

interface Props {
  onSelectCategory: (category: InfluencerCategory) => void;
  onOpenUploader: () => void;
  onOpenSummary: () => void;
  onNavigateSection?: (sectionId: string) => void;
  politicianCount: number;
  cinemaCount: number;
}

export const HomePage: React.FC<Props> = ({
  onSelectCategory,
  onOpenUploader,
  onOpenSummary,
  onNavigateSection,
  politicianCount,
  cinemaCount
}) => {
  return (
    <div className="space-y-10 py-2 sm:py-6 max-w-6xl mx-auto">
      {/* Source-Verified Academic Benchmark Banner */}
      <div className="bg-emerald-50/90 border border-emerald-300 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shrink-0 font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-emerald-950 uppercase tracking-wide bg-emerald-200/80 px-2 py-0.5 rounded-md">
                SOURCE-VERIFIED RESEARCH DATA
              </span>
              <span className="text-xs text-emerald-900 hidden md:inline">
                Verified Social Profiles & Documented Benchmarks
              </span>
            </div>
            <p className="text-xs text-emerald-900/90 mt-0.5">
              Strictly focused on real Tamil Nadu politicians and cinema celebrities. All statistics are verified against official public accounts, with zero AI-generated portraits and full source traceability.
            </p>
          </div>
        </div>
        <button
          onClick={onOpenSummary}
          className="text-xs font-semibold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-xl border border-emerald-300 transition-colors shrink-0"
        >
          Audit Trail & Methodology
        </button>
      </div>

      {/* Main Hero Header */}
      <div className="text-center space-y-3.5 max-w-3xl mx-auto pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>Verified Influencer Ranking System</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Social Media Influence Analytics
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
          Analyze and compare the digital influence of Tamil Nadu politicians and Tamil cinema celebrities.
        </p>
        <p className="text-xs text-slate-500">
          Select a category below to explore platform rankings across Instagram, Facebook, Twitter/X, and YouTube.
        </p>
      </div>

      {/* TWO PRIMARY CATEGORY SELECTION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pt-2">
        {/* CARD 1: TAMIL NADU POLITICIANS */}
        <div className="group bg-white border-2 border-purple-100 hover:border-purple-500/80 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-16 -right-16 w-44 h-44 bg-purple-100/50 rounded-full blur-2xl group-hover:bg-purple-200/60 transition-colors pointer-events-none" />

          <div>
            {/* Category Header Badge */}
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
                <Vote className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-50 text-purple-800 border border-purple-200">
                {politicianCount} Profiles Tracked
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700">
                Category 01
              </span>
              <h2 className="text-2xl font-bold text-slate-900 group-hover:text-purple-900 transition-colors">
                Tamil Nadu Politicians
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Empirical digital ranking and public outreach assessment of major political figures, elected representatives, and party coordinators across Tamil Nadu.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="mt-6 space-y-2.5 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-900">Political influencer rankings:</span> DMK, AIADMK, TVK, BJP TN, NTK, PMK, Congress
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-900">Available metrics:</span> Verified follower counts, engagement rate, reactions, shares
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-900">Platform comparison:</span> Instagram, Facebook, Twitter/X, and YouTube
              </div>
            </div>

            {/* Sample Tracked Figures preview */}
            <div className="mt-5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block text-xs">Featured political leaders in dataset:</span>
              <p className="text-slate-600">
                M. K. Stalin (DMK) · Edappadi K. Palaniswami (AIADMK) · Thalapathy Vijay (TVK) · K. Annamalai (BJP) · Seeman (NTK) · Udhayanidhi Stalin · Kanimozhi Karunanidhi · Dr. Anbumani Ramadoss
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 pt-4">
            <button
              onClick={() => onSelectCategory('Tamil Nadu Politicians')}
              className="w-full py-3.5 px-6 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-purple-600/25 group-hover:shadow-lg group-hover:shadow-purple-600/35 cursor-pointer"
            >
              <span>View Politician Rankings</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* CARD 2: TAMIL CINEMA CELEBRITIES */}
        <div className="group bg-white border-2 border-indigo-100 hover:border-indigo-500/80 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-16 -right-16 w-44 h-44 bg-indigo-100/50 rounded-full blur-2xl group-hover:bg-indigo-200/60 transition-colors pointer-events-none" />

          <div>
            {/* Category Header Badge */}
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                <Film className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                {cinemaCount} Profiles Tracked
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-700">
                Category 02
              </span>
              <h2 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">
                Tamil Cinema Celebrities
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Objective social audience measurement and virality evaluation of Tamil cinema actors, actresses, directors, and music composers.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="mt-6 space-y-2.5 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-900">Celebrity influencer rankings:</span> Actors, actresses, directors, music directors
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-900">Available metrics:</span> Subscribers, reel views, average likes, comments, shares
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-900">Platform comparison:</span> Instagram, Facebook, Twitter/X, and YouTube
              </div>
            </div>

            {/* Sample Tracked Figures preview */}
            <div className="mt-5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block text-xs">Featured cinema stars in dataset:</span>
              <p className="text-slate-600">
                Thalapathy Vijay · Superstar Rajinikanth · Kamal Haasan · Sivakarthikeyan · Suriya Sivakumar · Dhanush · Nayanthara · Trisha Krishnan · Anirudh Ravichander · Lokesh Kanagaraj
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 pt-4">
            <button
              onClick={() => onSelectCategory('Tamil Cinema Celebrities')}
              className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/25 group-hover:shadow-lg group-hover:shadow-indigo-600/35 cursor-pointer"
            >
              <span>View Cinema Rankings</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Direct Platform Telemetry Jump Bar */}
      {onNavigateSection && (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold shrink-0">
              <Facebook className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-1.5">
                Multi-Platform Analytics Dashboards
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 font-bold font-mono">
                  Facebook Priority
                </span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Explore platform-specific viral syndication, engagement rates, and metrics.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigateSection('facebook')}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Facebook className="w-3.5 h-3.5" />
              <span>Facebook (Priority)</span>
            </button>

            <button
              onClick={() => onNavigateSection('instagram')}
              className="px-3.5 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-600" />
              <span>Instagram</span>
            </button>

            <button
              onClick={() => onNavigateSection('youtube')}
              className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Youtube className="w-3.5 h-3.5 text-red-600" />
              <span>YouTube</span>
            </button>

            <button
              onClick={() => onNavigateSection('twitter')}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Twitter className="w-3.5 h-3.5 text-slate-900" />
              <span>Twitter / X</span>
            </button>
          </div>
        </div>
      )}

      {/* 5-Step Evaluation Workflow Guide */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-purple-600" />
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
            College Project Verification Workflow
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100 flex flex-col justify-between">
            <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-[11px] mb-2">
              1
            </span>
            <strong className="text-slate-900 block font-bold">Select Category</strong>
            <span className="text-slate-500 mt-1">Tamil Nadu Politicians or Tamil Cinema Celebrities.</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100 flex flex-col justify-between">
            <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-[11px] mb-2">
              2
            </span>
            <strong className="text-slate-900 block font-bold">Choose Platform</strong>
            <span className="text-slate-500 mt-1">Instagram, Facebook, Twitter/X, or YouTube.</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100 flex flex-col justify-between">
            <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-[11px] mb-2">
              3
            </span>
            <strong className="text-slate-900 block font-bold">Select Ranking Mode</strong>
            <span className="text-slate-500 mt-1">Followers, Engagement Rate, or Overall Score.</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100 flex flex-col justify-between">
            <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-[11px] mb-2">
              4
            </span>
            <strong className="text-slate-900 block font-bold">Select Influencer</strong>
            <span className="text-slate-500 mt-1">Click any profile card on the leaderboard.</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100 flex flex-col justify-between">
            <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-[11px] mb-2">
              5
            </span>
            <strong className="text-slate-900 block font-bold">Inspect Evidence</strong>
            <span className="text-slate-500 mt-1">Review formula, calculated score, data source & audit trail.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Menu, Upload, Share2, Terminal, RefreshCw, BarChart2, FileText, AlertTriangle, Scale, Server, ArrowLeft, Home, Vote, Film } from 'lucide-react';
import { AnalysisResults } from '../types/analytics';

interface Props {
  onToggleSidebar: () => void;
  onOpenUploader: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeSectionTitle: string;
  results: AnalysisResults;
  onRestoreSample: () => void;
  onOpenSummary: () => void;
  onOpenApiStatus: () => void;
  activeSection: string;
}

export const Header: React.FC<Props> = ({
  onToggleSidebar,
  onOpenUploader,
  onNavigateSection,
  activeSectionTitle,
  results,
  onRestoreSample,
  onOpenSummary,
  onOpenApiStatus,
  activeSection
}) => {
  const { isSampleData } = results;
  const isHome = activeSection === 'home';

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
      {/* Left: Mobile Toggle & Title */}
      <div className="flex items-center justify-between md:justify-start gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors lg:hidden cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight truncate">
                {activeSectionTitle}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <span className="font-semibold text-purple-700">TN Politics & Cinema Focus</span>
              <span>·</span>
              <span>4 Platforms (IG, FB, X, YT)</span>
            </div>
          </div>
        </div>

        {/* Benchmark Notice Badge */}
        <button
          onClick={onOpenApiStatus}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-tight bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100 transition-colors shrink-0 cursor-pointer"
          title="Click to view Methodology and Source Verification Audit"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>SOURCE-VERIFIED BENCHMARK</span>
        </button>
      </div>

      {/* Right: Category Quick Jump & Actions */}
      <div className="flex flex-wrap items-center gap-2 shrink-0 self-start md:self-auto">
        {!isHome && (
          <button
            onClick={() => onNavigateSection('home')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-purple-600" />
            <span>Category Home</span>
          </button>
        )}

        <button
          onClick={() => onNavigateSection('politicians')}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            activeSection === 'politicians'
              ? 'bg-purple-600 text-white'
              : 'bg-purple-50 hover:bg-purple-100 text-purple-800'
          }`}
        >
          <Vote className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Politicians</span>
        </button>

        <button
          onClick={() => onNavigateSection('cinema')}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            activeSection === 'cinema'
              ? 'bg-indigo-600 text-white'
              : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800'
          }`}
        >
          <Film className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Cinema</span>
        </button>

        <button
          onClick={() => onNavigateSection('compare')}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            activeSection === 'compare'
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <Scale className="w-3.5 h-3.5 text-purple-600" />
          <span className="hidden md:inline">Compare</span>
        </button>

        {!isSampleData && (
          <button
            onClick={onRestoreSample}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-colors cursor-pointer"
            title="Restore Benchmark Demo Dataset"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Restore Demo</span>
          </button>
        )}

        <button
          onClick={onOpenSummary}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-xs text-purple-800 font-semibold transition-colors border border-purple-200 cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-purple-600" />
          <span className="hidden xl:inline">Methodology Report</span>
          <span className="xl:hidden">Report</span>
        </button>

        <button
          onClick={onOpenUploader}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs shadow-purple-600/30 cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Upload CSV</span>
          <span className="sm:hidden">CSV</span>
        </button>
      </div>
    </header>
  );
};

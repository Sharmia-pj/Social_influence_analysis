import React from 'react';
import {
  Home,
  Vote,
  Film,
  Scale,
  Award,
  Sparkles,
  Database,
  Target,
  CheckCircle,
  Terminal,
  Network,
  GitCommit,
  Upload,
  X,
  Share2,
  AlertTriangle,
  Server,
  Layers,
  BookOpen,
  Facebook,
  Instagram,
  Youtube,
  Twitter
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'Focus Categories' | 'Platform Dashboards' | 'Comparison & Tools' | 'Academic & Methods';
  badge?: string;
  badgeColor?: string;
}

export const NAV_ITEMS: NavItem[] = [
  // 1. Primary Category Navigation
  { id: 'home', label: 'Home / Category Selection', icon: Home, category: 'Focus Categories', badge: 'Start' },
  { id: 'politicians', label: 'Tamil Nadu Politicians', icon: Vote, category: 'Focus Categories', badge: 'Cat 01' },
  { id: 'cinema', label: 'Tamil Cinema Celebrities', icon: Film, category: 'Focus Categories', badge: 'Cat 02' },

  // 2. Channel & Platform Telemetry (Facebook Highest Priority)
  { id: 'facebook', label: 'Facebook Analytics', icon: Facebook, category: 'Platform Dashboards', badge: 'Priority', badgeColor: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'instagram', label: 'Instagram Analytics', icon: Instagram, category: 'Platform Dashboards' },
  { id: 'youtube', label: 'YouTube Analytics', icon: Youtube, category: 'Platform Dashboards' },
  { id: 'twitter', label: 'Twitter / X Analytics', icon: Twitter, category: 'Platform Dashboards' },

  // 3. Cross-Category Analysis & Tools
  { id: 'compare', label: 'Compare Influencers', icon: Scale, category: 'Comparison & Tools' },

  // 4. Academic Capstone Methodology
  { id: 'overview', label: 'Project Aim & Overview', icon: BookOpen, category: 'Academic & Methods' },
  { id: 'objectives', label: 'Research Objectives', icon: Target, category: 'Academic & Methods' },
  { id: 'network', label: 'Interaction Graph (NLP)', icon: Network, category: 'Academic & Methods' },
  { id: 'results', label: 'Findings & Conclusion', icon: CheckCircle, category: 'Academic & Methods' },
  { id: 'python', label: 'Jupyter Notebook Code', icon: Terminal, category: 'Academic & Methods' },
  { id: 'dataset', label: 'Dataset & Audit Schema', icon: Database, category: 'Academic & Methods' }
];

interface Props {
  activeSection: string;
  onSelectSection: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onOpenUploader: () => void;
  onOpenApiStatus?: () => void;
  isSampleData: boolean;
}

export const Sidebar: React.FC<Props> = ({
  activeSection,
  onSelectSection,
  isOpen,
  onClose,
  onOpenUploader,
  onOpenApiStatus,
  isSampleData
}) => {
  const categories: Array<'Focus Categories' | 'Platform Dashboards' | 'Comparison & Tools' | 'Academic & Methods'> = [
    'Focus Categories',
    'Platform Dashboards',
    'Comparison & Tools',
    'Academic & Methods'
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Panel - Modern Light Theme */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200/90 flex flex-col shadow-xs transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              onSelectSection('home');
              onClose();
            }}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-sm shadow-purple-600/30 group-hover:bg-purple-700 transition-colors">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-slate-900 tracking-tight leading-none group-hover:text-purple-700 transition-colors">
                Social Influence
              </div>
              <div className="text-[10px] text-purple-700 font-mono font-bold mt-1">
                TN Politics & Cinema
              </div>
            </div>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors lg:hidden"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Notice Banner in Sidebar */}
        <div className="mx-3 my-2.5 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <span className="font-bold text-amber-900 block leading-tight font-mono text-[10px]">
              DEMO DATA ACTIVE
            </span>
            <span className="text-amber-800/90 text-[10px]">Academic Evaluation Model</span>
          </div>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-5">
          {categories.map((cat) => {
            const items = NAV_ITEMS.filter((item) => item.category === cat);
            return (
              <div key={cat} className="space-y-1">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                  {cat}
                </div>
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectSection(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-purple-600 text-white shadow-xs shadow-purple-600/30'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? 'text-white' : 'text-purple-600'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded-md font-bold uppercase shrink-0 ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 space-y-2 shrink-0">
          <button
            onClick={() => {
              onOpenUploader();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all border border-slate-200 shadow-2xs"
          >
            <Upload className="w-3.5 h-3.5 text-purple-600" />
            <span>Optional CSV Upload</span>
          </button>

          {onOpenApiStatus && (
            <button
              onClick={() => {
                onOpenApiStatus();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl text-slate-500 hover:text-slate-700 text-[11px] font-medium transition-colors"
            >
              <Server className="w-3.5 h-3.5 text-slate-400" />
              <span>Data Sources & API Status</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

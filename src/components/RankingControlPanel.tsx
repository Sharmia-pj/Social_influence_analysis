import React from 'react';
import { MultiPlatformWeights, RankingMode } from '../types/multiPlatform';
import { Sliders, RefreshCw, Trophy, Users, TrendingUp, Heart, Eye, Calendar } from 'lucide-react';
import { DEFAULT_WEIGHTS } from '../utils/multiPlatformData';

interface Props {
  weights: MultiPlatformWeights;
  onUpdateWeights: (weights: MultiPlatformWeights) => void;
  rankingMode: RankingMode;
  onSelectRankingMode: (mode: RankingMode) => void;
}

export const RankingControlPanel: React.FC<Props> = ({
  weights,
  onUpdateWeights,
  rankingMode,
  onSelectRankingMode
}) => {
  const modes: Array<{ id: RankingMode; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'influenceScore', label: 'Overall Influence Score', icon: Trophy },
    { id: 'followers', label: 'Most Followers / Subscribers', icon: Users },
    { id: 'engagement', label: 'Highest Engagement Rate', icon: TrendingUp }
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Ranking Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-purple-600" /> Influencer Ranking Criterion
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Select a primary sorting metric or customize multi-criteria weighting
          </p>
        </div>

        {rankingMode === 'influenceScore' && (
          <button
            onClick={() => onUpdateWeights(DEFAULT_WEIGHTS)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5 text-purple-600" /> Reset Weights
          </button>
        )}
      </div>

      {/* Mode Segmented Buttons */}
      <div className="flex flex-wrap gap-2">
        {modes.map((m) => {
          const Icon = m.icon;
          const isActive = rankingMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onSelectRankingMode(m.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Weight Sliders (Only active in Influence Score mode) */}
      {rankingMode === 'influenceScore' && (
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-purple-600" /> Multi-Criteria Linear Scoring Formula Weights
            </span>
            <span className="text-[11px] font-mono text-purple-700">
              Normalized Score $\in [0, 100]$
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Audience Weight */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 font-medium">Audience (w₁)</span>
                <span className="font-mono font-bold text-slate-900">{Math.round(weights.audience * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.6"
                step="0.05"
                value={weights.audience}
                onChange={(e) => onUpdateWeights({ ...weights, audience: parseFloat(e.target.value) })}
                className="w-full accent-purple-600 cursor-pointer"
                aria-label="Audience weight"
              />
            </div>

            {/* Engagement Rate Weight */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 font-medium">Engagement (w₂)</span>
                <span className="font-mono font-bold text-slate-900">{Math.round(weights.engagement * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.6"
                step="0.05"
                value={weights.engagement}
                onChange={(e) => onUpdateWeights({ ...weights, engagement: parseFloat(e.target.value) })}
                className="w-full accent-pink-600 cursor-pointer"
                aria-label="Engagement weight"
              />
            </div>

            {/* Interactions Weight */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 font-medium">Interactions (w₃)</span>
                <span className="font-mono font-bold text-slate-900">{Math.round(weights.interactions * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.6"
                step="0.05"
                value={weights.interactions}
                onChange={(e) => onUpdateWeights({ ...weights, interactions: parseFloat(e.target.value) })}
                className="w-full accent-blue-600 cursor-pointer"
                aria-label="Interactions weight"
              />
            </div>

            {/* Views Weight */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 font-medium">Avg Views (w₄)</span>
                <span className="font-mono font-bold text-slate-900">{Math.round(weights.views * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.6"
                step="0.05"
                value={weights.views}
                onChange={(e) => onUpdateWeights({ ...weights, views: parseFloat(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
                aria-label="Views weight"
              />
            </div>

            {/* Consistency Weight */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 font-medium">Consistency (w₅)</span>
                <span className="font-mono font-bold text-slate-900">{Math.round(weights.consistency * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.6"
                step="0.05"
                value={weights.consistency}
                onChange={(e) => onUpdateWeights({ ...weights, consistency: parseFloat(e.target.value) })}
                className="w-full accent-amber-600 cursor-pointer"
                aria-label="Consistency weight"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

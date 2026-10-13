import React, { useState } from 'react';
import { InfluencerProfile } from '../types/multiPlatform';
import { BarChart } from './Charts';
import { VerifiedAvatar } from './VerifiedAvatar';
import {
  Users,
  Check,
  X,
  TrendingUp,
  Heart,
  Eye,
  Info,
  Scale,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface Props {
  allInfluencers: InfluencerProfile[];
  onOpenProfile: (inf: InfluencerProfile) => void;
}

export const InfluencerComparison: React.FC<Props> = ({ allInfluencers, onOpenProfile }) => {
  // Pre-select 2 by default
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    return allInfluencers.slice(0, 3).map(i => i.id);
  });

  const selectedInfluencers = allInfluencers.filter(i => selectedIds.includes(i.id));

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(selectedIds.filter(item => item !== id));
      }
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const chartAudience = selectedInfluencers.map(i => ({
    label: i.name.split(' ')[0],
    value: i.followers,
    subLabel: `${i.audienceLabel}: ${i.followers.toLocaleString()}`
  }));

  const chartEngagement = selectedInfluencers.map(i => ({
    label: i.name.split(' ')[0],
    value: i.engagementRate,
    subLabel: `ER: ${i.engagementRate}%`
  }));

  const chartInteractions = selectedInfluencers.map(i => ({
    label: i.name.split(' ')[0],
    value: i.avgLikes + i.avgComments + (i.avgShares || 0),
    subLabel: `Avg: ${(i.avgLikes + i.avgComments + (i.avgShares || 0)).toLocaleString()}`
  }));

  const chartScore = selectedInfluencers.map(i => ({
    label: i.name.split(' ')[0],
    value: i.influenceScore,
    subLabel: `Score: ${i.influenceScore}/100`
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Influencer Head-to-Head Comparison</h1>
            <p className="text-xs text-slate-500">
              Select 2 to 4 creators to evaluate audience scale, engagement resonance, and normalized influence
            </p>
          </div>
        </div>

        {/* Selection Pills */}
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>Selected Creators ({selectedIds.length} of 4 max):</span>
            <span className="text-[11px] text-purple-600 font-medium">Click to toggle selection</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {allInfluencers.map((inf) => {
              const isSelected = selectedIds.includes(inf.id);
              return (
                <button
                  key={inf.id}
                  onClick={() => toggleSelect(inf.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                  }`}
                >
                  <VerifiedAvatar
                    name={inf.name}
                    avatarUrl={inf.avatarUrl}
                    category={inf.category}
                    size="sm"
                    className="w-5 h-5 rounded-md"
                  />
                  <span>{inf.name}</span>
                  <span className="text-[10px] opacity-75 uppercase">({inf.platform})</span>
                  {isSelected && <Check className="w-3.5 h-3.5 ml-0.5" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cross-Platform Metric Comparability Guidance Banner */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold block">Methodological Note on Cross-Platform Comparability:</span>
          <p className="leading-relaxed text-amber-800">
            YouTube <strong>Subscribers</strong> and Instagram/Twitter <strong>Followers</strong> represent different user subscription models.
            Similarly, YouTube views represent active content consumption, whereas Instagram reach estimates passive impression distribution.
            The <em>Overall Influence Score</em> mathematically scales each metric within its respective platform distribution.
          </p>
        </div>
      </div>

      {/* Comparison Cards Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {selectedInfluencers.map((inf) => (
          <div
            key={inf.id}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-purple-300 transition-all"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <VerifiedAvatar
                  name={inf.name}
                  avatarUrl={inf.avatarUrl}
                  category={inf.category}
                  officialProfileUrl={inf.officialProfileUrl}
                  size="md"
                  clickable={true}
                  className="rounded-xl shadow-xs shrink-0"
                />
                <div className="truncate">
                  <h3 className="font-bold text-slate-900 text-sm truncate">{inf.name}</h3>
                  <span className="text-[11px] font-mono text-purple-600 block">{inf.handle}</span>
                  <span className="text-[10px] font-semibold uppercase text-slate-400">{inf.platform} · {inf.category}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs divide-y divide-slate-100">
                <div className="pt-1.5 flex justify-between">
                  <span className="text-slate-500">{inf.audienceLabel}:</span>
                  <span className="font-bold text-slate-800 font-mono">{inf.followers.toLocaleString()}</span>
                </div>
                <div className="pt-1.5 flex justify-between">
                  <span className="text-slate-500">Engagement Rate:</span>
                  <span className="font-bold text-purple-700 font-mono">{inf.engagementRate}%</span>
                </div>
                <div className="pt-1.5 flex justify-between">
                  <span className="text-slate-500">Avg Interactions:</span>
                  <span className="font-bold text-slate-800 font-mono">
                    {(inf.avgLikes + inf.avgComments + (inf.avgShares || 0)).toLocaleString()}
                  </span>
                </div>
                <div className="pt-1.5 flex justify-between">
                  <span className="text-slate-500">Frequency:</span>
                  <span className="font-medium text-slate-700">{inf.postingFrequency}</span>
                </div>
                <div className="pt-1.5 flex justify-between">
                  <span className="text-slate-500">Influence Score:</span>
                  <span className="font-bold text-indigo-700 font-mono">{inf.influenceScore} / 100</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenProfile(inf)}
              className="w-full py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold transition-colors"
            >
              Full Profile Details
            </button>
          </div>
        ))}
      </div>

      {/* Side-by-Side Comparison Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-purple-600" /> Audience Comparison
          </h3>
          <BarChart data={chartAudience} height={200} accentColor="#7c3aed" />
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-pink-600" /> Engagement Rate Comparison (%)
          </h3>
          <BarChart
            data={chartEngagement}
            height={200}
            accentColor="#db2777"
            valueFormatter={(v) => `${v}%`}
          />
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-600" /> Average Interactions (Likes + Comments + Shares)
          </h3>
          <BarChart data={chartInteractions} height={200} accentColor="#e11d48" />
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Overall Influence Score (0 – 100)
          </h3>
          <BarChart
            data={chartScore}
            height={200}
            accentColor="#4f46e5"
            valueFormatter={(v) => `${v} / 100`}
          />
        </div>
      </div>
    </div>
  );
};

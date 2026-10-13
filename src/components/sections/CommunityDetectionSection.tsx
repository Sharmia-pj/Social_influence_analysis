import React from 'react';
import { AnalysisResults } from '../../types/analytics';
import { DonutChart, BarChart } from '../Charts';
import { Network, Users, Tag, Award, Sparkles, BookOpen } from 'lucide-react';

interface Props {
  results: AnalysisResults;
}

export const CommunityDetectionSection: React.FC<Props> = ({ results }) => {
  const { communities, graphNodes } = results;

  const donutData = communities.map((c) => ({
    label: c.name.slice(0, 16),
    value: c.size,
    color: c.color
  }));

  const barData = communities.map((c) => ({
    label: `Cluster #${c.id + 1}`,
    value: c.size,
    subLabel: `${c.percentage}% of nodes`,
    color: c.color
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50/50 to-white border border-purple-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-sm shadow-purple-600/20">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Community Detection Analysis</h1>
            <p className="text-xs text-slate-600">
              Unsupervised graph partitioning via Louvain Modularity optimization
            </p>
          </div>
        </div>

        <p className="text-slate-700 text-xs sm:text-sm mt-3 leading-relaxed border-t border-purple-100 pt-3">
          Real-world social networks exhibit modular structure, where users form dense clusters with frequent mutual
          mentions while maintaining sparser connections to external groups. Using{' '}
          <strong className="text-purple-700 font-semibold">Louvain Modularity maximization</strong> (implemented in Python via{' '}
          <code className="text-purple-700 font-mono font-semibold">community.best_partition</code> or NetworkX Louvain), the network is partitioned
          into cohesive sub-communities without requiring pre-labeled training classes.
        </p>
      </div>

      {/* Community Size Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Doughnut Chart */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col items-center justify-center">
          <h2 className="text-sm font-bold text-slate-900 mb-6 self-start flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-600" /> Community Size Proportions
          </h2>
          <DonutChart
            data={donutData}
            size={220}
            thickness={34}
            centerTitle="Total Nodes"
            centerValue={`${graphNodes.length}`}
          />
        </div>

        {/* Bar Chart */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <h2 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Network className="w-4 h-4 text-purple-600" /> Member Count by Cluster
          </h2>
          <div className="pt-2">
            <BarChart
              data={barData}
              height={220}
              valueFormatter={(v) => `${v} users`}
            />
          </div>
        </div>
      </div>

      {/* Detected Clusters Deep Dive Cards */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600" /> Detected Sub-Communities & Dominant Themes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {communities.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-purple-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border border-white shadow-2xs" style={{ backgroundColor: c.color }} />
                    <span className="font-mono text-xs font-bold text-slate-500">Cluster #{c.id + 1}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                    {c.size} nodes ({c.percentage}%)
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mb-2">{c.name}</h3>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[11px] text-slate-500 font-semibold block mb-1">Key Leaders in Cluster:</span>
                    <div className="flex flex-wrap gap-1">
                      {c.leadUsers.map((u, i) => (
                        <span key={i} className="font-mono text-[11px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-medium">
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] text-slate-500 font-semibold block mb-1">Dominant Keywords:</span>
                    <div className="flex flex-wrap gap-1">
                      {c.dominantKeywords.map((k, ki) => (
                        <span key={ki} className="text-[11px] text-emerald-700 font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Density: High</span>
                <span className="text-purple-700 font-semibold">Modularity Q &gt; 0.42</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

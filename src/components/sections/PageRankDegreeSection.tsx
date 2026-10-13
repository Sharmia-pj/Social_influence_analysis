import React, { useState } from 'react';
import { AnalysisResults } from '../../types/analytics';
import { LeaderboardBar } from '../Charts';
import { GitCommit, Award, BookOpen, Compass, Info, ArrowUpDown } from 'lucide-react';

interface Props {
  results: AnalysisResults;
}

export const PageRankDegreeSection: React.FC<Props> = ({ results }) => {
  const { graphNodes } = results;

  // Top by PageRank
  const topPageRank = [...graphNodes]
    .sort((a, b) => b.pageRank - a.pageRank)
    .slice(0, 10);

  // Top by In-Degree Centrality
  const topCentrality = [...graphNodes]
    .sort((a, b) => b.degreeCentrality - a.degreeCentrality)
    .slice(0, 10);

  const maxPR = topPageRank[0]?.pageRank || 1;
  const maxDC = topCentrality[0]?.degreeCentrality || 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50/50 to-white border border-purple-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-sm shadow-purple-600/20">
            <GitCommit className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">PageRank & Degree Centrality Analysis</h1>
            <p className="text-xs text-slate-600">
              Comparing local node connectivity against global topological prestige
            </p>
          </div>
        </div>

        <p className="text-slate-700 text-xs sm:text-sm mt-3 leading-relaxed border-t border-purple-100 pt-3">
          In network theory, different centrality measures capture distinct aspects of structural importance.
          While <strong className="text-blue-700">Degree Centrality</strong> measures local connectivity (how many directly adjacent
          links a user possesses), <strong className="text-purple-700">PageRank</strong> models the likelihood that a random information
          surfer traversing directed mentions lands on a specific node. A mention from a high-PageRank user transfers significantly more authority.
        </p>
      </div>

      {/* Mathematical Formulations Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PageRank Box */}
        <div className="p-5 rounded-2xl bg-white border border-purple-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-wider">
              Google PageRank Algorithm (α = 0.85)
            </span>
            <span className="text-[11px] font-mono text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full font-semibold">
              nx.pagerank()
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-200 font-mono text-xs text-purple-950 font-bold overflow-x-auto">
            PR(u) = (1 - α)/N + α · ∑ [ PR(v) / L(v) ]
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Recursively computes authority. In-coming mentions from highly influential users contribute greater weight than mentions from peripheral accounts.
          </p>
        </div>

        {/* Degree Centrality Box */}
        <div className="p-5 rounded-2xl bg-white border border-blue-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider">
              Normalized Degree Centrality
            </span>
            <span className="text-[11px] font-mono text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full font-semibold">
              nx.degree_centrality()
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 font-mono text-xs text-blue-950 font-bold overflow-x-auto">
            C_D(v) = deg(v) / (N - 1)
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Measures normalized immediate connections relative to the theoretical maximum possible degree in an N-node network graph.
          </p>
        </div>
      </div>

      {/* Side-by-Side Top 10 Comparison Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* PageRank Rankings */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-purple-600" /> Top 10 by PageRank Authority
          </h2>
          <div className="space-y-1">
            {topPageRank.map((node, idx) => (
              <LeaderboardBar
                key={node.id}
                rank={idx + 1}
                label={`@${node.id}`}
                subLabel={`In-deg: ${node.inDegree}`}
                value={node.pageRank}
                maxValue={maxPR}
                scoreDisplay={`${node.pageRank.toFixed(3)}%`}
                color="#7c3aed"
              />
            ))}
          </div>
        </div>

        {/* Degree Centrality Rankings */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-blue-600" /> Top 10 by Degree Centrality
          </h2>
          <div className="space-y-1">
            {topCentrality.map((node, idx) => (
              <LeaderboardBar
                key={node.id}
                rank={idx + 1}
                label={`@${node.id}`}
                subLabel={`Total deg: ${node.inDegree + node.outDegree}`}
                value={node.degreeCentrality}
                maxValue={maxDC}
                scoreDisplay={node.degreeCentrality.toFixed(4)}
                color="#2563eb"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Academic Discrepancy Note */}
      <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 flex items-start gap-3 text-xs text-purple-900">
        <Info className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Key Topological Insight:</strong> A user may have a moderate raw in-degree count but rank significantly
          higher in PageRank if the few users mentioning them are themselves major global network hubs. This validates
          why graph spectral algorithms provide superior influence resolution over raw citation counts.
        </p>
      </div>
    </div>
  );
};

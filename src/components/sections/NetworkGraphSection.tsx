import React, { useState } from 'react';
import { AnalysisResults, NetworkNode } from '../../types/analytics';
import { NetworkGraph } from '../NetworkGraph';
import { Network, GitFork, Shield, Info, Layers, Eye } from 'lucide-react';

interface Props {
  results: AnalysisResults;
}

export const NetworkGraphSection: React.FC<Props> = ({ results }) => {
  const { graphNodes, graphEdges, communities } = results;
  const [inspectedNode, setInspectedNode] = useState<NetworkNode | null>(null);

  const numNodes = graphNodes.length;
  const numEdges = graphEdges.length;
  const maxPossibleEdges = numNodes > 1 ? numNodes * (numNodes - 1) : 1;
  const density = (numEdges / maxPossibleEdges).toFixed(4);
  const avgDegree = numNodes > 0 ? ((2 * numEdges) / numNodes).toFixed(2) : '0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50/50 to-white border border-purple-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-sm shadow-purple-600/20">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Social Network Graph Analysis</h1>
            <p className="text-xs text-slate-600">
              Directed graph modeling with NetworkX, topological metrics, and force simulation
            </p>
          </div>
        </div>

        <p className="text-slate-700 text-xs sm:text-sm mt-3 leading-relaxed border-t border-purple-100 pt-3">
          Social relationships are modeled as a directed graph <strong className="text-purple-700">G = (V, E)</strong>,
          where vertices <strong className="text-slate-900">V</strong> represent Twitter handles and directed edges{' '}
          <strong className="text-slate-900">E</strong> represent mentions (<code className="text-purple-700 font-semibold font-mono">User A → User B</code>).
          The canvas below runs a real-time force simulation with Coulomb repulsion and Hooke elasticity, rendering
          community cluster color codings and structural node prestige.
        </p>
      </div>

      {/* Network Topology KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Total Vertices (|V|)</span>
          <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">{numNodes}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Unique users in graph</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Directed Edges (|E|)</span>
          <div className="text-xl font-extrabold text-emerald-600 font-mono mt-1">{numEdges}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Weighted mention links</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Network Density (D)</span>
          <div className="text-xl font-extrabold text-purple-700 font-mono mt-1">{density}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Graph connectivity ratio</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Average Degree (&lang;k&rang;)</span>
          <div className="text-xl font-extrabold text-blue-600 font-mono mt-1">{avgDegree}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Mean connections per node</span>
        </div>
      </div>

      {/* Interactive Force-Directed Canvas */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-600 px-1">
          <span className="flex items-center gap-1.5 font-semibold text-slate-800">
            <Eye className="w-3.5 h-3.5 text-purple-600" /> Interactive Canvas — Click & drag nodes, scroll to zoom, search handle
          </span>
          <span className="font-mono text-[11px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 font-bold">
            {communities.length} Communities Detected
          </span>
        </div>

        <NetworkGraph
          nodes={graphNodes}
          edges={graphEdges}
          communities={communities}
          onSelectNode={(node) => setInspectedNode(node)}
        />
      </div>

      {/* Inspected Node Detail Box if clicked */}
      {inspectedNode && (
        <div className="p-4 rounded-2xl bg-white border border-purple-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white font-mono text-sm shadow-sm"
              style={{ backgroundColor: inspectedNode.communityColor }}
            >
              @{inspectedNode.id[0]?.toUpperCase()}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>@{inspectedNode.id}</span>
                <span className="text-[11px] font-mono font-normal text-slate-500">
                  (Cluster: {communities[inspectedNode.communityId]?.name || inspectedNode.communityId})
                </span>
              </h3>
              <div className="flex flex-wrap gap-3 text-xs text-slate-600 font-mono mt-1">
                <span>PageRank: <strong className="text-purple-700 font-bold">{inspectedNode.pageRank.toFixed(3)}%</strong></span>
                <span>Degree Centrality: <strong className="text-blue-700 font-bold">{inspectedNode.degreeCentrality.toFixed(4)}</strong></span>
                <span>In-Degree: <strong className="text-emerald-600 font-bold">{inspectedNode.inDegree}</strong></span>
                <span>Out-Degree: <strong className="text-amber-600 font-bold">{inspectedNode.outDegree}</strong></span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setInspectedNode(null)}
            className="text-xs text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors font-semibold"
          >
            Clear Selection
          </button>
        </div>
      )}
    </div>
  );
};

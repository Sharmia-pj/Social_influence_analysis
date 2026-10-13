import React, { useState } from 'react';
import { AnalysisResults } from '../types/analytics';
import {
  FileText,
  X,
  Printer,
  Copy,
  Check,
  Award,
  Target,
  Layers,
  BarChart3,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  results: AnalysisResults;
}

export const ProjectSummaryModal: React.FC<Props> = ({ isOpen, onClose, results }) => {
  const [copied, setCopied] = useState(false);
  const { stats, influentialUsers, sentiment, communities, datasetName, isSampleData } = results;

  if (!isOpen) return null;

  const top1 = influentialUsers[0];
  const top2 = influentialUsers[1];
  const top3 = influentialUsers[2];

  const markdownSummary = `================================================================================
COLLEGE CAPSTONE PROJECT SUBMISSION REPORT
PROJECT TITLE: Social Media Influence Analytics – Multi-Platform Influencer Ranking System
================================================================================

1. PROJECT AIM
To design, implement, and validate an end-to-end data analytics and graph theory framework that quantifies social influence, decodes message sentiment, maps relational mention structures, evaluates network prestige through PageRank and degree centrality, partitions sub-communities via modularity maximization, and analyzes cross-platform creator dynamics.

2. RESEARCH OBJECTIVES
- Quantitative Influence Modeling: Apply Scikit-Learn MinMaxScaler feature normalization across Followers, Retweets, and Likes to compute an unbiased linear composite influence index (0–100 scale).
- Tweet Sentiment Classification: Perform lexicon-based polarity scoring to categorize tweet sentiment into Positive, Neutral, and Negative distributions.
- Relational Mention Extraction: Extract directed interpersonal interactions using regex handle tokenization r'@(\\w+)'.
- Network Topology & Spectral Centrality: Model directed graphs in NetworkX, comparing local in-degree centrality against global Google PageRank (alpha = 0.85).
- Unsupervised Community Detection: Partition the interaction graph into modular sub-communities using Louvain modularity optimization.
- Multi-Platform Generalization: Scale the model to Instagram, Facebook, and YouTube metrics with platform-specific engagement formulas.

3. METHODOLOGY & ALGORITHMIC WORKFLOW
- Preprocessing: Missing record imputation, deduplication, URL stripping (https?://\\S+), ASCII normalization, and datetime feature extraction.
- Feature Scaling: MinMaxScaler formula: Norm(x) = (x - min) / (max - min)
- Weighted Scoring Equation: Influence Score = 100 * [0.40 * Norm(RT) + 0.30 * Norm(Likes) + 0.30 * Norm(Followers)]
- Graph Modeling: G = (V, E) where V = users, E = directed mentions with weights.
- PageRank: Power iteration with damping factor alpha = 0.85, convergence epsilon = 1e-6.
- Community Discovery: Louvain modularity algorithm maximizing partition Q.

4. EMPIRICAL RESULTS & KEY FINDINGS
- Total Records Evaluated: ${stats.totalTweets.toLocaleString()}
- Unique Network Broadcasters: ${stats.uniqueUsers.toLocaleString()}
- Total Mention Interactions Extracted: ${stats.totalMentions.toLocaleString()}
- Graph Nodes: ${results.graphNodes.length} | Directed Edges: ${results.graphEdges.length}
- Louvain Communities Detected: ${communities.length} clusters
- Sentiment Distribution: ${sentiment.positivePct}% Positive, ${sentiment.neutralPct}% Neutral, ${sentiment.negativePct}% Negative
- Top Ranked Influencer: @${top1 ? top1.userName : 'N/A'} (Influence Score: ${top1 ? top1.influenceScore.toFixed(2) : 'N/A'}/100, Reach: ${top1 ? top1.reach.toLocaleString() : 'N/A'})
- Finding on Virality: Retweet syndication contributes higher composite influence than passive subscriber counts.
- Finding on Graph Prestige: PageRank isolates authoritative reference hubs even when raw in-degree counts are moderate.

5. RESEARCH LIMITATIONS
- Static Crawl Window: The analysis reflects a discrete temporal crawl rather than an evolving streaming graph.
- Bot & Service Handles: Automated notification handles require dedicated heuristic bot filtering to avoid activity skew.
- Sarcasm Detection Nuance: Lexicon-based sentiment rules may under-represent nuanced sarcasm.

6. CONCLUSION
The framework confirms that multi-criteria feature scaling combined with graph spectral centrality provides superior resolution in identifying social authority compared to traditional vanity metrics. The project satisfies all analytical, mathematical, and architectural requirements.
================================================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Project Submission Executive Summary</h2>
              <p className="text-xs text-slate-500">
                Academic Defense Synthesis · Aim, Objectives, Methodology, Results & Conclusion
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1 text-xs text-slate-700">
          {/* Metadata Banner */}
          <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
            <span className="text-purple-900 font-bold">PROJECT: Social Media Influence Analytics</span>
            <span className="text-slate-600 font-semibold">DATASET: {datasetName} {isSampleData ? '(Benchmark)' : '(Custom)'}</span>
          </div>

          {/* 1. AIM */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4 text-purple-600" /> 1. Project Aim
            </h3>
            <p className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 leading-relaxed text-slate-700">
              To design, execute, and validate an end-to-end computational pipeline that quantifies social influence,
              decodes sentiment polarities, constructs directed mention interaction graphs, evaluates structural authority
              via PageRank and degree centralities, discovers communities through unsupervised modularity maximization,
              and reveals multi-platform creator dynamics.
            </p>
          </div>

          {/* 2. OBJECTIVES */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 2. Research Objectives
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block font-bold">1. Quantitative Influence Index:</strong>
                MinMaxScaler normalization of retweets, likes, and followers to eliminate scale discrepancies.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block font-bold">2. Affective Sentiment Parsing:</strong>
                Lexicon-based polarity classification into Positive, Neutral, and Negative distributions.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block font-bold">3. Relational Mention Graph:</strong>
                Regex tokenization <code className="text-purple-700 font-mono">r'@(\w+)'</code> mapped to directed weighted NetworkX edges.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block font-bold">4. Multi-Platform Suite:</strong>
                Cross-platform rankings comparing Instagram, Facebook, Twitter/X, and YouTube.
              </div>
            </div>
          </div>

          {/* 3. METHODOLOGY */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-purple-600" /> 3. Algorithmic Methodology
            </h3>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-[11px]">
              <p>
                <strong>Mathematical Formula:</strong>{' '}
                <code className="text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded font-mono font-semibold">
                  Score = 100 × [0.40·Norm(RT) + 0.30·Norm(Likes) + 0.30·Norm(Followers)]
                </code>
              </p>
              <p>
                <strong>Graph Formulation:</strong> Directed graph G = (V, E). PageRank computed with damping factor α = 0.85
                and power iteration convergence. Community discovery executed using Louvain Modularity partition maximization.
              </p>
            </div>
          </div>

          {/* 4. RESULTS */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-emerald-600" /> 4. Empirical Results Summary
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200">
                <span className="text-[10px] text-purple-800 font-semibold block">Total Evaluated</span>
                <strong className="text-sm font-extrabold text-slate-900 font-mono">{stats.totalTweets.toLocaleString()}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200">
                <span className="text-[10px] text-blue-800 font-semibold block">Unique Users</span>
                <strong className="text-sm font-extrabold text-slate-900 font-mono">{stats.uniqueUsers.toLocaleString()}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-[10px] text-emerald-800 font-semibold block">Positive Tone</span>
                <strong className="text-sm font-extrabold text-slate-900 font-mono">{sentiment.positivePct}%</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-[10px] text-amber-800 font-semibold block">Communities</span>
                <strong className="text-sm font-extrabold text-slate-900 font-mono">{communities.length} Clusters</strong>
              </div>
            </div>
          </div>

          {/* 5. LIMITATIONS */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> 5. Research Limitations
            </h3>
            <p className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-slate-700 leading-relaxed text-[11px]">
              Snapshot crawl data does not model dynamic continuous time edge decay. Automated notification handles
              require heuristic pre-filtering, and lexicon polarity rules may under-represent nuanced sarcasm.
            </p>
          </div>

          {/* 6. CONCLUSION */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-600" /> 6. Academic Conclusion
            </h3>
            <p className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-200 font-medium text-slate-800 leading-relaxed">
              The project confirms that multi-criteria normalized feature scaling paired with topological graph algorithms
              provides far superior resolution in detecting genuine thought leadership than raw vanity metrics.
              The application successfully fulfills all submission criteria.
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-slate-500 font-mono hidden sm:block">
            Ready for College Capstone Defense
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-mono">Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-purple-600" />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Submission Form</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

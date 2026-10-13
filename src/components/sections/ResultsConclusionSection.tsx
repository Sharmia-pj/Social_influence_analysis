import React from 'react';
import { AnalysisResults } from '../../types/analytics';
import { Award, CheckCircle2, AlertTriangle, Lightbulb, FileText, Printer, ArrowRight } from 'lucide-react';

interface Props {
  results: AnalysisResults;
  onNavigateSection: (sectionId: string) => void;
  onOpenSummary?: () => void;
}

export const ResultsConclusionSection: React.FC<Props> = ({ results, onNavigateSection, onOpenSummary }) => {
  const { stats, influentialUsers, sentiment, communities } = results;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50/50 to-white border border-purple-200/90 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs">
            <span className="font-mono text-purple-700 font-bold uppercase">Project Conclusion</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-600 font-medium">Final Defense Synthesis</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Award className="w-5 h-5 text-purple-600" /> Final Results, Findings & Academic Conclusion
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Summary synthesis for professor demonstration and evaluation
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {onOpenSummary && (
            <button
              onClick={onOpenSummary}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs shadow-purple-600/30"
            >
              <FileText className="w-4 h-4" /> Full Submission Report
            </button>
          )}
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-all border border-slate-200 shadow-2xs"
          >
            <Printer className="w-4 h-4 text-purple-600" /> Print Summary
          </button>
        </div>
      </div>

      {/* Key Project Takeaways / Findings */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Key Research Findings & Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 space-y-2">
            <span className="text-purple-900 font-bold block text-sm">
              1. Virality Overrides Raw Subscriber Counts
            </span>
            <p className="text-slate-700 leading-relaxed">
              Applying MinMaxScaler normalization revealed that high retweet amplification yields higher composite influence
              than passive follower counts. Broadcasters with active syndication achieved top ranks even with smaller subscriber bases.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
            <span className="text-blue-900 font-bold block text-sm">
              2. PageRank Resolves Latent Network Authority
            </span>
            <p className="text-slate-700 leading-relaxed">
              While in-degree centrality simply counts incoming mentions, Google PageRank (α = 0.85) correctly isolated
              accounts referenced by other authoritative hubs (e.g. foundational labs and open-source ecosystems),
              demonstrating spectral prestige over raw volume.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
            <span className="text-emerald-900 font-bold block text-sm">
              3. Unsupervised Modularity Clusters Align with Thematic Topics
            </span>
            <p className="text-slate-700 leading-relaxed">
              Louvain community detection successfully partitioned the interaction graph into {communities.length} coherent
              sub-clusters without prior supervision. Lexical analysis validated that each cluster corresponds to distinct industry
              camps (e.g., Foundation Model Leaders vs Open-Source Practitioners).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
            <span className="text-amber-900 font-bold block text-sm">
              4. Mid-Week Windows Maximize Broadcast Efficiency
            </span>
            <p className="text-slate-700 leading-relaxed">
              Temporal analysis proved that Wednesday and Thursday generate peak engagement per tweet.
              Weekend broadcasts yielded lower overall syndication, recommending mid-week dissemination for crucial announcements.
            </p>
          </div>
        </div>
      </div>

      {/* Limitations & Future Work Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Limitations */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" /> Research Limitations
          </h2>
          <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside leading-relaxed">
            <li>
              <strong>Static Snapshot vs. Dynamic Streams:</strong> Data represents a finite crawl window rather than
              a streaming dynamic graph that accounts for edge decay over time.
            </li>
            <li>
              <strong>Bot & Automated Handle Filtering:</strong> Automated service handles may register high activity
              frequencies unless pre-filtered with specialized bot-detection classifiers.
            </li>
            <li>
              <strong>Lexicon Sarcasm Nuance:</strong> Lexicon-based polarity algorithms occasionally misclassify sarcastic
              or ironical microblogging colloquialisms.
            </li>
          </ul>
        </div>

        {/* Future Work */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-purple-600" /> Future Research Directions
          </h2>
          <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside leading-relaxed">
            <li>
              <strong>Temporal Graph Neural Networks (TGNNs):</strong> Incorporating continuous-time dynamic embeddings
              to model influence trajectory evolution.
            </li>
            <li>
              <strong>Multi-Modal LLM Sentiment:</strong> Embedding both tweet text and attached media/images for nuanced
              affective understanding.
            </li>
            <li>
              <strong>Causal Diffusion Modeling:</strong> Simulating message cascade cascades using Independent Cascade (IC)
              or Linear Threshold (LT) diffusion models.
            </li>
          </ul>
        </div>
      </div>

      {/* Executive Project Sign-Off Banner */}
      <div className="p-6 rounded-2xl bg-purple-50/80 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">College Project Submission Verification</h3>
          <p className="text-xs text-purple-900/80 mt-1">
            "Social Media Influence Analytics – Multi-Platform Influencer Ranking System" — Capstone Data Science & Network Theory Project.
          </p>
        </div>
        <button
          onClick={() => onNavigateSection('all')}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs shrink-0 flex items-center gap-2"
        >
          Explore Multi-Platform Rankings <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

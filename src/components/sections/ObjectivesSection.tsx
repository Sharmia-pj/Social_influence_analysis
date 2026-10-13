import React from 'react';
import { Target, CheckCircle2, BookOpen, Compass, Award, BarChart2 } from 'lucide-react';

export const ObjectivesSection: React.FC = () => {
  const objectives = [
    {
      id: 'OBJ-1',
      title: 'Quantitative Influence Modeling',
      aim: 'Develop and evaluate a normalized weighted scoring model to rank key opinion leaders.',
      methodology: 'MinMaxScaler normalization across Followers, Retweets, and Likes to prevent raw scale skew.',
      outcome: 'A calibrated 0–100 influence index identifying true thought leaders beyond raw vanity follower counts.'
    },
    {
      id: 'OBJ-2',
      title: 'Tweet Sentiment Classification',
      aim: 'Extract public opinion polarities across thousands of domain tweets.',
      methodology: 'Lexicon-based sentiment scoring (positive, negative, neutral) with compound score boundaries.',
      outcome: 'Identification of community sentiment balance and correlation between message tone and viral engagement.'
    },
    {
      id: 'OBJ-3',
      title: 'Relational Mention Network Extraction',
      aim: 'Model directed interpersonal engagement via Twitter user handle mentions (@username).',
      methodology: 'Regular expression tokenization r\'@(\\w+)\' and directed weighted edge mapping in NetworkX.',
      outcome: 'A structured directed graph distinguishing active broadcasting hubs from authoritative mention targets.'
    },
    {
      id: 'OBJ-4',
      title: 'Graph Centrality & PageRank Evaluation',
      aim: 'Assess node significance using graph theory centrality algorithms.',
      methodology: 'Calculation of In-Degree Centrality, Out-Degree Centrality, and Google PageRank (d = 0.85).',
      outcome: 'Proof that topological PageRank authority captures subtle network prestige better than simple in-degree count.'
    },
    {
      id: 'OBJ-5',
      title: 'Unsupervised Community Discovery',
      aim: 'Partition the social interaction graph into cohesive sub-communities without prior supervision.',
      methodology: 'Modularity optimization and Louvain-style label propagation algorithm.',
      outcome: 'Identification of distinct topic clusters (e.g. Open Source advocates, Enterprise AI leaders, Researchers).'
    },
    {
      id: 'OBJ-6',
      title: 'Temporal Activity & Weekday Dynamics',
      aim: 'Analyze temporal posting patterns and engagement density across weekdays.',
      methodology: 'Timestamp feature extraction into Day-of-Week (Monday through Sunday) with engagement aggregation.',
      outcome: 'Empirical recommendation for optimal timing windows for maximum viral reach.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50/50 to-white border border-purple-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-sm shadow-purple-600/20">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Project Aim & Objectives</h1>
            <p className="text-xs text-slate-600">Formal academic objectives, research targets, and evaluation benchmarks</p>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2 max-w-3xl">
          The primary goal of this research project is to build an end-to-end analytical framework capable of discovering
          structural influence patterns in social media streams, establishing quantifiable metrics to separate mere broadcasting
          volume from true communicative authority.
        </p>
      </div>

      {/* Objectives Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {objectives.map((obj) => (
          <div
            key={obj.id}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4 hover:border-purple-300 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-800 text-[11px] font-mono font-bold">
                  {obj.id}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">{obj.title}</h3>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div>
                  <strong className="text-slate-800 font-semibold block text-[11px] uppercase tracking-wider text-purple-700">
                    Aim
                  </strong>
                  <p>{obj.aim}</p>
                </div>

                <div>
                  <strong className="text-slate-800 font-semibold block text-[11px] uppercase tracking-wider text-slate-500">
                    Methodology
                  </strong>
                  <p className="font-mono text-[11px] text-slate-600">{obj.methodology}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-wider block mb-1">
                Expected Research Outcome
              </span>
              <p className="text-[11px] text-slate-700 font-medium">{obj.outcome}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

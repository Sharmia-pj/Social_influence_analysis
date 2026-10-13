import React from 'react';
import { AnalysisResults } from '../../types/analytics';
import { LeaderboardBar, BarChart } from '../Charts';
import { AtSign, Users, Award, Info, GitPullRequest, Hash } from 'lucide-react';

interface Props {
  results: AnalysisResults;
}

export const MentionAnalysisSection: React.FC<Props> = ({ results }) => {
  const { mentions, stats } = results;
  const top10 = mentions.slice(0, 10);
  const maxMentions = top10[0]?.count || 1;

  const barData = top10.map((m) => ({
    label: `@${m.userName.slice(0, 8)}`,
    value: m.count,
    subLabel: `${m.percentage}% of all mentions`
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50/50 to-white border border-purple-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-sm shadow-purple-600/20">
            <AtSign className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Most Mentioned Users Analysis</h1>
            <p className="text-xs text-slate-600">
              Regex handle extraction via <code>r'@(\w+)'</code> and frequency distribution counting
            </p>
          </div>
        </div>

        <p className="text-slate-700 text-xs sm:text-sm mt-3 leading-relaxed border-t border-purple-100 pt-3">
          On social networks, direct mentions (<code className="text-purple-700 font-semibold">@username</code>) represent interpersonal
          citations and endorsements. Analyzing the most mentioned targets reveals which organizations, leaders, and
          technologies serve as the primary focal points of community discourse, forming the incoming directed edges
          of our social graph.
        </p>
      </div>

      {/* Top 10 Mention Bar Chart & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Bar Chart */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-600" /> Top 10 Mention Frequency Distribution
            </h2>
            <span className="text-xs font-mono text-slate-500 font-medium">
              {stats.totalMentions} total mentions
            </span>
          </div>

          <div className="pt-2">
            <BarChart
              data={barData}
              height={260}
              valueFormatter={(v) => `${v} mentions`}
              accentColor="#3b82f6"
            />
          </div>
        </div>

        {/* Leaderboard Summary List */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-3 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-blue-600" /> Mention Rankings
          </h2>

          <div className="space-y-1 overflow-y-auto max-h-[290px] pr-1">
            {top10.map((item) => (
              <LeaderboardBar
                key={item.userName}
                rank={item.rank}
                label={`@${item.userName}`}
                value={item.count}
                maxValue={maxMentions}
                scoreDisplay={`${item.count} (${item.percentage}%)`}
                color="#3b82f6"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hubs vs Authorities Academic Concept Box */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <GitPullRequest className="w-4 h-4 text-purple-600" /> Theoretical Concept: Hubs vs. Authorities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
          <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 space-y-1.5">
            <span className="font-bold text-purple-900 uppercase tracking-wide text-[11px] block">
              1. Broadcaster Hubs (High Out-Degree)
            </span>
            <p className="text-slate-700 leading-relaxed">
              Accounts that broadcast frequently, generating numerous outgoing tweets and citing multiple peers.
              They drive activity volume, circulate news, and connect disparate clusters across the network.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-1.5">
            <span className="font-bold text-blue-900 uppercase tracking-wide text-[11px] block">
              2. Mention Authorities (High In-Degree)
            </span>
            <p className="text-slate-700 leading-relaxed">
              Accounts that receive high volumes of incoming mentions from external users. They act as authoritative sinks,
              benchmarks, and consensus reference points (e.g., @OpenAI, @sama, @ylecun, @huggingface).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

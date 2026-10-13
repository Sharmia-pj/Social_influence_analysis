import React, { useState } from 'react';
import { AnalysisResults, AnalysisWeights, InfluentialUser } from '../../types/analytics';
import { LeaderboardBar, BarChart } from '../Charts';
import { Award, Sliders, Info, TrendingUp, Users, Heart, Share2, Sparkles, RefreshCw } from 'lucide-react';

interface Props {
  results: AnalysisResults;
  weights: AnalysisWeights;
  onUpdateWeights: (weights: AnalysisWeights) => void;
}

export const InfluentialUsersSection: React.FC<Props> = ({ results, weights, onUpdateWeights }) => {
  const { influentialUsers } = results;
  const top10 = influentialUsers.slice(0, 10);

  const [activeTab, setActiveTab] = useState<'table' | 'chart'>('table');

  const handleRetweetChange = (val: number) => {
    onUpdateWeights({ ...weights, retweets: val });
  };

  const handleLikesChange = (val: number) => {
    onUpdateWeights({ ...weights, likes: val });
  };

  const handleFollowersChange = (val: number) => {
    onUpdateWeights({ ...weights, followers: val });
  };

  const resetDefaultWeights = () => {
    onUpdateWeights({ retweets: 0.4, likes: 0.3, followers: 0.3 });
  };

  const chartData = top10.map((u) => ({
    label: `@${u.userName.slice(0, 8)}`,
    value: u.influenceScore,
    subLabel: `Score: ${u.influenceScore.toFixed(1)}`
  }));

  const maxScore = top10[0]?.influenceScore || 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50/50 to-white border border-purple-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-sm shadow-purple-600/20">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Influential User Analysis</h1>
            <p className="text-xs text-slate-600">
              MinMaxScaler feature normalization & multi-criteria weighted scoring model
            </p>
          </div>
        </div>

        <p className="text-slate-700 text-xs sm:text-sm mt-3 leading-relaxed border-t border-purple-100 pt-3">
          Raw social media counts span vastly different numerical orders of magnitude (e.g. millions of followers vs. thousands of retweets).
          To eliminate scale bias, we apply <strong className="text-purple-700 font-semibold">MinMaxScaler normalization</strong> across
          Retweets, Likes, and Followers. The resulting normalized values in [0, 1] are aggregated through the project's
          weighted linear influence equation to determine the authoritative Top 10 leaders.
        </p>
      </div>

      {/* Mathematical Formula & Interactive Weight Slider Panel */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-600" /> Interactive Weighted Scoring Model
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Adjust criteria weights to observe real-time rank adjustments in the social network
            </p>
          </div>

          <button
            onClick={resetDefaultWeights}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs text-slate-700 font-semibold border border-slate-200 transition-colors self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5 text-purple-600" /> Reset to Notebook Defaults
          </button>
        </div>

        {/* Formula Box */}
        <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 font-mono text-xs text-purple-950 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-purple-700 font-bold">
            <span>MATHEMATICAL FORMULATION</span>
            <span>Scale: 0 – 100 Index</span>
          </div>
          <div className="text-xs sm:text-sm font-bold text-purple-900 tracking-wide overflow-x-auto py-1">
            Score = 100 × [ ({weights.retweets.toFixed(2)} × Norm_RT) + ({weights.likes.toFixed(2)} × Norm_Likes) + ({weights.followers.toFixed(2)} × Norm_Followers) ]
          </div>
          <div className="text-[11px] text-slate-600 font-sans">
            Where <code className="text-purple-700 font-mono text-[11px] bg-white px-1.5 py-0.5 rounded border border-purple-200">Norm(X) = (X - X_min) / (X_max - X_min)</code>
          </div>
        </div>

        {/* 3 Weight Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Retweets weight */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-700 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" /> Retweet Weight (w₁)
              </span>
              <span className="font-mono font-bold text-slate-900 text-xs">
                {(weights.retweets * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="0.8"
              step="0.05"
              value={weights.retweets}
              onChange={(e) => handleRetweetChange(parseFloat(e.target.value))}
              aria-label="Retweet Weight"
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <p className="text-[10px] text-slate-500">Measures viral transmission and direct audience syndication</p>
          </div>

          {/* Likes weight */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-pink-700 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" /> Likes Weight (w₂)
              </span>
              <span className="font-mono font-bold text-slate-900 text-xs">
                {(weights.likes * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="0.8"
              step="0.05"
              value={weights.likes}
              onChange={(e) => handleLikesChange(parseFloat(e.target.value))}
              aria-label="Likes Weight"
              className="w-full accent-pink-600 cursor-pointer"
            />
            <p className="text-[10px] text-slate-500">Measures qualitative resonance and community agreement</p>
          </div>

          {/* Followers weight */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-blue-700 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Followers Weight (w₃)
              </span>
              <span className="font-mono font-bold text-slate-900 text-xs">
                {(weights.followers * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="0.8"
              step="0.05"
              value={weights.followers}
              onChange={(e) => handleFollowersChange(parseFloat(e.target.value))}
              aria-label="Followers Weight"
              className="w-full accent-blue-600 cursor-pointer"
            />
            <p className="text-[10px] text-slate-500">Measures permanent broadcast network size and subscriber reach</p>
          </div>
        </div>
      </div>

      {/* Top 10 Leaderboard & Visualization */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-600" /> Top 10 Influential Users Leaderboard
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Calibrated rankings computed across {influentialUsers.length} active network authors
            </p>
          </div>

          {/* View Switcher */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1 text-xs self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('table')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeTab === 'table' ? 'bg-purple-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Metrics Table
            </button>
            <button
              onClick={() => setActiveTab('chart')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeTab === 'chart' ? 'bg-purple-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Score Chart
            </button>
          </div>
        </div>

        {activeTab === 'chart' ? (
          <div className="pt-2">
            <BarChart data={chartData} height={260} valueFormatter={(v) => `${v.toFixed(1)} / 100`} />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-mono">
                <tr>
                  <th className="p-3">Rank</th>
                  <th className="p-3">Influencer</th>
                  <th className="p-3 text-right">Followers</th>
                  <th className="p-3 text-right">Total Retweets</th>
                  <th className="p-3 text-right">Total Likes</th>
                  <th className="p-3 text-right">Calculated Reach</th>
                  <th className="p-3">Influence Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                {top10.map((user) => (
                  <tr key={user.userName} className="hover:bg-purple-50/20 transition-colors">
                    <td className="p-3 font-mono font-bold whitespace-nowrap">
                      <span className={`w-6 h-6 rounded flex items-center justify-center text-xs ${
                        user.rank === 1 ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                        user.rank === 2 ? 'bg-slate-200 text-slate-800 border border-slate-300' :
                        user.rank === 3 ? 'bg-orange-100 text-orange-800 border border-orange-300' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        #{user.rank}
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span className="text-slate-900 font-bold">@{user.userName}</span>
                      <span className="text-slate-500 text-[11px] block">{user.screenName}</span>
                    </td>
                    <td className="p-3 text-right font-mono text-slate-600 whitespace-nowrap">
                      {user.followers.toLocaleString()}
                    </td>
                    <td className="p-3 text-right font-mono text-emerald-600 font-semibold whitespace-nowrap">
                      {user.totalRetweets.toLocaleString()}
                    </td>
                    <td className="p-3 text-right font-mono text-pink-600 font-semibold whitespace-nowrap">
                      {user.totalLikes.toLocaleString()}
                    </td>
                    <td className="p-3 text-right font-mono text-purple-700 font-semibold whitespace-nowrap">
                      {user.reach > 1000000000
                        ? `${(user.reach / 1000000000).toFixed(1)}B`
                        : user.reach > 1000000
                        ? `${(user.reach / 1000000).toFixed(1)}M`
                        : user.reach.toLocaleString()}
                    </td>
                    <td className="p-3 min-w-[160px]">
                      <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                        <span className="font-extrabold text-slate-900">{user.influenceScore.toFixed(2)}</span>
                        <span className="text-slate-400">/ 100</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                          style={{ width: `${Math.min(100, (user.influenceScore / maxScore) * 100)}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Analytical Finding Note */}
      <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 flex items-start gap-3 text-xs text-purple-900">
        <Info className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Key Academic Observation:</strong> High follower accounts alone do not automatically dominate the influence index.
          Broadcasters who sustain high retweet virality (such as active technical researchers) obtain competitive scores
          due to the 40% weighting on transmission syndication (w_rt = 0.40).
        </p>
      </div>
    </div>
  );
};

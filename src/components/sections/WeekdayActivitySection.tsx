import React, { useState } from 'react';
import { AnalysisResults } from '../../types/analytics';
import { BarChart, AreaTrendChart } from '../Charts';
import { Calendar, TrendingUp, Clock, Sparkles, Share2, Heart } from 'lucide-react';

interface Props {
  results: AnalysisResults;
}

export const WeekdayActivitySection: React.FC<Props> = ({ results }) => {
  const { weekdayStats } = results;
  const [metricView, setMetricView] = useState<'tweets' | 'engagement' | 'sentiment'>('tweets');

  const barDataTweets = weekdayStats.map((d) => ({
    label: d.shortName,
    value: d.tweetCount,
    subLabel: `${d.weekday}: ${d.tweetCount} tweets`,
    color: '#7c3aed'
  }));

  const barDataEngagement = weekdayStats.map((d) => ({
    label: d.shortName,
    value: d.avgEngagement,
    subLabel: `Avg Eng: ${d.avgEngagement.toLocaleString()}`,
    color: '#ec4899'
  }));

  const areaData = weekdayStats.map((d) => ({
    label: d.shortName,
    value: d.totalLikes + d.totalRetweets
  }));

  // Find peak volume day and peak engagement day
  const peakVolumeDay = [...weekdayStats].sort((a, b) => b.tweetCount - a.tweetCount)[0];
  const peakEngageDay = [...weekdayStats].sort((a, b) => b.avgEngagement - a.avgEngagement)[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50/50 to-white border border-purple-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-sm shadow-purple-600/20">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Tweet Activity by Weekday</h1>
            <p className="text-xs text-slate-600">
              Temporal distribution, daily engagement density, and broadcasting rhythm patterns
            </p>
          </div>
        </div>

        <p className="text-slate-700 text-xs sm:text-sm mt-3 leading-relaxed border-t border-purple-100 pt-3">
          Microblogging platforms experience cyclical behavioral patterns influenced by work schedules and time zones.
          By parsing <code className="text-purple-700 font-mono font-semibold">created_at</code> timestamps across Monday through Sunday,
          we evaluate broadcast frequency against viral response to isolate optimal timing windows for high-impact social reach.
        </p>
      </div>

      {/* Weekday Summary Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-purple-600" /> Peak Broadcast Volume Day
          </span>
          <div className="text-xl font-extrabold text-slate-900 font-mono">
            {peakVolumeDay?.weekday || 'Wednesday'}
          </div>
          <span className="text-xs text-purple-700 font-mono font-semibold">
            {peakVolumeDay?.tweetCount} tweets posted
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-pink-600" /> Peak Average Engagement
          </span>
          <div className="text-xl font-extrabold text-slate-900 font-mono">
            {peakEngageDay?.weekday || 'Thursday'}
          </div>
          <span className="text-xs text-pink-700 font-mono font-semibold">
            {peakEngageDay?.avgEngagement.toLocaleString()} interactions/tweet
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Highest Positive Tone
          </span>
          <div className="text-xl font-extrabold text-slate-900 font-mono">
            {weekdayStats.sort((a, b) => b.positiveSentimentPct - a.positiveSentimentPct)[0]?.weekday || 'Friday'}
          </div>
          <span className="text-xs text-emerald-700 font-mono font-semibold">
            {weekdayStats.sort((a, b) => b.positiveSentimentPct - a.positiveSentimentPct)[0]?.positiveSentimentPct}% optimistic tweets
          </span>
        </div>
      </div>

      {/* Interactive Weekday Charts */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-600" /> Weekday Activity Distribution (Mon – Sun)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Switch views between volume, average engagement, and gross interactions
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1 text-xs self-start sm:self-auto">
            <button
              onClick={() => setMetricView('tweets')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                metricView === 'tweets' ? 'bg-purple-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tweet Volume
            </button>
            <button
              onClick={() => setMetricView('engagement')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                metricView === 'engagement' ? 'bg-purple-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Avg Engagement
            </button>
            <button
              onClick={() => setMetricView('sentiment')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                metricView === 'sentiment' ? 'bg-purple-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Total Interactions
            </button>
          </div>
        </div>

        <div className="pt-2">
          {metricView === 'tweets' ? (
            <BarChart
              data={barDataTweets}
              height={260}
              valueFormatter={(v) => `${v} tweets`}
              accentColor="#7c3aed"
            />
          ) : metricView === 'engagement' ? (
            <BarChart
              data={barDataEngagement}
              height={260}
              valueFormatter={(v) => `${v.toLocaleString()} interactions/tweet`}
              accentColor="#ec4899"
            />
          ) : (
            <AreaTrendChart
              data={areaData}
              height={260}
              lineColor="#7c3aed"
              fillColor="rgba(124, 58, 237, 0.08)"
              valueFormatter={(v) => `${v.toLocaleString()} total likes + RTs`}
            />
          )}
        </div>
      </div>

      {/* Weekday Breakdown Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-purple-600" /> Weekday Metrics Matrix
        </h2>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-mono">
              <tr>
                <th className="p-3">Day of Week</th>
                <th className="p-3 text-right">Tweets</th>
                <th className="p-3 text-right">Total Retweets</th>
                <th className="p-3 text-right">Total Likes</th>
                <th className="p-3 text-right">Avg Engagement</th>
                <th className="p-3 text-right">Positive Sentiment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
              {weekdayStats.map((row) => (
                <tr key={row.weekday} className="hover:bg-purple-50/20 transition-colors">
                  <td className="p-3 font-semibold text-slate-900 whitespace-nowrap">{row.weekday}</td>
                  <td className="p-3 text-right font-mono text-purple-700 font-bold">{row.tweetCount}</td>
                  <td className="p-3 text-right font-mono text-emerald-600">{row.totalRetweets.toLocaleString()}</td>
                  <td className="p-3 text-right font-mono text-pink-600">{row.totalLikes.toLocaleString()}</td>
                  <td className="p-3 text-right font-mono text-slate-900 font-bold">{row.avgEngagement.toLocaleString()}</td>
                  <td className="p-3 text-right font-mono text-emerald-600 font-semibold">{row.positiveSentimentPct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

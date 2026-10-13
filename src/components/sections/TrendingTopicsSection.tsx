import React from 'react';
import { AnalysisResults } from '../../types/analytics';
import { BarChart, LeaderboardBar } from '../Charts';
import { Hash, Type, Filter, Sparkles, BookOpen } from 'lucide-react';

interface Props {
  results: AnalysisResults;
}

export const TrendingTopicsSection: React.FC<Props> = ({ results }) => {
  const { trendingWords, trendingHashtags } = results;

  const top10Words = trendingWords.slice(0, 10);
  const maxWordCount = trendingWords[0]?.count || 1;

  const barData = top10Words.map((w) => ({
    label: w.word,
    value: w.count,
    subLabel: `${w.percentage}% occurrence`
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50/50 to-white border border-purple-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-sm shadow-purple-600/20">
            <Type className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Trending Words & Topics</h1>
            <p className="text-xs text-slate-600">
              Regex tokenization, stopword elimination, and Top 20 term frequency Counter
            </p>
          </div>
        </div>

        <p className="text-slate-700 text-xs sm:text-sm mt-3 leading-relaxed border-t border-purple-100 pt-3">
          To uncover the dominant conversational themes without manual labelling, the pipeline tokenizes cleaned
          tweet text, eliminates common English stopwords (e.g. <em>the, is, at, which, for</em>) along with Twitter noise
          tokens (<em>rt, http, amp</em>), and applies <code className="text-purple-700 font-semibold font-mono">collections.Counter</code> to isolate
          the Top 20 most frequent lexical terms and topical hashtags.
        </p>
      </div>

      {/* Top 20 Word Frequency Bar Chart & List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Bar Chart */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" /> Top Lexical Term Frequencies
            </h2>
            <span className="text-xs font-mono text-slate-500 font-medium">
              Top 10 of 20 visualized
            </span>
          </div>

          <div className="pt-2">
            <BarChart
              data={barData}
              height={260}
              valueFormatter={(v) => `${v} occurrences`}
              accentColor="#7c3aed"
            />
          </div>
        </div>

        {/* Top 20 Words Leaderboard */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-3 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
            <Type className="w-4 h-4 text-purple-600" /> Top 20 Words Ranking
          </h2>

          <div className="space-y-1 overflow-y-auto max-h-[290px] pr-1">
            {trendingWords.map((item, idx) => (
              <LeaderboardBar
                key={item.word}
                rank={idx + 1}
                label={item.word}
                value={item.count}
                maxValue={maxWordCount}
                scoreDisplay={`${item.count} (${item.percentage}%)`}
                color="#7c3aed"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hashtags & Topic Density Cloud */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Hash className="w-4 h-4 text-pink-600" /> Dominant Topic Hashtags Extracted
        </h2>

        <div className="flex flex-wrap gap-2.5">
          {trendingHashtags.map((tag) => (
            <div
              key={tag.word}
              className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 text-xs hover:border-purple-300 hover:bg-purple-50/30 transition-all shadow-2xs"
            >
              <span className="font-mono font-bold text-purple-700">{tag.word}</span>
              <span className="font-mono text-slate-600 text-[11px] bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold">
                {tag.count}x
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

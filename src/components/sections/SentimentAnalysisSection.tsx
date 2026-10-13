import React, { useState } from 'react';
import { AnalysisResults } from '../../types/analytics';
import { DonutChart } from '../Charts';
import { Sparkles, MessageCircle, Smile, Frown, Meh, Filter, Info } from 'lucide-react';

interface Props {
  results: AnalysisResults;
}

export const SentimentAnalysisSection: React.FC<Props> = ({ results }) => {
  const { sentiment, cleanedTweets } = results;
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');

  const chartData = [
    { label: 'Positive', value: sentiment.positiveCount, color: '#10b981' },
    { label: 'Neutral', value: sentiment.neutralCount, color: '#64748b' },
    { label: 'Negative', value: sentiment.negativeCount, color: '#ef4444' }
  ];

  const sampleTweets = cleanedTweets
    .filter(t => selectedCategory === 'all' || t.sentiment === selectedCategory)
    .slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50/50 to-white border border-purple-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-sm shadow-purple-600/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Tweet Sentiment Analysis</h1>
            <p className="text-xs text-slate-600">
              Lexicon-based polarity scoring & affective public opinion classification
            </p>
          </div>
        </div>

        <p className="text-slate-700 text-xs sm:text-sm mt-3 leading-relaxed border-t border-purple-100 pt-3">
          To evaluate how conversational tone influences audience reactions, each tweet is processed through a
          sentiment polarity classifier (adapted from Python VADER/TextBlob rule-based lexicons). Tweets are scored
          on a continuous [-1.0, +1.0] spectrum and partitioned into discrete Positive (&gt; 0.05), Neutral ([-0.05, +0.05]),
          and Negative (&lt; -0.05) categories.
        </p>
      </div>

      {/* Sentiment Overview Cards & Doughnut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Doughnut Chart Card */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-center items-center">
          <h2 className="text-sm font-bold text-slate-900 mb-6 self-start flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" /> Sentiment Distribution Breakdown
          </h2>
          <DonutChart
            data={chartData}
            size={220}
            thickness={36}
            centerTitle="Total"
            centerValue={`${cleanedTweets.length} Tweets`}
          />
        </div>

        {/* Metric Cards */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-3.5">
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Smile className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider">Positive Sentiment</span>
                <div className="text-xl font-extrabold text-slate-900 font-mono mt-0.5">
                  {sentiment.positivePct}% <span className="text-xs text-slate-500 font-normal">({sentiment.positiveCount} tweets)</span>
                </div>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold text-emerald-700">Optimistic tone</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-700">
                <Meh className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-700 font-bold uppercase tracking-wider">Neutral Sentiment</span>
                <div className="text-xl font-extrabold text-slate-900 font-mono mt-0.5">
                  {sentiment.neutralPct}% <span className="text-xs text-slate-500 font-normal">({sentiment.neutralCount} tweets)</span>
                </div>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-600">Objective / factual</span>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700">
                <Frown className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-rose-800 font-bold uppercase tracking-wider">Negative Sentiment</span>
                <div className="text-xl font-extrabold text-slate-900 font-mono mt-0.5">
                  {sentiment.negativePct}% <span className="text-xs text-slate-500 font-normal">({sentiment.negativeCount} tweets)</span>
                </div>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold text-rose-700">Critical / outages</span>
          </div>

          {/* Average Polarity Meter */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs shadow-2xs">
            <span className="text-slate-500 font-medium">Average Corpus Polarity:</span>
            <span className="font-mono font-extrabold text-purple-700 text-sm">
              {sentiment.avgScore > 0 ? `+${sentiment.avgScore}` : sentiment.avgScore}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Sample Tweet Inspector */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-purple-600" /> Classified Tweet Samples
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Inspecting real text strings alongside classified polarity labels
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1 text-xs self-start sm:self-auto">
            {(['all', 'positive', 'neutral', 'negative'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg capitalize font-semibold transition-colors ${
                  selectedCategory === cat ? 'bg-purple-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {sampleTweets.map((t) => (
            <div
              key={t.id}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-slate-900">@{t.userName}</span>
                  <span
                    className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full border ${
                      t.sentiment === 'positive'
                        ? 'text-emerald-800 bg-emerald-100 border-emerald-300'
                        : t.sentiment === 'negative'
                        ? 'text-rose-800 bg-rose-100 border-rose-300'
                        : 'text-slate-700 bg-slate-200 border-slate-300'
                    }`}
                  >
                    {t.sentiment} ({t.sentimentScore > 0 ? `+${t.sentimentScore.toFixed(2)}` : t.sentimentScore.toFixed(2)})
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-sans">{t.rawText}</p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-200">
                <span>Likes: {t.likes.toLocaleString()}</span>
                <span>Retweets: {t.retweets.toLocaleString()}</span>
                <span>{t.weekday}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

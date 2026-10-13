import React from 'react';
import { AnalysisResults } from '../../types/analytics';
import { Sparkles, Check, ArrowRight, Code, ShieldCheck, Terminal, Filter, RefreshCw } from 'lucide-react';

interface Props {
  results: AnalysisResults;
}

export const DataCleaningSection: React.FC<Props> = ({ results }) => {
  const { stats, cleanedTweets } = results;

  const sampleRawTweet = cleanedTweets[0]
    ? cleanedTweets[0].rawText
    : 'Excited to announce our new model! Check out https://t.co/xyz123 with @OpenAI and @gdb! #AI #Tech';

  const sampleCleanedTweet = cleanedTweets[0]
    ? cleanedTweets[0].cleanedText
    : 'excited to announce our new model check out with openai and gdb ai tech';

  const cleaningSteps = [
    {
      step: 'Step 1',
      title: 'Missing Value Imputation & Null Drop',
      pythonCode: `df.dropna(subset=['text', 'user_name'], inplace=True)`,
      desc: 'Removes records missing crucial author handles or message text, guaranteeing reliable downstream NLP parsing.',
      metric: `${stats.missingValuesHandled} Null Rows Handled`
    },
    {
      step: 'Step 2',
      title: 'Deduplication & Spam Elimination',
      pythonCode: `df.drop_duplicates(subset=['user_name', 'text'], keep='first', inplace=True)`,
      desc: 'Prunes duplicate retweets or bot copy-paste bursts to avoid artificial inflation of influence metrics.',
      metric: `${stats.duplicatesRemoved} Duplicates Dropped`
    },
    {
      step: 'Step 3',
      title: 'URL & Hyperlink Stripping',
      pythonCode: `text = re.sub(r'https?:\\/\\/\\S+', '', raw_text)`,
      desc: 'Removes web links, shorteners (t.co), and media anchors so they do not distort word frequency counts.',
      metric: '100% URLs Sanitized'
    },
    {
      step: 'Step 4',
      title: 'Entity Tokenization (Mentions & Hashtags)',
      pythonCode: `mentions = re.findall(r'@(\\w+)', text)\nhashtags = re.findall(r'#(\\w+)', text)`,
      desc: 'Extracts relational graph anchors (@handles) and thematic topical tags (#hashtags) prior to punctuation removal.',
      metric: `${stats.totalMentions} Mentions Extracted`
    },
    {
      step: 'Step 5',
      title: 'Punctuation Removal & Lowercasing',
      pythonCode: `text = re.sub(r'[^a-zA-Z0-9\\s]', ' ', text).lower().strip()`,
      desc: 'Normalizes character case and strips noise symbols, yielding a clean sequence for stopword filtering.',
      metric: 'Standardized ASCII Text'
    },
    {
      step: 'Step 6',
      title: 'Temporal Feature Engineering',
      pythonCode: `df['created_at'] = pd.to_datetime(df['created_at'])\ndf['weekday'] = df['created_at'].dt.day_name()`,
      desc: 'Transforms ISO timestamps into discrete categorical weekdays (Monday through Sunday) for activity trend analysis.',
      metric: '7 Weekday Bins'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50/50 to-white border border-purple-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-sm shadow-purple-600/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Data Cleaning & Preprocessing Pipeline</h1>
            <p className="text-xs text-slate-600">Standardized Python NLP cleaning transformations and feature extraction</p>
          </div>
        </div>

        <p className="text-slate-700 text-xs sm:text-sm mt-3 leading-relaxed border-t border-purple-100 pt-3">
          Raw Twitter datasets contain significant noise, including URL shorteners, bots, retweets with formatting prefixes (RT @),
          special characters, and missing metadata. Our preprocessing pipeline mirrors Pandas and regular expressions to convert raw,
          unstructured Twitter streams into clean, analytical tables ready for graph construction and scoring.
        </p>
      </div>

      {/* Before / After Comparison Showcase */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Code className="w-4 h-4 text-purple-600" /> Transformation Inspection: Before vs. After
          </h2>
          <span className="text-[11px] font-mono font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
            Live Dataset Row #1
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Before */}
          <div className="p-4 rounded-xl bg-slate-50 border border-rose-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-rose-700 font-bold">RAW UNCLEANED TWEET</span>
              <span className="text-slate-400">Unfiltered input</span>
            </div>
            <p className="text-xs text-slate-800 font-mono bg-white p-3 rounded-lg border border-rose-100 leading-relaxed break-words shadow-2xs">
              {sampleRawTweet}
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 pt-1 font-medium">
              <span className="text-rose-600">✗ Contains URLs</span>
              <span className="text-slate-300">·</span>
              <span className="text-rose-600">✗ Mixed casing</span>
              <span className="text-slate-300">·</span>
              <span className="text-rose-600">✗ Special characters</span>
            </div>
          </div>

          {/* After */}
          <div className="p-4 rounded-xl bg-purple-50/50 border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-700 font-bold">NORMALIZED & CLEANED TEXT</span>
              <span className="text-slate-400">NLP ready</span>
            </div>
            <p className="text-xs text-purple-950 font-mono bg-white p-3 rounded-lg border border-purple-200 leading-relaxed break-words shadow-2xs">
              {sampleCleanedTweet}
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] text-slate-600 pt-1 font-medium">
              <span className="text-emerald-600">✓ URLs stripped</span>
              <span className="text-slate-300">·</span>
              <span className="text-emerald-600">✓ Lowercase ASCII</span>
              <span className="text-slate-300">·</span>
              <span className="text-emerald-600">✓ Mentions extracted</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Cleaning Steps Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cleaningSteps.map((s, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-purple-300 transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono font-bold text-purple-700">{s.step}</span>
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                  {s.metric}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1.5">{s.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">{s.desc}</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block mb-1">Equivalent Python Code:</span>
              <pre className="text-[11px] text-purple-900 font-mono overflow-x-auto whitespace-pre">
                {s.pythonCode}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

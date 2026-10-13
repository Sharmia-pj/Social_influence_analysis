import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import { RawTweet } from '../types/analytics';
import { Upload, FileText, CheckCircle2, AlertTriangle, RefreshCw, X, ArrowRight, HelpCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDatasetLoaded: (data: RawTweet[], filename: string) => void;
  onRestoreSample: () => void;
  isCurrentlySample: boolean;
}

interface ColumnMapping {
  userName: string;
  text: string;
  retweetCount: string;
  favoriteCount: string;
  followersCount: string;
  createdAt: string;
}

export const CsvUploader: React.FC<Props> = ({
  isOpen,
  onClose,
  onDatasetLoaded,
  onRestoreSample,
  isCurrentlySample
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [previewRows, setPreviewRows] = useState<any[]>([]);
  const [totalParsedRows, setTotalParsedRows] = useState(0);
  const [rawParsedData, setRawParsedData] = useState<any[]>([]);
  const [mapping, setMapping] = useState<ColumnMapping>({
    userName: '',
    text: '',
    retweetCount: '',
    favoriteCount: '',
    followersCount: '',
    createdAt: ''
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  // Auto-detect matching column names
  const autoDetectColumns = (cols: string[]) => {
    const findMatch = (candidates: string[]) => {
      const lowerCols = cols.map(c => c.toLowerCase().trim());
      for (const cand of candidates) {
        const idx = lowerCols.indexOf(cand.toLowerCase());
        if (idx !== -1) return cols[idx];
      }
      for (const cand of candidates) {
        const idx = lowerCols.findIndex(c => c.includes(cand.toLowerCase()));
        if (idx !== -1) return cols[idx];
      }
      return '';
    };

    return {
      userName: findMatch(['user_name', 'username', 'author', 'user_screen_name', 'user', 'screen_name']),
      text: findMatch(['text', 'tweet_text', 'tweet', 'content', 'full_text', 'body']),
      retweetCount: findMatch(['retweet_count', 'retweets', 'retweet', 'retweetcount']),
      favoriteCount: findMatch(['favorite_count', 'likes', 'favoritecount', 'favourites', 'likes_count', 'like_count']),
      followersCount: findMatch(['followers_count', 'followers', 'user_followers', 'followerscount']),
      createdAt: findMatch(['created_at', 'date', 'timestamp', 'time', 'datetime', 'tweet_date'])
    };
  };

  // Clean number string containing commas (e.g., "1,420" -> 1420)
  const cleanNumber = (val: any, fallback = 0): number => {
    if (typeof val === 'number') return isNaN(val) ? fallback : val;
    if (!val && val !== 0) return fallback;
    const str = String(val).replace(/,/g, '').trim();
    const num = Number(str);
    return isNaN(num) ? fallback : num;
  };

  const handleDownloadSampleCsv = () => {
    const csvContent =
      `user_name,text,created_at,retweet_count,favorite_count,followers_count,user_location,hashtags\n` +
      `sama,"Excited to announce our new model! Thanks to @OpenAI and @gdb for engineering breakthroughs! #AI #DeepLearning",2024-03-11 14:22:00,14200,58900,2850000,"San Francisco, CA","#AI #DeepLearning"\n` +
      `ylecun,"Auto-regressive LLMs are useful, but World Models are the path forward. Great paper by @MetaAI research! #MachineLearning",2024-03-13 11:30:00,11400,46800,620000,"New York, NY","#MachineLearning"\n` +
      `AndrewYNg,"Agentic workflows drive massive AI progress this year. Short course with @LangChainAI and @hwchase17! #Python",2024-03-12 10:15:00,15800,64200,940000,"Palo Alto, CA","#Python"\n` +
      `karpathy,"Tokenization edge cases tutorial in raw Python. Reading @demishassabis thoughts today! #AI",2024-03-13 19:45:00,17500,76000,1120000,"San Francisco, CA","#AI"\n` +
      `elonmusk,"Grok 2 training complete. Open weights releasing soon. @xAI team did an incredible job. #Grok",2024-03-16 21:10:00,28900,145000,174000000,"Austin, TX","#Grok"`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'kaggle_twitter_sample_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (uploadedFile: File) => {
    setErrorMessage(null);
    setFile(uploadedFile);

    Papa.parse(uploadedFile, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        if (!results.data || results.data.length === 0) {
          setErrorMessage('The CSV file appears empty or unparseable. Please check the file formatting.');
          return;
        }

        const detectedHeaders = results.meta.fields || Object.keys(results.data[0] || {});
        if (detectedHeaders.length === 0) {
          setErrorMessage('No header columns found in the CSV.');
          return;
        }

        setHeaders(detectedHeaders);
        setRawParsedData(results.data);
        setTotalParsedRows(results.data.length);
        setPreviewRows(results.data.slice(0, 4));

        const detected = autoDetectColumns(detectedHeaders);
        setMapping(detected);

        if (!detected.text || !detected.userName) {
          setErrorMessage('Could not automatically detect tweet text or username column. Please select the mapping manually below.');
        }
      },
      error: (err) => {
        setErrorMessage(`CSV parsing error: ${err.message}`);
      }
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleApplyDataset = () => {
    if (!mapping.userName || !mapping.text) {
      setErrorMessage('Tweet Text and Username columns are required for network and influence analysis.');
      return;
    }

    setIsProcessing(true);
    try {
      const tweets: RawTweet[] = rawParsedData.map((row, idx) => {
        return {
          id: row.id || `tw_custom_${idx}`,
          user_name: String(row[mapping.userName] || 'anonymous').trim(),
          user_screen_name: String(row[mapping.userName] || 'anonymous').trim(),
          text: String(row[mapping.text] || ''),
          created_at: mapping.createdAt && row[mapping.createdAt] ? String(row[mapping.createdAt]) : new Date().toISOString(),
          retweet_count: mapping.retweetCount ? cleanNumber(row[mapping.retweetCount], 0) : 0,
          favorite_count: mapping.favoriteCount ? cleanNumber(row[mapping.favoriteCount], 0) : 0,
          followers_count: mapping.followersCount ? cleanNumber(row[mapping.followersCount], 1000) : 1000,
          user_location: row.user_location || row.location || undefined,
          hashtags: row.hashtags || undefined
        };
      });

      onDatasetLoaded(tweets, file?.name || 'Uploaded Twitter Dataset');
      onClose();
    } catch (err: any) {
      setErrorMessage(`Failed to process dataset: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Upload Twitter CSV Dataset</h2>
              <p className="text-xs text-slate-500">Import your original Kaggle project CSV for real-time analysis</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Restore sample option */}
          {!isCurrentlySample && (
            <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-2xl flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-purple-900 font-medium">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                <span>A custom dataset is currently active. You can restore the benchmark dataset at any time.</span>
              </div>
              <button
                onClick={() => {
                  onRestoreSample();
                  onClose();
                }}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shrink-0 flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Restore Benchmark
              </button>
            </div>
          )}

          {/* Drag & Drop Zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 hover:border-purple-500 rounded-2xl p-6 sm:p-8 text-center cursor-pointer bg-slate-50/50 hover:bg-purple-50/30 transition-all group"
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".csv,text/csv"
              onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
              className="hidden"
            />
            <FileText className="w-10 h-10 text-slate-400 group-hover:text-purple-600 mx-auto mb-3 transition-colors" />
            <p className="text-sm font-bold text-slate-800 group-hover:text-purple-700">
              {file ? file.name : 'Click to browse or drop your Twitter CSV here'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Supports standard Kaggle Twitter datasets with columns: username, text, likes, retweets, followers, date
            </p>
            {totalParsedRows > 0 && (
              <span className="inline-block mt-3 text-xs font-mono text-purple-800 bg-purple-100 border border-purple-200 px-2.5 py-1 rounded-md font-semibold">
                Parsed {totalParsedRows.toLocaleString()} rows successfully
              </span>
            )}
          </div>

          {/* Download Sample Template helper */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs">
            <span className="text-slate-600">Need a test dataset file? Download the standardized Kaggle format:</span>
            <button
              onClick={handleDownloadSampleCsv}
              className="text-xs text-purple-700 hover:text-purple-900 font-bold underline flex items-center gap-1 shrink-0 ml-2"
            >
              Download Sample CSV (.csv)
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>{errorMessage}</div>
            </div>
          )}

          {/* Column Mapping Section if file loaded */}
          {headers.length > 0 && (
            <div className="space-y-3 bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-purple-600" /> Verify Column Mapping
                </h3>
                <span className="text-[11px] text-slate-500">Match your CSV columns to model variables</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Tweet Text <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={mapping.text}
                    onChange={(e) => setMapping({ ...mapping, text: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2 text-slate-800 font-medium focus:outline-hidden focus:border-purple-600 shadow-2xs"
                  >
                    <option value="">-- Select column --</option>
                    {headers.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Username / Author <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={mapping.userName}
                    onChange={(e) => setMapping({ ...mapping, userName: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2 text-slate-800 font-medium focus:outline-hidden focus:border-purple-600 shadow-2xs"
                  >
                    <option value="">-- Select column --</option>
                    {headers.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Retweets (Retweet Count)</label>
                  <select
                    value={mapping.retweetCount}
                    onChange={(e) => setMapping({ ...mapping, retweetCount: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2 text-slate-800 font-medium focus:outline-hidden focus:border-purple-600 shadow-2xs"
                  >
                    <option value="">-- Optional (defaults to 0) --</option>
                    {headers.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Likes / Favorites</label>
                  <select
                    value={mapping.favoriteCount}
                    onChange={(e) => setMapping({ ...mapping, favoriteCount: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2 text-slate-800 font-medium focus:outline-hidden focus:border-purple-600 shadow-2xs"
                  >
                    <option value="">-- Optional (defaults to 0) --</option>
                    {headers.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Followers Count</label>
                  <select
                    value={mapping.followersCount}
                    onChange={(e) => setMapping({ ...mapping, followersCount: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2 text-slate-800 font-medium focus:outline-hidden focus:border-purple-600 shadow-2xs"
                  >
                    <option value="">-- Optional (defaults to 1000) --</option>
                    {headers.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Date / Created At</label>
                  <select
                    value={mapping.createdAt}
                    onChange={(e) => setMapping({ ...mapping, createdAt: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2 text-slate-800 font-medium focus:outline-hidden focus:border-purple-600 shadow-2xs"
                  >
                    <option value="">-- Optional (for weekday analysis) --</option>
                    {headers.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Quick Preview Table */}
          {previewRows.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-700 mb-2">CSV Sample Preview (First 3 Rows):</div>
              <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto shadow-2xs">
                <table className="w-full text-[11px] text-left">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <tr>
                      {headers.slice(0, 5).map(h => (
                        <th key={h} className="p-2.5 font-mono">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                    {previewRows.slice(0, 3).map((r, i) => (
                      <tr key={i}>
                        {headers.slice(0, 5).map(h => (
                          <td key={h} className="p-2.5 truncate max-w-[150px]">
                            {String(r[h] ?? '')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleApplyDataset}
            disabled={!file || !mapping.userName || !mapping.text || isProcessing}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              file && mapping.userName && mapping.text && !isProcessing
                ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isProcessing ? 'Processing Analytics...' : 'Run Analysis on Dataset'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

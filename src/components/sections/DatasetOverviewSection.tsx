import React, { useState, useMemo } from 'react';
import { AnalysisResults, CleanedTweet } from '../../types/analytics';
import { Database, Search, Filter, Calendar, Users, Eye, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  results: AnalysisResults;
  onOpenUploader: () => void;
}

export const DatasetOverviewSection: React.FC<Props> = ({ results, onOpenUploader }) => {
  const { stats, cleanedTweets, datasetName, isSampleData } = results;
  const [searchTerm, setSearchTerm] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');
  const [sortBy, setSortBy] = useState<'likes' | 'retweets' | 'followers' | 'recent'>('likes');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Filtered & sorted tweets
  const filteredTweets = useMemo(() => {
    let list = cleanedTweets.filter((t) => {
      const matchSearch =
        searchTerm === '' ||
        t.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.screenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.cleanedText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.rawText.toLowerCase().includes(searchTerm.toLowerCase());

      const matchSentiment = sentimentFilter === 'all' || t.sentiment === sentimentFilter;

      return matchSearch && matchSentiment;
    });

    list.sort((a, b) => {
      if (sortBy === 'likes') return b.likes - a.likes;
      if (sortBy === 'retweets') return b.retweets - a.retweets;
      if (sortBy === 'followers') return b.followers - a.followers;
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    return list;
  }, [cleanedTweets, searchTerm, sentimentFilter, sortBy]);

  const totalPages = Math.ceil(filteredTweets.length / pageSize) || 1;
  const paginatedTweets = filteredTweets.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const schemaColumns = [
    { name: 'user_name', type: 'VARCHAR / string', desc: 'Unique account handle (e.g. sama, ylecun)' },
    { name: 'text', type: 'TEXT / string', desc: 'Raw body text of tweet including mentions and links' },
    { name: 'created_at', type: 'DATETIME / timestamp', desc: 'Publication timestamp used for weekday binning' },
    { name: 'retweet_count', type: 'INTEGER / float', desc: 'Direct broadcast resharing metric' },
    { name: 'favorite_count', type: 'INTEGER / float', desc: 'Favoriting / like engagement metric' },
    { name: 'followers_count', type: 'INTEGER / float', desc: 'Total author subscribers / follower reach' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50/50 to-white border border-purple-200/90 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-purple-700 font-bold uppercase">Data Collection Phase</span>
            {isSampleData && (
              <span className="px-2 py-0.5 rounded text-[11px] bg-amber-50 text-amber-800 border border-amber-300 font-mono font-medium">
                Sample Benchmark
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Database className="w-5 h-5 text-purple-600" /> Dataset Overview & Metadata
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Current active dataset: <span className="text-slate-900 font-semibold">{datasetName}</span>
          </p>
        </div>

        <button
          onClick={onOpenUploader}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs shrink-0"
        >
          Upload Different CSV
        </button>
      </div>

      {/* Dataset Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Total Valid Records</span>
          <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">{stats.totalTweets.toLocaleString()}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">{stats.duplicatesRemoved} duplicates dropped</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Unique Broadcasters</span>
          <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">{stats.uniqueUsers.toLocaleString()}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Authors across network</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Active Temporal Range</span>
          <div className="text-sm font-bold text-slate-900 font-mono mt-1 truncate">
            {stats.dateRange.start} – {stats.dateRange.end}
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Consecutive crawl span</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Total Mentions Extracted</span>
          <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">{stats.totalMentions.toLocaleString()}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Directed relational edges</span>
        </div>
      </div>

      {/* Schema Attributes Specification */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Filter className="w-4 h-4 text-purple-600" /> Dataset Schema & Feature Definitions
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-mono">
              <tr>
                <th className="p-3">Attribute Name</th>
                <th className="p-3">Data Type</th>
                <th className="p-3">Analytical Purpose in Project</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
              {schemaColumns.map((col) => (
                <tr key={col.name} className="hover:bg-purple-50/30">
                  <td className="p-3 font-mono font-bold text-purple-700">{col.name}</td>
                  <td className="p-3 font-mono text-slate-500">{col.type}</td>
                  <td className="p-3">{col.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Raw Dataset Explorer */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Eye className="w-4 h-4 text-purple-600" /> Interactive Tweet Data Explorer
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing {filteredTweets.length} matching rows (Page {currentPage} of {totalPages})
            </p>
          </div>

          {/* Search & Sort Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search user or tweet..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-purple-600 focus:bg-white w-44 transition-colors"
              />
            </div>

            <select
              value={sentimentFilter}
              onChange={(e) => {
                setSentimentFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              aria-label="Filter tweets by sentiment"
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 font-semibold focus:outline-hidden focus:border-purple-600"
            >
              <option value="all">All Sentiments</option>
              <option value="positive">Positive Only</option>
              <option value="neutral">Neutral Only</option>
              <option value="negative">Negative Only</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort tweets by metric"
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 font-semibold focus:outline-hidden focus:border-purple-600"
            >
              <option value="likes">Sort by Likes</option>
              <option value="retweets">Sort by Retweets</option>
              <option value="followers">Sort by Followers</option>
              <option value="recent">Sort by Date</option>
            </select>
          </div>
        </div>

        {/* Tweet Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-mono">
              <tr>
                <th className="p-3">Author</th>
                <th className="p-3">Tweet Content</th>
                <th className="p-3 text-right">Retweets</th>
                <th className="p-3 text-right">Likes</th>
                <th className="p-3 text-right">Followers</th>
                <th className="p-3">Sentiment</th>
                <th className="p-3">Day</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
              {paginatedTweets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-xs text-slate-500">
                    <p>No tweets found matching your filter criteria.</p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSentimentFilter('all');
                      }}
                      className="mt-2 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-purple-700 font-semibold rounded-lg transition-colors"
                    >
                      Clear search filters
                    </button>
                  </td>
                </tr>
              ) : (
                paginatedTweets.map((t) => (
                  <tr key={t.id} className="hover:bg-purple-50/20 transition-colors">
                    <td className="p-3 font-medium whitespace-nowrap">
                      <span className="text-slate-900 font-bold">@{t.userName}</span>
                      <span className="text-slate-500 text-[11px] block">{t.screenName}</span>
                    </td>
                    <td className="p-3 max-w-sm sm:max-w-md">
                      <p className="text-slate-700 leading-snug line-clamp-2">{t.rawText}</p>
                      {t.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {t.hashtags.map((h, hi) => (
                            <span key={hi} className="text-[10px] text-purple-600 font-mono font-medium">
                              {h}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-right font-mono text-emerald-600 font-semibold whitespace-nowrap">
                      {t.retweets.toLocaleString()}
                    </td>
                    <td className="p-3 text-right font-mono text-pink-600 font-semibold whitespace-nowrap">
                      {t.likes.toLocaleString()}
                    </td>
                    <td className="p-3 text-right font-mono text-slate-500 whitespace-nowrap">
                      {t.followers.toLocaleString()}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                          t.sentiment === 'positive'
                            ? 'bg-emerald-50 text-emerald-700'
                            : t.sentiment === 'negative'
                            ? 'bg-rose-50 text-rose-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {t.sentiment.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-500 whitespace-nowrap">
                      {t.weekday.slice(0, 3)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
          <span>
            Showing {(currentPage - 1) * pageSize + 1} to{' '}
            {Math.min(currentPage * pageSize, filteredTweets.length)} of {filteredTweets.length} entries
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`p-1.5 rounded-lg border border-slate-200 ${
                currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-slate-700 font-semibold">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`p-1.5 rounded-lg border border-slate-200 ${
                currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

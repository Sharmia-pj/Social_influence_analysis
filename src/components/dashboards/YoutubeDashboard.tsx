import React, { useState, useMemo } from 'react';
import { InfluencerProfile } from '../../types/multiPlatform';
import { LeaderboardBar, BarChart } from '../Charts';
import { VerifiedAvatar } from '../VerifiedAvatar';
import {
  Youtube,
  Play,
  Eye,
  MessageCircle,
  TrendingUp,
  Filter,
  Search,
  CheckCircle,
  Sparkles,
  Award,
  Video
} from 'lucide-react';

interface Props {
  influencers: InfluencerProfile[];
  onOpenProfile: (inf: InfluencerProfile) => void;
}

export const YoutubeDashboard: React.FC<Props> = ({ influencers, onOpenProfile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'followers' | 'engagementRate' | 'views'>('followers');

  const ytInfluencers = useMemo(() => {
    return influencers.filter(i => i.platform === 'youtube');
  }, [influencers]);

  const filtered = useMemo(() => {
    let list = ytInfluencers.filter((inf) => {
      const matchSearch =
        searchTerm === '' ||
        inf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inf.handle.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCat = selectedCategory === 'all' || inf.category === selectedCategory;
      return matchSearch && matchCat;
    });

    list.sort((a, b) => {
      if (sortBy === 'followers') return b.followers - a.followers;
      if (sortBy === 'engagementRate') return b.engagementRate - a.engagementRate;
      if (sortBy === 'views') return (b.avgViews || 0) - (a.avgViews || 0);
      return b.influenceScore - a.influenceScore;
    });

    return list;
  }, [ytInfluencers, searchTerm, selectedCategory, sortBy]);

  const categories = ['all', 'Tamil Nadu Politicians', 'Tamil Cinema Celebrities'];

  // Top channels by Subscribers
  const topSubs = [...ytInfluencers].sort((a, b) => b.followers - a.followers).slice(0, 10);
  const maxSubs = topSubs[0]?.followers || 1;

  // Top channels by Video Views
  const topViews = [...ytInfluencers].sort((a, b) => (b.avgViews || 0) - (a.avgViews || 0)).slice(0, 10);
  const maxViews = topViews[0]?.avgViews || 1;

  const chartViews = ytInfluencers.map(i => ({
    label: i.name.split(' ')[0],
    value: i.avgViews || 0,
    subLabel: `Avg Views: ${(i.avgViews || 0).toLocaleString()}`
  }));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-50 via-rose-50 to-white border border-red-200/80 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-red-100 text-red-700 border border-red-200">
              Long-Form Video Telemetry
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-medium">YouTube Data API v3 Standard</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Youtube className="w-6 h-6 text-red-600" /> YouTube Channel Rankings & Video Viewership
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Formula: <code className="text-red-700 bg-red-100/60 px-1.5 py-0.5 rounded font-mono">ER = ((Likes + Comments) / Avg Video Views) × 100</code>
          </p>
        </div>

        <div className="p-3 bg-white rounded-xl border border-red-200 shadow-sm text-center font-mono text-xs shrink-0">
          <span className="text-[10px] text-slate-400 block uppercase">Channels Tracked</span>
          <strong className="text-red-700 text-base">{ytInfluencers.length}</strong>
        </div>
      </div>

      {/* Subscriber vs Follower Metric Distinction Notice */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold block">Methodological Note on YouTube Subscribers:</span>
          <p className="leading-relaxed text-[11px] text-amber-800">
            YouTube <strong>Subscribers</strong> indicate a persistent channel opt-in subscription, differing fundamentally from fast-scrolling social followers.
            Engagement rate on YouTube is evaluated per <em>video view</em> rather than gross subscriber counts to reflect real audience retention.
          </p>
        </div>
      </div>

      {/* Top Subscribers vs Top Views Rankings Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Top by Subscribers */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-red-600" /> Top Channels by Lifetime Subscribers
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Channel Base</span>
          </div>
          <div className="space-y-1">
            {topSubs.map((inf, idx) => (
              <LeaderboardBar
                key={inf.id}
                rank={idx + 1}
                label={inf.name}
                subLabel={inf.handle}
                value={inf.followers}
                maxValue={maxSubs}
                scoreDisplay={inf.followers.toLocaleString()}
                secondaryText={inf.category}
                color="#ef4444"
              />
            ))}
          </div>
        </div>

        {/* Top by Average Video Views */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-purple-600" /> Top Channels by Average Video Views
            </h3>
            <span className="text-[11px] font-mono text-slate-400">View Velocity</span>
          </div>
          <div className="space-y-1">
            {topViews.map((inf, idx) => (
              <LeaderboardBar
                key={inf.id}
                rank={idx + 1}
                label={inf.name}
                subLabel={inf.handle}
                value={inf.avgViews || 0}
                maxValue={maxViews}
                scoreDisplay={(inf.avgViews || 0).toLocaleString()}
                secondaryText={inf.category}
                color="#8b5cf6"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Average Video Views Chart */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Video className="w-4 h-4 text-red-600" /> Average Views per Uploaded Video
          </h3>
          <span className="text-[11px] font-mono text-slate-500">Per-Video Viewership</span>
        </div>
        <BarChart data={chartViews} height={200} accentColor="#ef4444" />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search YouTube channel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-500 w-52 sm:w-60"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-red-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter by Category"
              className="bg-transparent text-slate-700 font-medium focus:outline-none cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'all' ? 'All Categories' : c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            aria-label="Sort YouTube channels"
            className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 font-medium focus:outline-none focus:border-red-500"
          >
            <option value="followers">Subscribers</option>
            <option value="views">Average Video Views</option>
            <option value="engagementRate">Engagement Rate</option>
          </select>
        </div>
      </div>

      {/* Channel Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((inf) => (
          <div
            key={inf.id}
            onClick={() => onOpenProfile(inf)}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-red-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start gap-3 mb-3">
                <VerifiedAvatar
                  name={inf.name}
                  avatarUrl={inf.avatarUrl}
                  category={inf.category}
                  officialProfileUrl={inf.officialProfileUrl}
                  size="md"
                  clickable={true}
                  className="w-13 h-13 rounded-2xl shrink-0"
                />
                <div className="truncate flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm truncate flex items-center gap-1">
                    {inf.name}
                    {inf.verified && <CheckCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />}
                  </h4>
                  <a
                    href={inf.officialProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[11px] font-mono text-red-600 hover:text-red-800 hover:underline block truncate"
                  >
                    {inf.handle}
                  </a>
                  <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{inf.category}</span>
                    {inf.party && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 font-mono truncate max-w-[130px]">
                        {inf.party.split('(')[0].trim()}
                      </span>
                    )}
                    {inf.profession && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 font-mono truncate max-w-[130px]">
                        {inf.profession}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs divide-y divide-slate-100 font-mono">
                <div className="pt-1.5 flex justify-between">
                  <span className="text-slate-500 font-sans">Subscribers:</span>
                  <strong className="text-slate-900">{inf.followers.toLocaleString()}</strong>
                </div>
                <div className="pt-1.5 flex justify-between">
                  <span className="text-slate-500 font-sans">Avg Views:</span>
                  <strong className="text-red-600">{(inf.avgViews || 0).toLocaleString()}</strong>
                </div>
                <div className="pt-1.5 flex justify-between">
                  <span className="text-slate-500 font-sans">View-to-Engagement:</span>
                  <strong className="text-purple-700">{inf.engagementRate}%</strong>
                </div>
                <div className="pt-1.5 flex justify-between">
                  <span className="text-slate-500 font-sans">Upload Cadence:</span>
                  <strong className="text-slate-700">{inf.postingFrequency}</strong>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-sans text-[11px]">{inf.country}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenProfile(inf);
                }}
                className="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-semibold transition-colors"
              >
                Channel Deep Dive
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { InfluencerProfile } from '../../types/multiPlatform';
import { LeaderboardBar, BarChart } from '../Charts';
import { VerifiedAvatar } from '../VerifiedAvatar';
import {
  Instagram,
  Heart,
  MessageCircle,
  Eye,
  TrendingUp,
  Filter,
  Search,
  CheckCircle,
  Video,
  Sparkles,
  Award
} from 'lucide-react';

interface Props {
  influencers: InfluencerProfile[];
  onOpenProfile: (inf: InfluencerProfile) => void;
}

export const InstagramDashboard: React.FC<Props> = ({ influencers, onOpenProfile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'influenceScore' | 'followers' | 'engagementRate' | 'views'>('followers');

  const igInfluencers = useMemo(() => {
    return influencers.filter(i => i.platform === 'instagram');
  }, [influencers]);

  const filtered = useMemo(() => {
    let list = igInfluencers.filter((inf) => {
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
  }, [igInfluencers, searchTerm, selectedCategory, sortBy]);

  const categories = ['all', 'Tamil Nadu Politicians', 'Tamil Cinema Celebrities'];

  // Top 10 by Followers
  const topFollowers = [...igInfluencers].sort((a, b) => b.followers - a.followers).slice(0, 10);
  const maxFollowers = topFollowers[0]?.followers || 1;

  // Top 10 by Engagement Rate
  const topER = [...igInfluencers].sort((a, b) => b.engagementRate - a.engagementRate).slice(0, 10);
  const maxER = topER[0]?.engagementRate || 1;

  const chartReelViews = igInfluencers
    .filter(i => (i.avgViews || 0) > 0)
    .slice(0, 8)
    .map(i => ({
      label: i.name.split(' ')[0],
      value: i.avgViews || 0,
      subLabel: `Reel Views: ${(i.avgViews || 0).toLocaleString()}`
    }));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-white border border-pink-200/80 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-pink-100 text-pink-700 border border-pink-200">
              Platform Specific Analytics
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-medium">Meta Professional Insights Protocol</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Instagram className="w-6 h-6 text-pink-600" /> Instagram Influencer Analytics & Reel Performance
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            ER Formula: <code className="text-pink-700 bg-pink-100/60 px-1.5 py-0.5 rounded font-mono">ER = ((Avg Likes + Avg Comments) / Followers) × 100</code>
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto font-mono text-xs">
          <div className="p-3 bg-white rounded-xl border border-pink-200 shadow-sm text-center">
            <span className="text-[10px] text-slate-400 block uppercase">Creators Analyzed</span>
            <strong className="text-pink-700 text-base">{igInfluencers.length}</strong>
          </div>
        </div>
      </div>

      {/* Top Followers & Top Engagement Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Top 10 by Followers */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-pink-600" /> Top 10 Creators by Follower Count
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Instagram Network</span>
          </div>
          <div className="space-y-1">
            {topFollowers.map((inf, idx) => (
              <LeaderboardBar
                key={inf.id}
                rank={idx + 1}
                label={inf.name}
                subLabel={inf.handle}
                value={inf.followers}
                maxValue={maxFollowers}
                scoreDisplay={inf.followers.toLocaleString()}
                secondaryText={inf.category}
                color="#e1306c"
              />
            ))}
          </div>
        </div>

        {/* Top 10 by Engagement Rate */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-purple-600" /> Top 10 Creators by Engagement Rate (%)
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Interaction Resonance</span>
          </div>
          <div className="space-y-1">
            {topER.map((inf, idx) => (
              <LeaderboardBar
                key={inf.id}
                rank={idx + 1}
                label={inf.name}
                subLabel={inf.handle}
                value={inf.engagementRate}
                maxValue={maxER}
                scoreDisplay={`${inf.engagementRate}%`}
                secondaryText={inf.category}
                color="#8b5cf6"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Reel Views & Video Performance Chart */}
      {chartReelViews.length > 0 && (
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Video className="w-4 h-4 text-pink-600" /> Reel Views & Video Performance Distribution
            </h3>
            <span className="text-[11px] font-mono text-slate-500">Short-form Video Telemetry</span>
          </div>
          <BarChart data={chartReelViews} height={200} accentColor="#e1306c" />
        </div>
      )}

      {/* Search & Category Filter Toolbar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Instagram creator..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-pink-500 w-52 sm:w-60"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-pink-600" />
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
            aria-label="Sort Instagram creators"
            className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 font-medium focus:outline-none focus:border-pink-500"
          >
            <option value="followers">Most Followers</option>
            <option value="engagementRate">Highest Engagement</option>
            <option value="views">Highest Reel Views</option>
            <option value="influenceScore">Influence Score</option>
          </select>
        </div>
      </div>

      {/* Profile Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((inf) => (
          <div
            key={inf.id}
            onClick={() => onOpenProfile(inf)}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-pink-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4"
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
                    {inf.verified && <CheckCircle className="w-3.5 h-3.5 text-sky-500 shrink-0" />}
                  </h4>
                  <a
                    href={inf.officialProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[11px] font-mono text-pink-600 hover:text-pink-800 hover:underline block truncate"
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
                  <span className="text-slate-500 font-sans">Followers:</span>
                  <strong className="text-slate-900">{inf.followers.toLocaleString()}</strong>
                </div>
                <div className="pt-1.5 flex justify-between">
                  <span className="text-slate-500 font-sans">Engagement:</span>
                  <strong className="text-pink-600">{inf.engagementRate}%</strong>
                </div>
                <div className="pt-1.5 flex justify-between">
                  <span className="text-slate-500 font-sans">Avg Likes:</span>
                  <strong className="text-slate-700">{inf.avgLikes.toLocaleString()}</strong>
                </div>
                <div className="pt-1.5 flex justify-between">
                  <span className="text-slate-500 font-sans">Avg Comments:</span>
                  <strong className="text-slate-700">{inf.avgComments.toLocaleString()}</strong>
                </div>
                {inf.avgViews && (
                  <div className="pt-1.5 flex justify-between">
                    <span className="text-slate-500 font-sans">Avg Reel Views:</span>
                    <strong className="text-purple-600">{inf.avgViews.toLocaleString()}</strong>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-sans text-[11px]">{inf.postingFrequency}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenProfile(inf);
                }}
                className="px-2.5 py-1 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold transition-colors"
              >
                Inspect Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

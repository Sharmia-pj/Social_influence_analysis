import React, { useState, useMemo } from 'react';
import { InfluencerProfile } from '../../types/multiPlatform';
import { LeaderboardBar, BarChart } from '../Charts';
import { VerifiedAvatar } from '../VerifiedAvatar';
import {
  Twitter,
  Repeat2,
  Heart,
  MessageSquare,
  TrendingUp,
  Filter,
  Search,
  CheckCircle,
  Network,
  Award,
  ArrowRight,
  GitCommit
} from 'lucide-react';

interface Props {
  influencers: InfluencerProfile[];
  onOpenProfile: (inf: InfluencerProfile) => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const TwitterDashboard: React.FC<Props> = ({
  influencers,
  onOpenProfile,
  onNavigateSection
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'followers' | 'engagementRate' | 'shares' | 'influenceScore'>('followers');

  const twitterInfluencers = useMemo(() => {
    return influencers.filter((i) => i.platform === 'twitter');
  }, [influencers]);

  const filtered = useMemo(() => {
    let list = twitterInfluencers.filter((inf) => {
      const matchSearch =
        searchTerm === '' ||
        inf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inf.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inf.bio.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCat = selectedCategory === 'all' || inf.category === selectedCategory;
      return matchSearch && matchCat;
    });

    list.sort((a, b) => {
      if (sortBy === 'followers') return b.followers - a.followers;
      if (sortBy === 'engagementRate') return b.engagementRate - a.engagementRate;
      if (sortBy === 'shares') return (b.avgShares || 0) - (a.avgShares || 0);
      return b.influenceScore - a.influenceScore;
    });

    return list;
  }, [twitterInfluencers, searchTerm, selectedCategory, sortBy]);

  const categories = ['all', 'Tamil Nadu Politicians', 'Tamil Cinema Celebrities'];

  // Top 10 by Followers
  const topFollowers = [...twitterInfluencers].sort((a, b) => b.followers - a.followers).slice(0, 10);
  const maxFollowers = topFollowers[0]?.followers || 1;

  // Top 10 by Engagement Rate
  const topER = [...twitterInfluencers].sort((a, b) => b.engagementRate - a.engagementRate).slice(0, 10);
  const maxER = topER[0]?.engagementRate || 1;

  const chartRetweets = twitterInfluencers
    .filter((i) => (i.avgShares || 0) > 0)
    .slice(0, 8)
    .map((i) => ({
      label: i.name.split(' ')[0],
      value: i.avgShares || 0,
      subLabel: `Retweets: ${(i.avgShares || 0).toLocaleString()}`
    }));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-100 via-purple-50 to-white border border-slate-200/90 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-900 text-white">
              Platform Specific Analytics
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-medium">Twitter / X API v2 Public Protocol</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Twitter className="w-6 h-6 text-slate-900" /> Twitter / X Creator Influence & Retweet Virality
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            ER Formula: <code className="text-purple-700 bg-purple-100/60 px-1.5 py-0.5 rounded font-mono">ER = ((Avg Likes + Avg Replies + Retweets) / Followers) × 100</code>
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto font-mono text-xs">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm text-center">
            <span className="text-[10px] text-slate-400 block uppercase">Accounts Indexed</span>
            <strong className="text-slate-900 text-base">{twitterInfluencers.length}</strong>
          </div>
          {onNavigateSection && (
            <button
              onClick={() => onNavigateSection('network')}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/20"
            >
              <Network className="w-4 h-4" />
              <span>Network Graph</span>
            </button>
          )}
        </div>
      </div>

      {/* Deep Dive Callout Banner */}
      {onNavigateSection && (
        <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <GitCommit className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-purple-950">Graph Theory & NetworkX Centrality Suite Available</h4>
              <p className="text-[11px] text-purple-800/80">
                Dive deeper into directed mention graphs, PageRank calculations, and Louvain community clusters from the academic thesis.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateSection('centrality')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-purple-700 border border-purple-300 text-xs font-semibold hover:bg-purple-100/50 transition-colors shrink-0 self-start sm:self-auto"
          >
            <span>Explore PageRank</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Followers & Top Engagement Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Top 10 by Followers */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-600" /> Top Accounts by Follower Reach
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Twitter / X Network</span>
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
                color="#0f172a"
              />
            ))}
          </div>
        </div>

        {/* Top 10 by Engagement Rate */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-purple-600" /> Top Accounts by Engagement Rate (%)
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Interaction Velocity</span>
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
                color="#7c3aed"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Retweet Virality Comparison Chart */}
      {chartRetweets.length > 0 && (
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Repeat2 className="w-4 h-4 text-emerald-600" /> Retweet Virality Distribution
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Average retweets per broadcast message</p>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Virality Multiplier</span>
          </div>
          <BarChart data={chartRetweets} height={200} valueFormatter={(v) => v.toLocaleString()} />
        </div>
      )}

      {/* Influencer Directory & Card Grid */}
      <div className="space-y-4">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Twitter creators by handle, name, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-purple-600 focus:bg-white transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {/* Category Filter */}
            <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-200 rounded-xl text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400 ml-2" />
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                    selectedCategory === c
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-hidden focus:border-purple-600 cursor-pointer"
            >
              <option value="followers">Sort by Followers</option>
              <option value="engagementRate">Sort by Engagement %</option>
              <option value="shares">Sort by Retweets</option>
              <option value="influenceScore">Sort by Influence Score</option>
            </select>
          </div>
        </div>

        {/* Creator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((inf) => (
            <div
              key={inf.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <VerifiedAvatar
                      name={inf.name}
                      avatarUrl={inf.avatarUrl}
                      category={inf.category}
                      officialProfileUrl={inf.officialProfileUrl}
                      size="md"
                      clickable={true}
                      className="w-12 h-12 rounded-xl shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                          {inf.name}
                        </h4>
                        {inf.verified && <CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" />}
                      </div>
                      <a
                        href={inf.officialProfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-mono text-purple-600 hover:text-purple-800 hover:underline block"
                      >
                        {inf.handle}
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                      {inf.category}
                    </span>
                    {inf.party && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-mono truncate max-w-[120px]">
                        {inf.party.split('(')[0].trim()}
                      </span>
                    )}
                    {inf.profession && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 font-mono truncate max-w-[120px]">
                        {inf.profession}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mb-4">{inf.bio}</p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50/80 rounded-xl border border-slate-100 text-center mb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Followers</span>
                    <strong className="text-xs font-bold text-slate-800">{inf.followers.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Engagement</span>
                    <strong className="text-xs font-bold text-purple-700">{inf.engagementRate}%</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Avg Retweets</span>
                    <strong className="text-xs font-bold text-slate-800">
                      {(inf.avgShares || 0).toLocaleString()}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-400 font-medium">Influence Score:</span>
                  <span className="px-2 py-0.5 rounded-md text-xs font-extrabold bg-purple-100 text-purple-800 font-mono">
                    {inf.influenceScore}
                  </span>
                </div>
                <button
                  onClick={() => onOpenProfile(inf)}
                  className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-colors"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { InfluencerProfile, InfluencerCategory } from '../../types/multiPlatform';
import { DonutChart, BarChart } from '../Charts';
import { VerifiedAvatar } from '../VerifiedAvatar';
import {
  Users,
  Trophy,
  TrendingUp,
  Heart,
  Eye,
  Search,
  Filter,
  Layers,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Sparkles,
  LayoutGrid,
  List
} from 'lucide-react';

interface Props {
  influencers: InfluencerProfile[];
  onOpenProfile: (inf: InfluencerProfile) => void;
  onNavigatePlatform: (platform: string) => void;
}

export const GlobalDashboard: React.FC<Props> = ({
  influencers,
  onOpenProfile,
  onNavigatePlatform
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const categories = ['all', 'Tamil Nadu Politicians', 'Tamil Cinema Celebrities'];

  // Filtered influencers
  const filtered = useMemo(() => {
    return influencers.filter((inf) => {
      const matchSearch =
        searchTerm === '' ||
        inf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inf.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inf.bio.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCat = selectedCategory === 'all' || inf.category === selectedCategory;

      return matchSearch && matchCat;
    });
  }, [influencers, searchTerm, selectedCategory]);

  const topInfluencer = influencers[0];
  const highestERInfluencer = [...influencers].sort((a, b) => b.engagementRate - a.engagementRate)[0];

  const totalAudience = influencers.reduce((acc, i) => acc + i.followers, 0);
  const avgER = influencers.length > 0
    ? (influencers.reduce((acc, i) => acc + i.engagementRate, 0) / influencers.length).toFixed(2)
    : '0';

  // Platform Breakdown Donut
  const platformCounts: Record<string, number> = {};
  influencers.forEach(i => {
    platformCounts[i.platform] = (platformCounts[i.platform] || 0) + 1;
  });

  const platformDonutData = [
    { label: 'Instagram', value: platformCounts['instagram'] || 0, color: '#e1306c' },
    { label: 'Facebook', value: platformCounts['facebook'] || 0, color: '#1877f2' },
    { label: 'Twitter / X', value: platformCounts['twitter'] || 0, color: '#0f172a' },
    { label: 'YouTube', value: platformCounts['youtube'] || 0, color: '#ef4444' }
  ].filter(d => d.value > 0);

  // Category Bar Data
  const categoryCounts: Record<string, number> = {};
  influencers.forEach(i => {
    categoryCounts[i.category] = (categoryCounts[i.category] || 0) + 1;
  });

  const categoryBarData = Object.entries(categoryCounts).map(([cat, count]) => ({
    label: cat.slice(0, 7),
    value: count,
    subLabel: `${count} creators`
  }));

  return (
    <div className="space-y-6">
      {/* KPI Overview Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Total Analyzed</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">
            {influencers.length}
          </div>
          <span className="text-[11px] text-slate-400 block truncate">Active creator profiles</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Platforms Tracked</span>
            <Layers className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">
            {Object.keys(platformCounts).length}
          </div>
          <span className="text-[11px] text-slate-400 block truncate">IG, FB, X, YouTube</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Top Influence Leader</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-base sm:text-lg font-bold text-slate-900 truncate">
            {topInfluencer ? topInfluencer.name : 'N/A'}
          </div>
          <span className="text-[11px] text-purple-600 font-mono font-medium block">
            {topInfluencer ? `${topInfluencer.influenceScore}/100 score` : ''}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Peak Engagement</span>
            <TrendingUp className="w-4 h-4 text-pink-500" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-pink-600 font-mono">
            {highestERInfluencer ? `${highestERInfluencer.engagementRate}%` : '0%'}
          </div>
          <span className="text-[11px] text-slate-400 block truncate">
            {highestERInfluencer ? highestERInfluencer.name : ''}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Gross Audience</span>
            <Heart className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">
            {totalAudience > 1000000000
              ? `${(totalAudience / 1000000000).toFixed(1)}B`
              : `${(totalAudience / 1000000).toFixed(1)}M`}
          </div>
          <span className="text-[11px] text-slate-400 block truncate">Followers + Subscribers</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Avg Engagement</span>
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-purple-700 font-mono">
            {avgER}%
          </div>
          <span className="text-[11px] text-slate-400 block truncate">Across all channels</span>
        </div>
      </div>

      {/* Cross-Platform Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-purple-600" /> Platform Creator Distribution
          </h3>
          <DonutChart
            data={platformDonutData}
            size={200}
            centerTitle="Total"
            centerValue={`${influencers.length} Creators`}
          />
        </div>

        <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-indigo-600" /> Category Breakdown
          </h3>
          <BarChart data={categoryBarData} height={200} accentColor="#6366f1" />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search creator name or handle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-600 w-52 sm:w-64"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-purple-600" />
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

        {/* View Switcher (Table vs Cards) */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
              viewMode === 'table' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Table View"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
              viewMode === 'cards' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Card Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Influencer Leaderboard View */}
      {viewMode === 'table' ? (
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-200 font-mono">
                <tr>
                  <th className="p-3.5">Rank</th>
                  <th className="p-3.5">Creator</th>
                  <th className="p-3.5">Platform</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5 text-right">Audience</th>
                  <th className="p-3.5 text-right">Engagement Rate</th>
                  <th className="p-3.5 text-right">Avg Interactions</th>
                  <th className="p-3.5 text-right">Score</th>
                  <th className="p-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((inf, idx) => {
                  const rank = idx + 1;
                  return (
                    <tr
                      key={inf.id}
                      className="hover:bg-purple-50/40 transition-colors cursor-pointer"
                      onClick={() => onOpenProfile(inf)}
                    >
                      <td className="p-3.5 font-mono font-bold whitespace-nowrap">
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${
                          rank === 1 ? 'bg-amber-100 text-amber-800 border border-amber-300 font-bold' :
                          rank === 2 ? 'bg-slate-200 text-slate-800 border border-slate-300' :
                          rank === 3 ? 'bg-orange-100 text-orange-800 border border-orange-300' :
                          'text-slate-500'
                        }`}>
                          #{rank}
                        </span>
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <VerifiedAvatar
                            name={inf.name}
                            avatarUrl={inf.avatarUrl}
                            category={inf.category}
                            officialProfileUrl={inf.officialProfileUrl}
                            size="sm"
                            clickable={true}
                            className="w-9 h-9 rounded-xl shrink-0"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block flex items-center gap-1">
                              {inf.name}
                              {inf.verified && <CheckCircle className="w-3.5 h-3.5 text-sky-500" />}
                            </span>
                            <span className="text-slate-400 font-mono text-[11px] block">{inf.handle}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <span className="capitalize font-semibold text-slate-800 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px]">
                          {inf.platform}
                        </span>
                      </td>

                      <td className="p-3.5 whitespace-nowrap text-slate-600 font-medium">
                        {inf.category}
                      </td>

                      <td className="p-3.5 text-right font-mono font-semibold text-slate-900 whitespace-nowrap">
                        {inf.followers.toLocaleString()}
                        <span className="text-[10px] text-slate-400 block font-normal">{inf.audienceLabel}</span>
                      </td>

                      <td className="p-3.5 text-right font-mono font-bold text-purple-700 whitespace-nowrap">
                        {inf.engagementRate}%
                      </td>

                      <td className="p-3.5 text-right font-mono text-slate-700 whitespace-nowrap">
                        {(inf.avgLikes + inf.avgComments + (inf.avgShares || 0)).toLocaleString()}
                      </td>

                      <td className="p-3.5 text-right font-mono font-bold text-indigo-700 whitespace-nowrap">
                        {inf.influenceScore}
                      </td>

                      <td className="p-3.5 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onOpenProfile(inf)}
                          className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold transition-colors"
                        >
                          Profile
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((inf, idx) => (
            <div
              key={inf.id}
              onClick={() => onOpenProfile(inf)}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-purple-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
                    {inf.platform}
                  </span>
                  <span className="font-mono text-xs font-bold text-indigo-700">
                    Score: {inf.influenceScore}
                  </span>
                </div>

                <div className="flex items-start gap-3 my-2">
                  <VerifiedAvatar
                    name={inf.name}
                    avatarUrl={inf.avatarUrl}
                    category={inf.category}
                    officialProfileUrl={inf.officialProfileUrl}
                    size="md"
                    clickable={true}
                    className="w-12 h-12 rounded-2xl shrink-0"
                  />
                  <div className="truncate flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 text-sm truncate flex items-center gap-1">
                      {inf.name}
                      {inf.verified && <CheckCircle className="w-3.5 h-3.5 text-sky-500 shrink-0" />}
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400 block truncate">{inf.handle}</span>
                    <span className="text-[10px] text-slate-500">{inf.category}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100 font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{inf.audienceLabel}</span>
                    <strong className="text-slate-900">{inf.followers.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Engagement</span>
                    <strong className="text-purple-700">{inf.engagementRate}%</strong>
                  </div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenProfile(inf);
                }}
                className="w-full py-1.5 rounded-xl bg-slate-50 hover:bg-purple-50 text-purple-700 text-xs font-semibold transition-colors"
              >
                View Analytics Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

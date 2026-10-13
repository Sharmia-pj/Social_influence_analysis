/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { RawTweet, AnalysisWeights } from './types/analytics';
import {
  PlatformType,
  InfluencerProfile,
  MultiPlatformWeights,
  RankingMode,
  InfluencerCategory
} from './types/multiPlatform';
import { getExpandedSampleDataset } from './utils/sampleData';
import { runAnalysis } from './utils/analyticsEngine';
import {
  DEMO_INFLUENCERS,
  DEFAULT_WEIGHTS,
  calculateRankings
} from './utils/multiPlatformData';

// Layout & Core Navigation Components
import { Sidebar, NAV_ITEMS } from './components/Sidebar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { PoliticiansPage } from './components/PoliticiansPage';
import { CinemaPage } from './components/CinemaPage';
import { InfluencerComparison } from './components/InfluencerComparison';
import { InfluencerProfileModal } from './components/InfluencerProfileModal';
import { CsvUploader } from './components/CsvUploader';
import { ProjectSummaryModal } from './components/ProjectSummaryModal';
import { ApiStatusModal } from './components/ApiStatusModal';
import { FacebookDashboard } from './components/dashboards/FacebookDashboard';
import { InstagramDashboard } from './components/dashboards/InstagramDashboard';
import { YoutubeDashboard } from './components/dashboards/YoutubeDashboard';
import { TwitterDashboard } from './components/dashboards/TwitterDashboard';

// Academic / Thesis Twitter Analysis Sections
import { OverviewSection } from './components/sections/OverviewSection';
import { ObjectivesSection } from './components/sections/ObjectivesSection';
import { DatasetOverviewSection } from './components/sections/DatasetOverviewSection';
import { DataCleaningSection } from './components/sections/DataCleaningSection';
import { InfluentialUsersSection } from './components/sections/InfluentialUsersSection';
import { SentimentAnalysisSection } from './components/sections/SentimentAnalysisSection';
import { MentionAnalysisSection } from './components/sections/MentionAnalysisSection';
import { TrendingTopicsSection } from './components/sections/TrendingTopicsSection';
import { NetworkGraphSection } from './components/sections/NetworkGraphSection';
import { PageRankDegreeSection } from './components/sections/PageRankDegreeSection';
import { CommunityDetectionSection } from './components/sections/CommunityDetectionSection';
import { WeekdayActivitySection } from './components/sections/WeekdayActivitySection';
import { ResultsConclusionSection } from './components/sections/ResultsConclusionSection';
import { PythonCodeViewer } from './components/sections/PythonCodeViewer';

export default function App() {
  // Navigation & Category State: Defaults to 'home' to present the 2 primary category cards
  const [activeSection, setActiveSection] = useState<string>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Modals State
  const [uploaderOpen, setUploaderOpen] = useState(false);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [apiStatusModalOpen, setApiStatusModalOpen] = useState(false);
  const [selectedInfluencerForModal, setSelectedInfluencerForModal] = useState<InfluencerProfile | null>(null);

  // Multi-Platform Ranking Weights & Mode
  const [rankingWeights, setRankingWeights] = useState<MultiPlatformWeights>(DEFAULT_WEIGHTS);
  const [rankingMode, setRankingMode] = useState<RankingMode>('influenceScore');

  // Twitter Academic Dataset State
  const [rawTweets, setRawTweets] = useState<RawTweet[]>(() => getExpandedSampleDataset());
  const [isSampleData, setIsSampleData] = useState(true);
  const [datasetName, setDatasetName] = useState('Benchmark Tamil Media Twitter Interaction Sample');
  const [academicWeights, setAcademicWeights] = useState<AnalysisWeights>({
    retweets: 0.4,
    likes: 0.3,
    followers: 0.3
  });

  // Calculate dynamic multi-platform rankings based on weights and rankingMode
  const rankedInfluencers = useMemo(() => {
    return calculateRankings(DEMO_INFLUENCERS, rankingWeights, rankingMode);
  }, [rankingWeights, rankingMode]);

  // Counts for each category
  const politicianCount = useMemo(() => {
    return DEMO_INFLUENCERS.filter((i) => i.category === 'Tamil Nadu Politicians').length;
  }, []);

  const cinemaCount = useMemo(() => {
    return DEMO_INFLUENCERS.filter((i) => i.category === 'Tamil Cinema Celebrities').length;
  }, []);

  // Run Twitter Academic Analysis Calculation
  const analysisResults = useMemo(() => {
    return runAnalysis(rawTweets, academicWeights, isSampleData, datasetName);
  }, [rawTweets, academicWeights, isSampleData, datasetName]);

  // Handle Category Selection from Home Page
  const handleSelectCategory = (category: InfluencerCategory) => {
    if (category === 'Tamil Nadu Politicians') {
      setActiveSection('politicians');
    } else {
      setActiveSection('cinema');
    }
  };

  // Handle Custom Dataset Upload
  const handleDatasetLoaded = (newTweets: RawTweet[], filename: string) => {
    setRawTweets(newTweets);
    setIsSampleData(false);
    setDatasetName(filename);
    setActiveSection('dataset');
  };

  // Restore Sample Benchmark Dataset
  const handleRestoreSample = () => {
    setRawTweets(getExpandedSampleDataset());
    setIsSampleData(true);
    setDatasetName('Benchmark Tamil Media Twitter Interaction Sample');
  };

  // Active section title lookup
  const getActiveTitle = () => {
    if (activeSection === 'home') return 'Social Media Influence Analytics';
    if (activeSection === 'politicians') return 'Tamil Nadu Politicians Ranking';
    if (activeSection === 'cinema') return 'Tamil Cinema Celebrities Ranking';
    if (activeSection === 'facebook') return 'Facebook Public Page Analytics (Priority)';
    if (activeSection === 'instagram') return 'Instagram Creator Analytics';
    if (activeSection === 'youtube') return 'YouTube Channel Analytics';
    if (activeSection === 'twitter') return 'Twitter / X Influence Analytics';
    if (activeSection === 'compare') return 'Compare Influencers';
    const nav = NAV_ITEMS.find((item) => item.id === activeSection);
    return nav ? nav.label : 'Social Media Influence Analytics';
  };

  // Render Section Content
  const renderContent = () => {
    switch (activeSection) {
      // 1. Home Page with Two Primary Category Cards
      case 'home':
        return (
          <HomePage
            onSelectCategory={handleSelectCategory}
            onOpenUploader={() => setUploaderOpen(true)}
            onOpenSummary={() => setSummaryModalOpen(true)}
            onNavigateSection={setActiveSection}
            politicianCount={politicianCount}
            cinemaCount={cinemaCount}
          />
        );

      // 2. Dedicated Tamil Nadu Politicians Page
      case 'politicians':
        return (
          <PoliticiansPage
            allInfluencers={rankedInfluencers}
            onOpenProfile={setSelectedInfluencerForModal}
            onReturnHome={() => setActiveSection('home')}
            weights={rankingWeights}
          />
        );

      // 3. Dedicated Tamil Cinema Celebrities Page
      case 'cinema':
        return (
          <CinemaPage
            allInfluencers={rankedInfluencers}
            onOpenProfile={setSelectedInfluencerForModal}
            onReturnHome={() => setActiveSection('home')}
            weights={rankingWeights}
          />
        );

      // 4. Head-to-Head Comparison Tool
      case 'compare':
        return (
          <InfluencerComparison
            allInfluencers={rankedInfluencers}
            onOpenProfile={setSelectedInfluencerForModal}
          />
        );

      // 5. Dedicated Platform Dashboards (Facebook Highest Priority)
      case 'facebook':
        return (
          <FacebookDashboard
            influencers={rankedInfluencers}
            onOpenProfile={setSelectedInfluencerForModal}
          />
        );

      case 'instagram':
        return (
          <InstagramDashboard
            influencers={rankedInfluencers}
            onOpenProfile={setSelectedInfluencerForModal}
          />
        );

      case 'youtube':
        return (
          <YoutubeDashboard
            influencers={rankedInfluencers}
            onOpenProfile={setSelectedInfluencerForModal}
          />
        );

      case 'twitter':
        return (
          <TwitterDashboard
            influencers={rankedInfluencers}
            onOpenProfile={setSelectedInfluencerForModal}
            onNavigateSection={setActiveSection}
          />
        );

      // 6. Academic Twitter Analysis Sections (Preserved for thesis & professor demonstration)
      case 'overview':
        return (
          <OverviewSection
            results={analysisResults}
            onNavigateSection={setActiveSection}
            onOpenUploader={() => setUploaderOpen(true)}
            onOpenSummary={() => setSummaryModalOpen(true)}
          />
        );

      case 'objectives':
        return <ObjectivesSection />;

      case 'dataset':
        return (
          <DatasetOverviewSection
            results={analysisResults}
            onOpenUploader={() => setUploaderOpen(true)}
          />
        );

      case 'cleaning':
        return <DataCleaningSection results={analysisResults} />;

      case 'influential':
        return (
          <InfluentialUsersSection
            results={analysisResults}
            weights={academicWeights}
            onUpdateWeights={setAcademicWeights}
          />
        );

      case 'sentiment':
        return <SentimentAnalysisSection results={analysisResults} />;

      case 'mentions':
        return <MentionAnalysisSection results={analysisResults} />;

      case 'trending':
        return <TrendingTopicsSection results={analysisResults} />;

      case 'network':
        return <NetworkGraphSection results={analysisResults} />;

      case 'centrality':
        return <PageRankDegreeSection results={analysisResults} />;

      case 'communities':
        return <CommunityDetectionSection results={analysisResults} />;

      case 'weekday':
        return <WeekdayActivitySection results={analysisResults} />;

      case 'results':
        return (
          <ResultsConclusionSection
            results={analysisResults}
            onNavigateSection={setActiveSection}
            onOpenSummary={() => setSummaryModalOpen(true)}
          />
        );

      case 'python':
        return <PythonCodeViewer />;

      default:
        return (
          <HomePage
            onSelectCategory={handleSelectCategory}
            onOpenUploader={() => setUploaderOpen(true)}
            onOpenSummary={() => setSummaryModalOpen(true)}
            politicianCount={politicianCount}
            cinemaCount={cinemaCount}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Sidebar Navigation - Modern Light Theme */}
      <Sidebar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenUploader={() => setUploaderOpen(true)}
        onOpenApiStatus={() => setApiStatusModalOpen(true)}
        isSampleData={isSampleData}
      />

      {/* Main Content Area */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Sticky Header with Navigation & Demo Notice */}
        <Header
          onToggleSidebar={() => setSidebarOpen(true)}
          onOpenUploader={() => setUploaderOpen(true)}
          onNavigateSection={setActiveSection}
          activeSectionTitle={getActiveTitle()}
          results={analysisResults}
          onRestoreSample={handleRestoreSample}
          onOpenSummary={() => setSummaryModalOpen(true)}
          onOpenApiStatus={() => setApiStatusModalOpen(true)}
          activeSection={activeSection}
        />

        {/* Content Body Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderContent()}
        </main>

        {/* Modern Light Theme Footer */}
        <Footer />
      </div>

      {/* Influencer Verification & Profile Detail Modal */}
      <InfluencerProfileModal
        influencer={selectedInfluencerForModal}
        onClose={() => setSelectedInfluencerForModal(null)}
        allCohort={rankedInfluencers.filter(
          (i) => i.category === selectedInfluencerForModal?.category && i.platform === selectedInfluencerForModal?.platform
        )}
        rankingMode={rankingMode}
        weights={rankingWeights}
      />

      {/* API Compliance & Architecture Status Modal */}
      <ApiStatusModal
        isOpen={apiStatusModalOpen}
        onClose={() => setApiStatusModalOpen(false)}
        isCurrentlySample={isSampleData}
      />

      {/* CSV Dataset Uploader Modal */}
      <CsvUploader
        isOpen={uploaderOpen}
        onClose={() => setUploaderOpen(false)}
        onDatasetLoaded={handleDatasetLoaded}
        onRestoreSample={handleRestoreSample}
        isCurrentlySample={isSampleData}
      />

      {/* Academic Project Executive Summary Modal */}
      <ProjectSummaryModal
        isOpen={summaryModalOpen}
        onClose={() => setSummaryModalOpen(false)}
        results={analysisResults}
      />
    </div>
  );
}

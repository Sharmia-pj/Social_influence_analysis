import React from 'react';
import { Share2, Award, BookOpen, Layers } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white py-8 px-4 sm:px-8 text-center text-xs text-slate-500 shadow-2xs">
      <div className="max-w-4xl mx-auto space-y-2">
        <div className="flex items-center justify-center gap-2 text-slate-800 font-extrabold text-sm tracking-wide">
          <Share2 className="w-4 h-4 text-purple-600" />
          <span>Social Media Influence Analytics – Multi-Platform Influencer Ranking System</span>
        </div>
        <p className="text-[11px] text-slate-600">
          Cross-platform algorithm suite integrating Instagram, Facebook, Twitter/X, and YouTube. Implemented with Python Pandas, NumPy, Scikit-learn MinMaxScaler, NetworkX graph centrality, and Lexicon NLP methodologies.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400 font-mono pt-1">
          <span>College Capstone Submission</span>
          <span>·</span>
          <span>Demo Data Mode Active</span>
          <span>·</span>
          <span>Interactive SaaS Dashboard</span>
        </div>
      </div>
    </footer>
  );
};

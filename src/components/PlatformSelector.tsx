import React from 'react';
import { PlatformType } from '../types/multiPlatform';
import { Instagram, Facebook, Twitter, Youtube, Layers } from 'lucide-react';

interface Props {
  selectedPlatform: PlatformType;
  onSelectPlatform: (platform: PlatformType) => void;
  counts?: Record<string, number>;
}

export const PlatformSelector: React.FC<Props> = ({
  selectedPlatform,
  onSelectPlatform,
  counts
}) => {
  const platforms = [
    {
      id: 'all' as PlatformType,
      name: 'All Platforms',
      shortName: 'Global',
      icon: Layers,
      color: 'text-purple-600',
      activeBg: 'bg-purple-600 text-white',
      borderActive: 'border-purple-600'
    },
    {
      id: 'facebook' as PlatformType,
      name: 'Facebook',
      shortName: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600',
      activeBg: 'bg-blue-600 text-white',
      borderActive: 'border-blue-500',
      badge: 'Priority'
    },
    {
      id: 'instagram' as PlatformType,
      name: 'Instagram',
      shortName: 'Instagram',
      icon: Instagram,
      color: 'text-pink-600',
      activeBg: 'bg-pink-600 text-white',
      borderActive: 'border-pink-500'
    },
    {
      id: 'youtube' as PlatformType,
      name: 'YouTube',
      shortName: 'YouTube',
      icon: Youtube,
      color: 'text-red-600',
      activeBg: 'bg-red-600 text-white',
      borderActive: 'border-red-500'
    },
    {
      id: 'twitter' as PlatformType,
      name: 'Twitter / X',
      shortName: 'Twitter/X',
      icon: Twitter,
      color: 'text-slate-800',
      activeBg: 'bg-slate-900 text-white',
      borderActive: 'border-slate-800'
    }
  ];

  return (
    <div className="flex items-center gap-1.5 p-1.5 bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-x-auto">
      {platforms.map((p) => {
        const Icon = p.icon;
        const isActive = selectedPlatform === p.id;
        const count = counts?.[p.id];

        return (
          <button
            key={p.id}
            onClick={() => onSelectPlatform(p.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 select-none ${
              isActive
                ? `${p.activeBg} shadow-sm`
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : p.color}`} />
            <span>{p.name}</span>
            {(p as any).badge && (
              <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${
                isActive ? 'bg-white text-blue-700' : 'bg-blue-100 text-blue-700 border border-blue-200'
              }`}>
                {(p as any).badge}
              </span>
            )}
            {count !== undefined && (
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

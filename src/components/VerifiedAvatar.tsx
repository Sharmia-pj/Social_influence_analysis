import React, { useState } from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';

interface VerifiedAvatarProps {
  name: string;
  avatarUrl?: string;
  category: 'Tamil Nadu Politicians' | 'Tamil Cinema Celebrities';
  officialProfileUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  clickable?: boolean;
}

export const VerifiedAvatar: React.FC<VerifiedAvatarProps> = ({
  name,
  avatarUrl,
  category,
  officialProfileUrl,
  size = 'md',
  className = '',
  clickable = false
}) => {
  const [imageError, setImageError] = useState(false);

  // Compute clean neutral initials from name (e.g. "M. K. Stalin" -> "MKS", "Rajinikanth" -> "RK", "Dhanush" -> "DH")
  const getInitials = (fullName: string): string => {
    // Clean out honorifics or party tags
    const cleaned = fullName
      .replace(/\(TVK\)/gi, '')
      .replace(/Thalapathy/gi, '')
      .replace(/Superstar/gi, '')
      .replace(/Senthamizhan/gi, '')
      .trim();

    const parts = cleaned.split(/[\s.]+/).filter(Boolean);
    if (parts.length === 0) return 'TN';
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    if (parts.length === 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return `${parts[0][0]}${parts[1][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  };

  const initials = getInitials(name);

  const sizeClasses = {
    sm: 'w-8 h-8 text-[10px]',
    md: 'w-12 h-12 text-xs',
    lg: 'w-14 h-14 text-sm',
    xl: 'w-20 h-20 text-lg'
  };

  const isPolitician = category === 'Tamil Nadu Politicians';
  const fallbackBg = isPolitician
    ? 'bg-gradient-to-br from-purple-700 via-indigo-800 to-slate-900 text-white'
    : 'bg-gradient-to-br from-indigo-600 via-purple-700 to-rose-600 text-white';

  const avatarContent = (
    <div
      className={`relative shrink-0 rounded-2xl overflow-hidden border border-slate-200 shadow-2xs select-none ${sizeClasses[size]} ${className} ${
        clickable ? 'hover:ring-2 hover:ring-purple-500/50 transition-all cursor-pointer' : ''
      }`}
      title={officialProfileUrl ? `Click to verify official profile: ${name}` : name}
    >
      {avatarUrl && !imageError ? (
        <img
          src={avatarUrl}
          alt={`Authentic photo of ${name}`}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      ) : (
        <div
          className={`w-full h-full flex flex-col items-center justify-center font-black tracking-wider ${fallbackBg}`}
        >
          <span>{initials}</span>
          <span className="text-[7px] tracking-normal opacity-75 font-mono uppercase">
            {isPolitician ? 'TN POL' : 'CINEMA'}
          </span>
        </div>
      )}
    </div>
  );

  if (clickable && officialProfileUrl) {
    return (
      <a
        href={officialProfileUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        title={`Open official verified social media profile of ${name}`}
        className="inline-block relative group"
      >
        {avatarContent}
        <span className="absolute -bottom-1 -right-1 bg-white border border-slate-200 rounded-full p-0.5 shadow-2xs text-purple-600 group-hover:scale-110 transition-transform">
          <ExternalLink className="w-2.5 h-2.5" />
        </span>
      </a>
    );
  }

  return avatarContent;
};

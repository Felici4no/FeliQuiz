import React from 'react';
import { Badge as BadgeType } from '../types';
import { Coins } from 'lucide-react';

interface BadgeProps {
  badge: BadgeType;
  size?: 'small' | 'medium' | 'large';
}

const Badge: React.FC<BadgeProps> = ({ badge, size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-28 h-28'
  };

  return (
    <div className="fb-badge text-center group relative">
      <div className={`${sizeClasses[size]} mx-auto mb-1 overflow-hidden`}>
        <img 
          src={badge.image || '/badges/default.png'} 
          alt={badge.title} 
          className="w-full h-full object-contain"
        />
      </div>
      {size !== 'small' && <div className="text-xs font-medium">{badge.title}</div>}
      
      {/* Tooltip on hover */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity w-48">
        <p className="font-bold mb-1">{badge.title}</p>
        <p className="text-gray-300 text-xs">Earned on {new Date(badge.dateEarned).toLocaleDateString()}</p>
        <div className="flex items-center justify-center mt-2 text-yellow-400">
          <Coins size={14} className="mr-1" />
          <span>{badge.coinValue} FeliCoins</span>
        </div>
      </div>
    </div>
  );
};

export default Badge;
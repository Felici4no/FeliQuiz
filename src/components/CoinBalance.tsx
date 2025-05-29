import React from 'react';
import { Coins } from 'lucide-react';

interface CoinBalanceProps {
  balance: number;
  size?: 'small' | 'large';
}

const CoinBalance: React.FC<CoinBalanceProps> = ({ balance, size = 'small' }) => {
  return (
    <div className={`flex items-center ${size === 'large' ? 'text-xl' : 'text-sm'}`}>
      <Coins className={`text-yellow-500 ${size === 'large' ? 'w-6 h-6' : 'w-4 h-4'} mr-1`} />
      <span className="font-semibold">{balance.toLocaleString()} FeliCoins</span>
    </div>
  );
};

export default CoinBalance;
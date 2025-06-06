import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import CoinBalance from './CoinBalance';

const Navbar: React.FC = () => {
  const { currentUser } = useUser();

  return (
    <nav className="fb-navbar sticky top-0 z-10">
      <div className="fb-navbar-inner">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold mr-6">FeliQuiz</Link>
        </div>
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <div className="flex items-center space-x-3">
              <CoinBalance balance={currentUser.feliCoins} />
              <Link to={`/profile/${currentUser.username}`} className="flex items-center hover:bg-white/10 rounded px-2 py-1 transition">
                <img
                  src={currentUser.profilePicture}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-sm mr-2"
                />
                <span className="hidden md:inline">{currentUser.name}</span>
              </Link>
            </div>
          ) : (
            <Link to="/login" className="fb-button">Entrar</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
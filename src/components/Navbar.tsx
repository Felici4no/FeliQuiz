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
          <Link to="/" className="text-xl sm:text-2xl font-bold mr-4 sm:mr-6">FeliQuiz</Link>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link to="/quizzes" className="fb-navbar-link text-sm sm:text-base">Quizzes</Link>
          {currentUser ? (
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* FeliCoins - Hidden on very small screens */}
              <div className="hidden xs:block">
                <CoinBalance balance={currentUser.feliCoins} />
              </div>
              
              {/* Profile Link */}
              <Link 
                to={`/profile/${currentUser.username}`} 
                className="flex items-center hover:bg-white/10 rounded px-1 sm:px-2 py-1 transition"
              >
                <img
                  src={currentUser.profilePicture}
                  alt={currentUser.name}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-sm mr-1 sm:mr-2"
                />
                <span className="hidden sm:inline text-sm">{currentUser.name}</span>
                <span className="sm:hidden text-xs">Perfil</span>
              </Link>
            </div>
          ) : (
            <Link to="/login" className="fb-button text-sm px-3 py-1">Entrar</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
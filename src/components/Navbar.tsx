import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useUser } from '../context/UserContext';
import CoinBalance from './CoinBalance';

const Navbar: React.FC = () => {
  const { currentUser, canCreateQuizzes } = useUser();

  return (
    <nav className="fb-navbar sticky top-0 z-10">
      <div className="fb-navbar-inner">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold mr-6">FeliQuiz</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/quizzes" className="fb-navbar-link">Quizzes</Link>
          {currentUser ? (
            <div className="flex items-center space-x-3">
              {canCreateQuizzes() && (
                <Link 
                  to="/create-quiz"
                  className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded transition flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  <span className="hidden sm:inline">Criar Quiz</span>
                </Link>
              )}
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
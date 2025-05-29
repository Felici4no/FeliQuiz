import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar: React.FC = () => {
  const { currentUser } = useUser();

  return (
    <nav className="fb-navbar sticky top-0 z-10">
      <div className="fb-navbar-inner">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold mr-6">FeliQuiz</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/quizzes" className="fb-navbar-link">Quizzes</Link>
          {currentUser ? (
            <>
              <Link to={`/profile/${currentUser.username}`} className="flex items-center">
                <img
                  src={currentUser.profilePicture}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-sm mr-2"
                />
                <span className="hidden md:inline">{currentUser.name}</span>
              </Link>
            </>
          ) : (
            <Link to="/login" className="fb-button">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
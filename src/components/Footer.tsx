import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, TwitterIcon, InstagramIcon, MailIcon } from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="bg-fb-blue text-white py-4">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
      {/* Social icons */}
      <div className="flex space-x-4 mb-4 md:mb-0">
        <a href="https://facebook.com/feliquiz" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FacebookIcon size={20} />
        </a>
        <a href="https://twitter.com/feliquiz" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <TwitterIcon size={20} />
        </a>
        <a href="https://instagram.com/feliquiz" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <InstagramIcon size={20} />
        </a>
        <a href="mailto:contact@feliquiz.app" aria-label="Email">
          <MailIcon size={20} />
        </a>
        <a
          href="https://open.spotify.com/playlist/6uEd1PfrZNiABeTnlMCrkD?si=ae2eda91ed3b4e99"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Spotify Playlist"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="text-white hover:text-green-500 transition"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12c0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.627-5.373-12-12-12zm5.485 17.523a.754.754 0 01-1.04.236c-2.847-1.746-6.433-2.137-10.66-1.155a.752.752 0 01-.346-1.464c4.702-1.112 8.736-.662 12.03 1.342a.751.751 0 01.236 1.041zm1.482-3.062a.94.94 0 01-1.294.294c-3.264-2.005-8.241-2.59-12.09-1.402a.939.939 0 01-.544-1.8c4.358-1.314 9.863-.674 13.578 1.618a.94.94 0 01.35 1.29zm.13-3.257c-3.88-2.325-10.353-2.54-14.102-1.379a1.127 1.127 0 01-.642-2.155c4.342-1.296 11.522-1.051 15.907 1.621a1.126 1.126 0 11-1.163 1.913z" />
          </svg>
        </a>
      </div>

      {/* Copyright and creator */}
      <p className="text-sm text-center">
        &copy; {new Date().getFullYear()} FeliQuiz • Por <Link to="/manifesto" className="underline hover:text-gray-200">Lucas Feliciano</Link>
      </p>
    </div>
  </footer>
);

export default Footer;

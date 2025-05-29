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
      </div>

      {/* Copyright and creator */}
      <p className="text-sm text-center">
        &copy; {new Date().getFullYear()} FeliQuiz • Criado por <Link to="/manifesto" className="underline hover:text-gray-200">Lucas Feliciano</Link>
      </p>
    </div>
  </footer>
);

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Coins } from 'lucide-react';
import { Quiz } from '../types';

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const categoryLabels = {
    'entertainment': '🎉',
    'thinking': '🧠',
    'self-discovery': '🪞',
    'expression': '🧑‍🎤',
    'competition': '🏆'
  };

  return (
    <div className="fb-card hover:shadow-md transition-shadow">
      <div className="h-40 overflow-hidden rounded mb-3">
        <img 
          src={quiz.coverImage} 
          alt={quiz.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold mb-1">{quiz.title}</h3>
      <p className="text-gray-600 text-sm mb-2">{quiz.description}</p>
      <div className="flex justify-between items-center mt-3">
        <div>
          <span className="bg-fb-blue text-white text-xs px-2 py-1 rounded mr-2">
            {categoryLabels[quiz.category]}
          </span>
          <span className="text-xs text-gray-500">
            {quiz.topic} / {quiz.subtopic}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center text-gray-500 text-sm">
            <Users size={14} className="mr-1" />
            <span>{quiz.takenCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center text-yellow-600 text-sm">
            <Coins size={14} className="mr-1" />
            <span>{quiz.coinReward}</span>
          </div>
        </div>
      </div>
      <Link to={`/quiz/${quiz.id}`} className="fb-button block text-center mt-3">
        Fazer Quiz
      </Link>
    </div>
  );
};

export default QuizCard;
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Coins, Clock } from 'lucide-react';
import { Quiz } from '../types';

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const categoryLabels = {
    'entertainment': '🎉 Pra se divertir',
    'thinking': '🧠 Pra pensar',
    'self-discovery': '🪞 Pra se conhecer',
    'expression': '🧑‍🎤 Pra se expressar',
    'competition': '🏆 Pra competir'
  };

  // Calculate estimated duration based on number of questions
  const getEstimatedDuration = (questionCount: number): string => {
    if (questionCount <= 3) {
      return '1-2 min';
    } else if (questionCount <= 8) {
      return '3-5 min';
    } else {
      return '6+ min';
    }
  };

  const estimatedDuration = getEstimatedDuration(quiz.questions.length);

  return (
    <div className="fb-card flex flex-col h-full hover:shadow-md transition-shadow">
      {/* Image Container */}
      <div className="h-48 overflow-hidden rounded-t">
        <img 
          src={quiz.coverImage} 
          alt={quiz.title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-4">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-block bg-fb-blue/10 text-fb-blue text-sm px-3 py-1 rounded-full">
            {categoryLabels[quiz.category]}
          </span>
        </div>

        {/* Title and Description */}
        <h3 className="text-lg font-semibold mb-2">{quiz.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{quiz.description}</p>

        {/* Quiz Stats */}
        <div className="mt-auto space-y-2 text-sm text-gray-600">
          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <div className="flex items-center">
              <Users size={16} className="mr-1" />
              <span>{quiz.takenCount.toLocaleString()} jogaram</span>
            </div>
            <div className="flex items-center text-yellow-600">
              <Coins size={16} className="mr-1" />
              <span>{quiz.coinReward}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{estimatedDuration}</span>
            </div>
            <span className="text-fb-blue">
              {quiz.results.length} resultados possíveis
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Link 
          to={`/quiz/${quiz.id}`} 
          className="fb-button block text-center mt-4 w-full"
        >
          Fazer Quiz
        </Link>
      </div>
    </div>
  );
};

export default QuizCard;
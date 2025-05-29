import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Lightbulb, HeartHandshake, PartyPopper, Trophy } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import QuizCard from '../components/QuizCard';

const Home: React.FC = () => {
  const { quizzes } = useQuiz();

  // Obter os quizzes mais populares
  const popularQuizzes = [...quizzes].sort((a, b) => b.takenCount - a.takenCount).slice(0, 3);

  const categories = [
    { id: 'entertainment', label: 'Para se divertir', icon: <PartyPopper className="w-5 h-5 mr-2" /> },
    { id: 'thinking', label: 'Para refletir', icon: <BrainCircuit className="w-5 h-5 mr-2" /> },
    { id: 'self-discovery', label: 'Para se conhecer', icon: <Lightbulb className="w-5 h-5 mr-2" /> },
    { id: 'expression', label: 'Para se expressar', icon: <HeartHandshake className="w-5 h-5 mr-2" /> },
    { id: 'competition', label: 'Para competir', icon: <Trophy className="w-5 h-5 mr-2" /> }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Seção Hero */}
      <div className="fb-card bg-gradient-to-r from-fb-blue to-fb-blue-dark text-white p-8 mb-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Bem Vindo ao FeliQuiz</h1>
          <p className="text-lg mb-6">
            Faça quizzes divertidos para ganhar emblemas no seu perfil e compartilhe com os amigos.
          </p>
          <Link to="/quizzes" className="inline-block bg-white text-fb-blue font-bold py-2 px-6 rounded-md hover:bg-gray-100 transition">
            Ver Quizzes
          </Link>
        </div>
      </div>

      {/* Seção de Categorias */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-4">Buscar por Categoria</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map(category => (
            <Link 
              key={category.id}
              to={`/quizzes?category=${category.id}`}
              className="fb-card flex items-center justify-center hover:bg-gray-50 transition"
            >
              {category.icon}
              <span>{category.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Quizzes Populares */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Quizzes Populares</h2>
          <Link to="/quizzes" className="text-fb-blue hover:underline">
            Ver Todos
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularQuizzes.map(quiz => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

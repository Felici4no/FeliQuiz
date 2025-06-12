import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';
import QuizCard from '../components/QuizCard';

const rotatingBanners = [
  {
    title: 'Compartilhe seu Perfil e conquistas',
    description:
      'Mostre suas conquistas e emblemas para a comunidade. Convide amigos para conferir!',
    button: {
      to: '/perfil',
      label: 'Ver meu Perfil',
    },
  },
  {
    title: 'Solicite seu Passe de Criador de Quizzes',
    description:
      'Quer criar seus próprios quizzes e desafiar a galera? Peça agora o seu passe especial.',
    button: {
      to: '/solicitar-passe',
      label: 'Solicitar Passe',
    },
  },
];

const categories = [
  { id: 'entertainment', label: 'Pra se divertir', emoji: '🎉' },
  { id: 'thinking',     label: 'Pra pensar',     emoji: '🧠' },
  { id: 'self-discovery',label: 'Pra se conhecer',emoji: '🪞' },
  { id: 'expression',   label: 'Pra se expressar',emoji: '🧑‍🎤' },
  { id: 'competition',  label: 'Pra competir',   emoji: '🏆' },
];

const bannerVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const Home: React.FC = () => {
  const { quizzes } = useQuiz();
  const popularQuizzes = [...quizzes]
    .sort((a, b) => b.takenCount - a.takenCount)
    .slice(0, 3);

  const [bannerIdx, setBannerIdx] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => {
      setBannerIdx((i) => (i + 1) % rotatingBanners.length);
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  const { title, description, button } = rotatingBanners[bannerIdx];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Banner */}
      <div className="fb-card bg-gradient-to-r from-fb-blue to-fb-blue-dark text-white p-8 mb-8">
        <div className=" max-w-2xl mx-auto text-center relative min-h-[8rem] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={bannerIdx}
              variants={bannerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold mb-4">{title}</h1>
              <p className="text-lg mb-6">{description}</p>
              <Link
                to={button.to}
                className="inline-block bg-white text-fb-blue font-bold py-2 px-6 rounded-md hover:bg-gray-100 transition"
              >
                {button.label}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Categorias */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-4">Buscar por Categoria</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/quizzes?category=${cat.id}`}
              className="fb-card flex items-center justify-center hover:bg-gray-50 transition"
            >
              {cat.icon}
              <span>
                {cat.label} {cat.emoji}
              </span>
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
          {popularQuizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
// Note: This code is a complete React component for the Home page of a quiz application.
// It includes a hero banner with rotating messages, a category selection section, and a display of popular quizzes.
// The component uses React hooks for state management and effects, and it leverages the QuizContext to access quiz data.
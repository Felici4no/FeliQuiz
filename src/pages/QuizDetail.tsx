import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';
import { useUser } from '../context/UserContext';
import { Quiz, Question, QuestionOption, Trait, Result } from '../types';
import ResultStats from '../components/ResultStats';
import LoginPromptModal from '../components/LoginPromptModal';

const QuizDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getQuizById, calculateResult } = useQuiz();
  const { currentUser } = useUser();
  
  const [quiz, setQuiz] = useState<Quiz | undefined>(undefined);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<QuestionOption[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [traits, setTraits] = useState<Trait[]>([]);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [hasAlreadyTaken, setHasAlreadyTaken] = useState(false);

  // Mock data for result statistics
  const mockResultStats = {
    totalResponses: 15243,
    resultPercentages: [
      { name: 'Harry Potter', value: 35.2 },
      { name: 'Hermione Granger', value: 28.7 },
      { name: 'Ron Weasley', value: 20.1 },
      { name: 'Other', value: 16.0 }
    ]
  };

  useEffect(() => {
    if (id) {
      const foundQuiz = getQuizById(id);
      if (foundQuiz) {
        setQuiz(foundQuiz);
        
        // Check if user has already taken this quiz
        if (currentUser) {
          const userBadge = currentUser.badges.find(badge => badge.quizId === id);
          setHasAlreadyTaken(!!userBadge);
        }
      } else {
        navigate('/quizzes');
      }
    }
  }, [id, getQuizById, navigate, currentUser]);

  if (!quiz) {
    return <div className="container mx-auto px-4 py-8">Loading quiz...</div>;
  }

  const currentQuestion: Question = quiz.questions[currentQuestionIndex];

  const handleOptionSelect = (option: QuestionOption) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = option;
    setSelectedOptions(newSelectedOptions);

    const newTraits = [...traits];
    option.traits.forEach(trait => {
      const existingTraitIndex = newTraits.findIndex(t => t.name === trait.name);
      if (existingTraitIndex >= 0) {
        newTraits[existingTraitIndex].value = 
          (newTraits[existingTraitIndex].value + trait.value) / 2;
      } else {
        newTraits.push({ ...trait });
      }
    });
    setTraits(newTraits);

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeQuiz(newTraits);
    }
  };

  const completeQuiz = (finalTraits: Trait[]) => {
    const quizResult = calculateResult(quiz, finalTraits);
    setResult(quizResult);
    setIsCompleted(true);
    
    // Show login prompt if user is not logged in
    if (!currentUser) {
      setShowLoginPrompt(true);
    }
  };

  const shareResult = () => {
    if (result) {
      const shareText = `Acabei de descobrir que sou ${result.character} no quiz "${quiz.title}" do FeliQuiz! 🎯`;
      
      if (navigator.share) {
        navigator.share({
          title: 'Meu resultado no FeliQuiz',
          text: shareText,
          url: window.location.href
        });
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
        alert('Link copiado para a área de transferência!');
      }
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {!isCompleted ? (
          <div className="fb-card">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">{quiz.title}</h1>
              <p className="text-gray-600 mb-2">{quiz.description}</p>
              {quiz.createdBy && (
                <p className="text-sm text-gray-500">
                  Criado por <Link to={`/profile/${quiz.createdBy}`} className="text-fb-blue hover:underline">@{quiz.createdBy}</Link>
                </p>
              )}
              {hasAlreadyTaken && (
                <div className="bg-blue-50 border border-blue-200 p-3 rounded mt-3">
                  <p className="text-sm text-blue-800">
                    ✅ Você já fez este quiz! Fazendo novamente você pode obter um resultado diferente, mas não ganhará FeliCoins adicionais.
                  </p>
                </div>
              )}
            </div>
            
            <div className="mb-4 bg-fb-gray p-3 rounded">
              <div className="flex justify-between text-sm mb-1">
                <span>Pergunta {currentQuestionIndex + 1} de {quiz.questions.length}</span>
                <span>{Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100)}% Completo</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-fb-blue h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <AnimatePresence mode="wait" custom={currentQuestionIndex}>
              <motion.div
                key={currentQuestionIndex}
                custom={currentQuestionIndex}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
              >
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">{currentQuestion.text}</h2>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option.id}
                        className="w-full text-left p-3 border border-fb-border rounded hover:bg-fb-blue hover:text-white transition"
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fb-card text-center"
          >
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Seu Resultado</h1>
              <p className="text-gray-600">Baseado nas suas respostas, você é:</p>
            </div>
            
            <div className="py-6 px-4">
              <h2 className="text-3xl font-bold text-fb-blue mb-4">{result?.character}</h2>
              <div className="w-40 h-40 mx-auto mb-6">
                <img 
                  src={result?.image || '/default-result.png'} 
                  alt={result?.character} 
                  className="w-full h-full object-cover rounded-full border-4 border-fb-blue"
                />
              </div>
              <p className="text-lg mb-6">{result?.description}</p>
              
              {/* Badge Section - Different for logged vs non-logged users */}
              {currentUser ? (
                <div className={`border p-4 rounded mb-6 ${hasAlreadyTaken ? 'bg-blue-50 border-blue-200' : 'bg-green-50 border-green-200'}`}>
                  <h3 className={`font-semibold mb-2 ${hasAlreadyTaken ? 'text-blue-800' : 'text-green-800'}`}>
                    {hasAlreadyTaken ? '🔄 Quiz Refeito!' : '🎉 Badge Conquistada!'}
                  </h3>
                  <div className="w-20 h-20 mx-auto mb-2">
                    <img 
                      src={result?.badgeImage || '/badges/default.png'} 
                      alt="Badge" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className={`text-sm ${hasAlreadyTaken ? 'text-blue-700' : 'text-green-700'}`}>
                    {hasAlreadyTaken 
                      ? 'Você obteve um novo resultado! A badge anterior foi atualizada no seu perfil.'
                      : 'Esta badge foi adicionada ao seu perfil'
                    }
                  </p>
                  {!hasAlreadyTaken && (
                    <p className="text-sm text-green-600 mt-1">
                      +{quiz.coinReward} FeliCoins adicionados à sua conta!
                    </p>
                  )}
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded mb-6">
                  <h3 className="font-semibold text-blue-800 mb-2">🏆 Badge Disponível!</h3>
                  <div className="w-20 h-20 mx-auto mb-2">
                    <img 
                      src={result?.badgeImage || '/badges/default.png'} 
                      alt="Badge" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-sm text-blue-700 mb-3">
                    Para salvar esta badge no seu perfil e ganhar {quiz.coinReward} FeliCoins, você precisa fazer login ou criar uma conta
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Link to="/login" className="fb-button text-sm">
                      Fazer Login
                    </Link>
                    <Link to="/login" className="border border-fb-border py-1 px-3 rounded hover:bg-gray-100 text-sm">
                      Criar Conta
                    </Link>
                  </div>
                </div>
              )}

              {result && <ResultStats 
                result={result}
                totalResponses={mockResultStats.totalResponses}
                resultPercentages={mockResultStats.resultPercentages}
              />}
              
              <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
                <button className="fb-button" onClick={shareResult}>
                  Compartilhar Resultado
                </button>
                {currentUser && (
                  <button 
                    className="border border-fb-border py-1 px-4 rounded hover:bg-gray-100"
                    onClick={() => navigate(`/profile/${currentUser?.username}`)}
                  >
                    Ver Perfil
                  </button>
                )}
                <button 
                  className="border border-fb-border py-1 px-4 rounded hover:bg-gray-100"
                  onClick={() => navigate('/quizzes')}
                >
                  Mais Quizzes
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Login Prompt Modal */}
      <LoginPromptModal
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        result={result}
        quiz={quiz}
      />
    </>
  );
};

export default QuizDetail;
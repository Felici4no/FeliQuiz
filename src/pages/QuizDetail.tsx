import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';
import { useUser } from '../context/UserContext';
import { Quiz, Question, QuestionOption, Trait, Result } from '../types';
import ResultStats from '../components/ResultStats';

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
      } else {
        navigate('/quizzes');
      }
    }
  }, [id, getQuizById, navigate]);

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
  };

  const shareResult = () => {
    if (result) {
      alert(`Share your result: I am ${result.character} from ${quiz.title}!`);
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
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {!isCompleted ? (
        <div className="fb-card">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">{quiz.title}</h1>
            <p className="text-gray-600">{quiz.description}</p>
          </div>
          
          <div className="mb-4 bg-fb-gray p-3 rounded">
            <div className="flex justify-between text-sm mb-1">
              <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
              <span>{Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100)}% Complete</span>
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
            <h1 className="text-2xl font-bold mb-2">Your Result</h1>
            <p className="text-gray-600">Based on your answers, you are:</p>
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
            
            <div className="bg-fb-gray p-4 rounded mb-6">
              <h3 className="font-semibold mb-2">You've earned a badge!</h3>
              <div className="w-20 h-20 mx-auto">
                <img 
                  src={result?.badgeImage || '/badges/default.png'} 
                  alt="Badge" 
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm mt-2">This badge has been added to your profile</p>
            </div>

            {result && <ResultStats 
              result={result}
              totalResponses={mockResultStats.totalResponses}
              resultPercentages={mockResultStats.resultPercentages}
            />}
            
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
              <button className="fb-button" onClick={shareResult}>
                Share Result
              </button>
              <button 
                className="border border-fb-border py-1 px-4 rounded hover:bg-gray-100"
                onClick={() => navigate(`/profile/${currentUser?.username}`)}
              >
                View Profile
              </button>
              <button 
                className="border border-fb-border py-1 px-4 rounded hover:bg-gray-100"
                onClick={() => navigate('/quizzes')}
              >
                More Quizzes
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuizDetail;
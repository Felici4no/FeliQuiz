import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, RotateCcw, Eye } from 'lucide-react';
import { Quiz, Question, QuestionOption, Trait, Result } from '../types';

interface QuizPreviewModalProps {
  quizDraft: {
    title: string;
    description: string;
    category: string;
    topic: string;
    subtopic: string;
    coverImage: string;
    coinReward: number;
    results: Result[];
    questions: Question[];
    availableTraits: string[];
  };
  onClose: () => void;
}

const QuizPreviewModal: React.FC<QuizPreviewModalProps> = ({ quizDraft, onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<QuestionOption[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [traits, setTraits] = useState<Trait[]>([]);
  const [previewMode, setPreviewMode] = useState<'info' | 'quiz' | 'result'>('info');

  const currentQuestion: Question = quizDraft.questions[currentQuestionIndex];

  const calculateResult = (finalTraits: Trait[]): Result => {
    // Simple algorithm to match traits with results
    const resultScores = quizDraft.results.map(result => {
      let score = 0;
      result.traits.forEach(resultTrait => {
        const userTrait = finalTraits.find(t => t.name === resultTrait.name);
        if (userTrait) {
          score += Math.max(0, 5 - Math.abs(userTrait.value - resultTrait.value));
        }
      });
      return { result, score };
    });

    resultScores.sort((a, b) => b.score - a.score);
    return resultScores[0].result;
  };

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

    if (currentQuestionIndex < quizDraft.questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 500);
    } else {
      const finalResult = calculateResult(newTraits);
      setResult(finalResult);
      setIsCompleted(true);
      setPreviewMode('result');
    }
  };

  const resetPreview = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions([]);
    setResult(null);
    setIsCompleted(false);
    setTraits([]);
    setPreviewMode('info');
  };

  const startQuiz = () => {
    resetPreview();
    setPreviewMode('quiz');
  };

  const renderInfoMode = () => (
    <div className="p-6">
      <div className="text-center mb-6">
        {quizDraft.coverImage && (
          <img
            src={quizDraft.coverImage}
            alt={quizDraft.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}
        <h2 className="text-2xl font-bold text-fb-blue mb-2">{quizDraft.title}</h2>
        <p className="text-gray-600 mb-4">{quizDraft.description}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-semibold">Categoria</div>
            <div className="text-gray-600">{quizDraft.category}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-semibold">Tópico</div>
            <div className="text-gray-600">
              {quizDraft.topic}
              {quizDraft.subtopic && ` > ${quizDraft.subtopic}`}
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-semibold">Perguntas</div>
            <div className="text-gray-600">{quizDraft.questions.length}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-semibold">Recompensa</div>
            <div className="text-gray-600">{quizDraft.coinReward} FeliCoins</div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Resultados Possíveis ({quizDraft.results.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {quizDraft.results.map((result, index) => (
              <div key={result.id} className="bg-gray-50 p-3 rounded text-center">
                <div className="w-12 h-12 mx-auto mb-2">
                  <img
                    src={result.badgeImage}
                    alt={result.character}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-sm font-medium">{result.character}</div>
                <div className="text-xs text-gray-500">{result.coinValue} coins</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={startQuiz}
          className="fb-button px-8 py-3 text-lg"
        >
          Testar Quiz
        </button>
      </div>
    </div>
  );

  const renderQuizMode = () => (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Pergunta {currentQuestionIndex + 1} de {quizDraft.questions.length}</span>
          <span>{Math.round(((currentQuestionIndex + 1) / quizDraft.questions.length) * 100)}% Completo</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-fb-blue h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQuestionIndex + 1) / quizDraft.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">{currentQuestion.text}</h3>
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              className="w-full text-left p-4 border border-fb-border rounded-lg hover:bg-fb-blue hover:text-white transition"
              onClick={() => handleOptionSelect(option)}
            >
              <div className="mb-2">{option.text}</div>
              <div className="flex flex-wrap gap-1">
                {option.traits.map((trait, i) => (
                  <span
                    key={i}
                    className="text-xs bg-white/20 px-2 py-1 rounded opacity-70"
                  >
                    {trait.name}: +{trait.value}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
          disabled={currentQuestionIndex === 0}
          className="flex items-center px-4 py-2 border border-fb-border rounded hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={16} className="mr-2" />
          Anterior
        </button>
        
        <button
          onClick={resetPreview}
          className="flex items-center px-4 py-2 border border-fb-border rounded hover:bg-gray-100 transition"
        >
          <RotateCcw size={16} className="mr-2" />
          Reiniciar
        </button>
      </div>
    </div>
  );

  const renderResultMode = () => (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Seu Resultado</h2>
      
      {result && (
        <div>
          <h3 className="text-3xl font-bold text-fb-blue mb-4">{result.character}</h3>
          <div className="w-32 h-32 mx-auto mb-4">
            <img 
              src={result.image} 
              alt={result.character} 
              className="w-full h-full object-cover rounded-full border-4 border-fb-blue"
            />
          </div>
          <p className="text-lg mb-6">{result.description}</p>
          
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-green-800 mb-2">🎉 Badge Conquistada!</h4>
            <div className="w-16 h-16 mx-auto mb-2">
              <img 
                src={result.badgeImage} 
                alt="Badge" 
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-sm text-green-700">
              +{result.coinValue} FeliCoins
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={resetPreview}
              className="fb-button flex items-center"
            >
              <RotateCcw size={16} className="mr-2" />
              Testar Novamente
            </button>
            <button
              onClick={() => setPreviewMode('info')}
              className="border border-fb-border py-2 px-4 rounded hover:bg-gray-100 transition"
            >
              Ver Informações
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-fb-border">
            <div className="flex items-center">
              <Eye className="text-fb-blue mr-2" size={24} />
              <h2 className="text-xl font-bold text-fb-blue">Preview do Quiz</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={previewMode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {previewMode === 'info' && renderInfoMode()}
              {previewMode === 'quiz' && renderQuizMode()}
              {previewMode === 'result' && renderResultMode()}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuizPreviewModal;
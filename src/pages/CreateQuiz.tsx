import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Save, Eye, AlertCircle, CheckCircle, Plus, X, Upload, Image as ImageIcon } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Quiz, QuizCategory, Trait, Result, Question, QuestionOption } from '../types';
import { mockTopics } from '../data/mockData';

interface CreateQuizStep {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

interface QuizDraft {
  title: string;
  description: string;
  category: QuizCategory | '';
  topic: string;
  subtopic: string;
  coverImage: string;
  coinReward: number;
  results: Result[];
  questions: Question[];
  availableTraits: string[];
}

const CreateQuiz: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, canCreateQuizzes } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [quizDraft, setQuizDraft] = useState<QuizDraft>({
    title: '',
    description: '',
    category: '',
    topic: '',
    subtopic: '',
    coverImage: '',
    coinReward: 50,
    results: [],
    questions: [],
    availableTraits: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Check permissions
  useEffect(() => {
    if (!currentUser || !canCreateQuizzes()) {
      navigate('/');
    }
  }, [currentUser, canCreateQuizzes, navigate]);

  const steps: CreateQuizStep[] = [
    {
      id: 1,
      title: 'Informações Básicas',
      description: 'Nome, descrição e classificação do quiz',
      isComplete: !!(quizDraft.title && quizDraft.description && quizDraft.category && quizDraft.topic)
    },
    {
      id: 2,
      title: 'Resultados Possíveis',
      description: 'Defina todos os resultados que o quiz pode gerar',
      isComplete: quizDraft.results.length >= 2
    },
    {
      id: 3,
      title: 'Perguntas',
      description: 'Crie perguntas com opções baseadas nos traits',
      isComplete: quizDraft.questions.length >= 3
    },
    {
      id: 4,
      title: 'Revisão e Publicação',
      description: 'Revise tudo antes de publicar',
      isComplete: false
    }
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!quizDraft.title.trim()) newErrors.title = 'Título é obrigatório';
        if (!quizDraft.description.trim()) newErrors.description = 'Descrição é obrigatória';
        if (!quizDraft.category) newErrors.category = 'Categoria é obrigatória';
        if (!quizDraft.topic) newErrors.topic = 'Tópico é obrigatório';
        break;
      case 2:
        if (quizDraft.results.length < 2) newErrors.results = 'Mínimo de 2 resultados necessários';
        break;
      case 3:
        if (quizDraft.questions.length < 3) newErrors.questions = 'Mínimo de 3 perguntas necessárias';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(currentStep + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
  };

  const updateQuizDraft = (updates: Partial<QuizDraft>) => {
    setQuizDraft(prev => ({ ...prev, ...updates }));
  };

  // Extract available traits from results
  useEffect(() => {
    const traits = new Set<string>();
    quizDraft.results.forEach(result => {
      result.traits.forEach(trait => traits.add(trait.name));
    });
    updateQuizDraft({ availableTraits: Array.from(traits) });
  }, [quizDraft.results]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep quizDraft={quizDraft} updateQuizDraft={updateQuizDraft} errors={errors} />;
      case 2:
        return <ResultsStep quizDraft={quizDraft} updateQuizDraft={updateQuizDraft} errors={errors} />;
      case 3:
        return <QuestionsStep quizDraft={quizDraft} updateQuizDraft={updateQuizDraft} errors={errors} />;
      case 4:
        return <ReviewStep quizDraft={quizDraft} onPreview={() => setIsPreviewMode(true)} />;
      default:
        return null;
    }
  };

  if (!currentUser || !canCreateQuizzes()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-fb-gray">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/quizzes')}
            className="flex items-center text-fb-blue hover:underline mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Voltar aos Quizzes
          </button>
          <h1 className="text-3xl font-bold text-fb-blue mb-2">Criar Novo Quiz</h1>
          <p className="text-gray-600">
            Crie um quiz envolvente com resultados personalizados e perguntas inteligentes
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep === step.id
                      ? 'bg-fb-blue text-white'
                      : step.isComplete
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step.isComplete ? <CheckCircle size={20} /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      step.isComplete ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-1">{steps[currentStep - 1].title}</h2>
            <p className="text-gray-600 text-sm">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center px-6 py-2 border border-fb-border rounded hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={20} className="mr-2" />
            Anterior
          </button>

          <div className="flex gap-3">
            {currentStep === 4 ? (
              <>
                <button
                  onClick={() => setIsPreviewMode(true)}
                  className="flex items-center px-6 py-2 border border-fb-border rounded hover:bg-gray-100 transition"
                >
                  <Eye size={20} className="mr-2" />
                  Visualizar
                </button>
                <button
                  onClick={() => {
                    // TODO: Implement save and publish logic
                    alert('Quiz salvo e publicado com sucesso!');
                    navigate('/quizzes');
                  }}
                  className="fb-button flex items-center px-6 py-2"
                >
                  <Save size={20} className="mr-2" />
                  Publicar Quiz
                </button>
              </>
            ) : (
              <button
                onClick={nextStep}
                className="fb-button flex items-center px-6 py-2"
              >
                Próximo
                <ArrowRight size={20} className="ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {isPreviewMode && (
        <QuizPreviewModal
          quizDraft={quizDraft}
          onClose={() => setIsPreviewMode(false)}
        />
      )}
    </div>
  );
};

// Step Components
const BasicInfoStep: React.FC<{
  quizDraft: QuizDraft;
  updateQuizDraft: (updates: Partial<QuizDraft>) => void;
  errors: Record<string, string>;
}> = ({ quizDraft, updateQuizDraft, errors }) => {
  const categories = [
    { id: 'entertainment', label: '🎉 Pra se divertir' },
    { id: 'thinking', label: '🧠 Pra pensar' },
    { id: 'self-discovery', label: '🪞 Pra se conhecer' },
    { id: 'expression', label: '🧑‍🎤 Pra se expressar' },
    { id: 'competition', label: '🏆 Pra competir' }
  ];

  const selectedTopic = mockTopics.find(t => t.name === quizDraft.topic);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-6">Informações Básicas do Quiz</h3>
      
      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título do Quiz *
          </label>
          <input
            type="text"
            value={quizDraft.title}
            onChange={(e) => updateQuizDraft({ title: e.target.value })}
            className={`fb-input ${errors.title ? 'border-red-500' : ''}`}
            placeholder="Ex: Qual Personagem de Harry Potter é Você?"
            maxLength={100}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle size={16} className="mr-1" />
              {errors.title}
            </p>
          )}
          <p className="text-gray-500 text-sm mt-1">
            {quizDraft.title.length}/100 caracteres
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição *
          </label>
          <textarea
            value={quizDraft.description}
            onChange={(e) => updateQuizDraft({ description: e.target.value })}
            className={`fb-input h-24 resize-none ${errors.description ? 'border-red-500' : ''}`}
            placeholder="Descreva o que o quiz faz e o que os usuários podem esperar..."
            maxLength={300}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle size={16} className="mr-1" />
              {errors.description}
            </p>
          )}
          <p className="text-gray-500 text-sm mt-1">
            {quizDraft.description.length}/300 caracteres
          </p>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoria *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => updateQuizDraft({ category: category.id as QuizCategory })}
                className={`p-3 border rounded-lg text-left transition ${
                  quizDraft.category === category.id
                    ? 'border-fb-blue bg-fb-blue/10 text-fb-blue'
                    : 'border-fb-border hover:bg-gray-50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle size={16} className="mr-1" />
              {errors.category}
            </p>
          )}
        </div>

        {/* Topic and Subtopic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tópico *
            </label>
            <select
              value={quizDraft.topic}
              onChange={(e) => updateQuizDraft({ topic: e.target.value, subtopic: '' })}
              className={`fb-input ${errors.topic ? 'border-red-500' : ''}`}
            >
              <option value="">Selecione um tópico</option>
              {mockTopics.map(topic => (
                <option key={topic.id} value={topic.name}>
                  {topic.name}
                </option>
              ))}
            </select>
            {errors.topic && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.topic}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtópico
            </label>
            <select
              value={quizDraft.subtopic}
              onChange={(e) => updateQuizDraft({ subtopic: e.target.value })}
              className="fb-input"
              disabled={!selectedTopic}
            >
              <option value="">Selecione um subtópico</option>
              {selectedTopic?.subtopics.map(subtopic => (
                <option key={subtopic.id} value={subtopic.name}>
                  {subtopic.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagem de Capa
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {quizDraft.coverImage ? (
              <div className="relative">
                <img
                  src={quizDraft.coverImage}
                  alt="Cover preview"
                  className="w-full h-48 object-cover rounded"
                />
                <button
                  onClick={() => updateQuizDraft({ coverImage: '' })}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div>
                <ImageIcon size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Adicione uma imagem de capa</p>
                <input
                  type="url"
                  placeholder="Cole a URL da imagem aqui"
                  className="fb-input max-w-md mx-auto"
                  onBlur={(e) => {
                    if (e.target.value) {
                      updateQuizDraft({ coverImage: e.target.value });
                    }
                  }}
                />
                <p className="text-gray-500 text-sm mt-2">
                  Recomendado: 1200x600px, formato JPG ou PNG
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Coin Reward */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recompensa em FeliCoins
          </label>
          <select
            value={quizDraft.coinReward}
            onChange={(e) => updateQuizDraft({ coinReward: parseInt(e.target.value) })}
            className="fb-input max-w-xs"
          >
            <option value={25}>25 FeliCoins (Quiz Rápido)</option>
            <option value={50}>50 FeliCoins (Quiz Padrão)</option>
            <option value={75}>75 FeliCoins (Quiz Longo)</option>
            <option value={100}>100 FeliCoins (Quiz Complexo)</option>
          </select>
          <p className="text-gray-500 text-sm mt-1">
            Recompensa que os usuários ganham ao completar o quiz
          </p>
        </div>
      </div>
    </div>
  );
};

const ResultsStep: React.FC<{
  quizDraft: QuizDraft;
  updateQuizDraft: (updates: Partial<QuizDraft>) => void;
  errors: Record<string, string>;
}> = ({ quizDraft, updateQuizDraft, errors }) => {
  const [editingResult, setEditingResult] = useState<Result | null>(null);
  const [showResultForm, setShowResultForm] = useState(false);

  const addResult = (result: Result) => {
    const newResults = [...quizDraft.results, result];
    updateQuizDraft({ results: newResults });
    setShowResultForm(false);
    setEditingResult(null);
  };

  const updateResult = (updatedResult: Result) => {
    const newResults = quizDraft.results.map(r => 
      r.id === updatedResult.id ? updatedResult : r
    );
    updateQuizDraft({ results: newResults });
    setEditingResult(null);
    setShowResultForm(false);
  };

  const deleteResult = (resultId: string) => {
    const newResults = quizDraft.results.filter(r => r.id !== resultId);
    updateQuizDraft({ results: newResults });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold">Resultados Possíveis</h3>
          <p className="text-gray-600 text-sm mt-1">
            Defina todos os resultados que seu quiz pode gerar (mínimo 2)
          </p>
        </div>
        <button
          onClick={() => setShowResultForm(true)}
          className="fb-button flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Adicionar Resultado
        </button>
      </div>

      {errors.results && (
        <div className="bg-red-50 border border-red-200 p-3 rounded mb-4">
          <p className="text-red-700 text-sm flex items-center">
            <AlertCircle size={16} className="mr-2" />
            {errors.results}
          </p>
        </div>
      )}

      {/* Results List */}
      <div className="space-y-4">
        {quizDraft.results.map((result, index) => (
          <div key={result.id} className="border border-fb-border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="bg-fb-blue text-white text-sm px-2 py-1 rounded mr-3">
                    #{index + 1}
                  </span>
                  <h4 className="font-semibold text-lg">{result.character}</h4>
                </div>
                <p className="text-gray-600 mb-3">{result.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {result.traits.map((trait, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {trait.name}: {trait.value}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  Valor da Badge: {result.coinValue} FeliCoins
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => {
                    setEditingResult(result);
                    setShowResultForm(true);
                  }}
                  className="text-fb-blue hover:underline text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteResult(result.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}

        {quizDraft.results.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-4">🎯</div>
            <p>Nenhum resultado criado ainda</p>
            <p className="text-sm">Clique em "Adicionar Resultado" para começar</p>
          </div>
        )}
      </div>

      {/* Result Form Modal */}
      {showResultForm && (
        <ResultFormModal
          result={editingResult}
          onSave={editingResult ? updateResult : addResult}
          onCancel={() => {
            setShowResultForm(false);
            setEditingResult(null);
          }}
        />
      )}
    </div>
  );
};

const QuestionsStep: React.FC<{
  quizDraft: QuizDraft;
  updateQuizDraft: (updates: Partial<QuizDraft>) => void;
  errors: Record<string, string>;
}> = ({ quizDraft, updateQuizDraft, errors }) => {
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);

  const addQuestion = (question: Question) => {
    const newQuestions = [...quizDraft.questions, question];
    updateQuizDraft({ questions: newQuestions });
    setShowQuestionForm(false);
    setEditingQuestion(null);
  };

  const updateQuestion = (updatedQuestion: Question) => {
    const newQuestions = quizDraft.questions.map(q => 
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    updateQuizDraft({ questions: newQuestions });
    setEditingQuestion(null);
    setShowQuestionForm(false);
  };

  const deleteQuestion = (questionId: string) => {
    const newQuestions = quizDraft.questions.filter(q => q.id !== questionId);
    updateQuizDraft({ questions: newQuestions });
  };

  if (quizDraft.availableTraits.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-8">
          <AlertCircle size={48} className="mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Traits Necessários</h3>
          <p className="text-gray-600 mb-4">
            Você precisa definir resultados com traits antes de criar perguntas.
          </p>
          <button
            onClick={() => updateQuizDraft({ /* go back to step 2 */ })}
            className="fb-button"
          >
            Voltar aos Resultados
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold">Perguntas do Quiz</h3>
          <p className="text-gray-600 text-sm mt-1">
            Crie perguntas com opções baseadas nos traits dos resultados (mínimo 3)
          </p>
        </div>
        <button
          onClick={() => setShowQuestionForm(true)}
          className="fb-button flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Adicionar Pergunta
        </button>
      </div>

      {errors.questions && (
        <div className="bg-red-50 border border-red-200 p-3 rounded mb-4">
          <p className="text-red-700 text-sm flex items-center">
            <AlertCircle size={16} className="mr-2" />
            {errors.questions}
          </p>
        </div>
      )}

      {/* Available Traits Info */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
        <h4 className="font-semibold text-blue-800 mb-2">Traits Disponíveis:</h4>
        <div className="flex flex-wrap gap-2">
          {quizDraft.availableTraits.map(trait => (
            <span
              key={trait}
              className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
            >
              {trait}
            </span>
          ))}
        </div>
        <p className="text-blue-700 text-sm mt-2">
          As opções das perguntas devem usar estes traits para funcionar corretamente.
        </p>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {quizDraft.questions.map((question, index) => (
          <div key={question.id} className="border border-fb-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="bg-fb-blue text-white text-sm px-2 py-1 rounded mr-3">
                    Pergunta {index + 1}
                  </span>
                </div>
                <h4 className="font-semibold mb-3">{question.text}</h4>
                <div className="space-y-2">
                  {question.options.map((option, optIndex) => (
                    <div key={option.id} className="bg-gray-50 p-3 rounded">
                      <p className="mb-2">{String.fromCharCode(65 + optIndex)}) {option.text}</p>
                      <div className="flex flex-wrap gap-1">
                        {option.traits.map((trait, i) => (
                          <span
                            key={i}
                            className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                          >
                            {trait.name}: +{trait.value}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => {
                    setEditingQuestion(question);
                    setShowQuestionForm(true);
                  }}
                  className="text-fb-blue hover:underline text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteQuestion(question.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}

        {quizDraft.questions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-4">❓</div>
            <p>Nenhuma pergunta criada ainda</p>
            <p className="text-sm">Clique em "Adicionar Pergunta" para começar</p>
          </div>
        )}
      </div>

      {/* Question Form Modal */}
      {showQuestionForm && (
        <QuestionFormModal
          question={editingQuestion}
          availableTraits={quizDraft.availableTraits}
          onSave={editingQuestion ? updateQuestion : addQuestion}
          onCancel={() => {
            setShowQuestionForm(false);
            setEditingQuestion(null);
          }}
        />
      )}
    </div>
  );
};

const ReviewStep: React.FC<{
  quizDraft: QuizDraft;
  onPreview: () => void;
}> = ({ quizDraft, onPreview }) => {
  const totalCoinValue = quizDraft.results.reduce((sum, result) => sum + result.coinValue, 0);
  const avgCoinValue = Math.round(totalCoinValue / quizDraft.results.length);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-6">Revisão Final</h3>
      
      <div className="space-y-6">
        {/* Quiz Overview */}
        <div className="border border-fb-border rounded-lg p-4">
          <h4 className="font-semibold mb-3">Informações do Quiz</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Título:</span> {quizDraft.title}
            </div>
            <div>
              <span className="font-medium">Categoria:</span> {quizDraft.category}
            </div>
            <div>
              <span className="font-medium">Tópico:</span> {quizDraft.topic}
              {quizDraft.subtopic && ` > ${quizDraft.subtopic}`}
            </div>
            <div>
              <span className="font-medium">Recompensa:</span> {quizDraft.coinReward} FeliCoins
            </div>
          </div>
          <div className="mt-3">
            <span className="font-medium">Descrição:</span>
            <p className="text-gray-600 mt-1">{quizDraft.description}</p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{quizDraft.results.length}</div>
            <div className="text-sm text-blue-800">Resultados Possíveis</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{quizDraft.questions.length}</div>
            <div className="text-sm text-green-800">Perguntas</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">{avgCoinValue}</div>
            <div className="text-sm text-yellow-800">Valor Médio das Badges</div>
          </div>
        </div>

        {/* Quality Checks */}
        <div className="border border-fb-border rounded-lg p-4">
          <h4 className="font-semibold mb-3">Verificações de Qualidade</h4>
          <div className="space-y-2">
            <QualityCheck
              condition={quizDraft.results.length >= 3}
              text="Pelo menos 3 resultados diferentes"
            />
            <QualityCheck
              condition={quizDraft.questions.length >= 5}
              text="Pelo menos 5 perguntas para maior precisão"
            />
            <QualityCheck
              condition={quizDraft.availableTraits.length >= 3}
              text="Pelo menos 3 traits diferentes"
            />
            <QualityCheck
              condition={!!quizDraft.coverImage}
              text="Imagem de capa definida"
            />
          </div>
        </div>

        {/* Preview Button */}
        <div className="text-center">
          <button
            onClick={onPreview}
            className="fb-button flex items-center mx-auto px-8 py-3"
          >
            <Eye size={20} className="mr-2" />
            Visualizar Quiz Completo
          </button>
          <p className="text-gray-500 text-sm mt-2">
            Teste seu quiz antes de publicar
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const QualityCheck: React.FC<{ condition: boolean; text: string }> = ({ condition, text }) => (
  <div className="flex items-center">
    {condition ? (
      <CheckCircle size={16} className="text-green-500 mr-2" />
    ) : (
      <AlertCircle size={16} className="text-yellow-500 mr-2" />
    )}
    <span className={condition ? 'text-green-700' : 'text-yellow-700'}>{text}</span>
  </div>
);

// Modal Components (simplified for brevity)
const ResultFormModal: React.FC<{
  result: Result | null;
  onSave: (result: Result) => void;
  onCancel: () => void;
}> = ({ result, onSave, onCancel }) => {
  // Implementation would go here
  return <div>Result Form Modal</div>;
};

const QuestionFormModal: React.FC<{
  question: Question | null;
  availableTraits: string[];
  onSave: (question: Question) => void;
  onCancel: () => void;
}> = ({ question, availableTraits, onSave, onCancel }) => {
  // Implementation would go here
  return <div>Question Form Modal</div>;
};

const QuizPreviewModal: React.FC<{
  quizDraft: QuizDraft;
  onClose: () => void;
}> = ({ quizDraft, onClose }) => {
  // Implementation would go here
  return <div>Quiz Preview Modal</div>;
};

export default CreateQuiz;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, AlertCircle, HelpCircle } from 'lucide-react';
import { Question, QuestionOption, Trait } from '../types';

interface QuestionFormModalProps {
  question: Question | null;
  availableTraits: string[];
  onSave: (question: Question) => void;
  onCancel: () => void;
}

const QuestionFormModal: React.FC<QuestionFormModalProps> = ({ 
  question, 
  availableTraits, 
  onSave, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    text: '',
    options: [] as QuestionOption[]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (question) {
      setFormData({
        text: question.text,
        options: [...question.options]
      });
    } else {
      // Initialize with 4 empty options
      setFormData({
        text: '',
        options: [
          { id: 'opt1', text: '', traits: [] },
          { id: 'opt2', text: '', traits: [] },
          { id: 'opt3', text: '', traits: [] },
          { id: 'opt4', text: '', traits: [] }
        ]
      });
    }
  }, [question]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.text.trim()) {
      newErrors.text = 'Texto da pergunta é obrigatório';
    }

    const validOptions = formData.options.filter(opt => opt.text.trim());
    if (validOptions.length < 2) {
      newErrors.options = 'Pelo menos 2 opções são necessárias';
    }

    // Check if all options have at least one trait
    const optionsWithoutTraits = validOptions.filter(opt => opt.traits.length === 0);
    if (optionsWithoutTraits.length > 0) {
      newErrors.traits = 'Todas as opções devem ter pelo menos um trait';
    }

    // Check if traits are valid
    const invalidTraits = validOptions.some(opt => 
      opt.traits.some(trait => !availableTraits.includes(trait.name))
    );
    if (invalidTraits) {
      newErrors.invalidTraits = 'Alguns traits não estão disponíveis nos resultados';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const validOptions = formData.options.filter(opt => opt.text.trim());
    
    const questionData: Question = {
      id: question?.id || `q${Date.now()}`,
      text: formData.text.trim(),
      options: validOptions.map((opt, index) => ({
        ...opt,
        id: opt.id || `opt${index + 1}`,
        text: opt.text.trim()
      }))
    };

    onSave(questionData);
  };

  const updateOption = (index: number, field: 'text', value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setFormData({ ...formData, options: newOptions });
  };

  const addTraitToOption = (optionIndex: number, traitName: string, value: number) => {
    const newOptions = [...formData.options];
    const existingTraitIndex = newOptions[optionIndex].traits.findIndex(t => t.name === traitName);
    
    if (existingTraitIndex >= 0) {
      newOptions[optionIndex].traits[existingTraitIndex].value = value;
    } else {
      newOptions[optionIndex].traits.push({ name: traitName, value });
    }
    
    setFormData({ ...formData, options: newOptions });
  };

  const removeTraitFromOption = (optionIndex: number, traitIndex: number) => {
    const newOptions = [...formData.options];
    newOptions[optionIndex].traits.splice(traitIndex, 1);
    setFormData({ ...formData, options: newOptions });
  };

  const addOption = () => {
    if (formData.options.length < 6) {
      const newOptions = [...formData.options, {
        id: `opt${formData.options.length + 1}`,
        text: '',
        traits: []
      }];
      setFormData({ ...formData, options: newOptions });
    }
  };

  const removeOption = (index: number) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      setFormData({ ...formData, options: newOptions });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-fb-border">
            <h2 className="text-xl font-bold text-fb-blue">
              {question ? 'Editar Pergunta' : 'Nova Pergunta'}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Question Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Texto da Pergunta *
              </label>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                className={`fb-input h-20 resize-none ${errors.text ? 'border-red-500' : ''}`}
                placeholder="Ex: Como você reage quando enfrenta um desafio?"
                maxLength={200}
              />
              {errors.text && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.text}
                </p>
              )}
              <p className="text-gray-500 text-sm mt-1">
                {formData.text.length}/200 caracteres
              </p>
            </div>

            {/* Available Traits Info */}
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <HelpCircle size={16} className="text-blue-600 mr-2" />
                <h4 className="font-semibold text-blue-800">Traits Disponíveis:</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableTraits.map(trait => (
                  <span
                    key={trait}
                    className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                  >
                    {trait}
                  </span>
                ))}
              </div>
              <p className="text-blue-700 text-sm mt-2">
                Use apenas estes traits nas opções para garantir compatibilidade com os resultados.
              </p>
            </div>

            {/* Options */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Opções de Resposta *
                </label>
                <button
                  onClick={addOption}
                  disabled={formData.options.length >= 6}
                  className="text-fb-blue hover:underline text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  + Adicionar Opção
                </button>
              </div>

              <div className="space-y-4">
                {formData.options.map((option, optionIndex) => (
                  <div key={option.id} className="border border-fb-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Opção {String.fromCharCode(65 + optionIndex)}
                        </label>
                        <textarea
                          value={option.text}
                          onChange={(e) => updateOption(optionIndex, 'text', e.target.value)}
                          className="fb-input h-16 resize-none"
                          placeholder="Digite o texto da opção..."
                          maxLength={150}
                        />
                        <p className="text-gray-500 text-xs mt-1">
                          {option.text.length}/150 caracteres
                        </p>
                      </div>
                      {formData.options.length > 2 && (
                        <button
                          onClick={() => removeOption(optionIndex)}
                          className="ml-3 text-red-600 hover:bg-red-100 p-1 rounded"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>

                    {/* Traits for this option */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Traits desta opção
                      </label>
                      
                      {/* Add trait selector */}
                      <div className="flex gap-2 mb-3">
                        <select
                          className="fb-input flex-1"
                          onChange={(e) => {
                            if (e.target.value) {
                              addTraitToOption(optionIndex, e.target.value, 1);
                              e.target.value = '';
                            }
                          }}
                        >
                          <option value="">Selecione um trait...</option>
                          {availableTraits
                            .filter(trait => !option.traits.some(t => t.name === trait))
                            .map(trait => (
                              <option key={trait} value={trait}>{trait}</option>
                            ))}
                        </select>
                      </div>

                      {/* Current traits */}
                      <div className="space-y-2">
                        {option.traits.map((trait, traitIndex) => (
                          <div key={traitIndex} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                            <span className="flex-1 text-sm font-medium">{trait.name}</span>
                            <select
                              value={trait.value}
                              onChange={(e) => addTraitToOption(optionIndex, trait.name, parseInt(e.target.value))}
                              className="fb-input w-16 text-sm"
                            >
                              {[1, 2, 3, 4, 5].map(val => (
                                <option key={val} value={val}>+{val}</option>
                              ))}
                            </select>
                            <button
                              onClick={() => removeTraitFromOption(optionIndex, traitIndex)}
                              className="text-red-600 hover:bg-red-100 p-1 rounded"
                            >
                              <Minus size={14} />
                            </button>
                          </div>
                        ))}
                      </div>

                      {option.traits.length === 0 && (
                        <div className="text-center py-3 text-gray-500 bg-gray-50 rounded">
                          <p className="text-sm">Nenhum trait adicionado</p>
                          <p className="text-xs">Adicione pelo menos um trait para esta opção</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {errors.options && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.options}
                </p>
              )}
              {errors.traits && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.traits}
                </p>
              )}
              {errors.invalidTraits && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.invalidTraits}
                </p>
              )}
            </div>

            {/* Tips */}
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">💡 Dicas para boas perguntas:</h4>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• Faça perguntas que revelem personalidade ou preferências</li>
                <li>• Cada opção deve ter pelo menos um trait relevante</li>
                <li>• Distribua os traits de forma equilibrada entre as opções</li>
                <li>• Evite opções muito óbvias ou que levem sempre ao mesmo resultado</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-fb-border">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-fb-border rounded hover:bg-gray-100 transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="fb-button px-6 py-2"
            >
              {question ? 'Salvar Alterações' : 'Adicionar Pergunta'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuestionFormModal;
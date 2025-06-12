import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { Result, Trait } from '../types';

interface ResultFormModalProps {
  result: Result | null;
  onSave: (result: Result) => void;
  onCancel: () => void;
}

const ResultFormModal: React.FC<ResultFormModalProps> = ({ result, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    character: '',
    description: '',
    image: '',
    badgeImage: '',
    coinValue: 100,
    traits: [] as Trait[]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newTrait, setNewTrait] = useState({ name: '', value: 1 });

  useEffect(() => {
    if (result) {
      setFormData({
        character: result.character,
        description: result.description,
        image: result.image,
        badgeImage: result.badgeImage,
        coinValue: result.coinValue,
        traits: [...result.traits]
      });
    }
  }, [result]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.character.trim()) {
      newErrors.character = 'Nome do personagem é obrigatório';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }
    if (formData.traits.length === 0) {
      newErrors.traits = 'Pelo menos um trait é necessário';
    }
    if (formData.coinValue < 50 || formData.coinValue > 200) {
      newErrors.coinValue = 'Valor deve estar entre 50 e 200 FeliCoins';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const resultData: Result = {
      id: result?.id || `r${Date.now()}`,
      character: formData.character.trim(),
      description: formData.description.trim(),
      image: formData.image || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      badgeImage: formData.badgeImage || '/badges/default.png',
      coinValue: formData.coinValue,
      traits: formData.traits
    };

    onSave(resultData);
  };

  const addTrait = () => {
    if (!newTrait.name.trim()) return;
    
    const existingTrait = formData.traits.find(t => t.name.toLowerCase() === newTrait.name.toLowerCase());
    if (existingTrait) {
      setErrors({ ...errors, newTrait: 'Este trait já existe' });
      return;
    }

    setFormData({
      ...formData,
      traits: [...formData.traits, { name: newTrait.name.trim(), value: newTrait.value }]
    });
    setNewTrait({ name: '', value: 1 });
    setErrors({ ...errors, newTrait: '' });
  };

  const removeTrait = (index: number) => {
    const newTraits = formData.traits.filter((_, i) => i !== index);
    setFormData({ ...formData, traits: newTraits });
  };

  const updateTrait = (index: number, field: 'name' | 'value', value: string | number) => {
    const newTraits = [...formData.traits];
    newTraits[index] = { ...newTraits[index], [field]: value };
    setFormData({ ...formData, traits: newTraits });
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
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-fb-border">
            <h2 className="text-xl font-bold text-fb-blue">
              {result ? 'Editar Resultado' : 'Novo Resultado'}
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
            {/* Character Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Personagem/Resultado *
              </label>
              <input
                type="text"
                value={formData.character}
                onChange={(e) => setFormData({ ...formData, character: e.target.value })}
                className={`fb-input ${errors.character ? 'border-red-500' : ''}`}
                placeholder="Ex: Harry Potter, Hermione Granger..."
                maxLength={50}
              />
              {errors.character && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.character}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição do Resultado *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`fb-input h-24 resize-none ${errors.description ? 'border-red-500' : ''}`}
                placeholder="Descreva as características e personalidade deste resultado..."
                maxLength={500}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.description}
                </p>
              )}
              <p className="text-gray-500 text-sm mt-1">
                {formData.description.length}/500 caracteres
              </p>
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagem do Resultado
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  {formData.image ? (
                    <div className="relative">
                      <img
                        src={formData.image}
                        alt="Result preview"
                        className="w-full h-32 object-cover rounded"
                      />
                      <button
                        onClick={() => setFormData({ ...formData, image: '' })}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <ImageIcon size={32} className="mx-auto text-gray-400 mb-2" />
                      <input
                        type="url"
                        placeholder="URL da imagem"
                        className="fb-input text-sm"
                        onBlur={(e) => {
                          if (e.target.value) {
                            setFormData({ ...formData, image: e.target.value });
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagem da Badge
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  {formData.badgeImage && formData.badgeImage !== '/badges/default.png' ? (
                    <div className="relative">
                      <img
                        src={formData.badgeImage}
                        alt="Badge preview"
                        className="w-full h-32 object-contain rounded"
                      />
                      <button
                        onClick={() => setFormData({ ...formData, badgeImage: '' })}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <ImageIcon size={32} className="mx-auto text-gray-400 mb-2" />
                      <input
                        type="url"
                        placeholder="URL da badge"
                        className="fb-input text-sm"
                        onBlur={(e) => {
                          if (e.target.value) {
                            setFormData({ ...formData, badgeImage: e.target.value });
                          }
                        }}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Deixe vazio para usar badge padrão
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Coin Value */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor da Badge (FeliCoins)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="50"
                  max="200"
                  step="10"
                  value={formData.coinValue}
                  onChange={(e) => setFormData({ ...formData, coinValue: parseInt(e.target.value) })}
                  className="flex-1"
                />
                <span className="font-semibold text-fb-blue min-w-[80px]">
                  {formData.coinValue} coins
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Comum (50-80)</span>
                <span>Incomum (90-110)</span>
                <span>Raro (120-150)</span>
                <span>Lendário (160-200)</span>
              </div>
              {errors.coinValue && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.coinValue}
                </p>
              )}
            </div>

            {/* Traits */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Traits do Resultado *
              </label>
              
              {/* Add New Trait */}
              <div className="border border-fb-border rounded-lg p-4 mb-4">
                <h4 className="font-medium mb-3">Adicionar Trait</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTrait.name}
                    onChange={(e) => setNewTrait({ ...newTrait, name: e.target.value })}
                    className="fb-input flex-1"
                    placeholder="Nome do trait (ex: Coragem, Inteligência...)"
                  />
                  <select
                    value={newTrait.value}
                    onChange={(e) => setNewTrait({ ...newTrait, value: parseInt(e.target.value) })}
                    className="fb-input w-20"
                  >
                    {[1, 2, 3, 4, 5].map(val => (
                      <option key={val} value={val}>{val}</option>
                    ))}
                  </select>
                  <button
                    onClick={addTrait}
                    className="fb-button px-3"
                    disabled={!newTrait.name.trim()}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {errors.newTrait && (
                  <p className="text-red-500 text-sm mt-1">{errors.newTrait}</p>
                )}
                <p className="text-gray-500 text-xs mt-2">
                  Traits definem as características deste resultado. Valor de 1 (baixo) a 5 (alto).
                </p>
              </div>

              {/* Current Traits */}
              <div className="space-y-2">
                {formData.traits.map((trait, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-50 p-3 rounded">
                    <input
                      type="text"
                      value={trait.name}
                      onChange={(e) => updateTrait(index, 'name', e.target.value)}
                      className="fb-input flex-1"
                    />
                    <select
                      value={trait.value}
                      onChange={(e) => updateTrait(index, 'value', parseInt(e.target.value))}
                      className="fb-input w-20"
                    >
                      {[1, 2, 3, 4, 5].map(val => (
                        <option key={val} value={val}>{val}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeTrait(index)}
                      className="text-red-600 hover:bg-red-100 p-1 rounded"
                    >
                      <Minus size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {formData.traits.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  <p>Nenhum trait adicionado ainda</p>
                  <p className="text-sm">Adicione pelo menos um trait para continuar</p>
                </div>
              )}

              {errors.traits && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.traits}
                </p>
              )}
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
              {result ? 'Salvar Alterações' : 'Adicionar Resultado'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResultFormModal;
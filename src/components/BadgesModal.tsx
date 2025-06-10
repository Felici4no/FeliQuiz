import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Coins, Trophy, Star } from 'lucide-react';
import { Quiz } from '../types';

interface BadgesModalProps {
  quiz: Quiz;
  isOpen: boolean;
  onClose: () => void;
}

const BadgesModal: React.FC<BadgesModalProps> = ({ quiz, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Calculate rarity based on coin value
  const getRarity = (coinValue: number) => {
    if (coinValue >= 1200) return { name: 'Lendário', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' };
    if (coinValue >= 1000) return { name: 'Raro', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
    if (coinValue >= 800) return { name: 'Incomum', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    return { name: 'Comum', color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' };
  };

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
          className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-fb-border sticky top-0 bg-white">
            <div className="flex items-center">
              <Trophy className="text-yellow-500 mr-3" size={24} />
              <div>
                <h2 className="text-xl font-bold text-fb-blue">Resultados Possíveis</h2>
                <p className="text-gray-600 text-sm mt-1">{quiz.title}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-6 text-center">
              <p className="text-gray-600 mb-2">
                Estes são todos os {quiz.results.length} resultados possíveis que você pode obter neste quiz.
              </p>
              <p className="text-sm text-gray-500">
                Cada resultado vem com uma badge única para sua coleção!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quiz.results.map((result) => {
                const rarity = getRarity(result.coinValue);
                
                return (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: quiz.results.indexOf(result) * 0.1 }}
                    className={`border rounded-lg p-4 hover:shadow-md transition ${rarity.border} ${rarity.bg}`}
                  >
                    {/* Rarity Badge */}
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${rarity.color} ${rarity.bg} border ${rarity.border}`}>
                        <Star size={12} className="inline mr-1" />
                        {rarity.name}
                      </span>
                      <div className={`flex items-center text-sm ${rarity.color}`}>
                        <Coins size={14} className="mr-1" />
                        <span className="font-semibold">{result.coinValue}</span>
                      </div>
                    </div>

                    {/* Character Image */}
                    <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-white shadow-md">
                      <img
                        src={result.image}
                        alt={result.character}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Badge Image */}
                    <div className="w-16 h-16 mx-auto mb-3">
                      <img
                        src={result.badgeImage || '/badges/default.png'}
                        alt={`${result.character} badge`}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Character Info */}
                    <div className="text-center">
                      <h3 className="font-bold text-fb-blue mb-2 text-lg">
                        {result.character}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                        {result.description}
                      </p>
                    </div>

                    {/* Traits Preview */}
                    {result.traits && result.traits.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-2">Principais características:</p>
                        <div className="flex flex-wrap gap-1">
                          {result.traits.slice(0, 3).map((trait, index) => (
                            <span
                              key={index}
                              className="text-xs bg-white px-2 py-1 rounded border text-gray-600"
                            >
                              {trait.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-fb-border text-center">
              <div className="bg-fb-blue/5 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-fb-blue mb-2">🎯 Como funciona?</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Suas respostas são analisadas para determinar qual resultado combina mais com você.
                </p>
                <p className="text-xs text-gray-500">
                  Cada pergunta contribui para diferentes características que definem seu resultado final.
                </p>
              </div>
              
              <button
                onClick={onClose}
                className="fb-button px-8"
              >
                Fazer Quiz Agora
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BadgesModal;
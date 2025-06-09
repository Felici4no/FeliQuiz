import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Coins } from 'lucide-react';
import { Quiz } from '../types';

interface BadgesModalProps {
  quiz: Quiz;
  isOpen: boolean;
  onClose: () => void;
}

const BadgesModal: React.FC<BadgesModalProps> = ({ quiz, isOpen, onClose }) => {
  if (!isOpen) return null;

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
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-fb-border">
            <div>
              <h2 className="text-xl font-bold text-fb-blue">Badges Possíveis</h2>
              <p className="text-gray-600 text-sm mt-1">{quiz.title}</p>
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
            <p className="text-gray-600 mb-6">
              Estes são todos os resultados possíveis que você pode obter neste quiz. 
              Cada resultado vem com uma badge única para sua coleção!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quiz.results.map((result) => (
                <div
                  key={result.id}
                  className="border border-fb-border rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex items-start gap-4">
                    {/* Badge Image */}
                    <div className="w-16 h-16 flex-shrink-0">
                      <img
                        src={result.badgeImage || '/badges/default.png'}
                        alt={result.character}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Result Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-fb-blue mb-1 truncate">
                        {result.character}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3 mb-2">
                        {result.description}
                      </p>
                      
                      {/* Coin Value */}
                      <div className="flex items-center text-yellow-600 text-sm">
                        <Coins size={14} className="mr-1" />
                        <span>{result.coinValue} FeliCoins</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-fb-border text-center">
              <p className="text-sm text-gray-600 mb-4">
                Faça o quiz para descobrir qual badge você vai ganhar!
              </p>
              <button
                onClick={onClose}
                className="fb-button"
              >
                Fazer Quiz
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BadgesModal;
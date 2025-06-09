import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Trophy, Coins, User, UserPlus } from 'lucide-react';
import { Quiz, Result } from '../types';

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: Result | null;
  quiz: Quiz;
}

const LoginPromptModal: React.FC<LoginPromptModalProps> = ({ 
  isOpen, 
  onClose, 
  result, 
  quiz 
}) => {
  if (!isOpen || !result) return null;

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
          className="bg-white rounded-lg shadow-xl max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-fb-border">
            <div className="flex items-center">
              <Trophy className="text-yellow-500 mr-2" size={24} />
              <h2 className="text-xl font-bold text-fb-blue">Salvar Badge</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 text-center">
            {/* Badge Preview */}
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto mb-3">
                <img
                  src={result.badgeImage || '/badges/default.png'}
                  alt={result.character}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-fb-blue mb-1">
                {result.character}
              </h3>
              <div className="flex items-center justify-center text-yellow-600 text-sm">
                <Coins size={16} className="mr-1" />
                <span>{result.coinValue} FeliCoins</span>
              </div>
            </div>

            {/* Message */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">
                🎉 Parabéns pelo seu resultado!
              </h4>
              <p className="text-gray-600 mb-4">
                Para salvar esta badge na sua coleção e ganhar FeliCoins, 
                você precisa ter uma conta no FeliQuiz.
              </p>
              
              {/* Benefits */}
              <div className="bg-fb-gray p-4 rounded-lg text-left">
                <h5 className="font-semibold mb-2">Com uma conta você pode:</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Salvar badges dos seus resultados</li>
                  <li>• Ganhar FeliCoins a cada quiz</li>
                  <li>• Criar seu perfil público</li>
                  <li>• Compartilhar sua coleção</li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                to="/login"
                className="w-full fb-button flex items-center justify-center"
                onClick={onClose}
              >
                <User className="mr-2" size={18} />
                Fazer Login
              </Link>
              
              <Link
                to="/login"
                className="w-full border border-fb-border py-2 px-4 rounded hover:bg-gray-100 transition flex items-center justify-center"
                onClick={onClose}
              >
                <UserPlus className="mr-2" size={18} />
                Criar Conta Grátis
              </Link>
              
              <button
                onClick={onClose}
                className="w-full text-gray-500 hover:text-gray-700 text-sm py-2"
              >
                Continuar sem salvar
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginPromptModal;
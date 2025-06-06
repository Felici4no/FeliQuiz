import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle, Loader } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, register, isLoading } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      let success = false;
      
      if (isLogin) {
        success = await login(email, password);
        if (!success) {
          setError('Email ou senha incorretos. Tente usar "lucasfeliciano" como email.');
        }
      } else {
        if (password.length < 6) {
          setError('A senha deve ter pelo menos 6 caracteres.');
          return;
        }
        
        success = await register(name, username, email, password);
        if (!success) {
          setError('Nome de usuário já existe. Tente outro.');
        }
      }

      if (success) {
        navigate('/');
      }
    } catch (err) {
      setError('Ocorreu um erro. Tente novamente.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const formVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-fb-gray flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-md w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-fb-blue mb-2">FeliQuiz</h1>
          <p className="text-gray-600">
            {isLogin ? 'Bem-vindo de volta!' : 'Junte-se à nossa comunidade!'}
          </p>
        </div>

        <motion.div
          className="bg-white p-8 rounded-lg shadow-md"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center">
              <AlertCircle className="text-red-500 mr-2" size={20} />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="fb-input pl-10"
                      placeholder="João Silva"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome de Usuário
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">@</span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                      className="fb-input pl-10"
                      placeholder="joaosilva"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Apenas letras minúsculas e números</p>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isLogin ? 'Email ou Nome de Usuário' : 'Email'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={isLogin ? "text" : "email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="fb-input pl-10"
                  placeholder={isLogin ? "seu@email.com ou @usuario" : "seu@email.com"}
                  required
                  disabled={isLoading}
                />
              </div>
              {isLogin && (
                <p className="text-xs text-gray-500 mt-1">
                  Dica: use "lucasfeliciano" para testar
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="fb-input pl-10"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>
              {!isLogin && (
                <p className="text-xs text-gray-500 mt-1">Mínimo de 6 caracteres</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full fb-button py-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin mr-2" size={20} />
                  <span>{isLogin ? 'Entrando...' : 'Criando conta...'}</span>
                </>
              ) : (
                <>
                  <span>{isLogin ? 'Entrar' : 'Criar Conta'}</span>
                  <ArrowRight className="ml-2" size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setEmail('');
                setPassword('');
                setName('');
                setUsername('');
              }}
              className="text-fb-blue hover:underline text-sm"
              disabled={isLoading}
            >
              {isLogin
                ? "Não tem uma conta? Cadastre-se"
                : 'Já tem uma conta? Entre'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Auth;
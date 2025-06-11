import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, User, UserPlus } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Manifesto: React.FC = () => {
  const { currentUser, manifestoLikes, hasLikedManifesto, toggleManifestoLike } = useUser();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleLikeClick = () => {
    if (!currentUser) {
      setShowLoginPrompt(true);
      return;
    }
    toggleManifestoLike();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="fb-card p-8 max-w-prose mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-fb-blue">Nosso Manifesto</h1>

          <p className="mb-6 text-lg leading-relaxed whitespace-pre-line">
            Com quantas respostas você consegue se diferenciar dos outros?
          </p>

          <p className="mb-6 text-lg leading-relaxed whitespace-pre-line">
            Essa pergunta ficou na minha cabeça por dias.  
            Jogos de perguntas e respostas sempre me pareceram mais do que passatempo.  
            Sempre vi neles uma forma de se enxergar. De rir. De pensar. De ser.
          </p>

          <p className="mb-6 text-lg leading-relaxed">
            Foi por isso que criei o <strong className="text-fb-blue">FeliQuiz</strong>.
          </p>

          <p className="mb-6 text-lg leading-relaxed whitespace-pre-line">
            Aqui, cada pergunta tem personalidade.  
            E cada resposta revela um pedaço seu.
          </p>

          <p className="mb-6 text-lg leading-relaxed whitespace-pre-line">
            Você não soma pontos.  
            Você coleciona emblemas, pequenos reflexos de quem você é, ou poderia ser.
          </p>

          <p className="mb-6 text-lg leading-relaxed whitespace-pre-line">
            Você pode sair como um herói. Um bruxo. Um enigma.  
            Ou alguém que ainda está descobrindo onde se encaixa.
          </p>

          <p className="mb-6 text-lg leading-relaxed">
            E está tudo bem. Isso também é identidade.
          </p>

          <p className="mb-6 text-lg leading-relaxed whitespace-pre-line">
            O <strong className="text-fb-blue">FeliQuiz</strong> é mais que código.  
            É uma experiência de autodescoberta.
          </p>

          <p className="mb-6 text-lg leading-relaxed">
            Seja bem-vindo.
          </p>


        <div className="border-t border-fb-border mt-8 pt-6 text-center">
          <p className="text-base font-semibold">Lucas Feliciano</p>
          <p className="text-sm text-gray-400 italic mb-6">Criador do FeliQuiz</p>
          
          {/* Like Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLikeClick}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition ${
                  hasLikedManifesto 
                    ? 'bg-red-50 text-red-600 border border-red-200' 
                    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                <Heart 
                  size={20} 
                  className={hasLikedManifesto ? 'fill-current' : ''} 
                />
                <span>{hasLikedManifesto ? 'Curtido' : 'Curtir'}</span>
              </button>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-fb-blue">{manifestoLikes.toLocaleString()}</div>
                <div className="text-sm text-gray-600">curtidas</div>
              </div>
            </div>

            {/* Login prompt for non-logged users */}
            {showLoginPrompt && !currentUser && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg max-w-sm">
                <p className="text-sm text-blue-800 mb-3 text-center">
                  Para curtir o manifesto, você precisa estar logado
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link 
                    to="/login" 
                    className="flex items-center justify-center px-3 py-2 bg-fb-blue text-white rounded text-sm hover:bg-fb-blue-dark transition"
                  >
                    <User size={16} className="mr-1" />
                    Entrar
                  </Link>
                  <Link 
                    to="/login" 
                    className="flex items-center justify-center px-3 py-2 border border-fb-border rounded text-sm hover:bg-gray-100 transition"
                  >
                    <UserPlus size={16} className="mr-1" />
                    Criar Conta
                  </Link>
                </div>
                <button 
                  onClick={() => setShowLoginPrompt(false)}
                  className="w-full mt-2 text-xs text-gray-500 hover:text-gray-700"
                >
                  Fechar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manifesto;
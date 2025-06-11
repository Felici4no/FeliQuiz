import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { LogOut, Settings, Edit3, Plus, Calendar, Trophy, Share2 } from 'lucide-react';
import { User, QuizSubmission } from '../types';
import { useUser } from '../context/UserContext';
import { useQuiz } from '../context/QuizContext';
import Badge from '../components/Badge';
import CoinBalance from '../components/CoinBalance';

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { getUserByUsername, currentUser, logout, getUserQuizSubmissions, canCreateQuizzes } = useUser();
  const { getQuizById } = useQuiz();
  const [user, setUser] = useState<User | null>(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [userSubmissions, setUserSubmissions] = useState<QuizSubmission[]>([]);

  useEffect(() => {
    if (username) {
      const profileUser = getUserByUsername(username);
      if (profileUser) {
        setUser(profileUser);
        setIsOwnProfile(currentUser?.id === profileUser.id);
        
        // Get user's quiz submissions
        const submissions = getUserQuizSubmissions(profileUser.id);
        setUserSubmissions(submissions);
      }
    }
  }, [username, getUserByUsername, currentUser, getUserQuizSubmissions]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleShareProfile = () => {
    if (!user) return;

    const shareData = {
      title: `Perfil de ${user.name} no FeliQuiz`,
      text: `Confira o perfil de ${user.name} (@${user.username}) no FeliQuiz! ${user.badges.length} badges conquistadas e ${user.feliCoins} FeliCoins! 🏆`,
      url: window.location.href
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      // Use native share API if available
      navigator.share(shareData).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      const shareText = `${shareData.text}\n${shareData.url}`;
      
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
          alert('Link do perfil copiado para a área de transferência!');
        }).catch(() => {
          // Fallback for clipboard API failure
          fallbackCopyToClipboard(shareText);
        });
      } else {
        fallbackCopyToClipboard(shareText);
      }
    }
  };

  const fallbackCopyToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      alert('Link do perfil copiado para a área de transferência!');
    } catch (err) {
      console.error('Erro ao copiar:', err);
      alert('Não foi possível copiar o link. Tente novamente.');
    }
    
    document.body.removeChild(textArea);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="fb-card text-center py-8">
          <h2 className="text-xl font-bold mb-2">Usuário não encontrado</h2>
          <p className="text-gray-600 mb-4">O perfil que você está procurando não existe.</p>
          <button 
            onClick={() => navigate('/')}
            className="fb-button"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="fb-card">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-fb-blue">
            <img 
              src={user.profilePicture} 
              alt={user.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
                <p className="text-gray-600 mb-2">@{user.username}</p>
                {canCreateQuizzes(user.username) && (
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mb-2">
                    ✨ Criador de Quizzes
                  </span>
                )}
                <CoinBalance balance={user.feliCoins} size="large" />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
                {/* Share Profile Button - Always visible */}
                <button 
                  onClick={handleShareProfile}
                  className="border border-fb-border text-fb-blue hover:bg-fb-blue hover:text-white font-semibold py-1 px-4 rounded transition flex items-center justify-center"
                >
                  <Share2 size={16} className="mr-2" />
                  Compartilhar Perfil
                </button>
                
                {/* Own Profile Actions */}
                {isOwnProfile && (
                  <>
                    {canCreateQuizzes() && (
                      <button className="fb-button flex items-center justify-center">
                        <Plus size={16} className="mr-2" />
                        Criar Quiz
                      </button>
                    )}
                    <button className="fb-button flex items-center justify-center">
                      <Edit3 size={16} className="mr-2" />
                      Editar Perfil
                    </button>
                    <button className="fb-button flex items-center justify-center">
                      <Settings size={16} className="mr-2" />
                      Configurações
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="border border-red-300 text-red-600 hover:bg-red-50 font-semibold py-1 px-4 rounded transition flex items-center justify-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sair
                    </button>
                  </>
                )}
              </div>
            </div>
            
            <div className="border-t border-fb-border pt-4 mt-4">
              <h2 className="font-semibold mb-3">Estatísticas</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-fb-gray rounded">
                  <div className="text-2xl font-bold text-fb-blue">{user.badges.length}</div>
                  <div className="text-sm text-gray-600">Badges Conquistadas</div>
                </div>
                <div className="p-3 bg-fb-gray rounded">
                  <div className="text-2xl font-bold text-fb-blue">{user.quizzesTaken}</div>
                  <div className="text-sm text-gray-600">Quizzes Feitos</div>
                </div>
                <div className="p-3 bg-fb-gray rounded">
                  <div className="text-2xl font-bold text-fb-blue">{user.quizzesCreated}</div>
                  <div className="text-sm text-gray-600">Quizzes Criados</div>
                </div>
                <div className="p-3 bg-fb-gray rounded">
                  <div className="text-2xl font-bold text-fb-blue">{user.feliCoins}</div>
                  <div className="text-sm text-gray-600">FeliCoins</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quiz History Section */}
      {userSubmissions.length > 0 && (
        <div className="fb-card mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <Calendar className="mr-2" size={20} />
              Histórico de Quizzes
            </h2>
            <span className="text-sm text-gray-600">{userSubmissions.length} quiz{userSubmissions.length !== 1 ? 'zes' : ''} feito{userSubmissions.length !== 1 ? 's' : ''}</span>
          </div>
          
          <div className="space-y-3">
            {userSubmissions.slice(0, 5).map(submission => {
              const quiz = getQuizById(submission.quizId);
              if (!quiz) return null;
              
              return (
                <div key={submission.id} className="border border-fb-border rounded p-3 hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-fb-blue">{quiz.title}</h3>
                      <p className="text-sm text-gray-600">
                        Feito em {new Date(submission.submittedAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-yellow-600 font-medium">
                        +{submission.earnedCoins} FeliCoins
                      </div>
                      <Link 
                        to={`/quiz/${quiz.id}`}
                        className="text-xs text-fb-blue hover:underline"
                      >
                        Fazer novamente
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {userSubmissions.length > 5 && (
              <div className="text-center pt-2">
                <button className="text-fb-blue hover:underline text-sm">
                  Ver todos os {userSubmissions.length} quizzes
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Badges Collection */}
      <div className="fb-card mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <Trophy className="mr-2" size={20} />
            Coleção de Badges
          </h2>
          {user.badges.length > 0 && (
            <span className="text-sm text-gray-600">{user.badges.length} conquistadas</span>
          )}
        </div>
        
        {user.badges.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {user.badges.map(badge => (
              <Badge key={badge.id} badge={badge} />
            ))}
          </div>
        ) : (
          <div className="bg-fb-gray p-8 rounded text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-lg font-semibold mb-2">
              {isOwnProfile ? 'Sua coleção está vazia!' : 'Nenhuma badge ainda!'}
            </h3>
            <p className="text-gray-600 mb-4">
              {isOwnProfile 
                ? 'Faça quizzes para ganhar badges e construir sua coleção.' 
                : `${user.name} ainda não conquistou nenhuma badge.`
              }
            </p>
            {isOwnProfile && (
              <button 
                onClick={() => navigate('/quizzes')}
                className="fb-button"
              >
                Explorar Quizzes
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
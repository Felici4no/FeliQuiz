import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { LogOut, Settings, Share2, Plus } from 'lucide-react';
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
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="fb-card">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6">
          {/* Profile Picture */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-fb-blue flex-shrink-0">
            <img 
              src={user.profilePicture} 
              alt={user.name} 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left w-full">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div className="mb-4 md:mb-0">
                <h1 className="text-xl sm:text-2xl font-bold mb-1">{user.name}</h1>
                <p className="text-gray-600 mb-2">@{user.username}</p>
                
                {/* Creator Badge */}
                {canCreateQuizzes(user.username) && (
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mb-2">
                    ✨ Criador de Quizzes
                  </span>
                )}
                
                {/* FeliCoins */}
                <div className="flex justify-center md:justify-start">
                  <CoinBalance balance={user.feliCoins} size="large" />
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                {/* Share Profile Button - Always visible */}
                <button 
                  onClick={handleShareProfile}
                  className="border border-fb-border text-fb-blue hover:bg-fb-blue hover:text-white font-semibold py-2 px-4 rounded transition flex items-center justify-center text-sm"
                >
                  <Share2 size={16} className="mr-2" />
                  <span className="hidden sm:inline">Compartilhar</span>
                  <span className="sm:hidden">Compartilhar Perfil</span>
                </button>
                
                {/* Own Profile Actions */}
                {isOwnProfile && (
                  <>
                    {/* Create Quiz Button - Only for creators */}
                    {canCreateQuizzes() && (
                      <Link
                        to="/create-quiz"
                        className="fb-button flex items-center justify-center text-sm"
                      >
                        <Plus size={16} className="mr-2" />
                        <span className="hidden sm:inline">Criar Quiz</span>
                        <span className="sm:hidden">Criar</span>
                      </Link>
                    )}
                    
                    {/* Settings Button */}
                    <Link
                      to="/settings"
                      className="fb-button flex items-center justify-center text-sm"
                    >
                      <Settings size={16} className="mr-2" />
                      <span className="hidden sm:inline">Configurações</span>
                      <span className="sm:hidden">Config</span>
                    </Link>
                    
                    {/* Logout Button */}
                    <button 
                      onClick={handleLogout}
                      className="border border-red-300 text-red-600 hover:bg-red-50 font-semibold py-2 px-4 rounded transition flex items-center justify-center text-sm"
                    >
                      <LogOut size={16} className="mr-2" />
                      <span className="hidden sm:inline">Sair</span>
                      <span className="sm:hidden">Sair</span>
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Statistics */}
            <div className="border-t border-fb-border pt-4 mt-4">
              <h2 className="font-semibold mb-3 text-center md:text-left">Estatísticas</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-center">
                <div className="p-3 bg-fb-gray rounded">
                  <div className="text-xl sm:text-2xl font-bold text-fb-blue">{user.badges.length}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Badges</div>
                </div>
                <div className="p-3 bg-fb-gray rounded">
                  <div className="text-xl sm:text-2xl font-bold text-fb-blue">{user.quizzesTaken}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Quizzes Feitos</div>
                </div>
                <div className="p-3 bg-fb-gray rounded">
                  <div className="text-xl sm:text-2xl font-bold text-fb-blue">{user.quizzesCreated}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Criados</div>
                </div>
                <div className="p-3 bg-fb-gray rounded">
                  <div className="text-xl sm:text-2xl font-bold text-fb-blue">{user.feliCoins}</div>
                  <div className="text-xs sm:text-sm text-gray-600">FeliCoins</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quiz History Section - Mobile Optimized */}
      {userSubmissions.length > 0 && (
        <div className="fb-card mt-4 sm:mt-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-0">
              📅 Histórico de Quizzes
            </h2>
            <span className="text-sm text-gray-600">
              {userSubmissions.length} quiz{userSubmissions.length !== 1 ? 'zes' : ''} feito{userSubmissions.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="space-y-3">
            {userSubmissions.slice(0, 5).map(submission => {
              const quiz = getQuizById(submission.quizId);
              if (!quiz) return null;
              
              return (
                <div key={submission.id} className="border border-fb-border rounded p-3 hover:bg-gray-50 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-fb-blue text-sm sm:text-base">{quiz.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {new Date(submission.submittedAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="flex flex-row sm:flex-col sm:text-right gap-2 sm:gap-0">
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
      
      {/* Badges Collection - Mobile Optimized */}
      <div className="fb-card mt-4 sm:mt-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-0">
            🏆 Coleção de Badges
          </h2>
          {user.badges.length > 0 && (
            <span className="text-sm text-gray-600">{user.badges.length} conquistadas</span>
          )}
        </div>
        
        {user.badges.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
            {user.badges.map(badge => (
              <Badge key={badge.id} badge={badge} size="small" />
            ))}
          </div>
        ) : (
          <div className="bg-fb-gray p-6 sm:p-8 rounded text-center">
            <div className="text-4xl sm:text-6xl mb-4">🏆</div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              {isOwnProfile ? 'Sua coleção está vazia!' : 'Nenhuma badge ainda!'}
            </h3>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              {isOwnProfile 
                ? 'Faça quizzes para ganhar badges e construir sua coleção.' 
                : `${user.name} ainda não conquistou nenhuma badge.`
              }
            </p>
            {isOwnProfile && (
              <button 
                onClick={() => navigate('/quizzes')}
                className="fb-button text-sm sm:text-base"
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
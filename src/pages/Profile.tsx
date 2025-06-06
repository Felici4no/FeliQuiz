import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LogOut, Settings, Edit3 } from 'lucide-react';
import { User } from '../types';
import { useUser } from '../context/UserContext';
import Badge from '../components/Badge';
import CoinBalance from '../components/CoinBalance';

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { getUserByUsername, currentUser, logout } = useUser();
  const [user, setUser] = useState<User | null>(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    if (username) {
      const profileUser = getUserByUsername(username);
      if (profileUser) {
        setUser(profileUser);
        setIsOwnProfile(currentUser?.id === profileUser.id);
      }
    }
  }, [username, getUserByUsername, currentUser]);

  const handleLogout = () => {
    logout();
    navigate('/');
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
                <CoinBalance balance={user.feliCoins} size="large" />
              </div>
              
              {isOwnProfile && (
                <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
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
                </div>
              )}
            </div>
            
            <div className="border-t border-fb-border pt-4 mt-4">
              <h2 className="font-semibold mb-3">Estatísticas</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-fb-gray rounded">
                  <div className="text-2xl font-bold text-fb-blue">{user.badges.length}</div>
                  <div className="text-sm text-gray-600">Badges Conquistadas</div>
                </div>
                <div className="p-3 bg-fb-gray rounded">
                  <div className="text-2xl font-bold text-fb-blue">0</div>
                  <div className="text-sm text-gray-600">Quizzes Criados</div>
                </div>
                <div className="p-3 bg-fb-gray rounded">
                  <div className="text-2xl font-bold text-fb-blue">0</div>
                  <div className="text-sm text-gray-600">Quizzes Feitos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="fb-card mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Coleção de Badges</h2>
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
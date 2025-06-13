import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Eye, 
  EyeOff, 
  Coins, 
  Star, 
  Save, 
  AlertCircle,
  CheckCircle,
  Smartphone,
  Shield,
  Bell,
  Palette
} from 'lucide-react';
import { useUser } from '../context/UserContext';

interface SettingsSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const [activeSection, setActiveSection] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form states
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    bio: ''
  });

  const [privacySettings, setPrivacySettings] = useState({
    showFeliCoins: true,
    showBadges: true,
    showQuizHistory: true,
    profileVisibility: 'public' as 'public' | 'friends' | 'private'
  });

  const [creatorRequest, setCreatorRequest] = useState({
    reason: '',
    experience: '',
    portfolio: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    quizReminders: true,
    newFeatures: true
  });

  const sections: SettingsSection[] = [
    {
      id: 'profile',
      title: 'Perfil',
      icon: <User size={20} />,
      description: 'Informações pessoais e dados da conta'
    },
    {
      id: 'privacy',
      title: 'Privacidade',
      icon: <Eye size={20} />,
      description: 'Controle o que outros podem ver'
    },
    {
      id: 'creator',
      title: 'Criador de Quizzes',
      icon: <Star size={20} />,
      description: 'Solicite acesso para criar quizzes'
    },
    {
      id: 'notifications',
      title: 'Notificações',
      icon: <Bell size={20} />,
      description: 'Gerencie suas notificações'
    },
    {
      id: 'appearance',
      title: 'Aparência',
      icon: <Palette size={20} />,
      description: 'Personalize a interface'
    }
  ];

  const handleSave = async (section: string) => {
    setIsLoading(true);
    setMessage(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', text: 'Configurações salvas com sucesso!' });
      
      // Auto-hide success message
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao salvar configurações. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Informações Pessoais</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="fb-input pl-10"
                placeholder="Seu nome completo"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="fb-input pl-10"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Celular <span className="text-gray-500">(opcional)</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="fb-input pl-10"
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio <span className="text-gray-500">(opcional)</span>
            </label>
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              className="fb-input h-20 resize-none"
              placeholder="Conte um pouco sobre você..."
              maxLength={150}
            />
            <p className="text-gray-500 text-sm mt-1">
              {profileData.bio.length}/150 caracteres
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => handleSave('profile')}
        disabled={isLoading}
        className="fb-button w-full sm:w-auto flex items-center justify-center"
      >
        <Save size={18} className="mr-2" />
        {isLoading ? 'Salvando...' : 'Salvar Alterações'}
      </button>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Visibilidade do Perfil</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Quem pode ver seu perfil?
            </label>
            <div className="space-y-2">
              {[
                { value: 'public', label: 'Público', desc: 'Qualquer pessoa pode ver seu perfil' },
                { value: 'friends', label: 'Amigos', desc: 'Apenas pessoas que você segue' },
                { value: 'private', label: 'Privado', desc: 'Apenas você pode ver' }
              ].map(option => (
                <label key={option.value} className="flex items-start space-x-3 p-3 border border-fb-border rounded hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="profileVisibility"
                    value={option.value}
                    checked={privacySettings.profileVisibility === option.value}
                    onChange={(e) => setPrivacySettings({ 
                      ...privacySettings, 
                      profileVisibility: e.target.value as 'public' | 'friends' | 'private'
                    })}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-fb-border pt-4">
            <h4 className="font-medium mb-3">Informações Visíveis</h4>
            <div className="space-y-3">
              {[
                { key: 'showFeliCoins', label: 'Mostrar FeliCoins', icon: <Coins size={16} /> },
                { key: 'showBadges', label: 'Mostrar Badges', icon: <Star size={16} /> },
                { key: 'showQuizHistory', label: 'Mostrar Histórico de Quizzes', icon: <User size={16} /> }
              ].map(setting => (
                <label key={setting.key} className="flex items-center justify-between p-3 border border-fb-border rounded">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600">{setting.icon}</span>
                    <span>{setting.label}</span>
                  </div>
                  <button
                    onClick={() => setPrivacySettings({
                      ...privacySettings,
                      [setting.key]: !privacySettings[setting.key as keyof typeof privacySettings]
                    })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      privacySettings[setting.key as keyof typeof privacySettings] ? 'bg-fb-blue' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        privacySettings[setting.key as keyof typeof privacySettings] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => handleSave('privacy')}
        disabled={isLoading}
        className="fb-button w-full sm:w-auto flex items-center justify-center"
      >
        <Save size={18} className="mr-2" />
        {isLoading ? 'Salvando...' : 'Salvar Configurações'}
      </button>
    </div>
  );

  const renderCreatorSection = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Torne-se um Criador de Quizzes</h3>
        <p className="text-blue-700 text-sm">
          Solicite acesso para criar seus próprios quizzes e compartilhar com a comunidade FeliQuiz.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Por que você quer criar quizzes? *
          </label>
          <textarea
            value={creatorRequest.reason}
            onChange={(e) => setCreatorRequest({ ...creatorRequest, reason: e.target.value })}
            className="fb-input h-24 resize-none"
            placeholder="Explique sua motivação e o que pretende criar..."
            maxLength={300}
          />
          <p className="text-gray-500 text-sm mt-1">
            {creatorRequest.reason.length}/300 caracteres
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experiência com criação de conteúdo
          </label>
          <textarea
            value={creatorRequest.experience}
            onChange={(e) => setCreatorRequest({ ...creatorRequest, experience: e.target.value })}
            className="fb-input h-20 resize-none"
            placeholder="Descreva sua experiência (opcional)..."
            maxLength={200}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Links ou portfólio <span className="text-gray-500">(opcional)</span>
          </label>
          <input
            type="url"
            value={creatorRequest.portfolio}
            onChange={(e) => setCreatorRequest({ ...creatorRequest, portfolio: e.target.value })}
            className="fb-input"
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">📋 Processo de Aprovação</h4>
        <ul className="text-yellow-700 text-sm space-y-1">
          <li>• Análise da solicitação em até 7 dias úteis</li>
          <li>• Verificação de qualidade e adequação</li>
          <li>• Notificação por email sobre o resultado</li>
          <li>• Acesso liberado após aprovação</li>
        </ul>
      </div>

      <button
        onClick={() => handleSave('creator')}
        disabled={isLoading || !creatorRequest.reason.trim()}
        className="fb-button w-full sm:w-auto flex items-center justify-center disabled:opacity-50"
      >
        <Star size={18} className="mr-2" />
        {isLoading ? 'Enviando...' : 'Enviar Solicitação'}
      </button>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Preferências de Notificação</h3>
        
        <div className="space-y-4">
          {[
            { 
              key: 'emailNotifications', 
              label: 'Notificações por Email', 
              desc: 'Receba atualizações importantes por email',
              icon: <Mail size={16} />
            },
            { 
              key: 'pushNotifications', 
              label: 'Notificações Push', 
              desc: 'Notificações no navegador e dispositivo móvel',
              icon: <Smartphone size={16} />
            },
            { 
              key: 'quizReminders', 
              label: 'Lembretes de Quiz', 
              desc: 'Lembrete para fazer novos quizzes',
              icon: <Bell size={16} />
            },
            { 
              key: 'newFeatures', 
              label: 'Novidades e Recursos', 
              desc: 'Seja o primeiro a saber sobre novos recursos',
              icon: <Star size={16} />
            }
          ].map(setting => (
            <label key={setting.key} className="flex items-start justify-between p-4 border border-fb-border rounded">
              <div className="flex items-start space-x-3">
                <span className="text-gray-600 mt-1">{setting.icon}</span>
                <div>
                  <div className="font-medium">{setting.label}</div>
                  <div className="text-sm text-gray-600">{setting.desc}</div>
                </div>
              </div>
              <button
                onClick={() => setNotificationSettings({
                  ...notificationSettings,
                  [setting.key]: !notificationSettings[setting.key as keyof typeof notificationSettings]
                })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notificationSettings[setting.key as keyof typeof notificationSettings] ? 'bg-fb-blue' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings[setting.key as keyof typeof notificationSettings] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={() => handleSave('notifications')}
        disabled={isLoading}
        className="fb-button w-full sm:w-auto flex items-center justify-center"
      >
        <Save size={18} className="mr-2" />
        {isLoading ? 'Salvando...' : 'Salvar Preferências'}
      </button>
    </div>
  );

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Personalização</h3>
        
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
          <Palette size={32} className="mx-auto text-gray-400 mb-2" />
          <p className="text-gray-600">Opções de aparência em breve!</p>
          <p className="text-sm text-gray-500 mt-1">
            Temas, cores e personalização da interface
          </p>
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile': return renderProfileSection();
      case 'privacy': return renderPrivacySection();
      case 'creator': return renderCreatorSection();
      case 'notifications': return renderNotificationsSection();
      case 'appearance': return renderAppearanceSection();
      default: return renderProfileSection();
    }
  };

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-fb-gray">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(`/profile/${currentUser.username}`)}
            className="flex items-center text-fb-blue hover:underline mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Voltar ao Perfil
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-fb-blue">Configurações</h1>
        </div>

        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg flex items-center ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle size={20} className="mr-2" />
            ) : (
              <AlertCircle size={20} className="mr-2" />
            )}
            {message.text}
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Mobile: Horizontal scroll, Desktop: Vertical */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="font-semibold mb-4 hidden lg:block">Seções</h2>
              
              {/* Mobile: Horizontal scroll */}
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center space-x-3 p-3 rounded transition whitespace-nowrap lg:whitespace-normal lg:w-full ${
                      activeSection === section.id
                        ? 'bg-fb-blue text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {section.icon}
                    <div className="text-left hidden sm:block">
                      <div className="font-medium text-sm">{section.title}</div>
                      <div className={`text-xs ${
                        activeSection === section.id ? 'text-white/80' : 'text-gray-500'
                      } hidden lg:block`}>
                        {section.description}
                      </div>
                    </div>
                    <span className="sm:hidden text-sm">{section.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderSectionContent()}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User } from '../types';
import { useUser } from '../context/UserContext';
import Badge from '../components/Badge';

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { getUserByUsername, currentUser } = useUser();
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

  if (!user) {
    return <div className="container mx-auto px-4 py-8">User not found</div>;
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
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
            <p className="text-gray-600 mb-4">@{user.username}</p>
            
            {isOwnProfile && (
              <button className="fb-button mb-4">
                Edit Profile
              </button>
            )}
            
            <div className="border-t border-fb-border pt-4 mt-4">
              <h2 className="font-semibold mb-3">Stats</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                <div className="p-2 bg-fb-gray rounded">
                  <div className="text-xl font-bold text-fb-blue">{user.badges.length}</div>
                  <div className="text-sm">Badges Earned</div>
                </div>
                <div className="p-2 bg-fb-gray rounded">
                  <div className="text-xl font-bold text-fb-blue">0</div>
                  <div className="text-sm">Quizzes Created</div>
                </div>
                <div className="p-2 bg-fb-gray rounded">
                  <div className="text-xl font-bold text-fb-blue">0</div>
                  <div className="text-sm">Quizzes Taken</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="fb-card mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Badges Collection</h2>
          {user.badges.length > 0 && (
            <span className="text-sm text-gray-600">{user.badges.length} earned</span>
          )}
        </div>
        
        {user.badges.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {user.badges.map(badge => (
              <Badge key={badge.id} badge={badge} />
            ))}
          </div>
        ) : (
          <div className="bg-fb-gray p-6 rounded text-center">
            <p className="text-lg mb-3">No badges yet!</p>
            <p className="text-gray-600 mb-4">Take quizzes to earn badges and build your collection.</p>
            <button className="fb-button">
              Browse Quizzes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
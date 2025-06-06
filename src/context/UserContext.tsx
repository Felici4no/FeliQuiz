import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  getUserByUsername: (username: string) => User | undefined;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getUserByUsername = (username: string): User | undefined => {
    return mockUsers.find(user => user.username === username);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would call your API
    const user = mockUsers.find(u => u.username === email || u.name.toLowerCase().includes(email.toLowerCase()));
    
    if (user && password.length >= 6) {
      setCurrentUser(user);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (name: string, username: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if username already exists
    const existingUser = mockUsers.find(u => u.username === username);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      username,
      name,
      profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      feliCoins: 500, // Starting bonus
      badges: []
    };
    
    mockUsers.push(newUser);
    setCurrentUser(newUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      setCurrentUser, 
      getUserByUsername,
      login,
      register,
      logout,
      isLoading
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
import React, { createContext, useContext, useState } from 'react';
import { Quiz, Trait, Result } from '../types';
import { mockQuizzes } from '../data/mockData';

interface QuizContextType {
  quizzes: Quiz[];
  getQuizById: (id: string) => Quiz | undefined;
  getQuizzesByTopic: (topic: string, subtopic?: string) => Quiz[];
  getQuizzesByCategory: (category: string) => Quiz[];
  calculateResult: (quiz: Quiz, traits: Trait[]) => Result;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quizzes] = useState<Quiz[]>(mockQuizzes);

  const getQuizById = (id: string): Quiz | undefined => {
    return quizzes.find(quiz => quiz.id === id);
  };

  const getQuizzesByTopic = (topic: string, subtopic?: string): Quiz[] => {
    return quizzes.filter(quiz => {
      if (subtopic) {
        return quiz.topic === topic && quiz.subtopic === subtopic;
      }
      return quiz.topic === topic;
    });
  };

  const getQuizzesByCategory = (category: string): Quiz[] => {
    return quizzes.filter(quiz => quiz.category === category);
  };

  const calculateResult = (quiz: Quiz, traits: Trait[]): Result => {
    // Simple algorithm to match traits with results
    const resultScores = quiz.results.map(result => {
      let score = 0;
      result.traits.forEach(resultTrait => {
        const userTrait = traits.find(t => t.name === resultTrait.name);
        if (userTrait) {
          // Calculate similarity between user trait and result trait
          score += Math.max(0, 5 - Math.abs(userTrait.value - resultTrait.value));
        }
      });
      return { result, score };
    });

    // Return the result with the highest score
    resultScores.sort((a, b) => b.score - a.score);
    return resultScores[0].result;
  };

  return (
    <QuizContext.Provider value={{ 
      quizzes, 
      getQuizById, 
      getQuizzesByTopic, 
      getQuizzesByCategory,
      calculateResult 
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
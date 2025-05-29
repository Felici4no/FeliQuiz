export interface User {
  id: string;
  username: string;
  name: string;
  profilePicture: string;
  badges: Badge[];
  feliCoins: number;
}

export interface Badge {
  id: string;
  title: string;
  image: string;
  quizId: string;
  dateEarned: string;
  coinValue: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  category: QuizCategory;
  topic: string;
  subtopic: string;
  questions: Question[];
  results: Result[];
  createdAt: string;
  takenCount: number;
  coinReward: number;
}

export type QuizCategory = 'entertainment' | 'thinking' | 'self-discovery' | 'expression' | 'competition';

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
}

export interface QuestionOption {
  id: string;
  text: string;
  traits: Trait[];
}

export interface Trait {
  name: string;
  value: number;
}

export interface Result {
  id: string;
  character: string;
  description: string;
  image: string;
  badgeImage: string;
  traits: Trait[];
  coinValue: number;
}

export interface Topic {
  id: string;
  name: string;
  subtopics: Subtopic[];
}

export interface Subtopic {
  id: string;
  name: string;
}
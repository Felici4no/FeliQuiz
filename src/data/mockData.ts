import { User, Quiz, Topic } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'lucasfeliciano',
    name: 'Lucas Feliciano',
    profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    feliCoins: 2500,
    badges: [
      {
        id: '1',
        title: 'Harry Potter Character',
        image: '/badges/harry-potter.png',
        quizId: '1',
        dateEarned: '2023-01-15',
        coinValue: 1000
      },
      {
        id: '2',
        title: 'Marvel Superhero',
        image: '/badges/marvel-hero.png',
        quizId: '2',
        dateEarned: '2023-02-10',
        coinValue: 1500
      }
    ]
  },
  {
    id: '2',
    username: 'johndoe',
    name: 'John Doe',
    profilePicture: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    feliCoins: 1000,
    badges: [
      {
        id: '3',
        title: 'Anime Character',
        image: '/badges/anime-character.png',
        quizId: '3',
        dateEarned: '2023-03-20',
        coinValue: 1000
      }
    ]
  }
];

export const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Which Harry Potter Character Are You?',
    description: 'Take this quiz to find out which Hogwarts student matches your personality!',
    coverImage: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'self-discovery',
    topic: 'Movies',
    subtopic: 'Fantasy',
    takenCount: 15243,
    createdAt: '2023-01-01',
    coinReward: 100,
    questions: [
      {
        id: 'q1',
        text: 'How do you approach challenges?',
        options: [
          {
            id: 'q1o1',
            text: 'Head-on with courage',
            traits: [{ name: 'bravery', value: 3 }, { name: 'impulsiveness', value: 2 }]
          },
          {
            id: 'q1o2',
            text: 'With careful planning and research',
            traits: [{ name: 'intelligence', value: 3 }, { name: 'caution', value: 2 }]
          },
          {
            id: 'q1o3',
            text: 'By working with others',
            traits: [{ name: 'loyalty', value: 3 }, { name: 'teamwork', value: 2 }]
          },
          {
            id: 'q1o4',
            text: 'By finding the most advantageous path',
            traits: [{ name: 'ambition', value: 3 }, { name: 'cunning', value: 2 }]
          }
        ]
      },
      {
        id: 'q2',
        text: 'What do you value most in friendship?',
        options: [
          {
            id: 'q2o1',
            text: 'Honesty and standing up for what\'s right',
            traits: [{ name: 'bravery', value: 2 }, { name: 'loyalty', value: 2 }]
          },
          {
            id: 'q2o2',
            text: 'Intellectual conversations and growth',
            traits: [{ name: 'intelligence', value: 2 }, { name: 'wisdom', value: 2 }]
          },
          {
            id: 'q2o3',
            text: 'Unwavering support and kindness',
            traits: [{ name: 'loyalty', value: 3 }, { name: 'kindness', value: 2 }]
          },
          {
            id: 'q2o4',
            text: 'Connections that help you achieve your goals',
            traits: [{ name: 'ambition', value: 2 }, { name: 'resourcefulness', value: 2 }]
          }
        ]
      }
    ],
    results: [
      {
        id: 'r1',
        character: 'Harry Potter',
        description: 'You\'re brave, loyal, and always stand up for what\'s right. Like Harry, you face challenges head-on and value your friends above all else.',
        image: 'https://images.pexels.com/photos/7978636/pexels-photo-7978636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        badgeImage: '/badges/harry-potter.png',
        traits: [{ name: 'bravery', value: 5 }, { name: 'loyalty', value: 4 }],
        coinValue: 1000
      },
      {
        id: 'r2',
        character: 'Hermione Granger',
        description: 'You\'re intelligent, methodical, and always prepared. Like Hermione, you value knowledge and careful planning.',
        image: 'https://images.pexels.com/photos/8108063/pexels-photo-8108063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        badgeImage: '/badges/hermione-granger.png',
        traits: [{ name: 'intelligence', value: 5 }, { name: 'caution', value: 3 }],
        coinValue: 1000
      }
    ]
  },
  {
    id: '2',
    title: 'Which Marvel Superhero Are You?',
    description: 'Discover which Marvel superhero matches your personality traits!',
    coverImage: 'https://images.pexels.com/photos/7236267/pexels-photo-7236267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'entertainment',
    topic: 'Movies',
    subtopic: 'Superheroes',
    takenCount: 12876,
    createdAt: '2023-02-01',
    coinReward: 150,
    questions: [
      {
        id: 'q1',
        text: 'How would you use your superpowers?',
        options: [
          {
            id: 'q1o1',
            text: 'To protect the innocent and fight for justice',
            traits: [{ name: 'responsibility', value: 3 }, { name: 'altruism', value: 2 }]
          },
          {
            id: 'q1o2',
            text: 'To advance science and knowledge',
            traits: [{ name: 'intelligence', value: 3 }, { name: 'curiosity', value: 2 }]
          },
          {
            id: 'q1o3',
            text: 'With humor and style, while still doing good',
            traits: [{ name: 'humor', value: 3 }, { name: 'adaptability', value: 2 }]
          },
          {
            id: 'q1o4',
            text: 'Carefully and strategically to maximize impact',
            traits: [{ name: 'strategy', value: 3 }, { name: 'discipline', value: 2 }]
          }
        ]
      }
    ],
    results: [
      {
        id: 'r1',
        character: 'Iron Man',
        description: 'You\'re brilliant, innovative, and have a touch of showmanship. Like Tony Stark, you rely on your intelligence and charm to navigate life\'s challenges.',
        image: 'https://images.pexels.com/photos/8107841/pexels-photo-8107841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        badgeImage: '/badges/iron-man.png',
        traits: [{ name: 'intelligence', value: 5 }, { name: 'confidence', value: 4 }],
        coinValue: 1500
      }
    ]
  }
];

export const mockTopics: Topic[] = [
  {
    id: '1',
    name: 'Movies',
    subtopics: [
      { id: '1-1', name: 'Fantasy' },
      { id: '1-2', name: 'Sci-Fi' },
      { id: '1-3', name: 'Superheroes' },
      { id: '1-4', name: 'Comedy' },
      { id: '1-5', name: 'Drama' }
    ]
  },
  {
    id: '2',
    name: 'TV Shows',
    subtopics: [
      { id: '2-1', name: 'Sitcoms' },
      { id: '2-2', name: 'Drama' },
      { id: '2-3', name: 'Fantasy' },
      { id: '2-4', name: 'Reality' }
    ]
  },
  {
    id: '3',
    name: 'Animation',
    subtopics: [
      { id: '3-1', name: 'Anime' },
      { id: '3-2', name: 'Cartoons' },
      { id: '3-3', name: 'Disney' },
      { id: '3-4', name: 'Pixar' }
    ]
  },
  {
    id: '4',
    name: 'Books',
    subtopics: [
      { id: '4-1', name: 'Fantasy' },
      { id: '4-2', name: 'Science Fiction' },
      { id: '4-3', name: 'Mystery' },
      { id: '4-4', name: 'Young Adult' }
    ]
  },
  {
    id: '5',
    name: 'Games',
    subtopics: [
      { id: '5-1', name: 'RPG' },
      { id: '5-2', name: 'FPS' },
      { id: '5-3', name: 'Strategy' },
      { id: '5-4', name: 'Adventure' }
    ]
  }
];
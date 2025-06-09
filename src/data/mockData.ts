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
    coverImage: 'https://i.imgur.com/JLNd6dn.png',
    category: 'self-discovery',
    topic: 'Movies',
    subtopic: 'Fantasy',
    takenCount: 789,
    createdAt: '2023-01-01',
    coinReward: 100,
   questions: [
    {
      id: 'q1',
      text: 'How do you approach challenges?',
      options: [
        {
          id: 'q1o1',
          text: 'Head-on with courage, even if it’s risky',
          traits: [{ name: 'bravery', value: 3 }, { name: 'impulsiveness', value: 2 }]
        },
        {
          id: 'q1o2',
          text: 'With careful planning and research',
          traits: [{ name: 'intelligence', value: 3 }, { name: 'caution', value: 2 }]
        },
        {
          id: 'q1o3',
          text: 'By rallying friends and working together',
          traits: [{ name: 'loyalty', value: 3 }, { name: 'teamwork', value: 2 }]
        },
        {
          id: 'q1o4',
          text: 'By finding the most advantageous path, even if clever deception is needed',
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
          text: 'Honesty and standing up for what’s right',
          traits: [{ name: 'bravery', value: 2 }, { name: 'loyalty', value: 2 }]
        },
        {
          id: 'q2o2',
          text: 'Intellectual conversations and mutual growth',
          traits: [{ name: 'intelligence', value: 2 }, { name: 'wisdom', value: 2 }]
        },
        {
          id: 'q2o3',
          text: 'Unwavering support and kindness in tough times',
          traits: [{ name: 'kindness', value: 3 }, { name: 'loyalty', value: 2 }]
        },
        {
          id: 'q2o4',
          text: 'Connections that help you achieve your personal goals',
          traits: [{ name: 'ambition', value: 2 }, { name: 'resourcefulness', value: 2 }]
        }
      ]
    },
    {
      id: 'q3',
      text: 'Which magical subject excites you the most?',
      options: [
        {
          id: 'q3o1',
          text: 'Defense Against the Dark Arts – I love action',
          traits: [{ name: 'courage', value: 3 }, { name: 'bravery', value: 2 }]
        },
        {
          id: 'q3o2',
          text: 'Potions – the precision and complexity fascinate me',
          traits: [{ name: 'intelligence', value: 3 }, { name: 'caution', value: 2 }]
        },
        {
          id: 'q3o3',
          text: 'Herbology – nurturing life gives me purpose',
          traits: [{ name: 'kindness', value: 2 }, { name: 'patience', value: 2 }]
        },
        {
          id: 'q3o4',
          text: 'History of Magic – understanding the past helps me plan ahead',
          traits: [{ name: 'wisdom', value: 3 }, { name: 'ambition', value: 1 }]
        }
      ]
    },
    {
      id: 'q4',
      text: 'How would you spend a free weekend at Hogwarts?',
      options: [
        {
          id: 'q4o1',
          text: 'Exploring secret passages and hidden rooms',
          traits: [{ name: 'curiosity', value: 3 }, { name: 'resourcefulness', value: 2 }]
        },
        {
          id: 'q4o2',
          text: 'Reading in the library and researching spells',
          traits: [{ name: 'intelligence', value: 2 }, { name: 'wisdom', value: 2 }]
        },
        {
          id: 'q4o3',
          text: 'Practicing Quidditch or dueling with friends',
          traits: [{ name: 'bravery', value: 2 }, { name: 'teamwork', value: 2 }]
        },
        {
          id: 'q4o4',
          text: 'Strategizing improvement for school clubs and societies',
          traits: [{ name: 'ambition', value: 2 }, { name: 'leadership', value: 2 }]
        }
      ]
    },
    {
      id: 'q5',
      text: 'If you discover an injustice, what do you do?',
      options: [
        {
          id: 'q5o1',
          text: 'Confront it immediately, even if it’s risky',
          traits: [{ name: 'courage', value: 3 }, { name: 'bravery', value: 2 }]
        },
        {
          id: 'q5o2',
          text: 'Gather evidence and plan a careful intervention',
          traits: [{ name: 'intelligence', value: 2 }, { name: 'caution', value: 2 }]
        },
        {
          id: 'q5o3',
          text: 'Mobilize friends to stand together against it',
          traits: [{ name: 'loyalty', value: 2 }, { name: 'teamwork', value: 2 }]
        },
        {
          id: 'q5o4',
          text: 'Use any means necessary to gain leverage over the perpetrators',
          traits: [{ name: 'cunning', value: 3 }, { name: 'ambition', value: 1 }]
        }
      ]
    },
    {
      id: 'q6',
      text: 'Which magical creature would you choose as a pet?',
      options: [
        {
          id: 'q6o1',
          text: 'Owl – loyal and wise companion',
          traits: [{ name: 'loyalty', value: 2 }, { name: 'wisdom', value: 2 }]
        },
        {
          id: 'q6o2',
          text: 'Cat – independent and clever',
          traits: [{ name: 'intelligence', value: 2 }, { name: 'curiosity', value: 2 }]
        },
        {
          id: 'q6o3',
          text: 'Toad – simple but steady friend',
          traits: [{ name: 'kindness', value: 2 }, { name: 'patience', value: 1 }]
        },
        {
          id: 'q6o4',
          text: 'Rat – resourceful and adaptable (even if people misunderstand)',
          traits: [{ name: 'resourcefulness', value: 3 }, { name: 'cunning', value: 1 }]
        }
      ]
    },
    {
      id: 'q7',
      text: 'How do you react when you’re scared?',
      options: [
        {
          id: 'q7o1',
          text: 'Face the fear head-on and push through',
          traits: [{ name: 'bravery', value: 3 }, { name: 'courage', value: 2 }]
        },
        {
          id: 'q7o2',
          text: 'Analyze why you’re afraid and create a plan',
          traits: [{ name: 'intelligence', value: 2 }, { name: 'caution', value: 2 }]
        },
        {
          id: 'q7o3',
          text: 'Seek comfort in friends and rely on them',
          traits: [{ name: 'loyalty', value: 2 }, { name: 'empathy', value: 2 }]
        },
        {
          id: 'q7o4',
          text: 'Stay hidden and wait for the right moment to act',
          traits: [{ name: 'resourcefulness', value: 2 }, { name: 'cunning', value: 2 }]
        }
      ]
    },
    {
      id: 'q8',
      text: 'What’s your leadership style?',
      options: [
        {
          id: 'q8o1',
          text: 'Lead by example, inspiring others with bold actions',
          traits: [{ name: 'bravery', value: 2 }, { name: 'leadership', value: 3 }]
        },
        {
          id: 'q8o2',
          text: 'Outline clear strategies and make data-driven decisions',
          traits: [{ name: 'intelligence', value: 2 }, { name: 'wisdom', value: 2 }]
        },
        {
          id: 'q8o3',
          text: 'Encourage collaboration and ensure everyone is heard',
          traits: [{ name: 'teamwork', value: 2 }, { name: 'loyalty', value: 2 }]
        },
        {
          id: 'q8o4',
          text: 'Use influence and negotiation to get what you want',
          traits: [{ name: 'cunning', value: 2 }, { name: 'ambition', value: 2 }]
        }
      ]
    },
    {
      id: 'q9',
      text: 'How do you feel about rules?',
      options: [
        {
          id: 'q9o1',
          text: 'They’re there for a reason; follow them to keep order',
          traits: [{ name: 'respect', value: 3 }, { name: 'caution', value: 2 }]
        },
        {
          id: 'q9o2',
          text: 'I understand their purpose but will bend them if needed',
          traits: [{ name: 'ambition', value: 2 }, { name: 'resourcefulness', value: 2 }]
        },
        {
          id: 'q9o3',
          text: 'I question them and stand up if they’re unjust',
          traits: [{ name: 'bravery', value: 2 }, { name: 'wisdom', value: 2 }]
        },
        {
          id: 'q9o4',
          text: 'I see them as guidelines—sometimes breaking them is part of growth',
          traits: [{ name: 'cunning', value: 2 }, { name: 'curiosity', value: 2 }]
        }
      ]
    },
    {
      id: 'q10',
      text: 'Which scenario intrigues you most?',
      options: [
        {
          id: 'q10o1',
          text: 'Solving a magical mystery hidden in ancient texts',
          traits: [{ name: 'curiosity', value: 2 }, { name: 'intelligence', value: 2 }]
        },
        {
          id: 'q10o2',
          text: 'Leading a rescue mission to save friends in danger',
          traits: [{ name: 'bravery', value: 3 }, { name: 'loyalty', value: 2 }]
        },
        {
          id: 'q10o3',
          text: 'Crafting a clever plan to outwit powerful enemies',
          traits: [{ name: 'cunning', value: 3 }, { name: 'ambition', value: 1 }]
        },
        {
          id: 'q10o4',
          text: 'Organizing a peaceful protest to champion a cause',
          traits: [{ name: 'wisdom', value: 2 }, { name: 'loyalty', value: 1 }, { name: 'kindness', value: 1 }]
        }
      ]
    }
  ],
  results: [
    {
      id: 'r1',
      character: 'Harry Potter',
      description: 'You’re brave, loyal, and always stand up for what’s right. Like Harry, you face danger head-on to protect those you care about and rely on your instincts.',
      image: 'https://i.imgur.com/qjH4eyS.jpeg',
      badgeImage: '/badges/harry-potter.png',
      traits: [{ name: 'bravery', value: 5 }, { name: 'loyalty', value: 4 }, { name: 'impulsiveness', value: 2 }],
      coinValue: 1000
    },
    {
      id: 'r2',
      character: 'Hermione Granger',
      description: 'You’re intelligent, methodical, and always prepared. Like Hermione, you love learning, plan ahead, and rely on logic to solve problems.',
      image: 'https://i.imgur.com/GCMIo8S.jpeg',
      badgeImage: '/badges/hermione-granger.png',
      traits: [{ name: 'intelligence', value: 5 }, { name: 'caution', value: 3 }, { name: 'curiosity', value: 2 }],
      coinValue: 1000
    },
    {
      id: 'r3',
      character: 'Ron Weasley',
      description: 'You’re loyal, good-hearted, and sometimes a bit skeptical. Like Ron, you value friendship above all, bring humor to the group, and stand by your friends even when you’re unsure.',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      badgeImage: '/badges/ron-weasley.png',
      traits: [{ name: 'loyalty', value: 4 }, { name: 'humor', value: 3 }, { name: 'courage', value: 2 }],
      coinValue: 800
    },
    {
      id: 'r4',
      character: 'Draco Malfoy',
      description: 'You’re ambitious, prideful, and resourceful. Like Draco, you can be cunning and determined to secure your status, even if it’s at odds with others.',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      badgeImage: '/badges/draco-malfoy.png',
      traits: [{ name: 'ambition', value: 5 }, { name: 'cunning', value: 4 }, { name: 'resourcefulness', value: 2 }],
      coinValue: 900
    },
    {
      id: 'r5',
      character: 'Luna Lovegood',
      description: 'You’re creative, open-minded, and quirky. Like Luna, you see the world differently, embrace uniqueness, and bring comfort and calm to those around you.',
      image: 'https://images.pexels.com/photos/2473225/pexels-photo-2473225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      badgeImage: '/badges/luna-lovegood.png',
      traits: [{ name: 'curiosity', value: 4 }, { name: 'kindness', value: 3 }, { name: 'creativity', value: 2 }],
      coinValue: 950
    },
    {
      id: 'r6',
      character: 'Neville Longbottom',
      description: 'You’re kind-hearted, brave in unexpected ways, and devoted. Like Neville, you grow stronger over time and stand up for what’s right even if you feel uncertain.',
      image: 'https://images.pexels.com/photos/4868317/pexels-photo-4868317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      badgeImage: '/badges/neville-longbottom.png',
      traits: [{ name: 'kindness', value: 4 }, { name: 'bravery', value: 3 }, { name: 'loyalty', value: 2 }],
      coinValue: 900
    },
    {
      id: 'r7',
      character: 'Ginny Weasley',
      description: 'You’re confident, bold, and compassionate. Like Ginny, you face challenges head-on, support your friends, and have a sharp sense of humor.',
      image: 'https://images.pexels.com/photos/3708307/pexels-photo-3708307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      badgeImage: '/badges/ginny-weasley.png',
      traits: [{ name: 'confidence', value: 4 }, { name: 'bravery', value: 2 }, { name: 'kindness', value: 2 }],
      coinValue: 950
    },
    {
      id: 'r8',
      character: 'Severus Snape',
      description: 'You’re complex, resourceful, and fiercely protective in your own way. Like Snape, you may appear stern and enigmatic, but you value loyalty and sacrifice when it matters most.',
      image: 'https://images.pexels.com/photos/3218803/pexels-photo-3218803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      badgeImage: '/badges/severus-snape.png',
      traits: [{ name: 'cunning', value: 4 }, { name: 'loyalty', value: 3 }, { name: 'resourcefulness', value: 3 }],
      coinValue: 1100
    },
    {
      id: 'r9',
      character: 'Albus Dumbledore',
      description: 'You’re wise, compassionate, and visionary. Like Dumbledore, you value knowledge, empathy, and guiding others with kindness and insight.',
      image: 'https://images.pexels.com/photos/7176292/pexels-photo-7176292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      badgeImage: '/badges/albus-dumbledore.png',
      traits: [{ name: 'wisdom', value: 5 }, { name: 'empathy', value: 3 }, { name: 'leadership', value: 2 }],
      coinValue: 1200
    },
    {
      id: 'r10',
      character: 'Minerva McGonagall',
      description: 'You’re strict but fair, intelligent, and fiercely protective of your students. Like Professor McGonagall, you uphold rules yet value courage and compassion in others.',
      image: 'https://images.pexels.com/photos/7988172/pexels-photo-7988172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      badgeImage: '/badges/minerva-mcgonagall.png',
      traits: [{ name: 'intelligence', value: 4 }, { name: 'courage', value: 2 }, { name: 'leadership', value: 3 }],
      coinValue: 1100
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
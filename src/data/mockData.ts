import { User, Quiz, Topic, QuizSubmission } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'lucasfeliciano',
    name: 'Lucas Feliciano',
    profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    feliCoins: 250,
    quizzesTaken: 3,
    quizzesCreated: 2,
    badges: [
      {
        id: '1',
        title: 'Harry Potter',
        image: 'https://i.imgur.com/X6C1X0Q.png',
        quizId: '1',
        dateEarned: '2023-01-15',
        coinValue: 100
      },
      {
        id: '2',
        title: 'Iron Man',
        image: '/badges/iron-man.png',
        quizId: '2',
        dateEarned: '2023-02-10',
        coinValue: 150
      }
    ]
  },
  {
    id: '2',
    username: 'johndoe',
    name: 'John Doe',
    profilePicture: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    feliCoins: 100,
    quizzesTaken: 1,
    quizzesCreated: 0,
    badges: [
      {
        id: '3',
        title: 'Hermione Granger',
        image: '/badges/hermione-granger.png',
        quizId: '1',
        dateEarned: '2023-03-20',
        coinValue: 100
      }
    ]
  }
];

export const mockQuizSubmissions: QuizSubmission[] = [
  {
    id: '1',
    userId: '1',
    quizId: '1',
    resultId: 'r1',
    submittedAt: '2023-01-15T10:30:00.000Z',
    earnedCoins: 50
  },
  {
    id: '2',
    userId: '1',
    quizId: '2',
    resultId: 'r1',
    submittedAt: '2023-02-10T14:20:00.000Z',
    earnedCoins: 75
  },
  {
    id: '3',
    userId: '2',
    quizId: '1',
    resultId: 'r2',
    submittedAt: '2023-03-20T16:45:00.000Z',
    earnedCoins: 50
  }
];

export const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Qual Personagem de Harry Potter é Você?',
    description: 'Responda a este quiz e descubra qual bruxo ou bruxa do mundo de Hogwarts mais se parece com você!',
    coverImage: 'https://i.imgur.com/JLNd6dn.png',
    category: 'self-discovery',
    topic: 'Movies',
    subtopic: 'Fantasy',
    takenCount: 789,
    createdAt: '2023-01-01',
    coinReward: 50,
    createdBy: 'lucasfeliciano',
    isPublished: true,
    questions: [
    {
      id: "q1",
      text: "Um desafio inesperado surge. Qual sua primeira reação?",
      options: [
        {
          id: "q1o1",
          text: "Enfrentá-lo de frente, a coragem é minha melhor ferramenta.",
          traits: [{ name: "bravery", value: 3 }, { name: "courage", value: 2 }]
        },
        {
          id: "q1o2",
          text: "Pesquisar sobre o assunto na biblioteca para entender todas as variáveis.",
          traits: [{ name: "intelligence", value: 3 }, { name: "caution", value: 2 }]
        },
        {
          id: "q1o3",
          text: "Garantir que meus amigos estejam seguros antes de fazer qualquer coisa.",
          traits: [{ name: "loyalty", value: 3 }, { name: "humor", value: 1 }]
        },
        {
          id: "q1o4",
          text: "Verificar como posso usar a situação para ganhar vantagem.",
          traits: [{ name: "ambition", value: 3 }, { name: "cunning", value: 2 }]
        }
      ]
    },
    {
      id: "q2",
      text: "O que você mais valoriza em um amigo?",
      options: [
        {
          id: "q2o1",
          text: "Lealdade inabalável, não importa o quão estranhas as coisas fiquem.",
          traits: [{ name: "loyalty", value: 3 }, { name: "teamwork", value: 2 }]
        },
        {
          id: "q2o2",
          text: "Uma mente aberta que vê a magia que os outros não veem.",
          traits: [{ name: "creativity", value: 3 }, { name: "curiosity", value: 2 }]
        },
        {
          id: "q2o3",
          text: "Alguém que me desafia a ser mais forte e confiante.",
          traits: [{ name: "confidence", value: 3 }, { name: "bravery", value: 1 }]
        },
        {
          id: "q2o4",
          text: "Conexões que me ajudam a alcançar meus objetivos e fortalecer minha posição.",
          traits: [{ name: "ambition", value: 2 }, { name: "resourcefulness", value: 2 }]
        }
      ]
    },
    {
      id: "q3",
      text: "Qual matéria mágica te atrai mais?",
      options: [
        {
          id: "q3o1",
          text: "Defesa Contra as Artes das Trevas – é preciso saber se proteger.",
          traits: [{ name: "courage", value: 2 }, { name: "bravery", value: 2 }]
        },
        {
          id: "q3o2",
          text: "Herbologia – cuidar de plantas, mesmo as perigosas, me ensina paciência.",
          traits: [{ name: "kindness", value: 3 }, { name: "patience", value: 2 }]
        },
        {
          id: "q3o3",
          text: "Feitiços – a precisão e a lógica por trás de cada movimento me fascinam.",
          traits: [{ name: "intelligence", value: 2 }, { name: "caution", value: 1 }]
        },
        {
          id: "q3o4",
          text: "Trato das Criaturas Mágicas – entender seres incompreendidos é um dom.",
          traits: [{ name: "creativity", value: 2 }, { name: "empathy", value: 2 }]
        }
      ]
    },
    {
      id: "q4",
      text: "Como você passa um fim de semana livre em Hogwarts?",
      options: [
        {
          id: "q4o1",
          text: "No Salão Comunal, fazendo piadas e relaxando com os amigos.",
          traits: [{ name: "humor", value: 3 }, { name: "loyalty", value: 2 }]
        },
        {
          id: "q4o2",
          text: "Praticando feitiços ou voando para aprimorar minhas habilidades.",
          traits: [{ name: "confidence", value: 2 }, { name: "bravery", value: 2 }]
        },
        {
          id: "q4o3",
          text: "Procurando ingredientes raros para poções ou estudando estratégias.",
          traits: [{ name: "resourcefulness", value: 2 }, { name: "cunning", value: 2 }]
        },
        {
          id: "q4o4",
          text: "Lendo sobre história ou mistérios antigos, buscando conhecimento profundo.",
          traits: [{ name: "wisdom", value: 3 }, { name: "curiosity", value: 1 }]
        }
      ]
    },
    {
      id: "q5",
      text: "Você descobre uma injustiça. O que você faz?",
      options: [
        {
          id: "q5o1",
          text: "Ajo imediatamente, mesmo que seja arriscado. Alguém precisa fazer algo!",
          traits: [{ name: "bravery", value: 3 }, { name: "impulsiveness", value: 2 }]
        },
        {
          id: "q5o2",
          text: "Reúno meus amigos mais próximos. Juntos, somos mais fortes.",
          traits: [{ name: "loyalty", value: 2 }, { name: "teamwork", value: 2 }]
        },
        {
          id: "q5o3",
          text: "Planto a semente da dúvida nos lugares certos, agindo pelas sombras.",
          traits: [{ name: "cunning", value: 3 }, { name: "resourcefulness", value: 1 }]
        },
        {
          id: "q5o4",
          text: "Apoio quem está na linha de frente, oferecendo ajuda e suporte moral.",
          traits: [{ name: "kindness", value: 2 }, { name: "empathy", value: 2 }]
        }
      ]
    },
    {
      id: "q6",
      text: "Qual criatura mágica você escolheria como animal de estimação?",
      options: [
        {
          id: "q6o1",
          text: "Coruja – uma companheira leal e sábia.",
          traits: [{ name: "loyalty", value: 2 }, { name: "wisdom", value: 1 }]
        },
        {
          id: "q6o2",
          text: "Sapo – um amigo simples e constante, que não pede muito em troca.",
          traits: [{ name: "kindness", value: 2 }, { name: "patience", value: 2 }]
        },
        {
          id: "q6o3",
          text: "Gato – independente, astuto e um ótimo observador.",
          traits: [{ name: "intelligence", value: 2 }, { name: "caution", value: 1 }]
        },
        {
          id: "q6o4",
          text: "Testrálio – uma criatura incompreendida que só alguns podem ver.",
          traits: [{ name: "creativity", value: 2 }, { name: "empathy", value: 2 }]
        }
      ]
    },
    {
      id: "q7",
      text: "Como você reage quando está com medo?",
      options: [
        {
          id: "q7o1",
          text: "O medo é só um obstáculo. Eu o enfrento e sigo em frente.",
          traits: [{ name: "courage", value: 3 }, { name: "confidence", value: 2 }]
        },
        {
          id: "q7o2",
          text: "Busco conforto nos meus amigos, a presença deles me acalma.",
          traits: [{ name: "loyalty", value: 2 }, { name: "empathy", value: 1 }]
        },
        {
          id: "q7o3",
          text: "Fico quieto e observo. O medo pode ser superado com um bom plano.",
          traits: [{ name: "caution", value: 2 }, { name: "resourcefulness", value: 2 }]
        },
        {
          id: "q7o4",
          text: "Lembro a mim mesmo que ser corajoso não é não ter medo, mas enfrentá-lo.",
          traits: [{ name: "bravery", value: 2 }, { name: "kindness", value: 1 }]
        }
      ]
    },
    {
      id: "q8",
      text: "Qual é o seu estilo de liderança?",
      options: [
        {
          id: "q8o1",
          text: "Lidero pelo exemplo, com ações ousadas que inspiram os outros.",
          traits: [{ name: "leadership", value: 3 }, { name: "bravery", value: 2 }]
        },
        {
          id: "q8o2",
          text: "Uso a lógica e a estratégia, garantindo que cada decisão seja bem pensada.",
          traits: [{ name: "intelligence", value: 3 }, { name: "leadership", value: 2 }]
        },
        {
          id: "q8o3",
          text: "Garanto que todos se sintam incluídos e valorizados, liderando com empatia.",
          traits: [{ name: "teamwork", value: 2 }, { name: "empathy", value: 3 }]
        },
        {
          id: "q8o4",
          text: "Prefiro influenciar dos bastidores, guiando os eventos sem precisar de destaque.",
          traits: [{ name: "cunning", value: 2 }, { name: "wisdom", value: 2 }]
        }
      ]
    },
    {
      id: "q9",
      text: "O que você pensa sobre as regras?",
      options: [
        {
          id: "q9o1",
          text: "São importantes para a ordem, mas a coisa certa a fazer às vezes as ignora.",
          traits: [{ name: "bravery", value: 2 }, { name: "impulsiveness", value: 1 }]
        },
        {
          id: "q9o2",
          text: "Elas devem ser questionadas, especialmente se parecerem injustas ou ilógicas.",
          traits: [{ name: "wisdom", value: 2 }, { name: "curiosity", value: 2 }]
        },
        {
          id: "q9o3",
          text: "São um guia, mas a flexibilidade é crucial para o sucesso.",
          traits: [{ name: "ambition", value: 2 }, { name: "resourcefulness", value: 2 }]
        },
        {
          id: "q9o4",
          text: "Elas existem para proteger a todos. Desrespeitá-las é um risco desnecessário.",
          traits: [{ name: "respect", value: 3 }, { name: "caution", value: 2 }]
        }
      ]
    },
    {
      id: "q10",
      text: "Qual cenário te intriga mais?",
      options: [
        {
          id: "q10o1",
          text: "Fazer um sacrifício difícil que ninguém entenderá, mas que salvará a todos.",
          traits: [{ name: "loyalty", value: 3 }, { name: "cunning", value: 2 }]
        },
        {
          id: "q10o2",
          text: "Liderar uma defesa contra uma força esmagadora, defendendo seus valores.",
          traits: [{ name: "leadership", value: 3 }, { name: "courage", value: 2 }]
        },
        {
          id: "q10o3",
          text: "Descobrir uma verdade oculta que muda a forma como todos veem o mundo.",
          traits: [{ name: "wisdom", value: 3 }, { name: "empathy", value: 2 }]
        },
        {
          id: "q10o4",
          text: "Executar um plano brilhante para superar um rival poderoso.",
          traits: [{ name: "intelligence", value: 2 }, { name: "ambition", value: 2 }]
        }
      ]
    }
    ],
    results: [
      {
        id: "r1",
        character: "Harry Potter",
        description: "Você é corajoso, leal e sempre defende o que é certo. Como Harry, você enfrenta o perigo de frente para proteger aqueles de quem gosta e confia em seus instintos.",
        image: "https://i.imgur.com/qjH4eyS.jpeg",
        badgeImage: "https://i.imgur.com/X6C1X0Q.png",
        traits: [{ name: "bravery", value: 5 }, { name: "loyalty", value: 4 }, { name: "impulsiveness", value: 2 }],
        coinValue: 100
      },
      {
        id: "r2",
        character: "Hermione Granger",
        description: "Você é inteligente, metódico e está sempre preparado. Como Hermione, você adora aprender, planeja com antecedência e confia na lógica para resolver problemas.",
        image: "https://i.imgur.com/GCMIo8S.jpeg",
        badgeImage: "/badges/hermione-granger.png",
        traits: [{ name: "intelligence", value: 5 }, { name: "caution", value: 3 }, { name: "resourcefulness", value: 2 }],
        coinValue: 100
      },
      {
        id: "r3",
        character: "Ron Weasley",
        description: "Você é leal, de bom coração e às vezes um pouco cético. Como Ron, você valoriza a amizade acima de tudo, traz humor ao grupo e apoia seus amigos mesmo quando está inseguro.",
        image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        badgeImage: "/badges/ron-weasley.png",
        traits: [{ name: "loyalty", value: 5 }, { name: "humor", value: 4 }, { name: "teamwork", value: 2 }],
        coinValue: 80
      },
      {
        id: "r4",
        character: "Draco Malfoy",
        description: "Você é ambicioso, orgulhoso e engenhoso. Como Draco, você pode ser astuto e determinado a garantir seu status, mesmo que isso entre em conflito com os outros.",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        badgeImage: "/badges/draco-malfoy.png",
        traits: [{ name: "ambition", value: 5 }, { name: "cunning", value: 4 }, { name: "resourcefulness", value: 2 }],
        coinValue: 90
      },
      {
        id: "r5",
        character: "Luna Lovegood",
        description: "Você é criativo, de mente aberta e peculiar. Como Luna, você vê o mundo de forma diferente, abraça a singularidade e traz conforto e calma para aqueles ao seu redor.",
        image: "https://images.pexels.com/photos/2473225/pexels-photo-2473225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        badgeImage: "/badges/luna-lovegood.png",
        traits: [{ name: "creativity", value: 5 }, { name: "curiosity", value: 3 }, { name: "empathy", value: 2 }],
        coinValue: 95
      },
      {
        id: "r6",
        character: "Neville Longbottom",
        description: "Você tem um bom coração, é corajoso de maneiras inesperadas e dedicado. Como Neville, você se fortalece com o tempo e defende o que é certo, mesmo que se sinta inseguro.",
        image: "https://images.pexels.com/photos/4868317/pexels-photo-4868317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        badgeImage: "/badges/neville-longbottom.png",
        traits: [{ name: "kindness", value: 5 }, { name: "patience", value: 3 }, { name: "bravery", value: 2 }],
        coinValue: 90
      },
      {
        id: "r7",
        character: "Ginny Weasley",
        description: "Você é confiante, ousado e compassivo. Como Ginny, você enfrenta desafios de frente, apoia seus amigos e tem um senso de humor afiado.",
        image: "https://images.pexels.com/photos/3708307/pexels-photo-3708307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        badgeImage: "/badges/ginny-weasley.png",
        traits: [{ name: "confidence", value: 5 }, { name: "bravery", value: 3 }, { name: "humor", value: 2 }],
        coinValue: 95
      },
      {
        id: "r8",
        character: "Severus Snape",
        description: "Você é complexo, engenhoso e ferozmente protetor à sua maneira. Como Snape, você pode parecer severo e enigmático, mas valoriza a lealdade e o sacrifício quando mais importa.",
        image: "https://images.pexels.com/photos/3218803/pexels-photo-3218803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        badgeImage: "/badges/severus-snape.png",
        traits: [{ name: "cunning", value: 5 }, { name: "loyalty", value: 3 }, { name: "resourcefulness", value: 3 }],
        coinValue: 110
      },
      {
        id: "r9",
        character: "Albus Dumbledore",
        description: "Você é sábio, compassivo e visionário. Como Dumbledore, você valoriza o conhecimento, a empatia e orienta os outros com bondade e discernimento.",
        image: "https://images.pexels.com/photos/7176292/pexels-photo-7176292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        badgeImage: "/badges/albus-dumbledore.png",
        traits: [{ name: "wisdom", value: 5 }, { name: "empathy", value: 4 }, { name: "leadership", value: 2 }],
        coinValue: 120
      },
      {
        id: "r10",
        character: "Minerva McGonagall",
        description: "Você é rigoroso, mas justo, inteligente e ferozmente protetor de seus alunos. Como a Professora McGonagall, você defende as regras, mas valoriza a coragem e a compaixão nos outros.",
        image: "https://images.pexels.com/photos/7988172/pexels-photo-7988172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        badgeImage: "/badges/minerva-mcgonagall.png",
        traits: [{ name: "leadership", value: 5 }, { name: "intelligence", value: 4 }, { name: "respect", value: 3 }],
        coinValue: 110
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
    coinReward: 75,
    createdBy: 'johndoe',
    isPublished: true,
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
        coinValue: 150
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
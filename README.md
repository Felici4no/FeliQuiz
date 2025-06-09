# FeliQuiz

**FeliQuiz** é uma plataforma de quizzes que vai além de perguntas: é um espaço de expressão e descoberta de identidade. Criado por Lucas Feliciano, o projeto reúne quizzes temáticos, classificação cognitiva, badges colecionáveis e perfil social público. Cada resultado é um emblema que revela traços únicos de quem faz o quiz.

## 🏗️ Arquitetura do Projeto

O projeto está organizado em três partes principais:

```
feliquiz/
├── src/                    # Frontend React + TypeScript
├── backend/               # Backend Node.js + Express
├── database/             # PostgreSQL schemas e migrations
└── README.md
```

### 🎨 Frontend (React + TypeScript)
- **Framework**: React 18 com TypeScript
- **Styling**: Tailwind CSS
- **Animações**: Framer Motion
- **Roteamento**: React Router DOM
- **Estado**: Context API
- **Ícones**: Lucide React

### ⚙️ Backend (Node.js + Express)
- **Runtime**: Node.js com Express.js
- **Autenticação**: JWT + bcryptjs
- **Banco**: PostgreSQL com connection pooling
- **Segurança**: Helmet, CORS, Rate Limiting
- **Validação**: Express Validator

### 🗄️ Banco de Dados (PostgreSQL)
- **Estrutura**: Migrations e seeds organizados
- **Segurança**: Row Level Security (RLS)
- **Performance**: Índices otimizados
- **Backup**: Scripts automatizados

---

## 📜 Manifesto

> "Eu nunca achei que quizzes fossem só brincadeira. Sempre vi neles algo mais profundo: uma chance de se enxergar. De rir. De refletir. De se expressar sem precisar se explicar.
>
> Foi por isso que criei o **FeliQuiz**.
>
> Um lugar onde as perguntas têm personalidade. E os resultados contam histórias, a sua.
>
> Aqui, você não acumula pontos. Você acumula **emblemas**: pequenos retratos de quem você é, ou poderia ser. Cada quiz é um espelho. Cada resultado, um traço seu.
>
> Você pode sair como um herói da Marvel. Ou como alguém que ainda está tentando entender onde se encaixa. E tá tudo bem.
>
> Porque este projeto é mais do que códigos e telas. É um convite à curiosidade. À leveza. À descoberta.
>
> Seja bem-vindo(a) ao FeliQuiz. Feito por mim, com cuidado, pra você se divertir sendo quem é.
>
> **— Lucas Feliciano**

---

## 🎯 Visão e Diferenciais

* **Identidade social:** resultados salvos como badges (emblemas) no perfil público.
* **Classificação cognitiva:** quizzes categorizados por esforço mental ("Para se divertir", "Para refletir", "Para se conhecer", etc.).
* **Badges dinâmicas:** tipos de badges (resultado de quiz, raridade, conquistas, temáticas sazonais).
* **Traços de personalidade:** engine de pontuação por traits ocultos para muitos resultados possíveis.
* **Estatísticas sociais:** porcentagem de usuários por resultado, ranking de raridade e popularidade.
* **Gamificação leve:** missões semanais, badges limitadas, desafios.
* **Criação colaborativa:** interface para usuários criarem e publicarem quizzes.

---

## ⚙️ Estrutura Conceitual

1. **Tipos de Quiz**

   * **Temática:** Marvel, Política, Cultura Pop, etc.
   * **Esforço mental:** "Para se divertir", "Para refletir", "Para se conhecer".
   * **Duração:** curta, média, longa.
   * **Dificuldade:** leve, média, profunda.

2. **Badges e Perfis**

   * Emblemas públicos, sem comentários, com trio de destaque.
   * Raridade automática: Comum, Incomum, Raro, Lendário.
   * Radar de traços no perfil.

3. **Engine de Traits**

   * Perguntas associadas a traits (ex: humor, lógica, empatia).
   * Resultado calculado pelo trait dominante.

4. **Criação de Quizzes**

   * Form builder com perguntas, opções e weight de traits.
   * Modo fácil vs avançado (pontuação por trait e IA assistente).

5. **Estatísticas**

   * Dashboard de popularidade e raridade.
   * Exploração social: perfis semelhantes, quizzes em alta.

---

## 🚀 Setup Completo

### 1. Frontend (React)

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

### 2. Backend (Node.js)

```bash
# Navegar para o backend
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações

# Rodar em desenvolvimento
npm run dev

# Rodar em produção
npm start
```

### 3. Banco de Dados (PostgreSQL)

```bash
# Instalar PostgreSQL
sudo apt install postgresql postgresql-contrib

# Criar banco e usuário
sudo -u postgres psql
CREATE USER feliquiz_user WITH PASSWORD 'sua_senha';
CREATE DATABASE feliquiz_db OWNER feliquiz_user;
GRANT ALL PRIVILEGES ON DATABASE feliquiz_db TO feliquiz_user;

# Executar migrations
cd backend
npm run migrate

# Executar seeds
npm run seed
```

### 4. Executar Tudo

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd backend && npm run dev

# Terminal 3 - Banco (se necessário)
sudo service postgresql start
```

---

## 💰 Monetização

* **Quizzes Premium:** conteúdo exclusivo e badges lendárias (unitário ou assinatura).
* **Perfis Plus:** personalização visual, radar de traços comparativo, modo análise.
* **Ferramentas Avançadas para Criadores:** estatísticas detalhadas, layouts premium.
* **Badges Limitadas:** coleções sazonais pagas.
* **Patrocínios e Branded Quizzes:** quizzes de marcas e produtos.
* **Marketplace Futuro:** venda de pacotes e visuais de badges.

---

## 🛠️ Tecnologias & Stack

### Frontend
* **React** + **TypeScript** - Interface moderna e tipada
* **React Router** - Roteamento SPA
* **Tailwind CSS** - Styling utilitário
* **Framer Motion** - Animações fluidas
* **Lucide React** - Ícones consistentes

### Backend
* **Node.js** + **Express** - API RESTful
* **PostgreSQL** - Banco relacional robusto
* **JWT** - Autenticação stateless
* **bcryptjs** - Hash seguro de senhas
* **Helmet** + **CORS** - Segurança

### DevOps & Deploy
* **Vite** - Build tool rápido
* **Vercel** - Deploy do frontend
* **Railway/Render** - Deploy do backend
* **Supabase/Neon** - Banco em produção

---

## 📊 Status do Projeto

### ✅ Implementado
- [x] Interface completa do frontend
- [x] Sistema de autenticação
- [x] Quizzes funcionais com engine de traits
- [x] Sistema de badges
- [x] Perfis de usuário
- [x] Sistema de likes no manifesto
- [x] Backend API estruturado
- [x] Banco de dados modelado

### 🚧 Em Desenvolvimento
- [ ] Integração frontend ↔ backend
- [ ] Deploy em produção
- [ ] Sistema de criação de quizzes
- [ ] Dashboard administrativo

### 🔮 Futuro
- [ ] Sistema de pagamentos
- [ ] Marketplace de badges
- [ ] App mobile
- [ ] IA para criação de quizzes

---

## 🤝 Contribuição

Este é um projeto solo, mas contribuições são bem-vindas! Se tiver ideias de quizzes, badges ou melhorias:

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

MIT © Lucas Feliciano 2025

---

## 📞 Contato

- **Email**: lucas@feliquiz.com
- **GitHub**: [@lucasfeliciano](https://github.com/lucasfeliciano)
- **LinkedIn**: [Lucas Feliciano](https://linkedin.com/in/lucasfeliciano)

---

<div align="center">
  <p><strong>Feito com ❤️ por Lucas Feliciano</strong></p>
  <p><em>FeliQuiz - Onde cada quiz é um espelho da sua personalidade</em></p>
</div>
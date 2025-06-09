# FeliQuiz Database

Este diretório contém toda a estrutura e configuração do banco de dados PostgreSQL para o FeliQuiz.

## 📁 Estrutura

```
database/
├── config/
│   └── database.js          # Configuração de conexão
├── migrations/
│   ├── 001_create_users_table.sql
│   ├── 002_create_quizzes_table.sql
│   └── 003_create_badges_table.sql
├── seeds/
│   └── 001_seed_topics.sql
└── README.md
```

## 🚀 Setup do Banco de Dados

### 1. Instalar PostgreSQL

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS (com Homebrew)
brew install postgresql
brew services start postgresql

# Windows
# Baixe e instale do site oficial: https://www.postgresql.org/download/windows/
```

### 2. Criar Banco e Usuário

```sql
-- Conectar como superuser
sudo -u postgres psql

-- Criar usuário
CREATE USER feliquiz_user WITH PASSWORD 'sua_senha_aqui';

-- Criar banco de dados
CREATE DATABASE feliquiz_db OWNER feliquiz_user;

-- Dar permissões
GRANT ALL PRIVILEGES ON DATABASE feliquiz_db TO feliquiz_user;

-- Conectar ao banco
\c feliquiz_db

-- Dar permissões no schema public
GRANT ALL ON SCHEMA public TO feliquiz_user;
```

### 3. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` no backend e configure:

```bash
cp backend/.env.example backend/.env
```

Edite o arquivo `.env` com suas configurações:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=feliquiz_db
DB_USER=feliquiz_user
DB_PASSWORD=sua_senha_aqui
```

### 4. Executar Migrações

```bash
cd backend
npm install
npm run migrate
```

### 5. Executar Seeds (Dados Iniciais)

```bash
npm run seed
```

## 📊 Schema do Banco

### Tabelas Principais

- **users**: Dados dos usuários (perfil, autenticação)
- **quizzes**: Quizzes criados
- **questions**: Perguntas dos quizzes
- **question_options**: Opções de resposta
- **quiz_results**: Resultados possíveis dos quizzes
- **user_badges**: Badges conquistadas pelos usuários
- **quiz_submissions**: Submissões de quizzes
- **manifesto_likes**: Curtidas no manifesto
- **topics/subtopics**: Categorização de quizzes

### Relacionamentos

```
users (1) -----> (N) user_badges
users (1) -----> (N) quiz_submissions
users (1) -----> (N) manifesto_likes
users (1) -----> (N) quizzes (created_by)

quizzes (1) -----> (N) questions
questions (1) -----> (N) question_options
quizzes (1) -----> (N) quiz_results
quizzes (1) -----> (N) user_badges
quizzes (1) -----> (N) quiz_submissions

topics (1) -----> (N) subtopics
```

## 🔒 Segurança

- **Row Level Security (RLS)** habilitado em todas as tabelas
- **Políticas de acesso** configuradas para cada tabela
- **Índices** otimizados para consultas frequentes
- **Validação de dados** no nível da aplicação

## 🛠️ Comandos Úteis

```bash
# Conectar ao banco
psql -h localhost -U feliquiz_user -d feliquiz_db

# Backup do banco
pg_dump -h localhost -U feliquiz_user feliquiz_db > backup.sql

# Restaurar backup
psql -h localhost -U feliquiz_user feliquiz_db < backup.sql

# Ver tabelas
\dt

# Descrever tabela
\d nome_da_tabela

# Sair do psql
\q
```

## 📈 Monitoramento

Para produção, considere:

- **Connection pooling** (já configurado no código)
- **Monitoring** com ferramentas como pgAdmin ou DataDog
- **Backups automáticos**
- **Réplicas de leitura** para alta disponibilidade
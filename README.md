# FeliQuiz

**FeliQuiz** é uma plataforma de quizzes que vai além de perguntas: é um espaço de expressão e descoberta de identidade. Criado por Lucas Feliciano, o projeto reúne quizzes temáticos, classificação cognitiva, badges colecionáveis e perfil social público. Cada resultado é um emblema que revela traços únicos de quem faz o quiz.

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

## 💰 Monetização

* **Quizzes Premium:** conteúdo exclusivo e badges lendárias (unitário ou assinatura).
* **Perfis Plus:** personalização visual, radar de traços comparativo, modo análise.
* **Ferramentas Avançadas para Criadores:** estatísticas detalhadas, layouts premium.
* **Badges Limitadas:** coleções sazonais pagas.
* **Patrocínios e Branded Quizzes:** quizzes de marcas e produtos.
* **Marketplace Futuro:** venda de pacotes e visuais de badges.

---

## 🛠️ Tecnologias & Setup

* **Front-end:** React + TypeScript, React Router, Tailwind CSS, lucide-react
* **Back-end:** (futuro) Node.js, Express ou Django (Python)
* **Banco de Dados:** PostgreSQL / MongoDB
* **Hospedagem:** Vercel (front-end) / Render ou Heroku (back-end)

### Instalação local (front-end)

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/feliquiz.git
cd feliquiz

# Instale dependências
npm install

# Rode em modo dev
npm run dev
```

---

## 🚀 Contribuição

Este é um projeto solo, mas contribuições são bem-vindas! Se tiver ideias de quizzes, badges ou melhorias: fique à vontade para abrir issues ou pull requests.

---

## 📄 Licença

MIT © Lucas Feliciano 2025

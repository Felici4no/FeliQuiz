import React from 'react';

const Manifesto: React.FC = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="fb-card p-8 max-w-prose mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-facebook-blue">Nosso Manifesto</h1>

      <p className="mb-6 text-lg leading-relaxed">
        Porque não são só perguntas. é uma identidade.
      </p>

      <p className="mb-6 text-lg leading-relaxed whitespace-pre-line">
        Eu nunca achei que quizzes fossem só brincadeira.
        Sempre vi neles algo mais profundo: uma chance de se enxergar.
        De rir. De refletir. De se expressar sem precisar se explicar.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        Foi por isso que criei o FeliQuiz.
      </p>

      <p className="mb-6 text-lg leading-relaxed whitespace-pre-line">
        Um lugar onde as perguntas têm personalidade.
        E os resultados contam histórias, a sua.
      </p>

      <p className="mb-6 text-lg leading-relaxed whitespace-pre-line">
        Aqui, você não acumula pontos.
        Você acumula emblemas: pequenos retratos de quem você é, ou poderia ser.
        Cada quiz é um espelho. Cada resultado, um traço.
      </p>

      <p className="mb-6 text-lg leading-relaxed whitespace-pre-line">
        Você pode sair como um herói da Marvel.<br></br>
        Talvez como um bruxo da Sonserina com planos horriveis.<br></br>
        Ou como alguém que ainda está tentando entender onde se encaixa. E tá tudo bem.
      </p>

      <p className="mb-6 text-lg leading-relaxed whitespace-pre-line">
        Porque este projeto é mais do que códigos e telas.
        É um convite à curiosidade. À leveza. À descoberta.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        Seja bem-vindo(a) ao <strong className="text-facebook-blue">FeliQuiz</strong>.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        Feito por mim, com cuidado, pra você se divertir sendo quem é.
      </p>

      <div className="border-t border-fb-border mt-8 pt-6 text-center">
        <p className="text-base font-semibold">Lucas Feliciano</p>
        <p className="text-sm text-gray-400 italic">Criador do FeliQuiz</p>
      </div>
    </div>
  </div>
);

export default Manifesto;

import React, { useState } from 'react';

const QUIZ_QUESTIONS = [
  {
    question: "Shower glass",
    options: [
      { text: "See-through with light water spots", points: 1 },
      { text: "A bit cloudy", points: 2 },
      { text: "Visible crust or soap scum", points: 3 }
    ]
  },
  {
    question: "Grout & silicone",
    options: [
      { text: "Original colour", points: 1 },
      { text: "Darkening or a few spots", points: 2 },
      { text: "Widespread dark and mouldy", points: 3 }
    ]
  },
  {
    question: "Stovetop",
    options: [
      { text: "Wipes clean easily", points: 1 },
      { text: "Greasy film with the odd cooked-on spot", points: 2 },
      { text: "Hard black build-up", points: 3 }
    ]
  },
  {
    question: "Oven door",
    options: [
      { text: "Splatter marks", points: 1 },
      { text: "Brown film", points: 2 },
      { text: "Carbon crust / opaque", points: 3 }
    ]
  },
  {
    question: "Pet hair",
    options: [
      { text: "No pet hair", points: 1 },
      { text: "Light pet hair throughout", points: 2 },
      { text: "Build up on edges and furniture", points: 3 }
    ]
  },
  {
    question: "Walls & switches",
    options: [
      { text: "Mostly clean", points: 1 },
      { text: "Marks around the switches and handles", points: 2 },
      { text: "Widespread", points: 3 }
    ]
  }
];

export const ConditionQuiz = ({ onComplete }: { onComplete: (tier: 'Lived In' | 'Overdue' | 'Heavy Build Up') => void }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [resultTier, setResultTier] = useState('');

  const handleAnswer = (points: number) => {
    const newScore = score + points;
    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setScore(newScore);
      setCurrentQ(currentQ + 1);
    } else {
      let tier = 'Lived In';
      if (newScore >= 9 && newScore <= 13) tier = 'Overdue';
      if (newScore >= 14) tier = 'Heavy Build Up';
      
      setScore(newScore);
      setResultTier(tier);
      setQuizFinished(true);
      
      setTimeout(() => {
        onComplete(tier as any);
      }, 2000);
    }
  };

  const q = QUIZ_QUESTIONS[currentQ];

  if (quizFinished) {
    return (
      <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 shadow-sm text-center animate-in fade-in zoom-in duration-300">
        <h4 className="text-xl font-bold text-emerald-800 mb-2">Assessment Complete!</h4>
        <p className="text-sm font-medium text-emerald-700 mb-4">
          Based on your answers (Score: {score}), we recommend:
        </p>
        <div className="inline-block px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl shadow-md">
          {resultTier}
        </div>
        <p className="text-xs text-emerald-600 mt-4 opacity-70">Applying recommendation...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-200 shadow-sm animate-in fade-in duration-300 relative overflow-hidden">
      <div className="absolute top-0 left-0 h-1.5 bg-[#FB8C42] transition-all duration-300" style={{ width: `${((currentQ) / QUIZ_QUESTIONS.length) * 100}%` }} />
      
      <div className="flex justify-between items-center mb-5 text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">
        <span>Question {currentQ + 1} of {QUIZ_QUESTIONS.length}</span>
      </div>
      
      <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-5">{q.question}</h4>
      
      <div className="flex flex-col gap-3">
        {q.options.map((opt, i) => (
          <button 
            key={i}
            onClick={() => handleAnswer(opt.points)}
            className="text-left px-5 py-4 rounded-xl border-2 border-gray-100 bg-white hover:border-[#FB8C42] hover:shadow-md hover:-translate-y-0.5 transition-all font-medium text-gray-700 text-sm md:text-base group"
          >
            <span className="inline-block w-6 h-6 rounded-full bg-gray-50 border border-gray-200 text-center text-xs leading-5 mr-3 group-hover:bg-[#FB8C42] group-hover:text-white group-hover:border-[#FB8C42] transition-colors">{String.fromCharCode(65 + i)}</span>
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
};

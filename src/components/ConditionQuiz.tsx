import React, { useState } from 'react';

const QUIZ_QUESTIONS = [
  {
    question: "Q1. Last thorough clean — When did the home last get a top-to-bottom clean (professional or your own)",
    options: [
      { text: "Within the last month", points: 1 },
      { text: "1–6 months ago", points: 2 },
      { text: "6+ months — or honestly can't remember", points: 3 }
    ]
  },
  {
    question: "Q2. Run a finger over your shower glass — how does it feel?",
    options: [
      { text: "Clear glass — maybe a few water spots", points: 1 },
      { text: "Cloudy or filmy, but smooth to the touch", points: 2 },
      { text: "Rough or crusty — you can feel the build-up", points: 3 }
    ]
  },
  {
    question: "Q3. The grout and silicone in your shower:",
    options: [
      { text: "Close to original colour", points: 1 },
      { text: "A few dark spots, mostly along the silicone edges", points: 2 },
      { text: "Dark or black lines across most of the grout — you can see it from afar", points: 3 }
    ]
  },
  {
    question: "Q4. Toilet — Under the rim and at the waterline:",
    options: [
      { text: "Clean, or light marks", points: 1 },
      { text: "A visible ring or light scale", points: 2 },
      { text: "Staining or scale that brushing doesn't remove", points: 3 }
    ]
  },
  {
    question: "Q5. Your stovetop:",
    options: [
      { text: "Wipes clean with a damp cloth", points: 1 },
      { text: "Greasy film or cooked-on spots that need a proper scrub", points: 2 },
      { text: "Hard, burnt-on black build-up that a scrub won't shift", points: 3 }
    ]
  },
  {
    question: "Q6. Look under your rangehood — the filters:",
    options: [
      { text: "Look clean", points: 1 },
      { text: "Have a greasy film", points: 2 },
      { text: "Are dripping, saturated, or have never been cleaned that you know of", points: 3 }
    ]
  },
  {
    question: "Q7. How clear are the floors, benches and surfaces?",
    options: [
      { text: "Mostly clear", points: 1 },
      { text: "Some items to work around", points: 2 },
      { text: "Quite full — lots of items on floors and surfaces", points: 3 }
    ]
  },
  {
    question: "Q8. Do any of these apply: mould on walls or ceilings, bodily-fluid stains, pest issues, animal waste build-up, post-construction dust?",
    options: [
      { text: "None", points: 1 },
      { text: "One of these", points: 2 },
      { text: "More than one of these", points: 3 }
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
      if (newScore >= 13 && newScore <= 18) tier = 'Overdue';
      if (newScore >= 19) tier = 'Heavy Build Up';
      
      setScore(newScore);
      setResultTier(tier);
      setQuizFinished(true);
      
      setTimeout(() => {
        onComplete(tier as any);
      }, 4000);
    }
  };

  const q = QUIZ_QUESTIONS[currentQ];

  if (quizFinished) {
    return (
      <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 shadow-sm text-center animate-in fade-in zoom-in duration-300">
        <h4 className="text-xl font-bold text-emerald-800 mb-2">Assessment Complete!</h4>
        <p className="text-sm font-medium text-emerald-700 mb-4">
          Based on your answers, we recommend:
        </p>
        <div className="inline-block px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl shadow-md">
          {resultTier}
        </div>
        <p className="text-xs text-emerald-600 mt-4 opacity-70">Applying recommendation...</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300 h-full flex flex-col">
      <div className="absolute top-0 left-0 h-1.5 bg-[#FB8C42] transition-all duration-300" style={{ width: `${((currentQ) / QUIZ_QUESTIONS.length) * 100}%` }} />
      
      <div className="flex justify-between items-center mb-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
        <span>Question {currentQ + 1} of {QUIZ_QUESTIONS.length}</span>
      </div>
      
      <h4 className="text-sm md:text-base font-bold text-gray-900 mb-4">{q.question}</h4>
      
      <div className="flex flex-col gap-2">
        {q.options.map((opt, i) => (
          <button 
            key={i}
            onClick={() => handleAnswer(opt.points)}
            className="text-left px-3.5 py-3 rounded-xl border-2 border-gray-100 bg-white hover:border-[#FB8C42] hover:shadow-md hover:-translate-y-0.5 transition-all font-medium text-gray-700 text-xs md:text-sm group"
          >
            <span className="inline-block w-5 h-5 rounded-full bg-gray-50 border border-gray-200 text-center text-[10px] leading-[18px] mr-2.5 group-hover:bg-[#FB8C42] group-hover:text-white group-hover:border-[#FB8C42] transition-colors">{String.fromCharCode(65 + i)}</span>
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
};

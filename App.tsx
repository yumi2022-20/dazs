import React, { useState, useCallback } from 'react';
import { WORD_GROUPS } from './constants';
import { generateAIAnswer } from './services/geminiService';
import Background from './components/Background';
import Button from './components/Button';

const App: React.FC = () => {
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  // Generates a random answer from local combinatorial groups
  const generateLocalAnswer = useCallback((): string => {
    const { subjects, actions, objects, endings } = WORD_GROUPS;
    
    const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    
    // Concatenate for Chinese without spaces, adding a comma before the ending for rhythm
    return `${getRandom(subjects)}${getRandom(actions)}${getRandom(objects)}，${getRandom(endings)}`;
  }, []);

  const handleAsk = useCallback(async () => {
    // Reset state for new question
    setVisible(false);
    setLoading(true);
    setAnswer(null);

    // Artificial delay for "thinking" effect and better UX pace
    const minDelayPromise = new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Attempt to get AI answer first
      const aiPromise = generateAIAnswer();
      
      const [aiResult] = await Promise.all([aiPromise, minDelayPromise]);
      
      if (aiResult) {
        setAnswer(aiResult);
      } else {
        // Fallback to local combinatorial algorithm
        setAnswer(generateLocalAnswer());
      }
    } catch (e) {
      // Safety net
      setAnswer(generateLocalAnswer());
    } finally {
      setLoading(false);
      // Small timeout to allow render before fading in
      setTimeout(() => setVisible(true), 50);
    }
  }, [generateLocalAnswer]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 font-serif">
      <Background />

      <main className="relative z-10 w-full max-w-2xl flex flex-col items-center min-h-[400px] justify-center">
        
        {/* The Answer Display Area */}
        <div className="mb-16 min-h-[120px] flex items-center justify-center w-full px-4">
          {loading ? (
            <div className="flex flex-col items-center gap-4 animate-pulse">
              <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="text-indigo-300/50 text-sm tracking-widest uppercase">正在连接宇宙...</div>
            </div>
          ) : answer ? (
            <h1 
              className={`
                text-3xl md:text-5xl leading-tight text-indigo-50 font-medium tracking-wide drop-shadow-lg
                transition-all duration-1000 transform
                ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}
              `}
            >
              {answer}
            </h1>
          ) : (
            <div className="text-indigo-200/30 text-xl italic opacity-50 select-none">
              心中默念你的问题...
            </div>
          )}
        </div>

        {/* Interaction Area */}
        <div className="mt-8">
          <Button 
            onClick={handleAsk} 
            disabled={loading}
            label={loading ? "正在聆听..." : answer ? "再问一次" : "给我答案"} 
          />
        </div>
        
        {/* Subtle footer */}
        <div className="absolute bottom-[-100px] opacity-20 text-indigo-200 text-xs tracking-widest">
          答案之书
        </div>
      </main>
    </div>
  );
};

export default App;
import React, { useState } from 'react';
import { GAME_FACE_WORDS } from '../data/constants';

export default function RouletteView({ darkMode }) {
  const [rouletteWord, setRouletteWord] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  function spinPowerWordRoulette() {
    setIsSpinning(true);
    const allWords = GAME_FACE_WORDS.flat();
    let counter = 0;
    const interval = setInterval(() => {
      setRouletteWord(allWords[Math.floor(Math.random() * allWords.length)]);
      counter++;
      if (counter > 20) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 100);
  }

  return (
    <div className={`rounded-2xl p-6 backdrop-blur-md ${
      darkMode ? 'bg-white/10' : 'bg-white/70'
    } border ${darkMode ? 'border-white/20' : 'border-white/50'} text-center`}>
      <h2 className="text-2xl font-bold mb-2">Power Word Roulette</h2>
      <p className={`mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Spin to get your random power word for today's performance moments!
      </p>
      
      <div className="max-w-md mx-auto">
        <div className={`h-48 rounded-2xl mb-6 flex items-center justify-center text-6xl font-black ${
          darkMode ? 'bg-white/10' : 'bg-black/10'
        } ${isSpinning ? 'animate-pulse' : ''}`}>
          {rouletteWord ? (
            <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {rouletteWord}
            </div>
          ) : (
            <span className="text-3xl opacity-50">?</span>
          )}
        </div>
        
        <button
          onClick={spinPowerWordRoulette}
          disabled={isSpinning}
          className={`px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-all ${
            isSpinning ? 'opacity-50' : ''
          }`}
        >
          {isSpinning ? '🎰 Spinning...' : '🎲 Spin the Roulette!'}
        </button>
        
        {rouletteWord && !isSpinning && (
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20">
            <p className="font-semibold mb-2">Your Power Word Challenge:</p>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Embody "{rouletteWord}" in your next performance moment. 
              Be it, do it, act it - no matter what!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
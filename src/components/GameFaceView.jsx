import React, { useState } from 'react';
import { Eye, Lightbulb, Heart } from 'lucide-react';
import { GAME_FACE_WORDS } from '../data/constants';

export default function GameFaceView({ gameFaces, setState, darkMode, setView }) {
  const [newGameFaceName, setNewGameFaceName] = useState("");
  const [selectedWords, setSelectedWords] = useState([]);
  const [modelPerson, setModelPerson] = useState("");
  const [gameFaceSource, setGameFaceSource] = useState("memory");

  function createGameFace() {
    if (!newGameFaceName || selectedWords.length === 0) return;
    
    const gameFace = {
      id: crypto.randomUUID(),
      name: newGameFaceName,
      words: selectedWords,
      modelPerson: modelPerson,
      source: gameFaceSource,
      created: Date.now()
    };
    
    setState(s => ({ ...s, gameFaces: [...(s.gameFaces || []), gameFace] }));
    
    setNewGameFaceName("");
    setSelectedWords([]);
    setModelPerson("");
    setView("log");
  }

  return (
    <div className={`rounded-2xl p-6 backdrop-blur-md ${
      darkMode ? 'bg-white/10' : 'bg-white/70'
    } border ${darkMode ? 'border-white/20' : 'border-white/50'}`}>
      <h2 className="text-2xl font-bold mb-6">Create Your Game Face</h2>
      
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Game Face Name
            </label>
            <input
              type="text"
              placeholder="e.g., Meeting Warrior, Presentation Pro"
              className={`w-full mt-1 px-4 py-2 rounded-xl ${
                darkMode ? 'bg-white/10 text-white' : 'bg-black/10'
              }`}
              value={newGameFaceName}
              onChange={(e) => setNewGameFaceName(e.target.value)}
            />
          </div>

          <div>
            <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Source of Inspiration
            </label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {[
                { id: "memory", label: "Memory", icon: <Eye className="w-4 h-4" /> },
                { id: "imagination", label: "Imagination", icon: <Lightbulb className="w-4 h-4" /> },
                { id: "perception", label: "Perception", icon: <Heart className="w-4 h-4" /> }
              ].map(source => (
                <button
                  key={source.id}
                  onClick={() => setGameFaceSource(source.id)}
                  className={`px-3 py-2 rounded-xl flex items-center justify-center gap-2 ${
                    gameFaceSource === source.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : darkMode ? 'bg-white/10' : 'bg-black/10'
                  }`}
                >
                  {source.icon}
                  {source.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Model Person (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., Steve Jobs, Serena Williams, fictional character"
              className={`w-full mt-1 px-4 py-2 rounded-xl ${
                darkMode ? 'bg-white/10 text-white' : 'bg-black/10'
              }`}
              value={modelPerson}
              onChange={(e) => setModelPerson(e.target.value)}
            />
          </div>

          <div>
            <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Selected Words: {selectedWords.length > 0 ? selectedWords.join(" + ") : "Choose 2-3 words"}
            </label>
          </div>

          <button
            onClick={createGameFace}
            disabled={!newGameFaceName || selectedWords.length === 0}
            className={`w-full px-6 py-3 rounded-xl font-bold transition-all ${
              newGameFaceName && selectedWords.length > 0
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105'
                : darkMode ? 'bg-white/10 opacity-50' : 'bg-black/10 opacity-50'
            }`}
          >
            Create Game Face
          </button>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Choose Your Power Words (2-3)</h3>
          <div className="grid grid-cols-3 gap-3">
            {GAME_FACE_WORDS.flat().map(word => (
              <button
                key={word}
                onClick={() => {
                  if (selectedWords.includes(word)) {
                    setSelectedWords(selectedWords.filter(w => w !== word));
                  } else if (selectedWords.length < 3) {
                    setSelectedWords([...selectedWords, word]);
                  }
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedWords.includes(word)
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-105'
                    : darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'
                }`}
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      </div>

      {gameFaces.length > 0 && (
        <div className="mt-8">
          <h3 className="font-semibold mb-3">Your Game Faces</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {gameFaces.map(gf => (
              <div
                key={gf.id}
                className={`p-4 rounded-xl ${darkMode ? 'bg-white/10' : 'bg-black/10'}`}
              >
                <div className="font-bold">{gf.name}</div>
                <div className="text-sm mt-1">{gf.words.join(" + ")}</div>
                {gf.modelPerson && (
                  <div className="text-xs mt-1 opacity-70">Like {gf.modelPerson}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
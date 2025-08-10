import React from 'react';
import { Mic, Move } from 'lucide-react';
import { ANTS, CONTROLLER_TECHNIQUES } from '../data/constants';

export default function LogView({
  selectedAnt,
  setSelectedAnt,
  intensity,
  setIntensity,
  notes,
  setNotes,
  performanceContext,
  setPerformanceContext,
  usedControllers,
  toggleController,
  selectedGameFace,
  setSelectedGameFace,
  gameFaces,
  addEntry,
  darkMode
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className={`rounded-2xl p-6 backdrop-blur-md ${
        darkMode ? 'bg-white/10' : 'bg-white/70'
      } border ${darkMode ? 'border-white/20' : 'border-white/50'}`}>
        <h2 className="text-xl font-bold mb-4">Log Performance Moment</h2>
        
        <div className="space-y-4">
          <div>
            <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Performance Context
            </label>
            <input
              type="text"
              placeholder="e.g., Team meeting, difficult conversation, presentation..."
              className={`w-full mt-1 px-4 py-2 rounded-xl ${
                darkMode ? 'bg-white/10 text-white placeholder-gray-400' : 'bg-black/10'
              }`}
              value={performanceContext}
              onChange={(e) => setPerformanceContext(e.target.value)}
            />
          </div>

          <div>
            <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Which ANT showed up?
            </label>
            <div className="grid grid-cols-2 gap-2 mt-1 max-h-40 overflow-y-auto">
              {ANTS.map((ant, i) => (
                <button
                  key={ant.name}
                  onClick={() => setSelectedAnt(i)}
                  className={`p-2 rounded-xl text-xs transition-all ${
                    selectedAnt === i
                      ? `bg-gradient-to-r ${ant.color} text-white scale-105`
                      : darkMode ? 'bg-white/10' : 'bg-black/10'
                  }`}
                >
                  <span className="text-lg">{ant.emoji}</span>
                  <span className="ml-1">{ant.name.replace(' ANT', '')}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              ANT Volume/Intensity: {intensity}
            </label>
            <div className="flex items-center gap-2 mt-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  onClick={() => setIntensity(i)}
                  className={`flex-1 h-8 rounded-lg flex items-center justify-center font-bold transition-all ${
                    i <= intensity
                      ? i <= 2 ? 'bg-green-500' : i <= 4 ? 'bg-yellow-500' : 'bg-red-500'
                      : darkMode ? 'bg-white/20' : 'bg-black/20'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>Quiet</span>
              <span>LOUD</span>
            </div>
          </div>

          {gameFaces.length > 0 && (
            <div>
              <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Select Game Face
              </label>
              <select
                className={`w-full mt-1 px-4 py-2 rounded-xl ${
                  darkMode ? 'bg-white/10 text-white' : 'bg-black/10'
                }`}
                value={selectedGameFace || ""}
                onChange={(e) => setSelectedGameFace(e.target.value || null)}
              >
                <option value="">No Game Face</option>
                {gameFaces.map(gf => (
                  <option key={gf.id} value={gf.id}>
                    {gf.name} ({gf.words.join(" + ")})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Notes
            </label>
            <textarea
              placeholder="What happened? How did it go?"
              className={`w-full mt-1 px-4 py-2 rounded-xl ${
                darkMode ? 'bg-white/10 text-white placeholder-gray-400' : 'bg-black/10'
              }`}
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => addEntry(true)}
              className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105 transition-all"
            >
              ✅ Squashed It!
            </button>
            <button
              onClick={() => addEntry(false)}
              className={`px-6 py-3 rounded-xl font-bold ${
                darkMode ? 'bg-white/10' : 'bg-black/10'
              }`}
            >
              😔 ANT Won
            </button>
          </div>
        </div>
      </div>

      <div className={`rounded-2xl p-6 backdrop-blur-md ${
        darkMode ? 'bg-white/10' : 'bg-white/70'
      } border ${darkMode ? 'border-white/20' : 'border-white/50'}`}>
        <h2 className="text-xl font-bold mb-4">Controllers Used</h2>
        
        <div className="mb-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Mic className="w-4 h-4" /> Self-Talk Controller
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {CONTROLLER_TECHNIQUES.selfTalk.map(tech => (
              <button
                key={tech.name}
                onClick={() => toggleController('selfTalk', tech.name)}
                className={`p-3 rounded-xl text-sm transition-all ${
                  usedControllers.selfTalk.includes(tech.name)
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : darkMode ? 'bg-white/10' : 'bg-black/10'
                }`}
              >
                <div className="text-lg">{tech.icon}</div>
                <div className="font-medium">{tech.name}</div>
                <div className="text-xs opacity-70">{tech.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Move className="w-4 h-4" /> Body Controller
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {CONTROLLER_TECHNIQUES.body.map(tech => (
              <button
                key={tech.name}
                onClick={() => toggleController('body', tech.name)}
                className={`p-3 rounded-xl text-sm transition-all ${
                  usedControllers.body.includes(tech.name)
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : darkMode ? 'bg-white/10' : 'bg-black/10'
                }`}
              >
                <div className="text-lg">{tech.icon}</div>
                <div className="font-medium">{tech.name}</div>
                <div className="text-xs opacity-70">{tech.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
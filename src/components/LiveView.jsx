import React from 'react';
import { Copy } from 'lucide-react';
import { ANTS, CONTROLLER_TECHNIQUES, SPF_SCRIPTS, SPF_RULES } from '../data/constants';

export default function LiveView({
  selectedAnt,
  setSelectedAnt,
  intensity,
  setIntensity,
  notes,
  setNotes,
  usedControllers,
  toggleController,
  selectedGameFace,
  setSelectedGameFace,
  gameFaces,
  addEntry,
  todays,
  darkMode,
  copyScript,
  copiedScript,
  rouletteWord,
  spfRules
}) {
  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {/* Left Panel - Quick ANT Tracker */}
      <div className={`rounded-2xl p-4 backdrop-blur-md ${
        darkMode ? 'bg-white/10' : 'bg-white/70'
      } border ${darkMode ? 'border-white/20' : 'border-white/50'}`}>
        <h3 className="text-lg font-bold mb-3 text-center">ANT APPEARING?</h3>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          {ANTS.slice(0, 8).map((ant, i) => (
            <button
              key={ant.name}
              onClick={() => {
                setSelectedAnt(i);
                const btn = event.target;
                btn.classList.add('animate-pulse');
                setTimeout(() => btn.classList.remove('animate-pulse'), 1000);
              }}
              className={`p-2 rounded-lg text-xs transition-all ${
                selectedAnt === i
                  ? `bg-gradient-to-r ${ant.color} text-white`
                  : darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'
              }`}
            >
              <span className="text-lg">{ant.emoji}</span>
              <div className="text-xs">{ant.name.replace(' ANT', '').substring(0, 12)}</div>
            </button>
          ))}
        </div>

        <div className="mb-4">
          <div className="text-xs text-center mb-2 opacity-70">ANT VOLUME</div>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                onClick={() => setIntensity(i)}
                className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                  i <= intensity
                    ? i <= 2 ? 'bg-green-500' : i <= 4 ? 'bg-yellow-500' : 'bg-red-500'
                    : darkMode ? 'bg-white/20' : 'bg-black/20'
                }`}
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              addEntry(true);
              const btn = event.target;
              btn.textContent = '🎉 SQUASHED!';
              setTimeout(() => btn.textContent = '✅ Squashed!', 2000);
            }}
            className="px-4 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105 transition-all"
          >
            ✅ Squashed!
          </button>
          <button
            onClick={() => {
              addEntry(false);
            }}
            className={`px-4 py-3 rounded-xl font-bold ${
              darkMode ? 'bg-white/10' : 'bg-black/10'
            }`}
          >
            😔 ANT Won
          </button>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20">
          <div className="text-center">
            <div className="text-2xl font-bold">{todays.filter(e => e.attempted).length}/{todays.length}</div>
            <div className="text-xs opacity-70">Squashed Today</div>
          </div>
        </div>
      </div>

      {/* Center Panel - Controllers & Game Face */}
      <div className={`rounded-2xl p-4 backdrop-blur-md ${
        darkMode ? 'bg-white/10' : 'bg-white/70'
      } border ${darkMode ? 'border-white/20' : 'border-white/50'}`}>
        <h3 className="text-lg font-bold mb-3 text-center">CONTROLLERS</h3>
        
        {gameFaces.length > 0 && (
          <div className="mb-4">
            <select
              className={`w-full px-3 py-2 rounded-xl text-sm font-bold text-center ${
                selectedGameFace 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                  : darkMode ? 'bg-white/10' : 'bg-black/10'
              }`}
              value={selectedGameFace || ""}
              onChange={(e) => setSelectedGameFace(e.target.value || null)}
            >
              <option value="">SELECT GAME FACE</option>
              {gameFaces.map(gf => (
                <option key={gf.id} value={gf.id}>
                  {gf.name.toUpperCase()}
                </option>
              ))}
            </select>
            {selectedGameFace && (
              <div className="text-center mt-2 text-xl font-bold animate-pulse">
                {gameFaces.find(gf => gf.id === selectedGameFace)?.words.join(" + ")}
              </div>
            )}
          </div>
        )}

        <div className="space-y-3">
          <div>
            <div className="text-xs font-bold mb-2 text-center">SELF-TALK</div>
            <div className="grid grid-cols-2 gap-1">
              {CONTROLLER_TECHNIQUES.selfTalk.map(tech => (
                <button
                  key={tech.name}
                  onClick={() => toggleController('selfTalk', tech.name)}
                  className={`p-2 rounded-lg text-xs transition-all ${
                    usedControllers.selfTalk.includes(tech.name)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : darkMode ? 'bg-white/10' : 'bg-black/10'
                  }`}
                >
                  <div className="text-lg">{tech.icon}</div>
                  <div className="text-xs">{tech.name.substring(0, 8)}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-bold mb-2 text-center">BODY</div>
            <div className="grid grid-cols-3 gap-1">
              {CONTROLLER_TECHNIQUES.body.map(tech => (
                <button
                  key={tech.name}
                  onClick={() => toggleController('body', tech.name)}
                  className={`p-2 rounded-lg text-xs transition-all ${
                    usedControllers.body.includes(tech.name)
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      : darkMode ? 'bg-white/10' : 'bg-black/10'
                  }`}
                >
                  <div className="text-lg">{tech.icon}</div>
                  <div className="text-xs">{tech.name.substring(0, 8)}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {rouletteWord && (
          <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-center">
            <div className="text-xs opacity-70">TODAY'S POWER WORD</div>
            <div className="text-2xl font-bold">{rouletteWord}</div>
          </div>
        )}
      </div>

      {/* Right Panel - Quick Scripts */}
      <div className={`rounded-2xl p-4 backdrop-blur-md ${
        darkMode ? 'bg-white/10' : 'bg-white/70'
      } border ${darkMode ? 'border-white/20' : 'border-white/50'}`}>
        <h3 className="text-lg font-bold mb-3 text-center">INSTANT SCRIPTS</h3>
        
        <div className="space-y-2">
          {SPF_SCRIPTS.map(script => (
            <button
              key={script.id}
              onClick={() => {
                copyScript(script);
                const btn = event.target;
                btn.classList.add('scale-95');
                setTimeout(() => btn.classList.remove('scale-95'), 200);
              }}
              className={`w-full p-3 rounded-xl text-left transition-all ${
                copiedScript === script.id
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                  : darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-bold text-xs">{script.audience.toUpperCase()}</div>
                  <div className="text-xs opacity-80 mt-1">"{script.text.substring(0, 40)}..."</div>
                </div>
                <Copy className={`w-4 h-4 ${copiedScript === script.id ? 'text-white' : ''}`} />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20">
          <div className="text-xs font-bold mb-2 text-center">ACTIVE RULES</div>
          <div className="space-y-1">
            {SPF_RULES.filter(rule => spfRules[rule.id]).map(rule => (
              <div key={rule.id} className="text-xs flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>{rule.statement}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Quick note..."
            className={`w-full px-3 py-2 rounded-xl text-xs ${
              darkMode ? 'bg-white/10 text-white placeholder-gray-400' : 'bg-black/10'
            }`}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && notes.trim()) {
                addEntry(true);
                setNotes("");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
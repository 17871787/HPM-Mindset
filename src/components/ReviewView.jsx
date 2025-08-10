import React from 'react';
import { Sparkles } from 'lucide-react';
import { ANTS } from '../data/constants';

export default function ReviewView({ state, entries, gameFaces, darkMode }) {
  return (
    <div className="space-y-6">
      <div className={`rounded-2xl p-6 backdrop-blur-md ${
        darkMode ? 'bg-white/10' : 'bg-white/70'
      } border ${darkMode ? 'border-white/20' : 'border-white/50'}`}>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Recent Positives
        </h2>
        <div className="space-y-2">
          {Object.entries(state.dailyPositives || {})
            .sort((a, b) => b[0].localeCompare(a[0]))
            .slice(0, 7)
            .map(([date, positive]) => (
              <div key={date} className={`p-3 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-lg mr-2">✨</span>
                    <span>{positive}</span>
                  </div>
                  <span className="text-xs opacity-60">{date}</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className={`rounded-2xl p-6 backdrop-blur-md ${
          darkMode ? 'bg-white/10' : 'bg-white/70'
        } border ${darkMode ? 'border-white/20' : 'border-white/50'}`}>
          <h2 className="text-xl font-bold mb-4">Recent Performance Moments</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {entries.slice(0, 10).map(entry => {
              const ant = ANTS.find(a => a.name === entry.ant);
              const gf = gameFaces.find(g => g.id === entry.gameFace);
              return (
                <div
                  key={entry.id}
                  className={`p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-black/5'} ${
                    entry.attempted ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{ant?.emoji}</span>
                        <span className="font-semibold">
                          {entry.attempted ? 'ANT Squashed!' : 'ANT Won'}
                        </span>
                        <span className="text-xs opacity-60">
                          Volume: {entry.intensity}
                        </span>
                      </div>
                      {entry.performanceContext && (
                        <div className="text-sm mb-1">📍 {entry.performanceContext}</div>
                      )}
                      {gf && (
                        <div className="text-sm text-purple-400">
                          😤 {gf.name}: {gf.words.join(" + ")}
                        </div>
                      )}
                      {entry.usedControllers && (entry.usedControllers.selfTalk?.length > 0 || entry.usedControllers.body?.length > 0) && (
                        <div className="text-xs mt-1">
                          🎮 Controllers: {[...(entry.usedControllers.selfTalk || []), ...(entry.usedControllers.body || [])].join(", ")}
                        </div>
                      )}
                      {entry.notes && (
                        <div className="text-sm mt-1 opacity-70">{entry.notes}</div>
                      )}
                    </div>
                    <div className="text-xs opacity-60">
                      {new Date(entry.ts).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`rounded-2xl p-6 backdrop-blur-md ${
          darkMode ? 'bg-white/10' : 'bg-white/70'
        } border ${darkMode ? 'border-white/20' : 'border-white/50'}`}>
          <h2 className="text-xl font-bold mb-4">ANT Pattern Analysis</h2>
          <div className="space-y-3">
            {ANTS.map(ant => {
              const antEntries = entries.filter(e => e.ant === ant.name);
              const squashed = antEntries.filter(e => e.attempted).length;
              const total = antEntries.length;
              if (total === 0) return null;
              
              const winRate = (squashed / total * 100).toFixed(0);
              return (
                <div key={ant.name} className="flex items-center gap-3">
                  <span className="text-2xl">{ant.emoji}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{ant.name.replace(' ANT', '')}</span>
                      <span>{squashed}/{total} squashed ({winRate}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-black/20 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${ant.color}`}
                        style={{ width: `${winRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            }).filter(Boolean)}
          </div>
        </div>
      </div>
    </div>
  );
}
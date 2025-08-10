import React from 'react';
import { RISK_SCENARIOS } from '../data/constants';
import { todayISO } from '../utils/helpers';

export default function RisksView({ risksTaken, setState, darkMode }) {
  const todaysRisks = risksTaken.filter(r => r.date === todayISO());

  function logRiskTaken(scenarioId) {
    const risk = {
      id: crypto.randomUUID(),
      date: todayISO(),
      ts: Date.now(),
      scenarioId
    };
    setState(s => ({ ...s, risksTaken: [risk, ...(s.risksTaken || [])] }));
  }

  return (
    <div className={`rounded-2xl p-6 backdrop-blur-md ${
      darkMode ? 'bg-white/10' : 'bg-white/70'
    } border ${darkMode ? 'border-white/20' : 'border-white/50'}`}>
      <h2 className="text-2xl font-bold mb-2">Social Risk Taking</h2>
      <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Growth happens outside your comfort zone. Log the social risks you take today!
      </p>
      
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {RISK_SCENARIOS.map(scenario => {
          const taken = todaysRisks.some(r => r.scenarioId === scenario.id);
          return (
            <button
              key={scenario.id}
              onClick={() => !taken && logRiskTaken(scenario.id)}
              disabled={taken}
              className={`p-4 rounded-xl text-left transition-all ${
                taken 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white scale-105'
                  : darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{scenario.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold">{scenario.name}</div>
                  <div className="text-xs mt-1 opacity-70">
                    Risk Level: {"⚡".repeat(scenario.risk)}
                  </div>
                  <div className="text-xs mt-1">
                    {taken ? `✅ Done! +${scenario.xp} XP` : `+${scenario.xp} XP`}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div>
        <h3 className="font-semibold mb-3">Recent Social Risks Taken</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {risksTaken.slice(0, 10).map(risk => {
            const scenario = RISK_SCENARIOS.find(s => s.id === risk.scenarioId);
            if (!scenario) return null;
            return (
              <div
                key={risk.id}
                className={`p-3 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-black/5'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{scenario.icon}</span>
                    <span className="font-medium">{scenario.name}</span>
                    <span className="text-xs opacity-60">+{scenario.xp} XP</span>
                  </div>
                  <span className="text-xs opacity-60">
                    {new Date(risk.ts).toLocaleDateString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
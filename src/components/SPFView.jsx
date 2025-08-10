import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import { SPF_RULES, SPF_SCRIPTS, SPF_EXPOSURES, SPF_METRICS } from '../data/constants';
import { todayISO } from '../utils/helpers';

export default function SPFView({ state, setState, darkMode }) {
  const [selectedScript, setSelectedScript] = useState(null);
  const [copiedScript, setCopiedScript] = useState(null);
  const [worryText, setWorryText] = useState("");
  const [policyForm, setPolicyForm] = useState({
    willDo: "",
    wontDo: "",
    exitDate: "",
    noticeDate: ""
  });

  const todaysExposures = state.spfExposures[todayISO()] || [];
  const todaysMetrics = state.spfMetrics[todayISO()] || {};

  function toggleSPFRule(ruleId) {
    setState(s => ({
      ...s,
      spfRules: {
        ...s.spfRules,
        [ruleId]: !s.spfRules[ruleId]
      }
    }));
  }

  function copyScript(script) {
    navigator.clipboard.writeText(script.text);
    setCopiedScript(script.id);
    setTimeout(() => setCopiedScript(null), 2000);
  }

  function logSPFExposure(exposureId) {
    const today = todayISO();
    setState(s => ({
      ...s,
      spfExposures: {
        ...s.spfExposures,
        [today]: [...(s.spfExposures[today] || []), exposureId]
      }
    }));
  }

  function logSPFMetric(metricId, score) {
    const today = todayISO();
    setState(s => ({
      ...s,
      spfMetrics: {
        ...s.spfMetrics,
        [today]: {
          ...s.spfMetrics[today],
          [metricId]: { score, ts: Date.now() }
        }
      }
    }));
  }

  function saveWorry() {
    if (worryText.trim()) {
      setState(s => ({
        ...s,
        worryWindow: [...s.worryWindow, {
          text: worryText.trim(),
          date: todayISO(),
          ts: Date.now()
        }]
      }));
      setWorryText("");
    }
  }

  function generatePolicy() {
    const policy = {
      ...policyForm,
      scripts: [selectedScript],
      generated: Date.now()
    };
    setState(s => ({ ...s, spfPolicy: policy }));
  }

  return (
    <div className="space-y-6">
      <div className={`rounded-2xl p-6 backdrop-blur-md ${
        darkMode ? 'bg-white/10' : 'bg-white/70'
      } border ${darkMode ? 'border-white/20' : 'border-white/50'}`}>
        <h2 className="text-2xl font-bold mb-2">Social-Pressure Filter</h2>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Operate, don't explain. Stop compliance with imagined judgment.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className={`rounded-2xl p-6 backdrop-blur-md ${
          darkMode ? 'bg-white/10' : 'bg-white/70'
        } border ${darkMode ? 'border-white/20' : 'border-white/50'}`}>
          <h3 className="text-xl font-bold mb-4">Active Rules</h3>
          <div className="space-y-3 mb-6">
            {SPF_RULES.map(rule => (
              <div key={rule.id} className={`p-4 rounded-xl ${
                darkMode ? 'bg-white/5' : 'bg-black/5'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="font-semibold">{rule.statement}</div>
                    <div className="text-sm opacity-70">{rule.description}</div>
                  </div>
                  <button
                    onClick={() => toggleSPFRule(rule.id)}
                    className={`w-12 h-6 rounded-full transition-all ${
                      state.spfRules[rule.id]
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                        : darkMode ? 'bg-white/20' : 'bg-black/20'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      state.spfRules[rule.id] ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
                {state.spfRules[rule.id] && (
                  <div className="text-xs mt-2">
                    <span className="text-green-400">✓ Examples: </span>
                    {rule.examples.join(", ")}
                  </div>
                )}
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-3">Today's Exposures</h3>
          <div className="space-y-2">
            {SPF_EXPOSURES.map(exposure => {
              const completed = todaysExposures.includes(exposure.id);
              return (
                <button
                  key={exposure.id}
                  onClick={() => !completed && logSPFExposure(exposure.id)}
                  disabled={completed}
                  className={`w-full p-3 rounded-xl text-left transition-all ${
                    completed
                      ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-70'
                      : darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{exposure.description}</span>
                      <div className="text-xs opacity-60">
                        Difficulty: {"⚡".repeat(exposure.difficulty)}
                      </div>
                    </div>
                    {completed && <span className="text-green-500">✓</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className={`rounded-2xl p-6 backdrop-blur-md ${
            darkMode ? 'bg-white/10' : 'bg-white/70'
          } border ${darkMode ? 'border-white/20' : 'border-white/50'}`}>
            <h3 className="text-xl font-bold mb-4">Scripts (tap to copy)</h3>
            <div className="space-y-2">
              {SPF_SCRIPTS.map(script => (
                <button
                  key={script.id}
                  onClick={() => copyScript(script)}
                  className={`w-full p-3 rounded-xl text-left transition-all ${
                    copiedScript === script.id
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      : darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-sm">
                        {script.audience} - {script.trigger}
                      </div>
                      <div className="text-xs mt-1 opacity-80">"{script.text}"</div>
                    </div>
                    <span className="text-xs">
                      {copiedScript === script.id ? '✓ Copied!' : '📋'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className={`rounded-2xl p-6 backdrop-blur-md ${
            darkMode ? 'bg-white/10' : 'bg-white/70'
          } border ${darkMode ? 'border-white/20' : 'border-white/50'}`}>
            <h3 className="text-xl font-bold mb-4">Evening Check</h3>
            <div className="space-y-3">
              {SPF_METRICS.map(metric => {
                const todayScore = todaysMetrics[metric.id];
                return (
                  <div key={metric.id} className={`p-3 rounded-xl ${
                    darkMode ? 'bg-white/5' : 'bg-black/5'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-medium text-sm">{metric.name}</div>
                        <div className="text-xs opacity-60">{metric.description}</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => logSPFMetric(metric.id, 0)}
                          className={`px-3 py-1 rounded-lg text-sm ${
                            todayScore?.score === 0
                              ? 'bg-red-500 text-white'
                              : darkMode ? 'bg-white/10' : 'bg-black/10'
                          }`}
                        >
                          0
                        </button>
                        <button
                          onClick={() => logSPFMetric(metric.id, 1)}
                          className={`px-3 py-1 rounded-lg text-sm ${
                            todayScore?.score === 1
                              ? 'bg-green-500 text-white'
                              : darkMode ? 'bg-white/10' : 'bg-black/10'
                          }`}
                        >
                          1
                        </button>
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
            <h3 className="text-xl font-bold mb-4">Worry Window</h3>
            <p className="text-sm mb-3 opacity-70">15 min at 19:00 - Capture, then defer</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Log worry, then let it go..."
                className={`flex-1 px-4 py-2 rounded-xl ${
                  darkMode ? 'bg-white/10 text-white placeholder-gray-400' : 'bg-black/10'
                }`}
                value={worryText}
                onChange={(e) => setWorryText(e.target.value)}
              />
              <button
                onClick={saveWorry}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              >
                Log
              </button>
            </div>
            {state.worryWindow.length > 0 && (
              <div className="mt-3 text-xs opacity-60">
                {state.worryWindow.filter(w => w.date === todayISO()).length} worries logged today
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`rounded-2xl p-6 backdrop-blur-md ${
        darkMode ? 'bg-white/10' : 'bg-white/70'
      } border ${darkMode ? 'border-white/20' : 'border-white/50'}`}>
        <h3 className="text-xl font-bold mb-4">One-Page Policy</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium">I will do:</label>
            <textarea
              placeholder="Retain X accounts, deliver Y, complete Z..."
              className={`w-full mt-1 px-3 py-2 rounded-xl text-sm ${
                darkMode ? 'bg-white/10 text-white' : 'bg-black/10'
              }`}
              rows={3}
              value={policyForm.willDo}
              onChange={(e) => setPolicyForm({...policyForm, willDo: e.target.value})}
            />
          </div>
          <div>
            <label className="text-sm font-medium">I won't do:</label>
            <textarea
              placeholder="New accounts, strategy debates, undefined tasks..."
              className={`w-full mt-1 px-3 py-2 rounded-xl text-sm ${
                darkMode ? 'bg-white/10 text-white' : 'bg-black/10'
              }`}
              rows={3}
              value={policyForm.wontDo}
              onChange={(e) => setPolicyForm({...policyForm, wontDo: e.target.value})}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Exit date:</label>
            <input
              type="date"
              className={`w-full mt-1 px-3 py-2 rounded-xl text-sm ${
                darkMode ? 'bg-white/10 text-white' : 'bg-black/10'
              }`}
              value={policyForm.exitDate}
              onChange={(e) => setPolicyForm({...policyForm, exitDate: e.target.value})}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Notice date:</label>
            <input
              type="date"
              className={`w-full mt-1 px-3 py-2 rounded-xl text-sm ${
                darkMode ? 'bg-white/10 text-white' : 'bg-black/10'
              }`}
              value={policyForm.noticeDate}
              onChange={(e) => setPolicyForm({...policyForm, noticeDate: e.target.value})}
            />
          </div>
        </div>
        <button
          onClick={generatePolicy}
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium"
        >
          Generate Policy Document
        </button>
      </div>
    </div>
  );
}
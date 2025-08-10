import React, { useEffect, useMemo, useState } from "react";
import { ChevronUp, Trophy, Flame, Target, Star, Zap, Shield, Brain, TrendingUp, Calendar, Award, Gamepad2, Volume2, User, Mic, Move, Eye, Lightbulb, Heart, Sparkles, Dice1, Gift, Sunrise, Copy, Clock } from "lucide-react";

import { STORAGE_KEY, SPF_RULES, SPF_SCRIPTS, SPF_EXPOSURES, SPF_METRICS, ANTS, GAME_FACE_WORDS, CONTROLLER_TECHNIQUES, RISK_SCENARIOS, STREAK_REWARDS, RANKS } from './data/constants';
import { todayISO, calcXP, getRank, calcStreak } from './utils/helpers';
import { useLocalState } from './utils/hooks';

import StatCard from './components/StatCard';
import LiveView from './components/LiveView';
import LogView from './components/LogView';
import GameFaceView from './components/GameFaceView';
import RisksView from './components/RisksView';
import RouletteView from './components/RouletteView';
import SPFView from './components/SPFView';
import ReviewView from './components/ReviewView';

export default function App() {
  const [state, setState] = useLocalState();
  const [view, setView] = useState("log");
  const [selectedAnt, setSelectedAnt] = useState(0);
  const [intensity, setIntensity] = useState(3);
  const [notes, setNotes] = useState("");
  const [performanceContext, setPerformanceContext] = useState("");
  const [usedControllers, setUsedControllers] = useState({ selfTalk: [], body: [] });
  const [selectedGameFace, setSelectedGameFace] = useState(null);
  const [todaysPositive, setTodaysPositive] = useState(state.dailyPositives[todayISO()] || "");
  const [rouletteWord, setRouletteWord] = useState(null);
  const [showStreakReward, setShowStreakReward] = useState(null);
  const [copiedScript, setCopiedScript] = useState(null);
  
  const entries = state.entries || [];
  const gameFaces = state.gameFaces || [];
  const risksTaken = state.risksTaken || [];
  const darkMode = state.darkMode ?? true;
  const todays = entries.filter((e) => e.date === todayISO());
  const loginStreak = state.loginStreak || 0;
  const streakRewardsClaimed = state.streakRewardsClaimed || [];
  
  const xp = useMemo(() => calcXP(entries, risksTaken, streakRewardsClaimed), [entries, risksTaken, streakRewardsClaimed]);
  const { current: rank, next, toNext, progress } = useMemo(() => getRank(xp), [xp]);
  const performanceStreak = useMemo(() => calcStreak(entries), [entries]);

  // Get the correct icon component based on the rank name
  const getRankIcon = (rankName) => {
    const iconMap = {
      "Shield": Shield,
      "Target": Target,
      "Star": Star,
      "Trophy": Trophy,
      "Zap": Zap,
      "Brain": Brain
    };
    return iconMap[rankName] || Shield;
  };

  const RankIcon = getRankIcon(rank.icon);

  // Check and update login streak
  useEffect(() => {
    const today = todayISO();
    const lastLogin = state.lastLoginDate;
    
    if (lastLogin !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayISO = todayISO(yesterday);
      
      let newStreak = loginStreak;
      if (lastLogin === yesterdayISO) {
        newStreak = loginStreak + 1;
      } else if (lastLogin !== today) {
        newStreak = 1;
      }
      
      setState(s => ({
        ...s,
        lastLoginDate: today,
        loginStreak: newStreak
      }));
      
      // Check for unclaimed streak rewards
      const unclaimedReward = STREAK_REWARDS.find(
        r => r.days === newStreak && !streakRewardsClaimed.includes(r.days)
      );
      if (unclaimedReward) {
        setShowStreakReward(unclaimedReward);
      }
    }
  }, []);

  function claimStreakReward(reward) {
    setState(s => ({
      ...s,
      streakRewardsClaimed: [...s.streakRewardsClaimed, reward.days]
    }));
    setShowStreakReward(null);
  }

  function copyScript(script) {
    navigator.clipboard.writeText(script.text);
    setCopiedScript(script.id);
    setTimeout(() => setCopiedScript(null), 2000);
  }

  function toggleDarkMode() {
    setState(s => ({ ...s, darkMode: !s.darkMode }));
  }

  function saveDailyPositive() {
    if (todaysPositive.trim()) {
      setState(s => ({
        ...s,
        dailyPositives: {
          ...s.dailyPositives,
          [todayISO()]: todaysPositive.trim()
        }
      }));
    }
  }

  function toggleController(type, technique) {
    setUsedControllers(prev => ({
      ...prev,
      [type]: prev[type].includes(technique) 
        ? prev[type].filter(t => t !== technique)
        : [...prev[type], technique]
    }));
  }

  function addEntry(attempted) {
    const entry = {
      id: crypto.randomUUID(),
      date: todayISO(),
      ts: Date.now(),
      ant: ANTS[selectedAnt].name,
      intensity: Number(intensity),
      attempted: Boolean(attempted),
      notes: notes.trim(),
      performanceContext: performanceContext.trim(),
      usedControllers: usedControllers,
      gameFace: selectedGameFace,
      antSquashed: attempted && (usedControllers.selfTalk.length > 0 || usedControllers.body.length > 0)
    };
    setState((s) => ({ ...s, entries: [entry, ...(s.entries || [])] }));
    
    // Reset form
    setNotes("");
    setPerformanceContext("");
    setUsedControllers({ selfTalk: [], body: [] });
    setSelectedGameFace(null);
  }

  const performanceMindsetLevel = useMemo(() => {
    const recent = entries.slice(0, 10).filter(e => e.attempted);
    if (recent.length === 0) return 5;
    
    const avgIntensity = recent.reduce((acc, e) => acc + e.intensity, 0) / recent.length;
    const squashRate = recent.filter(e => e.antSquashed).length / recent.length;
    const gameFaceRate = recent.filter(e => e.gameFace).length / recent.length;
    
    let level = 5;
    if (squashRate > 0.7) level += 2;
    else if (squashRate > 0.4) level += 1;
    
    if (gameFaceRate > 0.5) level += 1;
    if (avgIntensity < 3) level += 1;
    
    return Math.min(10, Math.max(1, level));
  }, [entries]);

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode 
      ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white' 
      : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900'}`}>
      
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 ${darkMode ? 'bg-purple-500' : 'bg-purple-300'} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 ${darkMode ? 'bg-pink-500' : 'bg-pink-300'} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000`}></div>
      </div>

      <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                HPM TRACKER
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Elite Competitor Model • Squash ANTs • Deploy Game Face • Take Risks
              </p>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-xl backdrop-blur-md transition-all hover:scale-110 ${
                darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'
              }`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Daily Login Streak Banner */}
          <div className={`rounded-xl p-3 mb-4 backdrop-blur-md ${
            darkMode ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20' : 'bg-gradient-to-r from-orange-500/30 to-red-500/30'
          } border ${darkMode ? 'border-orange-500/30' : 'border-orange-500/40'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Flame className="w-6 h-6 text-orange-500" />
                <div>
                  <span className="font-bold text-lg">Daily Login Streak: {loginStreak} days</span>
                  {loginStreak > 0 && (
                    <span className="ml-2 text-sm opacity-70">
                      Next reward at {STREAK_REWARDS.find(r => r.days > loginStreak)?.days || 'max'} days
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                {STREAK_REWARDS.map(reward => (
                  <div
                    key={reward.days}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      loginStreak >= reward.days
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                        : darkMode ? 'bg-white/10' : 'bg-black/10'
                    }`}
                  >
                    {reward.days}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Daily Positive */}
          <div className={`rounded-xl p-4 mb-4 backdrop-blur-md ${
            darkMode ? 'bg-white/10' : 'bg-white/70'
          } border ${darkMode ? 'border-white/20' : 'border-white/50'}`}>
            <div className="flex items-center gap-3 mb-2">
              <Sunrise className="w-5 h-5 text-yellow-500" />
              <h3 className="font-semibold">Today's Positive Thing</h3>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="What's one positive thing about today?"
                className={`flex-1 px-4 py-2 rounded-xl ${
                  darkMode ? 'bg-white/10 text-white placeholder-gray-400' : 'bg-black/10'
                }`}
                value={todaysPositive}
                onChange={(e) => setTodaysPositive(e.target.value)}
              />
              <button
                onClick={saveDailyPositive}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:scale-105 transition-all"
              >
                Save ✨
              </button>
            </div>
            {state.dailyPositives[todayISO()] && (
              <div className="mt-2 text-sm opacity-70">
                ✅ "{state.dailyPositives[todayISO()]}"
              </div>
            )}
          </div>

          {/* Performance Mindset Scale */}
          <div className={`rounded-2xl p-6 mb-4 backdrop-blur-md ${
            darkMode ? 'bg-white/10' : 'bg-white/70'
          } border ${darkMode ? 'border-white/20' : 'border-white/50'}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Performance Mindset Level</h3>
              <span className="text-3xl font-bold">{performanceMindsetLevel}/10</span>
            </div>
            <div className="flex gap-1">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-8 rounded transition-all ${
                    i < performanceMindsetLevel
                      ? i < 4 ? 'bg-red-500' 
                        : i < 7 ? 'bg-yellow-500' 
                        : 'bg-green-500'
                      : darkMode ? 'bg-white/20' : 'bg-black/20'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs mt-2">
              <span className="text-red-400">Low Performance</span>
              <span className="text-yellow-400">Average Performance</span>
              <span className="text-green-400">High Performance</span>
            </div>
          </div>

          {/* Stats and Rank */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
            <StatCard
              icon={<Brain className="w-5 h-5" />}
              label="Total XP"
              value={xp}
              gradient="from-purple-500 to-pink-500"
              darkMode={darkMode}
            />
            <StatCard
              icon={<Flame className="w-5 h-5" />}
              label="Performance Streak"
              value={`${performanceStreak}d`}
              gradient="from-orange-500 to-red-500"
              darkMode={darkMode}
            />
            <StatCard
              icon={<Target className="w-5 h-5" />}
              label="ANTs Squashed"
              value={entries.filter(e => e.antSquashed).length}
              gradient="from-green-500 to-emerald-500"
              darkMode={darkMode}
            />
            <StatCard
              icon={<Zap className="w-5 h-5" />}
              label="Risks Taken"
              value={risksTaken.length}
              gradient="from-yellow-500 to-orange-500"
              darkMode={darkMode}
            />
            <StatCard
              icon={<Gamepad2 className="w-5 h-5" />}
              label="Game Faces"
              value={gameFaces.length}
              gradient="from-blue-500 to-cyan-500"
              darkMode={darkMode}
            />
          </div>

          {/* Rank Progress */}
          <div className={`rounded-2xl p-4 backdrop-blur-md ${
            darkMode ? 'bg-white/10' : 'bg-white/70'
          } border ${darkMode ? 'border-white/20' : 'border-white/50'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <RankIcon className="w-8 h-8" />
                <div>
                  <h3 className="text-xl font-bold">{rank.name} (Level {rank.level})</h3>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {next ? `${toNext} XP to ${next.name}` : 'Maximum rank achieved!'}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-2 rounded-full bg-black/20 overflow-hidden">
              <div
                className={`absolute inset-y-0 left-0 bg-gradient-to-r ${rank.color} transition-all duration-1000`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setView("live")}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              view === "live"
                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white animate-pulse'
                : darkMode ? 'bg-white/10' : 'bg-black/10'
            }`}
          >
            🔴 LIVE
          </button>
          <button
            onClick={() => setView("log")}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              view === "log"
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : darkMode ? 'bg-white/10' : 'bg-black/10'
            }`}
          >
            📝 Log Moment
          </button>
          <button
            onClick={() => setView("spf")}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              view === "spf"
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : darkMode ? 'bg-white/10' : 'bg-black/10'
            }`}
          >
            🛡️ SPF
          </button>
          <button
            onClick={() => setView("gameface")}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              view === "gameface"
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : darkMode ? 'bg-white/10' : 'bg-black/10'
            }`}
          >
            😤 Game Faces
          </button>
          <button
            onClick={() => setView("risks")}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              view === "risks"
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : darkMode ? 'bg-white/10' : 'bg-black/10'
            }`}
          >
            ⚡ Social Risks
          </button>
          <button
            onClick={() => setView("roulette")}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              view === "roulette"
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : darkMode ? 'bg-white/10' : 'bg-black/10'
            }`}
          >
            🎰 Power Roulette
          </button>
          <button
            onClick={() => setView("review")}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              view === "review"
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : darkMode ? 'bg-white/10' : 'bg-black/10'
            }`}
          >
            📊 Review
          </button>
        </div>

        {/* Main Content */}
        {view === "live" && (
          <LiveView
            selectedAnt={selectedAnt}
            setSelectedAnt={setSelectedAnt}
            intensity={intensity}
            setIntensity={setIntensity}
            notes={notes}
            setNotes={setNotes}
            usedControllers={usedControllers}
            toggleController={toggleController}
            selectedGameFace={selectedGameFace}
            setSelectedGameFace={setSelectedGameFace}
            gameFaces={gameFaces}
            addEntry={addEntry}
            todays={todays}
            darkMode={darkMode}
            copyScript={copyScript}
            copiedScript={copiedScript}
            rouletteWord={rouletteWord}
            spfRules={state.spfRules}
          />
        )}

        {view === "log" && (
          <LogView
            selectedAnt={selectedAnt}
            setSelectedAnt={setSelectedAnt}
            intensity={intensity}
            setIntensity={setIntensity}
            notes={notes}
            setNotes={setNotes}
            performanceContext={performanceContext}
            setPerformanceContext={setPerformanceContext}
            usedControllers={usedControllers}
            toggleController={toggleController}
            selectedGameFace={selectedGameFace}
            setSelectedGameFace={setSelectedGameFace}
            gameFaces={gameFaces}
            addEntry={addEntry}
            darkMode={darkMode}
          />
        )}

        {view === "gameface" && (
          <GameFaceView
            gameFaces={gameFaces}
            setState={setState}
            darkMode={darkMode}
            setView={setView}
          />
        )}

        {view === "risks" && (
          <RisksView
            risksTaken={risksTaken}
            setState={setState}
            darkMode={darkMode}
          />
        )}

        {view === "roulette" && (
          <RouletteView darkMode={darkMode} />
        )}

        {view === "spf" && (
          <SPFView
            state={state}
            setState={setState}
            darkMode={darkMode}
          />
        )}

        {view === "review" && (
          <ReviewView
            state={state}
            entries={entries}
            gameFaces={gameFaces}
            darkMode={darkMode}
          />
        )}
      </div>

      {/* Streak Reward Modal */}
      {showStreakReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className={`relative max-w-md w-full rounded-2xl p-8 text-center ${
            darkMode ? 'bg-gray-900' : 'bg-white'
          } shadow-2xl`}>
            <div className="text-6xl mb-4">{showStreakReward.icon}</div>
            <h2 className="text-3xl font-bold mb-2">Streak Reward!</h2>
            <p className="text-xl mb-2">{showStreakReward.title}</p>
            <p className="mb-6">{showStreakReward.days} Day Login Streak</p>
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              +{showStreakReward.bonus} XP
            </div>
            <button
              onClick={() => claimStreakReward(showStreakReward)}
              className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-all"
            >
              Claim Reward!
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
import { STORAGE_KEY, SPF_RULES, RISK_SCENARIOS, STREAK_REWARDS, RANKS } from '../data/constants';

export function todayISO(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { 
      entries: [], 
      darkMode: true, 
      gameFaces: [], 
      dailyPositives: {}, 
      risksTaken: [],
      spfRules: SPF_RULES.reduce((acc, rule) => ({...acc, [rule.id]: rule.default}), {}),
      spfExposures: {},
      spfMetrics: {},
      worryWindow: []
    };
    const parsed = JSON.parse(raw);
    return { 
      entries: parsed.entries || [], 
      darkMode: parsed.darkMode ?? true,
      gameFaces: parsed.gameFaces || [],
      dailyPositives: parsed.dailyPositives || {},
      risksTaken: parsed.risksTaken || [],
      lastLoginDate: parsed.lastLoginDate || null,
      loginStreak: parsed.loginStreak || 0,
      streakRewardsClaimed: parsed.streakRewardsClaimed || [],
      spfRules: parsed.spfRules || SPF_RULES.reduce((acc, rule) => ({...acc, [rule.id]: rule.default}), {}),
      spfExposures: parsed.spfExposures || {},
      spfMetrics: parsed.spfMetrics || {},
      spfPolicy: parsed.spfPolicy || null,
      worryWindow: parsed.worryWindow || []
    };
  } catch {
    return { 
      entries: [], 
      darkMode: true, 
      gameFaces: [], 
      dailyPositives: {}, 
      risksTaken: [],
      spfRules: SPF_RULES.reduce((acc, rule) => ({...acc, [rule.id]: rule.default}), {}),
      spfExposures: {},
      spfMetrics: {},
      worryWindow: []
    };
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function calcXP(entries, risksTaken = [], streakBonuses = []) {
  let xp = 0;
  entries.forEach(e => {
    if (e.attempted) {
      xp += 10;
      xp += (e.intensity || 0) * 3;
      if (e.usedControllers) xp += 5;
      if (e.gameFace) xp += 5;
    }
  });
  
  risksTaken.forEach(risk => {
    const scenario = RISK_SCENARIOS.find(s => s.id === risk.scenarioId);
    if (scenario) xp += scenario.xp;
  });
  
  streakBonuses.forEach(bonus => {
    const reward = STREAK_REWARDS.find(r => r.days === bonus);
    if (reward) xp += reward.bonus;
  });
  
  return xp;
}

export function getRank(xp) {
  let current = RANKS[0];
  for (const r of RANKS) if (xp >= r.xp) current = r;
  const currentIndex = RANKS.indexOf(current);
  const next = RANKS[currentIndex + 1];
  const toNext = next ? next.xp - xp : 0;
  const progress = next ? ((xp - current.xp) / (next.xp - current.xp)) * 100 : 100;
  return { current, next, toNext, progress };
}

export function calcStreak(entries) {
  if (!entries.length) return 0;
  const byDay = new Map();
  for (const e of entries) {
    if (!e.attempted) continue;
    byDay.set(e.date, true);
  }
  let streak = 0;
  let cursor = todayISO();
  while (byDay.get(cursor)) {
    streak += 1;
    const d = new Date(cursor + "T00:00:00");
    d.setDate(d.getDate() - 1);
    cursor = todayISO(d);
  }
  return streak;
}
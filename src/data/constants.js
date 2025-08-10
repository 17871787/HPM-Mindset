export const STORAGE_KEY = "hpm-tracker-v5";

export const SPF_RULES = [
  {
    id: "min_justify",
    statement: "Minimum-justification rule",
    description: "One-sentence reason, then act",
    examples: ["I'm at capacity", "That's outside scope", "Prioritizing existing commitments"],
    anti_patterns: ["Long explanations", "Multiple reasons", "Apologizing"],
    default: true
  },
  {
    id: "owner_date",
    statement: "Owner/Date rule",
    description: "No task without clear owner and deadline",
    examples: ["Who owns this and when is it due?", "I'll need owner and date first"],
    anti_patterns: ["Taking on vague requests", "Assuming ownership"],
    default: true
  },
  {
    id: "no_postmortem",
    statement: "No post-mortems",
    description: "Stop explaining past decisions",
    examples: ["Decision was made with available info", "Moving forward"],
    anti_patterns: ["Rehashing decisions", "Justifying past choices"],
    default: false
  },
  {
    id: "audience_shrink",
    statement: "Audience shrink",
    description: "Optimize for: Future-You, Family, Best Client only",
    examples: ["Would my best client care?", "Does this serve my family?"],
    anti_patterns: ["Trying to please everyone", "Imagined critics"],
    default: false
  }
];

export const SPF_SCRIPTS = [
  {
    id: "boss_boundary",
    audience: "Boss",
    trigger: "New request outside scope",
    text: "That's outside my remaining scope. If it's critical, what should drop?"
  },
  {
    id: "client_leaving",
    audience: "Client",
    trigger: "Announcing departure",
    text: "After three years I'm moving to a narrower, sustainable remit. Transition details below."
  },
  {
    id: "finance_wording",
    audience: "Finance",
    trigger: "Asked to send misleading language",
    text: "I won't send language I can't stand behind. If policy differs, confirm in writing."
  },
  {
    id: "meeting_decline",
    audience: "Team",
    trigger: "Non-essential meeting invite",
    text: "Declining - not required for my deliverables. Notes welcome if relevant."
  },
  {
    id: "scope_creep",
    audience: "Stakeholder",
    trigger: "Feature request during exit",
    text: "New features are post-handover. Current scope only through [DATE]."
  },
  {
    id: "status_facts",
    audience: "Leadership",
    trigger: "Status update request",
    text: "[METRIC]: [NUMBER]. On track for [DATE]. Blocker: [ITEM or 'None']."
  }
];

export const SPF_EXPOSURES = [
  {
    id: "no_softeners",
    difficulty: 1,
    description: "Say 'no' without softeners",
    examples: ["No", "Can't do that", "Not available"]
  },
  {
    id: "facts_only",
    difficulty: 2,
    description: "Ship a status with facts only and dates",
    examples: ["3 tasks complete. 2 remaining. Due Friday."]
  },
  {
    id: "undefended",
    difficulty: 3,
    description: "Leave a message un-defended for 24h",
    examples: ["Send decision, don't reply to pushback for a day"]
  },
  {
    id: "ask_owner",
    difficulty: 4,
    description: "Ask 'owner + date?' - if absent, decline",
    examples: ["Who owns this and when is it due?"]
  },
  {
    id: "publish_handover",
    difficulty: 5,
    description: "Publish one-page handover with risks/mitigations",
    examples: ["Clear documentation, no over-explaining"]
  }
];

export const SPF_METRICS = [
  {
    id: "one_sentence",
    name: "Used one-sentence rule",
    target: "Daily",
    description: "Gave brief explanation without elaborating"
  },
  {
    id: "declined_scope",
    name: "Declined off-scope ask",
    target: "When applicable",
    description: "Said no to request outside boundaries"
  },
  {
    id: "shipped_artifact",
    name: "Shipped without perfecting",
    target: "Daily",
    description: "Delivered work without overthinking"
  },
  {
    id: "no_justification",
    name: "Acted without justifying",
    target: "Daily",
    description: "Made decision without explaining to imagined critics"
  }
];

export const ANTS = [
  { name: "Sleep-Deprivation ANT", emoji: "😴", color: "from-purple-500 to-pink-500", category: "Energy" },
  { name: "Identity-Attack ANT", emoji: "🎭", color: "from-red-500 to-orange-500", category: "Identity" },
  { name: "Exposure ANT", emoji: "👁️", color: "from-blue-500 to-cyan-500", category: "Vulnerability" },
  { name: "Hostile Environment ANT", emoji: "⚡", color: "from-yellow-500 to-amber-500", category: "Environment" },
  { name: "They're Onto You ANT", emoji: "🕵️", color: "from-indigo-500 to-purple-500", category: "Paranoia" },
  { name: "Catastrophic Failure ANT", emoji: "💥", color: "from-red-600 to-pink-600", category: "Fear" },
  { name: "Territorial Exile ANT", emoji: "🏝️", color: "from-teal-500 to-green-500", category: "Belonging" },
  { name: "Self-Resentment ANT", emoji: "😤", color: "from-gray-600 to-gray-800", category: "Self" },
  { name: "Approval-Seeking ANT", emoji: "👍", color: "from-pink-500 to-rose-500", category: "Validation" },
  { name: "Approval-Vulnerability ANT", emoji: "💔", color: "from-purple-600 to-indigo-600", category: "Validation" },
  { name: "Let Everyone Down ANT", emoji: "😔", color: "from-blue-600 to-indigo-600", category: "Responsibility" },
  { name: "Outed ANT", emoji: "🎯", color: "from-orange-500 to-red-500", category: "Exposure" },
  { name: "Anxious ANT", emoji: "😰", color: "from-green-500 to-teal-500", category: "Anxiety" },
  { name: "Doubting ANT", emoji: "🤔", color: "from-indigo-500 to-blue-500", category: "Confidence" },
  { name: "Frustrated ANT", emoji: "😤", color: "from-red-500 to-pink-500", category: "Emotion" },
];

export const GAME_FACE_WORDS = [
  ["Curious", "Dominant", "Alert", "Lively", "Immersed", "Confident", "Strong", "Focused", "Belief", "Assertive", "Playful"],
  ["Upbeat", "Positive", "Ready", "Relaxed", "Interested", "Impact", "Tall", "Decisive", "Brave", "Cool", "Intense"],
  ["Bold", "Calm", "Decisive", "Committed", "Free", "Relentless", "Loud", "Big", "Energy", "Powerful", "Alive"]
];

export const CONTROLLER_TECHNIQUES = {
  selfTalk: [
    { name: "Instructionally", desc: "Give yourself clear directions", icon: "🎯" },
    { name: "Positively", desc: "Use affirming language", icon: "✨" },
    { name: "Motivationally", desc: "Push yourself forward", icon: "🚀" },
    { name: "Energetically", desc: "Pump yourself up", icon: "⚡" },
  ],
  body: [
    { name: "Posture", desc: "Stand tall and open", icon: "🏛️" },
    { name: "Movement/Actions", desc: "Move with purpose", icon: "🏃" },
    { name: "Gestures", desc: "Use confident hand movements", icon: "👐" },
    { name: "Communication", desc: "Speak clearly and strongly", icon: "💬" },
    { name: "Breathing", desc: "Deep, controlled breaths", icon: "🌊" },
    { name: "Scanning", desc: "Eye contact and awareness", icon: "👀" },
  ]
};

export const RISK_SCENARIOS = [
  { id: "meeting", name: "Led/Spoke in Meeting", risk: 3, xp: 20, icon: "🎤" },
  { id: "stranger", name: "Started Conversation with Stranger", risk: 4, xp: 25, icon: "👋" },
  { id: "presentation", name: "Gave Presentation", risk: 5, xp: 30, icon: "📊" },
  { id: "challenge", name: "Challenged Authority/Status Quo", risk: 5, xp: 30, icon: "⚔️" },
  { id: "vulnerable", name: "Shared Vulnerable Story", risk: 4, xp: 25, icon: "💭" },
  { id: "rejection", name: "Asked for Something (Risk Rejection)", risk: 3, xp: 20, icon: "🎯" },
  { id: "spotlight", name: "Put Myself in Spotlight", risk: 5, xp: 30, icon: "🌟" },
  { id: "disagreed", name: "Publicly Disagreed", risk: 4, xp: 25, icon: "🗣️" },
  { id: "initiated", name: "Initiated Group Activity", risk: 3, xp: 20, icon: "🚀" },
  { id: "performed", name: "Performed in Front of Others", risk: 5, xp: 35, icon: "🎭" },
];

export const STREAK_REWARDS = [
  { days: 3, bonus: 50, title: "Warming Up", icon: "🔥" },
  { days: 7, bonus: 100, title: "On Fire", icon: "🔥🔥" },
  { days: 14, bonus: 200, title: "Unstoppable", icon: "🔥🔥🔥" },
  { days: 30, bonus: 500, title: "HPM Legend", icon: "👑" },
  { days: 60, bonus: 1000, title: "Elite Mindset", icon: "💎" },
  { days: 100, bonus: 2000, title: "Mental Titan", icon: "⚡" },
];

export const RANKS = [
  { name: "Contender", xp: 0, level: 4, icon: "Shield", color: "from-gray-400 to-gray-600" },
  { name: "Operator", xp: 150, level: 5, icon: "Target", color: "from-blue-400 to-blue-600" },
  { name: "Commander", xp: 450, level: 6, icon: "Star", color: "from-purple-400 to-purple-600" },
  { name: "Field Marshal", xp: 900, level: 7, icon: "Trophy", color: "from-amber-400 to-amber-600" },
  { name: "Elite Competitor", xp: 1500, level: 8, icon: "Zap", color: "from-red-500 to-orange-500" },
  { name: "HPM Master", xp: 2500, level: 9, icon: "Brain", color: "from-purple-500 to-pink-500" },
];
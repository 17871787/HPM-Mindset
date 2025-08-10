# 🧠 HPM Mindset Tracker

> Elite Performance Mental Training System - Squash ANTs, Deploy Game Face, Level Up Your Mind

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/17871787/HPM-Mindset)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://hpm-tracker-m7tpgo1is-joe-towers-projects.vercel.app)

## 🎯 Overview

HPM (High Performance Mindset) Tracker is a gamified mental performance training application designed to help elite competitors manage their mental state, overcome automatic negative thoughts (ANTs), and develop peak performance habits.

Built on the Elite Competitor Model, this tool provides real-time mental state tracking, performance analytics, and practical interventions for maintaining a high-performance mindset under pressure.

## ✨ Key Features

### 🐜 ANT Management System
- **15 ANT Types**: Track and categorize automatic negative thoughts
- **Intensity Tracking**: Rate ANT volume from 1-5
- **Real-time Squashing**: Log victories over negative thoughts
- **Pattern Analysis**: Identify recurring mental obstacles

### 😤 Game Face Builder
- **Custom Performance States**: Create personalized mental states
- **Power Word Combinations**: Build from 33 performance words
- **Model Personas**: Channel peak performers
- **Instant Deployment**: Quick-select for performance moments

### ⚡ Social Risk Tracking
- **10 Risk Scenarios**: From meetings to public disagreements
- **XP Rewards**: Earn experience for pushing boundaries
- **Daily Challenges**: Build confidence through action
- **Progress Tracking**: Monitor comfort zone expansion

### 🛡️ SPF Module (Social-Pressure Filter)
- **Boundary Rules**: Minimum justification, owner/date requirements
- **Quick Scripts**: Pre-written responses for common situations
- **Exposure Therapy**: Graduated social pressure exercises
- **Worry Window**: Dedicated worry processing time

### 📊 Performance Analytics
- **XP & Ranking System**: 6 ranks from Contender to HPM Master
- **Streak Tracking**: Daily login and performance streaks
- **Performance Mindset Scale**: 1-10 current state indicator
- **ANT Win Rate**: Success metrics by ANT type

### 🌟 Daily Practices
- **Positive Logging**: Record daily wins
- **Power Word Roulette**: Random word challenges
- **Controller Techniques**: Self-talk and body interventions
- **Evening Review**: Reflect on performance patterns

## 🚀 Quick Start

### Live Demo
Visit the [live application](https://hpm-tracker-m7tpgo1is-joe-towers-projects.vercel.app) to start tracking immediately.

### Local Development

```bash
# Clone the repository
git clone https://github.com/17871787/HPM-Mindset.git
cd HPM-Mindset

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🏗️ Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React
- **State**: Local storage persistence
- **Deployment**: Vercel

## 📱 Usage Guide

### LIVE Mode
Real-time ANT tracking for in-the-moment interventions:
1. Select appearing ANT
2. Rate intensity (1-5)
3. Deploy controllers
4. Log outcome

### Game Face Creation
Build custom performance states:
1. Name your Game Face
2. Select 2-3 power words
3. Choose inspiration source
4. Save for quick deployment

### SPF Implementation
Manage social pressure:
1. Activate boundary rules
2. Copy scripts for situations
3. Log daily exposures
4. Track evening metrics

## 🎮 Gamification Elements

- **XP System**: Earn points for mental victories
- **Rank Progression**: Level up through consistent practice
- **Streak Rewards**: Bonus XP for daily consistency
- **Achievement Tracking**: Monitor squashed ANTs and risks taken

## 💾 Data Storage

All data is stored locally in your browser using localStorage. Your mental training data remains private and is never sent to external servers.

## 🧩 Component Architecture

```
src/
├── components/          # UI Components
│   ├── LiveView.jsx    # Real-time tracking
│   ├── LogView.jsx     # Detailed logging
│   ├── GameFaceView.jsx # Game Face builder
│   ├── RisksView.jsx   # Social risk tracker
│   ├── SPFView.jsx     # Social pressure filter
│   └── ReviewView.jsx  # Analytics dashboard
├── data/
│   └── constants.js    # ANTs, rules, scenarios
├── utils/
│   ├── helpers.js      # Utility functions
│   └── hooks.js        # React hooks
└── App.jsx            # Main application
```

## 🔧 Configuration

The app can be customized by modifying constants in `src/data/constants.js`:
- ANT types and categories
- Game Face power words
- Risk scenarios and XP values
- SPF rules and scripts
- Rank thresholds

## 🚢 Deployment

### Vercel (Recommended)
1. Fork this repository
2. Connect to Vercel
3. Deploy with zero configuration

### Manual Deployment
```bash
npm run build
# Deploy dist/ folder to any static hosting
```

## 🤝 Contributing

Contributions are welcome! Areas for enhancement:
- Additional ANT types
- New controller techniques
- Extended analytics
- Mobile app version
- Data export features

## 📈 Roadmap

- [ ] Cloud sync for cross-device access
- [ ] Team/coach sharing features
- [ ] Advanced analytics dashboard
- [ ] Mobile native apps
- [ ] Integration with wearables
- [ ] AI-powered insights

## 🙏 Acknowledgments

Built on principles from:
- Elite Competitor mental training models
- Cognitive behavioral therapy techniques
- Performance psychology research
- Gamification best practices

## 📝 License

MIT License - Feel free to adapt for your mental performance needs.

---

**Remember**: The mind is your most powerful tool. Train it like you train your body. 🧠💪

*Built with React + Vite + Tailwind CSS*
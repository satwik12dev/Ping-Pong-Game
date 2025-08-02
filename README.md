# 🏓 Ping Pong Game

A modern, responsive, and interactive **Ping Pong Game** built using **HTML5 Canvas**, **Vanilla JavaScript**, and **CSS3**. Battle a smart AI opponent in Easy, Medium, or Hard mode with fluid controls, stylish visuals, and seamless gameplay.

🌐 **Live Demo:** [https://ping-pong12.web.app](https://ping-pong12.web.app)

![Game Preview](Images/oveer.gif)

---

## 📁 Project Structure

```
├── index.html       # Main HTML file
├── style.css        # Game UI styles
├── script.js        # Core game logic
├── Images/          # Visual assets (screenshots, gif)
├── README.md        # This file
└── firebase.json    # Firebase hosting config (optional)
```

---

## 🎮 Features

- 🎯 Canvas-based game rendering with crisp visuals
- 🤖 AI opponent with 3 difficulty levels (Easy / Medium / Hard)
- 🕹️ Mouse and touch controls
- 🌑 Modern dark theme
- 🎉 Victory and Game Over screen with restart button
- 🔁 Smooth transitions and animations

---

## 🚀 Getting Started

### 1. Clone this Repository

```bash
git clone https://github.com/your-username/ping-pong-game.git
cd ping-pong-game
```

### 2. Run Locally

Open `index.html` in your browser:

```bash
start index.html   # Windows
open index.html    # macOS
```

No build tools or installations required.

---

## 🔥 Firebase Hosting Setup

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

### 3. Initialize Firebase

```bash
firebase init
```

- Choose: **Hosting**
- Set public directory as `.` (dot)
- Configure as a single-page app (✅ yes)
- Don’t overwrite existing `index.html` if asked

### 4. Deploy

```bash
firebase deploy
```

✅ You’ll get a live link like `https://ping-pong12.web.app`

---

## 🧠 Game Logic Overview

- Runs on HTML5 `<canvas>` with `requestAnimationFrame()`
- AI behavior is influenced by ball tracking and randomness
- Difficulty changes:
  - Ball speed
  - Paddle height
  - AI reaction time and mistake chance
- First to 5 points wins!

---

## ⚙️ Difficulty Levels

| Level  | Ball Speed | AI Speed | Paddle Height | AI Mistake Chance |
|--------|------------|----------|----------------|-------------------|
| Easy   | 7          | 4        | 120px          | 25%               |
| Medium | 10         | 7        | 100px          | 10%               |
| Hard   | 12         | 11       | 80px           | 1%                |

---

## 💡 Customization Tips

### Canvas Size (in `index.html`)

```html
<canvas id="pong" width="800" height="500"></canvas>
```

### Gameplay Settings (in `script.js`)

- Modify ball speed, AI speed, or MAX_SCORE
- Change victory condition or add power-ups

### Styles (in `style.css`)

- Update colors, button styles, text animations

---

## 🛠️ Built With

- HTML5
- CSS3
- JavaScript (Vanilla)
- Canvas API
- Firebase Hosting (for deployment)

---

## 🖼️ Screenshots

### 🟢 Start Screen
![Start Screen](Images/Opening.png)

### 🎚️ Difficulty Selection
![Choose Difficulty](Images/choose.png)

### 🎮 Gameplay
![Gameplay](Images/gameplay.png)

### 🟥 Game Over
![Game Over](Images/win.png)

---

## 🧪 Future Improvements

- 🔊 Add sound effects for game events
- 🧑‍🤝‍🧑 Add multiplayer (same device or WebSocket)
- 📱 Full mobile support with fullscreen toggle
- 🧩 Power-ups or random effects
- 📊 Firebase Analytics for player tracking
- 🌐 Multi-language support (i18n)
- 💾 Offline support (service worker)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).  
You can freely use, modify, and share it.

---

## 👨‍💻 Author

**Satwik Saxena**

- 🔗 [LinkedIn](https://www.linkedin.com/in/satwik-12-dev/)
- 📧 satwiksaxena41@gmail.com
- 💻 [GitHub](https://github.com/satwik12dev)

---

## 🧪 Upcoming Features

We're actively exploring improvements and new functionalities for future updates of the Ping Pong Game. Here's what's in the pipeline:

| Feature Idea                         | Status        | Description                                                                 |
|-------------------------------------|---------------|-----------------------------------------------------------------------------|
| 🎵 Sound Effects                    | 🚧 Planned    | Add paddle hit, score, and victory/loss sounds                             |
| 🧑‍🤝‍🧑 Two-Player Mode              | 🚧 Planned    | Local multiplayer support using keyboard controls                          |
| 📲 Fullscreen & PWA Support         | ✅ In Progress| Mobile fullscreen mode and offline access via Progressive Web App          |
| 🧩 Power-Ups                        | ❓ Idea       | Temporary paddle size, speed boost, or ball duplication                    |
| 🌍 Language Selector                | ❓ Idea       | Add i18n support for multilingual interface                                |
| 📈 Analytics                        | 🚧 Planned    | Track player difficulty usage and session length using Firebase Analytics  |
| 📝 Save Scores                      | ❓ Idea       | Store high scores using localStorage or Firebase                           |
| 🧠 AI Difficulty Learning           | ❓ Idea       | Adaptive AI that improves based on your past games                         |
| 🎯 Achievements & Badges           | ❓ Idea       | Reward system based on game milestones                                     |
| 🎨 Custom Themes                   | ❓ Idea       | Allow players to choose or create color themes                             |

## 🌟 Support

If you enjoy this project, consider giving it a ⭐ on GitHub!
# 🏏 AI-Assisted Odd or Even – Hand Cricket Game

A two-player digital version of the classic Odd or Even hand cricket game, developed using React.js, Node.js, Express.js, and MongoDB.

This project explores full-stack web development with AI-assisted coding, debugging, and problem-solving.

## 🚀 Features

- Two-player hand cricket gameplay
- Odd or Even toss system
- Batting and bowling selection
- Interactive number selection (1–6)
- Automatic score calculation
- Target-based second innings
- Match result display
- Match history stored in MongoDB

## 🛠️ Technologies Used

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Axios

### Backend
- Node.js
- Express.js
- REST API

### Database
- MongoDB
- Mongoose

### Tools
- Visual Studio Code
- Git
- GitHub
- AI-assisted development tools

## 🎮 How to Play

1. Two players enter the game.
2. Player 1 calls Odd or Even.
3. Both players select a number.
4. The toss winner chooses to bat or bowl.
5. Players select numbers between 1 and 6.
6. If both players choose the same number, the batsman is OUT.
7. If the numbers are different, the batting player's number is added to the score.
8. The second player attempts to reach the target.
9. The game displays the final result.

## 🤖 AI-Assisted Development

AI tools were used as development assistants during this project.

Areas where AI assistance was used:
- Understanding application structure
- Generating and improving code
- Debugging errors
- Understanding React components and state management
- Developing backend APIs
- Improving project documentation

The project also involved learning, testing, reviewing, and modifying the generated code.

## 📁 Project Structure

```text
odd-even/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Toss.jsx
│   │   │   ├── GameBoard.jsx
│   │   │   ├── Scoreboard.jsx
│   │   │   └── Result.jsx
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
│
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/athulsatheesh8547-bit/ai-assisted-odd-even-game.git
```

### 2. Open the project

```bash
cd ai-assisted-odd-even-game
```

### 3. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/oddeven
```

Start the backend:

```bash
npm run dev
```

### 4. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL provided by Vite in your browser.

## 📚 What I Learned

- Building reusable React components
- Managing application state using React Hooks
- Connecting React with a Node.js backend
- Creating REST APIs using Express.js
- Connecting MongoDB with Mongoose
- Handling frontend and backend integration
- Using Git and GitHub for version control
- Using AI tools to support software development

## 👨‍💻 Developer

**Athul Satheesh**

GitHub: [athulsatheesh8547-bit](https://github.com/athulsatheesh8547-bit)

Repository: [AI-Assisted Odd or Even Game](https://github.com/athulsatheesh8547-bit/ai-assisted-odd-even-game)

---

⭐ If you find this project interesting, feel free to explore the repository!

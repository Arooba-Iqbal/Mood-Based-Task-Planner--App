# Daily Life Organizer with Mood Tracking

Full-stack project where users manage daily tasks and log mood in one place.

## Tech Stack

- Frontend: React + Redux Toolkit + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Charting: Recharts
- PDF: PDFKit

## Features

- JWT auth (signup/login) with private user profiles
- Per-user data isolation (each account only sees its own tasks, moods, and reports)
- Multi-page UI (Home, Tasks, Mood, Dashboard, Reports) with modern responsive styling
- Task management (CRUD) per user
- Daily mood tracking (happy, sad, stressed) per user
- Dashboard with mood and productivity metrics
- AI-style daily suggestion endpoint based on mood and pending tasks
- Weekly PDF report download scoped to the logged-in user

## Project Structure

```text
daily-life-organizer/
  client/
    src/
      app/
      components/
      features/
      services/
      App.jsx
      main.jsx
      styles.css
    index.html
    package.json
    vite.config.js
  server/
    src/
      config/
      controllers/
      models/
      routes/
      services/
      utils/
      index.js
    .env.example
    package.json
  .gitignore
  README.md
```

## Run Locally

### 1) Backend

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

### 2) Frontend

```bash
cd client
npm install
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000`

## Main API Endpoints

- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `GET /api/moods`
- `POST /api/moods`
- `GET /api/moods/dashboard`
- `GET /api/moods/suggestions/today`
- `GET /api/reports/weekly`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`

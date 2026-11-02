# AI Smart Kitchen — MERN CRUD Project

A college-ready MERN stack project. It manages recipes and pantry ingredients with full CRUD operations. The "Smart Suggestions" feature gives meal ideas from available pantry ingredients (rule-based; no paid AI API key required).

## Features
- Recipes: create, read, update, delete
- Pantry: create, read, update, delete ingredients and quantities
- Smart suggestions: matches pantry ingredients with recipe ingredients
- Search recipes by name/category
- Responsive React UI

## Tech stack
- MongoDB + Mongoose
- Express.js + Node.js
- React + Vite
- Axios, React Router

## Requirements
Node.js 18+ and MongoDB (local MongoDB or MongoDB Atlas).

## 1. Start backend
```bash
cd server
cp .env.example .env
# Edit MONGO_URI in .env with your MongoDB connection string
npm install
npm run dev
```
Backend runs at http://localhost:5000

## 2. Start frontend (new terminal)
```bash
cd client
npm install
npm run dev
```
Open the Vite URL shown (usually http://localhost:5173).

## CRUD API
| Method | Endpoint | Purpose |
|---|---|---|
| GET | /api/recipes | List recipes |
| GET | /api/recipes/:id | Get one recipe |
| POST | /api/recipes | Add recipe |
| PUT | /api/recipes/:id | Update recipe |
| DELETE | /api/recipes/:id | Delete recipe |
| GET | /api/pantry | List pantry items |
| POST | /api/pantry | Add pantry item |
| PUT | /api/pantry/:id | Update pantry item |
| DELETE | /api/pantry/:id | Delete pantry item |

## Demo workflow
1. Add ingredients in Pantry (e.g. tomato, onion, rice).
2. Add recipes and list their ingredients separated by commas.
3. Open Smart Suggestions to see recipes that match your pantry.

## Notes for submission
- This is a CRUD-focused academic project. Smart suggestions use local matching logic, not a generative AI model.
- Add screenshots of the running app and your own name/college details to your report before submission.

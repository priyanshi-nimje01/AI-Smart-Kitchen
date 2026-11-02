import { NavLink, Routes, Route } from 'react-router-dom';
import Recipes from './pages/Recipes.jsx';
import Pantry from './pages/Pantry.jsx';
import Suggestions from './pages/Suggestions.jsx';
export default function App() {
  return <div className="app-shell">
    <header className="topbar"><NavLink to="/" className="brand"><span className="brand-icon">✦</span> Smart Kitchen</NavLink>
      <nav><NavLink to="/">Recipes</NavLink><NavLink to="/pantry">My Pantry</NavLink><NavLink to="/suggestions">Smart Suggestions</NavLink></nav>
    </header>
    <main><Routes><Route path="/" element={<Recipes/>}/><Route path="/pantry" element={<Pantry/>}/><Route path="/suggestions" element={<Suggestions/>}/></Routes></main>
    <footer>AI Smart Kitchen · MERN Stack CRUD Project</footer>
  </div>;
}

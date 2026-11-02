import { useEffect, useState } from 'react';
import api from '../api';
import RecipeForm from '../components/RecipeForm';
export default function Recipes() {
  const [items,setItems]=useState([]), [editing,setEditing]=useState(null), [show,setShow]=useState(false), [search,setSearch]=useState(''), [error,setError]=useState('');
  const load=async()=>{try{const r=await api.get('/recipes',{params:{search}});setItems(r.data);setError('');}catch{setError('Cannot connect to server. Start the backend and check MongoDB.');}};
  useEffect(()=>{load();},[search]);
  const save=async data=>{try{if(editing) await api.put('/recipes/'+editing._id,data); else await api.post('/recipes',data);setShow(false);setEditing(null);load();}catch(e){alert(e.response?.data?.message||'Could not save recipe');}};
  const remove=async id=>{if(confirm('Delete this recipe?')){await api.delete('/recipes/'+id);load();}};
  return <><section className="hero"><div><p className="eyebrow">PLAN · COOK · ENJOY</p><h1>Your kitchen,<br/><em>smarter every day.</em></h1><p className="hero-copy">Keep your favourite recipes organized and discover what you can cook with what you have.</p><button className="primary" onClick={()=>{setEditing(null);setShow(true);}}>＋ Add new recipe</button></div><div className="hero-art"><span>🥑</span><span>🥕</span><span>🍅</span><div className="art-note">Fresh ideas<br/>start here ✨</div></div></section>
  <section className="section-head"><div><p className="eyebrow">YOUR COLLECTION</p><h2>My recipes <span className="count">{items.length}</span></h2></div><input className="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search recipes..."/></section>
  {error&&<p className="error">{error}</p>}{show&&<RecipeForm initial={editing} onSave={save} onCancel={()=>{setShow(false);setEditing(null);}}/>}
  <div className="recipe-grid">{items.map((r,i)=><article className="recipe-card" key={r._id}><div className={'recipe-art art-'+(i%4)}>{['🥗','🍲','🥑','🍝'][i%4]}</div><div className="recipe-content"><div className="meta"><span>{r.category}</span><span>{r.prepTime} min</span></div><h3>{r.name}</h3><p className="muted">{r.ingredients?.join(' · ')||'No ingredients added'}</p><p className="instructions">{r.instructions||'Add preparation instructions to this recipe.'}</p><div className="card-bottom"><span className="difficulty">{r.difficulty}</span><div><button className="text-btn" onClick={()=>{setEditing(r);setShow(true);window.scrollTo({top:400,behavior:'smooth'});}}>Edit</button><button className="text-btn danger" onClick={()=>remove(r._id)}>Delete</button></div></div></div></article>)}</div>
  {!items.length&&!error&&<div className="empty"><span>🍽️</span><h3>No recipes yet</h3><p>Add your first recipe to get started.</p></div>}</>;
}

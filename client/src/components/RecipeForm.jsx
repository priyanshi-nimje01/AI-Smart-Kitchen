import { useEffect, useState } from 'react';
const empty = { name:'', category:'Breakfast', ingredients:'', instructions:'', prepTime:15, difficulty:'Easy' };
export default function RecipeForm({ initial, onSave, onCancel }) {
  const [form,setForm] = useState(empty);
  useEffect(() => setForm(initial ? {...initial, ingredients:(initial.ingredients||[]).join(', ')} : empty),[initial]);
  const change = e => setForm({...form,[e.target.name]:e.target.value});
  const submit = e => { e.preventDefault(); onSave({...form, prepTime:Number(form.prepTime), ingredients:form.ingredients.split(',').map(x=>x.trim()).filter(Boolean)}); };
  return <form className="form-card" onSubmit={submit}>
    <h2>{initial ? 'Update recipe' : 'Add a recipe'}</h2>
    <label>Recipe name<input name="name" value={form.name} onChange={change} required placeholder="e.g. Vegetable Pulao"/></label>
    <div className="form-row"><label>Category<select name="category" value={form.category} onChange={change}><option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Dessert</option><option>Snacks</option></select></label>
    <label>Prep time (minutes)<input type="number" min="0" name="prepTime" value={form.prepTime} onChange={change}/></label></div>
    <label>Ingredients <small>(separate with commas)</small><input name="ingredients" value={form.ingredients} onChange={change} placeholder="rice, tomato, onion" /></label>
    <label>Instructions<textarea name="instructions" rows="4" value={form.instructions} onChange={change} placeholder="Write preparation steps..."/></label>
    <label>Difficulty<select name="difficulty" value={form.difficulty} onChange={change}><option>Easy</option><option>Medium</option><option>Hard</option></select></label>
    <div className="actions"><button className="primary">{initial ? 'Save changes' : 'Add recipe'}</button><button type="button" className="secondary" onClick={onCancel}>Cancel</button></div>
  </form>;
}

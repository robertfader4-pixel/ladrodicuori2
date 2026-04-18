
function setFontScale(delta){
  const root=document.documentElement;
  const current=parseFloat(localStorage.getItem('ladro-font-scale')||'1');
  const next=Math.max(0.92, Math.min(1.28, +(current+delta).toFixed(2)));
  localStorage.setItem('ladro-font-scale', String(next));
  applyFontScale();
}
function applyFontScale(){
  const scale=parseFloat(localStorage.getItem('ladro-font-scale')||'1');
  document.documentElement.style.setProperty('--reading-scale', scale);
  document.querySelectorAll('.reading-panel').forEach(el=>el.style.fontSize=scale+'em');
}
function persistTextarea(id){
  const el=document.getElementById(id);
  if(!el) return;
  const key='ladro2_'+id;
  el.value=localStorage.getItem(key)||'';
  el.addEventListener('input', ()=>localStorage.setItem(key, el.value));
}
document.addEventListener('DOMContentLoaded', ()=>{
  applyFontScale();
  document.querySelectorAll('textarea[data-persist]').forEach(el=>persistTextarea(el.id));
});

function getStoredFontScale(){
  const raw = parseFloat(localStorage.getItem("ladro-font-scale") || "1");
  if (Number.isNaN(raw)) return 1;
  return Math.max(0.9, Math.min(1.35, raw));
}
function applyFontScale(){
  const scale = getStoredFontScale();
  document.documentElement.style.setProperty("--reading-scale", String(scale));
  document.querySelectorAll(".reading-panel, .exercise-section, .finale-box").forEach(el=>{
    el.style.fontSize = scale + "em";
  });
  document.querySelectorAll("[data-font-output]").forEach(el=>{
    el.textContent = Math.round(scale * 100) + "%";
  });
}
function setFontScale(delta){
  const next = Math.max(0.9, Math.min(1.35, +(getStoredFontScale() + delta).toFixed(2)));
  localStorage.setItem("ladro-font-scale", String(next));
  applyFontScale();
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
  document.querySelectorAll('[data-font-step]').forEach(btn=>{
    btn.addEventListener('click', ()=> setFontScale(parseFloat(btn.getAttribute('data-font-step') || '0')));
  });
  document.querySelectorAll('textarea[data-persist]').forEach(el=>persistTextarea(el.id));
});

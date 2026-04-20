// ── Stars ──────────────────────────────
(function(){
  const c = document.getElementById('stars');
  for(let i=0;i<60;i++){
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random()*2+1;
    s.style.cssText = `
      width:${size}px;height:${size}px;
      top:${Math.random()*100}%;left:${Math.random()*100}%;
      --dur:${2+Math.random()*4}s;
      --min-op:${0.05+Math.random()*0.15};
      --max-op:${0.3+Math.random()*0.5};
      animation-delay:${Math.random()*5}s;
    `;
    c.appendChild(s);
  }
})();

// ── Theme ──────────────────────────────
function applyTheme(t){
  document.documentElement.setAttribute('data-theme',t);
  document.getElementById('icon-sun').style.display  = t==='dark' ? 'block' : 'none';
  document.getElementById('icon-moon').style.display = t==='dark' ? 'none'  : 'block';
}

function toggleTheme(){
  const next = document.documentElement.getAttribute('data-theme')==='dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
}

(function(){
  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);
})();

// ── Navigation ─────────────────────────
function go(id, fromHistory=false){
  document.querySelectorAll('.view').forEach(v => {
    v.classList.remove('active');
    v.querySelectorAll('.anim').forEach(el => {
      el.style.animation = 'none';
      void el.offsetHeight;
      el.style.animation = '';
    });
  });
  const target = document.getElementById(id);
  if(target){ target.classList.add('active'); window.scrollTo({top:0,behavior:'smooth'}); }
  if(!fromHistory){
    try{ history.pushState({view:id},'','#'+id); }catch(e){}
  }
}

window.addEventListener('popstate', e => {
  go(e.state?.view || 'home-view', true);
});

(function(){
  const hash = location.hash.slice(1);
  const target = hash && document.getElementById(hash) ? hash : 'home-view';
  try{ history.replaceState({view:target},'',location.href); }catch(e){}
  go(target, true);
})();

// ── Changelog toggle ───────────────────
function toggleCl(id, btn){
  const wrap = document.getElementById(id);
  const open = wrap.classList.toggle('open');
  btn.querySelector('span').textContent = open ? 'Hide' : 'Show';
  btn.querySelector('svg').style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
}

// ── Parallax Orbs ──────────────────────
document.addEventListener("mousemove", (e) => {
  if (window.innerWidth <= 768) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  document.querySelectorAll(".cosmos-orb").forEach((orb, i) => {
    const depth = (i + 1) * 0.3;
    orb.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
  });
});
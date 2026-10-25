(function(){
'use strict';
const T = window.TEMAS, BANK = window.BANK, EX = window.EXAMEN;
const TM = Object.fromEntries(T.map(t=>[t.id,t]));
const FUNC = T.filter(t=>t.peso>0).map(t=>t.id);
const CONDUCT = ['comp','integ'];
const PRACT_W = Object.assign({}, Object.fromEntries(T.map(t=>[t.id,t.peso||7])));
const KEY = 'dian2676-gestorII-v1';
const $ = s=>document.querySelector(s);
const esc = s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

// ---------- estado ----------
let S = load();
function blank(){ return {qs:{}, sims:[], likert:[], hist:[], started:Date.now()}; }
function load(){ try{ const r=localStorage.getItem(KEY); if(r) return Object.assign(blank(), JSON.parse(r)); }catch(e){} return blank(); }
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} }

function rec(q, ok){
  const r = S.qs[q.id] || {n:0,ok:0,box:0,last:0,wrong:0};
  r.n++; if(ok){ r.ok++; r.box=Math.min(4,r.box+1);} else { r.wrong++; r.box=0; }
  r.last = Date.now(); S.qs[q.id]=r;
  const d=today(); let h=S.hist.find(x=>x.d===d); if(!h){h={d,n:0,ok:0};S.hist.push(h);} h.n++; if(ok)h.ok++;
  save();
}
function today(){ const d=new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }

// ---------- motor adaptativo ----------
function topicStats(t){
  const qs = BANK.filter(q=>q.t===t);
  let n=0, ok=0, seen=0, mastered=0;
  qs.forEach(q=>{ const r=S.qs[q.id]; if(r){ n+=r.n; ok+=r.ok; seen++; if(r.box>=2) mastered++; } });
  // incluye resultados de simulacros (ya registrados por pregunta)
  const acc = n ? ok/n : null;
  const mastery = (mastered + 0.5*(seen-mastered)*(acc??0)) / qs.length; // 0..1
  return {total:qs.length, n, ok, seen, mastered, acc, mastery};
}
function priority(t){
  const st = topicStats(t);
  const weak = st.acc===null ? 0.75 : (1 - st.acc);
  return PRACT_W[t] * (0.35 + weak) * (1.15 - st.mastery);
}
function ranking(){
  return T.map(t=>({id:t.id, p:priority(t.id), st:topicStats(t.id)})).sort((a,b)=>b.p-a.p);
}
function qWeight(q){
  const r=S.qs[q.id];
  if(!r) return 2.2;
  const hrs = (Date.now()-r.last)/36e5;
  const boxF = [3.2,1.6,0.9,0.5,0.25][r.box];
  const fresh = hrs<0.2 ? 0.05 : Math.min(1.5, 0.4 + hrs/24);
  return boxF*fresh*(r.wrong>r.ok?1.4:1);
}
function wpick(arr, wf, n){
  const pool=arr.slice(), out=[];
  while(out.length<n && pool.length){
    const ws=pool.map(wf), tot=ws.reduce((a,b)=>a+b,0); let x=Math.random()*tot, i=0;
    for(;i<pool.length;i++){ x-=ws[i]; if(x<=0) break; }
    out.push(pool.splice(Math.min(i,pool.length-1),1)[0]);
  }
  return out;
}
function adaptiveSet(n, onlyTopics){
  const tops = onlyTopics || T.map(t=>t.id);
  const pr = Object.fromEntries(tops.map(t=>[t,priority(t)]));
  const cand = BANK.filter(q=>tops.includes(q.t));
  return wpick(cand, q=>pr[q.t]*qWeight(q), n);
}
function simSet(n){
  const nf = Math.round(n*0.8), nc = n-nf;
  const totW = FUNC.reduce((a,t)=>a+TM[t].peso,0);
  let out=[];
  FUNC.forEach(t=>{ const k=Math.max(1,Math.round(nf*TM[t].peso/totW)); out=out.concat(wpick(BANK.filter(q=>q.t===t),()=>1,k)); });
  out = out.slice(0,nf);
  out = out.concat(wpick(BANK.filter(q=>CONDUCT.includes(q.t)),()=>1,nc));
  return out;
}
function shuffleOpts(q){
  const idx=[0,1,2].sort(()=>Math.random()-0.5);
  return {q, opts:idx.map(i=>q.o[i]), correct:idx.indexOf(q.a)};
}

// ---------- utilidades de fecha ----------
function daysLeft(){ const ms=new Date(EX.fecha)-new Date(); return Math.ceil(ms/864e5); }

// ---------- navegación ----------
let view='inicio', session=null, timer=null;
function go(v, arg){ view=v; clearInterval(timer); timer=null; render(arg); window.scrollTo(0,0);
  document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('on', b.dataset.v===v || (v==='quiz'&&b.dataset.v==='practicar'))); }
document.addEventListener('click', e=>{
  const b=e.target.closest('[data-go]'); if(b){ e.preventDefault(); go(b.dataset.go, b.dataset.arg); }
});

function render(arg){
  const m=$('#main');
  if(view==='inicio') m.innerHTML = vInicio();
  else if(view==='temas') m.innerHTML = vTemas();
  else if(view==='tema') m.innerHTML = vTema(arg);
  else if(view==='practicar') m.innerHTML = vPracticar();
  else if(view==='simulacro') m.innerHTML = vSimIntro();
  else if(view==='likert') { m.innerHTML = vLikertIntro(); }
  else if(view==='progreso') m.innerHTML = vProgreso();
  else if(view==='info') m.innerHTML = vInfo();
  bindView(arg);
}

// ---------- vistas ----------
function bar(v, cls){ const p=Math.round((v||0)*100); return `<span class="bar ${cls||''}"><i style="width:${p}%"></i></span>`; }
function pct(v){ return v===null||v===undefined ? '—' : Math.round(v*100)+'%'; }

function planHoy(){
  const r = ranking().filter(x=>!CONDUCT.includes(x.id));
  const weak = r.slice(0,3);
  const dl = daysLeft();
  const lastSim = S.sims[S.sims.length-1];
  const simToday = !lastSim || (Date.now()-lastSim.t) > 2.5*864e5 || dl<=3;
  const items=[];
  items.push({h:`Práctica adaptativa · 25 preguntas`, s:`Enfocada en ${weak.map(w=>TM[w.id].nombre).join(', ')}`, go:'practicar'});
  items.push({h:`Repasa la ficha: ${TM[weak[0].id].nombre}`, s:TM[weak[0].id].eje, go:'tema', arg:weak[0].id});
  const cr = ranking().filter(x=>CONDUCT.includes(x.id))[0];
  items.push({h:`Casos de ${TM[cr.id].nombre.toLowerCase()} · 10 preguntas`, s:'Entrena el criterio ético y de servicio que evalúa la prueba clasificatoria', go:'tema', arg:cr.id});
  if(simToday) items.push({h:`Simulacro ${dl<=4?'completo de 100':'de 60'} preguntas`, s: lastSim ? `Último: ${lastSim.func} / 100 en funcionales` : 'Aún no has hecho ninguno: es tu diagnóstico inicial', go:'simulacro'});
  if(!S.likert.length || dl<=5) items.push({h:'Entrenador Likert (autoinforme)', s:'Revisa tu consistencia y las respuestas exageradas', go:'likert'});
  return items;
}

function vInicio(){
  const dl=daysLeft(), r=ranking();
  const lastSim=S.sims[S.sims.length-1];
  const totAns = Object.values(S.qs).reduce((a,x)=>a+x.n,0);
  const totOk = Object.values(S.qs).reduce((a,x)=>a+x.ok,0);
  const plan = planHoy();
  return `
  <section class="hero">
    <div class="hero-l">
      <div class="eyebrow">${esc(EX.proceso)} · ${esc(EX.empleo)}</div>
      <h1>${dl>0?`Faltan <em>${dl}</em> días`:(dl===0?'Hoy es el examen':'El examen ya pasó')}</h1>
      <p class="lead">Domingo 8 de noviembre de 2026 · puertas 7:15 a. m. · inicio 8:00 · cierre de puertas 8:30 · 4 horas. Funcionales eliminatoria: mínimo <b>70/100</b>.</p>
    </div>
    <div class="kpis">
      <div class="kpi"><span>Último simulacro</span><b class="${lastSim?(lastSim.func>=70?'ok':'bad'):''}">${lastSim?lastSim.func:'—'}</b><small>${lastSim?'funcionales / 100':'sin simulacros aún'}</small></div>
      <div class="kpi"><span>Aciertos totales</span><b>${totAns?Math.round(totOk/totAns*100)+'%':'—'}</b><small>${totAns} respuestas</small></div>
      <div class="kpi"><span>Banco</span><b>${BANK.length}</b><small>preguntas + ${window.LIKERT.length} Likert</small></div>
    </div>
  </section>

  <section class="block">
    <div class="bh"><h2>Plan de hoy</h2><span class="muted">Se recalcula con cada respuesta</span></div>
    <ol class="plan">${plan.map(p=>`<li><button class="planitem" data-go="${p.go}" ${p.arg?`data-arg="${p.arg}"`:''}><b>${esc(p.h)}</b><span>${esc(p.s)}</span><i>→</i></button></li>`).join('')}</ol>
  </section>

  <section class="block">
    <div class="bh"><h2>Dónde estás más débil</h2><button class="link" data-go="progreso">Ver progreso →</button></div>
    <div class="tlist">${r.map(x=>`<button class="trow" data-go="tema" data-arg="${x.id}">
      <span class="ti">${TM[x.id].icon}</span>
      <span class="tn"><b>${esc(TM[x.id].nombre)}</b><small>${esc(TM[x.id].grupo)} · ${x.st.seen}/${x.st.total} vistas · acierto ${pct(x.st.acc)}</small></span>
      <span class="tb">${bar(x.st.mastery, x.st.acc===null?'':(x.st.acc>=.75?'g':x.st.acc>=.55?'y':'r'))}</span></button>`).join('')}</div>
  </section>`;
}

function vTemas(){
  const groups=[...new Set(T.map(t=>t.grupo))];
  return `<div class="bh"><h1 class="h1s">Temario de la ficha AT-FL-3007</h1></div>
  <p class="lead">Cada tema tiene una ficha con lo esencial que se evalúa y práctica dirigida. Los porcentajes son tu dominio actual.</p>
  ${groups.map(g=>`<section class="block"><h2>${esc(g)}</h2><div class="cards">${T.filter(t=>t.grupo===g).map(t=>{const st=topicStats(t.id);return `
    <button class="card" data-go="tema" data-arg="${t.id}"><span class="ti">${t.icon}</span><b>${esc(t.nombre)}</b><small>${esc(t.eje)}</small>${bar(st.mastery)}<small class="mono">${st.total} preguntas · acierto ${pct(st.acc)}</small></button>`;}).join('')}</div></section>`).join('')}`;
}

function vTema(id){
  const t=TM[id], st=topicStats(id);
  return `<button class="link" data-go="temas">← Temario</button>
  <div class="bh"><h1 class="h1s">${t.icon} ${esc(t.nombre)}</h1></div>
  <p class="muted">${esc(t.eje)}</p>
  <div class="row-actions">
    <button class="btn primary" id="tp10">Practicar 10 preguntas</button>
    <button class="btn" id="tpall">Todas las de este tema (${st.total})</button>
    <button class="btn" id="tperr">Solo las que he fallado</button>
  </div>
  <section class="ficha"><h2>Ficha de estudio</h2><ul>${t.ficha.map(f=>`<li>${esc(f)}</li>`).join('')}</ul></section>`;
}

function vPracticar(){
  const r=ranking();
  return `<div class="bh"><h1 class="h1s">Práctica adaptativa</h1></div>
  <p class="lead">La app elige las preguntas según tus errores: prioriza temas débiles, repite lo que fallaste (repetición espaciada) y mezcla preguntas nuevas.</p>
  <div class="row-actions">
    <button class="btn primary" data-n="15">15 preguntas</button>
    <button class="btn primary" data-n="25">25 preguntas</button>
    <button class="btn primary" data-n="40">40 preguntas</button>
    <button class="btn" id="perr">Repasar mis errores</button>
  </div>
  <section class="block"><h2>Enfoque actual</h2><div class="chips">${r.slice(0,5).map(x=>`<span class="chip">${TM[x.id].icon} ${esc(TM[x.id].nombre)}</span>`).join('')}</div></section>`;
}

function vSimIntro(){
  return `<div class="bh"><h1 class="h1s">Simulacro</h1></div>
  <p class="lead">Como el examen: preguntas de juicio situacional con 3 opciones, sin retroalimentación hasta el final y con tiempo. Se reparten según el peso de cada eje: 80 % funcionales y 20 % comportamentales e integridad.</p>
  <div class="cards three">
    <button class="card" data-sim="30"><b>Corto</b><span class="big mono">30</span><small>45 minutos</small></button>
    <button class="card" data-sim="60"><b>Medio</b><span class="big mono">60</span><small>1 h 30 min</small></button>
    <button class="card" data-sim="100"><b>Completo</b><span class="big mono">100</span><small>2 h 30 min · ritmo de examen</small></button>
  </div>
  ${S.sims.length?`<section class="block"><h2>Historial</h2>${simChart()}</section>`:''}`;
}

function simChart(){
  const s=S.sims.slice(-12); if(!s.length) return '';
  const W=560,H=180,p=30, x=i=>p+ (s.length===1?(W-2*p)/2:i*(W-2*p)/(s.length-1)), y=v=>H-p-(v/100)*(H-2*p);
  const pts=s.map((m,i)=>`${x(i)},${y(m.func)}`).join(' ');
  return `<div class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Puntaje de simulacros">
   ${[0,50,70,100].map(v=>`<line x1="${p}" x2="${W-p}" y1="${y(v)}" y2="${y(v)}" class="${v===70?'gl70':'gl'}"/><text x="4" y="${y(v)+4}" class="ax">${v}</text>`).join('')}
   <polyline points="${pts}" class="ln"/>
   ${s.map((m,i)=>`<circle cx="${x(i)}" cy="${y(m.func)}" r="4" class="${m.func>=70?'dot ok':'dot bad'}"/><text x="${x(i)}" y="${y(m.func)-9}" text-anchor="middle" class="ax">${m.func}</text>`).join('')}
  </svg><small class="muted">Línea punteada: mínimo aprobatorio de 70 en funcionales.</small></div>`;
}

function vProgreso(){
  const r=ranking();
  const h=S.hist.slice(-14);
  const maxN=Math.max(1,...h.map(x=>x.n));
  return `<div class="bh"><h1 class="h1s">Progreso</h1></div>
  ${S.sims.length?`<section class="block"><h2>Simulacros</h2>${simChart()}</section>`:''}
  <section class="block"><h2>Dominio por tema</h2>
  <div class="tbl"><table><thead><tr><th>Tema</th><th>Vistas</th><th>Acierto</th><th>Dominio</th></tr></thead><tbody>
  ${r.map(x=>`<tr><td>${TM[x.id].icon} ${esc(TM[x.id].nombre)}</td><td class="mono">${x.st.seen}/${x.st.total}</td><td class="mono">${pct(x.st.acc)}</td><td>${bar(x.st.mastery)}</td></tr>`).join('')}
  </tbody></table></div></section>
  ${h.length?`<section class="block"><h2>Actividad diaria</h2><div class="days">${h.map(d=>`<div class="day"><i style="height:${Math.max(6,d.n/maxN*90)}px"></i><small class="mono">${d.d.slice(5)}</small><small>${d.n}</small></div>`).join('')}</div></section>`:''}
  <section class="block"><h2>Llevar tu progreso a otro dispositivo</h2>
   <p class="muted">El progreso se guarda en este navegador. Para continuar en el celular u otro PC, copia el código aquí y pégalo allá.</p>
   <div class="row-actions"><button class="btn" id="exp">Copiar código de progreso</button></div>
   <textarea id="code" rows="3" placeholder="Pega aquí el código de progreso de otro dispositivo"></textarea>
   <div class="row-actions"><button class="btn" id="imp">Cargar código</button><button class="btn danger" id="rst">Borrar mi progreso</button></div>
   <p id="msg" class="muted" role="status"></p>
  </section>`;
}

function vInfo(){
  return `<div class="bh"><h1 class="h1s">El examen DIAN 2676</h1></div>
  <section class="ficha"><h2>Estructura y pesos</h2>
  <div class="tbl"><table><thead><tr><th>Modalidad</th><th>Funcionales</th><th>Comportamentales</th><th>Integridad</th><th>Antecedentes</th></tr></thead><tbody>
  <tr><td>Ingreso con experiencia</td><td>65 %</td><td>15 %</td><td>10 %</td><td>10 %</td></tr>
  <tr><td>Ingreso sin experiencia</td><td>70 %</td><td>20 %</td><td>10 %</td><td>—</td></tr>
  <tr><td>Ascenso con experiencia</td><td>60 %</td><td>15 %</td><td>10 %</td><td>15 %</td></tr>
  <tr><td>Ascenso sin experiencia</td><td>65 %</td><td>20 %</td><td>10 %</td><td>5 %</td></tr></tbody></table></div>
  <ul>
   <li><b>Funcionales:</b> eliminatoria, mínimo 70 sobre 100. Juicio situacional con 3 opciones (A, B, C) y una sola correcta. Tu ficha exige 1 año de experiencia profesional, así que tu modalidad tiene experiencia.</li>
   <li><b>Comportamentales e Integridad:</b> clasificatorias, autoinforme tipo Likert de 4 opciones, con dos subescalas de control que detectan respuestas exageradamente favorables. Solo se publican si apruebas funcionales.</li>
   <li><b>Corte normativo:</b> solo normas vigentes expedidas antes del 19 de junio de 2026. La Ley 2586 de 2026 (nuevo régimen sancionatorio aduanero) es de esa fecha: prioriza conceptos y procedimientos que no cambiaron.</li>
   <li>La Ley de Financiamiento 2025 se hundió (9-dic-2025): la última reforma tributaria aplicable es la Ley 2277 de 2022.</li>
   <li>Responde solo en la hoja de respuestas con lápiz de mina negra N.º 2. Lo escrito en el cuadernillo no cuenta.</li>
   <li>Citación en SIMO al menos 5 días hábiles antes. Reclamaciones: 5 días hábiles desde la publicación de resultados.</li>
  </ul></section>
  <section class="ficha"><h2>Competencias de tu ficha</h2>
  <ul><li><b>Funcionales:</b> determinación y control tributario; régimen cambiario; fiscalización internacional; fiscalización aduanera.</li>
  <li><b>Comportamentales (nivel):</b> Comportamiento ético 4 · Comunicación efectiva 3 · Adaptabilidad 3 · Trabajo en equipo 3. Básicas: orientación al logro y orientación al usuario.</li>
  <li><b>Ejes básicos:</b> Constitución, Ley 1437 de 2011 (Títulos I, II y III caps. I y V-VIII), PQRSF, servicio al ciudadano, gestión documental, MIPG, códigos de integridad y buen gobierno, herramientas informáticas, evasión-elusión-contrabando y ley de transparencia.</li></ul></section>
  <section class="ficha"><h2>Fuentes oficiales para estudiar</h2><ul>
  <li><a href="https://www.cnsc.gov.co/convocatorias/dian-2676" target="_blank" rel="noopener">CNSC · Proceso DIAN 2676 (acuerdo, anexo, guía)</a></li>
  <li><a href="https://simo.cnsc.gov.co/" target="_blank" rel="noopener">SIMO · citación y resultados</a></li>
  <li><a href="https://normograma.dian.gov.co/dian/" target="_blank" rel="noopener">Normograma DIAN · Estatuto Tributario, Decreto 1165, DL 2245, doctrina</a></li>
  <li><a href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=41249" target="_blank" rel="noopener">Ley 1437 de 2011 (CPACA)</a></li>
  <li><a href="https://www.funcionpublica.gov.co/web/mipg" target="_blank" rel="noopener">MIPG · Función Pública</a></li>
  </ul></section>`;
}

// ---------- quiz ----------
function startQuiz(list, mode, title){
  if(!list.length){ $('#main').insertAdjacentHTML('afterbegin','<p class="note">No hay preguntas para esa selección todavía.</p>'); return; }
  session={mode, title, items:list.map(shuffleOpts), i:0, ans:[], t0:Date.now()};
  if(mode==='sim'){ session.limit = Math.round(list.length*1.5*60); }
  view='quiz'; drawQ();
}
function drawQ(){
  const s=session, it=s.items[s.i], q=it.q, m=$('#main');
  const a=s.ans[s.i];
  const showFb = s.mode!=='sim' && a!==undefined;
  m.innerHTML = `
  <div class="qtop"><span class="mono">${esc(s.title)} · ${s.i+1}/${s.items.length}</span>
   ${s.mode==='sim'?'<span id="clock" class="mono clock"></span>':''}
   <button class="link" id="qquit">${s.mode==='sim'?'Terminar y calificar':'Salir'}</button></div>
  <div class="prog">${bar((s.i)/s.items.length)}</div>
  <article class="qcard">
   <div class="qtag">${TM[q.t].icon} ${esc(TM[q.t].nombre)}</div>
   <p class="qtext">${esc(q.q)}</p>
   <div class="opts">${it.opts.map((o,k)=>{
     let cls=''; if(showFb){ if(k===it.correct) cls='right'; else if(k===a) cls='wrong'; } else if(a===k) cls='sel';
     return `<button class="opt ${cls}" data-k="${k}" ${showFb?'disabled':''}><span class="L">${'ABC'[k]}</span><span>${esc(o)}</span></button>`;}).join('')}</div>
   ${showFb?`<div class="fb ${a===it.correct?'ok':'bad'}"><b>${a===it.correct?'Correcto.':'Incorrecto.'}</b> ${esc(q.e)} ${q.r?`<span class="ref mono">${esc(q.r)}</span>`:''}</div>`:''}
  </article>
  <div class="qnav">
   <button class="btn" id="qprev" ${s.i===0?'disabled':''}>← Anterior</button>
   ${s.i<s.items.length-1?`<button class="btn primary" id="qnext" ${(s.mode!=='sim'&&a===undefined)?'disabled':''}>Siguiente →</button>`:`<button class="btn primary" id="qend">${s.mode==='sim'?'Calificar simulacro':'Ver resultado'}</button>`}
  </div>
  ${s.mode==='sim'?`<div class="grid-nav">${s.items.map((_,k)=>`<button class="gn ${s.ans[k]!==undefined?'done':''} ${k===s.i?'cur':''}" data-j="${k}">${k+1}</button>`).join('')}</div>`:''}`;
  m.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{
    const k=+b.dataset.k;
    if(s.mode==='sim'){ s.ans[s.i]=k; drawQ(); }
    else if(s.ans[s.i]===undefined){ s.ans[s.i]=k; rec(q, k===it.correct); drawQ(); }
  });
  const nx=$('#qnext'); if(nx) nx.onclick=()=>{s.i++;drawQ();};
  const pv=$('#qprev'); if(pv) pv.onclick=()=>{s.i--;drawQ();};
  const en=$('#qend'); if(en) en.onclick=finish;
  $('#qquit').onclick=()=> s.mode==='sim'?finish():go('inicio');
  m.querySelectorAll('.gn').forEach(b=>b.onclick=()=>{s.i=+b.dataset.j;drawQ();});
  if(s.mode==='sim') tick();
  window.scrollTo(0,0);
}
function tick(){
  clearInterval(timer);
  const upd=()=>{ const left=session.limit-Math.floor((Date.now()-session.t0)/1000); const c=$('#clock'); if(!c) return;
    if(left<=0){ clearInterval(timer); finish(); return; }
    c.textContent=`${Math.floor(left/3600)}:${String(Math.floor(left%3600/60)).padStart(2,'0')}:${String(left%60).padStart(2,'0')}`; c.classList.toggle('late', left<300); };
  upd(); timer=setInterval(upd,1000);
}
function finish(){
  clearInterval(timer);
  const s=session; const per={}; let fOk=0,fN=0,cOk=0,cN=0;
  s.items.forEach((it,k)=>{
    const ok = s.ans[k]===it.correct; const t=it.q.t;
    if(s.mode==='sim') rec(it.q, ok);
    per[t]=per[t]||[0,0]; per[t][1]++; if(ok) per[t][0]++;
    if(CONDUCT.includes(t)){cN++; if(ok)cOk++;} else {fN++; if(ok)fOk++;}
  });
  const func = fN?Math.round(fOk/fN*100):0, cond = cN?Math.round(cOk/cN*100):null;
  if(s.mode==='sim'){ S.sims.push({t:Date.now(), n:s.items.length, func, cond, per, mins:Math.round((Date.now()-s.t0)/60000)}); save(); }
  const wrong = s.items.map((it,k)=>({it,a:s.ans[k]})).filter(x=>x.a!==x.it.correct);
  const weakT = Object.entries(per).map(([t,[o,n]])=>({t,acc:o/n,n})).sort((a,b)=>a.acc-b.acc);
  const m=$('#main'); view='result';
  m.innerHTML = `
  <div class="bh"><h1 class="h1s">Resultado · ${esc(s.title)}</h1></div>
  <section class="result">
   <div class="score ${func>=70?'ok':'bad'}"><span class="mono">${fN?func:'—'}</span><small>${fN?'Competencias funcionales / 100':''}</small><b>${fN?(func>=70?'Superas el mínimo de 70':'Por debajo del mínimo de 70'):''}</b></div>
   ${cond!==null?`<div class="score sm"><span class="mono">${cond}</span><small>Casos comportamentales e integridad</small></div>`:''}
  </section>
  <section class="block"><h2>Por tema</h2><div class="tbl"><table><tbody>
   ${weakT.map(w=>`<tr><td>${TM[w.t].icon} ${esc(TM[w.t].nombre)}</td><td class="mono">${Math.round(w.acc*w.n)}/${w.n}</td><td>${bar(w.acc, w.acc>=.75?'g':w.acc>=.55?'y':'r')}</td><td><button class="link" data-go="tema" data-arg="${w.t}">Ficha →</button></td></tr>`).join('')}
  </tbody></table></div>
  <p class="note">Tu plan de estudio ya se ajustó: la práctica adaptativa priorizará ${weakT.filter(w=>w.acc<.75).slice(0,3).map(w=>TM[w.t].nombre).join(', ')||'mantener lo que dominas'}.</p>
  <div class="row-actions"><button class="btn primary" id="rfocus">Practicar mis temas débiles</button><button class="btn" data-go="inicio">Volver al inicio</button></div></section>
  ${wrong.length?`<section class="block"><h2>Revisión de errores (${wrong.length})</h2>${wrong.map(({it,a})=>`<div class="rev"><p class="qtext sm">${esc(it.q.q)}</p>
    ${a!==undefined?`<p class="wrongtxt">Tu respuesta: ${esc(it.opts[a])}</p>`:'<p class="wrongtxt">Sin responder</p>'}
    <p class="righttxt">Correcta: ${esc(it.opts[it.correct])}</p><p class="muted">${esc(it.q.e)} <span class="ref mono">${esc(it.q.r)}</span></p></div>`).join('')}</section>`:''}`;
  $('#rfocus').onclick=()=>{ const ts=weakT.filter(w=>w.acc<.8).map(w=>w.t); startQuiz(adaptiveSet(20, ts.length?ts:null),'prac','Refuerzo de temas débiles'); };
  window.scrollTo(0,0);
}

// ---------- Likert ----------
const LOPT=['Totalmente en desacuerdo','En desacuerdo','De acuerdo','Totalmente de acuerdo'];
function vLikertIntro(){
  const last=S.likert[S.likert.length-1];
  return `<div class="bh"><h1 class="h1s">Entrenador Likert</h1></div>
  <p class="lead">La prueba real de Comportamentales e Integridad es un autoinforme: lees afirmaciones y marcas qué tan de acuerdo estás. No hay respuestas "de memoria"; lo que se mide es tu perfil y su coherencia.</p>
  <section class="ficha"><h2>Cómo se lee este entrenamiento</h2><ul>
   <li><b>Ítems directos e invertidos:</b> algunas frases describen una conducta deseable y otras su opuesto. Si estás de acuerdo con ambas, tu perfil es inconsistente.</li>
   <li><b>Ítems de control:</b> frases absolutas e irreales ("nunca he mentido"). Marcar "Totalmente de acuerdo" en ellas indica deseabilidad social, que la prueba real detecta.</li>
   <li>Responde como actuarías de verdad, con apego a los principios del servicio público. Ser realista no te resta; exagerar sí puede afectar qué ítems se califican.</li></ul></section>
  <div class="row-actions"><button class="btn primary" id="lstart">Empezar (${window.LIKERT.length} afirmaciones, ~5 min)</button></div>
  ${last?`<section class="block"><h2>Último resultado</h2>${likertReport(last)}</section>`:''}`;
}
function startLikert(){
  const items = window.LIKERT.map((x,i)=>({...x,i})).sort(()=>Math.random()-0.5);
  const ans={}; const m=$('#main');
  m.innerHTML = `<div class="bh"><h1 class="h1s">Autoinforme</h1></div><p class="muted">Marca una opción en cada afirmación.</p>
  <div class="lk">${items.map((it,k)=>`<fieldset class="lki"><legend><span class="mono">${k+1}.</span> ${esc(it.t)}</legend>
   <div class="lko">${LOPT.map((o,v)=>`<label><input type="radio" name="lk${it.i}" id="lk${it.i}_${v}" value="${v}"><span>${o}</span></label>`).join('')}</div></fieldset>`).join('')}</div>
  <div class="row-actions"><button class="btn primary" id="lend">Ver mi perfil</button></div><p id="lmsg" class="muted" role="status"></p>`;
  m.querySelectorAll('input[type=radio]').forEach(r=>r.onchange=()=>{ ans[r.name.slice(2)]=+r.value; });
  $('#lend').onclick=()=>{
    if(Object.keys(ans).length<window.LIKERT.length){ $('#lmsg').textContent=`Te faltan ${window.LIKERT.length-Object.keys(ans).length} afirmaciones por responder.`; return; }
    const res={t:Date.now(), a:ans}; S.likert.push(res); save();
    m.innerHTML = `<div class="bh"><h1 class="h1s">Tu perfil</h1></div>${likertReport(res)}<div class="row-actions"><button class="btn" data-go="likert">Volver</button></div>`;
    window.scrollTo(0,0);
  };
}
function likertReport(res){
  const L=window.LIKERT, C=window.LIKERT_COMP, a=res.a;
  const by={}; let ctrlHi=0, ctrlN=0; const pairs={};
  L.forEach((it,i)=>{ const v=a[i]; if(v===undefined) return;
    if(it.ctrl){ ctrlN++; if(v===3) ctrlHi++; return; }
    const sc = it.inv ? 3-v : v; (by[it.c]=by[it.c]||[]).push(sc);
    if(it.par){ (pairs[it.par]=pairs[it.par]||[]).push({inv:!!it.inv, v}); }
  });
  let incons=[];
  Object.entries(pairs).forEach(([p,arr])=>{ if(arr.length===2){ const d=arr.find(x=>!x.inv), r=arr.find(x=>x.inv); if(d&&r&&d.v>=2&&r.v>=2) incons.push(p);} });
  const flag = ctrlHi>=2;
  return `<div class="tbl"><table><thead><tr><th>Competencia</th><th>Perfil</th><th></th></tr></thead><tbody>
  ${Object.entries(by).map(([c,arr])=>{const m=arr.reduce((x,y)=>x+y,0)/(arr.length*3);return `<tr><td>${esc(C[c])}</td><td>${bar(m, m>=.75?'g':m>=.5?'y':'r')}</td><td class="mono">${Math.round(m*100)}</td></tr>`;}).join('')}
  </tbody></table></div>
  <div class="fb ${flag?'bad':'ok'}"><b>Escala de control:</b> marcaste "Totalmente de acuerdo" en ${ctrlHi} de ${ctrlN} afirmaciones absolutas. ${flag?'Este patrón se lee como respuesta exageradamente favorable. En el examen, ante frases con "nunca", "siempre" o "jamás" que nadie cumple al 100 %, responde con realismo.':'Bien: respondes con realismo ante afirmaciones absolutas.'}</div>
  <div class="fb ${incons.length?'bad':'ok'}"><b>Consistencia:</b> ${incons.length?`estuviste de acuerdo con afirmaciones opuestas en ${incons.length} par(es). Revisa con calma: si apoyas "reporto las irregularidades", no deberías apoyar "un error menor no vale la pena reportarlo".`:'tus respuestas a afirmaciones opuestas son coherentes.'}</div>
  <p class="muted">Este entrenador no reproduce la prueba real ni su calificación; sirve para que reconozcas el formato y revises tu coherencia.</p>`;
}

// ---------- enlaces de eventos por vista ----------
function bindView(arg){
  if(view==='tema'){
    $('#tp10').onclick=()=>startQuiz(adaptiveSet(10,[arg]),'prac',TM[arg].nombre);
    $('#tpall').onclick=()=>startQuiz(BANK.filter(q=>q.t===arg).sort(()=>Math.random()-0.5),'prac',TM[arg].nombre);
    $('#tperr').onclick=()=>startQuiz(BANK.filter(q=>q.t===arg && S.qs[q.id] && S.qs[q.id].box===0),'prac',TM[arg].nombre+' · errores');
  }
  if(view==='practicar'){
    document.querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>startQuiz(adaptiveSet(+b.dataset.n),'prac','Práctica adaptativa'));
    $('#perr').onclick=()=>startQuiz(BANK.filter(q=>S.qs[q.id] && S.qs[q.id].box===0).sort(()=>Math.random()-0.5).slice(0,30),'prac','Repaso de errores');
  }
  if(view==='simulacro') document.querySelectorAll('[data-sim]').forEach(b=>b.onclick=()=>startQuiz(simSet(+b.dataset.sim),'sim',`Simulacro ${b.dataset.sim}`));
  if(view==='likert') $('#lstart').onclick=startLikert;
  if(view==='progreso'){
    $('#exp').onclick=()=>{ const code=btoa(unescape(encodeURIComponent(JSON.stringify(S)))); const ta=$('#code'); ta.value=code;
      const done=()=>$('#msg').textContent='Código copiado. Pégalo en la app desde tu otro dispositivo.';
      try{ navigator.clipboard.writeText(code).then(done,()=>{ta.select();$('#msg').textContent='Selecciona y copia el código del cuadro.';}); }catch(e){ ta.select(); $('#msg').textContent='Selecciona y copia el código del cuadro.'; } };
    $('#imp').onclick=()=>{ try{ const o=JSON.parse(decodeURIComponent(escape(atob($('#code').value.trim())))); if(!o.qs) throw 0; S=Object.assign(blank(),o); save(); $('#msg').textContent='Progreso cargado.'; setTimeout(()=>go('progreso'),600);}catch(e){ $('#msg').textContent='Ese código no es válido. Cópialo completo desde la opción "Copiar código de progreso".'; } };
    let armed=false; $('#rst').onclick=e=>{ if(!armed){armed=true; e.target.textContent='Toca otra vez para confirmar'; return;} S=blank(); save(); go('progreso'); };
  }
}

go('inicio');
})();

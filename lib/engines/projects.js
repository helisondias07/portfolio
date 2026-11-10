/* eslint-disable */
// Coverflow carousel + 'Case em destaque' crossfade engine (ported from r23).
import { dict } from "../i18n/dict";
import { getLang, subscribe } from "../i18n/store";
import { localizeProject } from "../i18n/localize";
import { filterProjectIndexes, isFilterId, isGithubUrl, projectHash, projectIdFromHash, syncFilterButtons } from "../projects/explore";
let started=false;
let applyFilter=null;
export function applyProjectsFilter(f){applyFilter?.(f)}
export function startProjects(base,hooks){
if(started)return;started=true;
hooks=hooks||{};
let P=base.map(p=>localizeProject(p,getLang()));
function ui(){return dict[getLang()].projectsUi}
const cf=document.getElementById('cf'),tr=document.getElementById('cft'),dots=document.getElementById('dots'),cnt=document.getElementById('cnt'),csd=document.getElementById('csd');const N=P.length;let cur=0,L;const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;const pad=n=>String(n).padStart(2,'0');const esc=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;');
function lay(w){if(w<375)return{cw:Math.round(w*.88),vo:0,gap:.86,s1:.72,s2:.5,sy:22,ro:12};if(w<425)return{cw:Math.round(w*.86),vo:0,gap:.84,s1:.72,s2:.5,sy:22,ro:12};if(w<640)return{cw:Math.min(Math.round(w*.84),380),vo:0,gap:.82,s1:.74,s2:.5,sy:24,ro:13};if(w<768)return{cw:Math.min(Math.round(w*.82),560),vo:1,gap:.82,s1:.74,s2:.52,sy:26,ro:14};if(w<1024)return{cw:Math.min(Math.round(w*.78),650),vo:1,gap:.82,s1:.74,s2:.52,sy:28,ro:15};if(w<1240)return{cw:760,vo:2,gap:.64,s1:.66,s2:.48,sy:30,ro:17};if(w<1520)return{cw:Math.min(860,Math.round(w*.6)),vo:2,gap:.64,s1:.66,s2:.48,sy:32,ro:18};return{cw:Math.min(Math.round(w*.5),1000),vo:2,gap:.63,s1:.65,s2:.47,sy:34,ro:18}}
const cards=P.map((p,i)=>{const b=document.createElement('div');b.className='cfc';b.setAttribute('role','button');b.setAttribute('aria-label',ui().select+p.name);const lz=i===0?'loading="eager" fetchpriority="high"':'loading="lazy" decoding="async"';b.innerHTML='<div class="im"><picture><source media="(max-width:767px)" type="image/avif" srcset="/thumbnails/'+p.mimg.replace('.webp','.avif')+'" width="'+p.mw+'" height="'+p.mh+'"><source media="(max-width:767px)" type="image/webp" srcset="/thumbnails/'+p.mimg+'" width="'+p.mw+'" height="'+p.mh+'"><source type="image/avif" srcset="/thumbnails/'+p.img.replace('.webp','.avif')+'" width="'+p.dw+'" height="'+p.dh+'"><img src="/thumbnails/'+p.img+'" width="'+p.dw+'" height="'+p.dh+'" alt="'+esc(ui().preview+p.name)+'" '+lz+'></picture><div class="dim"></div><div class="ov"><div class="ct"></div><h3>'+esc(p.name)+'</h3><div class="vs">'+esc(ui().openCase)+'</div></div></div>';b.onclick=()=>{if(dragged)return;if(off(i)===0){document.getElementById('csd')?.scrollIntoView({behavior:rm?'auto':'smooth',block:'start'});return}const k=F.indexOf(i);if(k>=0)go(k)};b.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target===b){e.preventDefault();b.click()}});tr.appendChild(b);return b});
let F=P.map((_,i)=>i);
function mkDots(){dots.innerHTML='';F.forEach((pi,k)=>{const d=document.createElement('button');d.type='button';d.setAttribute('aria-label',ui().goTo+P[pi].name);d.onclick=()=>go(k);dots.appendChild(d)})}
function paintFilter(next){syncFilterButtons(document.querySelectorAll('.flt2 button'),next);hooks.onFilter?.(next)}
function setFilter(f){const next=isFilterId(f)?f:'*';paintFilter(next);F=filterProjectIndexes(P,next);mkDots();const empty=!F.length;const pe=document.getElementById('pempty');if(pe)pe.hidden=!empty;if(cf)cf.hidden=empty;const nav=document.querySelector('.cfn');if(nav)nav.hidden=empty;if(!empty)go(0);else mkIndex()}
applyFilter=setFilter;
document.querySelectorAll('.flt2 button').forEach(fb=>fb.onclick=()=>setFilter(fb.dataset.f));mkDots();
function off(i){const k=F.indexOf(i),n=F.length;if(k<0)return null;let r=k-cur;if(r>n/2)r-=n;if(r<-n/2)r+=n;return r}
function mkIndex(){document.querySelectorAll('#pix .pixi').forEach(b=>{const pi=P.findIndex(p=>p.id===b.dataset.id);const k=F.indexOf(pi);b.hidden=k<0;b.classList.toggle('on',k===cur);if(k===cur)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current');b.onclick=()=>{if(k>=0)go(k)}})}
function lab(p){const b=p.build;if(!b)return'';const u=ui(),E=esc,bits=[];if(b.problem)bits.push('<div class="czlab-b"><h4>'+E(u.buildProblem)+'</h4><p>'+E(b.problem)+'</p></div>');if(b.approach)bits.push('<div class="czlab-b"><h4>'+E(u.buildApproach)+'</h4><p>'+E(b.approach)+'</p></div>');if(Array.isArray(b.decisions)&&b.decisions.length)bits.push('<div class="czlab-b"><h4>'+E(u.buildDecisions)+'</h4><ul>'+b.decisions.map(x=>'<li>'+E(x)+'</li>').join('')+'</ul></div>');if(Array.isArray(b.learnings)&&b.learnings.length)bits.push('<div class="czlab-b"><h4>'+E(u.buildLearnings)+'</h4><ul>'+b.learnings.map(x=>'<li>'+E(x)+'</li>').join('')+'</ul></div>');return bits.length?'<div class="czlab">'+bits.join('')+'</div>':''}
function render(){const w=innerWidth;L=lay(w);if(w>=1024)L.cw=Math.min(L.cw,Math.round((innerHeight-300)*4/3));cf.style.setProperty('--cw',L.cw+'px');const ih=L.cw*(w<768?4/3:3/4);cf.style.setProperty('--sh',Math.round(ih+L.sy+60)+'px');
 cards.forEach((c,i)=>{const o0=off(i);c.classList.toggle('out',o0===null);const o=o0===null?0:o0;if(o0===null){c.style.transform='translateY(40px) scale(.6)';c.style.zIndex=0;c.classList.remove('on','mob');return}const a=Math.abs(o),act=o===0,vis=a<=Math.max(L.vo,1)&&(a<=L.vo||a===1);const sc=act?1:a===1?L.s1:L.s2;c.style.transform=`translateX(${o*L.cw*L.gap}px) translateY(${act?0:L.sy}px) rotateY(${o*-L.ro}deg) scale(${sc})`;c.style.opacity=(a<=L.vo||act)?1:(L.vo===0&&a===1?.0:0);c.style.zIndex=act?50:10-a;c.style.pointerEvents=(a<=L.vo)?'auto':'none';c.querySelector('.dim').style.opacity=act?0:a===1?.35:.55;c.classList.toggle('on',act);c.tabIndex=act?0:-1});
 [...dots.children].forEach((d,i)=>{d.classList.toggle('on',i===cur);d.setAttribute('aria-current',i===cur?'true':'false')});cnt.textContent=pad(cur+1)+' / '+pad(F.length);mkIndex()}
function detail(){const p=P[F[cur]];if(!p)return;const E=esc,has=a=>Array.isArray(a)?a.length:!!(a&&String(a).trim());const u=ui();
 const host=(p.url||'').replace(/^https?:\/\//,'').replace(/\/$/,'');
 const visit=p.url?(isGithubUrl(p.url)?u.visitRepo:u.visitSite):'';
 let h='<header class="czh"><div>'+(has(p.eyebrow)||has(p.cat)?'<p class="czb">'+[p.eyebrow,p.cat].filter(has).map(E).join(' · ')+'</p>':'')+'<h3>'+E(p.title||p.name)+'</h3>'+(has(p.association)?'<p class="cza">'+E(p.association)+'</p>':'')+'</div>'+(p.url?'<a class="czv" href="'+p.url+'" target="_blank" rel="noopener">'+E(visit)+' <span aria-hidden="true">↗</span></a>':'')+'</header>';
 h+='<div class="czm"><figure class="czd"><div class="czbar"><i></i><i></i><i></i>'+(host?'<span>'+E(host)+'</span>':'')+'</div><picture><source type="image/avif" srcset="/thumbnails/'+p.img.replace('.webp','.avif')+'"><img src="/thumbnails/'+p.img+'" width="'+p.dw+'" height="'+p.dh+'" alt="'+E(p.name+' — '+u.desktop)+'" loading="lazy" decoding="async"></picture></figure>'+(p.mimg?'<figure class="czp"><picture><source type="image/avif" srcset="/thumbnails/'+p.mimg.replace('.webp','.avif')+'"><img src="/thumbnails/'+p.mimg+'" width="'+p.mw+'" height="'+p.mh+'" alt="'+E(p.name+' — '+u.mobile)+'" loading="lazy" decoding="async"></picture></figure>':'')+'</div>';
 h+=lab(p);
 h+='<div class="czg">'+(has(p.overview)?'<div><h4>'+E(u.overview)+'</h4>'+p.overview.map(x=>'<p>'+E(x)+'</p>').join('')+(has(p.resultado)?'<p class="czr">'+E(p.resultado)+'</p>':'')+'</div>':'')+(has(p.contributions)?'<div><h4>'+E(p.contributionsTitle||u.roleFallback)+'</h4><ul>'+p.contributions.map(x=>'<li>'+E(x)+'</li>').join('')+'</ul></div>':'')+'</div>';
 if(has(p.stack))h+='<div class="czs"><h4>'+E(p.stackTitle||'Stack')+'</h4><div class="kc">'+p.stack.map(x=>'<span>'+E(x)+'</span>').join('')+'</div></div>';
 const n=document.createElement('div');n.className='cz';n.innerHTML=h;n.querySelectorAll('img').forEach(im=>{if(im.complete)im.classList.add('ld');else im.addEventListener('load',()=>im.classList.add('ld'),{once:true})});
 const olds=[...csd.querySelectorAll('.cz:not(.lv)')];const h0=csd.offsetHeight;
 olds.forEach(o=>{o.classList.add('lv');o.style.top=o.offsetTop+'px';setTimeout(()=>o.remove(),520)});csd.appendChild(n);
 document.getElementById('cdn').textContent=pad(cur+1)+' / '+pad(F.length)+' · '+p.name;
 if(!olds.length||rm){n.classList.add('in');return}const h1=n.offsetHeight;csd.style.height=h0+'px';void csd.offsetHeight;
 requestAnimationFrame(()=>{csd.style.height=h1+'px';n.classList.add('in')});clearTimeout(csd._t);csd._t=setTimeout(()=>{csd.style.height=''},540);
 type2(cards[F[cur]].querySelector('.ct'),p.cat)}
let t2=0;function type2(el,t){if(!el)return;clearInterval(t2);if(rm){el.textContent=t;return}let k=0;el.textContent='';t2=setInterval(()=>{el.textContent=t.slice(0,++k);if(k>=t.length)clearInterval(t2)},32)}
function syncHash(){const p=P[F[cur]];if(!p)return;const next=projectHash(p.id);const h=location.hash;if(!h||h==='#projetos'||h.startsWith('#projetos/')){if(h!==next)history.replaceState(null,'',next)}}
function go(i){const n=F.length;if(!n)return;cur=((i%n)+n)%n;render();detail();syncHash()}
function applyHash(){const id=projectIdFromHash(location.hash,P.map(p=>p.id));if(!id)return false;const pi=P.findIndex(p=>p.id===id);if(pi<0)return false;if(!F.includes(pi)){paintFilter('*');F=filterProjectIndexes(P,'*');mkDots();const pe=document.getElementById('pempty');if(pe)pe.hidden=true;if(cf)cf.hidden=false;const nav=document.querySelector('.cfn');if(nav)nav.hidden=false}const k=F.indexOf(pi);if(k<0)return false;cur=k;render();detail();return true}
function kp(id){const b=document.getElementById(id);if(!b)return;b.classList.add('kp');setTimeout(()=>b.classList.remove('kp'),140)}
['cfl','cfl2'].forEach(id=>document.getElementById(id).onclick=()=>{kp(id);go(cur-1)});['cfr','cfr2'].forEach(id=>document.getElementById(id).onclick=()=>{kp(id);go(cur+1)});
cf.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();go(cur-1)}else if(e.key==='ArrowRight'){e.preventDefault();go(cur+1)}else if(e.key==='Home'){e.preventDefault();go(0)}else if(e.key==='End'){e.preventDefault();go(F.length-1)}});
let sx=null,dragged=false;cf.addEventListener('pointerdown',e=>{if(e.target.closest('.cfa'))return;sx=e.clientX;dragged=false});addEventListener('pointerup',e=>{if(sx==null)return;const dx=e.clientX-sx;sx=null;if(Math.abs(dx)>40){dragged=true;go(cur+(dx<0?1:-1));setTimeout(()=>dragged=false,50)}});
let rz;addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(render,80)});
addEventListener('hashchange',()=>{applyHash()});
if(!applyHash())go(0);
function applyCard(b,p){const u=ui();b.setAttribute('aria-label',u.select+p.name);const img=b.querySelector('img');if(img)img.alt=u.preview+p.name;const vs=b.querySelector('.vs');if(vs)vs.textContent=u.openCase}
subscribe(()=>{P=base.map(p=>localizeProject(p,getLang()));cards.forEach((b,i)=>applyCard(b,P[i]));const fbtn=document.querySelector('.flt2 button.on');const f=isFilterId(fbtn&&fbtn.dataset.f)?fbtn.dataset.f:'*';paintFilter(f);F=filterProjectIndexes(P,f);if(cur>=F.length)cur=0;mkDots();if(F.length)go(cur);else mkIndex()});
}

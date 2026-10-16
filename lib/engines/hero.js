/* eslint-disable */
// Imperative hero engine (typing intro, terminal, phone/tablet chat, physical-keyboard reaction).
// Ported 1:1 from the r23 preview; React owns the markup, this module only animates it.
// three.js is loaded lazily (dynamic import) only at >=1024px, after window load + idle.
let started=false;
export function startHero(){
if(started)return;started=true;

window.KB_FIT=[.84,.9];window.KB_FIT2=[.5,.8];window.KB_SHIFT=.2;
window.vLoop=async function(){const W=ms=>new Promise(r=>setTimeout(r,ms));const bd=document.getElementById('tbd');
 await W(700);
 for(const ch of TYPE){while(mode!=='kb')await W(400);press(codeOf(ch));txt+=ch;show();const r=(Math.random()+Math.random())/2;await W(ch===' '?150+r*80:72+r*60)}
 await W(1300);for(const c in lit){setOn(c,false);delete lit[c]}
 await new Promise(res=>{const t0=performance.now(),D=1200;const f=t=>{const k=Math.min(1,(t-t0)/D);const e=k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;window.K3&&K3.view&&K3.view(e);if(k<1)requestAnimationFrame(f);else res()};requestAnimationFrame(f)});
 document.querySelector('.term').classList.add('on');
 const P='helison ~ %';
 const CMDS=[['sobreMim',[['','Helison Dias'],['','Desenvolvedor Frontend e Automação com IA'],['','Nova Friburgo, RJ — Remoto']]],
 ['exp',[['jan/2025 – atual  ','Dev Frontend Júnior · Agência Oásis'],['abr/2024 – jan/2025','  Estagiário Frontend · Agência Oásis'],['','→ 10+ lojas Wake em produção']]],
 ['stack',[['frontend  ','React · Next.js · Vue.js · TypeScript · Tailwind'],['e-commerce','  Wake · Scriban · Nuvemshop'],['ia        ','Claude Code · Codex CLI · N8N'],['testes    ','Jest · RTL · Vitest · Playwright']]],
 ['contato',[['email     ','helisondias07@gmail.com'],['linkedin  ','linkedin.com/in/helisondias'],['github    ','github.com/helisondias07']]]];
 const line=(html)=>{const d=document.createElement('div');d.className='tln';d.innerHTML=html;bd.appendChild(d);bd.scrollTop=bd.scrollHeight;return d};
 const esc=t=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;');
 await W(900);
 for(const [cmd,out] of CMDS){while(mode!=='kb')await W(400);const L=line('<span class="tp">'+P+'</span> <span class="tv tc"></span><span class="tcur"></span>');const c=L.querySelector('.tc');
  for(const ch of cmd){press(codeOf(ch));c.textContent+=ch;const r=(Math.random()+Math.random())/2;await W(85+r*70)}
  await W(260);press('Enter');L.querySelector('.tcur').remove();await W(160);
  const kw=Math.max(...out.map(x=>x[0].trim().length));for(const [k,v] of out){line(k.trim()?'<span class="tk2">'+esc(k.trim().padEnd(kw))+'</span><span class="tv">'+esc(v.trim())+'</span>':'<span class="tv">'+esc(v.trim())+'</span>');await W(110)}
  bd.scrollTop=bd.scrollHeight;{const sp=line('');sp.classList.add('sp')}for(const c2 in lit){setOn(c2,false);delete lit[c2]}await W(900)}
 line('<span class="tp">'+P+'</span> <span class="tcur"></span>');document.body.dataset.done=1};


const TYPE='helison dias, dev frontend & ia engineer',HEAD=TYPE;
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const stage=document.getElementById('stage'),hl=document.getElementById('hl');
const K=(l,c,w)=>({l,c:c||('Key'+l.toUpperCase()),w:w||1});
const L=s=>s.split('').map(ch=>K(ch.toUpperCase(),'Key'+ch.toUpperCase()));
const D=s=>s.split('').map(ch=>K(ch,'Digit'+ch));
const SP=w=>({sp:1,w});
const MAIN=[
 [K('Esc','Escape'),SP(1),...[1,2,3,4].map(n=>K('F'+n,'F'+n)),SP(.5),...[5,6,7,8].map(n=>K('F'+n,'F'+n)),SP(.5),...[9,10,11,12].map(n=>K('F'+n,'F'+n))],
 [K('`','Backquote'),...D('1234567890'),K('-','Minus'),K('=','Equal'),K('⌫','Backspace',2)],
 [K('Tab','Tab',1.5),...L('qwertyuiop'),K('[','BracketLeft'),K(']','BracketRight'),K('\\','Backslash',1.5)],
 [K('Caps','CapsLock',1.75),...L('asdfghjkl'),K(';','Semicolon'),K("'",'Quote'),K('Enter','Enter',2.25)],
 [K('Shift','ShiftLeft',2.25),...L('zxcvbnm'),K(',','Comma'),K('.','Period'),K('/','Slash'),K('Shift','ShiftRight',2.75)],
 [K('Ctrl','ControlLeft',1.25),K('Win','MetaLeft',1.25),K('Alt','AltLeft',1.25),K('','Space',6.25),K('Alt','AltRight',1.25),K('Fn','Fn',1.25),K('Menu','ContextMenu',1.25),K('Ctrl','ControlRight',1.25)]];
const NAV=[[K('PrtSc','PrintScreen'),K('ScrLk','ScrollLock'),K('Pause','Pause')],[K('Ins','Insert'),K('Home','Home'),K('PgUp','PageUp')],[K('Del','Delete'),K('End','End'),K('PgDn','PageDown')],[SP(1)],[SP(1),K('↑','ArrowUp'),SP(1)],[K('←','ArrowLeft'),K('↓','ArrowDown'),K('→','ArrowRight')]];
const NUM=[[SP(1),SP(1),SP(1),SP(1)],[K('Num','NumLock'),K('/','NumpadDivide'),K('*','NumpadMultiply'),K('-','NumpadSubtract')],[K('7','Numpad7'),K('8','Numpad8'),K('9','Numpad9'),K('+','NumpadAdd')],[K('4','Numpad4'),K('5','Numpad5'),K('6','Numpad6'),SP(1)],[K('1','Numpad1'),K('2','Numpad2'),K('3','Numpad3'),K('↵','NumpadEnter')],[K('0','Numpad0',2),K('.','NumpadDecimal'),SP(1)]];
const OSK_PH=[L('qwertyuiop'),L('asdfghjkl'),[K('⇧','ShiftLeft',1.4),...L('zxcvbnm'),K('⌫','Backspace',1.4)],[K('123','Digit1',1.6),K(',','Comma'),K('espaço','Space',5),K('.','Period'),K('↵','Enter',1.8)]];
const OSK_TAB=[[...L('qwertyuiop'),K('⌫','Backspace',1.5)],[...L('asdfghjkl'),K('↵','Enter',1.9)],[K('⇧','ShiftLeft',1.4),...L('zxcvbnm'),K(',','Comma'),K('.','Period'),K('⇧','ShiftRight',1.4)],[K('123','Digit1',1.6),K('🌐','Fn',1.2),K('espaço','Space',6.4),K('123','Digit2',1.6)]];

OSK_PH[3]=[K('123','Digit1',1.5),K('🙂','Fn',1.1),K('espaço','Space',4.6),K(',','Comma'),K('↵','Enter',1.8)];
window.KB3build=()=>{mode='';build()};let by={},mode='',bubble=null,txt='',lit={},hue=0,cyc=false;
function rowEl(r,gap,x0){const d=document.createElement('div');d.className='row'+(gap?' gap':'');let x=x0||0;r.forEach(k=>{const e=document.createElement('div');e.className='k'+(k.sp?' sp':'');e.style.setProperty('--w',k.w);e.style.setProperty('--dl',(-x*.18)+'s');x+=k.w;if(!k.sp){e.innerHTML='<b></b><i>'+k.l+'</i>';(by[k.c]=by[k.c]||[]).push(e)}d.appendChild(e)});return d}
function blk(rows,x0){const b=document.createElement('div');b.className='blk';rows.forEach((r,i)=>b.appendChild(rowEl(r,i==0,x0)));return b}
function fitOsk(){const o=stage.querySelector('.osk');if(!o)return;const n=mode==='tab'?11.6:10.6;o.style.setProperty('--ku',((o.clientWidth-8)/(n*1.16))+'px')}
function build(){const w=innerWidth,m=w>=1024?'kb':w>=768?'tab':'ph';if(m!=='kb'){if(mode!==m){mode=m;buildChat(m)}else fitOsk();return}if(mode==='ph'||mode==='tab'){document.getElementById('hero').classList.remove('g3')}if(!window.KB3init&&!window.__glFail){return}if(m===mode){fitOsk();return}mode=m;by={};stage.innerHTML='';
 if(window.K3){K3.dispose();window.K3=null}
 if(window.KB3init&&!window.__glFail){const c=document.createElement('div');c.className='kb3';stage.appendChild(c);document.getElementById('hero').classList.add('g3');try{window.K3=KB3init(c,m,{MAIN,NAV,NUM,OSK_TAB,OSK_PH});K3.text(txt)}catch(err){console.warn(err);window.KB3init=null;window.__glFail=true;stage.innerHTML='';document.getElementById('hero').classList.remove('g3');mode='';return build()}hint(m==='kb'?'Digite no seu teclado':m==='tab'?'Tablet · teclado aberto':'Celular · teclado aberto')}
 else if(m==='kb'){const kb=document.createElement('div');kb.className='kb';kb.id='kb';kb.innerHTML='<span class="refl"></span>';kb.append(blk(MAIN,0),blk(NAV,15.5),blk(NUM,19));stage.appendChild(kb);hint('Digite no seu teclado')}
 else{const d=document.createElement('div');d.className='dev '+m;d.innerHTML='<div class="bz"><span class="isl"></span><div class="scr"><div class="sb"><span>9:41</span><span>●●● 5G ▮</span></div><div class="app"><small>Helison · agora</small><div class="bub"><span class="tx"></span><span class="car"></span></div></div><div class="osk"></div></div></div>';
  const o=d.querySelector('.osk');(m==='tab'?OSK_TAB:OSK_PH).forEach(r=>o.appendChild(rowEl(r)));if(m==='ph'){const h=document.createElement('div');h.className='hbar';o.appendChild(h)}stage.appendChild(d);hint(m==='tab'?'Tablet · teclado aberto':'Celular · teclado aberto');fitOsk()}
 bubble=stage.querySelector('.tx');restore()}

const cw=ms=>new Promise(r=>setTimeout(r,ms));
const MSGS=['Helison Dias','Desenvolvedor Frontend & Automação com IA','2 anos e 6 meses de experiência, desde abr/2024 na Agência Oásis','React','Next.js','Vue.js','TypeScript','Tailwind CSS','Wake Platform','Nuvemshop','N8N','Claude Code','Codex CLI'];
let chatBy={},sent=[],chatInput='',chatStarted=false;
function hhmm(){const d=new Date();return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')}
function buildChat(kind){if(window.K3){K3.dispose();window.K3=null}stage.innerHTML='';document.getElementById('hero').classList.add('g3');by={};
 const d=document.createElement('div');d.className='dev chat'+(kind==='tab'?' tabc':'');d.innerHTML='<div class="bz"><span class="isl"></span><div class="scr"><div class="sb"><span>'+hhmm()+'</span><span>●●● 5G ▮</span></div><div class="ch-h"><span class="av">HD</span><div><b>Helison Dias</b><small>online</small></div></div><div class="msgs" id="msgs"></div><div class="ch-in"><div class="fld" id="fld"></div><span class="snd" id="snd">↑</span></div><div class="osk"></div></div></div>';
 const o=d.querySelector('.osk');(kind==='tab'?OSK_TAB:OSK_PH).forEach(r=>o.appendChild(rowEl(r)));const h=document.createElement('div');h.className='hbar';o.appendChild(h);stage.appendChild(d);chatBy=by;by={};fitOsk();
 const m=d.querySelector('#msgs');m.innerHTML='<div class="sp0"></div>';sent.forEach(x=>m.appendChild(bubbleEl(x,true)));m.scrollTop=m.scrollHeight;renderInput();hint(kind==='tab'?'Tablet · conversa':'Celular · conversa');if(!chatStarted){chatStarted=true;runChat()}}
function bubbleEl(x,static_){const b=document.createElement('div');b.className='msg';if(static_)b.style.animation='none';b.innerHTML='<span></span><div class="mt">'+x.t+' <span class="tk'+(x.st>1?' rd':'')+'">'+(x.st?'✓✓':'✓')+'</span></div>';b.firstChild.textContent=x.s;x.el=b;return b}
function renderInput(){const f=document.getElementById('fld');if(!f)return;f.innerHTML=chatInput?'':'<span class="ph">Mensagem</span>';if(chatInput){const t=document.createElement('span');t.textContent=chatInput;f.appendChild(t);f.scrollLeft=1e4}if(chatInput||true){const c=document.createElement('span');c.className='car';f.appendChild(c)}const s=document.getElementById('snd');s&&s.classList.toggle('on',!!chatInput)}
function ckey(ch){const c=ch===' '?'Space':ch===','?'Comma':ch==='.'?'Period':/[a-z]/i.test(ch)?'Key'+ch.toUpperCase():null;const els=c&&chatBy[c];if(!els)return;els.forEach(e=>{e.classList.add('on','dn');setTimeout(()=>e.classList.remove('dn'),90);clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('on'),260)})}
async function runChat(){const RMc=matchMedia('(prefers-reduced-motion: reduce)').matches;await cw(RMc?0:700);
 for(const s of MSGS){if(!RMc){for(const ch of s){chatInput+=ch;renderInput();ckey(ch);const r=(Math.random()+Math.random())/2;await cw(ch===' '?95+r*60:42+r*48)}await cw(220);const sb=document.getElementById('snd');sb&&sb.classList.add('go');await cw(120);sb&&sb.classList.remove('go')}
  const x={s,t:hhmm(),st:0};sent.push(x);chatInput='';renderInput();const m=document.getElementById('msgs');if(m){const near=m.scrollHeight-m.scrollTop-m.clientHeight<80;m.appendChild(bubbleEl(x,RMc));if(near)m.scrollTo({top:m.scrollHeight,behavior:RMc?'auto':'smooth'})}
  if(RMc){x.st=2;x.el.querySelector('.tk').classList.add('rd');x.el.querySelector('.tk').textContent='✓✓';continue}
  setTimeout(()=>{x.st=1;const t=x.el.querySelector('.tk');t.textContent='✓✓'},380);setTimeout(()=>{x.st=2;x.el.querySelector('.tk').classList.add('rd')},900);await cw(s.length>20?520:380)}
 await cw(950);document.body.dataset.chatdone=1}
function hint(t){document.getElementById('hint').textContent=t}
function codeOf(ch){if(ch==='&')return'Digit7';if(ch===' ')return'Space';if(ch===',')return'Comma';return'Key'+ch.toUpperCase()}
function tap(code,h){if(mode!=='kb')return;window.K3&&K3.tap(code);(by[code]||[]).forEach(e=>{if(h!=null)e.style.setProperty('--h',h);e.classList.add('dn');setTimeout(()=>e.classList.remove('dn'),120)})}
function setOn(code,on,h,lvl){if(mode!=='kb')return;window.K3&&K3.setOn(code,on,h,lvl);(by[code]||[]).forEach(e=>{if(h!=null)e.style.setProperty('--h',h);e.classList.toggle('on',on)});const kb=document.getElementById('kb');if(kb&&h!=null)kb.style.setProperty('--rgb','hsl('+h+' 100% 60%)')}
function press(code){hue=120;lit[code]=hue;setOn(code,true,hue);tap(code)}
function restore(){for(const c in lit)setOn(c,true,lit[c]);if(bubble)bubble.textContent=txt;stage.firstChild&&stage.firstChild.classList.toggle('cyc',cyc)}
function setHL(n){hl.textContent=HEAD.slice(0,n);document.getElementById('hlr').textContent=HEAD.slice(n)}
function show(){window.K3&&K3.text(txt);if(bubble)bubble.textContent=txt;setHL(Math.round(txt.length*HEAD.length/TYPE.length))}
build();addEventListener('resize',build);(function wd(){setTimeout(()=>{if(innerWidth<1024||window.__3dStart==null)return wd();if(!window.KB3init&&!window.__glFail&&performance.now()-window.__3dStart>12000){window.__glFail=true;mode='';build()}else if(!window.KB3init&&!window.__glFail)wd()},2000)})();
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function loop(){await wait(700);for(;;){
 while(mode!=='kb')await wait(400);
 for(const ch of TYPE){press(codeOf(ch));txt+=ch;show();const r=(Math.random()+Math.random()+Math.random())/3;await wait(ch===' '?150+r*90:ch===','?210+r*80:72+r*70)}
 for(const c in lit)setOn(c,true,120,.55);cyc=true;stage.firstChild&&stage.firstChild.classList.add('cyc');document.body.dataset.done=1;await wait(3200);cyc=false;stage.firstChild&&stage.firstChild.classList.remove('cyc');
 while(txt.length){const ch=txt.slice(-1);txt=txt.slice(0,-1);setOn('Backspace',true,0);tap('Backspace');const c=codeOf(ch);if(!txt.includes(ch)){setOn(c,false);delete lit[c]}show();await wait(Math.max(34,62-(TYPE.length-txt.length)*1.4))}
 setOn('Backspace',false);setHL(0);await wait(900);hue=0}}
if(RM){for(const ch of TYPE){hue=120;lit[codeOf(ch)]=hue}txt=TYPE;restore();show();document.body.dataset.done=1}else (window.vLoop||loop)();
addEventListener('keydown',e=>{if(e.repeat||mode!=='kb'||innerWidth<1024||!document.body.dataset.done||matchMedia('(hover:none)').matches)return;if(!by[e.code]&&!(window.K3&&K3.has(e.code)))return;tap(e.code);if(lit[e.code]==null){setOn(e.code,true,120);clearTimeout(phys[e.code]);phys[e.code]=setTimeout(()=>{if(lit[e.code]==null)setOn(e.code,false)},150)}},{passive:true});const phys={};
addEventListener('keydown',e=>{if(window.K3&&mode==='kb'){/*handled via setOn*/}});
stage.addEventListener('pointerdown',e=>{const k=e.target.closest('.k');if(!k)return;k.classList.add('on','dn');setTimeout(()=>k.classList.remove('dn'),120)});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.rv').forEach(e=>io.observe(e));

bootKB3();
}
async function bootKB3(){

await new Promise(r=>{const ok=()=>innerWidth>=1024;const go=()=>(window.requestIdleCallback?requestIdleCallback(()=>r(),{timeout:900}):setTimeout(r,200));if(ok()){if(document.readyState==='complete')go();else addEventListener('load',go,{once:true})}else{const f=()=>{if(ok()){removeEventListener('resize',f);r()}};addEventListener('resize',f)}});
window.__3dStart=performance.now();const [THREE,{RoundedBoxGeometry}]=await Promise.all([import('three'),import('three/addons/geometries/RoundedBoxGeometry.js')]);window.__3dLoaded=performance.now();
function glOK(){try{const c=document.createElement('canvas');const g=c.getContext('webgl2')||c.getContext('webgl');if(!g)return false;const x=g.getExtension('WEBGL_debug_renderer_info');const r=x?String(g.getParameter(x.UNMASKED_RENDERER_WEBGL)):'';window.__swGL=/swiftshader|llvmpipe|softpipe|software/i.test(r);return true}catch(e){return false}}
if(glOK()){await document.fonts.ready;window.KB3init=init;KB3build()}else{window.__glFail=true;KB3build()}
const GREEN=new THREE.Color('#44D62C');
function rr(w,h,r){const s=new THREE.Shape();s.moveTo(-w/2+r,-h/2);s.lineTo(w/2-r,-h/2);s.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);s.lineTo(w/2,h/2-r);s.quadraticCurveTo(w/2,h/2,w/2-r,h/2);s.lineTo(-w/2+r,h/2);s.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);s.lineTo(-w/2,-h/2+r);s.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);return s}
function radial(stops){const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');const g=x.createRadialGradient(64,64,0,64,64,64);stops.forEach(([o,a])=>g.addColorStop(o,'rgba(255,255,255,'+a+')'));x.fillStyle=g;x.fillRect(0,0,128,128);return new THREE.CanvasTexture(c)}
function init(host,kind,L){
const mobile=kind!=='kb',tab=kind==='tab';
const R=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
R.setPixelRatio(window.__swGL?Math.min(devicePixelRatio,1)*.8:Math.min(devicePixelRatio,1.5));R.outputColorSpace=THREE.SRGBColorSpace;R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.1;host.appendChild(R.domElement);
const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(26,1,.1,300);
S.add(new THREE.HemisphereLight(0xffffff,0x8a8880,1.25));
const D=new THREE.DirectionalLight(0xffffff,2.2);D.position.set(-10,22,12);S.add(D);
const rim=new THREE.DirectionalLight(0xdfe8ff,1.1);rim.position.set(14,6,-12);S.add(rim);
const G=new THREE.Group();S.add(G);const KB=new THREE.Group();G.add(KB);
// legend atlas
const AC=document.createElement('canvas');AC.width=2048;AC.height=2048;const ax=AC.getContext('2d');ax.fillStyle='#000';ax.fillRect(0,0,2048,2048);let ai=0;const CW=340,CH=128;
const atlas=new THREE.CanvasTexture(AC);atlas.anisotropy=R.capabilities.getMaxAnisotropy();atlas.generateMipmaps=true;atlas.minFilter=THREE.LinearMipmapLinearFilter;
function legendCell(l,w,center){const col=ai%6,row=Math.floor(ai/6);ai++;const x0=col*CW+2,y0=row*CH+2,pw=Math.min(CW-4,Math.round((CH-4)*w)),ph=CH-4;ax.save();ax.beginPath();ax.rect(x0,y0,pw,ph);ax.clip();ax.fillStyle='#fff';const one=[...l].length==1;
 ax.font=(one?'700 60px':'600 32px')+' "JetBrains Mono",monospace';ax.textBaseline='middle';if(one||center){ax.textAlign='center';ax.fillText(one?l:l.toLowerCase(),x0+pw/2,y0+ph/2+2)}else{ax.textAlign='left';ax.fillText(l.toLowerCase(),x0+16,y0+36)}const sub=!center&&window.KEYSUB&&window.KEYSUB[l];if(sub){ax.font='600 19px "JetBrains Mono",monospace';ax.textAlign='center';ax.fillText(sub,x0+pw/2,y0+ph-14)}ax.restore();
 return {u:x0/2048,v:1-(y0+ph)/2048,su:pw/2048,sv:ph/2048,aspect:pw/ph}}
// ---- key specs ----
const specs=[];let pitch=1,capH,capY,depth,keyD,glowW,glowH,ly,legScale;
let tk=null,screen=null,strip=null,fitFrac=[.9,.9],dir,parent=KB;
if(kind==='kb'){
 const rows=L.MAIN.slice(1);const W=15,H=5;
 rows.forEach((r,ri)=>{let x=0;r.forEach(k=>{const w=k.w||1;if(!k.sp)specs.push({k,w,x:x+w/2-W/2,z:ri+.5-H/2});x+=w})});
 capH=.62;capY=.74;depth=.26;keyD=1-.16;glowW=1.1;glowH=2.0;ly=.315;legScale=.88;
 // case + plate
 const plate=new THREE.Mesh(new THREE.BoxGeometry(W+.3,.1,H+.4),new THREE.MeshStandardMaterial({color:0x1d1e21,roughness:.35,metalness:.7}));plate.position.y=-.05;KB.add(plate);
 const cg=new THREE.ExtrudeGeometry(rr(W+1.0,H+1.1,.45),{depth:.9,bevelEnabled:true,bevelThickness:.3,bevelSize:.3,bevelSegments:1,curveSegments:5});cg.rotateX(-Math.PI/2);
 const cs=new THREE.Mesh(cg,new THREE.MeshStandardMaterial({color:0x111214,roughness:.45,metalness:.55}));cs.position.y=-1.1;KB.add(cs);
 strip=new THREE.Mesh(new THREE.BoxGeometry(W+1.25,.05,H+1.35),new THREE.MeshBasicMaterial({color:0,toneMapped:false}));strip=null;
 const sh=new THREE.Mesh(new THREE.PlaneGeometry(W*1.5,H*2.4),new THREE.MeshBasicMaterial({map:radial([[0,.5],[.5,.25],[1,0]]),color:0x000000,transparent:true,depthWrite:false}));sh.rotation.x=-Math.PI/2;sh.position.y=-2.1;sh.material.opacity=.55;G.add(sh);
 KB.rotation.set(0,0,0);dir=new THREE.Vector3(0,.78,.62).normalize();fitFrac=window.KB_FIT||[.9,.9];
}else{
 const BW=tab?14:5.2,BH=tab?10:10.8,BR=tab?.9:.85,TH=tab?.42:.46,bz=tab?.45:.22;
 const body=new THREE.Mesh(new THREE.ExtrudeGeometry(rr(BW,BH,BR),{depth:TH,bevelEnabled:true,bevelThickness:.06,bevelSize:.06,bevelSegments:2,curveSegments:8}),new THREE.MeshStandardMaterial({color:0x2b2d31,roughness:.35,metalness:.75}));body.position.z=-TH;KB.add(body);
 const SW=BW-bz*2,SH=BH-bz*2;const sg=new THREE.ShapeGeometry(rr(SW,SH,Math.max(.1,BR-bz)),8);const uv=sg.attributes.uv,pp=sg.attributes.position;for(let i=0;i<uv.count;i++)uv.setXY(i,pp.getX(i)/SW+.5,pp.getY(i)/SH+.5);
 const bezel=new THREE.Mesh(new THREE.ShapeGeometry(rr(BW-.02,BH-.02,BR),8),new THREE.MeshStandardMaterial({color:0x050506,roughness:.2,metalness:.1}));bezel.position.z=.061;KB.add(bezel);
 const sc=document.createElement('canvas');const SCW=tab?1600:600;sc.width=SCW;sc.height=Math.round(SCW*SH/SW);const stex=new THREE.CanvasTexture(sc);stex.colorSpace=THREE.SRGBColorSpace;stex.anisotropy=4;
 const scr=new THREE.Mesh(sg,new THREE.MeshBasicMaterial({map:stex,toneMapped:false}));scr.position.z=.07;KB.add(scr);
 if(!tab){const isl=new THREE.Mesh(new THREE.ShapeGeometry(rr(1.5,.42,.21),6),new THREE.MeshBasicMaterial({color:0}));isl.position.set(0,SH/2-.42,.075);KB.add(isl)}
 else{const cam=new THREE.Mesh(new THREE.CircleGeometry(.07,12),new THREE.MeshBasicMaterial({color:0x1a2533}));cam.position.set(0,BH/2-bz/2,.07);KB.add(cam)}
 const rows=tab?L.OSK_TAB:L.OSK_PH;const units=Math.max(...rows.map(r=>r.reduce((a,k)=>a+(k.w||1),0)));
 const kbFrac=tab?.4:.36;const kbH=SH*kbFrac;const rowsN=rows.length;const padB=tab?.35:.55,padT=tab?.22:.18;
 pitch=(SW-(tab?.5:.2))/units;const slot=(kbH-padB-padT)/rowsN;const kh=Math.min(pitch*1.15,slot*.8),rowGap=slot-kh;
 const kbTop=-SH/2+kbH;screen={sx:sc.getContext('2d'),stex,W:sc.width,H:sc.height,kbFrac,tab};
 const KG=new THREE.Group();KG.rotation.x=Math.PI/2;KG.position.z=.075;KB.add(KG);parent=KG;
 if(tab){tk=[];const W2=sc.width,H2=sc.height,kbY=H2*(1-kbFrac),m=W2*.008,pp=(W2-m*2)/units,slot=(H2-kbY-m*3)/rowsN;rows.forEach((r,ri)=>{const tw=r.reduce((a,k)=>a+(k.w||1),0);let x=(W2-tw*pp)/2;r.forEach(k=>{const w=k.w||1;tk.push({k,code:k.c,x:x+pp*.06,y:kbY+m*1.8+ri*slot+slot*.08,w:w*pp-pp*.12,h:slot*.84,on:0,tgt:0,t:-1e9,p:0,sp:!(k.l.length==1&&/[a-z]/i.test(k.l))});x+=w*pp})})}
 if(!tab)rows.forEach((r,ri)=>{const tw=r.reduce((a,k)=>a+(k.w||1),0);let x=-tw*pitch/2;const y=kbTop-padT-ri*(kh+rowGap)-kh/2;r.forEach(k=>{const w=k.w||1;specs.push({k,w,x:x+w*pitch/2,z:-y});x+=w*pitch})});
 capH=.06;capY=.035;depth=.03;keyD=kh;glowW=pitch*.9;glowH=kh+pitch*.8;ly=.031;legScale=kh*.72;
 if(tab){KB.rotation.set(-.26,.2,.03)}else{KB.rotation.set(-.3,.3,.07)}dir=new THREE.Vector3(0,.05,1).normalize();fitFrac=tab?[.88,.9]:[.82,.94];
}
// ---- instanced keys ----
const N=specs.length;const keys=[],byCode={};
const capMat=new THREE.MeshStandardMaterial({color:mobile?0x2a2b30:0x0f1012,roughness:mobile?.45:.62,metalness:.08});
capMat.onBeforeCompile=sh=>{sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying float vLy;').replace('#include <begin_vertex>','#include <begin_vertex>\nvLy=position.y;');
 sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying float vLy;').replace('#include <color_fragment>','').replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\n#ifdef USE_COLOR\ntotalEmissiveRadiance=vColor*pow(1.0-smoothstep('+(-capH/2).toFixed(3)+','+(capH*.3).toFixed(3)+',vLy),2.0);\n#endif')};
const byW={};specs.forEach((s,i)=>{(byW[s.w]=byW[s.w]||[]).push(i)});
const capMeshes=[];
const mkCap=w=>{const ww=(mobile?w*pitch-pitch*.14:w-.16);const g=new RoundedBoxGeometry(ww,capH,keyD,mobile?1:2,mobile?.02:.08);if(!mobile){const p=g.attributes.position;for(let i=0;i<p.count;i++){const y=p.getY(i);const t=(y+capH/2)/capH;p.setX(i,p.getX(i)*(1-(.14/w)*t));p.setZ(i,p.getZ(i)*(1-.14*t))}g.computeVertexNormals()}return g};
for(const w in byW){const idx=byW[w];const im=new THREE.InstancedMesh(mkCap(+w),capMat,idx.length);im.instanceColor=new THREE.InstancedBufferAttribute(new Float32Array(idx.length*3),3);im.instanceColor.setUsage(THREE.DynamicDrawUsage);im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);parent.add(im);capMeshes.push(im);idx.forEach((si,j)=>{specs[si].cm=im;specs[si].cj=j})}
// legends (one instanced plane, per-instance uv rect), depth-tested
const legGeo=new THREE.PlaneGeometry(1,1);legGeo.rotateX(-Math.PI/2);const iUv=new Float32Array(N*4);
const legMat=new THREE.MeshBasicMaterial({alphaMap:atlas,transparent:true,toneMapped:false,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2});
legMat.onBeforeCompile=sh=>{sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nattribute vec4 iUv;').replace('#include <uv_vertex>','#include <uv_vertex>\nvAlphaMapUv=uv*iUv.zw+iUv.xy;')};
const legIM=new THREE.InstancedMesh(legGeo,legMat,N);legIM.instanceColor=new THREE.InstancedBufferAttribute(new Float32Array(N*3),3);legIM.instanceColor.setUsage(THREE.DynamicDrawUsage);legIM.instanceMatrix.setUsage(THREE.DynamicDrawUsage);legIM.renderOrder=2;parent.add(legIM);
// glow (additive, on plate) + switches (static)
const glowIM=new THREE.InstancedMesh((()=>{const g=new THREE.PlaneGeometry(1,1);g.rotateX(-Math.PI/2);return g})(),new THREE.MeshBasicMaterial({map:radial([[0,1],[.35,.45],[1,0]]),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false}),N);
glowIM.instanceColor=new THREE.InstancedBufferAttribute(new Float32Array(N*3),3);glowIM.instanceColor.setUsage(THREE.DynamicDrawUsage);parent.add(glowIM);
let swIM=null,stIM=null;const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),V=new THREE.Vector3(),SC=new THREE.Vector3();
if(!mobile){swIM=new THREE.InstancedMesh(new THREE.BoxGeometry(.6,.3,.6),new THREE.MeshStandardMaterial({color:0x34363b,roughness:.3,metalness:.2,emissive:0x0c0d0e}),N);stIM=new THREE.InstancedMesh(new THREE.BoxGeometry(.14,.3,.14),new THREE.MeshStandardMaterial({color:0x9aa0a8,roughness:.3,metalness:.6}),N);parent.add(swIM,stIM)}
const lc0=mobile?new THREE.Color(0xd7d8de):new THREE.Color(0x9a9ca4),lcOn=new THREE.Color('#b8ffa8');
specs.forEach((s,i)=>{const cell=legendCell(s.k.l,s.w,mobile);iUv.set([cell.u,cell.v,cell.su,cell.sv],i*4);
 const lw=Math.min(cell.aspect*legScale,(mobile?s.w*pitch*.86:s.w-.3)),lh=lw/cell.aspect;s.lw=lw;s.lh=lh;
 if(swIM){M.makeTranslation(s.x,.15,s.z);swIM.setMatrixAt(i,M);M.makeTranslation(s.x,.42,s.z);stIM.setMatrixAt(i,M)}
 M.compose(V.set(s.x,mobile?.004:.06,s.z),Q.identity(),SC.set(mobile?s.w*pitch+glowW:s.w+glowW,1,glowH));glowIM.setMatrixAt(i,M);glowIM.setColorAt(i,new THREE.Color(0));
 const o={i,s,code:s.k.c,on:0,tgt:0,t:-1e9,y:0,dirty:true};keys.push(o);(byCode[o.code]=byCode[o.code]||[]).push(o)});
legGeo.setAttribute('iUv',new THREE.InstancedBufferAttribute(iUv,4));if(tk)for(const k of tk)(byCode[k.code]=byCode[k.code]||[]).push(k);
// ---- screen texture ----
let curTxt='',caretOn=true,lastCaret=0,sdirty=true;
function rrect(x,X,Y,w,h,r){x.beginPath();x.moveTo(X+r,Y);x.arcTo(X+w,Y,X+w,Y+h,r);x.arcTo(X+w,Y+h,X,Y+h,r);x.arcTo(X,Y+h,X,Y,r);x.arcTo(X,Y,X+w,Y,r);x.closePath()}
function drawScreen(){const {sx:x,W,H,kbFrac}=screen;const u=W/(tab?100:50);x.fillStyle='#f3f2ee';x.fillRect(0,0,W,H);
 x.fillStyle='#111';x.font='600 '+(u*(tab?1.7:2.6))+'px "General Sans",sans-serif';x.textBaseline='top';x.textAlign='left';x.fillText('9:41',u*(tab?4:5),u*(tab?2:3.2));x.textAlign='right';x.fillText('5G ▮',W-u*(tab?4:5),u*(tab?2:3.2));
 const kbY=H*(1-kbFrac);x.fillStyle=tk?'#d1d4da':'#16171a';x.fillRect(0,kbY,W,H-kbY);
 if(tk){for(const k of tk){const p=k.p,g=k.on;const sc2=1-p*.05;const kw=k.w*sc2,kh=k.h*sc2,kx=k.x+(k.w-kw)/2,ky=k.y+(k.h-kh)/2+p*3,r=kh*.13;
  x.fillStyle='rgba(60,64,72,.45)';rrect(x,kx,ky+3,kw,kh,r);x.fill();const base=k.sp?[172,177,187]:[255,255,255];const c=base.map((v,i)=>Math.round(v+([68,214,44][i]-v)*g));x.fillStyle='rgb('+c+')';rrect(x,kx,ky,kw,kh,r);x.fill();
  x.fillStyle=g>.45?'#fff':'#111';x.textAlign='center';x.textBaseline='middle';const one=k.k.l.length==1;x.font=(one?'400 ':'500 ')+(one?kh*.44:kh*.27)+'px "General Sans",sans-serif';x.fillText(one?k.k.l.toLowerCase():k.k.l,kx+kw/2,ky+kh/2+1)}}
 x.textAlign='center';x.fillStyle='#8d8c86';x.font='500 '+(u*(tab?1.5:2.1))+'px "JetBrains Mono",monospace';x.fillText('HELISON · AGORA',W/2,u*(tab?7:12));
 const fs=u*(tab?3.6:4.4);x.font='600 '+fs+'px "General Sans",sans-serif';x.textAlign='left';const maxW=W*.78;const words=(curTxt||'').split(/(?<= )/);const lines=[''];for(const wd of words){const t=lines[lines.length-1]+wd;if(x.measureText(t).width>maxW&&lines[lines.length-1])lines.push(wd);else lines[lines.length-1]=t}
 const lh=fs*1.25,pad=fs*.6;const bw=Math.max(fs*2,...lines.map(l=>x.measureText(l).width))+pad*2+fs*.2,bh=lines.length*lh+pad*1.2;const bx=W-bw-u*(tab?3:4),by=kbY-u*(tab?4:5)-bh;
 x.fillStyle='#121212';rrect(x,bx,by,bw,bh,fs*.7);x.fill();x.fillStyle='#fff';x.textBaseline='middle';lines.forEach((l,i)=>x.fillText(l,bx+pad,by+pad*.6+lh/2+i*lh));x.textBaseline='top';
 if(caretOn){const lw=x.measureText(lines[lines.length-1]).width;x.fillStyle='#44D62C';x.fillRect(bx+pad+lw+3,by+pad*.6+(lines.length-1)*lh+lh*.1,Math.max(2,fs*.09),fs*1.05)}
 screen.stex.needsUpdate=true;sdirty=false}
// ---- fit ----
const target=new THREE.Vector3(),corners=[],tv=new THREE.Vector3(),right=new THREE.Vector3(),up=new THREE.Vector3();let dist=30,lb=null;
function computeCorners(){if(!lb){const r=KB.rotation.clone();KB.rotation.set(0,0,0);G.updateMatrixWorld(true);lb=new THREE.Box3();KB.traverse(o=>{if(o.isMesh&&!o.isInstancedMesh&&o!==strip){o.geometry.computeBoundingBox();lb.union(o.geometry.boundingBox.clone().applyMatrix4(o.matrixWorld))}});if(!mobile){lb.max.y=Math.max(lb.max.y,capY+capH/2)}KB.rotation.copy(r)}
 G.updateMatrixWorld(true);corners.length=0;for(let i=0;i<8;i++)corners.push(new THREE.Vector3(i&1?lb.max.x:lb.min.x,i&2?lb.max.y:lb.min.y,i&4?lb.max.z:lb.min.z).applyMatrix4(KB.matrixWorld));target.set(0,0,0);corners.forEach(c=>target.add(c));target.multiplyScalar(1/8)}
function fit(){for(let it=0;it<8;it++){C.position.copy(target).addScaledVector(dir,dist);C.lookAt(target);C.updateMatrixWorld();let a=1e9,b=-1e9,c=1e9,d=-1e9;for(const p of corners){tv.copy(p).project(C);a=Math.min(a,tv.x);b=Math.max(b,tv.x);c=Math.min(c,tv.y);d=Math.max(d,tv.y)}
 const ext=Math.max((b-a)/(2*fitFrac[0]),(d-c)/(2*fitFrac[1]));const hh=dist*Math.tan(C.fov*Math.PI/360),hw=hh*C.aspect;right.setFromMatrixColumn(C.matrixWorld,0);up.setFromMatrixColumn(C.matrixWorld,1);
 target.addScaledVector(right,(a+b)/2*hw).addScaledVector(up,(c+d)/2*hh);dist*=ext}}
let w0=0,h0=0,vk=0,dA=30,dB=30;const tA=new THREE.Vector3(),tB=new THREE.Vector3();const FA=window.KB_FIT||[.9,.9],FB=window.KB_FIT2||FA,SH=window.KB_SHIFT||0;
function applyV(){dist=dA+(dB-dA)*vk;target.lerpVectors(tA,tB,vk);if(vk>0&&SH)C.setViewOffset(w0,h0,vk*w0*SH,0,w0,h0);else C.clearViewOffset();C.updateProjectionMatrix()}
function rs(){const w=host.clientWidth,h=host.clientHeight;if(!w||!h||(w==w0&&h==h0))return;w0=w;h0=h;R.setSize(w,h,false);C.aspect=w/h;C.clearViewOffset();C.updateProjectionMatrix();computeCorners();if(mobile){fit();return}fitFrac=FA;fit();dA=dist;tA.copy(target);fitFrac=FB;fit();dB=dist;tB.copy(target);applyV()}
const ro=new ResizeObserver(rs);ro.observe(host);rs();
let mx=0,my=0;const pm=e=>{mx=e.clientX/innerWidth*2-1;my=e.clientY/innerHeight*2-1};addEventListener('pointermove',pm,{passive:true});
let vis=true;const io=new IntersectionObserver(e=>vis=e[0].isIntersecting);io.observe(host);
const col=new THREE.Color(),camPos=new THREE.Vector3(),RM=matchMedia('(prefers-reduced-motion: reduce)').matches;let raf,t0=performance.now(),last=t0,mxs=0,mys=0,sg=0;
const DN=60,UP=90;const ease=t=>t*t*(3-2*t);
function pressY(el){if(el<0)return 0;if(el<DN)return -depth*(1-Math.pow(1-el/DN,2));if(el<DN+UP)return -depth*(1-ease((el-DN)/UP));return 0}
let lastF=0;function frame(now){raf=requestAnimationFrame(frame);if(!vis||document.hidden)return;if(window.__swGL){if(now-lastF<40)return;lastF=now}const dt=Math.min(1/30,Math.max(0,(now-last)/1000));last=now;const t=(now-t0)/1000;
 const pk=1-Math.exp(-dt*3);mxs+=(mx-mxs)*pk;mys+=(my-mys)*pk;
 camPos.copy(target).addScaledVector(dir,dist);C.position.copy(camPos);C.lookAt(target);
 G.position.y=0;
 const kUp=1-Math.exp(-dt*22),kDn=1-Math.exp(-dt*4);let sum=0,mU=new Set(),cU=false,lU=false,gU=false;
 for(const k of keys){const s=k.s;const y=pressY(now-k.t);const tg=k.tgt;const on0=k.on;k.on+=(tg-k.on)*(tg>k.on?kUp:kDn);if(Math.abs(k.on-tg)<.002)k.on=tg;
  if(y!==k.y||k.dirty){k.y=y;M.makeTranslation(s.x,capY+y,s.z);s.cm.setMatrixAt(s.cj,M);mU.add(s.cm);M.compose(V.set(s.x,capY+y+capH/2+.002,s.z),Q.identity(),SC.set(s.lw,1,s.lh));legIM.setMatrixAt(k.i,M);lU=true}
  if(k.on!==on0||k.dirty){const g=k.on;col.copy(GREEN).multiplyScalar(g*(mobile?1.3:3.2));s.cm.setColorAt(s.cj,col);cU=true;mU.add(s.cm);
   col.copy(lc0).lerp(lcOn,g).multiplyScalar(1+g*.5);legIM.setColorAt(k.i,col);col.copy(GREEN).multiplyScalar(g*(mobile?1.1:3.5));glowIM.setColorAt(k.i,col);gU=true;lU=true}
  k.dirty=false;sum+=k.on}
 mU.forEach(m=>{m.instanceMatrix.needsUpdate=true;if(m.instanceColor)m.instanceColor.needsUpdate=true});if(lU){legIM.instanceMatrix.needsUpdate=true;legIM.instanceColor.needsUpdate=true}if(gU)glowIM.instanceColor.needsUpdate=true;
 if(tk)for(const k of tk){const o0=k.on;k.on+=(k.tgt-k.on)*(k.tgt>k.on?kUp:kDn);if(Math.abs(k.on-k.tgt)<.004)k.on=k.tgt;const pp=depth?pressY(now-k.t)/-depth:0;if(k.on!==o0||pp!==k.p){k.p=pp;sdirty=true}}
 if(strip){const tg=Math.min(1,sum/8)*1.1;sg+=(tg-sg)*(1-Math.exp(-dt*5));strip.material.color.copy(GREEN).multiplyScalar(sg)}
 if(screen){if(now-lastCaret>530){lastCaret=now;caretOn=!caretOn;sdirty=true}if(sdirty)drawScreen()}
 R.render(S,C)}
raf=requestAnimationFrame(t=>{frame(t);host.classList.add('ready')});
return{has:c=>!!byCode[c],setOn(c,on,h,lvl){const a=byCode[c];if(a)for(const k of a){if(tk&&tk.includes(k))continue;k.tgt=on?(lvl==null?1:lvl):0}},
 tap(c){const a=byCode[c];if(!a)return;const n=performance.now();for(const k of a){if(n-k.t>DN*.6){k.t=n;if(tk&&tk.includes(k))k.on=1}}},
 view(k){vk=k;if(w0)applyV()},
 pick(cx,cy){const r=R.domElement.getBoundingClientRect();const v=new THREE.Vector2((cx-r.left)/r.width*2-1,-(cy-r.top)/r.height*2+1);const ray=new THREE.Raycaster();ray.setFromCamera(v,C);const h=ray.intersectObjects(capMeshes,false)[0];if(!h)return null;const sp=specs.find(s=>s.cm===h.object&&s.cj===h.instanceId);return sp?sp.k.c:null},
 text(s){if(s!==curTxt){curTxt=s;caretOn=true;lastCaret=performance.now();sdirty=true}},
 dispose(){cancelAnimationFrame(raf);ro.disconnect();io.disconnect();removeEventListener('pointermove',pm);R.dispose();R.forceContextLoss&&R.forceContextLoss();R.domElement.remove()}}}

}

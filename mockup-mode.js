const SCREENS=[
 {src:'/assets/mockups/01-intro.webp?v=4',label:'CASE 소개'},
 {src:'/assets/mockups/02-clues.webp?v=4',label:'단서 탐색'},
 {src:'/assets/mockups/03-chat.webp?v=4',label:'상담 대화'},
 {src:'/assets/mockups/04-board.webp?v=4',label:'시그널 분석'},
 {src:'/assets/mockups/05-report.webp?v=4',label:'AI 리포트 검토'},
 {src:'/assets/mockups/06-twist.webp?v=4',label:'새로운 메시지'},
 {src:'/assets/mockups/07-plan.webp?v=4',label:'상담 계획'},
 {src:'/assets/mockups/08-result.webp?v=4',label:'결과 확인'}
];
const state={step:0,clues:new Set(['door','friends','notice']),chat:null,board:new Set(),report:new Set(),plan:new Set()};
const screen=document.querySelector('#screen');
const toast=document.querySelector('#toast');
let noteTimer;
function pct(n){return `${n}%`}
function showToast(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.classList.remove('show'),1450)}
function note(msg){const el=document.querySelector('.screen-note');if(!el)return;el.textContent=msg;el.classList.add('show');clearTimeout(noteTimer);noteTimer=setTimeout(()=>el.classList.remove('show'),1650)}
function flash(x,y){const stage=document.querySelector('.mockup-stage');if(!stage)return;const f=document.createElement('span');f.className='click-flash';f.style.left=pct(x);f.style.top=pct(y);stage.appendChild(f);setTimeout(()=>f.remove(),650)}
function go(n){state.step=Math.max(0,Math.min(SCREENS.length-1,n));render();window.scrollTo({top:0,behavior:'smooth'})}
function hit({x,y,w,h,label,cls='',action}){const b=document.createElement('button');b.type='button';b.className=`hit ${cls}`;b.style.left=pct(x);b.style.top=pct(y);b.style.width=pct(w);b.style.height=pct(h);b.setAttribute('aria-label',label);b.addEventListener('click',e=>{flash(x+w/2,y+h/2);action?.(e,b)});return b}
function add(stage,spec){stage.appendChild(hit(spec))}
function addNext(stage,text,next,{light=false}={}){const b=document.createElement('button');b.type='button';b.className=`floating-next${light?' light':''}`;b.textContent=text;b.onclick=()=>go(next);stage.appendChild(b)}
function renderIntro(stage){add(stage,{x:61,y:70,w:34,h:12,label:'미션 시작하기',cls:'pulse',action:()=>go(1)});}
function renderClues(stage){
 const items=[['door',18,27,7,11,'교실 표지판 단서'],['friends',31,44,12,15,'친구들의 대화 단서'],['notice',17,61,10,14,'상담 안내문 단서'],['phone',60,42,9,14,'민서의 휴대폰 단서'],['desk',18,68,10,13,'책상 주변 단서']];
 items.forEach(([id,x,y,w,h,label])=>add(stage,{x,y,w,h,label,cls:state.clues.has(id)?'found':'',action:(e,b)=>{if(state.clues.has(id)){note('이미 확인한 단서야.');return}state.clues.add(id);b.classList.add('found');document.querySelector('.count-chip').textContent=`단서 ${state.clues.size} / 6`;showToast('새 단서를 발견했어!')}}));
 const c=document.createElement('div');c.className='count-chip';c.textContent=`단서 ${state.clues.size} / 6`;stage.appendChild(c);
 add(stage,{x:73,y:78,w:23,h:10,label:'단서 분석하기',action:()=>{if(state.clues.size<4){note('단서를 하나 더 찾아보자.');return}go(2)}});
}
function renderChat(stage){
 const choices=[{x:42,y:68,w:16,h:14,label:'속상한 것 같아요',msg:'감정을 단정하기보다 더 물어보는 게 좋아.'},{x:59,y:68,w:16,h:14,label:'좀 답답해요',msg:'좋아. 민서가 말하기 편한 표현을 골랐어.'},{x:76,y:68,w:16,h:14,label:'그냥 복잡해요',msg:'좋아. 여러 감정이 섞일 수 있다는 걸 열어뒀어.'}];
 choices.forEach((c,i)=>add(stage,{...c,cls:state.chat===i?'selected':'',action:(e,b)=>{state.chat=i;document.querySelectorAll('.hit.selected').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');showToast(c.msg);setTimeout(()=>go(3),850)}}));
}
function renderBoard(stage){
 const cards=[[18,35,23,12,'중요한 시그널 카드'],[18,50,23,12,'중요한 시그널 카드'],[45,35,22,12,'확인이 필요한 카드'],[48,65,19,11,'주말 약속 취소 카드'],[72,37,20,12,'추측 카드'],[72,52,20,12,'추측 카드']];
 cards.forEach((c,i)=>add(stage,{x:c[0],y:c[1],w:c[2],h:c[3],label:c[4],cls:state.board.has(i)?'selected':'',action:(e,b)=>{state.board.add(i);b.classList.add('selected');note('좋아. 사실과 추측을 구분해 보는 중이야.')}}));
 addNext(stage,'AI 리포트 검토 →',4,{light:true});
}
function renderReport(stage){
 const rows=[[43,32,50,7],[43,40,50,7],[43,48,50,7],[43,56,50,7]];
 rows.forEach((r,i)=>add(stage,{x:r[0],y:r[1],w:r[2],h:r[3],label:`AI 리포트 문장 ${i+1}`,cls:state.report.has(`row${i}`)?'selected':'',action:(e,b)=>{state.report.add(`row${i}`);b.classList.add('selected');note('이 문장의 근거를 아래에서 판단해 봐.')}}));
 const options=[['fact',35,70,17,12,'사실'],['infer',53,70,17,12,'추론'],['more',71,70,17,12,'더 알아야 해요']];
 options.forEach(([id,x,y,w,h,label])=>add(stage,{x,y,w,h,label,cls:state.report.has(id)?'selected':'',action:(e,b)=>{state.report.add(id);b.classList.add('selected');showToast(label==='더 알아야 해요'?'맞아. 사람의 성향을 단정하려면 정보가 더 필요해.':'AI의 문장도 근거를 확인하며 읽어야 해.');setTimeout(()=>go(5),900)}}));
}
function renderTwist(stage){add(stage,{x:62,y:73,w:33,h:11,label:'새 메시지 반영하기',cls:'pulse',action:()=>{showToast('새 정보를 반영했어. 처음 판단을 수정해도 괜찮아.');setTimeout(()=>go(6),650)}});}
function renderPlan(stage){
 const cards=[[15,28,12,19,'더 많이 들어주기'],[28,28,12,19,'마음 인정하기'],[41,28,12,19,'학교생활 살펴보기'],[15,50,12,19,'선생님과 이야기하기'],[28,50,12,19,'친구 관계 살펴보기'],[41,50,12,19,'전문기관 연결하기']];
 cards.forEach((c,i)=>add(stage,{x:c[0],y:c[1],w:c[2],h:c[3],label:c[4],cls:state.plan.has(i)?'selected':'',action:(e,b)=>{if(state.plan.has(i)){state.plan.delete(i);b.classList.remove('selected');note('계획에서 뺐어.')}else{state.plan.add(i);b.classList.add('selected');note(`${c[4]} 카드를 계획에 추가했어.`)}}));
 add(stage,{x:56,y:74,w:34,h:10,label:'계획 확정하고 미션 시작하기',action:()=>{if(state.plan.size<3){showToast('상담 전략을 3개 이상 골라 줘.');return}go(7)}});
}
function renderResult(stage){
 add(stage,{x:91,y:51,w:7,h:11,label:'결과 공유',action:()=>showToast('수업용 결과 공유 기능은 다음 버전에 연결할게.')});
 add(stage,{x:91,y:66,w:7,h:11,label:'결과 저장',action:()=>showToast('지금은 화면 캡처로 결과를 저장할 수 있어.')});
 addNext(stage,'CASE 다시 하기',0,{light:true});
}
function render(){
 const info=SCREENS[state.step];
 screen.innerHTML='';
 const stage=document.createElement('div');stage.className='mockup-stage';stage.setAttribute('aria-label',`${info.label} 화면`);
 const img=document.createElement('img');img.src=info.src;img.alt=`마음 SIGNAL LAB ${info.label} 시안`;img.draggable=false;
 img.onerror=()=>{stage.classList.add('load-failed');stage.innerHTML='<div class="load-error"><strong>화면 이미지를 불러오지 못했어요.</strong><span>새로고침하면 다시 시도합니다.</span></div>'};
 stage.appendChild(img);
 const n=document.createElement('div');n.className='screen-note';stage.appendChild(n);
 const d=document.createElement('span');d.className='disclaimer';d.textContent='가상 사례 기반 진로체험이며 실제 심리진단이 아닙니다.';stage.appendChild(d);
 screen.appendChild(stage);
 [renderIntro,renderClues,renderChat,renderBoard,renderReport,renderTwist,renderPlan,renderResult][state.step](stage);
}
render();
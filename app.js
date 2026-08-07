const steps = [
  { id: 'intro', label: 'CASE 소개' },
  { id: 'clues', label: '단서 탐색' },
  { id: 'chat', label: '상담 대화' },
  { id: 'board', label: '시그널 분석' },
  { id: 'report', label: 'AI 검토' },
  { id: 'twist', label: '새 정보' },
  { id: 'plan', label: '상담 전략' },
  { id: 'result', label: '진로 결과' },
];

const clueData = [
  { id:'phone', title:'늦어진 답장', text:'평소보다 답장 간격이 길어졌다.', thumb:'CHAT', x:'68%', y:'53%' },
  { id:'friends', title:'친구들 대화', text:'친구 셋이 이야기 중이지만 민서는 조금 떨어져 있다.', thumb:'REL', x:'43%', y:'49%' },
  { id:'door', title:'2학년 3반', text:'사건이 시작된 교실 위치를 확인했다.', thumb:'2-3', x:'13%', y:'31%' },
  { id:'notice', title:'상담 안내문', text:'복도 게시판에 학생 상담 안내가 붙어 있다.', thumb:'INFO', x:'31%', y:'36%' },
  { id:'lunch', title:'점심시간 변화', text:'최근 이틀 동안 점심을 많이 남겼다는 이야기가 있다.', thumb:'LUNCH', x:'54%', y:'70%' },
  { id:'time', title:'쉬는 시간 혼자 있음', text:'평소보다 혼자 있는 시간이 늘었다.', thumb:'TIME', x:'79%', y:'72%' },
];

const boardCards = [
  { id:'b1', title:'답장이 늦어짐', text:'관찰할 수 있는 변화', zone:'important' },
  { id:'b2', title:'쉬는 시간 혼자 있음', text:'이유는 아직 확인하지 못함', zone:'unsure' },
  { id:'b3', title:'친구들이 따돌리는 중', text:'현재 정보만으로는 단정할 수 없음', zone:'guess' },
  { id:'b4', title:'점심을 많이 남김', text:'최근 나타난 생활 변화', zone:'important' },
  { id:'b5', title:'친구와 다퉜을 가능성', text:'추가 질문이 필요함', zone:'guess' },
  { id:'b6', title:'주말 약속이 취소됨', text:'누가 왜 취소했는지 모름', zone:'unsure' },
];

const reportStatements = [
  { id:'r1', label:'문장 1', text:'민서는 최근 친구들과 대화하는 시간이 줄었습니다.', answer:'fact', explanation:'관찰된 행동 변화에 근거한 문장이에요.' },
  { id:'r2', label:'문장 2', text:'민서는 친구들에게 따돌림을 당하고 있습니다.', answer:'more', explanation:'가능성은 있지만 현재 정보만으로는 단정할 수 없어요.' },
  { id:'r3', label:'문장 3', text:'민서는 사람들 앞에 나서는 것을 원래 싫어하는 성격입니다.', answer:'more', explanation:'한 장면만으로 사람의 성격을 고정해서 판단하면 안 돼요.' },
];

const strategies = [
  { id:'s1', title:'더 많이 들어주기', text:'해결책보다 먼저 이야기를 충분히 듣는다.', icon:'LISTEN' },
  { id:'s2', title:'마음 인정하기', text:'느낀 감정을 틀렸다고 하지 않고 받아준다.', icon:'CARE' },
  { id:'s3', title:'친구 관계 살펴보기', text:'갈등 전후의 상황을 추가로 확인한다.', icon:'REL' },
  { id:'s4', title:'학교생활 살펴보기', text:'수업·점심·쉬는 시간의 변화를 함께 본다.', icon:'SCHOOL' },
  { id:'s5', title:'선생님과 연결하기', text:'학교 안에서 도움을 받을 수 있는 사람을 찾는다.', icon:'LINK' },
  { id:'s6', title:'전문 지원 연결하기', text:'안전이나 지속적 어려움이 있다면 전문 도움을 연결한다.', icon:'HELP' },
];

const state = {
  step: 0,
  foundClues: new Set(),
  chatRound: 0,
  chatMessages: [
    { who:'student', text:'요즘 친구들이 저를 싫어하는 것 같아요.' },
  ],
  boardZones: Object.fromEntries(boardCards.map(c => [c.id, c.zone])),
  selectedReport: null,
  reportSolved: new Set(),
  twistSeen: false,
  plan: [],
  signalScore: 0,
};

const screen = document.querySelector('#screen');
const stepper = document.querySelector('#stepper');
const helperText = document.querySelector('#helperText');
const progressText = document.querySelector('#progressText');
const signalScore = document.querySelector('#signalScore');
const toast = document.querySelector('#toast');

function showToast(message){
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 1800);
}

function setHelper(text){ helperText.textContent = text; }
function addScore(value){ state.signalScore += value; signalScore.textContent = state.signalScore; }

function renderStepper(){
  stepper.innerHTML = steps.map((s, i) => {
    const cls = i === state.step ? 'current' : i < state.step ? 'done' : '';
    return `<div class="step ${cls}"><span class="dot">${i < state.step ? '✓' : String(i+1).padStart(2,'0')}</span><span>${s.label}</span></div>`;
  }).join('');
  progressText.textContent = `${state.step+1}/${steps.length}`;
}

function go(step){
  state.step = Math.max(0, Math.min(steps.length - 1, step));
  render();
  window.scrollTo({ top:0, behavior:'smooth' });
}

function peopleScene(){
  return `
    <div class="school-scene">
      <div class="hall-ceiling"></div><div class="hall-floor"></div>
      <div class="classroom-door"></div><div class="notice-board"></div>
      <div class="window-bank"><div class="window"></div><div class="window"></div><div class="window"></div></div>
      <div class="character friend-a"><div class="hair"></div><div class="head"></div><div class="body"></div><div class="legs"></div></div>
      <div class="character friend-b"><div class="hair"></div><div class="head"></div><div class="body"></div><div class="legs"></div></div>
      <div class="character friend-c"><div class="hair"></div><div class="head"></div><div class="body"></div><div class="legs"></div></div>
      <div class="character main"><div class="hair"></div><div class="head"></div><div class="body"></div><div class="legs"></div><div class="phone"></div></div>
    </div>`;
}

function renderIntro(){
  setHelper('장면을 보고 오늘의 미션을 확인해 봐.');
  screen.innerHTML = `
    <div class="intro-grid">
      <div class="panel scene-card">
        ${peopleScene()}
        <div class="scene-overlay"><strong>방과 후, 2학년 3반 앞</strong><span>친구들과 조금 떨어져 휴대폰을 보고 있는 민서. 무슨 일이 있었을까?</span></div>
      </div>
      <div class="panel intro-panel">
        <div class="eyebrow">TODAY'S MISSION</div>
        <h1 class="page-title">AI가 놓친 <span class="accent">마음의 시그널</span>을 찾아라.</h1>
        <p class="page-copy">너는 마음 SIGNAL LAB의 신입 청소년상담사다. 장면을 관찰하고, 질문하고, AI의 판단을 검토해 민서에게 필요한 도움을 설계해 보자.</p>
        <div class="mini-steps">
          <div class="mini-step"><strong>01 관찰</strong><span>장면에서 단서 찾기</span></div>
          <div class="mini-step"><strong>02 대화</strong><span>좋은 질문 선택하기</span></div>
          <div class="mini-step"><strong>03 검수</strong><span>AI의 성급한 판단 찾기</span></div>
          <div class="mini-step"><strong>04 설계</strong><span>상담 전략 조합하기</span></div>
        </div>
        <div class="cta-row"><button class="primary-btn" id="startBtn">CASE 시작하기</button><button class="ghost-btn" id="safetyBtn">활동 원칙</button></div>
      </div>
    </div>`;
  document.querySelector('#startBtn').onclick = () => go(1);
  document.querySelector('#safetyBtn').onclick = () => showToast('가상 사례를 다루며 실제 심리진단은 하지 않아요.');
}

function renderClues(){
  setHelper('빛나는 지점을 눌러 단서를 모아보자.');
  const found = [...state.foundClues];
  screen.innerHTML = `
    <div class="clue-layout">
      <div class="panel clue-scene">
        ${peopleScene()}
        ${clueData.map(c => `<button class="hotspot ${state.foundClues.has(c.id)?'found':''}" data-clue="${c.id}" style="left:${c.x};top:${c.y}" aria-label="단서 탐색"></button>`).join('')}
      </div>
      <aside class="panel clue-drawer">
        <div class="drawer-head"><strong>수집한 단서</strong><span class="counter">${found.length} / ${clueData.length}</span></div>
        <div class="clue-list">${found.length ? found.map(id => {
          const c = clueData.find(x => x.id === id);
          return `<div class="clue-card"><div class="clue-thumb">${c.thumb}</div><div><strong>${c.title}</strong><p>${c.text}</p></div></div>`;
        }).join('') : '<div class="empty-clues">아직 수집한 단서가 없어.<br>장면의 빛나는 지점을 눌러 봐.</div>'}</div>
        <button class="primary-btn" id="toChat" ${found.length < 4 ? 'disabled' : ''}>상담 대화로 이동</button>
      </aside>
    </div>`;

  document.querySelectorAll('[data-clue]').forEach(btn => btn.onclick = () => {
    const id = btn.dataset.clue;
    if(!state.foundClues.has(id)){
      state.foundClues.add(id); addScore(5); showToast('새 단서를 발견했어.'); renderClues(); renderStepper();
    }
  });
  const toChat = document.querySelector('#toChat');
  if(toChat) toChat.onclick = () => go(2);
}

const chatChoices = [
  [
    { tone:'good', text:'언제부터 그렇게 느끼기 시작했는지 말해줄래?', reply:'3일 전 모둠 활동이 끝난 뒤부터요. 그때 조금 다퉜어요.' },
    { tone:'weak', text:'그냥 너무 신경 쓰지 않는 건 어때?', reply:'…그게 잘 안 돼요.' },
    { tone:'bad', text:'그 친구들이 일부러 너를 피하는 거지?', reply:'잘 모르겠어요. 정말 그런지는…' },
  ],
  [
    { tone:'good', text:'그때 어떤 일이 있었는지 천천히 더 이야기해줄래?', reply:'제가 자료를 늦게 공유해서 친구가 화를 냈어요.' },
    { tone:'weak', text:'네가 먼저 사과하면 다 해결되지 않을까?', reply:'그게 전부인지 모르겠어요.' },
    { tone:'bad', text:'누가 제일 잘못했다고 생각해?', reply:'누구 한 명이 잘못한 건 아닌 것 같아요.' },
  ],
  [
    { tone:'good', text:'지금 가장 마음에 걸리는 건 무엇이야?', reply:'제가 친구들에게 미움받을까 봐 걱정돼요.' },
    { tone:'weak', text:'다른 친구를 사귀면 되지 않을까?', reply:'저는 그 친구들이랑 다시 편해지고 싶어요.' },
    { tone:'bad', text:'그럼 친구들이 널 싫어하는 게 맞네.', reply:'…그렇게 말하니까 더 불안해요.' },
  ],
];

function renderChat(){
  setHelper('정답보다 대화를 이어갈 수 있는 질문을 골라봐.');
  const choices = chatChoices[Math.min(state.chatRound, chatChoices.length-1)];
  const done = state.chatRound >= chatChoices.length;
  screen.innerHTML = `
    <div class="chat-layout">
      <div class="panel character-panel">
        <div class="portrait">
          <div class="character main"><div class="hair"></div><div class="head"></div><div class="body"></div><div class="legs"></div><div class="phone"></div></div>
          <div class="portrait-note"><strong>민서 · 중학교 2학년</strong><p>최근 친구 관계가 예전 같지 않다고 느끼고 있다.</p></div>
        </div>
      </div>
      <div class="panel chat-panel">
        <div class="chat-head"><strong>상담 대화</strong><span class="online">상담 중</span></div>
        <div class="chat-thread">${state.chatMessages.map(m => `<div class="bubble ${m.who === 'student' ? 'student':'counselor'}">${m.text}</div>`).join('')}</div>
        ${done ? `<div class="cta-row"><button class="primary-btn" id="toBoard">시그널 보드 정리하기</button></div>` : `
        <div class="response-grid">${choices.map((c,i) => `<button class="choice-btn" data-choice="${i}">${c.text}<small>${c.tone==='good'?'상황을 더 이해할 수 있는 질문':c.tone==='weak'?'해결을 서두르는 표현':'판단이 앞선 표현'}</small></button>`).join('')}</div>`}
      </div>
    </div>`;

  document.querySelectorAll('[data-choice]').forEach(btn => btn.onclick = () => {
    const c = choices[Number(btn.dataset.choice)];
    state.chatMessages.push({who:'counselor', text:c.text}, {who:'student', text:c.reply});
    if(c.tone === 'good'){ addScore(10); showToast('좋은 질문이야. 새로운 정보가 열렸어.'); }
    else if(c.tone === 'weak') showToast('조언보다 조금 더 들어보는 게 좋겠어.');
    else showToast('아직 단정하기엔 정보가 부족해.');
    state.chatRound++;
    renderChat(); renderStepper();
  });
  const toBoard = document.querySelector('#toBoard'); if(toBoard) toBoard.onclick = () => go(3);
}

function renderBoard(){
  setHelper('사실과 추측을 나누면 마음을 더 안전하게 이해할 수 있어.');
  const zoneMeta = {
    important:['중요한 시그널','확인된 변화와 사건 이해에 중요한 단서'],
    unsure:['아직 잘 모르겠어','의미를 판단하려면 더 알아봐야 하는 단서'],
    guess:['추측 / 가설','가능성은 있지만 아직 확인되지 않은 생각'],
  };
  screen.innerHTML = `
    <div class="board-wrap">
      <div class="board-head"><div><div class="eyebrow">SIGNAL BOARD</div><h2>단서를 세 칸으로 정리해 보자</h2><p>카드를 드래그하거나 클릭하면 다음 칸으로 이동해.</p></div><button class="primary-btn" id="toReport">AI 리포트 검토하기</button></div>
      <div class="signal-board">${Object.entries(zoneMeta).map(([zone,meta]) => `
        <section class="signal-column ${zone}" data-zone="${zone}"><div class="column-head"><strong>${meta[0]}</strong><span>${meta[1]}</span></div><div class="dropzone" data-drop="${zone}">
          ${boardCards.filter(c => state.boardZones[c.id] === zone).map(c => `<div class="signal-card" draggable="true" data-card="${c.id}"><strong>${c.title}</strong><span>${c.text}</span></div>`).join('')}
        </div></section>`).join('')}
      </div>
    </div>`;
  let dragging = null;
  document.querySelectorAll('.signal-card').forEach(card => {
    card.addEventListener('dragstart',()=>{ dragging = card.dataset.card; card.classList.add('dragging'); });
    card.addEventListener('dragend',()=>card.classList.remove('dragging'));
    card.addEventListener('click',()=>{
      const order=['important','unsure','guess']; const now=state.boardZones[card.dataset.card]; state.boardZones[card.dataset.card]=order[(order.indexOf(now)+1)%3]; renderBoard();
    });
  });
  document.querySelectorAll('[data-drop]').forEach(z => {
    z.addEventListener('dragover',e=>e.preventDefault());
    z.addEventListener('drop',e=>{e.preventDefault(); if(dragging){state.boardZones[dragging]=z.dataset.drop; renderBoard();}});
  });
  document.querySelector('#toReport').onclick = () => { addScore(10); go(4); };
}

function renderReport(){
  setHelper('AI의 문장을 그대로 믿지 말고 근거가 있는지 확인해 봐.');
  screen.innerHTML = `
    <div class="report-layout">
      <div class="panel report-card">
        <div class="report-head"><div class="robot-dot">AI</div><div><div class="eyebrow">AI COUNSELOR REPORT</div><strong>AI가 먼저 정리한 상담 리포트</strong></div></div>
        ${reportStatements.map(s => `<div class="report-line ${state.selectedReport===s.id?'selected':''}" data-report="${s.id}"><strong>${s.label}</strong><p>${s.text}</p>${state.reportSolved.has(s.id)?`<small style="display:block;margin-top:7px;color:#17836d;font-weight:800">검토 완료</small>`:''}</div>`).join('')}
      </div>
      <aside class="panel judge-panel">
        <h3>이 문장은 어떤 유형일까?</h3>
        <div class="subcopy">왼쪽 문장을 먼저 선택해.</div>
        <button class="judge-option" data-judge="fact"><strong>사실</strong><span>직접 관찰하거나 확인한 정보</span></button>
        <button class="judge-option" data-judge="inference"><strong>추론</strong><span>근거를 바탕으로 한 해석</span></button>
        <button class="judge-option" data-judge="more"><strong>더 알아야 해요</strong><span>현재 정보만으로 판단하기 어려움</span></button>
        <div class="feedback-box" id="reportFeedback">AI도 빠르게 정리할 수 있지만, 사람의 마음을 단정하기 전에는 근거와 맥락을 확인해야 해.</div>
        <button class="primary-btn" id="toTwist" ${state.reportSolved.size < reportStatements.length ? 'disabled':''}>새로운 메시지 확인</button>
      </aside>
    </div>`;
  document.querySelectorAll('[data-report]').forEach(el => el.onclick = () => { state.selectedReport = el.dataset.report; renderReport(); });
  document.querySelectorAll('[data-judge]').forEach(el => el.onclick = () => {
    if(!state.selectedReport){ showToast('먼저 검토할 문장을 골라줘.'); return; }
    const s = reportStatements.find(x=>x.id===state.selectedReport);
    if(el.dataset.judge === s.answer){
      if(!state.reportSolved.has(s.id)) addScore(10);
      state.reportSolved.add(s.id); showToast('좋아. 근거를 잘 구분했어.');
    } else showToast('한 번 더 생각해 봐. 직접 확인된 정보일까?');
    renderReport();
    const feedback = document.querySelector('#reportFeedback'); if(feedback) feedback.textContent = s.explanation;
  });
  const toTwist = document.querySelector('#toTwist'); if(toTwist) toTwist.onclick = () => go(5);
}

function renderTwist(){
  setHelper('새 정보가 생기면 처음 생각을 수정해도 괜찮아.');
  screen.innerHTML = `
    <div class="twist-layout">
      <div class="panel comic-panel">
        <div class="comic-strip">
          <div class="comic-frame"><div class="comic-person"><div class="hair"></div><div class="head"></div><div class="body"></div></div><div class="speech">계획은 같이 정한 거잖아.</div></div>
          <div class="comic-frame"><div class="comic-person" style="left:42%"><div class="hair" style="background:#3e302b"></div><div class="head"></div><div class="body" style="background:#364b67"></div></div><div class="speech" style="left:16px;right:auto">자료가 너무 늦게 왔어.</div></div>
        </div>
        <div class="twist-banner">3일 전 모둠 프로젝트 장면이 새로 공개됐어.<span>처음 생각했던 ‘친구들이 이유 없이 멀어졌다’는 가설을 다시 점검해 보자.</span></div>
      </div>
      <aside class="panel message-panel">
        <span class="new-pill">NEW MESSAGE</span><h3>민서의 추가 메시지</h3><div class="meta">방금 전</div>
        <div class="message-box">“선생님, 사실 제가 말하지 않은 게 하나 있어요.”</div>
        <div class="message-box highlight">“제가 모둠 자료를 늦게 공유했어요. 그날 친구와 말다툼이 있었고, 그 뒤로 괜히 저를 싫어할까 봐 걱정했어요.”</div>
        <button class="primary-btn" id="toPlan">새 정보를 반영해 상담 계획 만들기</button>
      </aside>
    </div>`;
  if(!state.twistSeen){ state.twistSeen = true; addScore(10); }
  document.querySelector('#toPlan').onclick = () => go(6);
}

function renderPlan(){
  setHelper('좋은 상담은 순서도 중요해. 먼저 듣고, 확인하고, 필요한 도움을 연결해 보자.');
  screen.innerHTML = `
    <div class="plan-layout">
      <section class="panel strategy-bank"><div class="eyebrow">COUNSELING TOOLKIT</div><h2>상담 전략 카드</h2><div class="subcopy">카드를 클릭하거나 오른쪽으로 드래그해 계획을 만들어.</div>
        <div class="strategy-grid">${strategies.map(s => `<div class="strategy-card" draggable="true" data-strategy="${s.id}"><div class="strategy-icon">${s.icon}</div><strong>${s.title}</strong><span>${s.text}</span></div>`).join('')}</div>
      </section>
      <aside class="panel plan-panel"><div class="eyebrow">MY COUNSELING PLAN</div><h2>나만의 상담 계획</h2><div class="subcopy">3단계 이상 구성하면 결과를 확인할 수 있어.</div>
        <div class="plan-drop" id="planDrop">${state.plan.length ? state.plan.map((id,i)=>{const s=strategies.find(x=>x.id===id);return `<div class="plan-slot"><div class="plan-number">${i+1}</div><strong>${s.title}</strong><button class="remove-plan" data-remove="${id}" aria-label="삭제">×</button></div>`}).join('') : '<div class="plan-empty">여기에 전략 카드를 추가해 봐.</div>'}</div>
        <button class="primary-btn" id="toResult" ${state.plan.length < 3 ? 'disabled':''}>계획 확정하고 결과 보기</button>
      </aside>
    </div>`;
  let dragStrategy = null;
  const addStrategy = id => {
    if(state.plan.includes(id)){ showToast('이미 계획에 들어간 카드야.'); return; }
    state.plan.push(id); showToast('상담 계획에 추가했어.'); renderPlan();
  };
  document.querySelectorAll('[data-strategy]').forEach(el => {
    el.onclick = () => addStrategy(el.dataset.strategy);
    el.addEventListener('dragstart',()=>dragStrategy=el.dataset.strategy);
  });
  const drop = document.querySelector('#planDrop'); drop.addEventListener('dragover',e=>e.preventDefault()); drop.addEventListener('drop',e=>{e.preventDefault(); if(dragStrategy)addStrategy(dragStrategy);});
  document.querySelectorAll('[data-remove]').forEach(btn => btn.onclick = e => { e.stopPropagation(); state.plan = state.plan.filter(id=>id!==btn.dataset.remove); renderPlan(); });
  const toResult = document.querySelector('#toResult'); if(toResult) toResult.onclick = () => { addScore(20); go(7); };
}

function renderResult(){
  setHelper('상담사의 핵심은 마음을 맞히는 게 아니라, 단정하지 않고 이해하려는 과정이야.');
  const scores = [
    ['공감력', Math.min(96,78 + state.chatRound*4)],
    ['관찰력', Math.min(95,70 + state.foundClues.size*4)],
    ['질문력', Math.min(94,74 + state.chatRound*5)],
    ['판단력', Math.min(93,72 + state.reportSolved.size*6)],
    ['AI 활용력', Math.min(97,76 + state.reportSolved.size*7)],
  ];
  const careers = [
    ['청소년상담사','청소년의 고민과 관계 문제를 함께 이해하고 지원하는 전문가'],
    ['전문상담교사','학교 안에서 학생의 정서와 성장을 지원하는 교육 전문가'],
    ['UX 리서처','사람의 행동과 생각을 관찰해 더 나은 서비스를 만드는 사람'],
    ['인간중심 AI 기획자','사람에게 안전하고 도움이 되는 AI 경험을 설계하는 사람'],
  ];
  screen.innerHTML = `
    <div class="panel result-hero">
      <div class="result-copy"><div class="eyebrow">CASE COMPLETE</div><h2>사람의 마음을 <span>단정하지 않는 힘</span>을 발견했어.</h2><p>민서의 상황을 관찰하고, 질문하고, AI의 판단을 검토하면서 상담사의 핵심 역량을 경험했어. 아래 결과는 심리검사가 아니라 오늘 활동에서 사용한 직무역량을 보여주는 학습 결과야.</p><div class="cta-row"><button class="ghost-btn" id="restart">CASE 다시 하기</button></div></div>
      <div class="strengths">${scores.map(([name,value])=>`<div class="strength"><div class="ring" style="--value:${value}"><strong>${value}</strong></div><span>${name}</span></div>`).join('')}</div>
    </div>
    <section class="panel career-section"><h3>이 역량과 연결되는 미래 직업</h3><div class="career-grid">${careers.map(([name,desc],i)=>`<div class="career-card"><div class="career-visual"></div><strong>${name}</strong><span>${desc}</span><span class="match">연결도 ${92-i*3}%</span></div>`).join('')}</div></section>`;
  document.querySelector('#restart').onclick = () => location.reload();
}

function render(){
  renderStepper();
  const renderers=[renderIntro,renderClues,renderChat,renderBoard,renderReport,renderTwist,renderPlan,renderResult];
  renderers[state.step]();
  signalScore.textContent = state.signalScore;
}

render();

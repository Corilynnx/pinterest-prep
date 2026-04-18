// ===== STORAGE KEYS =====
const KEY_USERS    = 'pp_users';
const KEY_SESSION  = 'pp_session';
const KEY_PROGRESS = 'pp_progress';

// ===== STATE =====
let currentUser = null;
let quizState   = {};

// ===== INIT =====
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem(KEY_SESSION);
  if (saved && getUsers()[saved]) {
    currentUser = saved;
    showApp();
  }
});

// ===== AUTH HELPERS =====
function getUsers() {
  return JSON.parse(localStorage.getItem(KEY_USERS) || '{}');
}
function saveUsers(u) {
  localStorage.setItem(KEY_USERS, JSON.stringify(u));
}
function getProgress(user) {
  const all = JSON.parse(localStorage.getItem(KEY_PROGRESS) || '{}');
  if (!all[user]) all[user] = { completed: {}, lastSection: 'dashboard', quizScores: {} };
  return all[user];
}
function saveProgress(user, data) {
  const all = JSON.parse(localStorage.getItem(KEY_PROGRESS) || '{}');
  all[user] = data;
  localStorage.setItem(KEY_PROGRESS, JSON.stringify(all));
}
function updateProgress(updates) {
  const p = getProgress(currentUser);
  Object.assign(p, updates);
  saveProgress(currentUser, p);
}
function markComplete(sectionId) {
  const p = getProgress(currentUser);
  p.completed[sectionId] = true;
  saveProgress(currentUser, p);
  refreshSidebarBadges();
  refreshUserStat();
}
function isComplete(sectionId) {
  return !!getProgress(currentUser).completed[sectionId];
}
function totalComplete() {
  return Object.keys(getProgress(currentUser).completed).filter(k => getProgress(currentUser).completed[k]).length;
}

// ===== AUTH ACTIONS =====
function handleRegister(e) {
  e.preventDefault();
  const username = document.getElementById('reg-username').value.trim();
  const password = document.getElementById('reg-password').value;
  const confirm  = document.getElementById('reg-confirm').value;
  const errEl    = document.getElementById('reg-error');
  errEl.textContent = '';

  if (username.length < 2) { errEl.textContent = 'Username must be at least 2 characters'; return; }
  if (password.length < 4) { errEl.textContent = 'Password must be at least 4 characters'; return; }
  if (password !== confirm) { errEl.textContent = 'Passwords do not match'; return; }

  const users = getUsers();
  if (users[username]) { errEl.textContent = 'That username is already taken'; return; }

  users[username] = { password, createdAt: new Date().toISOString() };
  saveUsers(users);
  localStorage.setItem(KEY_SESSION, username);
  currentUser = username;
  showApp();
}

function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const errEl    = document.getElementById('login-error');
  errEl.textContent = '';

  const users = getUsers();
  if (!users[username] || users[username].password !== password) {
    errEl.textContent = 'Incorrect username or password';
    return;
  }
  localStorage.setItem(KEY_SESSION, username);
  currentUser = username;
  showApp();
}

function handleLogout() {
  localStorage.removeItem(KEY_SESSION);
  currentUser = null;
  document.getElementById('app-screen').classList.add('hidden');
  document.getElementById('login-screen').classList.remove('hidden');
}

function switchAuthTab(tab) {
  document.getElementById('login-form').classList.toggle('hidden', tab !== 'login');
  document.getElementById('register-form').classList.toggle('hidden', tab !== 'register');
  document.getElementById('tab-login').classList.toggle('active', tab === 'login');
  document.getElementById('tab-register').classList.toggle('active', tab === 'register');
  document.getElementById('login-error').textContent = '';
  document.getElementById('reg-error').textContent = '';
}

// ===== SHOW APP =====
function showApp() {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app-screen').classList.remove('hidden');

  // Set user display
  document.getElementById('user-avatar').textContent = currentUser[0].toUpperCase();
  document.getElementById('user-name-display').textContent = currentUser;
  refreshUserStat();
  refreshSidebarBadges();

  // Navigate to last section
  const p = getProgress(currentUser);
  navigateTo(p.lastSection || 'dashboard');
}

// ===== SIDEBAR =====
function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebar-overlay').classList.add('open');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('open');
}

function refreshSidebarBadges() {
  const lessonBadges = LESSON_ORDER;
  const problemBadges = PROBLEM_ORDER;

  lessonBadges.forEach(id => {
    const el = document.getElementById('badge-' + id);
    if (el) el.textContent = isComplete('lesson-' + id) ? '✓' : '';
  });
  problemBadges.forEach(id => {
    const el = document.getElementById('badge-' + id);
    if (el) el.textContent = isComplete('problem-' + id) ? '✓' : '';
  });
}

function refreshUserStat() {
  const total = ALL_SECTIONS.length;
  const done  = totalComplete();
  document.getElementById('user-stat-display').textContent = `${done} of ${total} complete`;
}

// ===== NAVIGATION =====
function navigateTo(page) {
  closeSidebar();
  updateProgress({ lastSection: page });

  // Update active nav
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });

  const container = document.getElementById('page-content');
  container.innerHTML = '';

  if (page === 'dashboard') {
    container.innerHTML = renderDashboard();
  } else if (page === 'cheatsheet') {
    container.innerHTML = renderCheatsheet();
  } else if (page.startsWith('lesson-')) {
    const id = page.replace('lesson-', '');
    container.innerHTML = renderLesson(id);
    initQuiz(id);
  } else if (page.startsWith('problem-')) {
    const id = page.replace('problem-', '');
    container.innerHTML = renderProblem(id);
    initProblemInteractions(id);
  }

  window.scrollTo(0, 0);
  document.getElementById('main-content').scrollTop = 0;
}

// ===== DASHBOARD =====
function renderDashboard() {
  const total   = ALL_SECTIONS.length;
  const done    = totalComplete();
  const pct     = Math.round((done / total) * 100);
  const p       = getProgress(currentUser);
  const last    = p.lastSection && p.lastSection !== 'dashboard' ? p.lastSection : null;
  const hour    = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const lessonsDone   = LESSON_ORDER.filter(id => isComplete('lesson-' + id)).length;
  const problemsDone  = PROBLEM_ORDER.filter(id => isComplete('problem-' + id)).length;

  let continueBtn = '';
  if (last) {
    const label = last.startsWith('lesson-')
      ? LESSONS[last.replace('lesson-', '')]?.title
      : PROBLEMS[last.replace('problem-', '')]?.title;
    continueBtn = `<button class="continue-btn" onclick="navigateTo('${last}')">▶ Continue: ${label || last}</button>`;
  }

  const lessonTiles = LESSON_ORDER.map(id => {
    const l = LESSONS[id];
    const done = isComplete('lesson-' + id);
    return `<div class="module-tile ${done ? 'done' : ''}" onclick="navigateTo('lesson-${id}')">
      <div class="tile-icon">${l.icon}</div>
      <div>
        <div class="tile-title">${l.title}</div>
        <div class="tile-meta">${l.time}</div>
        <div class="${done ? 'tile-done' : 'tile-todo'}">${done ? '✓ Complete' : 'Not started'}</div>
      </div>
    </div>`;
  }).join('');

  const problemTiles = PROBLEM_ORDER.map(id => {
    const pr = PROBLEMS[id];
    const done = isComplete('problem-' + id);
    const diffColor = pr.difficulty === 'Easy' ? '#4ade80' : '#facc15';
    return `<div class="module-tile ${done ? 'done' : ''}" onclick="navigateTo('problem-${id}')">
      <div class="tile-icon" style="font-size:1.1rem; color:${diffColor}">●</div>
      <div>
        <div class="tile-title">${pr.title}</div>
        <div class="tile-meta">${pr.difficulty} · ${pr.pattern}</div>
        <div class="${done ? 'tile-done' : 'tile-todo'}">${done ? '✓ Complete' : 'Not started'}</div>
      </div>
    </div>`;
  }).join('');

  return `
    <div class="welcome-card">
      <h2>${greeting}, ${currentUser}! 👋</h2>
      <p>Your Pinterest exam prep is ${pct === 0 ? 'ready to start' : pct + '% complete'}. Keep going — you've got this.</p>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      <div class="progress-text">${done} of ${total} sections complete</div>
      ${continueBtn}
    </div>

    <div class="stats-row">
      <div class="stat-box"><div class="stat-num">${lessonsDone}/6</div><div class="stat-label">Lessons Done</div></div>
      <div class="stat-box"><div class="stat-num">${problemsDone}/5</div><div class="stat-label">Problems Solved</div></div>
      <div class="stat-box"><div class="stat-num">${pct}%</div><div class="stat-label">Total Progress</div></div>
    </div>

    <div class="section-heading">📚 Lessons — Learn the Patterns</div>
    <div class="modules-grid">${lessonTiles}</div>

    <div class="section-heading">💻 Practice Problems</div>
    <div class="modules-grid">${problemTiles}</div>
  `;
}

// ===== LESSON RENDERER =====
function renderLesson(id) {
  const l = LESSONS[id];
  if (!l) return '<p>Lesson not found.</p>';
  const done = isComplete('lesson-' + id);

  const quizHtml = l.quiz.map((q, i) => `
    <div id="quiz-q-${i}" class="${i > 0 ? 'hidden' : ''}">
      <div class="quiz-q">${i + 1}. ${q.q}</div>
      <div class="quiz-opts" id="quiz-opts-${i}">
        ${q.opts.map((opt, j) => `<button class="quiz-opt" onclick="handleQuizAnswer('${id}', ${i}, ${j})">${opt}</button>`).join('')}
      </div>
      <div class="quiz-explain" id="quiz-explain-${i}"></div>
      <div class="quiz-nav" id="quiz-nav-${i}" style="display:none">
        ${i < l.quiz.length - 1
          ? `<button class="btn btn-outline btn-sm" onclick="showQuizQuestion(${i + 1}, ${l.quiz.length})">Next Question →</button>`
          : `<button class="btn btn-success btn-sm" onclick="finishQuiz('${id}')">Finish Quiz ✓</button>`}
      </div>
    </div>
  `).join('');

  return `
    <div class="page-header">
      <h1>${l.icon} ${l.title} ${done ? '<span class="tag tag-easy">✓ Complete</span>' : ''}</h1>
      <div class="subtitle">${l.description} · <em>${l.time}</em></div>
    </div>

    <div class="card">
      <div class="lesson-body">${l.body}</div>
    </div>

    <div class="card">
      <div class="quiz-wrapper">
        <div class="quiz-header">
          <h2>🧠 Quiz — Test Your Understanding</h2>
          <div class="quiz-counter" id="quiz-counter">${l.quiz.length} questions</div>
        </div>
        <div id="quiz-body">
          ${quizHtml}
          <div id="quiz-result" class="hidden quiz-done"></div>
        </div>
      </div>
    </div>
  `;
}

function initQuiz(id) {
  quizState[id] = { answers: {}, score: 0 };
}

function handleQuizAnswer(lessonId, qIndex, optIndex) {
  const l = LESSONS[lessonId];
  const q = l.quiz[qIndex];
  const optsEl = document.getElementById('quiz-opts-' + qIndex);
  const explEl = document.getElementById('quiz-explain-' + qIndex);
  const navEl  = document.getElementById('quiz-nav-' + qIndex);

  // Disable all options
  optsEl.querySelectorAll('.quiz-opt').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    else if (i === optIndex && optIndex !== q.correct) btn.classList.add('wrong');
  });

  // Show explanation
  explEl.textContent = (optIndex === q.correct ? '✓ Correct! ' : '✗ Not quite. ') + q.explain;
  explEl.classList.add('visible');
  navEl.style.display = 'flex';

  // Track score
  if (!quizState[lessonId]) quizState[lessonId] = { answers: {}, score: 0 };
  if (quizState[lessonId].answers[qIndex] === undefined) {
    quizState[lessonId].answers[qIndex] = optIndex;
    if (optIndex === q.correct) quizState[lessonId].score++;
  }
}

function showQuizQuestion(index, total) {
  document.querySelectorAll('[id^="quiz-q-"]').forEach((el, i) => {
    el.classList.toggle('hidden', i !== index);
  });
  const counter = document.getElementById('quiz-counter');
  if (counter) counter.textContent = `Question ${index + 1} of ${total}`;
}

function finishQuiz(lessonId) {
  const l     = LESSONS[lessonId];
  const state = quizState[lessonId] || { score: 0 };
  const score = state.score;
  const total = l.quiz.length;
  const pct   = Math.round((score / total) * 100);

  const msg = pct === 100
    ? '🎉 Perfect score! You nailed it.'
    : pct >= 66
    ? '👍 Nice work! Review any missed questions above.'
    : '📖 Keep studying — re-read the lesson and try again.';

  document.getElementById('quiz-body').innerHTML = `
    <div class="quiz-done">
      <div class="quiz-done-score">${score}/${total}</div>
      <div class="quiz-done-label">${pct}% correct</div>
      <div class="quiz-done-msg">${msg}</div>
      <div style="display:flex;gap:0.75rem;justify-content:center;flex-wrap:wrap;">
        <button class="btn btn-ghost" onclick="navigateTo('lesson-${lessonId}')">↺ Redo Lesson</button>
        ${!isComplete('lesson-' + lessonId) ? `<button class="btn btn-success" onclick="completeLesson('${lessonId}')">Mark Complete ✓</button>` : '<span style="color:#16a34a;font-weight:600">✓ Already marked complete</span>'}
      </div>
    </div>
  `;

  if (score === total) {
    markComplete('lesson-' + lessonId);
  }

  // Save score
  const p = getProgress(currentUser);
  if (!p.quizScores) p.quizScores = {};
  p.quizScores['lesson-' + lessonId] = pct;
  saveProgress(currentUser, p);
}

function completeLesson(lessonId) {
  markComplete('lesson-' + lessonId);
  navigateTo('lesson-' + lessonId);
}

// ===== PROBLEM RENDERER =====
function renderProblem(id) {
  const pr = PROBLEMS[id];
  if (!pr) return '<p>Problem not found.</p>';
  const done = isComplete('problem-' + id);
  const diffTag = pr.difficulty === 'Easy' ? 'tag-easy' : 'tag-medium';

  const examplesHtml = pr.examples.map((ex, i) => `
    <div class="example">
      <div class="example-label">Example ${i + 1}</div>
      <strong>Input:</strong> ${ex.input}<br>
      <strong>Output:</strong> ${ex.output}${ex.note ? `<br><em style="color:#6b7280">${ex.note}</em>` : ''}
    </div>
  `).join('');

  const hintsHtml = pr.hints.map((hint, i) => `
    <div class="hint-row">
      <button class="hint-toggle" onclick="toggleHint(${i})">
        💡 Hint ${i + 1} <span id="hint-arrow-${i}">▶</span>
      </button>
      <div class="hint-body" id="hint-body-${i}">${hint}</div>
    </div>
  `).join('');

  const stepsHtml = pr.solution.steps.map(s => `<li>${s}</li>`).join('');

  return `
    <div class="page-header">
      <h1>${pr.title}
        <span class="tag ${diffTag}">${pr.difficulty}</span>
        <span class="tag tag-pattern">${pr.pattern}</span>
        ${done ? '<span class="tag tag-easy">✓ Done</span>' : ''}
      </h1>
      <div class="subtitle">Practice using the 5-Step Decoder, then work through the hints before revealing the solution.</div>
    </div>

    <!-- Problem Description -->
    <div class="problem-desc">
      <p>${pr.description}</p>
      ${examplesHtml}
    </div>

    <!-- 5-Step Decoder -->
    <div class="decoder-card">
      <div class="decoder-title">🔍 5-Step Decoder — How to break this down</div>
      <div class="decoder-steps">
        <div class="d-step"><div class="d-num">1</div><div><div class="d-label">Restate It</div><div class="d-text">${pr.decoder.restate}</div></div></div>
        <div class="d-step"><div class="d-num">2</div><div><div class="d-label">Input</div><div class="d-text">${pr.decoder.input}</div></div></div>
        <div class="d-step"><div class="d-num">3</div><div><div class="d-label">Output</div><div class="d-text">${pr.decoder.output}</div></div></div>
        <div class="d-step"><div class="d-num">4</div><div><div class="d-label">Edge Cases</div><div class="d-text">${pr.decoder.edgeCases}</div></div></div>
        <div class="d-step"><div class="d-num">5</div><div><div class="d-label">Pattern</div><div class="d-text">${pr.decoder.pattern}</div></div></div>
      </div>
    </div>

    <!-- Hints -->
    <div class="hints-card">
      <div class="hints-title">💡 Hints — click to reveal one at a time</div>
      ${hintsHtml}
    </div>

    <!-- Try It Yourself -->
    <div class="try-section">
      <div class="try-label">✏️ Try it yourself <span style="font-weight:400;color:#6b7280;font-size:0.8rem">(optional — write your attempt before looking at the solution)</span></div>
      <textarea class="code-textarea" id="user-code-${id}" placeholder="function ${camelCase(pr.title)}(...) {&#10;  // your code here&#10;}"></textarea>
    </div>

    <!-- Solution -->
    <div class="solution-card">
      <div class="solution-header">
        <span>✅ Solution &amp; Explanation</span>
        <button class="btn btn-outline btn-sm" onclick="toggleSolution('${id}')">Reveal Solution</button>
      </div>
      <div class="solution-body" id="solution-body-${id}">
        <div class="code-block">${highlightCode(pr.solution.code)}</div>
        <strong style="font-size:0.875rem">Line-by-Line Breakdown:</strong>
        <ul class="step-list">${stepsHtml}</ul>
        <div class="complexity-row">
          <div class="complexity-box">
            <div class="complexity-type">Time Complexity</div>
            <div class="complexity-val">${pr.solution.time}</div>
            <div style="font-size:0.72rem;color:#4338ca;margin-top:0.2rem">${pr.solution.timeNote}</div>
          </div>
          <div class="complexity-box">
            <div class="complexity-type">Space Complexity</div>
            <div class="complexity-val">${pr.solution.space}</div>
            <div style="font-size:0.72rem;color:#4338ca;margin-top:0.2rem">${pr.solution.spaceNote}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mark Done -->
    <div class="mark-done-bar">
      <p>${done ? '✓ You\'ve already marked this complete.' : 'Once you understand the solution, mark it complete to track your progress.'}</p>
      ${done
        ? `<button class="btn btn-ghost btn-sm" onclick="unmarkComplete('problem-${id}')">Unmark</button>`
        : `<button class="btn btn-success" onclick="markProblemDone('${id}')">Mark as Complete ✓</button>`}
    </div>
  `;
}

function initProblemInteractions(id) {
  // nothing async needed — all handlers are inline
}

function toggleHint(index) {
  const body  = document.getElementById('hint-body-' + index);
  const arrow = document.getElementById('hint-arrow-' + index);
  const open  = body.classList.toggle('open');
  if (arrow) arrow.textContent = open ? '▼' : '▶';
}

function toggleSolution(id) {
  const body = document.getElementById('solution-body-' + id);
  const btn  = body.previousElementSibling.querySelector('button');
  const open = body.classList.toggle('open');
  if (btn) btn.textContent = open ? 'Hide Solution' : 'Reveal Solution';
}

function markProblemDone(id) {
  markComplete('problem-' + id);
  navigateTo('problem-' + id);
}

function unmarkComplete(sectionId) {
  const p = getProgress(currentUser);
  delete p.completed[sectionId];
  saveProgress(currentUser, p);
  refreshSidebarBadges();
  refreshUserStat();
  navigateTo(sectionId);
}

// ===== CHEAT SHEET =====
function renderCheatsheet() {
  return `
    <div class="page-header">
      <h1>📋 JavaScript Cheat Sheet</h1>
      <div class="subtitle">Quick reference for everything you'll reach for on the exam.</div>
    </div>

    <div class="cheat-grid">
      <div class="cheat-section card">
        <h3>Arrays</h3>
        <table class="cheat-table">
          <tr><td>arr.length</td><td>number of elements</td></tr>
          <tr><td>arr[i]</td><td>access element at index i</td></tr>
          <tr><td>arr.push(x)</td><td>add x to the end</td></tr>
          <tr><td>arr.pop()</td><td>remove & return last element</td></tr>
          <tr><td>arr.includes(x)</td><td>true if x is in array</td></tr>
          <tr><td>arr.indexOf(x)</td><td>position of x (or -1)</td></tr>
          <tr><td>arr.slice(i, j)</td><td>copy from i up to (not inc) j</td></tr>
          <tr><td>arr.sort()</td><td>sort in-place (modifies arr)</td></tr>
        </table>
      </div>

      <div class="cheat-section card">
        <h3>Strings</h3>
        <table class="cheat-table">
          <tr><td>str.length</td><td>number of characters</td></tr>
          <tr><td>str[i]</td><td>character at index i</td></tr>
          <tr><td>str.split("")</td><td>string → array of chars</td></tr>
          <tr><td>str.toLowerCase()</td><td>all lowercase</td></tr>
          <tr><td>str.toUpperCase()</td><td>all uppercase</td></tr>
          <tr><td>str.includes(x)</td><td>true if x is in string</td></tr>
          <tr><td>str.indexOf(x)</td><td>position of x (or -1)</td></tr>
          <tr><td>str.trim()</td><td>remove leading/trailing spaces</td></tr>
        </table>
      </div>

      <div class="cheat-section card">
        <h3>Map (HashMap)</h3>
        <table class="cheat-table">
          <tr><td>new Map()</td><td>create empty Map</td></tr>
          <tr><td>map.set(k, v)</td><td>store key → value</td></tr>
          <tr><td>map.get(k)</td><td>retrieve value by key</td></tr>
          <tr><td>map.has(k)</td><td>true if key exists</td></tr>
          <tr><td>map.delete(k)</td><td>remove a key</td></tr>
          <tr><td>map.size</td><td>number of entries</td></tr>
          <tr><td>map.get(k) || 0</td><td>get value, default to 0</td></tr>
        </table>
      </div>

      <div class="cheat-section card">
        <h3>Set</h3>
        <table class="cheat-table">
          <tr><td>new Set()</td><td>create empty Set</td></tr>
          <tr><td>set.add(x)</td><td>add x (ignored if exists)</td></tr>
          <tr><td>set.has(x)</td><td>true if x is in Set</td></tr>
          <tr><td>set.delete(x)</td><td>remove x</td></tr>
          <tr><td>set.size</td><td>number of unique items</td></tr>
        </table>
      </div>

      <div class="cheat-section card">
        <h3>Math & Numbers</h3>
        <table class="cheat-table">
          <tr><td>Math.max(a, b)</td><td>returns the larger value</td></tr>
          <tr><td>Math.min(a, b)</td><td>returns the smaller value</td></tr>
          <tr><td>Math.abs(x)</td><td>absolute value</td></tr>
          <tr><td>Infinity</td><td>bigger than any number</td></tr>
          <tr><td>-Infinity</td><td>smaller than any number</td></tr>
          <tr><td>Math.floor(x)</td><td>round down to integer</td></tr>
          <tr><td>Number.isInteger(x)</td><td>true if x has no decimal</td></tr>
        </table>
      </div>

      <div class="cheat-section card">
        <h3>Loops Quick Reference</h3>
        <div class="code-block" style="font-size:0.78rem;padding:0.85rem 1rem"><span class="cmt">// Classic (use when you need index)</span>
<span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; arr.length; i++) {}

<span class="cmt">// for...of (use for values)</span>
<span class="kw">for</span> (<span class="kw">const</span> val <span class="kw">of</span> arr) {}

<span class="cmt">// for...of string</span>
<span class="kw">for</span> (<span class="kw">const</span> char <span class="kw">of</span> str) {}

<span class="cmt">// while (Two Pointers / Sliding)</span>
<span class="kw">while</span> (left &lt; right) {}</div>
      </div>

      <div class="cheat-section card" style="grid-column: span 2">
        <h3>Big-O Cheat Sheet</h3>
        <table class="cheat-table">
          <tr><td>O(1)</td><td>Constant — Map.get(), arr[i], a single variable assignment</td></tr>
          <tr><td>O(n)</td><td>Linear — one loop through n elements</td></tr>
          <tr><td>O(n²)</td><td>Quadratic — nested loops (loop inside a loop)</td></tr>
          <tr><td>O(n) time + O(n) space</td><td>One loop + a HashMap/Set that stores up to n things</td></tr>
          <tr><td>O(n) time + O(1) space</td><td>One loop + only a few variables (no growing structure)</td></tr>
        </table>
      </div>
    </div>
  `;
}

// ===== UTILITIES =====
function highlightCode(code) {
  // Escape HTML first
  let s = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Order matters — comments first, then strings, then keywords
  s = s.replace(/(\/\/[^\n]*)/g, '<span class="cmt">$1</span>');
  s = s.replace(/(<span class="cmt">.*?<\/span>)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/g,
    (m, cmt, str) => cmt || `<span class="str">${str}</span>`);
  s = s.replace(/(<span[^>]*>.*?<\/span>)|\b(const|let|var|function|return|for|while|if|else|of|in|new|true|false|null|undefined)\b/g,
    (m, span, kw) => span || `<span class="kw">${kw}</span>`);
  s = s.replace(/(<span[^>]*>.*?<\/span>)|\b(Infinity|Math|Map|Set|console|Object|Array|Number)\b/g,
    (m, span, fn) => span || `<span class="fn">${fn}</span>`);
  s = s.replace(/(<span[^>]*>.*?<\/span>)|\b(\d+)\b/g,
    (m, span, num) => span || `<span class="num">${num}</span>`);
  return s;
}

function camelCase(str) {
  return str.replace(/\s+(.)/g, (_, c) => c.toUpperCase()).replace(/^./, c => c.toLowerCase());
}

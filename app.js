// ---------- Audio setup ----------
// Pre-rendered WAV files instead of live Web Audio synthesis: iOS Safari is
// notoriously unreliable at unlocking AudioContext-generated sound (it works
// fine on desktop Chrome, but silently drops it on iPhone even after the
// standard unlock tricks). Plain <audio> playback triggered from a tap is
// the most battle-tested way to get sound working across all browsers.
function playAudioFile(url) {
  return new Promise(resolve => {
    const audio = new Audio(url);
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve();
    };
    audio.addEventListener("ended", finish);
    audio.addEventListener("error", finish);
    audio.play().catch(finish);
    // Safety net in case a browser never fires ended/error (longer than our
    // longest clip — Vader's combined breath+voice is ~7.75s).
    setTimeout(finish, 12000);
  });
}

function playR2D2() {
  return playAudioFile("sounds/r2d2.wav");
}

function playBB8() {
  return playAudioFile("sounds/bb8.wav");
}

function playGrowl() {
  return playAudioFile("sounds/chewbacca.wav");
}

// Every character's line, including Vader's breathing + voice, is a single
// pre-rendered clip (generated offline with the system's Spanish voices) —
// no live browser speech synthesis or Web Audio synthesis involved, so there's
// nothing left for a mobile browser to silently drop or mistime.
function playC3PO() {
  return playAudioFile("sounds/c3po.wav");
}

function playYoda() {
  return playAudioFile("sounds/yoda.wav");
}

function playVader() {
  return playAudioFile("sounds/vader.wav");
}

function playHanSolo() {
  return playAudioFile("sounds/hansolo.wav");
}

function playLeia() {
  return playAudioFile("sounds/leia.wav");
}

function playObiWan() {
  return playAudioFile("sounds/obiwan.wav");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ---------- Icons ----------
const icons = {
  r2d2: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
    <path d="M32,50 A28,28 0 0 1 88,50 Z" fill="#d6d9de"/>
    <circle cx="60" cy="38" r="6" fill="#5ac8e8"/>
    <rect x="30" y="50" width="60" height="70" rx="10" fill="#e9ebee"/>
    <rect x="53" y="60" width="14" height="50" fill="#5ac8e8" opacity="0.85"/>
    <circle cx="42" cy="72" r="4" fill="#b9bdc4"/>
    <circle cx="42" cy="86" r="4" fill="#b9bdc4"/>
  </svg>`,
  bb8: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="92" r="38" fill="#f0f1f3"/>
    <path d="M24,75 Q60,100 96,75" stroke="#e0742a" stroke-width="13" fill="none"/>
    <circle cx="60" cy="40" r="17" fill="#e0742a"/>
    <circle cx="55" cy="35" r="4" fill="#f0f1f3"/>
  </svg>`,
  c3po: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
    <rect x="35" y="28" width="50" height="58" rx="18" fill="#e8c15a"/>
    <ellipse cx="49" cy="52" rx="6" ry="8" fill="#241a06"/>
    <ellipse cx="71" cy="52" rx="6" ry="8" fill="#241a06"/>
    <rect x="45" y="86" width="30" height="14" rx="4" fill="#c9a248"/>
  </svg>`,
  yoda: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
    <path d="M30,55 C15,45 10,25 22,20 C34,16 38,40 40,55 Z" fill="#7fae5a"/>
    <path d="M90,55 C105,45 110,25 98,20 C86,16 82,40 80,55 Z" fill="#7fae5a"/>
    <ellipse cx="60" cy="75" rx="30" ry="32" fill="#8fbf68"/>
    <ellipse cx="50" cy="72" rx="4" ry="5" fill="#241a06"/>
    <ellipse cx="70" cy="72" rx="4" ry="5" fill="#241a06"/>
  </svg>`,
  vader: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
    <path d="M60,18 C86,18 96,44 91,70 C88,92 76,108 60,112 C44,108 32,92 29,70 C24,44 34,18 60,18 Z" fill="#1c1c22" stroke="#3f3f48" stroke-width="1.5"/>
    <line x1="60" y1="20" x2="60" y2="108" stroke="#4a4a54" stroke-width="2"/>
    <ellipse cx="48" cy="60" rx="7" ry="5" fill="#8a2a2a"/>
    <ellipse cx="72" cy="60" rx="7" ry="5" fill="#8a2a2a"/>
  </svg>`,
  chewbacca: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
    <path d="M60,22 C88,22 100,50 96,78 C93,102 78,116 60,116 C42,116 27,102 24,78 C20,50 32,22 60,22 Z" fill="#8a5a34"/>
    <g stroke="#6b4526" stroke-width="2">
      <line x1="40" y1="40" x2="36" y2="48"/>
      <line x1="52" y1="34" x2="49" y2="43"/>
      <line x1="68" y1="34" x2="71" y2="43"/>
      <line x1="80" y1="40" x2="84" y2="48"/>
      <line x1="36" y1="70" x2="30" y2="76"/>
      <line x1="84" y1="70" x2="90" y2="76"/>
    </g>
    <ellipse cx="50" cy="65" rx="4" ry="5" fill="#1a1006"/>
    <ellipse cx="70" cy="65" rx="4" ry="5" fill="#1a1006"/>
    <line x1="30" y1="55" x2="80" y2="90" stroke="#caa46b" stroke-width="9"/>
  </svg>`,
  hansolo: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="80" rx="26" ry="29" fill="#d9a570"/>
    <path d="M32,58 C30,32 45,19 60,19 C78,19 90,33 88,58 C82,47 70,42 60,44 C48,42 38,49 32,58 Z" fill="#4a3320"/>
    <path d="M35,122 L46,100 L60,110 L74,100 L85,122 Z" fill="#6b4a2a"/>
    <path d="M52,108 L60,122 L68,108 Z" fill="#e9e6df"/>
  </svg>`,
  leia: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
    <path d="M30,70 C28,40 42,20 60,20 C78,20 92,40 90,70 C90,80 84,80 84,68 C84,50 74,38 60,38 C46,38 36,50 36,68 C36,80 30,80 30,70 Z" fill="#5c3a21"/>
    <ellipse cx="60" cy="80" rx="25" ry="28" fill="#d9a570"/>
    <circle cx="27" cy="74" r="14" fill="#5c3a21"/>
    <circle cx="93" cy="74" r="14" fill="#5c3a21"/>
    <rect x="48" y="113" width="24" height="14" rx="4" fill="#f4f1ea"/>
  </svg>`,
  obiwan: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
    <path d="M60,14 C92,14 102,46 97,78 C94,104 79,120 60,122 C41,120 26,104 23,78 C18,46 28,14 60,14 Z" fill="#a68a5b"/>
    <ellipse cx="60" cy="82" rx="26" ry="27" fill="#8a7048"/>
    <ellipse cx="60" cy="82" rx="19" ry="21" fill="#d9a570"/>
    <path d="M44,94 C48,107 72,107 76,94 C70,102 50,102 44,94 Z" fill="#d8d5cc"/>
  </svg>`
};

// ---------- Characters ----------
const characters = [
  {
    id: "r2d2",
    name: "R2-D2",
    line: "🔊 bip · bip · BOOP · wiiii · bip",
    translation: "Traducción binaria: “¡Que la Fuerza los acompañe, Juan y Giovanna! Que disfruten cada minuto de esta boda.”",
    play: playR2D2
  },
  {
    id: "bb8",
    name: "BB-8",
    line: "🔊 bip-bip-bip · wooo · bip-bip",
    translation: "Traducción: “¡Rodando de la emoción! Gracias por celebrar este día con nosotros.”",
    play: playBB8
  },
  {
    id: "c3po",
    name: "C-3PO",
    line: "“Oh, cielos. Millones de circuitos se activan para anunciar esta boda.”",
    translation: "“Las probabilidades de una celebración maravillosa hoy son... prácticamente absolutas.”",
    play: playC3PO
  },
  {
    id: "yoda",
    name: "Yoda",
    line: "“Casarse van, Juan y Giovanna. Sí, hmmm.”",
    translation: "“Con la Fuerza, celebrar hoy debes. Un gran día, este es.”",
    play: playYoda
  },
  {
    id: "vader",
    name: "Darth Vader",
    line: "“Juan... Giovanna... Su unión, el Imperio no podrá detener.”",
    translation: "“Disfruten la celebración. No me obliguen a usar la Fuerza para que bailen.”",
    play: playVader
  },
  {
    id: "chewbacca",
    name: "Chewbacca",
    line: "🔊 Grrraaawrrr... wrrooaaargh!",
    translation: "Traducción wookiee: “¡Auuu! Que disfrutes la boda de Juan y Giovanna.”",
    play: playGrowl
  },
  {
    id: "hansolo",
    name: "Han Solo",
    line: "“Nunca digas que las probabilidades son malas. Y las de esta boda están a mi favor.”",
    translation: "“Disfruta la fiesta... la comida aquí es mejor que en el Halcón Milenario.”",
    play: playHanSolo
  },
  {
    id: "leia",
    name: "Leia Organa",
    line: "“Ayúdanos, invitado. Eres nuestra única esperanza de llegar a tiempo a esta boda.”",
    translation: "“Gracias por acompañarnos en este día tan especial, general.”",
    play: playLeia
  },
  {
    id: "obiwan",
    name: "Obi-Wan Kenobi",
    line: "“Hola ahí. Esto no es la boda que buscabas... es mejor.”",
    translation: "“Que la Fuerza los acompañe en esta celebración de Juan y Giovanna.”",
    play: playObiWan
  }
];

// ---------- UI wiring ----------
const introEl = document.getElementById("intro");
const cardEl = document.getElementById("card");
const iconSlot = document.getElementById("icon-slot");
const nameEl = document.getElementById("char-name");
const lineEl = document.getElementById("char-line");
const translationEl = document.getElementById("char-translation");
const revealBtn = document.getElementById("reveal-btn");
const replayBtn = document.getElementById("replay-btn");
const againBtn = document.getElementById("again-btn");
const actionsEl = document.getElementById("actions");

let current = null;

function pickCharacter(excludeId) {
  const pool = excludeId ? characters.filter(c => c.id !== excludeId) : characters;
  return pool[Math.floor(Math.random() * pool.length)];
}

function setPlaying(isPlaying) {
  replayBtn.disabled = isPlaying;
  againBtn.disabled = isPlaying;
  actionsEl.classList.toggle("playing", isPlaying);
}

function withHardTimeout(promise, ms) {
  return Promise.race([Promise.resolve(promise), sleep(ms)]);
}

async function playSound(char) {
  setPlaying(true);
  try {
    // Hard cap so the buttons never stay stuck, no matter what happens
    // inside char.play() (dropped events, audio quirks, etc.). Longer than
    // playAudioFile's own safety net so that one gets a chance to fire first.
    await withHardTimeout(char.play(), 14000);
  } catch (err) {
    console.error("Sound playback error:", err);
  } finally {
    setPlaying(false);
  }
}

async function showCharacter(char) {
  current = char;
  iconSlot.innerHTML = icons[char.id];
  nameEl.textContent = char.name;
  lineEl.textContent = char.line;
  translationEl.textContent = char.translation;
  cardEl.classList.remove("hidden");
  introEl.classList.add("hidden");
  await playSound(char);
}

revealBtn.addEventListener("click", () => {
  showCharacter(pickCharacter());
});

replayBtn.addEventListener("click", () => {
  if (replayBtn.disabled) return;
  if (current) playSound(current);
});

againBtn.addEventListener("click", () => {
  if (againBtn.disabled) return;
  cardEl.classList.remove("hidden");
  showCharacter(pickCharacter(current ? current.id : null));
});

// ---------- Imperial Star Destroyer ----------
// Passes overhead every so often — unlike the TIE fighter/X-wing, which
// loop continuously, this one is a periodic one-off event, kicked off from
// JS so its timing is independent of the little fighters.
const destroyerEl = document.getElementById("bg-destroyer");

function passDestroyer() {
  destroyerEl.classList.remove("pass");
  void destroyerEl.offsetWidth; // restart the animation each time
  destroyerEl.classList.add("pass");
  // One turbolaser shot, timed to fire roughly when the ship is mid-crossing.
  setTimeout(fireLaserFromDestroyer, 11500);
}

destroyerEl.addEventListener("animationend", () => {
  destroyerEl.classList.remove("pass");
});

// A single laser bolt + impact flash fired from wherever the Destroyer
// currently is, angled down toward a nearby random point. Elements are
// created on demand and removed once their animation finishes.
function fireLaserFromDestroyer() {
  const rect = destroyerEl.getBoundingClientRect();
  if (rect.width === 0) return; // ship isn't actually on screen right now

  const startX = rect.left + rect.width * 0.9;
  const startY = rect.top + rect.height * 0.55;
  const targetX = startX + 50 + Math.random() * 70;
  const targetY = startY + 60 + Math.random() * 100;
  const dx = targetX - startX;
  const dy = targetY - startY;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  // Wrapper holds the static rotation; the inner .laser-bolt gets the
  // CSS-animated scale/opacity (see the CSS comment for why these can't
  // be the same element).
  const wrap = document.createElement("div");
  wrap.className = "laser-bolt-wrap";
  wrap.style.left = `${startX}px`;
  wrap.style.top = `${startY}px`;
  wrap.style.width = `${length}px`;
  wrap.style.transform = `rotate(${angle}deg)`;
  const bolt = document.createElement("div");
  bolt.className = "laser-bolt";
  wrap.appendChild(bolt);
  document.body.appendChild(wrap);
  void wrap.offsetWidth; // make sure the animation is recognized as fresh
  setTimeout(() => wrap.remove(), 400);

  setTimeout(() => {
    const impact = document.createElement("div");
    impact.className = "laser-impact";
    impact.style.left = `${targetX}px`;
    impact.style.top = `${targetY}px`;
    document.body.appendChild(impact);
    void impact.offsetWidth;
    setTimeout(() => impact.remove(), 500);
  }, 280);
}

setTimeout(passDestroyer, 12000);
setInterval(passDestroyer, 90000);

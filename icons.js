// Заменяет эмодзи на странице единым набором линейных иконок.
// Работает для всего текста, включая сообщения от сервера: следит за изменениями страницы.
(() => {
  // рисунки иконок (поле 24×24, линии цветом текста)
  const P = {
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    search: '<circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/>',
    history: '<path d="M3 12a9 9 0 1 0 3-6.7"/><polyline points="3 4 3 8.5 7.5 8.5"/><polyline points="12 7.5 12 12 15.5 14"/>',
    bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
    settings: '<path d="M4 7h3M12 7h8M4 17h8M17 17h3"/><circle cx="9.5" cy="7" r="2.5"/><circle cx="14.5" cy="17" r="2.5"/>',
    bot: '<rect x="4" y="8" width="16" height="12" rx="3"/><line x1="12" y1="8" x2="12" y2="4.5"/><circle cx="12" cy="3.5" r="1"/><line x1="9" y1="13" x2="9" y2="14.5"/><line x1="15" y1="13" x2="15" y2="14.5"/><path d="M2 13v3M22 13v3"/>',
    coin: '<circle cx="12" cy="12" r="9"/><path d="M14.6 9.6c-.6-.9-1.5-1.3-2.7-1.3-1.5 0-2.6.8-2.6 2 0 2.6 5.5 1.2 5.5 3.8 0 1.2-1.1 2-2.8 2-1.2 0-2.2-.5-2.8-1.4"/><path d="M12 6.5v1.8M12 16.1v1.4"/>',
    bolt: '<polygon points="13 2 4 14 11 14 10 22 20 9.5 13 9.5"/>',
    phone: '<rect x="6" y="2" width="12" height="20" rx="2.5"/><line x1="12" y1="6.5" x2="12" y2="13.5"/><polyline points="9 11 12 14 15 11"/><line x1="10.5" y1="18.5" x2="13.5" y2="18.5"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z"/>',
    trendup: '<polyline points="3 17 9 11 13 15 21 7"/><polyline points="15 7 21 7 21 13"/>',
    trenddown: '<polyline points="3 7 9 13 13 9 21 17"/><polyline points="15 17 21 17 21 11"/>',
    down: '<line x1="12" y1="4" x2="12" y2="19"/><polyline points="6 13 12 19 18 13"/>',
    upright: '<line x1="6" y1="18" x2="18" y2="6"/><polyline points="9 6 18 6 18 15"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    wallet: '<path d="M3 8V6.5A1.5 1.5 0 0 1 4.5 5H18v3"/><rect x="3" y="8" width="18" height="12" rx="2"/><line x1="16" y1="14" x2="17.5" y2="14"/>',
    whale: '<path d="M3 12c3-5 9-6 13-3l5-3v12l-5-3c-4 3-10 2-13-3z"/><line x1="8" y1="11" x2="8" y2="11.5"/>',
    xcircle: '<circle cx="12" cy="12" r="9"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/>',
    clock: '<circle cx="12" cy="13" r="8"/><polyline points="12 9 12 13 15 15"/><line x1="10" y1="2.5" x2="14" y2="2.5"/>',
    alert: '<path d="M12 3.5l9.5 16.5h-19z"/><line x1="12" y1="10" x2="12" y2="14.5"/><line x1="12" y1="17.2" x2="12" y2="17.4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.3 9.4a2.8 2.8 0 0 1 5.4.9c0 1.9-2.7 2.3-2.7 4"/><line x1="12" y1="17" x2="12" y2="17.2"/>',
    key: '<circle cx="8" cy="15.5" r="4.5"/><path d="M11.2 12.3L20 3.5M16.5 7l3 3M13.8 9.7l2 2"/>',
    info: '<circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16.5"/><line x1="12" y1="7.6" x2="12" y2="7.8"/>',
    check: '<circle cx="12" cy="12" r="9"/><polyline points="8 12.5 11 15.5 16 9.5"/>',
    x: '<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    pluscircle: '<circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>',
    minus: '<line x1="5" y1="12" x2="19" y2="12"/>',
    flame: '<path d="M12 3c1 3.5 5 5.5 5 10.5a5 5 0 0 1-10 0c0-2 .8-3.4 2-4.5.3 1.6 1 2.5 2 3 .2-3-1-5.5 1-9z"/>',
    snow: '<line x1="12" y1="3" x2="12" y2="21"/><line x1="4.2" y1="7.5" x2="19.8" y2="16.5"/><line x1="4.2" y1="16.5" x2="19.8" y2="7.5"/>',
    star: '<polygon points="12 3 14.8 9 21.3 9.8 16.5 14.3 17.8 20.8 12 17.6 6.2 20.8 7.5 14.3 2.7 9.8 9.2 9"/>',
    cloud: '<path d="M7 18a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 10.2a4 4 0 0 1-.5 7.8z"/>',
    scale: '<line x1="12" y1="4" x2="12" y2="20"/><line x1="5" y1="7" x2="19" y2="7"/><path d="M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/><line x1="8" y1="20" x2="16" y2="20"/>',
    oct: '<polygon points="8 3 16 3 21 8 21 16 16 21 8 21 3 16 3 8"/><line x1="12" y1="8" x2="12" y2="13"/><line x1="12" y1="16.2" x2="12" y2="16.4"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v2"/><line x1="3" y1="13" x2="21" y2="13"/>',
    play: '<polygon points="7 4 20 12 7 20"/>',
    pause: '<line x1="8" y1="5" x2="8" y2="19"/><line x1="16" y1="5" x2="16" y2="19"/>',
    globe: '<circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',
    activity: '<polyline points="3 12 7 12 10 5 14 19 17 12 21 12"/>',
    book: '<path d="M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2z"/><line x1="9" y1="4" x2="9" y2="20"/><line x1="12.5" y1="9" x2="15.5" y2="9"/>',
    save: '<path d="M5 3h11l4 4v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><rect x="8" y="13" width="8" height="8"/><polyline points="8 3 8 8 14 8"/>',
    camera: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7l1.5-3h5L16 7"/><circle cx="12" cy="13.5" r="3.5"/>',
    pin: '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    music: '<path d="M9 18V5l10-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
    send: '<polygon points="21 3 3 10.5 10 13.5 13 21"/><line x1="10" y1="13.5" x2="21" y2="3"/>',
    trash: '<line x1="4" y1="7" x2="20" y2="7"/><path d="M9 7V4h6v3M6.5 7l1 13h9l1-13"/>',
    volume: '<polygon points="4 9 8 9 13 5 13 19 8 15 4 15"/><path d="M16.5 9a4 4 0 0 1 0 6M19 6.5a8 8 0 0 1 0 11"/>',
    folder: '<path d="M3 6a1.5 1.5 0 0 1 1.5-1.5H9l2.5 3h8A1.5 1.5 0 0 1 21 9v9.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z"/>',
    drop: '<path d="M12 3s6.5 7 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10 12 3 12 3z"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    cart: '<path d="M3 4h2.5l2.2 11h10.5l2-8H7"/><circle cx="9.5" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/>',
    chart: '<line x1="5" y1="20" x2="5" y2="11"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="19" y1="20" x2="19" y2="14"/>',
    clip: '<path d="M20 11.5l-8 8a5 5 0 0 1-7-7l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7L10 16.9a1.7 1.7 0 0 1-2.4-2.4l7.4-7.4"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.5-4M4 13a8 8 0 0 0 14.5 4"/><polyline points="5 3 5 7.5 9.5 7.5"/><polyline points="19 21 19 16.5 14.5 16.5"/>',
  };
  // какой эмодзи какой иконкой заменить
  const M = {
    "🏠": "home", "🔎": "search", "🔍": "search", "📜": "history", "🔔": "bell", "⚙": "settings", "🤖": "bot", "🪙": "coin", "⚡": "bolt",
    "📲": "phone", "🛡": "shield", "📈": "trendup", "📉": "trenddown", "🔻": "down", "⬇": "down", "🚀": "upright", "🎯": "target", "💰": "wallet",
    "🐋": "whale", "💥": "xcircle", "⏱": "clock", "⏳": "clock", "🚨": "alert", "⚠": "alert", "❗": "alert", "✋": "user", "🎮": "user",
    "❓": "help", "🤔": "help", "🔑": "key", "ℹ": "info", "✅": "check", "❌": "x", "➕": "plus", "🆕": "pluscircle", "➖": "minus",
    "🔥": "flame", "❄": "snow", "⭐": "star", "☁": "cloud", "⚖": "scale", "💀": "oct", "🛑": "oct", "💼": "briefcase", "▶": "play", "⏸": "pause",
    "🌐": "globe", "🩺": "activity", "📒": "book", "🎓": "book", "💾": "save", "📷": "camera", "📌": "pin", "📍": "pin", "🎵": "music", "✈": "send",
    "🗑": "trash", "🧹": "trash", "🔊": "volume", "📂": "folder", "💧": "drop", "💬": "chat", "👽": "chat", "🛒": "cart", "📊": "chart", "📎": "clip", "🔄": "refresh",
  };
  const DOT = { "🟢": "g", "🟡": "y", "🔴": "r", "⚪": "u" };
  for (const o of [M, DOT]) for (const k of Object.keys(o)) { const c = k.replace(/\uFE0F/g, ""); if (c !== k) { o[c] = o[k]; delete o[k]; } }
  const RE = new RegExp("(" + [...Object.keys(M), ...Object.keys(DOT)].join("|") + ")\\uFE0F?", "gu");
  const NS = "http://www.w3.org/2000/svg";

  const css = document.createElement("style");
  css.textContent = `svg.i{width:1.15em;height:1.15em;vertical-align:-.2em;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex:none}
.idot{display:inline-block;width:.72em;height:.72em;border-radius:50%;background:#6e7681;vertical-align:.02em}
.idot.g{background:#3fb950}.idot.y{background:#d29922}.idot.r{background:#f85149}
svg.i-flame{color:#f0883e}svg.i-snow{color:#58a6ff}svg.i-alert,svg.i-oct,svg.i-xcircle{color:#f85149}svg.i-check{color:#3fb950}
.star svg.i{color:#8b949e}.star.on svg.i{color:#d29922;fill:#d29922}`;
  document.head.appendChild(css);

  function make(ch) {
    const d = DOT[ch];
    if (d) { const s = document.createElement("span"); s.className = "idot " + d; return s; }
    const n = M[ch], el = document.createElementNS(NS, "svg");
    el.setAttribute("class", "i i-" + n); el.setAttribute("viewBox", "0 0 24 24"); el.setAttribute("aria-hidden", "true");
    el.innerHTML = P[n];
    return el;
  }
  function fix(node) {
    const t = node.nodeValue, par = node.parentNode;
    if (!t || !par) return;
    RE.lastIndex = 0;
    if (!RE.test(t)) return;
    const tag = par.nodeName;
    if (tag === "SCRIPT" || tag === "STYLE" || tag === "TEXTAREA" || tag === "TITLE") return;
    RE.lastIndex = 0;
    if (tag === "OPTION") { node.nodeValue = t.replace(RE, "").replace(/\s{2,}/g, " ").replace(/^\s+/, ""); return; } // в списках картинок не бывает
    const frag = document.createDocumentFragment(); let last = 0, m;
    while ((m = RE.exec(t))) {
      if (m.index > last) frag.appendChild(document.createTextNode(t.slice(last, m.index)));
      frag.appendChild(make(m[1])); last = m.index + m[0].length;
    }
    if (last < t.length) frag.appendChild(document.createTextNode(t.slice(last)));
    par.replaceChild(frag, node);
  }
  function scan(root) {
    if (root.nodeType === 3) return fix(root);
    if (root.nodeType !== 1 || root.namespaceURI === NS) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), list = [];
    while (w.nextNode()) list.push(w.currentNode);
    list.forEach(fix);
  }
  new MutationObserver((ms) => {
    for (const m of ms) { if (m.type === "characterData") fix(m.target); else m.addedNodes.forEach(scan); }
  }).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  scan(document.documentElement);
})();

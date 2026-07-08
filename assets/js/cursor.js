const useCursor = localStorage.getItem("cherri_customCursor") ?? "yes";

let animationId = null;
let mouseMoveHandler = null;
let messageHandler = null;
let hideInterval = null;

function cursor() {
  const cursor = document.createElement("div");
  cursor.style.position = "fixed";
  cursor.style.top = "0";
  cursor.style.left = "0";
  cursor.style.width = "16px";
  cursor.style.height = "16px";
  cursor.style.borderRadius = "50%";
  cursor.style.background = "white";
  cursor.style.pointerEvents = "none";
  cursor.style.zIndex = "9999";
  cursor.style.transform = "translate(-50%, -50%)";
  cursor.style.transition =
    "width 0.15s ease, height 0.15s ease, opacity 0.15s ease, 0.0412s transform";
  cursor.style.mixBlendMode = "difference";
  cursor.id = "cursor-thank-you-zxs";
  document.body.appendChild(cursor);

  let cursorVisible = true;
  let lastMove = Date.now();
  let mouseX = 0;
  let mouseY = 0;
  let displayX = 0;
  let displayY = 0;

  function animate() {
    displayX += (mouseX - displayX) * 0.25;
    displayY += (mouseY - displayY) * 0.25;
    cursor.style.transform = `translate(${displayX - 8}px, ${displayY - 8}px)`;
    animationId = requestAnimationFrame(animate);
  }
  animate();

  function updateCursor(x, y) {
    mouseX = x;
    mouseY = y;
    lastMove = Date.now();
    if (!cursorVisible) showCursor();
  }

  mouseMoveHandler = (e) => updateCursor(e.clientX, e.clientY);
  window.addEventListener("mousemove", mouseMoveHandler);

  messageHandler = (e) => {
    const data = e.data;
    if (!data || typeof data !== "object") return;

    const iframe = Array.from(document.querySelectorAll("iframe")).find(
      (f) => f.contentWindow === e.source
    );
    let offsetX = 0,
      offsetY = 0;
    if (iframe) {
      const rect = iframe.getBoundingClientRect();
      offsetX = rect.left;
      offsetY = rect.top;
    }

    if (data.type === "cursorMove")
      updateCursor(data.x + offsetX, data.y + offsetY);
  };
  window.addEventListener("message", messageHandler);

  const hideCursorStyle = document.createElement("style");
  hideCursorStyle.textContent = `* { cursor: none !important; }`;
  hideCursorStyle.id = "cursor-style-zxs";
  document.head.appendChild(hideCursorStyle);

  hideInterval = setInterval(() => {
    if (Date.now() - lastMove > 500 && cursorVisible) hideCursor();
  }, 250);

  function hideCursor() {
    cursor.style.opacity = "0";
    cursorVisible = false;
  }

  function showCursor() {
    cursor.style.opacity = "1";
    cursorVisible = true;
  }
}

function removeCursor() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  if (mouseMoveHandler) {
    window.removeEventListener("mousemove", mouseMoveHandler);
    mouseMoveHandler = null;
  }
  if (messageHandler) {
    window.removeEventListener("message", messageHandler);
    messageHandler = null;
  }
  if (hideInterval) {
    clearInterval(hideInterval);
    hideInterval = null;
  }
  const cursorEl = document.getElementById("cursor-thank-you-zxs");
  const cursorStyle = document.getElementById("cursor-style-zxs");
  if (cursorEl) cursorEl.style.opacity = "0";
  if (cursorStyle) cursorStyle.remove();
}

if (useCursor === "yes") {
  cursor();
}
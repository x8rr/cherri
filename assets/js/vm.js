const COOLDOWN = 20 * 60 * 1000;
const STORAGE_KEY = "cherri_vm_cooldown";

function getRemaining() {
  const start = parseInt(localStorage.getItem(STORAGE_KEY));
  if (!start) return 0;
  const remaining = COOLDOWN - (Date.now() - start);
  return remaining > 0 ? remaining : 0;
}

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function startCooldown() {
  localStorage.setItem(STORAGE_KEY, Date.now());
  updateTimer();
}

function updateTimer() {
  const timerEl = document.getElementById("cooldown");
  const interval = setInterval(() => {
    const remaining = getRemaining();
    if (remaining <= 0) {
      timerEl.innerText = "";
      clearInterval(interval);
      document.getElementById("create-btn").disabled = false;
    } else {
      timerEl.innerText = `Cooldown: ${formatTime(remaining)}`;
      document.getElementById("create-btn").disabled = true;
    }
  }, 1000);
}

async function createVM() {
  const remaining = getRemaining();
  if (remaining > 0) {
    showToast(
      "error",
      `You are on cooldown! ${formatTime(remaining)} remaining.`,
      "fas fa-octagon-xmark"
    );
    return;
  }

  document.getElementById("create-btn").innerText = "Creating...";
  document.getElementById("create-btn").disabled = true;
  document.getElementById("fullscreen-btn").disabled = false;

  try {
    const res = await fetch("https://api.x8r.dev/api/hyperbeam-sdk", {
      method: "POST",
    });
    const data = await res.json();
    const url = data.embed_url;
    document.getElementById("vm-frame").src = data.embed_url || data.url || "";
    document.getElementById("vm-frame").style.display = "block";
    startCooldown();
  } catch (e) {
    showToast("error", "Failed to create VM", "fas fa-octagon-xmark");
    document.getElementById("create-btn").disabled = false;
  } finally {
    document.getElementById("create-btn").innerText = "New VM";
  }
}

document.getElementById("create-btn").addEventListener("click", createVM);
window.addEventListener("DOMContentLoaded", () => {
  if (getRemaining() > 0) {
    updateTimer();
    document.getElementById("create-btn").disabled = true;
  } else {
    document.getElementById("create-btn").disabled = false;
  }
});

showToast("success", "VMs are still in beta! Report bugs in the Discord or on the repo.", "fas fa-exclamation-circle")
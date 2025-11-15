// thanks to https://waves.lat for custom dropdowns || https://gitlab.com/waveslab/waves
const appSettings = {
  backend: localStorage.getItem("breeze_backend") || "scramjet",
  searchEngine: localStorage.getItem("breeze_searchEngine") || "DuckDuckGo",
  decoy: localStorage.getItem("decoy") || "None",
  wisp: localStorage.getItem("breeze_wispUrl") || "wss://wisp.rhw.one/",
};

const searchEngineSelector = document.querySelector(".search-engine-selector");
const searchEngineSelected = searchEngineSelector.querySelector(".search-engine-selected");
const searchEngineOptions = searchEngineSelector.querySelector(".search-engine-options");

const decoySelector = document.querySelector(".decoy-selector");
const decoySelected = decoySelector.querySelector(".decoy-selected");
const decoyOptions = decoySelector.querySelector(".decoy-options");

const wispSelector = document.querySelector(".wisp-selector");
const wispSelected = wispSelector.querySelector(".wisp-selected");
const wispOptions = wispSelector.querySelector(".wisp-options");

const backendSelector = document.querySelector(".backend-selector");
const backendSelected = backendSelector.querySelector(".backend-selected");
const backendOptions = backendSelector.querySelector(".backend-options");

const decoyPresets = {
  Google: {
    title: "Google",
    icon: "https://www.google.com/favicon.ico",
  },
  "Google Docs": {
    title: "Google Docs",
    icon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon-2023q4.ico",
  },
  Youtube: {
    title: "YouTube",
    icon: "https://www.youtube.com/s/desktop/014dbbed/img/favicon_32x32.png",
  },
  "Google Drive": {
    title: "Google Drive",
    icon: "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png",
  },
  Schoology: {
    title: "Home | Schoology",
    icon: "https://asset-cdn.schoology.com/sites/all/themes/schoology_theme/favicon.ico",
  },
};


function closeAllSelectors() {
  document
    .querySelectorAll(
      ".backend-show, .transport-show, .search-engine-show, .decoy-show, .cloak-link-show, .wisp-show"
    )
    .forEach((el) =>
      el.classList.remove(
        "backend-show",
        "transport-show",
        "search-engine-show",
        "decoy-show",
        "cloak-link-show",
        "wisp-show"
      )
    );
  document
    .querySelectorAll(
      ".backend-arrow-active, .transport-arrow-active, .search-engine-arrow-active, .decoy-arrow-active, .cloak-link-arrow-active, .wisp-arrow-active"
    )
    .forEach((el) =>
      el.classList.remove(
        "backend-arrow-active",
        "transport-arrow-active",
        "search-engine-arrow-active",
        "decoy-arrow-active",
        "cloak-link-arrow-active",
        "wisp-arrow-active"
      )
    );
}

const defaultWispUrl = `${
  window.location.protocol === "https:" ? "wss" : "ws"
}://${window.location.host}/w/`;
const allBackendOptions = ["Ultraviolet", "Scramjet"];
const allTransportOptions = ["Epoxy", "Libcurl"];
const allSearchEngineOptions = ["DuckDuckGo", "Google", "Bing", "Startpage"];
const allDecoyOptions = [
  "None",
  "Google",
  "Google Docs",
  "Youtube",
  "Google Drive",
  "Schoology",
];

const allWispOptions = [
  "wss://terbiumon.top/wisp/",
  "wss://webmath.help/wisp/",
  "wss://wisp.rhw.one/",
  "wss://anura.pro/wisp/",
];

function createSelector(
  selectorType,
  selectedEl,
  optionsEl,
  allOptions,
  currentVal,
  storageKey,
  eventName,
  successMsg
) {
  selectedEl.textContent = currentVal;

  selectedEl.addEventListener("click", (e) => {
    e.stopPropagation();
    const wasOpen = optionsEl.classList.contains(`${selectorType}-show`);
    closeAllSelectors();

    if (!wasOpen) {
      optionsEl.innerHTML = "";
      allOptions.forEach((optionText) => {
        if (optionText !== selectedEl.textContent) {
          const div = document.createElement("div");
          div.textContent = optionText;
          div.addEventListener("click", function (e) {
            e.stopPropagation();
            const val = this.textContent;
            selectedEl.textContent = val;

            const storageVal =
              storageKey === "backend" || storageKey === "transport"
                ? val.toLowerCase()
                : val;

            appSettings[storageKey] = storageVal;
            localStorage.setItem(storageKey, storageVal);
            closeAllSelectors();
            if (eventName)
              document.dispatchEvent(
                new CustomEvent(eventName, {
                  detail: storageVal,
                })
              );
            if (successMsg) showToast("success", successMsg, "check-circle");

            if (storageKey === "cloakLink") {
              runMenuCloak();
            }
          });
          optionsEl.appendChild(div);
        }
      });
      optionsEl.classList.add(`${selectorType}-show`);
      selectedEl.classList.add(`${selectorType}-arrow-active`);
    }
  });
}

function applyDecoy(s) {
  const selected = decoyPresets[s]
  let favicon = document.querySelector("link[rel*='icon']")

  if (s === "None" || !selected) {
    console.log("Stayed as " + favicon.href + " " + document.title + " and " + s + " was selected");
    document.title = "breeze."
    favicon.href = "/assets/fav.png"
    return
  } else {
    document.title = selected.title
    favicon.href = selected.icon
    console.log("Set to " + favicon.href + " " + document.title)
  }
} 

createSelector(
  "search-engine",
  searchEngineSelected,
  searchEngineOptions,
  allSearchEngineOptions,
  appSettings.searchEngine,
  "breeze_searchEngine",
  null,
  "Successfully updated Search Engine!"
);

createSelector(
  "decoy",
  decoySelected,
  decoyOptions,
  allDecoyOptions,
  appSettings.decoy,
  "decoy",
  "decoyUpdated",
  "Successfully updated cloak!"
);

createSelector(
  "wisp",
  wispSelected,
  wispOptions,
  allWispOptions,
  appSettings.wisp,
  "breeze_wispUrl",
  "wispUpdated",
  "Successfully updated Wisp server!"
);

createSelector(
  "backend",
  backendSelected,
  backendOptions,
  allBackendOptions,
  appSettings.backend,
  "breeze_backend",
  "backendUpdated",
  "Successfully updated backend!"
);

document.addEventListener("decoyUpdated", e => applyDecoy(e.detail))
window.addEventListener("load", () => {
  applyDecoy(localStorage.getItem("decoy"));
  console.log("Cloaked as " + localStorage.getItem("decoy"))
})
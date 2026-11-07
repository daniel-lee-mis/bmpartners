const languageSelect = document.querySelector(".lang select");
const storageKey = "preferredLang";

function applyLanguage(language) {
  const supported = ["ko", "en", "zh"];
  const selected = supported.includes(language) ? language : "ko";
  document.documentElement.lang = selected;
  languageSelect.value = selected;
  document.querySelectorAll("[data-copy]").forEach((paragraph) => {
    paragraph.hidden = paragraph.lang !== selected;
  });
}

const browserLanguage = navigator.language.toLowerCase().split("-")[0];
let initialLanguage = ["en", "zh"].includes(browserLanguage) ? browserLanguage : "ko";
try {
  initialLanguage = localStorage.getItem(storageKey) || initialLanguage;
} catch {
  // File previews can run with browser storage disabled.
}
applyLanguage(initialLanguage);
languageSelect.addEventListener("change", () => {
  applyLanguage(languageSelect.value);
  try {
    localStorage.setItem(storageKey, languageSelect.value);
  } catch {
    // Switching languages on the current page still works.
  }
});

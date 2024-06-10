import { insertMainPageContent } from "./loadContent.js";
import { addContent, toggleTheme } from "./global.js";

let currentTheme = new URLSearchParams(window.location.search).get("theme");
if (currentTheme === null) {
  toggleTheme(currentTheme === "light");
}else{
  toggleTheme(null, currentTheme);
}
const themeBtn = document.getElementById("switch__input");
themeBtn.addEventListener("click", () => {
  currentTheme = toggleTheme(themeBtn.checked);
});

const importQuizData = await addContent();
insertMainPageContent(importQuizData);

const btnCategories = document.querySelectorAll(".btn__base");
btnCategories.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.href = `./quiz_page.html?category=${btn.textContent}&content=${btn.innerHTML}&theme=${currentTheme}`;
  });
});

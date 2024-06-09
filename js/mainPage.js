import { insertMainPageContent } from "./loadContent.js";
import { addContent, toggleTheme } from "./global.js";

// let currentTheme = toggleTheme(false);
// console.log(currentTheme);
//
let currentTheme = new URLSearchParams(window.location.search).get("theme");
console.log(currentTheme);
if (currentTheme === null) {
  document.documentElement.setAttribute("data-theme", "light");
}else{
  toggleTheme(currentTheme === "dark");
}
const themeBtn = document.getElementById("switch__input");
themeBtn.addEventListener("click", () => {
  currentTheme = toggleTheme(themeBtn.checked);
  console.log("Current theme:", currentTheme);
});


const importQuizData = await addContent();
insertMainPageContent(importQuizData);
console.log(importQuizData);

const btnCategories = document.querySelectorAll(".btn__base");
btnCategories.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.href = `./quiz_page.html?category=${btn.textContent}&content=${btn.innerHTML}&theme=${currentTheme}`; //
  });
});

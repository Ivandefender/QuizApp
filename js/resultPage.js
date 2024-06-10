import { insertResultPageContent, insertThemeQuiz } from './loadContent.js';
import { toggleTheme } from './global.js';

const countCorrectAnswers = new URLSearchParams(window.location.search).get("result");
const contentTheme = new URLSearchParams(window.location.search).get("content");
const category = new URLSearchParams(window.location.search).get("category");
let currentTheme = new URLSearchParams(window.location.search).get("theme");

toggleTheme(null, currentTheme);
const themeBtn = document.getElementById("switch__input");
themeBtn.addEventListener("click", () => {
  currentTheme = toggleTheme(themeBtn.checked); 
});

insertThemeQuiz(contentTheme, category);

insertResultPageContent(contentTheme, countCorrectAnswers, category); 

const btnAgainQuiz = document.querySelector(".play__again");
btnAgainQuiz.addEventListener("click", () =>{
    window.location.href = `./index.html?theme=${currentTheme}`;
})

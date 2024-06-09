import { insertResultPageContent, insertThemeQuiz } from './loadContent.js';
import { addContent, toggleTheme } from './global.js';

// toggleTheme();

const importQuizData = await addContent();
console.log(importQuizData);
const countCorrectAnswers = new URLSearchParams(window.location.search).get("result");
const contentTheme = new URLSearchParams(window.location.search).get("content");
let currentTheme = new URLSearchParams(window.location.search).get("theme");

toggleTheme(null, currentTheme);
const themeBtn = document.getElementById("switch__input");
themeBtn.addEventListener("click", () => {
  currentTheme = toggleTheme(themeBtn.checked); 
});

insertResultPageContent(contentTheme, countCorrectAnswers); 

const btnAgainQuiz = document.querySelector(".play__again");
btnAgainQuiz.addEventListener("click", () =>{
    window.location.href = `./index.html?theme=${currentTheme}`;
})

insertThemeQuiz(contentTheme);
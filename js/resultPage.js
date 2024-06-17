import { insertResultPageContent, insertThemeQuiz } from './loadContent.js';
import { toggleTheme } from './global.js';

const params = new URLSearchParams(window.location.search)
if(!params.size){
  window.location.href = `./index.html`;
}

const countCorrectAnswers = new URLSearchParams(window.location.search).get("result");
const categoryImg = new URLSearchParams(window.location.search).get("categoryImg");
const category = new URLSearchParams(window.location.search).get("category");
let currentTheme = new URLSearchParams(window.location.search).get("theme");

let themeInStorage = localStorage.getItem('theme');
toggleTheme(null, currentTheme);
const themeBtn = document.getElementById("switch__input");
themeBtn.addEventListener("click", () => {
  currentTheme = toggleTheme(themeBtn.checked); 
  localStorage.setItem('theme', currentTheme);
  themeInStorage = localStorage.getItem('theme');
});

insertThemeQuiz(categoryImg, category);

insertResultPageContent(categoryImg, countCorrectAnswers, category); 

const btnAgainQuiz = document.querySelector(".play__again");
btnAgainQuiz.addEventListener("click", () =>{
    window.location.href = `./index.html?theme=${themeInStorage}`;
})

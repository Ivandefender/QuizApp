import { insertMainPageContent } from "./loadContent.js";
import { addContent, toggleTheme } from "./global.js";

let currentTheme = new URLSearchParams(window.location.search).get("theme");
let themeInStorage = localStorage.getItem('theme');
if (currentTheme === null && themeInStorage === null) {
  localStorage.setItem('theme', "light")
  toggleTheme(currentTheme === "light");
}else{
  localStorage.setItem('theme', themeInStorage)
  toggleTheme(null, themeInStorage);
}
const themeBtn = document.getElementById("switch__input");
themeBtn.addEventListener("click", () => {
  currentTheme = toggleTheme(themeBtn.checked);
  localStorage.setItem('theme', currentTheme);
  themeInStorage = localStorage.getItem('theme');
});

const importQuizData = await addContent();
insertMainPageContent(importQuizData);

const btnCategories = document.querySelectorAll(".btn__base");
btnCategories.forEach((btn) => {
  btn.addEventListener("click", () => {

    let ImgStartIndex = btn.innerHTML.indexOf("<img");
    let ImgEndIndex = btn.innerHTML.indexOf(">", ImgStartIndex) + 1;
    let categoryImg = btn.innerHTML.substring(ImgStartIndex, ImgEndIndex);

    let spanTagIndex = btn.innerHTML.indexOf("<span", ImgEndIndex);
    let onlyCategoryText = btn.innerHTML.substring(ImgEndIndex, spanTagIndex).trim();

    window.location.href = `./quiz_page.html?category=${onlyCategoryText}&categoryImg=${categoryImg}&theme=${themeInStorage}`;
  });
});


const quizDataUrl = "./data.json";

export async function addContent() {
  const responce = await fetch(quizDataUrl);
  let quizData = await responce.json();
  return quizData;
}

export function toggleTheme(status, themeText) {
  const themeBtnChecked = document.getElementById("switch__input");
  
  const sunIcon = document.querySelector(".theme__light");
  const moonIcon = document.querySelector(".theme__dark");

    if (status == true || themeText === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      sunIcon.src = "./assets/images/icon-sun-light.svg";
      moonIcon.src = "./assets/images/icon-moon-light.svg";
      themeBtnChecked.checked = true;
      return "dark";

    } else {
      document.documentElement.setAttribute("data-theme", "light");
      sunIcon.src = "./assets/images/icon-sun-dark.svg";
      moonIcon.src = "./assets/images/icon-moon-dark.svg";
      themeBtnChecked.checked = false;
      return "light";
    }
}

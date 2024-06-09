const quizDataUrl = "./data.json";

export async function addContent() {
  const responce = await fetch(quizDataUrl);
  let quizData = await responce.json();
  return quizData;
}

export function toggleTheme(status, themeText) {
  // document.documentElement.setAttribute("data-theme", "light");
  const themeBtnChecked = document.getElementById("switch__input");
  // themeBtn.checked = false;
  
  const sunIcon = document.querySelector(".theme__light");
  const moonIcon = document.querySelector(".theme__dark");

  // let currentTheme = null;
  // themeBtn.addEventListener("click", () => {
    // let currentTheme = document.documentElement.getAttribute("data-theme");
    if (status == true || themeText === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      sunIcon.src = "./assets/images/icon-sun-light.svg";
      moonIcon.src = "./assets/images/icon-moon-light.svg";
      themeBtnChecked.checked = true;
      // localStorage.setItem('theme', "dark");
      return "dark";

    } else {
      document.documentElement.setAttribute("data-theme", "light");
      sunIcon.src = "./assets/images/icon-sun-dark.svg";
      moonIcon.src = "./assets/images/icon-moon-dark.svg";
      // localStorage.setItem('theme', "light");
      themeBtnChecked.checked = false;
      return "light";
    }
  // });
  // return currentTheme;

  // const sunIcon = document.querySelector(".theme__light");
  // const moonIcon = document.querySelector(".theme__dark");
  // const themeBtnToggle = document.querySelector("#switch__input");
  // let status = false;
  // themeBtnToggle.addEventListener("click", () => {
  //   status = !status; 
  //   console.log(status);
  //   if(status === false){
  //     document.documentElement.setAttribute("data-theme", "light");
  //     sunIcon.src = "./assets/images/icon-sun-dark.svg";
  //     moonIcon.src = "./assets/images/icon-moon-dark.svg";
  //     localStorage.setItem('theme', "light");
  //   } else {
  //     document.documentElement.setAttribute("data-theme", "dark");
  //     sunIcon.src = "./assets/images/icon-sun-light.svg";
  //     moonIcon.src = "./assets/images/icon-moon-light.svg";
  //     localStorage.setItem('theme', "dark");
  //   }
  // });
  // let currentTheme = null;
  // return currentTheme = status ? 'dark' : 'light';
}

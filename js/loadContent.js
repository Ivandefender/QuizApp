export function insertThemeQuiz(titleContent) {
  const quizPageHeader = document.querySelector(".header__inner");
  const quizTheme = document.createElement("div");

  let startIndex = titleContent.indexOf("<img");
  let endIndex = titleContent.indexOf(">", startIndex) + 1;
  let themeImg = titleContent.substring(startIndex, endIndex);

  let themeText = titleContent.slice(endIndex, titleContent.length);

  quizTheme.className = "quiz__type";
  quizTheme.innerHTML = `
  <div class="type__img">${themeImg}</div>
  <h2 class="type__title">${themeText}</h2>
  `;

  quizPageHeader.insertBefore(quizTheme, document.querySelector(".theme__btn"));
}

export function insertMainPageContent(data) {
  const countQuizCategory = data.quizzes.length;

  const infoContainer = document.querySelector(".info");
  const quizCategories = document.createElement("div");
  quizCategories.className = "quiz__categories";
  for (let i = 0; i < countQuizCategory; i++) {
    const { title } = data.quizzes[i];

    const categoryBtn = document.createElement("button");
    categoryBtn.className = `btn__base`;
    categoryBtn.innerHTML = `<img class="category__img" id="${title.toLowerCase()}__category" src="${
      data.quizzes[i].icon
    }" alt="${title}">${title}`;
    quizCategories.appendChild(categoryBtn);
  }
  infoContainer.appendChild(quizCategories);
}

export function insertQuizPageContent(count, randomQuestionNumber, questionsArr) {//, stepQuestion
  //let questionsCategoryArr = getCurrentCategoryInfo(data, category);

  console.log(randomQuestionNumber);

  const quizContainer = document.querySelector(".quiz__container");
  const quizInner = document.createElement("div");
  quizInner.className = "info__quiz";

  quizInner.innerHTML = `
  <div class="quiz__question">
    <div>
      <p class="questions__count">Question ${count + 1} of ${questionsArr.length}</p> 
      <p class="question">${questionsArr[randomQuestionNumber].question}</p>
    </div>
    <div class="quiz__progress">
      <progress class="progress__bar" max="9" value="${count}"></progress>
    </div>
  </div>
  <div class="quiz__answers-inner">
      ${quizOptions(questionsArr[randomQuestionNumber].options)}
      <button class="submit btn__base-action">Submit answer</button>
  <div>
  `;
  quizContainer.appendChild(quizInner);
}

export function insertResultPageContent(titleContent, correctAnswers) {
  const resultContainer = document.querySelector(".info__result");

  let startIndex = titleContent.indexOf("<img");
  let endIndex = titleContent.indexOf(">", startIndex) + 1;
  let themeImg = titleContent.substring(startIndex, endIndex);

  let themeText = titleContent.slice(endIndex, titleContent.length);

  const quizResult = document.createElement("div");
  quizResult.className = "quiz__result";
  quizResult.innerHTML = `
  <div class="quiz__score">
      <div class="quiz__type">
        <div class="type__img">${themeImg}</div>
        <h2 class="type__title">${themeText}</h2>
      </div>
      <div class="score">
        <p class="score__points">${correctAnswers}</p>
        <p class="score__all">out of 10</p>
      </div>
  </div>
  <button class="play__again btn__base-action">Play Again</button>
  `;
  //${correctCount}
  resultContainer.appendChild(quizResult);
}

function quizOptions(options) {
  const answersContainer = document.createElement("div");
  answersContainer.className = "quiz__answers";
  let variants = ["A", "B", "C", "D"];
  options.forEach((option, i) => {
    const optionBtn = document.createElement("button");
    optionBtn.className = "quiz__answer btn__base";
    optionBtn.innerHTML = `<span class="quiz__variants">${variants[i]}</span><span class="option">${option}</span>`; //метод перетворення в
    answersContainer.appendChild(optionBtn);
    // console.log(`Додано елемент номер ${option}`);
  });
  return answersContainer.outerHTML;
}

export function ifSelectedAnswer() {
  const answersInner = document.querySelector(".quiz__answers-inner");
  const alertDiv = document.createElement("div");
  alertDiv.className = "alert__div";
  alertDiv.innerHTML = `
  <img src="./assets/images/icon-error.svg" alt="error">
  <p class="notselected__text">Please select an answer</p>
  `;
  answersInner.appendChild(alertDiv);
}

export function showCorrectIncorrectAnswer(
  typeAnswer,
  btnContainer,
  allAnswerBtns,
  questions,
  randomQuestionNumber
) {
  // console.log("Відповідь з нажатої кнопки", btnContainer.querySelector(".option").textContent)

  let answerImgCorrect = document.createElement("img");
  answerImgCorrect.className = "correct__incorrect-img";
  answerImgCorrect.src = "../assets/images/icon-correct.svg";
  answerImgCorrect.alt = "correct";
  if (typeAnswer == true) {
    btnContainer.appendChild(answerImgCorrect);
  } else if (typeAnswer == false) {
    const answerImgIncorrect = document.createElement("img");
    answerImgIncorrect.className = "correct__incorrect-img";
    answerImgIncorrect.src = "../assets/images/icon-incorrect.svg";
    answerImgIncorrect.alt = "incorrect";

    for (let i = 0; i < allAnswerBtns.length; i++) {
      // console.log(questionsArr[count].answer)
      if (allAnswerBtns[i].querySelector(".option").textContent === questions[randomQuestionNumber].answer.replace(/&lt;/g, "<").replace(/&gt;/g, ">")) {
      // console.log("Відповідь з кнопки (правильна відповідь)", allAnswerBtns[i].querySelector(".option").textContent)
      // console.log("Відповідь з файлу json (правильна відповідь)", questionsArr[count].answer)

        allAnswerBtns[i].appendChild(answerImgCorrect);
        // console.log(`На якій кнопці додається відповідь ${i} ${allAnswerBtns[i]}`)
      }
    }

    // allAnswerBtns.forEach((answerBtn) => {
    //   if (answerBtn.querySelector(".option").textContent === questionsArr[count].answer) {
    //     answerBtn.appendChild(answerImgCorrect);
    //   }
    // });

    btnContainer.appendChild(answerImgIncorrect);
  }
}

export function getCurrentCategoryInfo(data, category) {
  let questionsArr = null;
  for (let i = 0; i < data.quizzes.length; i++) {
    if (category.toLowerCase() === data.quizzes[i].title.toLowerCase()) {
      const { questions } = data.quizzes[i];
      questionsArr = questions;
    }
  }
  return questionsArr;
}

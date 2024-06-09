import {
  insertQuizPageContent,
  insertThemeQuiz,
  ifSelectedAnswer,
  showCorrectIncorrectAnswer,
  getCurrentCategoryInfo,
} from "./loadContent.js";
import { addContent, toggleTheme } from "./global.js";

const importQuizData = await addContent();
console.log(importQuizData);
const category = new URLSearchParams(window.location.search).get("category");
const contentTheme = new URLSearchParams(window.location.search).get("content");
let currentTheme = new URLSearchParams(window.location.search).get("theme");

toggleTheme(null, currentTheme);
const themeBtn = document.getElementById("switch__input");
themeBtn.addEventListener("click", () => {
  currentTheme = toggleTheme(themeBtn.checked); 
});

insertThemeQuiz(contentTheme);

let countQuestions = 0;
let countCorrectAnswers = 0;
let questionsCategoryArr = getCurrentCategoryInfo(importQuizData, category);
let randomQuestionOrder = [];
while (randomQuestionOrder.length < 10) {
  console.log(randomQuestionOrder);
  const randomNumber = Math.floor(Math.random() * questionsCategoryArr.length);
  if (!randomQuestionOrder.includes(randomNumber)) {
    randomQuestionOrder.push(randomNumber);
  }
}
console.log(randomQuestionOrder);
console.log("Старт наповнення");

insertQuizPageContent(
  countQuestions,
  randomQuestionOrder[countQuestions],
  questionsCategoryArr
);

function submitAnswer() {
  let submitAnswerBtn = document.querySelector(".submit");
  const answerOptions = document.querySelectorAll(".quiz__answer");

  selectAnswer(answerOptions);

  submitAnswerBtn.addEventListener("click", () => {
    let selectedAnswer = false;
    let selectedAnswerBtn = null;
    answerOptions.forEach((answer) => {
      if (answer.classList.contains("selected")) {
        selectedAnswer = true;
        selectedAnswerBtn = answer;
      }
    });

    switch (selectedAnswer) {
      case true:
        const alertMessage = document.querySelector(".alert__div");
        if (alertMessage) {
          alertMessage.remove();
        }
        countCorrectAnswers = checkAnswer(
          selectedAnswerBtn,
          countCorrectAnswers,
          randomQuestionOrder[countQuestions],
          answerOptions,
          questionsCategoryArr
        );
        answerOptions.forEach((answer) => {
          answer.disabled = true;
        });
        console.log(countCorrectAnswers);
        console.log("Питання номер", countQuestions + 1);
        // submitAnswerBtn.removeEventListener("click", () => {});
        // submitAnswerBtn.textContent = "Next question";
        // submitAnswerBtn = document.querySelector(".submit");

        submitAnswerBtn.style.display = "none";
        const quizAnswerInner = document.querySelector(".quiz__answers-inner");
        const nextAnswerBtn = document.createElement("button");
        nextAnswerBtn.textContent = "Next question";
        nextAnswerBtn.id = "nextQuestion";
        nextAnswerBtn.classList.add("btn__base-action");
        quizAnswerInner.appendChild(nextAnswerBtn);
        const nextAnswerBtnEvent = document.getElementById("nextQuestion");

        nextAnswerBtnEvent.addEventListener("click", toNextQuestion);
        break;

      case false:
        ifSelectedAnswer();
        submitAnswerBtn.disabled = true;
        break;
    }

    if (countQuestions == 9) {
      const nextAnswerBtnEvent = document.getElementById("nextQuestion");
      nextAnswerBtnEvent.textContent = "Show results";
      nextAnswerBtnEvent.addEventListener("click", () => {
        console.log("Change");
        window.location.href = `./result.html?result=${countCorrectAnswers}&content=${contentTheme}&theme=${currentTheme}`;
      });
    }
  });
}

function checkAnswer(
  answerBtn,
  correctAswers,
  randomQuestionNumber,
  answerOptions,
  questionsArr
) {
  // let questionsCategoryArr = getCurrentCategoryInfo(data, category);
  let isCorrectAnswer = null;
  console.log(questionsArr);
  console.log(
    "Відповідь з нажатої кнопки",
    answerBtn.querySelector(".option").textContent
  );
  console.log(
    "Відповідь з файлу json (правильна відповідь)",
    questionsArr[randomQuestionNumber].answer
  );
  console.log(
    "Відповідь з файлу json (правильна відповідь)",
    questionsArr[randomQuestionNumber].answer
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
  );

  if (
    answerBtn.querySelector(".option").textContent ===
    questionsArr[randomQuestionNumber].answer
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
  ) {
    isCorrectAnswer = true;
    answerBtn.classList.add("selected__correct");
    showCorrectIncorrectAnswer(
      isCorrectAnswer,
      answerBtn,
      answerOptions,
      questionsArr,
      randomQuestionNumber
    );
    correctAswers++;
    // console.log(correctAswers);
  } else {
    isCorrectAnswer = false;
    answerBtn.classList.add("selected__incorrect");
    showCorrectIncorrectAnswer(
      isCorrectAnswer,
      answerBtn,
      answerOptions,
      questionsArr,
      randomQuestionNumber
    );
  }
  return correctAswers;
}

function toNextQuestion() {
  countQuestions++;
  const infoQuiz = document.querySelector(".info__quiz");
  infoQuiz.remove();
  console.log("Перехід до наступного питання");
  insertQuizPageContent(
    countQuestions,
    randomQuestionOrder[countQuestions],
    questionsCategoryArr
  );
  submitAnswer();
}

function selectAnswer(answerBtns) {
  answerBtns.forEach((btnAnswer) => {
    btnAnswer.addEventListener("click", () => {
      document.querySelector(".submit").disabled = false;
      // console.log(`Клік по кнопці ${btnAnswer}`);
      // console.dir(btnAnswer);
      // console.log(btnAnswer.innerHTML);
      btnAnswer.classList.add("selected");
      answerBtns.forEach((otherAnswer) => {
        if (otherAnswer !== btnAnswer) {
          otherAnswer.classList.remove("selected");
        }
      });
    });
  });
}

submitAnswer();

// Не зроблено (не дороблено):
// Media-CSS
// Result page
// Загрузка вибраної категорії в header +
// Header трошки кривий
// Підгрузка питань після першого не працює +
// Кнопка submit блокується +
// Показ правильного питання якщо вибране не правильне
// Чистка коду файлів CSS
// На кнопках працює hover і перериває кольори при focus або при правильній, неправильній відповіді
// Питання не грузиться +
// Flex-shrink
// Тег Progress +
// Дороботи темну/світлу тему
// Чистка коду JS
// Відокремити діставання питань в циклі в loadContent +

// тепер правильна відповідь не працює не зчитує теги

// на якійсь сторінці зберігається тема на будь-якій, вона через адресну строку передається в фукцію і перевіряється чи пуста ця змінна якщо так то виконується код задання теми а якщо ні то задається тема яка в строці

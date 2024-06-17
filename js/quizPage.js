import {
  insertQuizPageContent,
  insertThemeQuiz,
  ifSelectedAnswer,
  showCorrectIncorrectAnswer,
  getCurrentCategoryInfo,
} from "./loadContent.js";
import { addContent, toggleTheme } from "./global.js";

const importQuizData = await addContent();

const params = new URLSearchParams(window.location.search)
if(!params.size){
  window.location.href = `./index.html`;
}

const category = new URLSearchParams(window.location.search).get("category");
const categoryImg = new URLSearchParams(window.location.search).get("categoryImg");
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

let countQuestions = 0;
let countCorrectAnswers = 0;
let questionsCategoryArr = getCurrentCategoryInfo(importQuizData, category);
let randomQuestionOrder = [];
while (randomQuestionOrder.length < 10) {
  const randomNumber = Math.floor(Math.random() * questionsCategoryArr.length);
  if (!randomQuestionOrder.includes(randomNumber)) {
    randomQuestionOrder.push(randomNumber);
  }
}

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
        window.location.href = `./result.html?category=${category}&result=${countCorrectAnswers}&categoryImg=${categoryImg}&theme=${themeInStorage}`;
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
  let isCorrectAnswer = null;

  answerOptions.forEach(option => {
    option.classList.add("hover__disable")
  });
  
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

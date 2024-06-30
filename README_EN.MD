<h1 align="center">FrontEnd Quiz App</h1>

<div align="center">
    <a href="https://ivandefender.github.io/QuizApp/">View Project |</a>
    <a href="https://github.com/Ivandefender/QuizApp">View Code</a>
</div>

<p align="center">
<img src="https://img.shields.io/badge/HTML-orange?style=for-the-badge&logo=html&logoColor=orange">
<img src="https://img.shields.io/badge/css-blue?style=for-the-badge&logo=css&logoColor=blue">
<img src="https://img.shields.io/badge/JavaScript-yellow?style=for-the-badge&logo=JavaScript&logoColor=yellow&labelColor=black">
</p>

### **This project is aimed at learning and improving your knowledge of FrontEnd development. It includes questions on HTML, CSS, JavaScript, Accessibility, and provides the ability to add new categories with questions via a json file**

## Project possibilities:

1. Testing with 10 random questions on the selected category
2. Display of correct/incorrect answers
3. Output of the survey result
4. Ability to add new questions and categories
5. Changing the color theme of the application
6. Adaptive design

## Application structure:

### Three HTML files:

1. `Index.html` - is the main page from which everything begins

2. `Quiz_page.html` - the page on which the question with answer options is uploaded

3. `Result.html` - the survey result page, with the possibility of switching to the main page for retaking the test

### Four CSS files:

1. `Style.css` - is a style file that applies to all pages

2. `Media.css` - style file with media requests for adaptive design

3. `Reset.css` - is a file for resetting browser styles that are set by default

4. `Global.css` - is a file that combines the previous three files and is connected to each page

### Five JS files:

1. `Global.js` is a file that exports a parsed json file with questions into page script files, the `addContent` function is responsible for this. There is also a function `toggleTheme' to switch the theme of the application.

2. `LoadContent.js` - a file in which all the logic of loading content to the page, namely: categories on the main page, questions and answers to them, and the result of the survey. This is done by the corresponding 3 main functions: `insertQuizPageContent, insertQuizPageContent, insertResultPageContent`.

3. `MainPage.js` - the file of the main page, on which categories of questions are added, on which you can start a survey

4. `QuizPage.js` - is a file corresponding to the mechanism of checking the correct question and counting it among the number of correct answers. The main function that checks the answer is `checkAnswer`, which compares the answer from the pressed button with the answer in `data.json` (file with questions and categories)

5. `Result.js` - is the last file from this list that displays the results of the survey on the screen and allows you to return to the main page.

### The design was taken from [FrontendMentor.io](https://www.frontendmentor.io/challenges/frontend-quiz-app-BE7xkzXQnU);

### Developed by: [Ivan Krysak (github: Ivandefender)](https://github.com/Ivandefender);

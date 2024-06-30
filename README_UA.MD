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

### **Цей проект націлений на вивчення та покращення своїх знань з FrontEnd-розробки. Він включає в себе питання по HTML, CSS, JavaScript, Accessibility, і надає можливість додавати нові категорії з питаннями через json-файл**

## Можливості проекту:

1. Тестування із 10 випадкових питань по вибраній категорії
2. Показ правильних/неправильних відповідей
3. Виведення результату опитування
4. Можливість додавати нові питання та категорії
5. Зміна колірної теми застосунку
6. Адаптивний дизайн

## Структура застосунку:

### Три HTML-файли:

1. `Index.html` - головна сторінка з якої все починається

2. `Quiz_page.html `- сторінка на яку підвантажується запитання з варіантами відповідей

3. `Result.html` - сторінка результату опитування, з можливістю переходу на головну сторінку для повторного проходження тестування

### Чотири CSS-файли:

1. `Style.css` - файл стилів, який примінюється для всіх сторінок

2. `Media.css` - файл стилів із media-запитами, для адаптивного дизайну

3. `Reset.css` - файл для скидання стилів браузера, які встановлені за замовченням

4. `Global.css` - файл, який об'єднує попередні три файли і підключається до кожної сторінки

### П'ять JS-файлів:

1. `Global.js` - файл який експортує розпарсений json-файл з питаннями у файли скриптів сторінок, за це відповідає функція `addContent`. Ще тут є функція `toggleTheme` для перемикання теми застосунку.

2. `LoadContent.js` - файл в якому вся логіка завантаження контенту на сторінку, а саме: категорії на головній сторінці, запитання і відповіді на них, і результат опитування. Це виконують відповідні 3 основні функції: `insertQuizPageContent, insertQuizPageContent, insertResultPageContent`.

3. `MainPage.js` - файл головної сторінки, на якому додані категорії запитань, по яким можна почати опитування

4. `QuizPage.js` - файл, що відповідає механізм перевірки правильного питання та зарахування його до к-сть правильних відповідей. Основна функція, яка перевіряє відповідь - це `checkAnswer`, що порівнює відповідь з натиснутої кнопки з відповіддю в `data.json` (файл із запитаннями та категоріями)

5. `Result.js` - останній з цього списку файл, що виводить результати опитування на екран і дає можливість повернутися на головну сторінку.

### Дизайн був взятий з [FrontendMentor.io](https://www.frontendmentor.io/challenges/frontend-quiz-app-BE7xkzXQnU);

### Розробив: [Ivan Krysak (github: Ivandefender)](https://github.com/Ivandefender);

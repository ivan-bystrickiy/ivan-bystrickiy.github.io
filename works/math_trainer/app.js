// Математический тренажер

// 1. Данные
// 2. Алгоритм

/**
 * Данные
 * 
 * 1. Два числа
 * 2. Знак (плюс, минус)
 * 3. Ответ
 */

/**
 * Алогритм
 * 
 * 1. Генерация примера
 * 2. Выводим пример
 * 3. Проверям правильно или нет
 */

// ? +/- ? = ??

let level = 1
let timerId; // undefined
let _answers;
let _buttons;
let _result;

// startLevel()

function startLevel() {
  document.querySelector('.btn-dark').style.display = 'none'

  document.getElementsByTagName('h1')[0].innerHTML = `Level ${level}`
  document.getElementById('result').innerHTML = ''
  let allBtnsEl = document.querySelectorAll('.btn-success, .btn-danger')

  for (let i = 0; i < allBtnsEl.length; i++) {
    let btnEl = allBtnsEl[i]
    btnEl.classList.remove('btn-success')
    btnEl.classList.remove('btn-danger')
    btnEl.classList.add('btn-primary')
  }

  let difficultLevel = (Math.floor(level / 2) + 1) * 3
  console.log(difficultLevel)

  // Вывод вопроса и вариантов ответа
  let num1 = Math.floor(Math.random() * 10 * difficultLevel) + 10 * difficultLevel
  let num2 = Math.floor(Math.random() * 10 * difficultLevel) + 10 * difficultLevel

  let operators = ["+"] // , "-", "*", "/", "%", "**"

  if (level > 3) {
    operators.push('-')
  }

  if (level > 5) {
    operators.push('*')
  }

  if (level > 10) {
    operators.push('/')
    operators.push('%')
  }

  if (level > 20) {
    operators.push('**')
  }

  let operator = operators[Math.floor(Math.random() * operators.length)]

  let realResult; // undefined

  if (operator == '+') {
    realResult = num1 + num2
  } else if (operator == '-') {
    realResult = num1 - num2
  } else if (operator == '*') {
    realResult = num1 * num2
  } else if (operator == '/') {
    realResult = Math.round(num1 / num2)
  } else if (operator == '%') {
    realResult = num1 % num2
  } else if (operator == '**') {
    realResult = num1 ** num2
  }

  // Работа с деревом DOM

  let questionEl = document.getElementsByClassName('display-1')[0];
  questionEl.innerHTML = `${num1} ${operator} ${num2} = ???`

  let buttonsEl = document.getElementsByClassName('btn')

  let answ1 = Math.floor(Math.random() * (realResult + 5)) + (realResult - 5)
  let answ2 = realResult
  let answ3 = Math.floor(Math.random() * (realResult + 5)) + (realResult - 5)

  let answers = [answ1, answ2, answ3] //.sort(() => Math.random() - 0.5) // (!)
  // Стрелочные функции. Функции массива.

  buttonsEl[0].innerHTML = answers[0]
  buttonsEl[1].innerHTML = answers[1]
  buttonsEl[2].innerHTML = answers[2]

  _answers = answers
  _buttons = buttonsEl
  _result = realResult

  // Таймера
  let progressEl = document.querySelector('.progress-bar')

  progressEl.style.width = '0'
  progressEl.style.transition = 'all 15s'
  progressEl.style.width = '100%'

  timerId = window.setTimeout(function () {
    checkAnswer()
  }, 15000)
}

// Проверка ответа
function checkAnswer(n) {
  // n = номер кнопки
  let answ = _answers[n]
  let isCorrect = answ == _result

  let resultEl = document.getElementById('result')
  let buttonEl = _buttons[n]

  if (n === undefined) {
    resultEl.innerHTML = "НЕ правильный ответ"

    resultEl.classList.add('text-danger')
    resultEl.classList.remove('text-success')

    return
  }

  if (isCorrect) {
    resultEl.innerHTML = "Правильный ответ"

    resultEl.classList.add('text-success')
    resultEl.classList.remove('text-danger')

    buttonEl.classList.remove('btn-primary')
    buttonEl.classList.remove('btn-danger')
    buttonEl.classList.add('btn-success')

    window.clearTimeout(timerId)
    let progressEl = document.querySelector('.progress-bar')

    progressEl.style.transition = 'none'
    progressEl.style.width = '0%'
    
    level++
    window.setTimeout(startLevel, 500)
  } else {
    resultEl.innerHTML = "НЕ правильный ответ"

    resultEl.classList.add('text-danger')
    resultEl.classList.remove('text-success')

    buttonEl.classList.remove('btn-primary')
    buttonEl.classList.remove('btn-success')
    buttonEl.classList.add('btn-danger')

    window.clearTimeout(timerId)
    let progressEl = document.querySelector('.progress-bar')

    progressEl.style.transition = 'none'
    progressEl.style.width = '0%'

    level = 1
    // window.setTimeout(startLevel, 500)

    document.querySelector('.btn-dark').style.display = 'block'
  }

  // 1. Получить вариант ответа
  // 2. Сравнить
  // 3. Вывести результат
}



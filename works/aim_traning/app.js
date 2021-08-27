let clickCount = 0
let colors = [
  '#3F3F3F',
  '#ff9b00',
  '#beff00',
  '#3cff00',
  '#00ffbb',
  '#0093ff',
  '#0035ff',
  '#da00ff',
  '#ff00c6',
  '#ff0044',
  '#f00',
]

$(function() {

  // Здесь мы пишем код который работает с элементами сайта
  $('.ball').on('click', function() {
    clickCount++

    // Меняем положение круга
    let top = Math.floor(Math.random() * 100)
    let left = Math.floor(Math.random() * 100)

    // Размер круга
    let size = Math.floor(Math.random() * (100 - 20)) + 5

    // Рандомный цвет
    let color = colors[Math.floor(Math.random() * colors.length)]

    $('.ball').css('top', top + '%')
    $('.ball').css('left', left + '%')
    $('.ball').css('width', size)
    $('.ball').css('height', size)
    $('.ball').css('background', color)
    $('.ball').css('box-shadow', '0 0 20px ' + color)

    $('.game__click-count').html(clickCount)
  })
});

/**
 * Запускает игру
 * @param {number} time Количество секунд для счетчика
 */
function startGame(time = 15) {
  // Скрываем кнопки, показываем игру
  $('.controls').hide()
  $('.game').show()

  // Данные
  let intervalId = null

  // Запускаем счетчик
  $('.game__seconds').html(time + 's')
  intervalId = window.setInterval(function() {
    if (time == 0) {
      // Отменить обработку события на круг
      $('.ball').off('click').hide()

      return window.clearInterval(intervalId)
    }

    time--

    $('.game__seconds').html(time + 's')
  }, 1000)
}
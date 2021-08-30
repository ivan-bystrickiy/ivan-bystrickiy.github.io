$(function () {
  // Делам красивый range инпут
  let rangeInputDiv = document.querySelector('.pages')

  noUiSlider.create(rangeInputDiv, {
    start: [10],
    connect: true,
    tooltips: true,
    step: 1,
    range: {
      'min': 6,
      'max': 30
    },
    pips: {
      mode: 'steps',
      stepped: true,
      density: 4
    }
  });

  rangeInputDiv.noUiSlider.on('update', function(values) {
    $('[name="pages"]').val(+values[0]).trigger('input')
  })

  // Вешаем обрабтку событий
  $('.bookCalc').on('change input', calculatePrice)
});

function calculatePrice() {
  let orientation = +$('[name="orientation"]:checked').val()
  let design = +$('[name="design"]:checked').val()
  let dops = $('[name="dops"]:checked')

  let dopsPrice = 0
  for (let i = 0; i < dops.length; i++) {
    let dop = $(dops[i])
    dopsPrice += +dop.val()
  }

  let pages = +$('[name="pages"]').val()

  // Здесь по формуле все вычисляем и создаем sum
  let sum = (orientation * pages) + (design * pages) + dopsPrice + 180

  // debugger 

  $('.price').html(sum)
}
let sum = 5000;

$(function () {
  // Тип ячеек
  $('input[name="type"]').on('change', function() {
    let $input = $(this)
    let type = $input.val()

    if (type == "romb") {
      $('.calc-capter.romb').css('visibility', 'visible')
      $('.calc-capter.sota').css('visibility', 'hidden')
    }

    if (type == "sota") {
      $('.calc-capter.romb').css('visibility', 'hidden')
      $('.calc-capter.sota').css('visibility', 'visible')
    }
  })

  // Цвет коврика
  $('input[name="capter-color"]').on('change', function () {
    let $input = $(this)
    let colorIdx = $input.val()
    let $img = $('.calc-capter')

    $img.filter('.sota').attr('src', `img/carpet/sota/${colorIdx}.png`)
    $img.filter('.romb').attr('src', `img/carpet/romb/${colorIdx}.png`)
  })

  // Цвет канта
  $('input[name="border-color"]').on('change', function () {
    let $input = $(this)
    let colorIdx = $input.val()
    let $img = $('.calc-border')

    $img.attr('src', `img/border/${colorIdx}.png`)
  })

  // Доп комплектация
  $('input[name="dop"').on('change', function() {
    let $input = $(this)
    let checked = $input.is(':checked')
    let val = Number.parseInt($input.val())
    let dataDop = $input.data('dop')

    if (checked) {
      sum += val
    } else {
      sum -= val
    }

    if (dataDop == 'shild' && checked) {
      $('.shildik').css('visibility', 'visible')
    }

    if (dataDop == 'shild' && !checked) {
      $('.shildik').css('visibility', 'hidden')
    }

    if (dataDop == 'podp' && checked) {
      $('.podpatnik').css('visibility', 'visible')
    }

    if (dataDop == 'podp' && !checked) {
      $('.podpatnik').css('visibility', 'hidden')
    }

    $('.price').html(sum)
  })
  
  $('.price').html(sum)
})
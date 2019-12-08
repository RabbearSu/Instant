$(function () {
  $('.nav-link').on('click', function () {
    if ($(window).width() < 992) {
      $('.navbar-toggler').trigger('click')
    }
  })
})
document.addEventListener('DOMContentLoaded', function() {
    var header = document.getElementById('uw__header');
    var content = document.querySelector('.uw__header__content');
    var logo = document.querySelector('.uw__header__logo');
    var nav = document.querySelector('.uw__header__nav');
  
    header.addEventListener('mouseover', function() {
      content.style.left = '300px';
      logo.style.opacity = '0';
      nav.style.opacity = '1';
    });
  
    header.addEventListener('mouseout', function() {
      content.style.left = '50%';
      logo.style.opacity = '1';
      nav.style.opacity = '0';
    });
  });
const elements = $(".modal-overlay, .modal");
$(".close-modal").click(function () {
  elements.removeClass("active")
});
let timer = null;
window.addEventListener("scroll", function () {
  null !== timer && clearTimeout(timer), timer = setTimeout(function () {
    if (!window.sent) {
      elements.addClass("active")
    }
  }, 10e3)
}, !1);

const elements_l = $(".modal-overlay-l, .modal-l");
$(".close-modal-l").click(function () {
  elements_l.removeClass("active");
  document.body.style.overflow = 'auto';
});

var modal = true;

window.addEventListener("DOMContentLoaded", function () {
  const lang = sessionStorage.getItem('lang');
  if (!lang && modal) {
    elements_l.addClass("active");
    document.body.style.overflow = 'hidden';
  } else if (lang === 'ru') {
    if (location.href.endsWith('/kz/')) {
      location.href = location.href.split('/').slice(0, 3).join('/')
    } else {
      modal = false;
    }
  } else if (lang === 'kz') {
    if (!location.href.endsWith('/kz/')) {
		location.href = 'kz';
    } else {
      modal = false;
    }
  }
}, !1);

$('.lang-btn').click((e) => {
  if (e.target.getAttribute('id') === 'ru-link') {
    sessionStorage.setItem('lang', 'ru');
    location.href += '';
  } else if (e.target.getAttribute('id') === 'kz-link') {
    sessionStorage.setItem('lang', 'kz');
    if (location.href.endsWith('/kz')) {
      location.href += '';
    } else {
      location.href += 'kz';
    }
  }
});

function langClick(element) {
  if (element.getAttribute('id') === 'ru-link-a') {
	if (sessionStorage.getItem('lang') === 'kz') {
		location.href = location.href.split('/').slice(0, 3).join('/');
	} else {
	    location.href += '';
	}
	sessionStorage.setItem('lang', 'ru');
  } else if (element.getAttribute('id') === 'kz-link-a') {
    sessionStorage.setItem('lang', 'kz');
    if (location.href.endsWith('/kz/')) {
      location.href += '';
    } else {
      location.href += 'kz';
    }
  }
}

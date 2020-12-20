var sent = getCookie('sent') || false;
const lang = sessionStorage.getItem('lang');

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.submit-btn').forEach((btn) => {
	  btn.addEventListener('click', e => {
    e.preventDefault();
    const parentForm = e.target.closest('.contact-form');
    const inputName = parentForm.querySelector('input[name="name"]');
    const inputPhone = parentForm.querySelector('input[name="phone"]');
    const list = parentForm.querySelector('.sicks_list') ? parentForm.querySelector('.sicks_list').children : null;
    if (inputName.value && inputPhone.value) {
      const outputList = [];
      if (list) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].classList.contains('sicks__item')) {
            outputList.push(list[i].innerHTML);
          }
        }
      } else outputList.push('Другое');

      const data = {
        'name': inputName.value,
        'phone': inputPhone.value,
        'list': outputList
      };

      sendData('/mail.php', data)
        .then((response) => {
          if (response.code === 200) {
            const date = new Date();
            setCookie('sent', true, {secure: true, 'max-age': 259200});
            // redirect to thanks page
            if (lang === 'ru' || !lang) {
              window.location.href += 'spasibo';
            } else if (lang === 'kz') {
              window.location.href += 'rahmet';
            }
          } else if (response.code === 503 || response.code === 400) {
            if (lang === 'ru' || !lang) {
              alert('Ошибка при отправке запроса! Повторите запрос!');
            } else if (lang === 'kz') {
              alert('Сұрау техникалық ақаулар бойынша жіберілмеді! Сұрауыңызды қайтадан жіберіңіз');
            }
          }
        });
    }
    return false;
  });
  });
});

async function sendData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return await response.json();
}

function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

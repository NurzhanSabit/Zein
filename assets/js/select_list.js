document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.sicks').addEventListener('change', e => {
    if (e.target.value !== 'default') {
      document.querySelector('.sicks_selected').style.display = 'block';

      let canAdd = true;
      const list = document.querySelector('.sicks_list');
      const listNodes = list.children;

      for (let i = 0; i < listNodes.length; i++) {
        if (listNodes[i].classList.contains('sicks__item') && e.target.value === listNodes[i].innerHTML) {
          canAdd = false;
        }
      }

      if (canAdd) {
        let item = document.createElement('li');
        item.className = 'sicks__item';
        item.append(e.target.value);
        let line = document.createElement('span');
        line.className = 'sicks__item_line';
        list.append(item);
        list.append(line);
      }
      e.target.value = 'default';
    }
  });
  document.querySelector('.sicks_selected__clear').addEventListener('click', () => {
    document.querySelector('.sicks_list').innerHTML = '';
    document.querySelector('.sicks_selected').style.display = 'none';
  });
});
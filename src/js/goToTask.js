;(function () {
  'use strict';

  const button = document.querySelector('.js-go-to-task');
  const numberOfTask = document.querySelector('.js-number-of-task');
  const tasksBlocks = document.querySelectorAll('.js-task');
  numberOfTask.innerHTML = getNumberOfTask(tasksBlocks);

  button.addEventListener('click', () => {
     goToTask(tasksBlocks, numberOfTask);
  });

  function goToTask(arrOfElements, element) {
      let index = 0;
      [].forEach.call(arrOfElements, (item, i, arr) => {
          if (!(item.classList.contains('js-display-none'))) {
              item.classList.add('js-display-none');
              if (i === (arr.length - 1)) {
                  index = 0;
              } else {
                  index = ++i;
              }
          }
      });
      changeNumber(element, index, arrOfElements);
      arrOfElements[index].classList.remove('js-display-none');
  }
  function changeNumber(el, digit, arr) {
      if (digit === (arr.length - 1)) {
          el.innerHTML = digit;
      } else {
          el.innerHTML = (digit + 3);
      }
  }

  function getNumberOfTask(arr) {
      let number = 0;
      [].forEach.call(arr, (item, i) => {
          if (!(item.classList.contains('js-display-none'))) {
              number = (i + 3);
          }
      });
      return number;
  }
}());
;'use strict';
import getDataFromServer from './getDataFromServer';

let table = document.querySelector('.js-table');
let tableBody = document.querySelector('.js-table-body');
const dateButton = document.querySelector('.js-reg-date-sort');

getDataFromServer('https://tanuhaua.github.io/datas-file-json/visitors.json ', fillTheTable(tableBody));
dateButton.addEventListener('click', () => {
   dateSorting(tableBody);
});

function fillTheTable(container) {
    return function(data) {
        data.forEach((item) => {
            let row = document.createElement('tr');
            for (let key in item) {
                let cell = document.createElement('td');
                if (key === 'createdAt') item[key] = item[key].toLocaleString('uk-UA', { year: 'numeric', month: 'numeric', day: 'numeric' });
                cell.textContent = item[key];
                row.appendChild(cell);
            }
            container.appendChild(row);
        });
    }
}

function dateSorting(bodyOftable) {
    let cellWithData = [].map.call(bodyOftable.rows, row => {
       return [].filter.call(row.cells, (cell, i) => {
          if (i === 1) return cell;
       });
    });

    cellWithData.sort((a, b) => {
        let dateA = a[0].innerHTML;
        let dateB = b[0].innerHTML;
        dateA = new Date(+dateA.slice(6), +dateA.slice(3, 5), +dateA.slice(0, 2));
        dateB = new Date(+dateB.slice(6), +dateB.slice(3, 5), +dateB.slice(0, 2));
        if (dateA > dateB) {
            return 1;
        } else if (dateA < dateB) {
            return -1;
        }
    });
    repaint(bodyOftable, cellWithData);
}

function repaint(tablesBody, arr) {
    tablesBody.innerHTML = '';
    arr.forEach(item => {
       tablesBody.appendChild(item[0].parentElement);
    });
}

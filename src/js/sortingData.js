;'use strict';
import getDataFromServer from './getDataFromServer';

const table = document.querySelector('.js-table');
const tableBody = document.querySelector('.js-table-body');
const dateButton = document.querySelector('.js-reg-date-sort');
const idButton = document.querySelector('.js-id-sort');

getDataFromServer('https://tanuhaua.github.io/datas-file-json/visitors.json ', fillTheTable(tableBody));
dateButton.addEventListener('click', () => {
   dateSorting(tableBody, 1);
});
idButton.addEventListener('click', () => {
    idSorting(tableBody, 0);
});

function fillTheTable(container) {
    return function(data) {
        data.sort((a, b) => {
           let dateA = new Date(a['createdAt']);
           let dateB = new Date(b['createdAt']);
           if (dateA > dateB) {
               return 1;
           } else if (dateA < dateB) {
               return -1;
           }
        });
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

function dateSorting(bodyOfTable, n) {
    let cellWithData = getNecessaryTd(bodyOfTable, n);
    cellWithData.reverse();
    repaint(bodyOfTable, cellWithData);
}

function idSorting(bodyTable, n) {
    let cellWithData = getNecessaryTd(bodyTable, n);
    cellWithData.sort((a, b) => {
        return b[0].innerHTML - a[0].innerHTML;
    });
    repaint(bodyTable, cellWithData);
}

function repaint(tablesBody, arr) {
    tablesBody.innerHTML = '';
    arr.forEach(item => {
       tablesBody.appendChild(item[0].parentElement);
    });
}

function getNecessaryTd(boxOfTable, n) {
    return [].map.call(boxOfTable.rows, row => {
        return [].filter.call(row.cells, (cell, i) => {
            if (i === n) return cell;
        });
    });
}

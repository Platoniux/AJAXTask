;'use strict';
import getDataFromServer from './getDataFromServer';

const tableBody = document.querySelector('.js-table-body');
const sortingButtons = document.querySelectorAll('.js-table-th');

getDataFromServer('https://tanuhaua.github.io/datas-file-json/visitors.json ', fillTheTable(tableBody));

[].forEach.call(sortingButtons, (item, i) => {
   item.addEventListener('click', () => {
       sortTable(tableBody, i);
   })
});

function fillTheTable(container) {
    return function(data) {
        data.sort((a, b) => {
            let idA = a['id'];
            let idB = b['id'];
            if (idA > idB) {
                return 1;
            } else if (idA < idB) {
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

function sortTable(bodyOfTable, n) {
    let switching = true;
    let dir = 'asc';
    let switchcount = 0;
    let x, y, rows, shouldSwitch, i, dateX, dateY;

    while (switching) {
        switching = false;
        rows = bodyOfTable.rows;
        for (i = 0; i < (rows.length - 1); i++) {
           shouldSwitch = false;
           x = rows[i].getElementsByTagName('TD')[n];
           y = rows[i + 1].getElementsByTagName('TD')[n];
           dateX = x.innerHTML;
           dateY = y.innerHTML;
           dateX = new Date(+dateX.slice(6), (dateX.slice(3,5) - 1), +dateX.slice(0,2));
           dateY = new Date(+dateY.slice(6), (dateY.slice(3,5) - 1), +dateY.slice(0,2));

           if (dir === 'asc') {
               if (n === 1 && x > y) {
                   shouldSwitch = true;
                   break;
               } else if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                   shouldSwitch = true;
                   break;
               }
           } else if (dir === 'desc') {
               if (n === 1 && x < y) {
                   shouldSwitch = true;
                   break;
               } else if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                   shouldSwitch = true;
                   break;
               }
           }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            ++switchcount;
        } else {
            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}


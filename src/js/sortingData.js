;'use strict';
import getDataFromServer from './getDataFromServer';
(function () {

    let table = document.querySelector('.js-table');
    let tableBody = document.querySelector('.js-table-body');

    getDataFromServer('https://tanuhaua.github.io/datas-file-json/visitors.json ', fillTheTable(tableBody));

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

}());

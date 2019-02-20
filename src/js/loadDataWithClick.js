;'use strict';
import getDataFromServer from './getDataFromServer';

const bodyTable = document.querySelector('.js-body-table');
const buttonToLoad = document.querySelector('.js-load-more');
let page = 2;

buttonToLoad.addEventListener('click', (e) => {
   addNewData(e, bodyTable, page);
});

getDataFromServer('https://tanuhaua.github.io/datas-file-json/dynamic-loading/1/users.json', fillTheTable(bodyTable));

function fillTheTable(container) {
    return function(data) {
        for (let val in data) {
            if (val === 'data') {
                data[val].forEach((item) => {
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
    }
}

function addNewData(event, boxForData, index) {
    let target = event.target;
    getDataFromServer(`https://tanuhaua.github.io/datas-file-json/dynamic-loading/${index}/users.json`, (function(box) {
        return function(data) {
            for (let val in data) {
                if (!data[val]) {
                    target.disabled = true;
                }
                if (val === 'data') {
                    data[val].forEach((item) => {
                        let row = document.createElement('tr');
                        for (let key in item) {
                            let cell = document.createElement('td');
                            if (key === 'createdAt') item[key] = item[key].toLocaleString('uk-UA', { year: 'numeric', month: 'numeric', day: 'numeric' });
                            cell.textContent = item[key];
                            row.appendChild(cell);
                        }
                        box.appendChild(row);
                    });
                }
            }
        }
    })(boxForData));
    ++page;
}
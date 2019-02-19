;'use strict';
import getDataFromServer from './getDataFromServer';

getDataFromServer('https://tanuhaua.github.io/datas-file-json/data.json', createCards);

function createCards(arr) {
    let contForTask = document.querySelector('.js-task2');
    let averages = [averageAgeDifference(arr), averageAge(arr, 'm'), averageAge(arr, 'f')];
    let headlineForStatistics = ['Average age difference between mothers and their children', 'Average age of men', 'Average age of women'];
    createHeadlineAndStatistic(averages, headlineForStatistics, 'Ancestry of one dude', contForTask);
    let container = document.createElement('div');
    container.className = 'container';
    for (let i = 0; i < arr.length; i++) {
        let div = document.createElement('div');
        div.className = 'container__card';
        for (let key in arr[i]) {
            if (key === 'name') {
                let h3Name = document.createElement('h3');
                h3Name.className = 'container__name';
                h3Name.textContent = arr[i]['name'];
                div.insertAdjacentElement('afterbegin', h3Name);
            } else if (arr[i][key]) {
                let paragraph = document.createElement('p');
                let span = document.createElement('span');
                paragraph.className = 'container__paragraph';
                span.className = 'container__data';
                span.textContent = arr[i][key];
                paragraph.textContent = key + ': ';
                paragraph.appendChild(span);
                div.insertAdjacentElement('beforeend', paragraph);
            } else {
                let paragraph = document.createElement('p');
                let span = document.createElement('span');
                paragraph.className = 'container__paragraph';
                span.className = 'container__data';
                span.textContent = 'unknown';
                paragraph.textContent = key + ': ';
                paragraph.appendChild(span);
                div.insertAdjacentElement('beforeend', paragraph);
            }
        }
        container.insertAdjacentElement('beforeend', div);
    }
    contForTask.appendChild(container);
}

function createHeadlineAndStatistic(firstArr, secondArr, headline, container) {
    let h1 = document.createElement('h1');
    let statContainer = document.createElement('div');
    h1.className = 'headline';
    statContainer.className = 'stat-container';
    h1.textContent = headline;
    for (let i = 0; i < firstArr.length; i++) {
        let div = document.createElement('div');
        let h3 = document.createElement('h3');
        let p = document.createElement('p');
        div.className = 'stat-container__inner-cont';
        h3.className = 'stat-container__stat-headline';
        p.className = 'stat-container__result';
        h3.textContent = secondArr[i];
        p.textContent = firstArr[i];
        div.appendChild(h3);
        div.appendChild(p);
        statContainer.appendChild(div);
    }
    container.insertBefore(statContainer, container.firstChild);
    container.insertBefore(h1, statContainer);
}

function averageAgeDifference(arr) {
    let average = 0;
    let count = 0;
    outer:
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                if (arr[i]['mother'] === arr[j]['name']) {
                    average = average + (arr[i]['born'] - arr[j]['born']);
                    ++count;
                    continue outer;
                }
            }
        }
    average = (Math.round((average / count) * 100) / 100);
    return average;
}

function averageAge(arr, sex) {
    let average = 0;
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]['sex'] === sex) {
            average += arr[i]['died'] - arr[i]['born'];
            ++count;
        }
    }
    average = (Math.round((average / count) * 100) / 100);
    return average;
}
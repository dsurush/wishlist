'use strict';

const rootEl = document.getElementById('root');
// rootEl.innerHTML = `
//     <h1>WishList</h1>
//     <form>
//         <div>
//             <label for="name-input">Название</label>
//             <input id="name-input">
//         </div>
//         <div>
//             <label for="price-input">Цена</label>
//             <input id="price-input" type="number">
//         </div>
//         <div>
//             <label for="description-input">Описание</label>
//             <textarea id="description-input" rows="5"></textarea>
//         </div>
//         <button>Добавить</button>
//     </form>
// `;

const headingEl = document.createElement('h1');
headingEl.textContent = 'WishList';
rootEl.appendChild(headingEl);

const formEl = document.createElement('form');
rootEl.appendChild(formEl);

const nameContainerEl = document.createElement('div');
formEl.appendChild(nameContainerEl);

const nameLabelEl = document.createElement('label');
nameLabelEl.textContent = 'Название';
nameLabelEl.htmlFor = 'name-input';
nameContainerEl.appendChild(nameLabelEl);

const nameEl = document.createElement('input');
nameEl.id = 'name-input';
nameContainerEl.appendChild(nameEl);

const priceContainerEl = document.createElement('div');
formEl.appendChild(priceContainerEl);

const priceLabelEl = document.createElement('label');
priceLabelEl.textContent = 'Цена';
priceLabelEl.htmlFor = 'price-input';
priceContainerEl.appendChild(priceLabelEl);

const priceEl = document.createElement('input');
priceEl.id = 'price-input';
priceEl.type = 'number';
priceContainerEl.appendChild(priceEl);

const descriptionContainerEl = document.createElement('div');
formEl.appendChild(descriptionContainerEl);

const descriptionLabelEl = document.createElement('label');
descriptionLabelEl.textContent = 'Описание';
descriptionLabelEl.htmlFor = 'description-input';
descriptionContainerEl.appendChild(descriptionLabelEl);

const descriptionEl = document.createElement('textarea');
descriptionEl.id = 'description-input';
descriptionEl.rows = 5;
descriptionContainerEl.appendChild(descriptionEl);

const addEl = document.createElement('button');
addEl.textContent = 'Добавить';
formEl.appendChild(addEl);

const totalEl = document.createElement('div');
rootEl.appendChild(totalEl);

const errorEl = document.createElement('div');
formEl.insertBefore(errorEl, formEl.firstElementChild);

const listEl = document.createElement('ul');
rootEl.appendChild(listEl);

let wishes = [];
formEl.onsubmit = evt => {
    evt.preventDefault();

    errorEl.textContent = '';
    let error = null;

    const name = nameEl.value.trim();
    if (name === '') {
        error = 'Заполните поле Название';
        errorEl.textContent = error;
        nameEl.focus();
        return;
    }

    const price = Number(priceEl.value);
    if (Number.isNaN(price)) {
        error = 'Неверно введена цена';
        errorEl.textContent = error;
        priceEl.focus();
        return;
    }

    if (price < 0) {
        error = 'Цена не может быть отрицательной';
        errorEl.textContent = error;
        priceEl.focus();
        return;
    }

    const description = descriptionEl.value.trim();
    if (description === '') {
        error = 'Заполните поле Описание';
        errorEl.textContent = error;
        desriptionEl.focus();
        return;
    }

    const wish = {
        name,
        price,
        description,
    };
    wishes.unshift(wish);

    formEl.reset();

    const rowEl = document.createElement('li');
    rowEl.textContent = `Название: ${wish.name}, стоимость: ${wish.price} с.`;
    listEl.insertBefore(rowEl, listEl.firstElementChild);

    const removeEl = document.createElement('button');
    removeEl.textContent = 'Удалить';
    removeEl.onclick = () => {
        listEl.removeChild(rowEl);
        wishes = wishes.filter(o => o !== wish);

        const sum = wishes.reduce((prev, curr) => prev + curr.price, 0);
        totalEl.textContent = `Необходимо ${sum} с.`;
    };
    rowEl.appendChild(removeEl);

    const sum = wishes.reduce((prev, curr) => prev + curr.price, 0);
    totalEl.textContent = `Необходимо ${sum} с.`;
};

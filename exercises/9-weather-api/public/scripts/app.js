('use strict');
const page = {
    loading: document.querySelector('.loader'),
    popups: document.querySelector('.popups'),
    content: document.querySelector('.content__block'),
    form: document.querySelector('#options-form'),
    weather_button: document.querySelector('.weather-button'),
    form_button: document.querySelector('.form-button'),
};

function createDiv(data) {
    if (page.content.classList.contains('hidden')) {
        page.content.classList.remove('hidden');
    }
    const element = document.createElement('div');
    element.classList.add('javascript', 'weather');
    element.innerHTML = data?.message;
    // element.innerHTML = data instanceof Error || typeof data === 'string' ? data : `<pre>${JSON.stringify(data, null, 1)}</pre>`;
    page.content.append(element);
}

async function getWeather() {
    buttonToggleActive(page.weather_button);
    toggleHiddenElement(page.loading);
    page.content.innerHTML = '';
    try {
        const data = await request('./weather');
        createDiv(data);
        toggleHiddenElement(page.loading);
        buttonToggleActive(page.weather_button);
    } catch (e) {
        createDiv(e);
        toggleHiddenElement(page.loading);
        buttonToggleActive(page.weather_button);
    }
}
async function setDafaultFormValues(values) {
    try {
        let data = {};
        if (!values) {
            const response = await request('./weather/options');
            data = response.data;
        } else {
            data = values;
        }
        Object.entries(data).map(([key, value]) => {
            const select = document.querySelector(`select#${key}`);
            if (!select) {
                return;
            }
            Array.from(select.options).map((item) => {
                item.removeAttribute('selected');
                if (item.value === value) {
                    item.selected = true;
                    item.setAttribute('selected', true);
                }
            });
        });
    } catch (e) {
        createDiv(e);
    }
}

function buttonToggleActive(button) {
    button.disabled = !button.disabled;
    toggleHiddenElement(button, 'sending');
}

async function postForm(event) {
    event.preventDefault();
    buttonToggleActive(page.form_button);
    try {
        const values = {};
        const form = new FormData(event.target);
        for (const [key, value] of form.entries()) {
            values[key] = value;
        }
        const data = await request('./weather/options', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });
        if (!data?.success) {
            throw new Error(data?.message);
        }
        buttonToggleActive(page.form_button);
        toggleHiddenElement(page.popups);
        await setDafaultFormValues(values);
        event.target.reset();
    } catch (e) {
        createDiv(e);
        buttonToggleActive(page.form_button);
        toggleHiddenElement(page.popups);
    }
}

function toggleHiddenElement(el, style = 'hidden') {
    el.classList.toggle(style);
}

async function request(url, options = {}) {
    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (e) {
        throw new Error(JSON.stringify({ code: response.status, message: response.statusText }));
    }
}

function sleep(ms = Math.random() * 200) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
page.popups.addEventListener('click', (e) => {
    const target = e.target;
    const its_popup = page.form.contains(target);
    if (!its_popup) {
        toggleHiddenElement(page.popups);
    }
});
page.form.addEventListener('keyup', function (e) {
    if (e.key === 'Escape') {
        toggleHiddenElement(page.popups);
    }
});
setDafaultFormValues();

class formField {
    constructor(options, tagName = 'input') {
        this.input = document.createElement(tagName);
        this.options = options;
        Object.entries(this.options).map(([key, value]) => {
            this.input[key] = value;
        });
    }

    get element() {
        return this.input;
    }
}
class selectInput extends formField {
    constructor(options, fields = [], tagName = 'select') {
        super(options, tagName);
        this.fields = fields;
        this.setOptions();
    }

    setOptions() {
        this.fields.map((field) => {
            const option = document.createElement('option');
            option.value = field.value;
            option.text = field.text;
            this.input.append(option);
        });
        document.querySelector('.test-block').append(this.input);
        return this.input;
    }
}
const options = {
    // type: 'checkbox',
    id: 'city',
    name: 'city',
    placeholder: 'Токен авторизации',
};
const fields = [];
const formerField = new selectInput(options, fields);

const formFieldsGenerate = {
    title: 'Отправить конфигурацию',
    fields: [
        {
            input_type: 'input',
            options: {
                id: 'token',
                name: 'token',
                type: 'text',
                placeholder: 'Токен авторизации',
            },
            fields: [],
            img: { url: './img/token.svg', alt: 'Иконка токена' },
        },
        {
            input_type: 'select',
            options: {
                id: 'city',
                name: 'city',
            },
            label: 'Название города',
            fields: [
                { value: 'moscow', text: 'Москва' },
                { value: 'kaliningrad', text: 'Калининград' },
                { value: 'sankt-peterburg', text: 'Санкт-Петербург' },
                { value: 'london', text: 'Лондон' },
                { value: 'tokio', text: 'Токио' },
            ],
            img: { url: './img/city.svg', alt: 'Иконка города' },
        },
        {
            input_type: 'select',
            options: {
                id: 'language',
                name: 'language',
            },
            label: 'Выбрать язык',
            fields: [
                { value: 'ru', text: 'Русский' },
                { value: 'en', text: 'English' },
            ],
            img: { url: './img/language.svg', alt: 'Иконка языка' },
        },
    ],
};
function formConstructor(form, params) {
    form.innerHTML = `<div class="closed-form" onclick="toggleHiddenElement(page.popups)">
                        <img src="./img/exit.svg" alt="" />
                    </div>
                    <h1>${params.title}</h1>`;
    params.fields.map((x) => {
        const div = document.createElement('div');
        div.classList.add('form__item');
        console.log(x?.img?.url);
        if (x?.img?.url) {
            const image = document.createElement('img');
            image.setAttribute('src', x.img.url);
            image.setAttribute('alt', x.img.alt);
            div.append(image);
        }
        const input = x.input_type === 'select' ? new selectInput(x.options, x.fields).element : new formField(x.options).element;
        if (x?.classList) {
            x.classList.map((c) => {
                input.classList.add(c);
            });
        }
        const secondDiv = document.createElement('div');
        secondDiv.classList.add('form__content');
        secondDiv.innerHTML = `${x.label ? `<label for="${x.options.id}">${x.label}</label>` : ''}`;

        secondDiv.append(input);
        div.append(secondDiv);

        form.appendChild(div);
    });
    const button = document.createElement('button');
    button.innerText = 'Отправить';
    button.classList.add('form-button');
    button.type = 'submit';
    page.form_button = button;
    form.append(button);
}

formConstructor(page.form, formFieldsGenerate);

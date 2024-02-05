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
    page.loading.classList.toggle('hidden');
    page.content.innerHTML = '';
    try {
        const data = await request('./weather');
        createDiv(data);
        page.loading.classList.toggle('hidden');
        buttonToggleActive(page.weather_button);
    } catch (e) {
        createDiv(e);
        page.loading.classList.toggle('hidden');
        buttonToggleActive(page.weather_button);
    }
}

function buttonToggleActive(button) {
    button.disabled = !button.disabled;
    button.classList.toggle('sending');
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
        page.popups.classList.toggle('hidden');
        event.target.reset();
    } catch (e) {
        createDiv(e);
        buttonToggleActive(page.form_button);
        page.popups.classList.toggle('hidden');
    }
}

async function request(url, options = {}) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(JSON.stringify({ code: response.status, message: response.statusText }));
    }
    return await response.json();
}

function sleep(ms = Math.random() * 200) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

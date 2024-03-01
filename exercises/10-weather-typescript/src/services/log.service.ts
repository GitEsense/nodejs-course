import { WeatherStringType } from '../types/index';

const printWeather: WeatherStringType = (res, lang, icon) => {
    const { name, main, wind, dt, weather } = res;
    const isLanguageRU = lang === 'ru';
    return `
    <div>Дата: <span>${new Date(dt * 1000).toLocaleString()}</span></div>
    <div>${isLanguageRU ? 'Погода в городе' : 'Weather in the city'}: <span>${name}</span></div>
    <div>${icon}  <span>${weather[0].description}</span></div>
    <div>${isLanguageRU ? 'Температура' : 'Temperature'}: <span>${main.temp} (${
        isLanguageRU ? 'ощущается как' : 'feels like'
    }</span></div> ${main.feels_like})</span></div>
    <div>${isLanguageRU ? 'Влажность' : 'Humidity'}: <span>${main.humidity}</span></div>
    <div>${isLanguageRU ? 'Скорость ветра' : 'Wind speed'}: <span>${wind.speed}</span></div>`;
};

export { printWeather };

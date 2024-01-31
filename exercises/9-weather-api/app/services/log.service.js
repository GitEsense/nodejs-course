const printWeather = (res, lang, icon) => {
    const { name, main, wind, dt, weather } = res;
    const isLanguageRU = lang === 'ru';
    return `
    ${new Date(dt * 1000).toLocaleString()}
    ${isLanguageRU ? 'Погода в городе' : 'Weather in the city'} ${name}
    ${icon}  ${weather[0].description}
    ${isLanguageRU ? 'Температура' : 'Temperature'}: ${main.temp} (${isLanguageRU ? 'ощущается как' : 'feels like'} ${main.feels_like})
    ${isLanguageRU ? 'Влажность' : 'Humidity'}: ${main.humidity}
    ${isLanguageRU ? 'Скорость ветра' : 'Wind speed'}: ${wind.speed}`;
};

export { printWeather };

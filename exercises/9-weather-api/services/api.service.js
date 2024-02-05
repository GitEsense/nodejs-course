import axios from 'axios';

const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
        case '01':
            return '☀️';
        case '02':
            return '🌤️';
        case '03':
            return '☁️';
        case '04':
            return '☁️';
        case '09':
            return '🌧️';
        case '10':
            return '🌦️';
        case '11':
            return '🌩️';
        case '13':
            return '❄️';
        case '50':
            return '🌫️';
    }
};

const getWeather = async (attrs, options) => {
    const city = attrs?.city ?? options?.city;

    if (!options?.token) {
        throw new Error('Не задан ключ API, задавайте его через команду -t [API_KEY]');
    }
    if (!city) {
        throw new Error('Не указан город для запроса');
    }
    console.log({
        params: {
            q: city,
            appid: options.token,
            lang: options?.language ?? 'ru',
            units: 'metric',
        },
    });
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: options.token,
            lang: options?.language ?? 'ru',
            units: 'metric',
        },
    });
    console.log(data);
    return data;
};

export { getWeather, getIcon };

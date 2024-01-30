import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';
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

const getWeather = async (city, lang) => {
    const token = process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));
    if (!process.env.TOKEN && !token) {
        throw new Error('Не задан ключ API, задавайте его через команду -t [API_KEY]');
    }
    if (!process.env.CITY && !city) {
        throw new Error('Не задан город, задавайте его через команду -s [CITY]');
    }

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang: lang,
            units: 'metric',
        },
    });

    return data;
};

export { getWeather, getIcon };

// return new Promise(async (resolve, reject) => {
//     const token = await getKeyValue(TOKEN_DICTIONARY.token);
//     if (!token) {
//         throw new Error('Не задан ключ API, задавайте его через команду -t [API_KEY]');
//     }
//     const url = new URL('https://api.openweathermap.org/data/2.5/weather');
//     url.searchParams.append('q', city);
//     url.searchParams.append('appid', token);
//     url.searchParams.append('lang', 'ru');
//     url.searchParams.append('units', 'metric');

//     https.get(url, (response) => {
//         let res = '';
//         response.on('data', (chunk) => {
//             console.log(chunk);
//             res += chunk;
//         });

//         response.on('end', () => {
//             resolve(res);
//         });

//         response.on('error', reject);
//     });
// });

#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printError, printSuccess, printHelp, printWeather } from './services/log.service.js';
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY, removeFile } from './services/storage.service.js';
import { getWeather, getIcon } from './services/api.service.js';
import { resolve } from 'path';

const saveToken = async (token) => {
    try {
        if (!process.env.TOKEN && !token.length) {
            printError('Не передан токен');
            return;
        }
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Токен сохранен');
    } catch (e) {
        printError(e.message);
    }
};

const saveCity = async (city) => {
    try {
        if (!process.env.CITY && !city.length) {
            printError('Не передан город');
            return;
        }
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('Город сохранен');
    } catch (e) {
        printError(e.message);
    }
};

const saveLanguage = async (lang) => {
    try {
        if (!process.env.LANGUAGE && !lang.length) {
            printError('Не передан язык');
            return;
        }
        await saveKeyValue(TOKEN_DICTIONARY.lang, lang);
        printSuccess('Язык сохранен');
    } catch (e) {
        printError(e.message);
    }
};

const getForcast = async () => {
    const cities = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
    const lang = process.env.LANGUAGE ?? (await getKeyValue(TOKEN_DICTIONARY.lang)) ?? 'en';
    cities.split(',').map(async (city) => {
        try {
            const weather = await getWeather(city, lang);
            const icon = getIcon(weather.weather[0].icon);
            printWeather(weather, lang, icon);
        } catch (e) {
            if (e?.response?.status === 404) {
                printError('Неверно указан город');
            } else if (e?.response?.status === 401) {
                printError('Неверно указан токен');
            } else {
                printError(e.message);
            }
        }
    });
};

const deleteFile = async () => {
    try {
        await removeFile();
        printSuccess('Файл успешно удалён');
    } catch (e) {
        printError(e.message);
    }
};

const getValues = async () => {
    Object.entries(TOKEN_DICTIONARY).map(async ([key]) => {
        Promise.resolve({ [key]: await getKeyValue(key) }).then(console.log);
    });
};

const initCLI = () => {
    const args = getArgs(process.argv);

    if (args.i) {
        return getValues();
    }
    if (args.h) {
        return printHelp();
    }
    if (args.d) {
        return deleteFile();
    }
    if (args.s) {
        return saveCity(args.s);
    }
    if (args.t) {
        return saveToken(args.t);
    }
    if (args.l) {
        return saveLanguage(args.l);
    }
    return getForcast();
};

initCLI();

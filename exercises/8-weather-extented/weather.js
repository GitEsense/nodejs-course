#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printError, printSuccess, printHelp, printWeather } from './services/log.service.js';
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY, removeFile } from './services/storage.service.js';
import { getWeather, getIcon } from './services/api.service.js';

let data = new Map();

class AbstractData {
    env = process.env;
    constructor() {}
    async saveValue() {}
    async getValue() {}
    toTitle() {}
}
class WeatherData extends AbstractData {
    constructor(name) {
        super();
        this.name = name;
        this.env = this.env[name.toUpperCase()];
    }
    async saveValue(value) {
        try {
            if (!this?.env && !value.length) {
                printError(`Не передан ${this.name}`);
                return;
            }
            //await saveKeyValue(this.name, value);
            data.set([this.name], value);
            printSuccess(`${this.#toTitle(this.name)} сохранен`);
        } catch (e) {
            printError(e.message);
        }
    }
    async getValue() {
        return this.env ?? (await getKeyValue(this.name));
    }

    #toTitle(str) {
        return str.at(0).concat(str.substr(1));
    }
}

const token = new WeatherData('token');
const city = new WeatherData('city');
const language = new WeatherData('language');

const getForcast = async () => {
    const cities = (await city.getValue()) ?? '';
    const lang = await language.getValue();
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
    let isExit = false;
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
        city.saveValue(args.s);
        isExit = true;
    }
    if (args.t) {
        token.saveValue(args.t);
        isExit = true;
    }
    if (args.l) {
        language.saveValue(args.l);
        isExit = true;
    }
    if (isExit) {
        saveKeyValue([...data]);
        return;
    }
    return getForcast();
};

initCLI();

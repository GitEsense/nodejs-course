import { promises } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city',
    lang: 'lang',
};

const saveKeyValue = async (key, value) => {
    let data = {};
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        data = JSON.parse(file);
    }
    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        const data = await JSON.parse(file);
        return data[key];
    }
    return undefined;
};

const removeFile = async () => {
    if (!(await isExist(filePath))) {
        throw new Error('Файл не найден');
    }
    await promises.rm(filePath);
    return true;
};

const isExist = async (path) => {
    try {
        await promises.stat(path);
        return true;
    } catch (e) {
        return false;
    }
};
export { getKeyValue, saveKeyValue, removeFile, TOKEN_DICTIONARY };

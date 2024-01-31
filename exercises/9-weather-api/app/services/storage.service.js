import { promises } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

const filePath = join(homedir(), 'weather-data.json');
const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city',
    language: 'language',
};

const saveKeyValue = async (data) => {
    let json = {};
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        json = JSON.parse(file);
    }
    data.map(([key, value]) => {
        json[key] = value;
    });

    await promises.writeFile(filePath, JSON.stringify(json));
};

const getKeyValue = async (key) => {
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        const data = await JSON.parse(file);
        if (key) {
            return { [key]: data[key] };
        }
        return data;
    }
    return undefined;
};

const isExist = async (path) => {
    try {
        await promises.stat(path);
        return true;
    } catch (e) {
        return false;
    }
};
export { getKeyValue, saveKeyValue, TOKEN_DICTIONARY };

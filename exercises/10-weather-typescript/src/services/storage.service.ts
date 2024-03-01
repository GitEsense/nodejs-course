import { promises } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

const filePath = join(homedir(), 'weather-data.json');
const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city',
    language: 'language',
};

async function saveKeyValue(data: [string, unknown][]): Promise<any> {
    let json: Record<string, any> = {};
    if (await isExist(filePath)) {
        const file = (await promises.readFile(filePath)).toString();
        json = JSON.parse(file);
    }
    data.map(([key, value]) => {
        if (!value) {
            return;
        }
        json[key] = value;
    });

    await promises.writeFile(filePath, JSON.stringify(json));
    return;
}

const getKeyValue = async (key?: string | undefined): Promise<Record<string, string> | undefined> => {
    if (await isExist(filePath)) {
        const file = (await promises.readFile(filePath)).toString();
        const data = await JSON.parse(file);
        if (key) {
            return { [key]: data[key] };
        }
        return data;
    }
    return undefined;
};

const isExist = async (path: string) => {
    try {
        await promises.stat(path);
        return true;
    } catch (e) {
        return false;
    }
};
export { getKeyValue, saveKeyValue, TOKEN_DICTIONARY };

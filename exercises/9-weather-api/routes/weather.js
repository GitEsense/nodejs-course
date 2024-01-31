import express from 'express';
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from '../services/storage.service.js';
import { getWeather, getIcon } from '../services/api.service.js';
import { printWeather } from '../services/log.service.js';
const weatherRouter = express.Router();

weatherRouter
    .get('/options/:key?', (req, res) => {
        const key = req?.params?.key;
        if (key !== undefined && !Object.hasOwn(TOKEN_DICTIONARY, key)) {
            return res.status(404).json({ success: false, error: [], message: 'Key is not Found' });
        }
        getKeyValue(req.params.key)
            .then((data) => res.json({ success: true, data, message: '' }))
            .catch((err) => res.status(500).send(err.message));
    })
    .post('/options', async (req, res) => {
        const body = Object.entries(req.body);
        if (!body.length) {
            return res.status(404).json({ success: false, error: [], message: 'Parameters not passed' });
        }
        saveKeyValue(body)
            .then(res.json({ success: true, message: 'Данные успешно сохранены' }))
            .catch((err) => res.status(500).send(err.message));
    });

weatherRouter.get('/:city?', async (req, res) => {
    try {
        const result = await getKeyValue();
        const weather = await getWeather(req.params, result);

        // const icon = getIcon(weather.weather[0].icon);
        // const message = printWeather(weather, result?.lang, icon);
        res.json({ success: true, data: weather, message: '' });
    } catch (err) {
        let message;
        if (err?.response?.status === 404) {
            message = 'Неверно указан город';
        } else if (err?.response?.status === 401) {
            message = 'Неверно указан токен';
        } else {
            message = err;
        }
        res.status(err?.response?.status ?? 500).json({ success: false, error: [], message });
    }
});

export { weatherRouter };

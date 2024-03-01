import express from 'express';
import cors from 'cors';
import { developmentConfig, productionConfig } from './config';
import onError from './utils/onError.js';
import { router } from './routes/index.js';
const port = developmentConfig.port;

const app = express();

app.use(
    cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    }),
);
app.use(express.json());
// app.use((req, res, next) => {
//     res.set('Content-Type', 'application/json');
//     next();
// });
app.use(express.static('public'));

app.use('/', router);

app.use(onError);

app.listen(port, () => {
    console.log('Server started!');
});

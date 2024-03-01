import express from 'express';
import cors from 'cors';
import { router } from './routes/index.js';
const port = 8000;

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
app.use(express.static('./public'));
app.use('/', router);

app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).send({ success: false, data: [], message: err.message });
});

app.listen(port, () => {
    console.log('Server started!');
});

import * as express from 'express';
import { AddressInfo } from 'net';
import * as path from 'path';

import baseRouter from './routes/base';

const debug = require('debug')('my express app');
const app = express();

app.use('/api', baseRouter);

if (app.get('env') === 'development') {
    app.use('/src', express.static(path.join(__dirname, '../Cindy.Client', 'src')));
}

app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'development') {
    app.get('/*', (_: express.Request, res: express.Response) => {
        res.sendFile(path.join(__dirname, '../Cindy.Client', 'index.html'));
    });
} else {
    app.get('/*', (_: express.Request, res: express.Response) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
}

app.set('port', process.env.PORT || 52013);

const server = app.listen(app.get('port'), function () {
    debug(`Express server listening on port ${(server.address() as AddressInfo).port}`);
});

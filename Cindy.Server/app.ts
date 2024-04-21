import * as express from 'express';
import { AddressInfo } from 'net';
import * as path from 'path';

import baseRouter from './routes/base';

const debug = require('debug')('my express app');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

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
        res.sendFile(path.join(__dirname, 'public/index.html'));
    });
}

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        // eslint-disable-line @typescript-eslint/no-unused-vars
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err,
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    // eslint-disable-line @typescript-eslint/no-unused-vars
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
    });
});

app.set('port', 52013);

const server = app.listen(app.get('port'), function () {
    debug(`Express server listening on port ${(server.address() as AddressInfo).port}`);
});

import Express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';
const cookieParser = require('cookie-parser');
const app = new Express();
const port = 3080;
const bodyParser = require('body-parser')
const sslRootCAs = require('ssl-root-cas')
sslRootCAs.inject()
const device = require('express-device');
const cors = require('cors');
const frameguard = require('frameguard')

app.use(function (req, res, next) {
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});


app.get('*bundle*.js', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
});

const cacheTime = 300000;
app.use('static', Express.static('public', {maxAge: cacheTime, etag: false}));
app.use('static', Express.static('dist', {maxAge: cacheTime, etag: false}));
app.use('static/css', Express.static('public/css', {maxAge: cacheTime, etag: false}));


process.title = process.argv[2];

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}));
app.use(webpackHotMiddleware(compiler));
app.set('view engine', 'ejs');
app.disable('view cache');
const corsOptions = {origin: /att\.com$/}

// Use cookie parser to get client side cookies
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(device.capture());
app.use(frameguard());


process.on('SIGINT', function (msg) {
    // by default, you have 1600ms
    setTimeout(function () {
        process.exit(0);
    }, 300)
});

app.use(require('./routeHandler'));
app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
        if (typeof process !== 'undefined' && typeof process.send === "function") {
            process.send('ready');
        }
    }
});

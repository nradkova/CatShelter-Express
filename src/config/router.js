const homeHandler = require('../handlers/home');
const staticHandler = require('../handlers/static-files');

const handlers = {};

function match(method, url) {
    if (method == 'GET' && url.startsWith('/content/')) {
        return staticHandler;
    }
    if (method == 'GET' && url === '/') {
        return homeHandler.get;
    }

    const matchedUrl = Object.keys(handlers).find(x => url.startsWith(x) && x != '/');
    const handler = handlers[matchedUrl][method];
    
    if (handler == undefined) {
        return defaultHandler;
    } else {
        console.log('found')
        return handler;
    }
}

function registerHandler(method, url, handler) {
    let methods = handlers[url];

    if (methods == undefined) {
        methods = {};
        handlers[url] = methods;
    }

    handlers[url][method] = handler;
}

function defaultHandler(req, res) {
    res.statusCode = 404;
    res.write('Not Found');
    res.end();
}

module.exports = {
    registerHandler,
    get: (...params) => registerHandler('GET', ...params),
    post: (...params) => registerHandler('POST', ...params),
    match
};
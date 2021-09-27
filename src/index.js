const express = require('express');

const config = require('./config/config.json')[process.env.NODE_ENV];
const {init:storage}=require('./services/storage');

start();

async function start(){
    const app = express();

    require('./config/express')(app);

    app.use(await storage())

    require('./config/routes')(app);
    
    app.listen(config.PORT, console.log.bind(console, `Application is running on http://localhost:${config.PORT}`));
}

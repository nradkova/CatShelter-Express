const express = require('express');
const handlebars = require('express-handlebars');
let formidable = require('express-formidable');
const path = require('path');

const expressConfig = (app) => {
    app.set('views', path.resolve(__dirname, '../views'));
    app.engine('hbs', handlebars({extname: 'hbs'}));
    app.set('view engine', 'hbs');
    app.use('/content',express.static(path.resolve(__dirname, '../content')));
    app.use(express.urlencoded({ extended: true }));
};

module.exports = expressConfig;
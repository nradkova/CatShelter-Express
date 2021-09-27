const catController = require("../controllers/catController");
const homeController = require("../controllers/homeController");


const routesConfig = (app) => {
    app.use('/', homeController);
    app.use('/cats', catController);
   
}

module.exports = routesConfig;
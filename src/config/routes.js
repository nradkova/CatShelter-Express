const catController = require("../controllers/catController");
const homeController = require("../controllers/homeController");
const breedController=require("../controllers/breedController");


const routesConfig = (app) => {
    app.use('/', homeController);
    app.use('/breeds', breedController);
    app.use('/cats', catController);
}

module.exports = routesConfig;
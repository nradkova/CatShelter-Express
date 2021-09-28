const catController = require("../controllers/catController");
const homeController = require("../controllers/homeController");
const breedController=require("../controllers/breedController");
const notFoundController=require("../controllers/notFoundController");


const routesConfig = (app) => {
    app.use('/', homeController);
    // app.use('/search', homeController);
    app.use('/breeds', breedController);
    app.use('/cats', catController);
    app.use('*',notFoundController)
}

module.exports = routesConfig;
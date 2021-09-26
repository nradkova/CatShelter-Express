const http = require('http');

const router=require('./config/router.js')
const addBreedHandler = require('./handlers/addBreed.js');
const addCatHandler = require('./handlers/addCat.js');
const catShelterHandler = require('./handlers/catShelter.js');
const editCatHandler = require('./handlers/editCat.js');
const homeHandler = require('./handlers/home.js');

router.get('/', homeHandler.get);
router.get('/cats/add-cat', addCatHandler.get);
router.post('/cats/add-cat', addCatHandler.post);
router.get('/cats/add-breed', addBreedHandler.get);
router.post('/cats/add-breed', addBreedHandler.post);
router.get('/cats-edit', editCatHandler.get);
router.post('/cats-edit', editCatHandler.post);
router.post('/cats-delete', editCatHandler.del);
router.get('/cats-find-new-home', catShelterHandler.get);
router.post('/cats-find-new-home', catShelterHandler.post);

const port = 3000;
const server = http.createServer(requestHandler);

function requestHandler(req, res)  {
    const url = new URL(req.url, 'http://localhost');

    console.log('>>>', req.method, req.url);
    
    const handler = router.match(req.method, url.pathname);
    handler(req, res);
};

server.listen(port, () => console.log('Server is listening on port ' + port));
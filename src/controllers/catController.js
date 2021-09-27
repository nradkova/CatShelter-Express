const router = require('express').Router();
const formidable = require('formidable');
const formParse = require('../middlewares/formParser');

router.get('/new', async (req, res) => {
    const breeds = await req.storage.getBreeds();
    res.render('addCat', { title: 'Add Cat', breeds })
});

router.post('/new', async (req, res) => {
    console.log("in")

    const form = formidable();
    const [fields, file] = await formParse(req, form);
    const cat=Object.assign({},fields,{image:file.upload.name});
    console.log(cat)
    try {
        await req.storage.createCat(cat,file.upload.path);
        res.redirect('/');
    } catch (error) {
        res.redirect('/404');
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const cat = await req.storage.getCatById(id);
    const breedsData = await req.storage.getBreeds();
    const breeds = breedsData.map(x => {
        if (x == cat.breed) {
            return Object.assign({}, { name: x, selected: 'selected' });
        }
        return Object.assign({}, { name: x });
    });
    if (cat) {
        const ctx = {
            title: 'Cat Details',
            cat,
            id,
            breeds
        }
        res.render('editCat', ctx);
    } else {
        res.redirect('/404');
    }
});
module.exports = router;
const router = require('express').Router();
const formidable = require('formidable');
const formParse = require('../middlewares/formParser');

router.get('/new', async (req, res) => {
    try {
        const breeds = await req.storage.getBreeds();
        res.render('addCat', { title: 'Add Cat', breeds });
    } catch (error) {
        res.redirect('/404');
    }
});

router.post('/new', async (req, res) => {
    const form = formidable();
    const [fields, file] = await formParse(req, form);
    const cat = Object.assign({}, fields, { image: file.upload.name });
    if (cat.name == '' || cat.description == '' || cat.image == '') {
        const breeds = await req.storage.getBreeds();
        const err = "All fields are required. Please, fill the missing ones!"
        return res.render('addCat', { title: 'Add Cat',cat, breeds, err });
    }
    try {
        await req.storage.createCat(cat, file.upload.path);
        res.redirect('/');
    } catch (error) {
        res.redirect('/404');
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const cat = await req.storage.getCatById(id);
        const breedsData = await req.storage.getBreeds();
        const breeds = breedsData.map(x => {
            if (x == cat.breed) {
                return Object.assign({}, { name: x, selected: 'selected' });
            }
            return Object.assign({}, { name: x });
        });
        const ctx = {
            title: 'Cat Details',
            cat,
            id,
            breeds
        }
        res.render('editCat', ctx);
    } catch (error) {
        res.redirect('/404');
    }

});

router.post('/:id', async (req, res) => {
    const id = req.params.id;
    const form = formidable();
    const [fields, file] = await formParse(req, form);
    const cat = Object.assign({}, fields);
    const fileName = file.upload.name;
    const filePath = fileName != '' ? file.upload.path : '';

    try {
        await req.storage.editCat(id, cat, fileName, filePath);
        res.redirect('/');
    } catch (error) {
        res.redirect('/404');
    }
});

router.post('/:id/delete', async (req, res) => {
    const id = req.params.id;
    try {
        await req.storage.deleteCat(id);
        res.redirect('/');
    } catch (error) {
        res.redirect('/404');
    }
});

router.get('/:id/shelter', async (req, res) => {
    const id = req.params.id;
    try {
        const cat = await req.storage.getCatById(id);
        const breedsData = await req.storage.getBreeds();
        const breeds = breedsData.map(x => {
            if (x == cat.breed) {
                return Object.assign({}, { name: x, selected: 'selected' });
            }
            return Object.assign({}, { name: x });
        });
        const ctx = {
            title: 'Cat New Home',
            cat,
            id,
            breeds
        }
        res.render('catShelter', ctx);
    } catch (error) {
        res.redirect('/404');
    }
});

router.post('/:id/shelter', async (req, res) => {
    const id = req.params.id;
    try {
        await req.storage.deleteCat(id);
        res.redirect('/');
    } catch (error) {
        res.redirect('/404');
    }
});

module.exports = router;
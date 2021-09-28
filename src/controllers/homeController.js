const router = require('express').Router();
const formidable = require('formidable');
const formParse = require('../middlewares/formParser');

router.get('/', async (req, res) => {
    try {
        const cats = await req.storage.getAll();
        res.render('catalog', { title: 'Cat Shelter', cats });
    } catch (error) {
        res.redirect('/404');
    }
});

router.post('/', async (req, res) => {
    const form = formidable();
    const [field] = await formParse(req, form);
    try {
        const cats = await req.storage.getAll(field.search);
        res.render('catalog', { title: 'Cat Shelter', cats });
    } catch (error) {
        res.redirect('/404');
    }
});

module.exports = router;
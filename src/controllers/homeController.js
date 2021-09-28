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
        let err='';
        if(cats.length==0){
            err='Sorry, we do not have cat with such name.'
        }
        res.render('catalog', { title: 'Cat Shelter', cats ,err});
    } catch (error) {
        res.redirect('/404');
    }
});

module.exports = router;
const router = require('express').Router();
const formidable = require('formidable');
const formParse = require('../middlewares/formParser');

router.get('', async (req, res) => {
    try {
        const breeds = await req.storage.getBreeds();
        res.render('addBreed', { title: 'Add Breed', breeds });
    } catch (error) {
        res.redirect('/404');
    }
});

router.post('', async (req, res) => {
    const form = new formidable();
    const [field] = await formParse(req, form);
    try {
      const created =  await req.storage.addBreed(field.breed);
      if(created){
          res.redirect('/');
      }else{
          const err='A breed with the same name already exists. Please, enter a new one!'
          res.render('addBreed', { title: 'Add Breed', err });
      }
    } catch (error) {
        res.redirect('/404');
    }
});

module.exports = router;
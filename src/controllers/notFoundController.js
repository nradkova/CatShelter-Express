const router = require('express').Router();

router.get('/404', (req, res) => {
    res.render('404', { title: 'Not Found'});
});
router.get('', (req, res) => {
    res.render('404', { title: 'Not Found'});
});

module.exports = router;
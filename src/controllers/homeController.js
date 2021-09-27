const router=require('express').Router(); 
   router.get('/',async(req, res) =>{
        const cats=await req.storage.getAll();
        res.render('catalog',{title:'Cat Shelter',cats});
    });

module.exports=router;
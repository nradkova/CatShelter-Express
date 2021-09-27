const fs = require('fs/promises');
const path=require('path')

let catData = {};
let breedData = {};

async function init() {
    try {
        console.log(path.resolve(__dirname,'../data/cats.json'))
        catData = JSON.parse(await fs.readFile(path.resolve(__dirname,'../data/cats.json')));
        breedData=JSON.parse(await fs.readFile(path.resolve(__dirname,'../data/breeds.json')));
    } catch (error) {
        throw new Error('Error reading datadase')
    }

    return (req, res, next) => {
        req.storage = {
            init
            
        }
        next();
    }
}


module.exports = {
    init
   
}



















const fs = require('fs/promises');
const path = require('path')

let catData = {};
let breedData = {};

async function init() {
    try {
        catData = JSON.parse(await fs.readFile(path.resolve(__dirname, '../data/cats.json')));
        breedData = JSON.parse(await fs.readFile(path.resolve(__dirname, '../data/breeds.json')));
    } catch (error) {
        throw new Error('Error reading datadase')
    }

    return (req, res, next) => {
        req.storage = {
            init,
            getAll,
            getCatById,
            createCat,
            getBreeds,

        }
        next();
    }
}

async function getAll() {
    const cats = Object.entries(catData).map(([id, prop]) => Object.assign({}, { id }, prop));
    return cats;
};

async function getCatById(id) {
    return catData[id];
};

async function createCat(cat, oldPath) {
    const newPath = path.normalize(path.join(__dirname, '../content/images',cat.image));
    await fs.copyFile(oldPath, newPath);
    await fs.unlink(oldPath);

    cat.id = setId(catData.length);
    catData.push(cat);
    let updated = JSON.stringify(catData, null, 2);
    return await fs.writeFile('./data/cats.json', updated, 'utf-8');
};

async function getBreeds() {
    return breedData;
};

module.exports = {
    init,
    getAll,
    getCatById,
    createCat,
    getBreeds,

}

function setId(num) {
    let id = ('00000000' + (Math.random() * 99999999 * num | 0).toString(16)).slice(-8);

    return id;
}


















const fs = require('fs/promises');
const path = require('path');
const uniqid = require('uniqid');

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
            editCat,
            deleteCat,
            getBreeds,
            addBreed
        }
        next();
    }
}

async function getAll(query) {
    let cats = Object.entries(catData).map(([id, prop]) => Object.assign({}, { id }, prop));
    if(query){
        cats=cats.filter(x=>x.name.toLowerCase().startsWith(query.toLowerCase()));
    }
    return cats;
};

async function getCatById(id) {
    return catData[id];
};

async function createCat(cat, uploadPath) {
    const newPath = path.normalize(path.join(__dirname, '../content/images', cat.image));
    await fs.copyFile(uploadPath, newPath);
    await fs.unlink(uploadPath);

    const id = uniqid();
    catData[id] = cat;
    const updated = JSON.stringify(catData, null, 2);
    return await fs.writeFile(path.resolve(__dirname, '../data/cats.json'), updated, 'utf-8');
};

async function editCat(id, cat, fileName, uploadPath) {
    if (fileName != '') {
        if (catData[id].image != '') {
            await fs.unlink(path.normalize(path.join(__dirname, '../content/images', catData[id].image)));
        }
        const newPath = path.normalize(path.join(__dirname, '../content/images', fileName));
        await fs.copyFile(uploadPath, newPath);
        await fs.unlink(uploadPath);
        cat.image = fileName;
    } else {
        cat.image = catData[id].image;
    }

    catData[id] = cat;
    const updated = JSON.stringify(catData, null, 2);
    return await fs.writeFile(path.resolve(__dirname, '../data/cats.json'), updated, 'utf-8');
};

async function deleteCat(id) {
    const cat = catData[id];
    const filePath = path.normalize(path.join(__dirname, '../content/images', cat.image));
    await fs.unlink(filePath);

    delete catData[id];

    const updated = JSON.stringify(catData, null, 2);
    return await fs.writeFile(path.resolve(__dirname, '../data/cats.json'), updated, 'utf-8');
};

async function getBreeds() {
    return breedData;
};

async function addBreed(breed) {
    if (!breedData.includes(breed)) {
        breedData.push(breed);
        const updated = JSON.stringify(breedData);
        await fs.writeFile(path.resolve(__dirname,'../data/breeds.json'), updated, 'utf-8');
        return breed;
    }
}

module.exports = {
    init,
    getAll,
    getCatById,
    createCat,
    editCat,
    deleteCat,
    getBreeds,
    addBreed
}

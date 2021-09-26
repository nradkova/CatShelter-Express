const path = require('path');

const cats = require('../data/cats.json');
const breeds = require('../data/breeds.json');

const breedTemplate = (breed) => `<option value="${breed}">${breed}</option>`;

const breedsTemplate = breeds.map(breedTemplate);

const catTemplate=(cat)=>`
<li data-id="${cat.id}">
    <img src="${path.join('/content/images/'+cat.image)}" alt="Cat">
    <h3>${cat.name}</h3>
    <p><span>Breed: </span>${cat.breed}</p>
    <p><span>Description: </span>${cat.description}</p>
    <ul class="buttons">
        <li class="btn edit"><a href="/cats-edit/${cat.id}">Change Info</a></li>
        <li class="btn delete"><a href="/cats-find-new-home/${cat.id}">New Home</a></li>
    </ul>
</li>`;

const catsTemplate=cats.map(catTemplate).join('');

module.exports = {
    breedsTemplate,
    catsTemplate
}

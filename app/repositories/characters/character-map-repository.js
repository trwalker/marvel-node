var characterMap_;

function CharacterMapRepository() {
    this.settings = require('../../config/settings/settings-config').settings;
}

function getCharacterMap() {
    if(!characterMap_) {
        characterMap_ = new Map();

        characterMap_.set('spider-man', {
            id: 1009610,
            name: 'spider-man',
            imageUri: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg'
        });

        characterMap_.set('hulk', {
            id: 1009351,
            name: 'hulk',
            imageUri: 'http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0.jpg'
        });

        characterMap_.set('captain-america', {
            id: 1009220,
            name: 'captain-america',
            imageUri: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087.jpg'
        });

        characterMap_.set('iron-man', {
            id: 1009368,
            name: 'iron-man',
            imageUri: 'http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55.jpg'
        });

        characterMap_.set('thor', {
            id: 1009664,
            name: 'thor',
            imageUri: 'http://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350.jpg'
        });

        characterMap_.set('wolverine', {
            id: 1009718,
            name: 'wolverine',
            imageUri: 'http://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf.jpg'
        });

        characterMap_.set('storm', {
            id: 1009629,
            name: 'storm',
            imageUri: 'http://i.annihil.us/u/prod/marvel/i/mg/6/40/526963dad214d.jpg'
        });

        characterMap_.set('jean-grey', {
            id: 1009496,
            name: 'jean-grey',
            imageUri: 'http://i.annihil.us/u/prod/marvel/i/mg/f/30/4bc654cf9d0ac.jpg'
        });

        characterMap_.set('gambit', {
            id: 1009313,
            name: 'gambit',
            imageUri: 'http://i.annihil.us/u/prod/marvel/i/mg/a/40/52696aa8aee99.jpg'
        });

        characterMap_.set('cyclops', {
            id: 1009257,
            name: 'cyclops',
            imageUri: 'http://i.annihil.us/u/prod/marvel/i/mg/6/70/526547e2d90ad.jpg'
        });

        characterMap_.set('beast', {
            id: 1009175,
            name: 'beast',
            imageUri: 'http://i.annihil.us/u/prod/marvel/i/mg/2/80/511a79a0451a3.jpg'
        });
    }

    return characterMap_;
}

CharacterMapRepository.prototype = {
    getCharacterMap: getCharacterMap
};

var characterMapRepository = new CharacterMapRepository();

module.exports = characterMapRepository;

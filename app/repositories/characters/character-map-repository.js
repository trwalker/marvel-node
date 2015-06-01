
var characterMap_;

function CharacterMapRepository() {
  initializeCharacterMap_();
}

function getCharacterMap() {
  return characterMap_;
}

function initializeCharacterMap_() {
  characterMap_ = new Map();

  characterMap_.set('spider-man', 1009610);
  characterMap_.set('hulk', 1009351);
  characterMap_.set('captain-america', 1009220);
  characterMap_.set('iron-man', 1009368);
  characterMap_.set('thor', 1009664);
  characterMap_.set('wolverine', 1009718);
  characterMap_.set('storm', 1009629);
  characterMap_.set('jean-grey', 1009496);
  characterMap_.set('gambit', 1009313);
  characterMap_.set('cyclops', 1009257);
  characterMap_.set('beast', 1009175);
}

CharacterMapRepository.prototype = {
    getCharacterMap: getCharacterMap
};

var characterMapRepository = new CharacterMapRepository();

module.exports = characterMapRepository;


var characterList_;

function CharacterListRepository() {
  initializeCharacterList_();
}

function getCharacterListData() {
  return characterList_;
}

function initializeCharacterList_() {
  characterList_ = {
    characters: [
      { name: 'spider-man', id: 1009610 },
      { name: 'hulk', id: 1009351 },
      { name: 'captain-america', id: 1009220 },
      { name: 'iron-man', id: 1009368 },
      { name: 'thor', id: 1009664 },
      { name: 'wolverine', id: 1009718 },
      { name: 'storm', id: 1009629 },
      { name: 'jean-grey', id: 1009496 },
      { name: 'gambit', id: 1009313 },
      { name: 'cyclops', id: 1009257 },
      { name: 'beast', id: 1009175 },
      { name: '', id: 0 }
    ]
  };
}

CharacterListRepository.prototype = {
    getCharacterListData: getCharacterListData
};

var characterListRepository = new CharacterListRepository();

module.exports = characterListRepository;


function CharacterRepository() {
}

function getCharacterData(id, timeStamp, publicKey, hash, callback) {
  // Make request
  // hash = md5(ts+privateKey+publicKey)
  // http://gateway.marvel.com/v1/public/characters/{characterId}?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150
}

CharacterRepository.prototype = {
    getCharacterData: getCharacterData
};

var characterRepository = new CharacterRepository();

module.exports = characterRepository;

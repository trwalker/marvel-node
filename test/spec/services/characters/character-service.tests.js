describe('CharactersService Tests', function () {

    var charactersService;
    var cacheContainer;

    beforeEach(function () {
        charactersService = require('../../../../app/services/characters/character-service');

        charactersService.characterMappingService_ = {
            lookupId: function (name) {
                return 1009610
            }
        };

        charactersService.credentialsService_ = {
            lookupCredentials: function () {
                return {
                    timeStamp: '1427980679859',
                    publicKey: '6ba7749b970cb510f72635ed9fee5119',
                    hash: 'b8fcdc8fd05f1bd62d6c7aa6736afe31'
                }
            }
        };

        cacheContainer = {};
        charactersService.characterCacheService_ = {
            lookupCharacter: function (name) {
                return cacheContainer[name];
            },
            cacheCharacter: function (name, character) {
                cacheContainer[name] = character;
            }
        };

        charactersService.characterRespository_ = {
            getCharacterData: function (id, timeStamp, publicKey, hash, callback) {
                var data = {
                    data: {
                        results: [{
                            id: 1009610,
                            name: 'spider-man',
                            description: 'The guy in the tight red outfit',
                            thumbnail: {
                                path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b',
                                extension: 'jpg'
                            },
                            comics: {
                                items: [{
                                    title: 'Actor Presents Spider-Man and the Incredible Hulk (2003) #1',
                                    url: 'http://gateway.marvel.com/v1/public/comics/320'
                                }]
                            }

                        }]
                    }
                };

                callback(data);
            }
        };

    });

    describe('lookupCharacter', function () {

        it('should be a function', function (done) {
            expect(charactersService.lookupCharacter).to.be.a('function');
            done();
        });

        it('should return all model properties when valid character', function (done) {
            charactersService.lookupCharacter('spider-man', function (characterModel) {
                expect(characterModel.id).to.equal(1009610);
                expect(characterModel.name).to.equal('spider-man');
                expect(characterModel.description).to.equal('The guy in the tight red outfit');
                expect(characterModel.image).to.equal('http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg');
                expect(characterModel.comics.length).to.equal(1);

                done();
            });
        });

        it('should cache character after looking up character', function (done) {
            charactersService.lookupCharacter('spider-man', function (characterModel) {
                var cachedCharacter = cacheContainer['spider-man'];
                expect(characterModel.id).to.equal(cachedCharacter.id);

                done();
            });
        });

        it('should return cached character when character is cached', function (done) {
            cacheContainer['spider-man'] = {name: 'spider-man', id: 1234};

            charactersService.lookupCharacter('spider-man', function (characterModel) {
                expect(characterModel.id).to.equal(1234);

                done();
            });
        });

        it('should throw exception when characterCacheService lookupCharacter throws exception', function (done) {
            sinon.stub(charactersService.characterCacheService_, 'lookupCharacter', function () {
                throw new Error('Lookup Error');
            });

            var lookupCharacter = function () {
                charactersService.lookupCharacter('spider-man', function (data) {
                });
            };
            expect(lookupCharacter).to.throw(Error, 'Lookup Error');

            done();
        });

        it('should throw exception when characterCacheService cacheCharacter throws exception', function (done) {
            sinon.stub(charactersService.characterCacheService_, 'cacheCharacter', function () {
                throw new Error('Cache Error');
            });

            var lookupCharacter = function () {
                charactersService.lookupCharacter('spider-man', function (data) {
                });
            };
            expect(lookupCharacter).to.throw(Error, 'Cache Error');

            done();
        });

        it('should throw exception when characterMappingService throws exception', function (done) {
            sinon.stub(charactersService.characterMappingService_, 'lookupId', function () {
                throw new Error('Mapping Error');
            });

            var lookupCharacter = function () {
                charactersService.lookupCharacter('spider-man', function (data) {
                });
            };
            expect(lookupCharacter).to.throw(Error, 'Mapping Error');

            done();
        });

        it('should throw exception when credentialService throws exception', function (done) {
            sinon.stub(charactersService.credentialsService_, 'lookupCredentials', function () {
                throw new Error('Credentials Error');
            });

            var lookupCharacter = function () {
                charactersService.lookupCharacter('spider-man', function (data) {
                });
            };
            expect(lookupCharacter).to.throw(Error, 'Credentials Error');

            done();
        });

        it('should throw exception when characterRespository throws exception', function (done) {
            sinon.stub(charactersService.characterRespository_, 'getCharacterData', function () {
                throw new Error('Character Repo Error');
            });

            var lookupCharacter = function () {
                charactersService.lookupCharacter('spider-man', function (data) {
                });
            };
            expect(lookupCharacter).to.throw(Error, 'Character Repo Error');

            done();
        });

        it('should throw exception when characterRespository returns null', function (done) {
            sinon.stub(charactersService.characterRespository_, 'getCharacterData', function (id, timeStamp, publicKey, hash, callback) {
                callback(null);
            });

            var lookupCharacter = function () {
                charactersService.lookupCharacter('spider-man', function (data) {
                });
            };
            expect(lookupCharacter).to.throw(Error, 'CharactersService.getCharacterModelFromData_(): Character data not returned from character repository');

            done();
        });

        it('should throw exception when characterRespository returns null data property', function (done) {
            sinon.stub(charactersService.characterRespository_, 'getCharacterData', function (id, timeStamp, publicKey, hash, callback) {
                callback({data: null});
            });

            var lookupCharacter = function () {
                charactersService.lookupCharacter('spider-man', function (data) {
                });
            };
            expect(lookupCharacter).to.throw(Error, 'CharactersService.getCharacterModelFromData_(): Character data not returned from character repository');

            done();
        });

        it('should throw exception when characterRespository returns null data results property', function (done) {
            sinon.stub(charactersService.characterRespository_, 'getCharacterData', function (id, timeStamp, publicKey, hash, callback) {
                callback({data: {results: null}});
            });

            var lookupCharacter = function () {
                charactersService.lookupCharacter('spider-man', function (data) {
                });
            };
            expect(lookupCharacter).to.throw(Error, 'CharactersService.getCharacterModelFromData_(): Character data not returned from character repository');

            done();
        });

        it('should throw exception when characterRespository returns empty data results array', function (done) {
            sinon.stub(charactersService.characterRespository_, 'getCharacterData', function (id, timeStamp, publicKey, hash, callback) {
                callback({data: {results: []}});
            });

            var lookupCharacter = function () {
                charactersService.lookupCharacter('spider-man', function (data) {
                });
            };
            expect(lookupCharacter).to.throw(Error, 'CharactersService.getCharacterModelFromData_(): Character data not returned from character repository');

            done();
        });

        it('should throw exception when characterRespository returns empty bad data', function (done) {
            sinon.stub(charactersService.characterRespository_, 'getCharacterData', function (id, timeStamp, publicKey, hash, callback) {
                callback({data: {results: [{}]}});
            });

            var lookupCharacter = function () {
                charactersService.lookupCharacter('spider-man', function (data) {
                });
            };
            expect(lookupCharacter).to.throw(Error);

            done();
        });
    });
});

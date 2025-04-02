const fs = require('fs');
const load_dictionary = fs.readFileSync('../LexClass/Dictionary.json', { encoding: 'utf-8' });
const parse_dic = JSON.parse(load_dictionary);

const Dictionary = new Map(parse_dic);

exports.getClassification = (Word) => {
    if (!Dictionary.has(Word)) return [];
    return Dictionary.get(Word);
};

exports.validWord = (Word) => {
    return Dictionary.has(Word);
};

exports.phraseClassification = (Phrase) => {
    const get_words = Phrase.split(' ');

    let callback = {};
    for (const word of get_words) {
        callback[word] = [];
        if (this.validWord(word)) callback[word] = this.getClassification(word);
    };

    return callback;
};

exports.getClassifiedWords = (Classification) => {
    const getArray = Array.from(Dictionary.entries()).filter(([palavra, classes]) => classes.includes(Classification)).map(([palavra]) => palavra);
    return getArray;
};
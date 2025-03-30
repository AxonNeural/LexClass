const fs = require('fs');
const load_dictionary = fs.readFileSync('./Dictionary.json', { encoding: 'utf-8' });
const parse_dic = JSON.parse(load_dictionary);

const Dictionary = new Map(parse_dic);

exports.getClassification = (Word) => {
    if (!Dictionary.has(Word)) return [];
    return Dictionary.get(Word);
};

exports.validWord = (Word) => {
    return Dictionary.has(Word);
};
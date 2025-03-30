//Original Source: https://github.com/datasets-br/unitex-pt-br/blob/master/data/mirror/DELAS.csv
//Classification: https://raw.githubusercontent.com/datasets-br/unitex-pt-br/refs/heads/master/data/grammatical_codes.csv

const fs = require('fs');
const read_dictionary = fs.readFileSync('./classificationSystem/Dictionary.csv', { encoding: 'utf-8' });
const split_dic = read_dictionary.split('\n');
const filtered_dic = split_dic.slice(1, split_dic.length - 2);

let words = new Map();
for (let word of filtered_dic) {
    const split_word = word.split(',');

    word = split_word[0];
    const classification = split_word[1];
    
    let word_classification = [];
    for (const classific of ['N', 'V', 'A', 'PREP', 'PRO']) {
        if (classification.includes(classific)) word_classification.push(classific);
    }

    if (word_classification.length !== 0) words.set(word, word_classification);
}

fs.writeFileSync('Dictionary.json', JSON.stringify([...words]), { encoding: 'utf-8' });
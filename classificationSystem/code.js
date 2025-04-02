//Original Source: https://github.com/datasets-br/unitex-pt-br/blob/master/data/mirror/DELAS.csv
//Classification: https://raw.githubusercontent.com/datasets-br/unitex-pt-br/refs/heads/master/data/grammatical_codes.csv

const fs = require('fs');
const read_dictionary = fs.readFileSync('./classificationSystem/Dictionary.csv', { encoding: 'utf-8' });
const split_dic = read_dictionary.split('\n');
const filtered_dic = split_dic.slice(1, split_dic.length - 2);

/*
A,adjective,"fabulous,broken-down"
ADV,adverb,"actually,years ago"
CONJC,coordinating conjunction,but
CONJS, subordinating conjunction,because
DET,determiner,each
INTERJ,interjection, eureka
N,noun evidence,group theory
PREP,preposition,without
PRO,pronoun,you
V,verb overeat,plug-and-play
*/

let class_list = ["CONJC", "CONJS", "INTERJ", "PREP", "ADV", "DET", "PRO", "+Pr", "A", "N", "V"];
function get_classifications(Class) {
    let i = 0;
    let callback = [];
    while (i !== class_list.length) {
        let get_comparator = class_list[i];
        if (get_comparator === "+Pr") get_comparator = "NAME";
        if (Class.includes(get_comparator)) {
            callback.push(get_comparator);
            Class = Class.replace(get_comparator, '');
        };

        i++;
    };

    return callback;
};

let words = new Map();
for (let word of filtered_dic) {
    const split_word = word.split(',');

    word = split_word[0];
    const classification = split_word[1];

    const word_classification = get_classifications(classification);
    if (word_classification.length !== 0) words.set(word, word_classification);
}

fs.writeFileSync('Dictionary.json', JSON.stringify([...words]), { encoding: 'utf-8' });
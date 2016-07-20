var fs = require('fs');
var haiku = require('./haiku.js');

var structure = [];
var corpus = undefined;
var type = 1;
var dicWordToSyll = {};

// Parse arguments and print help.
if (process.argv.length === 2) {
    console.log("You must specify at least a structure.");
    console.log("");
    console.log("usage: node haiku_generator.js <structure> [corpus]");
    console.log("Example: node haiku_generator.js [5,7,5] fifty_shades.txt");
    console.log("Example: node haiku_generator.js [[1,2,2],[3,1,3],[1,4]]");
    console.log("");
    console.log("Structure format 1:");
    console.log("With a 1D array of positive integers, [/d,/d,/d]");
    console.log("Each line only has to add up to the syllable count for that line.");
    console.log("Recommended when a [corpus] is included.");
    console.log("Example: [5,7,5] can return:")
    console.log("A KITTY FOLLOWS, ANYWHERE AND EVERYWHERE, BUT BEGRUDINGLY");
    console.log("");
    console.log("Structure format 2:");
    console.log("With a 2D array of positive integers, [[/d,/d,..],[/d,/d,..],[/d,/d,..]]");
    console.log("Each word in a line will match exactly the syllables specified for that line.");
    console.log("Example: [[1,2,2],[3,1,3],[1,4]] can return:")
    console.log("A KITTY FOLLOWS, ANYWHERE AND EVERYWHERE, BUT BEGRUDINGLY");
    console.log("");
    console.log("The inclusion of an optional [corpus] file provides an input");
    console.log("from which the haiku is generated.");
    console.log("");
    process.exit();
} else {
    try {
        structure = JSON.parse(process.argv[2]);
        if (structure.some(function(line) {
            return Array.isArray(line);
        })) {
            type = 2;
        } else {
            type = 1;
        }
        structure.forEach(function(line) {
            if (Array.isArray(line)) {
                if (line.some(function(syllables) {
                    return Array.isArray(syllables);
                })) {
                    throw new Error("Cannot have a 3 or greater dimension array.");
                }
            }
        });
    } catch (err) {
        console.log(err.message);
        console.log("Something went wrong with the <structure> parsing.");
        console.log("");
        process.exit();
    }
    try {
        if (process.argv[3]) {
            corpus = fs.readFileSync(process.argv[3], 'utf-8');
        } else {
            corpus = undefined;
        }
    } catch (err) {
        console.log(err.message);
        console.log("Something went wrong with the [corpus] parsing.");
        console.log("");
        process.exit()
    }
}

// Create dicWordToSyll.
// K -> V pairs where K is the word, and V is an integer for number of syllables.
console.log("Generating word to syllable count dictionary...");
var data = fs.readFileSync('cmudict.txt', 'utf-8');
data = data.split('\n');
data.forEach(function(entry) {
    var entrySplit = entry.split('  ');
    // Fill dicWordToSyll, but ignore entries with
    // duplicate count, or non-alphabet characters.
    if (entrySplit[0].match(/^[a-z]+$/i)) {
        var word = entrySplit[0].toUpperCase();
        var syllables = 0;
        entrySplit[1].split(' ').forEach(function(element) {
            if (element.match(/[0-9]+/))
                syllables++;
        });
        dicWordToSyll[word] = syllables;
    }
});

// Create haiku.
console.log("Generating some haiku...");
console.log("");
haiku.createHaiku(dicWordToSyll, type, structure, corpus);

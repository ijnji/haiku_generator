function createHaiku(dicWordToSyll, type, structure, corpus)  {
    // Create another dictionary K->V, where K is an integer
    // and V is all words of K syllable count.
    var dicSyllToWord = {};
    for (var word in dicWordToSyll) {
        var count = dicWordToSyll[word];
        if (dicSyllToWord[count] === undefined)
            dicSyllToWord[count] = [];
        dicSyllToWord[count].push(word);
    }

    if (corpus === undefined) {
        if (type === 1) {
            byDictionaryOne(dicSyllToWord, structure);
        } else {
            byDictionaryTwo(dicSyllToWord, structure);
        }
    }  else {
        byCorpus(dicWordToSyll, type, structure, corpus);
    }
}

function byDictionaryOne(dicSyllToWord, structure) {
    try {
        var haiku = "";
        structure.forEach(function(syllCount) {
            while (syllCount > 0) {
                var randSyll = randIntAboveZero(syllCount);
                var randWord = randWordBySyll(randSyll, dicSyllToWord);
                haiku += randWord + " ";
                syllCount -= randSyll;
            }
            haiku += "\n";
        });
        console.log(haiku);
    } catch (err) {
        console.log("Could not make a haiku given this structure.");
        process.exit();
    }
}

function byDictionaryTwo(dicSyllToWord, structure) {
    try {
        var haiku = "";
        structure.forEach(function(syllPattern) {
            syllPattern.forEach(function(syllCount) {
                var randWord = randWordBySyll(syllCount, dicSyllToWord);
                haiku += randWord + " ";
            });
            haiku += "\n";
        });
        console.log(haiku);
    } catch (err) {
        console.log("Could not make a haiku given this structure.");
        process.exit();
    }
}

function randIntAboveZero(max) {
    return Math.floor(Math.random() * (max - 1)) + 1;
}

function randWordBySyll(syllCount, dicSyllToWord) {
    var entry = dicSyllToWord[syllCount];
    return entry[Math.floor(Math.random() * (entry.length - 1))];
}

function byCorpus(dicWordToSyll, type, structure, corpus) {
    // We keep an array that we add to when a sentence matches our structure.
    var haiku = [];
    for (var i = 0; i < structure.length; i++) {
        haiku[i] = [];
    }

    // Parse sentence by sentence.
    var sentences = [];
    var sentenceSplit = corpus.split(".");
    sentenceSplit.forEach(function(oldEntry) {

        // Replace the special single quote with the normal ASCII one.
        oldEntry = oldEntry.replace(/’/g, "'");

        // Filter only alphabet and apostrophies while making uppercase.
        var newEntry = "";
        for (var i = 0; i < oldEntry.length; i++) {
            if (oldEntry.charAt(i).match(/[a-z'\s]/i)) {
                newEntry += oldEntry.charAt(i).toUpperCase();
            }
        }

        // Remove head, tail, multiple spaces.
        newEntry = newEntry.replace(/^\s+/, "");
        newEntry = newEntry.replace(/\s+$/, "");
        newEntry = newEntry.replace(/\s+/g, " ");

        sentences.push(newEntry);
    });

    sentences.forEach(function(entry) {
        if (type === 1) {
            byCorpusOne(haiku, dicWordToSyll, structure, entry);
        } else {
            byCorpusTwo(haiku, dicWordToSyll, structure, entry);
        }
    });

    // Check if all entries in haiku are > 0.
    for (var i = 0; i < haiku.length; i++) {
        if (haiku[i].length === 0) {
            console.log("Could not make a haiku given this structure.");
            process.exit();
        }
    }

    // Print a random selection.
    for (var i = 0; i < haiku.length; i++) {
        var randIndex = Math.floor(Math.random() * (haiku[i].length - 1));
        console.log(haiku[i][randIndex]);
    }
}

function byCorpusOne(haiku, dicWordToSyll, structure, entry) {
    // For each structure, enumerate all substrings of sentence and find match.
    var entrySplit = entry.split(/\s/);
    for (var l = 0; l < structure.length; l++) {
        for (var start = 0; start < entrySplit.length; start++) {
            for (var end = start; end < entrySplit.length; end++) {
                var slice = entrySplit.slice(start, end + 1);
                var sum = sumOfSyll(dicWordToSyll, slice);
                if (sum > 0 && sum === structure[l]) {
                    haiku[l].push(slice.join(" "));
                }
            }
        }
    }
}

function sumOfSyll(dicWordToSyll, slice) {
    var sum = 0;
    for (var i = 0; i < slice.length; i++) {
        if (dicWordToSyll[slice[i]]) {
            sum += dicWordToSyll[slice[i]];
        } else {
            return 0;
        }
    }
    return sum;
}

function byCorpusTwo(haiku, dicWordToSyll, structure, entry) {
    // For each structure, find match in sentence.
    var entrySplit = entry.split(/\s/);
    for (var l = 0; l < structure.length; l++) {
        var structlen = structure[l].length;
        if (entrySplit.length < structlen) continue;
        for (var start = 0; start <= entrySplit.length - structlen; start++) {
            var end = start + structlen - 1;
            var slice = entrySplit.slice(start, end + 1);
            if (matchEachSyll(dicWordToSyll, structure[l], slice)) {
                haiku[l].push(slice.join(" "));
            }
        }
    }
}

function matchEachSyll(dicWordToSyll, subStruct, slice) {
    for (var i = 0; i < slice.length; i++) {
        if (subStruct[i] !== dicWordToSyll[slice[i]]) return false;
    }
    return true;
}

module.exports = {
    createHaiku: createHaiku,
};

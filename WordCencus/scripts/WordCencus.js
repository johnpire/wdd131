const END_WORD = [".", "?", "!"];
const CHARACTERS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
                "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "'", "-",
                "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const ABBREVIATIONS = new Set([
    "dr.", "mr.", "mrs.", "ms.", "jr.", "sr.", "prof.", "rev.", 
    "gen.", "capt.", "hon.", "rep.", "sen.", "gov.", "pres.", 
    "amb.", "col.", "sgt.", "lt.", "cmdr.", "adm.", "maj.",
    "br.", "fr.", "sr.", "st.", "hrh.", "ph.d.", "m.d.", "d.d.s.",
    "d.v.m.", "ed.d.", "esq.", "pharm.d.", "d.m.d.", "d.eng.",

    "mt.", "st.", "ave.", "rd.", "blvd.", "ln.", "dr.", "ct.",
    "pl.", "cir.", "ste.", "apt.", "rm.", "fl.", "hwy.", "rte.",

    "inc.", "co.", "corp.", "ltd.", "llc.", "plc.", "assn.", 
    "bros.", "dept.", "univ.", "inst.", "intl.", "mfg.", 

    "etc.", "e.g.", "i.e.", "vs.", "a.m.", "p.m.", "no.", "num.",
    "vol.", "fig.", "p.", "pp.", "para.", "sec.", "ex.", "op.",
    "ca.", "cf.", "al.", "n.b.", "viz.", "et al.", "ibid.", "id.",
]);

const textInput = document.getElementById('textInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const wordCountEl = document.getElementById('wordCount');
const charCountEl = document.getElementById('charCount');
const sentenceCountEl = document.getElementById('sentenceCount');
const wordFrequencyTable = document.getElementById('wordFrequencyTable').querySelector('tbody');
const charFrequencyTable = document.getElementById('charFrequencyTable').querySelector('tbody');
const wordSearch = document.getElementById('wordSearch');
const searchWordBtn = document.getElementById('searchWordBtn');
const charSearch = document.getElementById('charSearch');
const searchCharBtn = document.getElementById('searchCharBtn');
const specificWordResult = document.getElementById('specificWordResult');
const specificCharResult = document.getElementById('specificCharResult');

// Event Listeners
analyzeBtn.addEventListener('click', analyzeText);
searchWordBtn.addEventListener('click', searchWord);
searchCharBtn.addEventListener('click', searchChar);

// Analayze Whole Text
function analyzeText() {
    const content = textInput.value;
    if (!content.trim()) {
        alert("Please enter some text to analyze.");
        return;
    }

    const words = contentToWords(content);
    const wordCount = countWords(words);
    const characterCount = countCharacters(content);
    const sentenceCount = countSentences(words);
    const cleanWords = getCleanWords(words);
    const wordFrequency = getWordFrequency(cleanWords);
    const wordFrequencyOrder = freqDictInDescendingOrder(wordFrequency);
    const characterFrequency = getCharFrequency(content, characterCount);
    const charFrequencyOrder = freqDictInDescendingOrder(characterFrequency);

    // Display basic stats
    wordCountEl.textContent = wordCount;
    charCountEl.textContent = characterCount;
    sentenceCountEl.textContent = sentenceCount;

    // Display word frequency
    displayWordFrequency(wordFrequencyOrder);

    // Display character frequency
    displayCharFrequency(charFrequencyOrder);
}

function contentToWords(content) {
    // myNotes: '\s' means white spaces | '+' means quantifier (one or more) | '/' delimeter if writing regular expressions (regex) 
    return content.split(/\s+/).filter(word => word.length > 0);
}

function getCleanWords(words) {
    const cleanWords = [];
    for (const word of words) {
        let cleanWord = "";
        for (const letter of word) {
            if (CHARACTERS.includes(letter.toLowerCase())) {
                cleanWord += letter;
            }
        }
        if (cleanWord) {
            cleanWords.push(cleanWord);
        }
    }
    return cleanWords;
}

function getWordFrequency(cleanWords) {
    const wordFrequency = {};
    const totalWords = cleanWords.length;

    for (const word of cleanWords) {
        const lowerWord = word.toLowerCase();
        wordFrequency[lowerWord] = (wordFrequency[lowerWord] || 0) + 1;
    }

    for (const key in wordFrequency) {
        const count = wordFrequency[key];
        const percentage = (count / totalWords) * 100;
        wordFrequency[key] = { count, percentage };
    }

    return wordFrequency;
}

function getCharFrequency(content, characterCount) {
    const characterFrequency = {};
    const lowerContent = content.toLowerCase();

    for (const char of lowerContent) {
        characterFrequency[char] = (characterFrequency[char] || 0) + 1;
    }

    for (const key in characterFrequency) {
        const count = characterFrequency[key];
        const percentage = (count / characterCount) * 100;
        characterFrequency[key] = { count, percentage };
    }

    return characterFrequency;
}

function freqDictInDescendingOrder(freqDict) {
    const entries = Object.entries(freqDict); // myNotes: Converts from object to array so we can sort then convert back to object
    
    entries.sort((a, b) => b[1].percentage - a[1].percentage);
    const sortedObj = {};
    for (const [key, value] of entries) {
        sortedObj[key] = value;
    }
    
    return sortedObj;
}

function countWords(words) {
    return words.length;
}

function countCharacters(content) {
    return content.length;
}

function countSentences(words) {
    let sentenceCount = 0;

    for (let i = 0; i < words.length; i++) {
        // myNotes: '[]' means "match any of the characters inside me" | '/g' means global flag, will find all matches not just one | '/' delimeter if writing regular expressions (regex)
        const word = words[i].replace(/["']/g, '');

        if (!word) continue;

        if (ABBREVIATIONS.has(word.toLowerCase())) {
            if (i + 1 < words.length) {
                continue;
            } else {
                sentenceCount += 1;
            }
        } else if (END_WORD.some(end => word.endsWith(end))) {
            // '\.' just means period, \ is necessary since . is a special regex characther
            // the or '[]' is to return null if no periods are found to avoid error
            if ((word.match(/\./g) || []).length > 1) {
                if (i + 1 < words.length) { 
                    const nextWord = words[i+1].replace(/["']/g, '');
                    if (nextWord[0] === nextWord[0].toUpperCase()) { // the '===' here is necessary because unlike python's .isupper which checks if a character is in uppercase, .toUpperCase of JS will make the character uppercase
                        sentenceCount += 1;
                    } else {
                        continue; // if next word is not uppercase (not end of text, sample: "U.S.A is a...", "when... I.. said...")
                    }
                } else {
                    sentenceCount += 1; // there's no following word (end of text)
                }
            } else {
                sentenceCount += 1; // if the word only have one dot (means it's a sentence) note: exceptions are already handled in ABBREVIATIONS
            }
        }
    }

    return sentenceCount;
}

// Display functions
function displayWordFrequency(wordFrequency) {
    wordFrequencyTable.innerHTML = '';
    
    for (const [word, data] of Object.entries(wordFrequency)) {
        const row = document.createElement('tr');
        
        const wordCell = document.createElement('td');
        wordCell.textContent = word;
        
        const countCell = document.createElement('td');
        countCell.textContent = data.count;
        
        const freqCell = document.createElement('td');
        freqCell.textContent = data.percentage.toFixed(2);
        
        row.appendChild(wordCell);
        row.appendChild(countCell);
        row.appendChild(freqCell);
        
        wordFrequencyTable.appendChild(row);
    }
}

function displayCharFrequency(charFrequency) {
    charFrequencyTable.innerHTML = '';
    
    for (const [char, data] of Object.entries(charFrequency)) {
        const row = document.createElement('tr');
        
        const charCell = document.createElement('td');
        charCell.textContent = char === '\n' ? 'new line' : char;
        
        const countCell = document.createElement('td');
        countCell.textContent = data.count;
        
        const freqCell = document.createElement('td');
        freqCell.textContent = data.percentage.toFixed(2);
        
        row.appendChild(charCell);
        row.appendChild(countCell);
        row.appendChild(freqCell);
        
        charFrequencyTable.appendChild(row);
    }
}

function searchWord() {
    const word = wordSearch.value.trim().toLowerCase();
    if (!word) {
        specificWordResult.textContent = "Please enter a word to search.";
        return;
    }

    const content = textInput.value;
    if (!content.trim()) {
        specificWordResult.textContent = "No text to analyze. Please enter some text first.";
        return;
    }

    const words = contentToWords(content);
    const cleanWords = getCleanWords(words);
    const wordFrequency = getWordFrequency(cleanWords);

    if (word in wordFrequency) {
        const data = wordFrequency[word];
        specificWordResult.innerHTML = `
            <p>Word: <strong>${word}</strong></p>
            <p>Occurrences: <strong>${data.count}</strong></p>
            <p>Frequency: <strong>${data.percentage.toFixed(2)}%</strong></p>
        `;
    } else {
        specificWordResult.textContent = `The word "${word}" was not found in the text.`;
    }
}

function searchChar() {
    const char = charSearch.value.trim().toLowerCase();
    if (!char) {
        specificCharResult.textContent = "Please enter a character to search.";
        return;
    }

    if (char.length > 1) {
        specificCharResult.textContent = "Please enter only one character.";
        return;
    }

    const content = textInput.value;
    if (!content.trim()) {
        specificCharResult.textContent = "No text to analyze. Please enter some text first.";
        return;
    }

    const characterCount = countCharacters(content);
    const characterFrequency = getCharFrequency(content, characterCount);

    if (char in characterFrequency) {
        const data = characterFrequency[char];
        specificCharResult.innerHTML = `
            <p>Character: <strong>${char === '\n' ? 'new line' : char}</strong></p>
            <p>Occurrences: <strong>${data.count}</strong></p>
            <p>Frequency: <strong>${data.percentage.toFixed(2)}%</strong></p>
        `;
    } else {
        specificCharResult.textContent = `The character "${char}" was not found in the text.`;
    }
}
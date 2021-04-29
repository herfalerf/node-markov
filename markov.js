/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();

    //this loops through words array.
    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      //if the word is already in chains, get the next word and add to chains
      if (chains.has(word)) chains.get(word).push(nextWord);
      //if the word is not in chains, set the word as a key in chains and the next word as its value
      else chains.set(word, [nextWord]);
    }

    this.chains = chains;
  }

  // function to choose a random word from a passed in array
  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }
  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];

    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }

    return out.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};

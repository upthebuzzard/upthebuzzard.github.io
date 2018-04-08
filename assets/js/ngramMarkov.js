var NMGenerator = (function() {

  const MAXNGRAM = 3; // 1 => single words, 2 => pairs of words, 3 => triples of words, etc
  const DEFAULT_NUM_SENTENCES = 10;
  const DEFAULT_SENTENCE_LENGTH = 20;
  const DEFAULT_END_WITHIN = Math.floor(DEFAULT_SENTENCE_LENGTH/3);
  const PROPORTION_SKIP_HIGHER_NGRAMS = 0.1;
  const REPEAT_TO_END_ON_ENDS_WORD = 3;

  function build(textList){
    const nmStruct = {
        starts: {},
        ends: {},
        tupleSets: {},
        endTupleSets: {},
        capitalised: {},
    }; /*
    a set of groups,
    where each group has
    {
      values: [],
      counts: [],
      next: {},
      totalCount: int
    }
    */

    for (var n = 1; n <= MAXNGRAM; n++) {
      nmStruct.tupleSets[n] = {};
      nmStruct.endTupleSets[n] = {};
    }

    for( const text of textList ){
      if (! text ) { continue; }
      let processedText = text
      .replace(/e\.g\./ig, " eg ")
      .replace(/i\.e\./ig, " ie ")
      .replace(/Part II?/g, "Part")
      .replace(/&[a-zA-Z]+;/g, ' ')
      ;
      const sentences = processedText.split('.');
      for( const sentence of sentences ){
        if( !sentence ) {continue;}
        let words = sentence.match(/\b([a-z]+(?:[\’\']\w+)?)\b/ig); // allow apostrophes to remain in words
        if( !words ) {continue;}
        // check if the words are capitalised when not the 1st word in a sentence
        words.slice(1).forEach( word => {
          if (word.match(/^[A-Z]/)) {
            nmStruct.capitalised[word.toLowerCase()] = word;
          }
        });
        // normalise all the words and unpack the tuples
        words = words.map(word => {return word.toLowerCase()});
        for (let w = 0; w < words.length; w++) {
          for (let n = 1; n <= MAXNGRAM; n++) {
            if (n <= (w+1)) {
              const tuple = words.slice(w+1-n, w+1); // slice from prev words to current word
              addTuple( nmStruct.tupleSets[n], tuple);
              if (w === words.length -1 ) { // i.e. a tuple ending on the last word
                addTuple( nmStruct.endTupleSets[n], tuple);
              }
            }
          }
        }
        addTuple(nmStruct.starts, [words[0]]);
        addTuple(nmStruct.ends,   [words[words.length - 1]]);
        // ['i','e','a', 'g'].forEach(word => {
        //   if (words[words.length - 1] == word) {
        //     console.log(`adding ends word: ${word}: sentence="${sentence}"`);
        //   }
        // });
      }
    }

    return nmStruct;
  }

  function addTuple(group, tuple){
    if (group == null) {
      throw `addTuple: group==null: tuple=${JSON.stringify(tuple)}`;
    }
    // console.log(`addTuple: ${tuple}`);
    if (! group.totalCount) {
      group.values     = [];
      group.counts     = [];
      group.next       = {};
      group.totalCount = 0;
    }

    const firstOfTuple   = tuple[0];
    const remainingTuple = tuple.slice(1);

    if (! group.values.includes(firstOfTuple) ) {
      group.values.push(firstOfTuple);
      group.counts.push(0);
    }

    const i = group.values.indexOf( firstOfTuple );
    group.counts[i] ++;
    group.totalCount ++;

    if (remainingTuple.length > 0) {
      if (! group.next[firstOfTuple] ) {
        group.next[firstOfTuple] = {};
      }
      addTuple(group.next[firstOfTuple], remainingTuple);
    }
  }


  function generate(nmStruct, numSentences, numWords, maxNG=MAXNGRAM){
    const sentences = [];

    for (var s = 0; s < numSentences; s++) {
      const sentence = generateSentence(nmStruct, numWords, maxNG)
      sentences.push(sentence);
    }

    return sentences;
  }

  function generateSentence( nmStruct, numWords, maxNG=MAXNGRAM ){
    maxNG = (MAXNGRAM < maxNG)? MAXNGRAM : maxNG;
    let words;

    for (var e = 0; e < REPEAT_TO_END_ON_ENDS_WORD; e++) { // repeat a few times if we don't end on a words in ends
      words = [];
      words.push(randomValueFromGroup(nmStruct.starts)); // start with a weighted random word from starts
      for (var w = 2; w <= numWords + DEFAULT_END_WITHIN; w++) {
        const ng = (w < maxNG)? w : maxNG;
        let word = null;

        const fnNextWordFromTupleSets = function( tupleSets ){
          let nextWord = null;
          for (var n = ng; n >= 1; n--) {
            if ((ng > 2) && (Math.random() < PROPORTION_SKIP_HIGHER_NGRAMS)) { continue; } // don't always use the higher ngram
            const tupleSoFar = words.slice(w - n, w - 1);
            nextWord = randomValueFromGroup( tupleSets[ng], tupleSoFar);
            if (nextWord !== null) { break; }
          }
          return nextWord;
        }

        if (w >= numWords - DEFAULT_END_WITHIN) { // since we are near the end of the sentence, look first for a near-end tuple
          word = fnNextWordFromTupleSets( nmStruct.endTupleSets );
        }
        if (word == null) {
          word = fnNextWordFromTupleSets( nmStruct.tupleSets );
        }

        let displayWord = nmStruct.capitalised.hasOwnProperty(word) ? nmStruct.capitalised[word] : word;
        words.push(displayWord);

        if ( (w >= (numWords - DEFAULT_END_WITHIN)) // if we are nearing the end of the sentence, be looking out for a word from ends
          && nmStruct.ends.values.includes(word) ) {
          break;
        }
      }

      if (nmStruct.ends.values.includes( words[words.length-1] )) { // if we did find a word from ends, great, otherwise keep looping
        break;
      }
    }

    // if (! nmStruct.ends.values.includes( words[words.length-1] )) {
    //   console.log(`not ending on ends word: ${word}`);
    // }

    return words;
  }

  function randomValueFromGroup(group, tupleSoFar=[]){
    if (group == null || group == undefined) {
      throw `randomValueFromGroup: group=${JSON.stringify(group)}: tupleSoFar=${JSON.stringify(tupleSoFar)}`;
    }

    let value = null;

    if( tupleSoFar.length == 0 ){
      const target = Math.floor(Math.random() * group.totalCount);

      let total = 0;
      for (var i = 0; i < group.values.length; i++) {
        value = group.values[i];
        total = total + group.counts[i];
        if (total > target) { break; }
      }
    } else if( group.values.includes(tupleSoFar[0]) ) {
      value = randomValueFromGroup( group.next[tupleSoFar[0]], tupleSoFar.slice(1));
    }

    return value;
  }

  function buildFromListField(list, fieldname){
    const texts = list.map(item => { if(item) { return item[fieldname]}});
    return build(texts);
  }

  return {
		 buildFromTextList: build,
    buildFromListField: buildFromListField,
		          generate: generate
	};
})();

  // const url = 'http://stories.upthebuzzard.com/search.json';
  //
  // fetch( url )
  // .then( response => { return response.json() } )
  // .then( json => {
  // let built     = NMGenerator.buildFromListField(json, 'content');
  // let generated = NMGenerator.generate(built);
  // console.log('buildFromListField:');
  // generated.forEach(sentence => {
  //   console.log(sentence.join(' '));
  // });
  // })
  // .catch(err => {
	//    console.log(`ERROR: whilst using fetch: ${err}`);
  // })
  // ;

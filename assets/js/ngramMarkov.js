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
    }

    for( const text of textList ){
      if (! text ) { continue; }
      let processedText = text
      .replace(/e\.g\./ig, "eg")
      .replace(/i\.e\./ig, "ie")
      .replace(/Part II?/g, "Part")
      ;
      const sentences = processedText.split('.');
      for( const sentence of sentences ){
        if( !sentence ) {continue;}
        let words = sentence.match(/\b(\w+(?:[\’\']\w+)?)\b/g); // allow apostrophes to remain in words
        if( !words ) {continue;}
        words = words.map(word => {return word.toLowerCase()});
        for (let w = 0; w < words.length; w++) {
          for (let n = 1; n <= MAXNGRAM; n++) {
            if (n <= (w+1)) {
              const tuple = words.slice(w+1-n, w+1); // slice from prev words to current word
              addTuple( nmStruct.tupleSets[n], tuple);
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
        // start with higher ngram, loop over smaller ngram if returned word is null
        for (var n = ng; n >= 1; n--) {
          if ((ng > 2) && (Math.random() < PROPORTION_SKIP_HIGHER_NGRAMS)) { continue; } // don't always use the higher ngram
          const tupleSoFar = words.slice(w - n, w - 1);
          word = randomValueFromGroup( nmStruct.tupleSets[ng], tupleSoFar);
          if (word !== null) { break; }
        }

        words.push(word);

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

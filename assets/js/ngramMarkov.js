var NMGenerator = (function() {

  const MAXNGRAM = 3; // 1 => single words, 2 => pairs of words, 3 => triples of words, etc
  const DEFAULT_NUM_SENTENCES = 5;
  const DEFAULT_SENTENCE_LENGTH = 7;

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
      const sentences = text.split('.');
      for( const sentence of sentences ){
        const words = sentence.match(/\b(\w+)\b/g);
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
      }
    }

    return nmStruct;
  }

  function addTuple(group, tuple){
    console.log(`addTuple: ${tuple}`);
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


  function generate(nmStruct, numSentences=DEFAULT_NUM_SENTENCES){
    const sentences = [];

    for (var s = 0; s < numSentences; s++) {
      const sentence = generateSentence(nmStruct)
      sentences.push(sentence);
    }

    return sentences;
  }

  function generateSentence( nmStruct, numWords=DEFAULT_SENTENCE_LENGTH ){
    const words = [];

    words.push(randomValueFromGroup(nmStruct.starts));

    for (var w = 2; w <= numWords; w++) {
      const ng = (w < MAXNGRAM)? w : MAXNGRAM;
      let word = null;
      // loop over smaller tuples if returned word is null
      for (var n = ng; n >= 1; n--) {
        const tupleSoFar = words.slice(w - n, w - 1);
        word = randomValueFromGroup( nmStruct.tupleSets[ng], tupleSoFar);
        if (word !== null) { break; }
      }
      words.push(word);
    }

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

  return {
		build:    build,
		generate: generate
	};
})();

var test = NMGenerator.build(['a big apple fell', 'to the cold forest floor quietly']);

console.log(`test: ${JSON.stringify(test, null, 2)}`);

var gen = NMGenerator.generate(test);

console.log(`gen: ${JSON.stringify(gen, null, 2)}`);

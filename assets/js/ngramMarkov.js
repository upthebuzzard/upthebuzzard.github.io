var NMGenerator = (function() {

  const MAXNGRAM = 3; // 1 => single words, 2 => pairs of words, 3 => triples of words, etc

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


  function generate(){}

  return {
		build:    build,
		generate: generate
	};
})();

var test = NMGenerator.build(['a big apple fell', 'to the cold forest floor quietly']);

console.log(`test: ${JSON.stringify(test, null, 2)}`);

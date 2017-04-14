document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
  const url = 'search.json';

  function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  fetch( url )
  .then( response => { return response.json() } )
  .catch(err => {
    console.log(`ERROR: whilst using fetch: ${err}`);
  })
  .then( json => {
    {
      let ngrams = NMGenerator.buildFromListField(json, 'title');
      let generatedContent = NMGenerator.generate(ngrams, 1, 10, 2);

      let text = generatedContent.map(sentence => {
        return capitalizeFirstLetter( sentence.join(' ').concat('.'));
      }).join(' ');

      const elt = document.getElementById('auto-title');
      elt.innerHTML = text;
    }
    {
      let ngrams = NMGenerator.buildFromListField(json, 'content');
      let generatedContent = NMGenerator.generate(ngrams, 20, 20);

      let text = generatedContent.map(sentence => {
        return capitalizeFirstLetter( sentence.join(' ').concat('.'));
      }).join(' ');

      const elt = document.getElementById('auto-content');
      elt.innerHTML = text;
    }
  })
  .catch(err => {
    console.log(`ERROR: whilst parsing json: ${err}`);
  })
  ;

});

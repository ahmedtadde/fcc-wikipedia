let input = document.getElementById('search-input');

input.onmouseover = () => {
  document.getElementById('search-icon-container').style.color = 'black';
}

input.onmouseout = () => {
  document.getElementById('search-icon-container').style.color = 'grey';
}


input.onkeypress = (e) => {
  let keyCode = (e.keyCode ? e.keyCode : e.which);
  let text = e.target.value;
  // console.log(keyCode);
  // console.log(text);

  if (keyCode === 13){
    if (text.length >= 3){
      document.getElementById('results').innerHTML = '';
      fetchResults(text);
    }else{
      document.getElementById('results').innerHTML = `
      <h1>You must enter a search term with at least 3 letters.</h1>`;
    }
  }
};

let submitBtn = document.getElementById('submit-btn');
submitBtn.onclick = () => {
  if(input.value.length >= 3){
    document.getElementById('results').innerHTML = '';
    fetchResults(input.value);
  }else{
    document.getElementById('results').innerHTML = `
    <h1>You must enter a search term with at least 3 letters.</h1>`;
  }
};


function fetchResults(userInput){
  let url =`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=${userInput}`;
  let proxy = 'https://cors-anywhere.herokuapp.com/'
  fetch(proxy+url, {
    headers: new Headers({
        'Api-User-Agent': 'ahmedtadde-fcc-wikipedia-viewer; contact.metronlabs@gmail.com'
      })
  }).then( function ( response ) {
      if ( response.ok ) {
          return response.json();
      }
      throw new Error( 'Network response was not ok: ' + response.statusText );
  }).then( function ( json ) {
      // do something with data
      console.log(json.query.search);
      let data = json.query.search;
      let html = data.map((result) => {
        return `
        <div class="card">
          <div class="card-title">
            <a href="https://en.wikipedia.org/wiki/${result.title}" target="_blank">
              ${result.title}
            </a>
          </div>
          <div class="card-link">
            <a href="https://en.wikipedia.org/wiki/${result.title}" target="_blank">
              https://en.wikipedia.org/wiki/${result.title}
            </a>
          </div>
          <div class="card-content">
              ${result.snippet}...
          </div>
        </div>`;
      });

      return html.join('\n');
  }).then(function (html) {
    document.getElementById('results').innerHTML = html;
  });
}

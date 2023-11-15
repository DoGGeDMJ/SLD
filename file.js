function search(event) {
  if (event && event.keyCode !== 13) {
    return;
  }
  var searchInput = document.getElementById("searchInput");
  var searchTerm = searchInput.value.toLowerCase();
  var searchResults = document.getElementById("searchResults");
  if (searchTerm === '') {
    searchResults.innerText = "Type the word for searching";
    return;
  }
  
  searchInput.value = "";
  
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var dictionary = xhr.responseText.split('\n');
      var matches = [];
      
      for (var i = 0; i < dictionary.length; i++) {
        var entry = dictionary[i].toLowerCase();
        if (entry.includes(searchTerm)) {
          matches.push(dictionary[i]);
        }
      }
      
      if (matches.length > 0) {
        searchResults.innerHTML = ''
        matches.forEach(match => {
          var p = document.createElement('p');
          p.textContent = match;
          var button = document.createElement('button2');
          button.textContent = 'Add';
          button.onclick = function() {
            document.getElementById('editList').value += match + '\n';
          }
          p.appendChild(button);
          searchResults.appendChild(p);
        });
      } else {
        searchResults.innerText = "Not found";
      }
    }
  };
  
  xhr.open("GET", "dictionary.txt", true);
  xhr.send();
}

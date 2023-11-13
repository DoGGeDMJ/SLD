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
          searchResults.innerText = matches.join('\n');
        } else {
          searchResults.innerText = "Not found";
        }
      }
    };
  
    xhr.open("GET", "dictionary.txt", true);
    xhr.send();
  }
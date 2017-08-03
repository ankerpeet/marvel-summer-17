function MarvelService() {
  var apiKey = "apikey=00c9fc98d39faf085d72d1bae9352d29";
  var baseUrl = "https://gateway.marvel.com:443/v1/public/characters?";

  var marvelResults = []
  var myRoster = []

  this.search = function (query, cb) {
    var searchTerm = query;
    var arr = query.split("")
    for(var i = 0; i < arr.length; i++){
      if(arr[i] == " "){
        arr[i] = "_";
      }
    }
    if(searchTerm){
    searchTerm = "name=" + query + "&";
  } else searchTerm = query;

    $.get(baseUrl + searchTerm + apiKey).then(function (res) {
      marvelResults = res.data.results
      cb(res.data.results)
    })
  }

  //Add to roster
  this.addCharacter = function (id) {
    if(myRoster.length < 6){
    var character = marvelResults.find(char => char.id == id)
    if (myRoster.indexOf(character) == -1) {
      myRoster.push(character)
    }
  }
  }

  //Remove from roster
  this.removeCharacter = function (id) {
    var character = marvelResults.find(char => char.id == id);
    var num = myRoster.indexOf(character);
    if (num != -1) {
      myRoster.splice(num, 1);
    }
  }

  this.getRoster = function () {
    return JSON.parse(JSON.stringify(myRoster))
  }

}
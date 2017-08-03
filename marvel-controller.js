function MarvelController() {
  var service = new MarvelService();

  function drawMarvel(arr) {
    var template = ''

    for (var i = 0; i < arr.length; i++) {
      var character = arr[i];
      template +=
        `
      <div class="col-xs-12 col-sm-6 col-md-4 ${character.id} outer">
        <div class="box">
          <h3>${character.name}</h3>
            <div> 
              <img class="img-responsive char-icon center-block" src=${character.thumbnail.path + "." + character.thumbnail.extension} alt=${character.name}>
            <div>
              <button class="btn btn-default" onclick="app.controllers.marvelController.addCharacter(${character.id})">Add</button>
            </div>
          </div>
        </div>
      </div>
      `
    }
    document.getElementById('search-results').innerHTML = template
  }

  drawRoster = function () {
    //TODO: DRAW ROSTER
    var roster = service.getRoster()
    var template = ''

    roster.forEach(char => {
      template +=
        `
      <div class="box ${char.id}">
      <img class="img-responsive char-icon center-block" src=${char.thumbnail.path + "." + char.thumbnail.extension} alt=${char.name}>
        <h3>${char.name}</h3>
        <div>
          <button class="btn" onclick="app.controllers.marvelController.removeCharacter(${char.id})">Remove</button>
        </div>
      </div>
      `
    })

    document.getElementById('my-roster').innerHTML = template

  }

  this.addCharacter = function (id) {
    $("div").remove("." + id)
    service.addCharacter(id)
    drawRoster()

  }
  this.removeCharacter = function (id) {
    service.removeCharacter(id)
    drawRoster()
  }

  // Search function
  this.search = function (query) {
    query.preventDefault();
    var searchTerm = query.target.search.value;
    service.search(searchTerm, drawMarvel);
  }
  service.search("", drawMarvel);
}

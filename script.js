(function(window){

        function FxSoccerModule() {

          this.loadPlayers = function() {

            return JSON.parse(localStorage.getItem('players'));

          }

          this.savePlayer = function(player) {

            return localStorage.setItem('players', JSON.stringify(player));

          }

          this.removePlayer = function() {

          }

          this.sortTeam = function() {
            var players = JSON.parse(localStorage.getItem('players'));

            var gold = [];
            var silver = [];
            var wood = [];

            jQuery.each(players, function(key, player) {
              if (player.category == 'Gold') {
                gold.push(player);
              } else if (player.category == 'Silver') {
                silver.push(player);
              } else if (player.category == 'Wood') {
                wood.push(player);
              }
            });
            
            gold = shuffle(gold);
            silver = shuffle(silver);
            wood = shuffle(wood);

            var sortedList = [];
            sortedList.push.apply(sortedList, gold);
            sortedList.push.apply(sortedList, silver);
            sortedList.push.apply(sortedList, wood);

            var blueTeam = [];
            var redTeam = [];
            var bench = [];

            while (sortedList.length > 10) {
              var item = sortedList[Math.floor(Math.random() * sortedList.length)];
              bench.push(item);
              sortedList.splice(sortedList.indexOf(item), 1);
            }

            for (i = 0; i < 10; i++) {
                if (i % 2 == 0) {
                  blueTeam.push(sortedList[i]);
                } else {
                  redTeam.push(sortedList[i]);
                } 
            }
          }

          function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            while (0 !== currentIndex) {

              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;

              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }

            return array;
          }

        }

      window.FxSoccerModule = FxSoccerModule;

})(window);

$(document).ready(function(){
  var $frmPlayer = $('#frm-player'),
      $tbPlayerList = $('#tb-player-list tbody'),
      $tbTeams = $('#tb-teams tbody'),
      $btnSort = $('#btn-sort'),
      $btnSave = $('#btn-save'),
      $txtPlayerName = $('#txt-player-name'),
      $cboCategory = $('#cbo-category');

  var fxSoccerModule = new FxSoccerModule();

  var players = fxSoccerModule.loadPlayers() || [];

  loadPlayers(players);

  $btnSort.click(function(evt) {
    evt.preventDefault();

    fxSoccerModule.sortTeam();
  });

  $frmPlayer.submit(function(evt){
     evt.preventDefault();

     var player = {  name:$txtPlayerName.val(),
                     category: $cboCategory.val()}

     players.push(player);

     fxSoccerModule.savePlayer(players);

     loadPlayers(players);
  });


  function loadPlayers(players) {
      $tbPlayerList.html('');

      $.each(players, function(i, player){
          $tbPlayerList.append($('<tr>').append($('<td>').html(player.name))
                                        .append($('<td>').html(player.category)));
      });
  }
});

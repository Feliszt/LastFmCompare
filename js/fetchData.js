// api
var apiKey = '&api_key=' + myOwnKey;
var apiGetTopArtists = 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=';
var apiFormat = '&format=json';

// data variables
var numArtists = 10;


function callApi() {
  for(var i = 1; i <= 2; i++) {
    (function(i) { // protects i in an immediately called function
      // fetch user name and form url
      var userNameId = 'userName' + String(i);
      var userName = document.getElementById(userNameId).value;
      var url = apiGetTopArtists + userName + apiKey + apiFormat;

      // fetch section
      var userSection = '#top-artists' + String(i);
      var userTableId = '#top-artists-table' + String(i);
      $(userTableId + " tbody tr").remove();

      // call top artists using jQuery
      $.getJSON( url, function( json ) {
        // get user info
        //$(userSection + " div").append('<p>' + userName + '</p>');

        $(json.topartists.artist).each(function(index, Element) {
          // populate table
          var indexForHumans = index + 1;
          var items = '';
          items += '<tr>';
          items += '<td class="chartlist-index">' + indexForHumans + '</td>';
          items += '<td class="chartlist-avatar"><img src=' + Element.image[0]['#text'] + ' alt="' + Element.name + '" class="avatar"></td>';
          items += '<td class="chartlist-name">' + Element.name + '</td>';
          items += '<td class="chartlist-scrobbles">' + Element.playcount + '</td>';
          items += '</tr>';

          // apend to HTML element
          $(userTableId).append(items);

          // stop after numArtists
          return(index < numArtists-1);
        });
      });
    })(i);
  }
}

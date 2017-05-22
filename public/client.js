//Use input from user and display external API results in webpage, can use console.log for now
"use strict"

$("#search").submit(function (event) {
    event.preventDefault();
    var userSearch = $("#searchField").val();
    getSearchResults(userSearch);
});

//Use input from user and display external API results in webpage, can use console.log for now
"use strict"

$("#search").submit(function (event) {
    event.preventDefault();
    var userSearch = $("#searchField").val();
    getSearchResults(userSearch);
    console.log(hello);
});

/*function getSearchResults(userSearch) {
    $.getJSON("http://api.amp.active.com/v2/search", {
            key: w553zbm5zvemxhkn22nfzhhc,
            url: "/activity/"

        }
    }
*/

function displayResults(hikingResults) {
    var createHtmlList = "";

}

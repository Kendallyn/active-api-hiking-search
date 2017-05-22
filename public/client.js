//Use input from user and display external API results in webpage, can use console.log for now
"use strict"

//User types in search with city/state in searchfield
$("#search").submit(function (event) {
    event.preventDefault();
    var userSearch = $("#searchField").val();
    getSearchResults(userSearch);
    console.log(hello);
});

//Results of search get returned from API
function getSearchResults(userSearch) {
    $.getJSON("http://api.amp.active.com/v2/search", {
        key: w553zbm5zvemxhkn22nfzhhc,
        url: "/activity/:location",
    });
}


//Display the results in HTML
function displayResults(hikingArray) {
    var createHtmlList = "";
    $.each(hikingArray, function (hikingArrayKey, hikingArrayValue) {
        createHtmlList += "<li>";
        createHtmlList +=
            createHtmlList +=
            createHtmlList += "</li>";
    });
}

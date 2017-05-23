//Use input from user and display external API results in webpage
"use strict"

//User types in search with city/state in searchfield
$("#search").submit(function (event) {
    event.preventDefault();
    var userSearch = $("#searchField").val();
    getSearchResults(userSearch);
    console.log("hello");
});

//Results of search get returned from API
function getSearchResults(userEntry) {
    $.getJSON("http://api.amp.active.com/v2/search", {
        //??Console showing forbidden for this
        key: "w553zbm5zvemxhkn22nfzhhc",
        url: "/activity/:location",
    });
}


//Display the results in HTML (GET)
function getHikingResults(userSearch) {
    //??how to test API by consolelog to get key/values
    $.ajax({
        type: "GET",
        //?url: "my page's url",
        dataType: 'json',
    });

    function displayHikingResults() {
        var createHtmlList = "";
        $.each(hikingArray, function (hikingArrayKey, hikingArrayValue) {
            //??specify the results li & not the favorites li
            createHtmlList += "<li id="
            searchResults ">;
            createHtmlList +=
                createHtmlList +=
                createHtmlList += "</li>";
        });
    }

    //Add a result to favorite section (POST)




    //Delete a result from favorite section (DELETE)


    //?Don't have a POST for CRUD project requirements?

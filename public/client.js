//Use input from user and display external API results in webpage
"use strict"

//User types in search with city/state in searchfield
$("#search").submit(function (event) {
    event.preventDefault();
    var userSearch = $("#searchField").val();

    if (userSearch === "") {
        alert("Sorry that search did not yeild any results. Please enter a city and state and try your search again.");
    } else {
        getSearchResults(userSearch);
    }


});

//Results of search get returned from API
function getSearchResults(location) {
    console.log(location);
    $.ajax({
            type: "GET",
            url: "/activity/" + location,
            dataType: 'json',
        })
        .done(function (dataOutput) {
            console.log(dataOutput);
            displayActiveSearchData(dataOutput.results);
            // displayActiveActivityResults(JSON.parse(resultsForJsonParse));
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}



//get the results from API (GET)


//Display the results in HTML form

function displayActiveSearchData(dataMatches) {
    //create an empty variable to store one LI for each of the results
    var buildTheHtmlOutput = "";
    $.each(dataMatches, function (dataMatchesKey, dataMatchesValue) {
        //create and populate one LI for each of the results ( "+=" means concatenate to the previous one)

        console.log(dataMatchesValue.activityStartDate);
        var utcDate = dataMatchesValue.activityStartDate; // ISO-8601 formatted date returned from server

        buildTheHtmlOutput += '<li>';

        buildTheHtmlOutput += '<div class="event-description">';

        var linkUrl = dataMatchesValue.registrationUrlAdr;
        if (linkUrl === undefined) {
            buildTheHtmlOutput += '<h2><a target="_blank" href="www.active.com"' + dataMatchesValue.assetName + '</a></h2>';
        } else {
            buildTheHtmlOutput += '<h2><a target="_blank" href="' + dataMatchesValue.registrationUrlAdr + '" >' + dataMatchesValue.assetName + '</a></h2>';
        }

        var showDistance = dataMatchesValue.assetAttributes[0];
        if (showDistance === undefined) {
            buildTheHtmlOutput += "";
        } else {
            buildTheHtmlOutput += '<p>' + dataMatchesValue.assetAttributes[0].attribute.attributeValue + '</p>';
        }

        buildTheHtmlOutput += '<p>' + dataMatchesValue.place.cityName + '</p>';

        buildTheHtmlOutput += '<p>' + new Date(utcDate) + '</p>';

        var showDescription = dataMatchesValue.assetDescriptions[0];
        if (showDescription === undefined) {
            buildTheHtmlOutput += "";
        } else {
            buildTheHtmlOutput += "<div class='auto-populated-description'>" + dataMatchesValue.assetDescriptions[0].description + "</div>";
        }

        buildTheHtmlOutput += '</div>';
        buildTheHtmlOutput += '<form class="addToFavorites">';
        buildTheHtmlOutput += "<input type='hidden' class='addToFavoritesValue' value='" + dataMatchesValue.assetName + "'>";
        buildTheHtmlOutput += "<input type='hidden' class='addToFavoritesDateValue' value='" + new Date(utcDate) + "'>";
        buildTheHtmlOutput += "<input type='hidden' class='addToFavoritesPlaceValue' value='" + dataMatchesValue.place.cityName + "'>";
        buildTheHtmlOutput += "<input type='hidden' class='addToFavoritesUrlValue' value='" + dataMatchesValue.registrationUrlAdr + "'>";
        buildTheHtmlOutput += '<button type="submit" class="addToFavoritesButton">';
        buildTheHtmlOutput += '<input type="image" src="img/hikingbutton-transparency.png" alt="Submit" class="addToFavs">';
        buildTheHtmlOutput += '</button>';
        buildTheHtmlOutput += '</form>';

        buildTheHtmlOutput += '</li>';
    });

    //use the HTML output to show it in the index.html
    $("#searchResults ul").html(buildTheHtmlOutput);
}
//Add a result to favorite section (POST)




//Delete a result from favorite section (DELETE)


//?Don't have a POST for CRUD project requirements?

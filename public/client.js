//Use input from user and display external API results in webpage
"use strict"

//User types in search with city/state in searchfield
$("#search").submit(function (event) {
    event.preventDefault();
    var userSearch = $("#searchField").val();

    if (userSearch === "") {
        alert("Sorry that search did not yield any results. Please enter a city and state and try your search again.");
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
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}


//Display the results in HTML form

function displayActiveSearchData(dataMatches) {
    var buildTheHtmlOutput = "";
    $.each(dataMatches, function (dataMatchesKey, dataMatchesValue) {

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

        buildTheHtmlOutput += '<p>' + dataMatchesValue.place.cityName + ', ' + dataMatchesValue.place.stateProvinceCode + '</p>';

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
        buildTheHtmlOutput += "<input type='hidden' class='addToFavoritesPlaceValue' value='" + dataMatchesValue.place.cityName + ", " + dataMatchesValue.place.stateProvinceCode + "'>";
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

//populate favorites container
function populateFavoritesContainer() {

    $.ajax({
            type: "GET",
            url: "/populate-favorites/",
            dataType: 'json',
        })
        .done(function (dataOutput) {
            console.log(dataOutput);
            //If successful, set some globals instead of using result object
            if (dataOutput.length != 0) {
                var buildTheHtmlOutput = '<div class="pinnedTitle"> <img src="img/hikingbutton-transparency.png"> <h3>Pinned Hiking Trails</h3>  </div>';
                $.each(dataOutput, function (dataOutputKey, dataOutputValue) {
                    buildTheHtmlOutput += "<li class = 'pinned'>";
                    buildTheHtmlOutput += "<div class = 'delete-favorites-container' > ";
                    buildTheHtmlOutput += "<form class = 'deleteFavoriteValue' > ";
                    buildTheHtmlOutput += "<input type='hidden' class='deleteFavoriteValueInput' value='" + dataOutputValue._id + "'>";
                    buildTheHtmlOutput += "<button type = 'submit' class = 'deleteFavoriteButton'>";
                    buildTheHtmlOutput += "<i class = 'fa fa-minus-circle' aria - hidden = 'true'></i>";
                    buildTheHtmlOutput += "</button>";
                    buildTheHtmlOutput += "</form>";
                    buildTheHtmlOutput += "</div>";
                    buildTheHtmlOutput += '<h4><a target="_blank" href="' + dataOutputValue.url + '" >' + dataOutputValue.name + '</a></h4>';
                    var showCity = dataOutputValue.place;
                    if (showCity === undefined) {
                        buildTheHtmlOutput += "";
                    } else {
                        buildTheHtmlOutput += '<p>' + dataOutputValue.place + '</p>';
                    }
                    buildTheHtmlOutput += '<p>' + dataOutputValue.date + '</p>';
                    buildTheHtmlOutput += "</li>";
                });

                $(".savedHikes").html(buildTheHtmlOutput);
            }
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}


$(function () {
    populateFavoritesContainer();

});

// add activity to favorites section
$(document).on('click', '#searchResults .addToFavoritesButton', function (event) {
    event.preventDefault();

    //highlight the icon to show it has been added to favorites
    $(this).toggleClass("highlight");
    var favoritesValue = $(this).parent().find('.addToFavoritesValue').val();
    var favoritesDateValue = $(this).parent().find('.addToFavoritesDateValue').val();
    var favoritesPlaceValue = $(this).parent().find('.addToFavoritesPlaceValue').val();
    var favoritesUrlValue = $(this).parent().find('.addToFavoritesUrlValue').val();

    var nameObject = {
        'name': favoritesValue,
        'date': favoritesDateValue,
        'place': favoritesPlaceValue,
        'url': favoritesUrlValue
    };

    $.ajax({
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(nameObject),
            url: '/add-to-favorites/',
        })
        .done(function (result) {

            populateFavoritesContainer();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});

//Delete a result from favorite section (DELETE)

$(document).on('click', '.deleteFavoriteButton', function (event) {
    event.preventDefault();
    //get the value from the input box
    var favoritesIdToDelete = $(this).parent().find('.deleteFavoriteValueInput').val();
    var nameObject = {
        'name': favoritesIdToDelete
    };

    $.ajax({
            method: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',
            url: '/delete-favorites/' + favoritesIdToDelete,
        })
        .done(function (result) {
            populateFavoritesContainer();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

    //if last one, empty the div
    $(".deleteFavoriteButton").click(function () {
        $(".savedHikes").empty();
    });
});

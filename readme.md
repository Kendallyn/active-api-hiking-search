# Active.com Running Events Finder
Thinkful (https://www.thinkful.com) Unit 2 Capstone Project - Node.js app integrating with *Active.com*'s API

![home page with results](https://brandylavoy.github.io/node-capstone-find-and-register-for-events/git_hub_images/home-page-with-results.png)


![home page with favorites](https://brandylavoy.github.io/node-capstone-find-and-register-for-events/git_hub_images/home-page-with-favorites.png)


## Background

I built this app because I am a runner and I am frequently looking for races in my area.

## Use Case

This app gives runners access to running events within a 50 mile radius from a chosen city in the US.

## Initial UX

The initial mobile and desktop wireframes can be seen below:

![Initial Wireframes](https://brandylavoy.github.io/node-capstone-find-and-register-for-events/git_hub_images/wireframe.JPG)

## Working Prototype

You can access a working prototype of the app here: https://active-api-hiking-search.herokuapp.com/

## Functionality
The app's functionality includes:

* Search for running events in a 50 mile radius from a chosen US city.
* Return 24 results.
* Results provide the event name, location, race distance, date, and a discription (if available).
* The results are in ascending order by date.
* Add chosen results to a favorites section.
* Delete events from favorites section.
* Link to registration page from the results section, or the favorites section.

## Technical

The app is built with HTML, CSS, JavaScript, jQuery and Node.js. It uses AJAX JSON calls to the *Active.com* Open Platform API to return the serach results. All data is held in an mLab database during the user's session. It has been built to be fully responsive across mobile, tablet and desktop screen resolutions.

## Development Roadmap

This is v1.0 of the app, but future enhancements are expected to include:

* The ability to increase, or decrease the search radius.
* The ability to select the race distance in the search options.
* The ability to set date ranges for the search.
* Multiple pages of results.
* A training component to give runners a training plan to get them ready for the event.
* A calendar to keep track of the running events that the user is registered for, and the training schedule.
* Links to current articles on running, running events, injury prevention, race reviews.
* The functionality to write reviews on races that the user has participated in.
* Suggested running routes nearby.
* Videos on workouts to improve running fitness.
* Mobile app to include an interval timer and workout music controls.

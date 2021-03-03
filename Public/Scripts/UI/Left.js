// -----JS CODE-----

global.left = false;

script.createEvent("TapEvent").bind(function(eventData) {
    global.left = true;
});
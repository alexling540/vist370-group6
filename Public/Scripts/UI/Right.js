// -----JS CODE-----

global.right = false;

script.createEvent("TapEvent").bind(function(eventData) {
    global.right = true;
});
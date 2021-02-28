// -----JS CODE-----

global.left = false;

var event = script.createEvent("TapEvent");
event.bind(function(eventData) {
    global.left = true;
});
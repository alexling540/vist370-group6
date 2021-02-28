// -----JS CODE-----

global.right = false;

var event = script.createEvent("TapEvent");
event.bind(function(eventData) {
    global.right = true;
});
// -----JS CODE-----

global.confirm = false;

script.createEvent("TapEvent").bind(function(eventData) {
    if (!global.tweening) {
        global.confirm = true;
    }
});

// -----JS CODE-----

global.confirm = false;

var event = script.createEvent("TapEvent");
event.bind(function(eventData)
{
    if (!global.tweening)
    {
        global.confirm = true;
    }
});

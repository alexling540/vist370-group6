// -----JS CODE-----

// @input Component.MaterialMeshVisual infoCard
// @input int num

var tapEvent = script.createEvent("TapEvent");
tapEvent.bind(function(eventData) {
    print(eventData.getTapPosition());
    if (!global.isEditing && !global.isOpen) {
        global.openInfoCard(script.num);
        print('im clicked');
    }
});

script.createEvent("UpdateEvent").bind(function(eventData) {
   if (global.isEditing || global.isOpen) {
        tapEvent.enabled = false;
   } else {
        tapEvent.enabled = true;
    }
});
// -----JS CODE-----

// @input Component.MaterialMeshVisual infoCard
// @input int num

script.createEvent("TapEvent").bind(function(eventData) {
    if (!global.isEditing && !global.isOpen) {
        global.openInfoCard(script.num);
        print('im clicked');
    }
});
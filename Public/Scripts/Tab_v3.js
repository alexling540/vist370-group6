// -----JS CODE-----

// @input Component.MaterialMeshVisual[] infoCards

var currentlyOpen = null;

var turnOnEvent = script.createEvent("TurnOnEvent");
turnOnEvent.bind(function() {
    currentlyOpen = null;
});

var updateEvent = script.createEvent("UpdateEvent");
function watchOpen(eventData) {  
    
    if (currentlyOpen == null && global.openInfo != null) { // nothing is open, and something opened
        global.openInfo.enabled = true;
        
        var texture = global.openInfo.getMaterial(0).getPass(0).baseTex;
        var control = texture.control;
        
        control.play(1, 0);
        control.setOnFinish(function(animatedTexture) {
           animatedTexture.isReversed = true;
           animatedTexture.pauseAtFrame(0);
        });
        
        currentlyOpen = global.openInfo;
        
    } else if (currentlyOpen != null && global.openInfo == null) { // something is open, and it closed
        var texture = currentlyOpen.getMaterial(0).getPass(0).baseTex;
        var control = texture.control;
        
        control.play(1, 0); 
        control.setOnFinish(function(animatedTexture) {
            animatedTexture.isReversed = false;
            currentlyOpen.enabled = false;
        });
        
        currentlyOpen = null;
    }
}
updateEvent.bind(watchOpen);
// -----JS CODE-----

//@input Component.BaseMeshVisual touchTarget {"label": "Touch Target"}
//@input Asset.Texture animateImageAnimatedTexture {"label": "Animated Texture"}
//@input Component.MaterialMeshVisual animateImageVisualObject {"label": "Visual Object"}


// DO NOT NEED animateImageAnimatedTexture

var open = false;

function onLensTurnOnEvent() {
    open = false;
    script.animateImageVisualObject.enabled = false;
}

function ffff(animatedTexture) {
    print("before: " + open);
    open = !open;
    print("after: " + open);
    animatedTexture.isReversed = open;
    if (!open) {
        script.animateImageVisualObject.enabled = false;
    } else {
        animatedTexture.pauseAtFrame(0);
    }
}

function onTap(eventData) {
    if (global.scene.getCameraType() == "back") {
        
        //if (!global.isEditing) {
            var tex = script.animateImageVisualObject.getMaterial(0).getPass(0).baseTex;
            var control = tex.control;
            
            if (!open) {
                script.animateImageVisualObject.enabled = true;
            }
            control.play(1, 0); 
            control.setOnFinish(ffff);
        //}
    }
}

var turnOnEvent = script.createEvent("TurnOnEvent");
turnOnEvent.bind(onLensTurnOnEvent);

var tapEvent = script.createEvent("TapEvent");
tapEvent.bind(onTap);

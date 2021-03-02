// -----JS CODE-----

var touchTarget;
var imageObj;
var open = false;

script.api.setTouchTarget = function(_touchTarget) {
    touchTarget = _touchTarget;
}

script.api.setImageObject = function(_imageObj) {
    imageObj = _imageObj;
}

function animationFinish(animatedTexture) {
    open = !open;
    animatedTexture.isReversed = open;
    if (!open) {
        imageObj.enabled = false;
    } else {
        animatedTexture.pauseAtFrame(0);
    }
}

script.api.onTap = function(eventData) {
    if (global.scene.getCameraType() == "back") {
        if (!global.isEditing) {
            var tex = imageObj.getMaterial(0).getPass(0).baseTex;
            var control = tex.control;
            
            if (!open) {
                imageObj.enabled = true;
            }
            control.play(1, 0); 
            control.setOnFinish(animationFinish);
        }
    }
}


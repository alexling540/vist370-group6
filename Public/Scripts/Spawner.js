// -----JS CODE-----
// @input SceneObject[] objectPreview
// @input Component.Camera mainCamera
// @input bool advanced = false;
// @input SceneObject tween {"showIf":"advanced"}
// @input SceneObject base {"showIf":"advanced"}
// @input SceneObject scene {"showIf":"advanced"}

global.tweening = false;
var currentTreeIndex = 0;
var currentTreeGrowing;
var currentTransform;
var currentScale = new vec3(0,0,0);
var oldScale;
var tweenValue;

script.createEvent("TurnOnEvent").bind(function (eventData) {
    // Allows for fullscreen touch input
    global.touchSystem.touchBlocking = true;
   
    // Disable all but the first object in the array
    for (var i = 1; i < script.objectPreview.length; i++) {
        script.objectPreview[i].enabled = false;
    }
});

script.createEvent("UpdateEvent").bind(function (eventData) {
    // Check for button presses
    if (global.left) {
        decreaseTreeIndex();
        global.left = false;
    }
    if (global.right) {
        increaseTreeIndex();
        global.right = false;
    }
    if (global.confirm) {
        growSelected();
        global.confirm = false;
    }
    // If Tween Value is running
    if (global.tweening) {
        tweenValue = global.tweenManager.getGenericTweenValue(script.tween, "grow");
        currentScale = oldScale.uniformScale(tweenValue);
        currentTransform.setLocalScale(currentScale);
    }
});

function growSelected() {
    if (!global.tweening) {
        global.tweening = true;
        script.objectPreview[currentTreeIndex].enabled = false;  
        
        var editSceneTransform = script.base.getTransform();
        var editSceneTransformations = {
            "position": editSceneTransform.getWorldPosition(),
            "rotation": editSceneTransform.getWorldRotation(),
            "scale": editSceneTransform.getWorldScale()
        };
      
        var newObj = script.scene.copyWholeHierarchy(script.objectPreview[currentTreeIndex]);
        var newObjModel = newObj.getChild(0);

        for (var i = 0; i < newObjModel.getChildrenCount(); i++) {
            var material = newObjModel.getChild(i).getComponent('Component.RenderMeshVisual').mainMaterial.clone();
            material.mainPass.blendMode = 6;
            newObjModel.getChild(i).getComponent('Component.RenderMeshVisual').mainMaterial = material;
        }
        
        newObj.enabled = true;
        
        currentTransform = newObjModel.getTransform();
        oldScale = currentTransform.getWorldScale();
        currentTransform.setLocalScale(currentScale);        
        
        print("----------------------");
        print("spawned")
        print("    scene: " + script.scene.getChildrenCount());
        print("    obj:   " + newObj.getChildrenCount());
        print("----------------------");

        print("obj xyz: " + currentTransform.getWorldPosition());
        
        var newObjTransform = newObj.getTransform();
        newObjTransform.setWorldPosition(editSceneTransformations.position);
        newObjTransform.setWorldRotation(editSceneTransformations.rotation);
        newObjTransform.setWorldScale(editSceneTransformations.scale);          
        
        global.tweenManager.startTween(script.tween, "grow", setFalse);
    }
}

function setFalse() {
    global.tweening = false;
    // Once object is finished growing, move it to the scene and re enable preview object
//    var baseTransform = script.base.getTransform();
//
//    var cameraPosition = script.cam.getTransform().getWorldPosition();
//    var inFrontVec = script.cam.getTransform().getWorldRotation().multiplyVec3(new vec3(10, 10, 10));
//    print(inFrontVec);
//    print(cameraPosition);
//    var newestVec = inFrontVec.add(cameraPosition);
    //baseTransform.setWorldPosition(new vec3(newestVec.x, 0, newestVec.z));
    //baseTransform.setWorldPosition(new vec3(cameraPosition.x + 40, 0, cameraPosition.z - 180));    
    
    //baseTransform.setWorldPosition(new vec3(0, 0, 0));
    script.objectPreview[currentTreeIndex].enabled = true;
}

// Left and Right Button Logic
function increaseTreeIndex() {
    currentTreeIndex++;
    
    if (currentTreeIndex >= script.objectPreview.length) {
        currentTreeIndex = 0;
    }
    
    for (var i = 0; i < script.objectPreview.length; i++) {
        if (i == currentTreeIndex) {
            script.objectPreview[i].enabled = true;
        } else {
            script.objectPreview[i].enabled = false;
        }
    }
}

function decreaseTreeIndex() {
    currentTreeIndex--;
    
    if (currentTreeIndex < 0) {
        currentTreeIndex = script.objectPreview.length - 1;
    }
    
    for (var i = 0; i < script.objectPreview.length; i++) {
        if (i == currentTreeIndex) {
            script.objectPreview[i].enabled = true;
        } else {
            script.objectPreview[i].enabled = false;
        }
    }
}
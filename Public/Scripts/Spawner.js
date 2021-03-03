// -----JS CODE-----
// @input Asset.ObjectPrefab[] objectPrefab
// @input SceneObject[] objectPreview
// @input Component.ScriptComponent[] objectTaps
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
    for (var i = 1; i < script.objectPreview.length; i++)
    {
        script.objectPreview[i].enabled = false;
    }
    
    print("Welcome to the Object Spawner Template! To add your own objects to spawn, first add them under the WorldObjectController, then save each of them as a prefab object. Then, you can create a new material to make them look more like a preview, or modify the existing hologram material! Then, in the Spawner script, replace the Object Prefabs with your saved prefabs, and replace the Object Previews with the ones you added under the WorldObjectController! Make sure they are in the same order!");
    print("If you have any questions feel free to email kargraphical@gmail.com");
});

var event = script.createEvent("UpdateEvent");
event.bind(function (eventData)
{
    // Check for button presses
    if (global.left)
    {
        decreaseTreeIndex();
        global.left = false;
    }
    if (global.right)
    {
        increaseTreeIndex();
        global.right = false;
    }
    if (global.confirm)
    {
        growSelectedTree();
        global.confirm = false;
    }
    // If Tween Value is running
    if (global.tweening)
    {
        tweenValue = global.tweenManager.getGenericTweenValue(script.tween, "grow");
        currentScale = oldScale.mult(new vec3(tweenValue, tweenValue, tweenValue));
        currentTransform.setLocalScale(currentScale);
    }
});

function growSelectedTree() {
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
        newObj.enabled = true;
        
        currentTransform = newObj.getChild(0).getTransform();
        oldScale = currentTransform.getWorldScale();
        print(oldScale);
        currentTransform.setLocalScale(currentScale);        
        
        print("scene: " + script.scene.getChildrenCount());
        print("obj: " + newObj.getChildrenCount());
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
    //setParentInPlace(currentTreeGrowing, script.scene);
    var baseTransform = script.base.getTransform();
    baseTransform.setWorldPosition(new vec3(0, 0, 0));
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
        }
        else {
            script.objectPreview[i].enabled = false;
        }
    }
}

function decreaseTreeIndex()
{
    currentTreeIndex--;
    
    if (currentTreeIndex < 0)
    {
        currentTreeIndex = script.objectPreview.length - 1;
    }
    
    for (var i = 0; i < script.objectPreview.length; i++)
    {
        if (i == currentTreeIndex) {
            script.objectPreview[i].enabled = true;
        }
        else {
            script.objectPreview[i].enabled = false;
        }
    }
}
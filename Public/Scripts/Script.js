// -----JS CODE-----

// @input SceneObject targetObj
// @input SceneObject toClone
// @input Component.Camera cam
// @input Asset.RenderMesh mesh
// @input Asset.ObjectPrefab prefab
// @input Component.MaterialMeshVisual anim
// @input Component.ScriptComponent scri

var idx = 0;

function randomInt(val) {
   return Math.floor(Math.random() *Math.floor(val));
}

function fff() {
    print('tapped');
//    var sceneObj = global.scene.createSceneObject('a' + idx);
//    var sceneTouch = sceneObj.createComponent('Component.TouchComponent');
//    var prfb = script.prefab.instantiate(sceneObj);
//    sceneObj.getTransform().setWorldPosition(new vec3(randomInt(100), randomInt(100), randomInt(100)));
//    
//    if (script.cam) {
//        sceneTouch.setCamera(script.cam);
//    }
//    if (script.mesh) {
//        sceneTouch.addMeshVisual(script.mesh);
//    }
//    //var m_script = sceneObj.copyComponent(script.scr);
//    //print(m_script.api);
//    sceneObj.setParent(script.obj);
    var newObj = script.targetObj.copyWholeHierarchy(script.toClone);
    newObj.enabled = true;
    print(newObj.name);
    idx++;
}


script.createEvent('TapEvent').bind(fff);
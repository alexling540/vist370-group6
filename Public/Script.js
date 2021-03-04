// -----JS CODE-----

// @input SceneObject obj

script.createEvent("TapEvent").bind(function(data) {
    var meshes = script.obj.getComponents('Component.RenderMeshVisual');
    for (var i = 0; i < meshes.length; i++) {
        meshes[i].mainPass.blendMode = 6;
    }
});
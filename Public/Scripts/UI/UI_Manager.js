// -----JS CODE-----
// @input SceneObject homeUI { "name": "Home UI Component"}
// @input SceneObject editButton
// @input SceneObject editUI
// @input SceneObject homeButton
// @input SceneObject editController

var delayed = script.createEvent('DelayedCallbackEvent');

const debounceDelay = 0.5;

function debounce(func, time) {
    var timeout;
    return function() {
        var context = this;
        var args = arguments;
        var later = function() {
            timeout = null;
        };
        if (!timeout) {    
            delayed.bind(func);
            delayed.reset(time);
        }
    }
}

function onLensTurnOnEvent() {
    global.isEditing = false;
    script.editUI.enabled = false;
    script.editController.enabled = false;
    script.homeUI.enabled = true;
}
var turnOnEvent = script.createEvent("TurnOnEvent");
turnOnEvent.bind(onLensTurnOnEvent);

script.editButton
    .createComponent('Component.ScriptComponent')
    .createEvent('TapEvent')
    .bind(debounce(function (eventData) {
        global.isEditing = true;
        script.homeUI.enabled = false;
        script.editUI.enabled = true;
        script.editController.enabled = true;
    }, debounceDelay));

script.homeButton
    .createComponent('Component.ScriptComponent')
    .createEvent('TapEvent')
    .bind(debounce(function (eventData) {
        global.isEditing = false;
        script.editUI.enabled = false;
        script.editController.enabled = false;
        script.homeUI.enabled = true;
    }, debounceDelay));

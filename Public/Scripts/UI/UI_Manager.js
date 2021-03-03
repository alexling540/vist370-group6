// -----JS CODE-----
// @input SceneObject homeUI { "label": "Home UI"}
// @input SceneObject editButton
// @input SceneObject editUI
// @input SceneObject homeButton
// @input SceneObject editController
// @input SceneObject closeButton
// @input SceneObject infoUI

var infoCards;
var currentCard;

var delayed = script.createEvent('DelayedCallbackEvent');

const debounceDelay = 1;

function debounce(func, time) {
    var timeout;
    return function() {
        var later = function() {
            timeout = null;
        };
        if (!timeout) {
            func();
        } else {    
            delayed.bind(later);
            delayed.reset(time);
        }
    }
}

script.createEvent("TurnOnEvent").bind(function() {
    global.isEditing = false;
    global.isOpen = false;
    script.editUI.enabled = false;
    script.editController.enabled = false;
    script.homeUI.enabled = true;
    script.infoUI.enabled = false;
    infoCards = script.infoUI.getChild(0).getComponents('Component.Image');
    currentCard = null;
});

script.editButton
    .createComponent('Component.ScriptComponent')
    .createEvent('TapEvent')
    .bind(debounce(function (eventData) {
        script.homeUI.enabled = false;
        script.editUI.enabled = true;
        script.editController.enabled = true;
        global.isEditing = true;
    }, debounceDelay));

script.homeButton
    .createComponent('Component.ScriptComponent')
    .createEvent('TapEvent')
    .bind(debounce(function (eventData) {
        script.editUI.enabled = false;
        script.editController.enabled = false;
        script.homeUI.enabled = true;
        global.isEditing = false;
    }, debounceDelay));

script.closeButton
    .createComponent('Component.ScriptComponent')
    .createEvent('TapEvent')
    .bind(debounce(function (eventData) {
        closeInfoCard();
    }, debounceDelay));


var closeInfoCard = debounce(function() {
    print('closing');    
    
    var texture = currentCard.getMaterial(0).getPass(0).baseTex;
    var control = texture.control;
    
    control.play(1, 0); 
    control.setOnFinish(function(animatedTexture) {
        animatedTexture.isReversed = false;
        currentCard.enabled = false;
        currentCard = null;
        global.isOpen = false;
        
        script.infoUI.enabled = false;
        script.homeUI.enabled = true;
    });
}, debounceDelay);

global.openInfoCard = function(infoCardIndex) {
    print('opening');
    
    script.homeUI.enabled = false;
    script.infoUI.enabled = true;
    global.isOpen = true;
    
    for (var i = 0; i < infoCards.length; i++) {
        if (i != infoCardIndex) {
            infoCards[i].enabled = false;
        } else {
            infoCards[i].enabled = true;
        }
    }
    
    currentCard = infoCards[infoCardIndex];
    
    var texture = infoCards[infoCardIndex].getMaterial(0).getPass(0).baseTex;
    var control = texture.control;
    
    control.play(1, 0);
    control.setOnFinish(function(animatedTexture) {
        animatedTexture.isReversed = true;
        animatedTexture.pauseAtFrame(0);
    });
}
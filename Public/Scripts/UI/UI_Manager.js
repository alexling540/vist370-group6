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

script.closeButton
    .createComponent('Component.ScriptComponent')
    .createEvent('TapEvent')
    .bind(debounce(function (eventData) {
        closeInfoCard();
    }, debounceDelay));


//var currentlyOpen = null;
//
//script.createEvent("TurnOnEvent").bind(function() {
//    currentlyOpen = null;
//});

//script.createEvent("UpdateEvent").bind(function(eventData) {  
//    
//    if (currentlyOpen == null && global.openInfo != null) { // nothing is open, and something opened
//        script.infoUI.enabled = true;        
//        global.openInfo.enabled = true;
//        
//        var texture = global.openInfo.getMaterial(0).getPass(0).baseTex;
//        var control = texture.control;
//        
//        control.play(1, 0);
//        control.setOnFinish(function(animatedTexture) {
//            animatedTexture.isReversed = true;
//            animatedTexture.pauseAtFrame(0);
//            currentlyOpen = global.openInfo;
//            global.isOpen = true;
//        });        
//    } else if (currentlyOpen != null && global.openInfo == null) { // something is open, and it closed
//        var texture = currentlyOpen.getMaterial(0).getPass(0).baseTex;
//        var control = texture.control;
//        
//        control.play(1, 0); 
//        control.setOnFinish(function(animatedTexture) {
//            animatedTexture.isReversed = false;
//            currentlyOpen.enabled = false;
//            currentlyOpen = null;
//            global.isOpen = false;
//        });
//    }
//});
var closeInfoCard = function() {
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
}

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
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";

    return Controller.extend("com.po.countdowntimer.controller.Detail", {
        onInit: function() {
            console.log("Detail page loaded successfully!");
        }
    });
});
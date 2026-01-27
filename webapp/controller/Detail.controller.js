sap.ui.define([
    "./BaseController"
], function(BaseController) {
    "use strict";

    return BaseController.extend("com.po.countdowntimer.controller.Detail", {

        onPressEdit: function(){

                //  this.getRouter().navTo("edit", {}, true /* no history */)
                 this.getRouter().getTargets().display('targetEdit')

        }

    });
});
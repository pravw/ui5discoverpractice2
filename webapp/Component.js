sap.ui.define([
    "sap/ui/core/UIComponent",
    "com/po/countdowntimer/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("com.po.countdowntimer.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createInputModel(), "input");

            // enable routing
            this.getRouter().initialize();
        }
    });
});
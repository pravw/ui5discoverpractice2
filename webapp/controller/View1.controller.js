sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/StandardListItem"
], (Controller,StandardListItem) => {
    "use strict";

    return Controller.extend("com.po.countdowntimer.controller.View1", {
        onInit() {
        },
        
   onpress: function(){

      // get input value
      const input= this.getView().byId("input").getValue()
    //   adding the new item

      this.getView().byId("idList").addItem(new StandardListItem({
        title:input
      })
    );
    },

    onPressDelete: function(oEvent){

      const oItem = oEvent.getParameter("listItem")

      this.getView().byId("idList").removeItem(oItem)
    }

});
});
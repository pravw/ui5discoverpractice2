sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/ObjectListItem",
     "sap/m/ObjectAttribute",
     "sap/m/ObjectStatus",
    //  "sap/ui/core/ValueState"
    "sap/ui/core/library"
], (Controller,ObjectListItem,ObjectAttribute,ObjectStatus,coreLibrary) => {
    "use strict";

    return Controller.extend("com.po.countdowntimer.controller.View1", {
        onInit() {
        },
        
   onPressNewproduct: function(){

      // get input value
      const sInput= this.getView().byId("input").getValue()
    const sCategory = this.getView().byId("idcategory").getSelectedItem();
    const sPrice = this.getView().byId("idprice").getValue()
    const sReleaseDate =  this.getView().byId("idReleasedate").getDateValue()
    const sDiscontinueDate =  this.getView().byId("idDiscontinueddate").getDateValue()
    //   adding the new item

      this.getView().byId("idList").addItem(new ObjectListItem({
        title:sInput,
        number:sPrice,
        numberUnit:"Eur",
        attributes:[
          new ObjectAttribute({ title:"category"   ,  text: sCategory.getText()}),
          new ObjectAttribute({ title:"ReleaseDate"   ,  text:sReleaseDate}),
        ],
        firstStatus:
          new ObjectStatus({ 
            text : this._getAvailibilityText(sDiscontinueDate),
            state : this._getAvailibilityState(sDiscontinueDate)

             })
        
      })
    );

 
    },

    onPressDelete: function(oEvent){

      const oItem = oEvent.getParameter("listItem")

      this.getView().byId("idList").removeItem(oItem)
    },

    _getAvailibilityText:function(sDate){
      const oDate = new Date(sDate);

         return oDate > new Date() ?  "Available":"Unavailable";

    },

    _getAvailibilityState:function(sDate){

      const ValueState = coreLibrary.ValueState;
      const oDate = new Date(sDate);

       return oDate > new Date() ?  ValueState.Success:ValueState.Error;


    }

    

});
});
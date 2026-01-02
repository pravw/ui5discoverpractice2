sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/library",
    "sap/ui/core/Fragment",
    "com/po/countdowntimer/model/models",
    "com/po/countdowntimer/model/formatter"

], (Controller,coreLibrary,Fragment,models,formatter) => {
    "use strict";

    return Controller.extend("com.po.countdowntimer.controller.View1", {
      formatter:formatter,
      
   onPressNewproduct: function(){


    const oData = this.getView().getModel("input").getData()


     const aItems = oProductModel.getProperty("/items") 
      aItems.push(oData)
       oProductModel.setProperty("/items", aItems)




 
    },

    onPressDelete: function(oEvent){

      const oItem = oEvent.getParameter("listItem");
      const oModel = this.getView().getModel("product")
      const iIndex = oItem.getBindingContext("product").getPath().split("/").pop()
      oModel.getData().items.splice(iIndex, 1)
      oModel.refresh()



      console.log(spath)
     
    },

    // _getAvailibilityText:function(sDate){
    //   const oDate = new Date(sDate);

    //      return oDate > new Date() ?  "Available":"Unavailable";

    // },

    // _getAvailibilityState:function(sDate){

    //   const ValueState = coreLibrary.ValueState;
    //   const oDate = new Date(sDate);

    //    return oDate > new Date() ?  ValueState.Success:ValueState.Error;


    // },
      onPressAddNewProducts: function() {
   
      if (!this._oCreateProductDialog) {
        Fragment.load({
          id: this.getView().getId(),
          name: "com.po.countdowntimer.view.fragments.CreateProduct",
          controller: this
        }).then(oDialog => {
          this._oCreateProductDialog = oDialog
          this.getView().addDependent(oDialog)
          oDialog.open()
        })
      } else {
        this._oCreateProductDialog.open()
      }
    },
    onPresscancelNewproduct: function () {
    this._oCreateProductDialog.close();


    console.log(this.getView().getModel("input").getData())
     },

     onAftercloseDialog:function(){

        this.getOwnerComponent().setModel(models.createInputModel(),"input")
      


     }



    

});

});
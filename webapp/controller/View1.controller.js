sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/ObjectListItem",
     "sap/m/ObjectAttribute",
     "sap/m/ObjectStatus",
    "sap/ui/core/library",
    "sap/ui/core/Fragment",
    "com/po/countdowntimer/model/models"
], (Controller,ObjectListItem,ObjectAttribute,ObjectStatus,coreLibrary,Fragment,models) => {
    "use strict";

    return Controller.extend("com.po.countdowntimer.controller.View1", {
        onInit() {
        },
        
   onPressNewproduct: function(){


    const oData = this.getView().getModel("input").getData()

      // get input value
    //   const sInput= this.getView().byId("input").getValue()
    // const sCategory = this.getView().byId("idcategory").getSelectedItem();
    // const sPrice = this.getView().byId("idprice").getValue()
    // const sReleaseDate =  this.getView().byId("idReleasedate").getDateValue()
    // const sDiscontinueDate =  this.getView().byId("idDiscontinueddate").getDateValue()
    //   adding the new item

      this.getView().byId("idList").addItem(new ObjectListItem({
        title:oData.Name,
        number:oData.Price,
        numberUnit:"Eur",
        attributes:[
          new ObjectAttribute({ title:"category"   ,  text: oData.Category}),
          new ObjectAttribute({ title:"ReleaseDate"   ,  text:oData.ReleaseDate}),
        ],
        firstStatus:
          new ObjectStatus({ 
            text : this._getAvailibilityText(oData.DiscountinuedDate),
            state : this._getAvailibilityState(oData.DiscontinueDate)

             }),

       
      
        
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


    },
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
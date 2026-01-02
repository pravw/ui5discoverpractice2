sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/BindingMode",
    "sap/ui/Device"
], 
function (JSONModel,BindingMode, Device) {
    "use strict";

    return {
      
        createInputModel: function () {
         
            return new JSONModel({
                Name:"",
                Category:"",
                Price:"",
                ReleaseDate:null,
                DiscountinuedDate:null,
            }).setDefaultBindingMode(BindingMode.TwoWay)
        },


              createValidationModel: function () {
         
            return new JSONModel({
                Name:true,
                Category:true,
                Price:true,
                ReleaseDate:true,
                DiscountinuedDate:true,
            }).setDefaultBindingMode(BindingMode.TwoWay)
        },


        


        









    };

});
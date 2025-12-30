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
        }
    };

});
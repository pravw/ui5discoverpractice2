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
                DiscontinuedDate:null,
                Rating:0,
            }).setDefaultBindingMode(BindingMode.TwoWay)
        },


            createValidationModel: function () {
         
            return new JSONModel({
                Name:true,
                Category:true,
                Price:true,
                ReleaseDate:true,
                DiscontinuedDate:true,
            }).setDefaultBindingMode(BindingMode.TwoWay)
        },

    };

});
sap.ui.define([
    "./BaseController"
], function(BaseController) {
    "use strict";

    return BaseController.extend("com.po.countdowntimer.controller.Edit", {
        onPresssaveproduct: function(){

          const oModel = this.getView().getModel()
              if(oModel.hasPendingChanges()){
        oModel.submitChanges({
            success: oData => {
          this._oEditDialog.close()
          MessageBox.information("Product has been updated")
          //  this.getRouter().navTo("detail", {}, true /* no history */)
           this.getRouter().getTargets().display('targetEdit')
     
        },
        error: () => {
          // this._oEditDialog.close()
          MessageBox.error("Product could not be updated!")
          // this.getRouter().navTo("detail, {}, true /* no history */")
          this.getRouter().getTargets().display('targetEdit')
          
        }
        })

    }else{
      // this._oEditDialog.close()
      // this.getRouter().navTo("detail, {}, true /* no history */")
      this.getRouter().getTargets().display('targetEdit')

    }
        },
        onPressCancelEditproduct(){
          // this.getRouter.navTo("detail, {}, true /* no history */ ")
          this.getRouter().getTargets().display('targetEdit')

        }
    });
});
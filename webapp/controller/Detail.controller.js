sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel"
], function(BaseController,JSONModel) {
    "use strict";

    const VALID_TABS = ["details","supplier"]



    return BaseController.extend("com.po.countdowntimer.controller.Detail", { 
        
        _onRouteMatched(oEvent){

            const oArgs = oEvent.getParameter("arguments")
            // console.log(oArgs)
            const oQuery = oArgs["?query"]
             const oModel = this.getView().getModel()

        oModel.metadataLoaded().then(() => {
          const sPath = oModel.createKey("/Products", {
            ID: oArgs.productID
          })
  
          this.getView().bindElement({
            path: sPath,
            parameters: {
              expand: 'Supplier'
            },
            events: {
              dataRequested: () => this.getView().setBusy(true),
              dataReceived: () => this.getView().setBusy(false)
            }
          })
        })

         if (oQuery && oQuery.tab) {
          this.getView().getModel("view").setProperty("/selectedTab", oQuery.tab)
        } else {
          this.getRouter().navTo("detail", {
            productID: oArgs.productID,
            "?query": {
              tab: VALID_TABS[0]
            }
          }, true)
        }
        },        
        onInit(){

            this.getRouter().getRoute("detail").attachMatched(this._onRouteMatched, this)

             this.getView().setModel(new JSONModel({
          selectedTab: ''
        }), "view")

        },
        onPressEdit: function(){

                //  this.getRouter().navTo("edit", {}, true /* no history */)
                 this.getRouter().getTargets().display('targetEdit')

        },

            onSelectTab(oEvent) {
        const oContext = this.getView().getBindingContext()

        this.getRouter().navTo("detail", {
          productID: oContext.getProperty("ID"),
          "?query": {
            tab: oEvent.getParameter("selectedKey")
          }
        }, true)
      }

    });
});
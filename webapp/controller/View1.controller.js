sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/ui/model/Context", 
    "com/po/countdowntimer/model/models",
    "com/po/countdowntimer/model/formatter"
], (Controller,Fragment,Sorter,Filter,FilterOperator,MessageBox,Context,models,formatter) => {
    "use strict";

    return Controller.extend("com.po.countdowntimer.controller.View1", {
      formatter:formatter,
      
   onPressNewproduct: function(){

    const oPayload = this.getView().getModel("input").getData()





    //  if (!this._validate()) return
     if (!this._validate()) {
        console.log("❌ Validation failed.");
        return;
      }


       oPayload.ID = Date.now().toString().slice(-4)
        delete oPayload.Category
        delete oPayload.Currency

        // send the create request 

        this.getView().getModel().create("/Products", oPayload, {
        success: (oData, oResponse) => {
          console.log(oData, oResponse)
          this._oCreateProductDialog.close()
        },
        error: oError => {
          console.log(oError)
           this._oCreateProductDialog.close()
             }
      })

    },
    onItemPress: function(oEvent){
      //  MessageBox.show(oEvent.getSource().getBindingContext().getProperty("Description"), {
      //   title: "Description"
      // }) 

      const oModel = this.getView().getModel()
      const ID = oEvent.getSource().getBindingContext().getProperty("ID")
         const sPath = oModel.createKey("/Products", {
         ID
       })
      //  oModel.read(`/Products(${ID})`, {
      //   success: oData => {
      //     MessageBox.show(oData.Description, {
      //       title: "Description"
      //     })
      //   }
      // }) 





      // // const sPath = oModel.createKey("/Products", {
      // //   ID
      // // })

      // oModel.read(sPath, {
      //   success: oData => {
      //     MessageBox.show(oData.Description, {
      //       title: "Description"
      //     })
      //   }
      // }) 

      // MessageBox.show(oModel.getProperty(`${sPath}/Description`), {
      //   title: "Description"
      // }) 

      if (!this._oEditDialog) {
        Fragment.load({
          id: this.getView().getId(),
          name: "com.po.countdowntimer.view.fragments.Edit",
          controller: this,
        }).then(oDialog => {
          this._oEditDialog = oDialog
          this.getView().addDependent(oDialog)
          this._oEditDialog.setBindingContext(new Context(oModel, sPath))
          oDialog.open()
        })
      } else {
        this._oEditDialog.open()
      }
    },
    onPressCancelEditproduct(){

      this._oEditDialog.close()
    },

    onPressUpdateproduct() {
      // const oView = this.getView()
      const oModel = this.getView().getModel()
      // const sPath = this._oEditDialog.getBindingContext().getPath()


      // const oPayload = {
      //   Name: oView.byId("idEditProductName").getValue(),
      //   Price: oView.byId("idPrice").getValue(),
      //   ReleaseDate: oView.byId("idEditReleaseDate").getDateValue(),
      //   DiscontinuedDate: oView.byId("idEditDiscontinued").getDateValue(),
      //   Rating: oView.byId("idEditRating").getValue(),
      // }



      //   oModel.update(sPath, oPayload, {
      //   success: oData => {
      //     this._oEditDialog.close()
      //     MessageBox.information("Product has been updated")
          
      //     console.log("sucessfully updated")
      //   },
      //   error: () => {
      //     this._oEditDialog.close()
      //     MessageBox.error("Product could not be updated!")
      //     console.error("Update failed:", oError);
      //   }
      // })

    if(oModel.hasPendingChanges()){
        oModel.submitChanges({

            success: oData => {
          this._oEditDialog.close()
          MessageBox.information("Product has been updated")
          
          console.log("sucessfully updated")
        },
        error: () => {
          this._oEditDialog.close()
          MessageBox.error("Product could not be updated!")
          console.error("Update failed:", oError);
        }



        })

    }
      
    
    },



    onPressDelete: function(oEvent){
      const oModel = this.getView().getModel()
      const oItem = oEvent.getParameter("listItem");

 

      // Create path
      const sPath = oModel.createKey("/Products", {
        ID: oItem.getBindingContext().getProperty("ID")
      })

      // Send delete request
      oModel.remove(sPath, {
        success: () => {},
        error: () => {},
      })
    },

  

      onPressAddNewProducts: function() {
   
      if (!this._oCreateProductDialog) {
           this._loadDialog("CreateProduct").then(oDialog =>{
            this._oCreateProductDialog= oDialog
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
      onSortButtonPressed:function (){

           if (!this._oSortDialog) {
           this._loadDialog("SortDialog").then(oDialog =>{
            this._oSortDialog = oDialog
            oDialog.open()
           })
      } else {
        this._oSortDialog.open()
      }      
    },

        onFilterButtonPressed:function (){
           if (!this._oFilterDialog) {
             this._loadDialog("filterDialog").then(oDialog =>{
            this._oFilterDialog = oDialog
            oDialog.open()
           })
      } else {
        this._oFilterDialog.open()
      }      
    },

     onGroupButtonPressed:function (){

           if (!this._oGroupDialog) {
               this._loadDialog("GroupDialog").then(oDialog =>{
            this._oGroupDialog = oDialog
            oDialog.open()
           })
      
      } else {
        this._oGroupDialog.open()
      }      
    },






     onAftercloseDialog:function(){

        this.getOwnerComponent().setModel(models.createInputModel(),"input")
        this.getOwnerComponent().setModel(models.createValidationModel(),"validate")
     },


     onConfirmSort: function(oEvent){
      const oSortItem = oEvent.getParameter("sortItem")
      const bDescending = oEvent.getParameter("sortDescending")

        this.getView()
        .byId('idList')
        .getBinding('items')
        .sort(oSortItem ? [new Sorter(oSortItem.getKey(), bDescending)] : [])

     },

     onConfirmGroup: function(oEvent){
      // get group related

       console.log("i am error")
      const oGroupItem = oEvent.getParameter("groupItem")
      const bDescending = oEvent.getParameter("groupDescending")
    
      // If there is a group item selected, sort the list binding.
      // Else, sort by empty array to reset any existing sorting.
      this.getView()
        .byId("idList")
        .getBinding("items")
         .sort(oGroupItem ? [new Sorter(oGroupItem.getKey(), bDescending, true /* vGroup */)] : [])
     },

     onConfirmFilter:function(oEvent) {

      // Get filter items from the event object
      const aFilterKeys = oEvent.getParameter("filterCompoundKeys")
      // const SFilterString = oEvent.getParameter("filterString")
     
      // this will bring the name from selected item
      const sFilterString = oEvent.getParameter("filterString")

      // console.log(aFilterItems);
      // Create filters array according to the selected filter items



      const aFilter = []
            Object.entries(aFilterKeys).forEach(([sPath, oValues]) => {
        //  sPath       // e.g., "Category/ID"
        //   oValues // e.g., { 0: true, 1: true }

          Object.keys(oValues).forEach(sKey => {

         //  sKey   // e.g., "0" or "1"
          if (!sKey) {
        return;
      }

        if (sKey.includes("__")) {
            aFilter.push(new Filter(...sKey.split("__")))
        } else {
            aFilter.push(new Filter(sPath, FilterOperator.EQ, sKey));
        }

         });
          });
         
          //  this will bind in ui
         this.getView()
         .byId('idList')
         .getBinding('items')
         .filter(aFilter)

            // Show info header if there are any filters
         this.getView().byId('idFilterInfoToolbar').setVisible(aFilter.length ? true : false)
         this.getView().byId('idFilterText').setText(sFilterString)

     },


   



      onProductLoaded:function(oEvent){
     const sTitle = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("listHeader")
     this.getView().byId("idListTitle").setText(`${sTitle}(${oEvent.getParameter("total")})`)
      },


     _validate(){
      const oInput = this.getView().getModel("input").getData()
      const oValidationModel = this.getView().getModel("validate")

      // check the  input model.setProperty(path, value);

      oValidationModel.setProperty("/Name", !! oInput.Name)
      oValidationModel.setProperty("/Category", !! oInput.Category)
      oValidationModel.setProperty("/Price", !!oInput.Price);
      oValidationModel.setProperty("/ReleaseDate", !! oInput.ReleaseDate)
      // oValidationModel.setProperty("/DiscontinuedDate", !! oInput.DiscontinuedDate)

     // Return validation result
      return !Object.values(oValidationModel.getData()).includes(false)

    },


    
 _loadDialog(sFragmentName){
  return new Promise ((resolve,reject)=> {
      Fragment.load({
          id: this.getView().getId(),
          name: `com.po.countdowntimer.view.fragments.${sFragmentName}`,
          controller: this
        }).then(oDialog => {
          
          this.getView().addDependent(oDialog)
          resolve(oDialog)
        })
        
  })
 }

})

});
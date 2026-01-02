sap.ui.define(['sap/ui/core/library'],
  function (coreLibrary) {
    'use strict'
    const ValueState = coreLibrary.ValueState;
    return {

      formatAvailabilityText(sValue) {
        // console.log("value",sValue)
        // console.log("changed value",new Date(sValue))
        const oBundle = this.getOwnerComponent().getModel('i18n').getResourceBundle()

        return sValue && new Date(sValue) <= new Date() ? oBundle.getText('unavailable') : oBundle.getText('available')

      },


      formatAvailabilityState(sValue) {

        return sValue && new Date(sValue) <= new Date() ? ValueState.Error : ValueState.Success

      }
    }
  })

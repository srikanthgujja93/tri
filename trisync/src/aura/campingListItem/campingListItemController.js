({
    packItem : function(component, event, helper) {
         var abc = component.get("v.item",true);
        abc.Packed__c = true;
        component.set("v.item",abc);
        var btnClicked = event.getSource();
        btnClicked.set("v.disabled",true);  

    }
})
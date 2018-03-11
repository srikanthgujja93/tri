({
	deletethis : function(component, event, helper) {
		var cmpBack = component.find('MB-Back-del');
        $A.util.addClass(cmpBack, 'slds-backdrop--open');         
		var delThisId = component.get("v.delThisId");
        var objectName = component.get("v.objectName");
        var action = component.get("c.delThisRecord");
        action.setParams({
            "delId" : delThisId,
            "objname" : objectName
        });
        action.setCallback(this,function(res){
            $A.util.removeClass(cmpBack, 'slds-backdrop--open'); 
        	//alert(res.getReturnValue());   
        });
        $A.enqueueAction(action);
        var compEvent = component.getEvent("UpdateEvent");
        compEvent.fire();
	}
})
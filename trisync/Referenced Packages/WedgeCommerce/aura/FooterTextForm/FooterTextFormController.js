({
	initialize:function(cmp,event){
		var tempId = cmp.get("v.tempId");
        if(tempId!=null){
            var action = cmp.get("c.getFooterText");
            var con = cmp.find("content"); 
                action.setParams({
                    "tempId" : tempId
                });            
                action.setCallback(this,function(res){
                    var state = res.getState();
                    if(state=='SUCCESS'){ 
                        cmp.set('v.newFooterText',res.getReturnValue());
                    }
                });
            $A.enqueueAction(action);            
        }
        var cmpTarget = cmp.find('Modalbox');
       	var cmpBack = cmp.find('MB-Back');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open'); 
    },
    createFooterText:function(component, event, helper) {
            var newFooterText = component.get("v.newFooterText");
            helper.createFooterText(component,newFooterText);
            var compEvent = component.getEvent("RemoveComponent");
            compEvent.setParams({
                "comp" : component
            });
	    	compEvent.fire(); 
	},
    removeComponent:function(component, event, helper){
        var compEvent = component.getEvent("RemoveComponent");
        compEvent.setParams({
        	"comp" : component
        });
	    compEvent.fire();    	
    }
})
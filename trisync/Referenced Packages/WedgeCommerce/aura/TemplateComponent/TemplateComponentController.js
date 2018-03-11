({	
    scriptsLoaded : function(component,event,helper){
        
    },
    navigate:function(component,event,helper){
        
    },
	getTemplates : function(component, event, helper) {
        var temp = component.get('v.TemplateId');
		var action = component.get('c.getAllTemplates');
        action.setParams({
            "templateId" : temp
        });
        action.setCallback(this,function(res){
            var state = res.getState();
            if(state=='SUCCESS'){
                component.set('v.TempComponentList',res.getReturnValue());
            }
        });
        $A.enqueueAction(action);
	}
})
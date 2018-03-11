({
    scriptsLoaded : function(component,event,helper){
        /*$(document).on('click','.navigate',function(){            
            var compEvent = component.getEvent("createTemplateComponent");
            compEvent.setParams({
                "TemplateId" : $(this).next('input').val()
            });
            compEvent.fire(); 
        });*/        
    },
    navigate:function(component,event,helper){
        var compEvent = component.getEvent("createTemplateComponent");
        compEvent.setParams({
        	"TemplateId" : $('.navigate').next('input').val()
        });
        compEvent.fire();        
    },
    getTemplates : function(component, event, helper) {
		var action = component.get('c.getAllTemplates');
        action.setCallback(this,function(res){
            var state = res.getState();
            if(state=='SUCCESS'){
                component.set('v.TemplateList',res.getReturnValue());
            }
        });
        $A.enqueueAction(action);
	},
})
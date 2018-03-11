({
	scriptsLoaded : function(component,event,helper){
    },
    navigate:function(component,event,helper){
        var tempId = component.get('v.tempId');
        var compEvent = component.getEvent("createTemplateComponent");
        compEvent.setParams({
        	"TemplateId" : tempId
        });
        compEvent.fire();        
    }
})
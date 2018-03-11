({
	getImages : function(component, event, helper) {
        var temp = component.get('v.TempId');
		var action = component.get('c.getAllImages');
        action.setParams({
            "tempId" : temp
        });
        action.setCallback(this,function(res){
            var state = res.getState();
            if(state=='SUCCESS'){
                component.set('v.ImageSlider',res.getReturnValue());
            }
        });
        $A.enqueueAction(action);
	}
})
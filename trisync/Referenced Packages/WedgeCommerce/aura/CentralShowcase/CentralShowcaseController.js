({
	getShowcase : function(component, event, helper) {
        var temp = component.get('v.TempId');
		var action = component.get('c.getAllShowcase');
        action.setParams({
            "tempId" : temp
        });
        action.setCallback(this,function(res){
            var state = res.getState();
            if(state=='SUCCESS'){
                component.set('v.ShowcaseList',res.getReturnValue());
            }
        });
        $A.enqueueAction(action);
	},
    updateShowcaselist:function(cmp){
        cmp.updateList();
    }
})
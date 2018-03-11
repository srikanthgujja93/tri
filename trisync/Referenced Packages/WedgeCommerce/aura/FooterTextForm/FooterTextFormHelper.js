({
	createFooterText: function(component, footerText) {
		this.upsertFooterText(component, footerText, function(a) {
	        console.log(a.getReturnValue());
	      });
	},
    upsertFooterText : function(component, footerText) {
	    var action = component.get("c.saveFooterText");
	    action.setParams({
	        "footerText": footerText
	    });
        action.setCallback(this,function(res){            
            var state = res.getState();
            if(state==='SUCCESS'){
            }
        });
	    $A.enqueueAction(action);
	},
})
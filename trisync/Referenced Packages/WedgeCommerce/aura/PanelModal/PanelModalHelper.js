({
	getSelectOptions : function(component,optString) {
    	var str = JSON.parse(optString);
        var feed = [];
        feed.push({
            label: '--None--',
        	value: '',
        });
        for(var key in str){
            feed.push({
                label: str[key]["label"],
                value: str[key]["value"],
            });                
        }
        return feed;
	},
    createPanel: function(component,showcasepanel) {        
		this.upsertPanel(component,showcasepanel,function(a){
	        var panels = component.get("v.panels");
	        panels.push(a.getReturnValue());
	        component.set("v.panels", panels);
	    });
	},
    upsertPanel:function(component, showcasepanel){        
	    var action = component.get("c.savepanel");
	    action.setParams({
	        "panel": showcasepanel
	    });
        action.setCallback(this,function(res){            
            var state = res.getState();
            if(state==='SUCCESS'){
                
            }
        });
	    $A.enqueueAction(action);
	},
})
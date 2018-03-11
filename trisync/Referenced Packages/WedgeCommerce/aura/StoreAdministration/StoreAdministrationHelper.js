({
	getSelectOptions : function(component,optString) {
    	var str = JSON.parse(optString);
        var feed = [];
        for(var key in str){
            feed.push({
                label: str[key]["Label"],
                value: str[key]["Value"],
            });                
        }
        return feed;
	},
    createStoreAdmin: function(component, StoreAdmin) {
		this.upsertStoreAdmin(component, StoreAdmin, function(a) {
	        var storeAdmins = component.get("v.StoreAdmin");
	        storeAdmins.push(a.getReturnValue());
	        component.set("v.StoreAdmin", storeAdmins);
	    });
	},
    upsertStoreAdmin : function(component, StoreAdmin) {
        var cmpBack = component.find('MB-Back');
        $A.util.addClass(cmpBack, 'slds-backdrop--open'); 
	    var action = component.get("c.saveStoreAdmin");
	    action.setParams({
	        "StoreAdmin": StoreAdmin
	    });
        action.setCallback(this,function(res){            
            var state = res.getState();
            if(state==='SUCCESS'){
            	$A.util.removeClass(cmpBack, 'slds-backdrop--open');         
            }
        });
	    $A.enqueueAction(action);
	},
})
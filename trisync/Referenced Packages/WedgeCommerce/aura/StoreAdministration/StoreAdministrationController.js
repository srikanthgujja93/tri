({
	getSelectoptions : function(component, event, helper) {
        var obj = [];
		var action = component.get("c.getAllSelectOption");
        action.setCallback(this,function(res){
            var state = res.getState();
            if(state=='SUCCESS'){
                var result = res.getReturnValue();
                
                obj = helper.getSelectOptions(component,result.articles);
                component.set('v.article',obj);
                
                obj = [];
                obj = helper.getSelectOptions(component,result.pricebookoptions);
                component.set('v.pricebookoptions',obj);
                
                obj = [];
                obj = helper.getSelectOptions(component,result.useroptions);
                component.set('v.useroptions',obj);
                
                obj = [];
                obj = helper.getSelectOptions(component,result.portalAccountoptions);
                component.set('v.portalAccountoptions',obj);
                
                obj = [];
                obj = helper.getSelectOptions(component,result.accountoptions);
                component.set('v.accountoptions',obj);
                
                obj = [];
                obj = helper.getSelectOptions(component,result.Currencyoptions);
                component.set('v.Currencyoptions',obj);

                obj = [];
                obj = helper.getSelectOptions(component,result.Templates);
                component.set('v.Templates',obj);
                
                obj = [];
                obj = helper.getSelectOptions(component,result.notificationoptions);
                component.set('v.notificationOption',obj);
            }
        });
        $A.enqueueAction(action);
        var actionStoreAd = component.get('c.getstoreAd');
        actionStoreAd.setCallback(this,function(res){
            var state = res.getState();
            if(state=='SUCCESS'){
                component.set('v.newStoreAdmin',res.getReturnValue());
            }
        });
		$A.enqueueAction(actionStoreAd);        
	},
    createStoreAdmin:function(component, event, helper) {
    	var newStoreAdmin = component.get("v.newStoreAdmin");            
        helper.createStoreAdmin(component,newStoreAdmin); 
	},
})
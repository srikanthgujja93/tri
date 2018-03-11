({
	doInit : function(component, event, helper) {
        var action1 = component.get("c.getDebugLog"); 
        action1.setCallback(this, function(a) {
            var res = a.getReturnValue();
            res.sobjectType = 'gkn_sms__Is_Save_Log__c';
        	component.set("v.debuglog",a.getReturnValue());
            var spinner = component.find("loading");
            $A.util.removeClass(spinner, "slds-show");
            $A.util.addClass(spinner, "slds-hide");
        });
        $A.enqueueAction(action1);
	},
    closeToast:function(component, event, helper){
        component.set("v.hasMessage","");
    },
    enableLog:function(component, event, helper){
        var obj = component.get("v.debuglog");        
        var spinner = component.find("loading");
        $A.util.removeClass(spinner, "slds-hide");
        $A.util.addClass(spinner, "slds-show");
        
        var action1 = component.get("c.updateDebugLog"); 
        obj.gkn_sms__IsEnable__c = $('#isEnable').is(':checked');
        action1.setParams({"log":JSON.stringify(obj)});
        action1.setCallback(this, function(a) {
            var res = a.getReturnValue();
            if(a.getState()==='SUCCESS')
            {
                res.sobjectType = 'gkn_sms__Is_Save_Log__c';
                component.set("v.messageType","success");
                if(res.gkn_sms__IsEnable__c){
                    component.set("v.hasMessage","SmartSMS APP Debug Log has been Enabled");    
                }else{
                    component.set("v.hasMessage","SmartSMS APP Debug Log has been Disabled");
                }
                component.set("v.debuglog",a.getReturnValue());
            }
            else
            {
             	component.set("v.messageType","error");
                component.set("v.hasMessage",a.getReturnValue());
            }        	
            $A.util.removeClass(spinner, "slds-show");
            $A.util.addClass(spinner, "slds-hide");
        });
        $A.enqueueAction(action1);
    }
})
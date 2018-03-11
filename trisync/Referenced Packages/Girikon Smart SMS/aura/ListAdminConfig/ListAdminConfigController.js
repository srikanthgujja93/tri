({
    doInit : function(component, event, helper) {        
        var action = component.get("c.getConfigList");
        action.setCallback(this, function(data) {            
            component.set("v.configNames", data.getReturnValue());
            component.set("v.recordCount",data.getReturnValue().length);
            var spinner = component.find("loading");
            $A.util.removeClass(spinner, "slds-show");
            $A.util.addClass(spinner, "slds-hide");
        });
        $A.enqueueAction(action);
    },
    closeToast:function(component, event, helper) {
        component.set("v.hasMessage","");
        component.set("v.messageType","");
    },
    configEditAction:function(component, event, helper){    	
        var compEvent = $A.get("e.gkn_sms:configEditEvent");
        var obj = event.getSource().get('v.value');
        compEvent.setParams({'smsConfig' :obj,'activeTab':'AdminConfig'});
        compEvent.fire();
    },
    deleteAlert:function(component, event, helper){    	    	
        component.set('v.isDelete',true);
        var obj = event.getSource().get('v.value');
        component.set('v.deleteRecord',obj);
    },
    deleteConfirm:function(component,event,helper){
        var obj = event.getSource().get('v.value');
        if(obj=='No'){
            component.set('v.isDelete',false);
            return false;
        }else{
            helper.deleteHelper(component,obj);
            component.set('v.isDelete',false);
        }
    }
})
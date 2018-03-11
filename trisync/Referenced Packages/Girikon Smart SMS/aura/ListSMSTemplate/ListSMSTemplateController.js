({
	doInit : function(component, event, helper) {        
		var action = component.get("c.getTempList");
        action.setCallback(this, function(data) {
        	component.set("v.templateNames", data.getReturnValue());
            console.log('sasass: '+data.getReturnValue());            
            component.set('v.recordCount',data.getReturnValue().length);
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
    editTemp : function(component, event, helper) {
    	var temp = event.getSource().get('v.value');    	
    	try{
	    	var compEvent = $A.get("e.gkn_sms:tmpEditEvent");    	
			compEvent.setParams({'editSMSTemp' :temp,'activeTab':'SMSTemplate'});
	        compEvent.fire();
        }
        catch(err)
        {
        	console.log(err);
        }
	},
	
	
	deleteAlert: function(component,event,helper){
		component.set('v.isDelete',true);
		var obj = event.getSource().get('v.value');
		component.set('v.deleteRecord',obj);
	},
	deleteConfirm: function(component,event,helper){
		var obj = event.getSource().get('v.value');
		if(obj=='No'){
			component.set('v.isDelete',false);
			return false;
		}
		else{
			helper.deleteHelper(component,obj);
			component.set('v.isDelete',false);
		}
	}
})
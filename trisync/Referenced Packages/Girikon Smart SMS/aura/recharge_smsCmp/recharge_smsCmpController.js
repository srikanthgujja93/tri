({
	doInit : function(component, event, helper)
    {
        if($A.util.isEmpty(component.get("v.rechargeStatus"))){
            $A.util.addClass(component.find("smsCountInfo"),'slds-show');
            $A.util.addClass(component.find("billingInfo"),'slds-hide');
            $A.util.removeClass(component.find("billingInfo"),'slds-show');
            $A.util.removeClass(component.find("smsCountInfo"),'slds-hide');
        }
        else{
            $A.util.removeClass(component.find("smsCountInfo"),'slds-show');
            $A.util.addClass(component.find("smsCountInfo"),'slds-hide');
            $A.util.addClass(component.find("billingInfo"),'slds-show');
            $A.util.removeClass(component.find("billingInfo"),'slds-hide');
        }
	},
    close:function(component){        
        window.close();
    }
})
({
	helperMethod : function(index) {
		var classes = document.getElementsByClassName('chevronicon');
        var innerContent = classes[index].innerHTML;       
        innerContent = innerContent.replace('chevronright','chevrondown');
        classes[index].innerHTML = innerContent;
        console.log(innerContent);
	},
    expendTreeHelper:function(component){
        
        
    },
    rechargeHelper:function(component){
        component.set("v.activeComponent","recharge");
        component.set('v.activeTree',''); 
        var admConfig = component.find('admin-config');
        var smstemp = component.find('sms-temp');
        var smsfromnum = component.find('sms-fromnum');
        $A.util.addClass(smsfromnum,"slds-is-collapsed");
        $A.util.addClass(admConfig,"slds-is-collapsed");
        $A.util.addClass(smstemp,"slds-is-collapsed"); 
    },
    doInitHelper:function (component){
        var action = component.get("c.getOrgId");
        action.setCallback(this,function(a){            
            component.set("v.sforgid",a.getReturnValue());
        });
        $A.enqueueAction(action);
    }
})
({
    doInit:function(component, event, helper) {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var status = url.searchParams.get("status");
        var chargeid = url.searchParams.get("chargeid");
        if(status!=undefined){
            component.set("v.rechargeStatus",status);
            helper.rechargeHelper(component);
        }
        if(chargeid!=undefined){
            component.set("v.chargeid",chargeid);
        }
        helper.doInitHelper(component);
    },
	expendConfigTree : function(component, event, helper) {        
		var admConfig = component.find('admin-config');
        var smstemp = component.find('sms-temp');
        var smsfromnum = component.find('sms-fromnum');
        $A.util.addClass(smsfromnum,"slds-is-collapsed");
        $A.util.removeClass(admConfig,"slds-is-collapsed");        
        $A.util.addClass(smstemp,"slds-is-collapsed");  
        component.set('v.activeTree','config');
	},
    expendSMSTempTree : function(component, event, helper) {
		var admConfig = component.find('admin-config');
        var smstemp = component.find('sms-temp');
        var smsfromnum = component.find('sms-fromnum');
        $A.util.addClass(smsfromnum,"slds-is-collapsed");
        $A.util.addClass(admConfig,"slds-is-collapsed");
        $A.util.removeClass(smstemp,"slds-is-collapsed");
		component.set('v.activeTree','temp');        
	},
    expendAddFromNumber:function(component, event, helper) {
		var smsfromnum = component.find('sms-fromnum');
        var smstemp = component.find('sms-temp');
        var admConfig = component.find('admin-config');
        $A.util.addClass(smstemp,"slds-is-collapsed");
        $A.util.addClass(admConfig,"slds-is-collapsed");
        $A.util.removeClass(smsfromnum,"slds-is-collapsed");
        component.set('v.activeTree','fromNum');        
	},
	addNewConfigNav:function(component, event, helper){				
		component.set("v.activeComponent","AdminConfig");
		
	},	
	listConfigNav:function(component, event, helper){				
		component.set("v.activeComponent","ListAdminConfig");
	},
    workflowConfigNav:function(component, event, helper){				
		component.set("v.activeComponent","workflowconfig");
	},
    debuglog:function(component, event, helper){				
		component.set("v.activeComponent","debuglog");
	},
    ManageOptout:function(component, event, helper){				
		component.set("v.activeComponent","Optout");
	},
	addSMStempNav:function(component, event, helper){				
		component.set("v.activeComponent","SMSTemplate");
	},
	listSMStempNav:function(component, event, helper){				
		component.set("v.activeComponent","ListSMSTemplate");
	},
    clickFromNum:function(component, event, helper){				
		component.set("v.activeComponent","AddFromNumber");
	},
	home:function(component, event, helper){				
		component.set("v.activeComponent","RightBarContainer");
        component.set('v.activeTree',''); 
        var admConfig = component.find('admin-config');
        var smstemp = component.find('sms-temp');
        var smsfromnum = component.find('sms-fromnum');
        $A.util.addClass(smsfromnum,"slds-is-collapsed");
        $A.util.addClass(admConfig,"slds-is-collapsed");
        $A.util.addClass(smstemp,"slds-is-collapsed"); 
	},
    recharge:function(component, event, helper){
        window.location.href='http://localhost/stripe-payment/?sforgid='+component.get('v.sforgid');
        helper.rechargeHelper(component);
    },
	handleComponentEvent:function(component, event, helper){	
		var message = event.getParam("activeTab");
		component.set("v.activeComponent",message);
	},
	handleConfigEditEvent:function(component, event, helper){	
		var smsConfig = event.getParam("smsConfig");
		var activeTab = event.getParam("activeTab");
		component.set("v.activeComponent",activeTab);
		component.set("v.editConfig",smsConfig);
	},
	handleTempEditEvent:function(component, event, helper){	
		var tempObj = event.getParam("editSMSTemp");
		var activeTab = event.getParam("activeTab");
		component.set("v.activeComponent",activeTab);
		component.set("v.tempEditObj",tempObj);
	}
	
})
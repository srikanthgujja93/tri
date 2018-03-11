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
    createPaymentProcessors: function(component,paymentProcess,paypal,stripe,offline,call) {
		this.upsertPaymentProcessors(component, paymentProcess,paypal,stripe,offline,call, function(a) {
	        var paymentProcesses = component.get("v.paymentProcesses");
	        paymentProcesses.push(a.getReturnValue());
	        component.set("v.paymentProcesses", paymentProcesses);
	      });
	},
    upsertPaymentProcessors : function(component,paymentProcess,paypal,stripe,offline,call) {
	    
        var action = component.get("c.savepaymentprocesses");
	    action.setParams({
	        "paymentProcessors": paymentProcess,
            "paypal" : paypal,
            "stripe" : stripe,
            "offline" : offline,
            "call" : call
	    });
        action.setCallback(this,function(res){            
            var state = res.getState();
            if(state==='SUCCESS'){}
        });
	    $A.enqueueAction(action);
	},
    renderform:function(component){
        var type = component.get('v.newPaymentProcess.wk_wedge__Type__c');
            
        var account = component.getReference('v.newPaypal.wk_wedge__Account__c');
        var status = component.getReference('v.newPaypal.wk_wedge__IS_Active__c');
        var item = component.getReference('v.newPaypal.wk_wedge__Item__c');
        var paymentmode = component.getReference('v.newPaypal.wk_wedge__Mode__c');

    	var companyLogo = component.getReference('v.newStripe.wk_wedge__Companylogo__c');
    	var stripestatus = component.getReference('v.newStripe.wk_wedge__IS_Active__c');
    	var description = component.getReference('v.newStripe.wk_wedge__Company_Description__c');
    	var companyName = component.getReference('v.newStripe.wk_wedge__Company_Name__c');
    	var stripemode = component.getReference('v.newStripe.wk_wedge__Mode__c');
    	var publishableLive = component.getReference('v.newStripe.wk_wedge__Stripe_Publishable_Live_Key__c');
    	var publishableTest = component.getReference('v.newStripe.wk_wedge__Stripe_Publishable_Test_Key__c');
    	var secretLive = component.getReference('v.newStripe.wk_wedge__Stripe_Secret_Live_Key__c');
    	var secretTest = component.getReference('v.newStripe.wk_wedge__Stripe_Secret_Test_Key__c');
            
        var offlindes = component.getReference('v.newOfflineMeth.wk_wedge__Description__c');
				
		var calldes = component.getReference('v.newCall.wk_wedge__Description__c');
		var phn = component.getReference('v.newCall.wk_wedge__Phone_Number__c');
                
        var mode = component.get('v.mode');  
        if(type==''){
            component.set('v.body',[]);
        }else if(type=='PAYPAL'){
            var body =[];
            $A.createComponent(
                "ui:inputText",{
                    "aura:id" : "account",
                    "label" : "Business Account",
                    "class" : "slds-input",
                    "labelClass" : "slds-form-element__label",
                    "class" : "slds-input",
                    "value" : account
                },
                function(newcomponent){
                    if (component.isValid()) {                        
                    		body.push(newcomponent);
                      	component.set("v.body", body);
                    }
                }            
            );//disabled
    			  var selectOption = [];
            for(var i = 0;i<mode.length;i++){
                selectOption.push({ 
                    label: mode[i]['label'],
                    value: mode[i]['value'] 
                });
            }
            $A.createComponent(
                "ui:inputSelect",{
                    "aura:id" : "mode",
                    "label" : "Mode",
                    "class" : "slds-input",
                    "labelClass" : "slds-form-element__label",
                    "class" : "slds-input",
                    "value" : paymentmode,
                    "options" : selectOption
                },
                function(newcomponent){
                    if (component.isValid()) {
                        body.push(newcomponent);
                        component.set("v.body", body);                                                
                    }
                }            
            );   
            $A.createComponent(
                "ui:inputText",{
                    "aura:id" : "item",
                    "label" : "Item",
                    "class" : "slds-input",
                    "labelClass" : "slds-form-element__label",
                    "class" : "slds-input",
                    "value" : item
                },
                function(newcomponent){
                    if (component.isValid()) {
                        body.push(newcomponent);
                        component.set("v.body", body);
                    }
                }            
            ); 
                               
        }else if(type=='STRIPE'){
            var body =[];
            $A.createComponent(
                "ui:inputText",{
                    "aura:id" : "companyName",
                    "label" : "Company Name",
                    "class" : "slds-input",
                    "labelClass" : "slds-form-element__label",
                    "class" : "slds-input",
                    "value" : companyName
                },
                function(newcomponent){
                    if (component.isValid()) {                        
                        body.push(newcomponent);
                        component.set("v.body", body);
                    }
                }            
            );
            $A.createComponent(
                "ui:inputText",{
                    "aura:id" : "companyLogo",
                    "label" : "Company Logo",
                    "class" : "slds-input",
                    "labelClass" : "slds-form-element__label",
                    "class" : "slds-input",
                    "value" : companyLogo
                },
                function(newcomponent){
                    if (component.isValid()) {
                        body.push(newcomponent);
                        component.set("v.body", body);
                    }
                }            
            ); 
            $A.createComponent(
                "ui:inputTextArea",{
                    "aura:id" : "description",
                    "label" : "Description",
                    "class" : "slds-input",
                    "labelClass" : "slds-form-element__label",
                    "class" : "slds-input",
                    "value" : description
                },
                function(newcomponent){
                    if (component.isValid()) {
                        body.push(newcomponent);
                        component.set("v.body", body);
                    }
                }            
            ); 
    		var selectOption = [];
            for(var i = 0;i<mode.length;i++){
                selectOption.push({ 
                    label: mode[i]['label'],
                	  value: mode[i]['value'] 
            	  });
            }
            $A.createComponent(
                "ui:inputSelect",{
                    "aura:id" : "mode",
                    "label" : "Mode",
                    "class" : "slds-input",
                    "labelClass" : "slds-form-element__label",
                    "class" : "slds-input",
                    "value" : stripemode,
                    "options" : selectOption
                },
                function(newcomponent){
                    if (component.isValid()) {
                        body.push(newcomponent);
                        component.set("v.body", body);                                                
                    }
                }            
            );
    		$A.createComponent(
                "ui:inputText",{
                    "aura:id" : "secretTest",
                    "label" : "Sprite Secret Test Key",
                    "class" : "slds-input",
                    "labelClass" : "slds-form-element__label",
                    "class" : "slds-input",
                    "value" : secretTest
                },
                function(newcomponent){
                    if (component.isValid()) {
                        body.push(newcomponent);
                        component.set("v.body", body);
                    }
                }            
            ); 
    		$A.createComponent(
                "ui:inputText",{
                    "aura:id" : "secretLive",
                    "label" : "Sprite Secret Live Key",
                    "class" : "slds-input",
                    "labelClass" : "slds-form-element__label",
                    "class" : "slds-input",
                    "value" : secretLive
                },
                function(newcomponent){
                    if (component.isValid()) {
                        body.push(newcomponent);
                        component.set("v.body", body);
                    }
                }            
            ); 
    		$A.createComponent(
                "ui:inputText",{
                    "aura:id" : "publishableTest",
                    "label" : "Sprite Publishable Test Key",
                    "class" : "slds-input",
                    "labelClass" : "slds-form-element__label",
                    "class" : "slds-input",
                    "value" : publishableTest
                },
                function(newcomponent){
                    if (component.isValid()) {
                        body.push(newcomponent);
                        component.set("v.body", body);
                    }
                }            
            ); 
    		$A.createComponent(
                "ui:inputText",{
                    "aura:id" : "publishableLive",
                    "label" : "Sprite Publishable Live Key",
                    "class" : "slds-input",
                    "labelClass" : "slds-form-element__label",
                    "class" : "slds-input",
                    "value" : publishableLive
                },
                function(newcomponent){
                    if (component.isValid()) {
                        body.push(newcomponent);
                        component.set("v.body", body);
                    }
                }            
            ); 
        }else if(type=='OFFLINE METHODS'){
            var body =[];
			$A.createComponent(
                "ui:inputTextArea",{
                    "aura:id" : "description",
                    "label" : "Description",
                    "class" : "slds-input",
                    "labelClass" : "slds-form-element__label",
                    "class" : "slds-input",
                    "value" : offlindes
                },
                function(newcomponent){
                    if (component.isValid()) {
                        body.push(newcomponent);
                        component.set("v.body", body);
                    }
                }            
            ); 
            
        }else if(type=='CALL'){
            var body =[];
            $A.createComponent(
                "ui:inputtext",{
                    "aura:id" : "number",
                    "label" : "Phone Number",
                    "class" : "slds-input",
                    "labelClass" : "slds-form-element__label",
                    "class" : "slds-input",
                    "value" : phn
                },
                function(newcomponent){
                    if (component.isValid()) {                        
                        body.push(newcomponent);
                        component.set("v.body", body);
                    }
                }            
            );
			$A.createComponent(
                "ui:inputTextArea",{
                    "aura:id" : "calldes",
                    "label" : "Description",
                    "class" : "slds-input",
                    "labelClass" : "slds-form-element__label",
                    "class" : "slds-input",
                    "value" : calldes
                },
                function(newcomponent){
                    if (component.isValid()) {
                        body.push(newcomponent);
                        component.set("v.body", body);
                    }
                }            
            ); 
        }
    }
})
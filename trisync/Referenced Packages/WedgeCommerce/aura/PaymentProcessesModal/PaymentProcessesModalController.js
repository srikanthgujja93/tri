({
	initialize:function(cmp,event,helper){		
        var paymentId = cmp.get("v.PaymentId");        
        var actionMenu = cmp.get("c.getAllSelectOption");
        var obj = [];
        actionMenu.setCallback(this,function(res){
            var state = res.getState();
            if(state=='SUCCESS'){
                var result = res.getReturnValue();
                obj = helper.getSelectOptions(cmp,result.paymentType);
                cmp.set('v.type',obj);
                
                obj = [];
                obj = helper.getSelectOptions(cmp,result.envMode);
                cmp.set('v.mode',obj);
            }
        });
        $A.enqueueAction(actionMenu);
        if(paymentId!=null){
            var action = cmp.get("c.getpaymentProcessRow");
            var con = cmp.find("content"); 
                action.setParams({
                    "paymentId" : paymentId
                });            
                action.setCallback(this,function(res){
                    var state = res.getState();
                    if(state=='SUCCESS'){
                                                
                        cmp.set('v.newPaymentProcess',res.getReturnValue());
						var result = cmp.get('v.newPaymentProcess');                       
                        var type = cmp.get("v.newPaymentProcess.wk_wedge__Type__c");
                        if(type=='PAYPAL'){
                    		cmp.set('v.newPaypal',result.wk_wedge__PayPal__r);
                        }else if(type=='STRIPE'){
                            cmp.set('v.newStripe',result.wk_wedge__Stripe__r);
                        }else if(type=='OFFLINE METHODS'){
                            cmp.set('v.newOfflineMeth',result.wk_wedge__Offline_Payment_Mode__r);
                        }else if(type=='CALL'){
                            cmp.set('v.newCall',result.wk_wedge__Call__r);                             
                        }
                        helper.renderform(cmp);                        
                    }
                });
            $A.enqueueAction(action);            
        }        
        var cmpTarget = cmp.find('Modalbox');
       	var cmpBack = cmp.find('MB-Back');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open'); 
    },
  	renderForm:function(component,event,helper){
        helper.renderform(component);
    },
    applycss:function(component,event,helper){
    	helper.applycss(component);  
    },
    handleremovecss:function(cmp,event){
	    var cmpTarget = cmp.find('Modalbox');
       	var cmpBack = cmp.find('MB-Back');
        $A.util.removeClass(cmpBack,'slds-backdrop--open');
	    $A.util.removeClass(cmpTarget, 'slds-fade-in-open');
	},
    createPaymentProcessors:function(component, event, helper) {
		var nameField = component.find("name");                       
        var nm = nameField.get("v.value");
        if(nm==''){
            nameField.set("v.errors", [{message:"This is a required Field."}]);
        }else{
            nameField.set("v.errors", null);            
            var newPaymentProcess = component.get("v.newPaymentProcess");
            var type = component.get("v.newPaymentProcess.wk_wedge__Type__c");
            if(component.get("v.newPaymentProcess.wk_wedge__IS_Active__c")){ 
                if(type=='PAYPAL'){
                    component.set("v.newPaypal.wk_wedge__Is_Active__c",true);
                    component.set("v.newPaymentProcess.wk_wedge__External_ID__c",'PAYPAL'+nm);
                    component.set("v.newStripe",null);
                    component.set("v.newOfflineMeth",null);
                    component.set("v.newCall",null);
                }else if(type=='STRIPE'){
                    component.set("v.newStripe.wk_wedge__Is_Active__c",true);
                    component.set("v.newPaymentProcess.wk_wedge__External_ID__c",'STRIPE'+nm);
                    component.set("v.newPaypal",null);
                    component.set("v.newOfflineMeth",null);
                    component.set("v.newCall",null);
                }else if(type=='OFFLINE METHODS'){
                    component.set("v.newOfflineMeth.wk_wedge__Is_Active__c",true);
                    component.set("v.newPaymentProcess.wk_wedge__External_ID__c",'OFFLINE METHODS'+nm);
                	component.set("v.newPaypal",null);
                    component.set("v.newStripe",null);
                    component.set("v.newCall",null);
                }else if(type=='CALL'){
                    component.set("v.newCall.wk_wedge__Is_Active__c",true);
                    component.set("v.newPaymentProcess.wk_wedge__External_ID__c",'CALL'+nm);
                	component.set("v.newPaypal",null);
                    component.set("v.newOfflineMeth",null);
                    component.set("v.newStripe",null);
                }
            }
            var newPaypal = component.get("v.newPaypal");           
            var newStripe = component.get("v.newStripe");
            var newOfflineMeth = component.get("v.newOfflineMeth");
            var newCall = component.get("v.newCall");
            helper.createPaymentProcessors(component,newPaymentProcess,newPaypal,newStripe,newOfflineMeth,newCall);
            var updateList = component.getEvent("UpdateEvent");
            updateList.fire();
            var compEvent = component.getEvent("RemoveComponent");
            compEvent.setParams({
                "comp" : component
            });
	    	compEvent.fire();            
        } 
	},
    removeComponent:function(component, event, helper){
        var compEvent = component.getEvent("RemoveComponent");
        compEvent.setParams({
        	"comp" : component
        });
	    compEvent.fire();    	
    }    
})
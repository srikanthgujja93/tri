({
	doInit : function(component, event, helper) {    	
        var action1 = component.get("c.getObjName"); 
        var inputsel =  component.find("objectName");
		helper.checkThemeHelper(component)        ;
        var opts=[];
        action1.setCallback(this, function(a) {
        	opts.push({"class": "optionClass", label: "None", value: ""});
            for(var i=0;i< a.getReturnValue().length;i++){
                opts.push({"class": "optionClass", label: a.getReturnValue()[i], value: a.getReturnValue()[i]});
            }
            inputsel.set("v.options", opts);     
            if(!$A.util.isEmpty(inputsel.get('v.value')))
            helper.getFieldHelper(component);   
            var spinner = component.find("loading");
            $A.util.removeClass(spinner, "slds-show");
            $A.util.addClass(spinner, "slds-hide");
        });
        $A.enqueueAction(action1);
    },
    cancelSMSTemp:function(component, event, helper){    	
    	component.set('v.smsTemplate',{
    		'sobjectType' : 'SMSTemplate__c',
			'Name' : '',
			'Object_Name__c' : '',
			'SMS_Body__c' : ''
    	});        
		var compEvent = $A.get("e.gkn_sms:smsApp");
        if(compEvent){
            compEvent.setParams({"activeTab" :"ListSMSTemplate" });
            compEvent.fire();   
        }        
    },
    addNewTemp:function(component, event, helper){
    	event.preventDefault();    	
    	var smsTemplate = component.get('v.smsTemplate');
    	var addNewTempAction = component.get("c.saveTemplate");
    	if(!helper.isValidate(component)){
    		return false;
    	}
    	addNewTempAction.setParams({
    		"template":smsTemplate
    	});
    	//Do validation
    	console.log(smsTemplate);
    	addNewTempAction.setCallback(this,function(a){    	   
    	    if (a.getState()=== "SUCCESS") {
				component.set('v.msg','Saved!');
				smsTemplate.sobjectType ="SMSTemplate__c";
				smsTemplate.Name='';
				smsTemplate.Object_Name__c='None';
				smsTemplate.SMS_Body__c='';
				component.set('v.smsTemplate',smsTemplate);	
                
                //Show Toast start here
                var toast = $A.get("e.force:showToast");
                if (toast){
					var msg = '';
                    if(smsTemplate.id!=null){
                        msg = 'Template have been updated!';
                    }else{
                        msg = 'Template have been created!';
                    }
                    toast.setParams({
                        "title": "Success!",
                        "type" : "success",
                        "message": msg
                    });
                    toast.fire();
                }
                //Toast code end here
                
				var compEvent = $A.get("e.gkn_sms:smsApp");
				compEvent.setParams({"activeTab" :"ListSMSTemplate" });
		        compEvent.fire();
				
			} else if (a.getState()=== "INCOMPLETE") {
				console.log("User is offline, device doesn't support drafts.");
			} else if (a.getState()=== "ERROR") {
				console.log('Problem saving template, error: '+ JSON.stringify(a.getError()));
			} else {
				console.log('Unknown problem, state: '+ a.state + ', error: '+ JSON.stringify(a.getError()));
			}    		
    	});    	
    	$A.enqueueAction(addNewTempAction);    	
    },
    changeObject:function(component, event, helper){
    	helper.getFieldHelper(component);
    },
    changeField:function(component, event, helper){
    	helper.setMergeField(component);
    },
    selectMergeField:function(component,event,helper){
    	/*var input = component.find("mergeField");
    	console.log(input);		
		input.setSelectionRange(0, input.length);
		input.focus();*/
    }
})
({
    doInit : function(component, event, helper) {    	        
        var action1 = component.get("c.getObjName"); 
        var inputsel =  component.find("objectName");        
        helper.checkThemeHelper(component);
        helper.getFromNumberHelper(component);
        helper.getAllConfigHelper(component);
        var opts=[];
        action1.setCallback(this, function(a) {
            opts.push({"class": "optionClass", label: "None", value: ""});
            for(var i=0;i< a.getReturnValue().length;i++){
                opts.push({"class": "optionClass", label: a.getReturnValue()[i], value: a.getReturnValue()[i]});
            }
            inputsel.set("v.options", opts);                         
            var spinner = component.find("loading");
            $A.util.removeClass(spinner, "slds-show");
            $A.util.addClass(spinner, "slds-hide");
        });        
        $A.enqueueAction(action1);
    },
    changeObject12:function(component, event, helper){        
        var objName = component.find('objectName').get('v.value');
        //component.set('v.smsBody','');
        console.log('OBJECT CHANGED');
        helper.getFieldHelper(component);
        helper.getTempHelper(component,objName);
    },
    changeTemplate:function(component, event, helper){
        var objName = component.find('objectName').get('v.value');
        var tempId = component.find('tempList').get('v.value');
        helper.getTempBodyHelper(component,tempId,objName);
    },
    
    cancelConfig:function(component, event, helper){
        var workflowConfig = component.get('v.workflowConfig');
        component.set('v.workflowConfig',{
            'sobjectType':'WorkflowConfig__c',
            'Name':'',
            'gkn_sms__Object_Name__c':'',
            'gkn_sms__toNumber__c':'',
            'gkn_sms__isSaveInCustomObj__c':true,
            'gkn_sms__FromNumber__c':'',
            'gkn_sms__Template_Id__c':''
        });
        component.find("tempList").set("v.value","");
        component.find("tempBody").set("v.value","");
        component.set('v.smsBody','');
        component.find('savebutton').set('v.label','Save Workflow Config');
        $A.util.addClass(component.find('matcherKey'),'slds-hide');
        $A.util.removeClass(component.find('matcherKey'),'slds-show');
    },
    addNewConfig:function(component, event, helper){
        event.preventDefault();
        var smsSpinner = component.find('smsSpinner');
        $A.util.addClass(smsSpinner,'show');
        $A.util.removeClass(smsSpinner,'hide');
        var workflowConfig = component.get('v.workflowConfig');
        var addNewConfigAction = component.get("c.saveWorkflowConfig");
        if(!helper.isValidate(component)){ 	
            $A.util.removeClass(smsSpinner,'show');
            $A.util.addClass(smsSpinner,'hide');
            return false;
        }else{    	
            workflowConfig.gkn_sms__isSaveInCustomObj__c = true;
            workflowConfig.gkn_sms__Template_Id__c = component.find('tempList').get('v.value');
            addNewConfigAction.setParams({
                "workflowConfigObject":workflowConfig
            });                        
            addNewConfigAction.setCallback(this,function(a){    	   
                if (a.getState()=== "SUCCESS") {                    
                    component.set('v.workflowConfig',{
                        'sobjectType':'WorkflowConfig__c',
                        'Name':'',
                        'gkn_sms__Object_Name__c':'',
                        'gkn_sms__toNumber__c':'',
                        'gkn_sms__isSaveInCustomObj__c':false,
                        'gkn_sms__FromNumber__c':'',
                        'gkn_sms__Template_Id__c':''
                    });	
                    component.set('v.smsBody','');   
                    component.find("tempList").set("v.value","");
                    component.find("tempBody").set("v.value","");
                    component.set('v.matchKey',a.getReturnValue().gkn_sms__Matcher_Key__c);
                    $A.util.addClass(component.find('matcherKey'),'slds-show');
                    $A.util.removeClass(component.find('matcherKey'),'slds-hide');
                    $A.util.addClass(smsSpinner,'hide');
                    $A.util.removeClass(smsSpinner,'show');
                    helper.getAllConfigHelper(component);
                }   		
            });    	
            $A.enqueueAction(addNewConfigAction);
        }
    },
    selectCheckbox:function(component,event,helper){
        alert(0);
    },
    editFromNumber:function(component, event, helper){    	    	
    	var record = event.getSource().get('v.value');                
        record.FromNumber__c = record.gkn_sms__Country_Code__c + '_' +record.gkn_sms__FromNumber__c;
		component.set('v.workflowConfig',record);           
        component.find('savebutton').set('v.label','Update');
        component.set('v.matchKey',record.gkn_sms__Matcher_Key__c);
        helper.getFieldHelper(component); 
        
        var objectName = component.find('objectName').get('v.value');
        helper.getTempHelper(component,objectName);
        
        helper.getTempBodyHelper(component,record.gkn_sms__Template_Id__c,objectName);
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
    },
})
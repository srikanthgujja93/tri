({
    doInit : function(component, event, helper) {    	        
        var action1 = component.get("c.getObjName"); 
        var inputsel =  component.find("objectName");        
        helper.checkThemeHelper(component);
        var opts=[];
        action1.setCallback(this, function(a) {
            opts.push({label: "None", value: ""});
            for(var i=0;i< a.getReturnValue().length;i++){
                opts.push({label: a.getReturnValue()[i], value: a.getReturnValue()[i]});
            }
            inputsel.set("v.options", opts);            
            helper.getFieldHelper(component);   
            var spinner = component.find("loading");
            $A.util.removeClass(spinner, "slds-show");
            $A.util.addClass(spinner, "slds-hide");
        });
        $A.enqueueAction(action1);
    },
    changeObject12:function(component, event, helper){
        helper.getLayoutList(component);
        helper.getFieldHelper(component);
        helper.checkPageAndBtn(component);
    },
    
    cancelConfig:function(component, event, helper){
        var smsConfig = component.get('v.smsConfig');
        component.set('v.smsConfig',{
            'sobjectType':'GirikonSMSConfig2__c',
            'Name':'',
            'gkn_sms__Object_Name__c':'',
            'gkn_sms__toNumber__c':'',
            'gkn_sms__isSaveInCustomObj__c':true
        });
        var compEvent = $A.get("e.gkn_sms:smsApp");
        compEvent.setParams({"activeTab" :"ListAdminConfig" });
        compEvent.fire();
    },
    addNewConfig:function(component, event, helper){
        var spinner = component.find("smsSpinner");
        $A.util.removeClass(spinner, "slds-hide");
        event.preventDefault();    	
        var smsConfig = component.get('v.smsConfig');
        var addNewConfigAction = component.get("c.saveConfig");
        if(!helper.isValidate(component)){ 	
            $A.util.addClass(spinner, "slds-hide");
            return false;
        }else{              
            smsConfig.gkn_sms__isSaveInCustomObj__c = true;            
            addNewConfigAction.setParams({
                "config":smsConfig,
                "listStrings":component.get("v.layoutList"),
                "pageAndBtnStr":JSON.stringify(component.get("v.pageAndBtnStatus"))
            });                        
            addNewConfigAction.setCallback(this,function(a){    	   
                var res = JSON.parse(a.getReturnValue());
                if(res.status=='warning' || res.status=='error'){
                    component.find('objectName').set("v.errors",[{message:res.message}]);
                    $A.util.addClass(spinner, "slds-hide");
                    return false;
                }else{
                    component.find('objectName').set("v.errors",null); 
                }
                if (a.getState()=== "SUCCESS") {
                    component.set('v.msg','Saved!');
                    component.set('v.smsConfig',{
                        'sobjectType':'GirikonSMSConfig2__c',
                        'Name':'',
                        'gkn_sms__Object_Name__c':'',
                        'gkn_sms__toNumber__c':'',
                        'gkn_sms__isSaveInCustomObj__c':false
                    });
                    //Show Toast start here
                    var toast = $A.get("e.force:showToast");
                    if (toast){
                        var msg = '';
                        if(smsConfig.id!=''){
                            msg = 'Configuration have been updated!';
                        }else{
                            msg = 'A new Config has been saved!';
                        }
                        toast.setParams({
                            "title": "Success!",
                            "type" : "success",
                            "message": msg
                        });
                        toast.fire();                        
                        var navEvt = $A.get("e.force:navigateToSObject");
                        navEvt.setParams({
                            "recordId": res.Id,
                            "slideDevName": "detail"
                        });
                        navEvt.fire();                        
                    }
                    //Toast code end here
                    
                    var compEvent = $A.get("e.gkn_sms:smsApp");
                    compEvent.setParams({"activeTab" :"ListAdminConfig" });
                    compEvent.fire();
                    
                } else if (a.getState()=== "INCOMPLETE") {
                    console.log("User is offline, device doesn't support drafts.");
                } else if (a.getState()=== "ERROR") {
                    console.log('Problem saving template, error: '+ JSON.stringify(a.getError()));
                } else {
                    console.log('Unknown problem, state: '+ a.state + ', error: '+ JSON.stringify(a.getError()));
                }      
                $A.util.addClass(spinner, "slds-hide");
            });    	
            $A.enqueueAction(addNewConfigAction);
        }
    },
    selectCheckbox:function(component,event,helper){
        alert(0);
    }
})
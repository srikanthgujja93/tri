/**
 *  @Author : Sudip Halder
 *  @Date : 12/June/2017 
 *  @Description : This handler has getTaskDetails() function to fatch the task records based on record Id.
 */

({
    getTaskDetails : function(component, taskId) {
        var action = component.get("c.getTaskById");
        action.setParams({
            "taskId" : taskId
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            var result = response.getReturnValue();
            if(component.isValid() && state === 'SUCCESS') {
               /* if(response.getReturnValue().Related_Record__c != null) {
                    
                    var action1 = component.get("c.getSMSTempByObjId");
                    action1.setParams({
                        "ObjectId" : response.getReturnValue().Related_Record__c
                    });
                    action1.setCallback(this, function(response1){
                        var state1 = response1.getState();
                        if(component.isValid() && state1 === 'SUCCESS') { 
                        	component.set("v.SMSTemplates", response1.getReturnValue());   
                        }
                    });
                    $A.enqueueAction(action1);
                } */
                component.set("v.Task", response.getReturnValue());
                component.set("v.SMSTemplates", "");          
            }
        });        
        $A.enqueueAction(action);
    },    
    sendReply : function(component, task, message) {
        var spinner = component.find("smsSpinner");
        $A.util.removeClass(spinner,"slds-hide");
        var action = component.get("c.sendReplyMsg");
        action.setParams({
            "task" : task,
            "msg" : message,
            "key" : component.get("v.key")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            var result = null;
            if(response.getReturnValue()!='failed' && response.getReturnValue()!=null)
            {	
                result = JSON.parse(response.getReturnValue());
                var toastEvent = $A.get("e.force:showToast");
                var type = result.status;
                var title = 'Success!';
                if(type!=='QUEUED'){
                	type = 'error';
                	title = 'Error!';
            	}else{
            		type = 'success';
            	}
                 
                if(toastEvent)
                {
                    toastEvent.setParams({
                        "title": title,
                        "type" : type,
                        "message": result.errorMessage
                    });
                    toastEvent.fire();     
                    $A.get('e.force:refreshView').fire();       
                }
                else
                {   
                    component.set("v.isClassic",true);
                    component.set("v.message",result.errorMessage);
                    component.set("v.messageType",type);
                    component.set("v.messageTitle",title);
                }
            }
            $A.util.addClass(spinner,"slds-hide");
        });
        $A.enqueueAction(action);
        
    },
    
    validateFields : function(component) {
    	var IsValid = true;
        var message = component.find('comments').get('v.value');
        
        if($A.util.isEmpty(message) ) {
            component.find('comments').set('v.errors',[{ message : 'Please fill message' }]);
            IsValid = false;
        } else{
            component.find('comments').set('v.errors',null);
        }
        
        return IsValid;
	}
})
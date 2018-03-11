/**
 *  @Author : Sudip Halder
 *  @Date : 14/June/2017 
 *  @Description : This controller has doInit function 
 */

({
    doInit : function(component, event, helper) {
    	$A.util.removeClass(component.find("template"),"select");
    	var taskId = component.get("v.TaskID");
    	helper.getTaskDetails(component,taskId);
    	component.find("comments").set("v.errors", null);
    	component.set("v.msgBody", "");
    },
    
    getTempBody : function(component, event, helper) {
        var selected = component.find("template").get("v.value");
        var cmp = component.get('v.SMSTemplates');
        if(selected === 'None')
        	component.set("v.msgBody","");    
        else{
        	for(var i=0; i < cmp.length; i++) {
                if(selected === cmp[i].Id ) {
                    var bdy = cmp[i].SMS_Body__c;
                    component.set("v.msgBody",bdy);
                }
        	}       
        }        
    },
    closeAlert:function(component, event, helper){
    	component.set("v.isClassic",false);
    	/*if(component.get("v.messageType")!=='error'){
    		window.opener.location.reload();
    	}*/
    	window.close();
    },
    replyMsg : function(component, event, helper) {
        
        if( helper.validateFields(component) ) {        	
            var task = component.get("v.Task");	  
        	var message = component.find('comments').get('v.value');
			helper.sendReply(component, task, message);	 
        }
	}
    
})
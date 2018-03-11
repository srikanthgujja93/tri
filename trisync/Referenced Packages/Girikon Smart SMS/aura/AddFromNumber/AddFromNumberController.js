({
    doInit : function(component, event, helper) {        
        helper.checkThemeHelper(component);
        helper.getAllNum(component);
    },
    closeToast:function(component, event, helper) {
        component.set("v.hasMessage","");
        component.set("v.messageType","");
    },
    addNewNumber:function(component, event, helper){
        var addNew = component.get('v.addNew');
        var addNewNumAction = component.get("c.saveNumber");
        if(!helper.isValidate(component)){
            return false;
        }
        addNewNumAction.setParams({
            "addNewNumber":addNew
        });
        //Do validation
        console.log(addNew);
        addNewNumAction.setCallback(this,function(a){    	   
            if(a.getState()=== "SUCCESS") {
                //Show Toast start here
                var toast = $A.get("e.force:showToast");
                if(toast){
                    var msg = '';
                    if(addNew.id!=''){
                        msg = addNew.Name+' was updated!';
                    }else{
                        msg = 'A new Config has been saved!';
                    }
                    toast.setParams({
                        "title": "Success!",
                        "type" : "success",
                        "message": msg
                    });
                    toast.fire();
                }
                //Toast code end here
                component.set('v.addNew',{'sobjectType': 'From_Numbers__c','Name':'','gkn_sms__Mobile__c':'','gkn_sms__Country_Code__c':''});
                helper.getAllNum(component);				
            } 
        });    	
        $A.enqueueAction(addNewNumAction); 
    },
    editFromNumber:function(component, event, helper){    	    	
    	var obj = event.getSource().get('v.value');
		component.set('v.addNew',obj);
        //component.find('savebutton').set('v.label','Update');
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
    cancelAction:function(component,event,helper){
        component.set('v.addNew',{'sobjectType': 'From_Numbers__c','Name':'','gkn_sms__Country_Code__c':'','gkn_sms__Mobile__c':''});
        var savebtn = component.find('savebutton');
        if(savebtn){
            savebtn.set('v.label','Save');
        }
    }
})
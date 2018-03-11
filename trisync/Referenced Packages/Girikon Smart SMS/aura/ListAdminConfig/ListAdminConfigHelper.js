({
    deleteHelper:function(cmp,record){
    	var delAction = cmp.get("c.deleteConfig");
    	delAction.setParams({'record':record});    	
        delAction.setCallback(this, function(a) {            
            if (a.getState()=== "SUCCESS") { 
                var obj = a.getReturnValue();
                cmp.set("v.hasMessage", obj.message);
            	cmp.set("v.messageType", obj.messageType);
                cmp.set("v.configNames", obj.smsConfig);
            }
        });
        $A.enqueueAction(delAction);
    }
})
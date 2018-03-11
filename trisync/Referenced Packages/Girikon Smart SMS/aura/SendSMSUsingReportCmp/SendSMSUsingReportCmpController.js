({
	doInit : function(component, event, helper) 
    {
		helper.getObjectListHelper(component);
        helper.getBulkSMSReportHelper(component);
        helper.getFromNumberHelper(component);
        helper.getSMSBalanceHelper(component);        
	},
    objectChange:function(component,event,helper)
    {
       	var fromNo=component.find('fromNumber');
    	fromNo.set('v.value','');
    	fromNo.set('v.errors',null);
    	var objectName = event.getSource().get('v.value');
        component.set('v.objectName',objectName);    
        component.set('v.templateBody','');
        helper.getToNumberFieldByObjectNameHelper(component,objectName);
        helper.getTemplateHelper(component,objectName);        
    },
    templateChange:function(component,event,helper)
    {
    	var templateId = event.getSource().get('v.value');
        helper.getTempBodyHelper(component,templateId);
    },
    testSendSMS:function(component,event,helper){
        if(!helper.validateForm(component))
        {
         	return false;   
        }
        else
        {
            var validRecord = component.get('v.validRecord');
            var action = component.get('c.getUpdatedSMSBalance');
            action.setCallback(this,function(res){
                var obj = JSON.parse(res.getReturnValue());                
                if(obj.balanceSMS>=validRecord){
                    event.getSource().set('v.disabled',true);
                    helper.startApexBatchHelper(component,event);
                }else{
                    alert('You are able to send only '+obj.balanceSMS+' SMS.');
                }
            });
            $A.enqueueAction(action);
        }
    },
    getUpdatedBalanceAction:function(component,event,helper){        
        helper.getUpdatedBalanceHelper(component);
    },
    closeToast:function(component, event, helper) {
        component.set('v.message','');
    },
   changeFromNumber:function(component, event, helper) {
       var num = event.getSource().get('v.value');
       if(!$A.util.isEmpty(num))
       {
           var objName=component.get('v.objectName');
           if($A.util.isEmpty(objName)){
               event.getSource().set('v.errors',[{message:"Please select an object."}]);
               component.set("v.showReport",false);
           }
           else{
               var countryCode = num.split('_')[0];
               component.set("v.countryCode",countryCode);
               helper.getRecordCountByObjectHelper(component,component.get('v.objectName'),component.get('v.toNumberField'));
               component.set("v.showReport",true);
           }
       }else{
    		 event.getSource().set('v.errors',null);
    	}  
    },
})
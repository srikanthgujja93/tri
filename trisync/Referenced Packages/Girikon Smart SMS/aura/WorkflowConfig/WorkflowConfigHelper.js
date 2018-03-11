({
    getFieldHelper:function(cmp){
        var fieldAction = cmp.get('c.getFieldName');                
        var objectName = cmp.find('objectName').get('v.value');		
        var toNumberField = cmp.get('v.workflowConfig.toNumber__c');
        
        if(!$A.util.isEmpty(objectName)){
            fieldAction.setParams({
                'selObj':objectName
            });			
            fieldAction.setCallback(this,function(a){			
                if(a.getState()=='SUCCESS')
                {
                    var opts=[];
                    //opts.push({"class": "optionClass", label: "None", value: ""});
                    console.log(a.getReturnValue());	        	
                    for(var i=0;i< a.getReturnValue().length;i++){
                        opts.push({label: a.getReturnValue()[i].split('###')[1], value: a.getReturnValue()[i].split('###')[0]});
                    }
                    cmp.find('fieldName').set("v.options", opts);                    
                    cmp.find('fieldName').set('v.value',toNumberField);
                }
            });
            $A.enqueueAction(fieldAction);
        }
    },
    getTempHelper:function(cmp,objectName){
        var templateAction = cmp.get('c.getworkflowTemplate');        
        templateAction.setParams({'objName':objectName});
        var opts1=[];
        templateAction.setCallback(this,function(a){           
            opts1.push({label: "None", value: ""});                
            for(var i=0;i< a.getReturnValue().length;i++){
                opts1.push({label: a.getReturnValue()[i]["Name"], value: a.getReturnValue()[i]["Id"]});
            }
            cmp.find('tempList').set('v.options',opts1);
            var templateId = cmp.get('v.workflowConfig.Template_Id__c');			
            cmp.find('tempList').set('v.value',templateId);
        });
        $A.enqueueAction(templateAction);
    },
    getTempBodyHelper:function(cmp,tempId,objectName){
        var smsBodyAction = cmp.get('c.getworkflowTemplateBody');
        console.log('TemplateId'+tempId+',objectName:'+objectName);
        smsBodyAction.setParams({'tempId':tempId,'objName':objectName});            
        smsBodyAction.setCallback(this,function(a){
            cmp.find('tempBody').set('v.value',a.getReturnValue());			
        });
        $A.enqueueAction(smsBodyAction);
    },
    checkThemeHelper:function(component){
        var action = component.get("c.getUIThemeDescription");
        action.setCallback(this, function(a) {
            if(a.getReturnValue()=='Theme4t'){
                $A.util.addClass(component.find('mobileAction'),'slds-show');
                $A.util.addClass(component.find('desktopAction'),'slds-hide');
            }else{
                $A.util.removeClass(component.find('desktopAction'),'slds-hide');
            }
        });
        $A.enqueueAction(action);
    },
    deleteHelper:function(component,record){
        var delAction = component.get("c.deleteConfig");
    	delAction.setParams({'record':record});    	
        delAction.setCallback(this, function(a) {            
            if (a.getState()=== "SUCCESS") { 
            	component.set("v.workflowList", a.getReturnValue());
            }
        });
        $A.enqueueAction(delAction);
    },
    getAllConfigHelper:function(component){
        var action = component.get("c.getAllWorkflowConfig");
        action.setCallback(this, function(a) {
            component.set('v.workflowList',a.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    getFromNumberHelper:function(cmp){    	
    	 var opts1=[];
            var configAction2 = cmp.get('c.getFromNumberAction');
                       
            configAction2.setCallback(this,function(a){                                
                for(var i=0;i< a.getReturnValue().length;i++){
                	if(a.getReturnValue()[i]=='None'){
                		opts1.push({label: "None", value: ""});
                	}else{
                		opts1.push({label: a.getReturnValue()[i].replace("_",""), value: a.getReturnValue()[i]});
                	}
                }
                cmp.find('fromNumber').set('v.options',opts1);			
            });
            $A.enqueueAction(configAction2);
    },
    isValidate:function(cmp){
        var isExist;
        var isValid=true;
        var configName = cmp.find('configName').get('v.value');
        if($A.util.isEmpty(configName)){
            isValid=false;
            cmp.find('configName').set("v.errors",[{message:"Please enter workflow configuration name."}]);            
        } else{
            cmp.find('configName').set("v.errors",null);
        }
        var objectName = cmp.find('objectName').get('v.value');
        if($A.util.isEmpty(objectName)){
            isValid=false;
            cmp.find('objectName').set("v.errors",[{message:"Please select object an object"}]);            
        }else{
            cmp.find('objectName').set("v.errors",null);
        }
        var fieldName = cmp.find('fieldName').get('v.value');
        if($A.util.isEmpty(fieldName)){
            isValid=false;
            cmp.find('fieldName').set("v.errors",[{message:"Please select to number field"}]);            
        } else{
            cmp.find('fieldName').set("v.errors",null);
        }
        var selectedTemp = cmp.find('tempList').get('v.value');
        if($A.util.isEmpty(selectedTemp)){
            isValid=false;
            cmp.find('tempList').set("v.errors",[{message:"Please select SMS template."}]);            
        } else{
            cmp.find('tempList').set("v.errors",null);
        }
         var fromNumber = cmp.find('fromNumber').get('v.value');
        if($A.util.isEmpty(fromNumber)){
            isValid=false;
            cmp.find('fromNumber').set("v.errors",[{message:"Please select from number"}]);            
        } else{
            cmp.find('fromNumber').set("v.errors",null);
        }
        return isValid;
    }
})
({
    getLayoutList:function(cmp){
    	var fieldAction = cmp.get('c.getObjectLayout');
        var objName = cmp.find('objectName').get('v.value');		
        if(!$A.util.isEmpty(objName)){
            fieldAction.setParams({
                'objectName':objName
            });			
            fieldAction.setCallback(this,function(a){			
                if(a.getState()=='SUCCESS')
                {
                    cmp.set("v.layoutList",a.getReturnValue());
                }
            });
            $A.enqueueAction(fieldAction);
        }
    },
    checkPageAndBtn:function(cmp){
        var action = cmp.get('c.isBulkSMSPageExist');
        var objName = cmp.find('objectName').get('v.value');		
        if(!$A.util.isEmpty(objName)){
            action.setParams({
                'objectName':objName
            });			
            action.setCallback(this,function(a){			
                if(a.getState()==='SUCCESS')
                {
                    cmp.set("v.pageAndBtnStatus",a.getReturnValue());
                    //alert(JSON.stringify(a.getReturnValue()));
                }
            });
            $A.enqueueAction(action);
        }
    },
    getFieldHelper:function(cmp){
        var fieldAction = cmp.get('c.getFieldName');
        var objName = cmp.find('objectName');
        var fieldName = cmp.find('fieldName');
        var name1 = objName.get('v.value');		
        if(!$A.util.isEmpty(name1)){
            fieldAction.setParams({
                'selObj':name1
            });			
            fieldAction.setCallback(this,function(a){			
                if(a.getState()=='SUCCESS')
                {
                    var opts=[];
                    //opts.push({"class": "optionClass", label: "None", value: ""});
                    console.log(a.getReturnValue());	        	
                    for(var i=0;i< a.getReturnValue().length;i++){
                        opts.push({"class": "optionClass", label: a.getReturnValue()[i].split('###')[1], value: a.getReturnValue()[i].split('###')[0]});
                    }
                    fieldName.set("v.options", opts);
                }
            });
            $A.enqueueAction(fieldAction);
        }
    },
    checkThemeHelper:function(component){
        var action = component.get("c.getUIThemeDescription");
        action.setCallback(this, function(a) {
            if(a.getReturnValue()=='Theme4t'){
                $A.util.addClass(component.find('mobileAction'),'slds-show');
                $A.util.addClass(component.find('desktopAction'),'slds-hide');
                
                var configcontainer = component.find('configcontainer');
                $A.util.removeClass(configcontainer,'slds-grid');      
                $A.util.addClass(configcontainer,'slds-size--12-of-12');
                $A.util.removeClass(component.find('objectNameLabel'),'slds-select_container');
                $A.util.removeClass(component.find('toNumberLabel'),'slds-select_container');
            }else{
                $A.util.removeClass(component.find('desktopAction'),'slds-hide');
            }
        });
        $A.enqueueAction(action);
    },
    isValidate:function(cmp){
        var isExist;
        var isValid=true;
        var configName = cmp.find('configName').get('v.value');
        if($A.util.isEmpty(configName)){
            isValid=false;
            cmp.find('configName').set("v.errors",[{message:"please provide config name"}]);            
        } else{
            cmp.find('configName').set("v.errors",null);
        }
        var objectName = cmp.find('objectName').get('v.value');
        if($A.util.isEmpty(objectName)){
            isValid=false;
            cmp.find('objectName').set("v.errors",[{message:"please select object"}]);            
        }else{
            cmp.find('objectName').set("v.errors",null);
        }
        var fieldName = cmp.find('fieldName').get('v.value');
        if($A.util.isEmpty(fieldName)){
            isValid=false;
            cmp.find('fieldName').set("v.errors",[{message:"please select field"}]);            
        } else{
            cmp.find('fieldName').set("v.errors",null);
        }
        
        return isValid;
    }
})
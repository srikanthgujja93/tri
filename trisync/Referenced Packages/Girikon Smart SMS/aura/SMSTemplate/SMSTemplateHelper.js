({
	getFieldHelper:function(cmp){
		var fieldAction = cmp.get('c.getFieldName');
		var objName = cmp.find('objectName');
		var fieldName = cmp.find('fieldName');
				
		fieldAction.setParams({
			'selObj':objName.get('v.value')
		});
		
		fieldAction.setCallback(this,function(a){			
			if(a.getState()=='SUCCESS')
        	{
	        	var opts=[];
	        	opts.push({"class": "optionClass", label: "None", value: ""});
	        	console.log(a.getReturnValue());
	        	for(var i=0;i< a.getReturnValue().length;i++){
	                opts.push({"class": "optionClass", label: a.getReturnValue()[i].split('###')[1], value: a.getReturnValue()[i].split('###')[0]});
	            }
            	fieldName.set("v.options", opts);
            }
		});
		$A.enqueueAction(fieldAction);
		
	},
    checkThemeHelper:function(component){
        var action = component.get("c.getUIThemeDescription");
        action.setCallback(this, function(a) {
            if(a.getReturnValue()=='Theme4t'){
                $A.util.addClass(component.find('mobileAction'),'slds-show');
                $A.util.addClass(component.find('desktopAction'),'slds-hide');
                
                var tempcontainer = component.find('tempcontainer');
                $A.util.removeClass(tempcontainer,'slds-grid');      
                $A.util.addClass(tempcontainer,'slds-size--12-of-12');
                $A.util.removeClass(component.find('objectNameSelect'),'slds-select_container');
                $A.util.removeClass(component.find('fieldNameSelect'),'slds-select_container');
            }else{
                $A.util.removeClass(component.find('desktopAction'),'slds-hide');
            }
        });
        $A.enqueueAction(action);
    },
	setMergeField:function(cmp){
		var mergeField = cmp.find('mergeField');
		var objName = cmp.find('objectName').get('v.value');
		var fieldName = cmp.find('fieldName').get('v.value');
		mergeField.set('v.value','{!'+objName+'.'+fieldName+'}');
	},
	isValidate:function(cmp){
		var isValid=true;
		var templateName = cmp.find('templateName').get('v.value');
		if($A.util.isEmpty(templateName)){
			isValid=false;
			cmp.find('templateName').set("v.errors", [{message:"Please provide template name"}]); 
        } else {             
            cmp.find('templateName').set("v.errors", null); 
        }
        var objectName = cmp.find('objectName').get('v.value');
		if($A.util.isEmpty(objectName)){
			isValid=false;
			cmp.find('objectName').set("v.errors", [{message:"Please select object"}]); 
        } else {             
            cmp.find('objectName').set("v.errors", null); 
        }
        var smsBody = cmp.find('smsBody').get('v.value');
		if($A.util.isEmpty(smsBody)){
			isValid=false;
			cmp.find('smsBody').set("v.errors", [{message:"template body can't be empty"}]); 
        } else {             
            cmp.find('smsBody').set("v.errors", null); 
        }
        return isValid;
	}
})
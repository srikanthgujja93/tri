({
    getAllNum:function(component){
    	var action = component.get("c.getNumberList");
        action.setCallback(this, function(data) {
            component.set("v.savedNumbers", data.getReturnValue());
            var spinner = component.find("loading");
            $A.util.removeClass(spinner, "slds-show");
            $A.util.addClass(spinner, "slds-hide");
        });
        $A.enqueueAction(action);
    },
    checkThemeHelper:function(component){
        var action = component.get("c.getUIThemeDescription");
        action.setCallback(this, function(a) {
            if(a.getReturnValue()=='Theme4t'){
                $A.util.addClass(component.find('mobileAction'),'slds-show');
                $A.util.addClass(component.find('desktopAction'),'slds-hide');
                $A.util.removeClass(component.find('largepadding'),'slds-m-around--large');
                var tempcontainer = component.find('addFromNumberContainer');
                $A.util.removeClass(tempcontainer,'slds-grid');      
                $A.util.addClass(tempcontainer,'slds-size--12-of-12');
            }else{
                $A.util.removeClass(component.find('desktopAction'),'slds-hide');
            }
        });
        $A.enqueueAction(action);
    },
    isValidate : function(cmp) {        
        var isValid=true;
        var numberName = cmp.find('numberName').get('v.value');
        if ($A.util.isEmpty(numberName)) {             
            isValid=false;
            cmp.find('numberName').set("v.errors", [{message:"Please provide name field"}]); 
        } else {             
            cmp.find('numberName').set("v.errors", null); 
        }
        var fromNumber = cmp.find('fromNumber').get('v.value');        
        if ($A.util.isEmpty(fromNumber)) {             
            isValid=false;
            cmp.find('fromNumber').set("v.errors", [{message:"Please provide number field"}]); 
        } else { 
            var phoneno = /^\d{5,15}$/;  
            if(!fromNumber.match(phoneno)){
                isValid=false;
                cmp.find('fromNumber').set("v.errors", [{message:"Please enter only digits mobile number"}]);
            }else{
                cmp.find('fromNumber').set("v.errors", null); 
            }
        }
		var countryCode = cmp.find('countryCode').get('v.value');
        if ($A.util.isEmpty(countryCode)) {             
            isValid=false;
            cmp.find('countryCode').set("v.errors", [{message:"Please provide country code"}]); 
        } else {
            countryCode = countryCode.replace("+","");
            var validCode = /^\d{1,5}$/;  
            if(!countryCode.match(validCode)){
                isValid=false;
                cmp.find('countryCode').set("v.errors", [{message:"Please enter valid country code with + sign"}]);
            }else{
                cmp.find('countryCode').set("v.errors", null); 
            }
        }
        if(isValid){
            cmp.set("v.addNew.gkn_sms__Country_Code__c",countryCode);
        }
        return isValid;
    },
    deleteHelper:function(cmp,record){
    	var delAction = cmp.get("c.deleteNumber");
    	delAction.setParams({'record':record});    	
        delAction.setCallback(this, function(a) {            
            if (a.getState()=== "SUCCESS") { 
                cmp.set("v.hasMessage",a.getReturnValue().message);
                cmp.set("v.messageType",a.getReturnValue().messageType);                
                cmp.set('v.savedNumbers',a.getReturnValue().numList);
            }
        });
        $A.enqueueAction(delAction);
    }
})
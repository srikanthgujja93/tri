({
    doInit:function(component, event, helper) {    	
        console.log('recordId: '+component.get('v.recordId'));
        var recordId = component.get('v.recordId');
        try{
            helper.getFromNumberHelper(component);        
            helper.getConfigByObject(component,recordId);        
            helper.getTempHelper(component,recordId);    
            helper.getAllDocumentsHelper(component);
        }catch(e){
            console.log(e);
        }
    },
    
    uploadDocument:function(component,event,helper){
        var reader = new FileReader();  
        var loading = component.find('documentUploadingWaiting');
        $A.util.addClass(loading,'show');
        $A.util.removeClass(loading,'hide');
        
        var file = component.find("file_upload_input_01").getElement().files[0]; 
        if (file.size > 4500000) {
            $A.util.removeClass(loading,'show');
            $A.util.addClass(loading,'hide');
            var resultsToast = $A.get("e.force:showToast");
            resultsToast.setParams({
                "title": "Error!",
                "message": 'File size cannot exceed ' + 4500000 + ' bytes.<br/>Selected file size: ' + file.size+' bytes'
            });
            resultsToast.fire();            
    	    return;
        }
        
        reader.readAsDataURL(file);
        reader.onload = function () {
            var fileContents = reader.result;
            var base64Mark = 'base64,';
            var dataStart = fileContents.indexOf(base64Mark) + base64Mark.length;        
            fileContents = fileContents.substring(dataStart);  
            
            component.find('documentName').set('v.value',file.name);
            component.find('documentBody').set('v.value',fileContents);
            component.find('documentExtension').set('v.value',file.name.split('.').pop());
            if(file.type.indexOf('image')>=0){
                component.set('v.documentType','image');
            }            
            //call helper to upload document
            helper.uploadDocumentHelper(component, file, fileContents,event);  
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    },
    chagefromNumber:function(component,event,helper){
        
        var num = component.find('fromNumber').get('v.value');        
        if(!$A.util.isEmpty(num)){
            helper.getCountryCodeHelper(component,num);   
            component.find('sendbtn').set('v.disabled',false); 
        }else{
            component.set('v.countryCode','+1');
            component.find('sendbtn').set('v.disabled',true); 
        }
    },
    closeModal:function(component,event,helper){
      	$A.get("e.force:closeQuickAction").fire();  
    },    
    changeTemplate:function(component,event,helper){
      	var tempId = component.find('tempList').get('v.value');
        var recordId = component.get('v.recordId');
        helper.getTempBodyHelper(component,tempId,recordId);
    },
    sendSMS: function(component, event, helper) {
        var recordId = component.get('v.recordId');
        var toNumber = component.find('toNumber').get('v.value');
        var fromNumber = component.find('fromNumber').get('v.value');
        toNumber = toNumber.split(':')[1];
        toNumber = toNumber.trim();
        var tempBody = component.find('tempBody').get('v.value');
        if($A.util.isEmpty(tempBody)){
            component.find('tempBody').set('v.errors',[{"message":"SMS Body should not empty."}])
            return false; 
        }else{
            component.find('tempBody').set('v.errors',null);
        }
        
        if(helper.validateSMSForm(component))
        {
            helper.sendSMSHelper(component,event,recordId,toNumber,fromNumber,tempBody);
        }
    }

})
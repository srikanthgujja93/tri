({
	doInit : function(component, event, helper) {		
		var datas = component.get('v.allSelected');
		if(datas){
			component.set('v.objId', datas.Ids[0]);
			helper.getObjectNameHelper(component, component.get('v.objId'));
			helper.getFromNum(component);
		}
	},
    closeToast : function(component,event,helper){
        component.set("v.hasMessage","");
        component.set("v.messageType","");
    },
	uploadDocument:function(component,event,helper){
        var reader = new FileReader();  
        //var loading = component.find('documentUploadingWaiting');
       // $A.util.addClass(loading,'show');
       // $A.util.removeClass(loading,'hide');        
        var file = component.find("file_upload_input_01").getElement().files[0]; 
        
        if (file.size > 4500000) {
            //$A.util.removeClass(loading,'show');
            //$A.util.addClass(loading,'hide');
            var resultsToast = $A.get("e.force:showToast");
            if(resultsToast){
                resultsToast.setParams({
                    "title": "Error!",
                    "message": 'File size cannot exceed ' + 4500000 + ' bytes.<br/>Selected file size: ' + file.size+' bytes'
                });
                resultsToast.fire();            
            }else{
                alert('File size cannot exceed ' + 4500000 + ' bytes.<br/>Selected file size: ' + file.size+' bytes');
            }
    	    return;
        }
        
        reader.readAsDataURL(file);
        /*reader.onload = function () {
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
        };*/
        reader.onload =$A.getCallback(
            function(e) { 
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
            });
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    },
	changeTemplate : function(component, event, helper) {
		var tempId = component.find('tempList').get('v.value');
		helper.getTempBodyHelper(component, tempId);
	},
    changeFromNumber:function(component, event, helper) {
      	//alert(event.getSource().get('v.value')) ;
        var num = event.getSource().get('v.value');
        if(!$A.util.isEmpty(num)){
         	helper.getCountryCodeHelper(component,num);
        }else{
            component.set('v.countryCode','+1');
        }
    },
	sendSMS : function(component, event, helper) {
		//check is there valid number or not
        if(component.get("v.validNum")<=0)
        {
            component.set('v.hasMessage','No valid number found to send SMS'); 
            component.set('v.messageType','error');
        	return;    
        }
        
        if (helper.isValidate(component)) {            
            //check balance
            var balanceAction = component.get('c.getBalance');
            balanceAction.setCallback(this,function(a){
                var balance = a.getReturnValue();
                if(a.getReturnValue()<=0 || component.get("v.selectedRecord").length>balance){
                    component.set('v.hasMessage','You are able to send only '+component.get("v.balance")+' SMS'); 
                    component.set('v.messageType','error');
                    return;            
                }else{
                    //start batch to send sms/mms if balance
                    helper.sendBulkSMSHelper(component, event);
                }
            });
            $A.enqueueAction(balanceAction);
		}
	},
	goBack : function(component, event, helper) {
		history.go(-1);
	},
    gotoURL : function (component, event, helper) {		
        console.log('event: '+event.getSource());
    }
});
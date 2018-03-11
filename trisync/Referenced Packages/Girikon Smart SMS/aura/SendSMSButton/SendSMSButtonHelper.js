({
    MAX_FILE_SIZE: 4500000,
    CHUNK_SIZE: 700000,
    showUploadMessage:function(component,event,result){        
        var preview = document.getElementById('preview');
        if(result.status=='Success'){
            if(component.get('v.documentType')=='image'){                                  
                preview.style.display='block';
                var imgTag = document.createElement("img");
                imgTag.setAttribute("src", result.documentUrl);
                imgTag.setAttribute("style", "width:130px;padding:5px;border:1px dashed #d8dde6;margin:2px;");
				preview.appendChild(imgTag);
            }
            if(component.get('v.uploadMediaUrls')==''){
            	component.set('v.uploadMediaUrls',result.documentUrl);    
            }
            else
            {
                component.set('v.uploadMediaUrls',component.get('v.uploadMediaUrls')+'_GKN_'+result.documentUrl);
            }
            
            var resultsToast = $A.get("e.force:showToast");
            resultsToast.setParams({
                "title": "Success!",
                "message": result.message,
                "type":'success'
            });
            resultsToast.fire();
        }else{
            var resultsToast = $A.get("e.force:showToast");
            resultsToast.setParams({
                "title": "Error!",
                "message":result.message,
                "type":'error'
            });
            resultsToast.fire();
        }
        var loading = component.find('documentUploadingWaiting');
        $A.util.removeClass(loading,'show');
        $A.util.addClass(loading,'hide');
    },
    getAllDocumentsHelper:function(component){
        /*var action1 = component.get('c.getAllDocuments');		        
        var self = this;
        action1.setCallback(this,function(a){            
            self.getBaseUrlHelper(component);
            component.set('v.uploadedDoc',a.getReturnValue());
        })
        $A.enqueueAction(action1);*/
    },
    getBaseUrlHelper:function(component){
        /*var action1 = component.get('c.getBaseUrl');		        
        action1.setCallback(this,function(a){         
            var datas = a.getReturnValue();
            component.set('v.baseurl',datas.split('__')[0]);
            component.set('v.orgId',datas.split('__')[1]);
        })
        $A.enqueueAction(action1);*/
    },
    uploadDocumentHelper:function(component, file, fileContents,event){
        var fromPos = 0;
        var toPos = Math.min(fileContents.length, fromPos + this.CHUNK_SIZE);
		
       	// start with the initial chunk
        this.uploadChunk(component, file, fileContents, fromPos, toPos, '',event);   
    },
    getCountryCodeHelper : function(cmp,fromNum) {	        
		var action1 = cmp.get('c.getCountryCode');		
		action1.setParams({'fromNum':fromNum});
		action1.setCallback(this,function(a){            
			cmp.set('v.countryCode',a.getReturnValue());
		})
		$A.enqueueAction(action1);
	},	
    uploadChunk : function(component, file, fileContents, fromPos, toPos, documentId,event) {
        var action = component.get("c.uploadDocumentInChunk"); 
        var chunk = fileContents.substring(fromPos, toPos);
        
        action.setParams({          
            documentBody: encodeURIComponent(chunk), 
            documentName: file.name,
            documentExtension: file.name.split('.').pop(),
            documentId: documentId
        });
        
        var self = this;
        action.setCallback(this, function(a) {
            documentId = a.getReturnValue().documentId;
            
            fromPos = toPos;
            toPos = Math.min(fileContents.length, fromPos + self.CHUNK_SIZE);
            
            if (fromPos < toPos) {
                self.uploadChunk(component, file, fileContents, fromPos, toPos, documentId,event);  
            }else{
                self.showUploadMessage(component,event,a.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    getConfigByObject : function(cmp,id) {		
        if(!$A.util.isEmpty(id))
        { 
            var configAction = cmp.get('c.getSMSConfigByObject');
            configAction.setParams({'objId':id});            
            configAction.setCallback(this,function(a){                                
                //cmp.find('configName').set('v.value',a.getReturnValue().Name);	
                this.getToNumberHelper(cmp,id,a.getReturnValue().Id);		
            });
            $A.enqueueAction(configAction);
        }
        else
        {
            var resultsToast = $A.get("e.force:showToast");
            resultsToast.setParams({
                "title": "WARNING",
                "message": "Record Id Not Found!",
                "type" : "error"
            });
            resultsToast.fire();
            
            // Close the action panel
            var dismissActionPanel = $A.get("e.force:closeQuickAction");
            dismissActionPanel.fire();
        }
    },
    getToNumberHelper:function(cmp,recordId,configId){
        var toNumberAction = cmp.get('c.getToNumber');
        toNumberAction.setParams({'configId':configId,'recordId':recordId});            
        toNumberAction.setCallback(this,function(a){
            cmp.find('toNumber').set('v.value',a.getReturnValue());			
        });
        $A.enqueueAction(toNumberAction);
    },
    getTempHelper:function(cmp,recordId){
    	var tempAction = cmp.get('c.getTemplate');
        tempAction.setParams({'recordId':recordId});  
        var opts1=[];
        tempAction.setCallback(this,function(a){           
            opts1.push({"class": "optionClass", label: "None", value: ""});                
            for(var i=0;i< a.getReturnValue().length;i++){
                opts1.push({"class": "optionClass", label: a.getReturnValue()[i]["Name"], value: a.getReturnValue()[i]["Id"]});
            }
            cmp.find('tempList').set('v.options',opts1);	
        });
        $A.enqueueAction(tempAction);
    },
    getTempBodyHelper:function(cmp,tempId,recordId){
        var smsBodyAction = cmp.get('c.getTemplateBody');
        smsBodyAction.setParams({'tempId':tempId,'recordId':recordId});            
        smsBodyAction.setCallback(this,function(a){
            cmp.find('tempBody').set('v.value',a.getReturnValue());			
        });
        $A.enqueueAction(smsBodyAction);
    },
    sendSMSHelper:function(cmp,event,recordId,toNumber,fromNumber,smsBody){
        var spinner = cmp.find("loading");
        $A.util.removeClass(spinner, "slds-hide");
        $A.util.addClass(spinner, "slds-show");
        
        //get Media URL String
        var mediaURL = cmp.get('v.uploadMediaUrls');
        var inputFieldURL = cmp.find('mediaUrl').get('v.value');
        var finalURL = '';
        if(!$A.util.isEmpty(mediaURL)){
            finalURL = mediaURL;
        }
        if(!$A.util.isEmpty(inputFieldURL)){
        	finalURL = finalURL + '_GKN_' + inputFieldURL;
        }
        
        var smsBodyAction = cmp.get('c.sendSMSToNumber');
        var status,statusMsg;
        smsBodyAction.setParams({
            'countryCode':cmp.get("v.countryCode"),
            'recordId':recordId,
            'tonum':toNumber,
            'fromNumber':fromNumber,
            'smsBody':smsBody,
            'mediaUrl':finalURL
        });       
        
        smsBodyAction.setCallback(this,function(a){
            var res = JSON.parse(a.getReturnValue());
            console.log(res);
            status = res.status;
            statusMsg = res.errorMessage;
            var resultsToast = $A.get("e.force:showToast");
            if(status==='QUEUED'){
                status = 'Success';
                cmp.set('v.SMSStatus','Success');
            }else{
                cmp.set('v.SMSStatus',status);
            }            
            cmp.set('v.SMSStatusMessage',res.errorMessage);
            resultsToast.setParams({
                "title": status+"!",
                "message": statusMsg,
                "type" : status,
                "duration":10000
            });
            resultsToast.fire();
            var n = parseInt(status.localeCompare('Error'));
            if(n!=0)
            {
                event.getSource().set("v.disabled",true);
                var dismissActionPanel = $A.get("e.force:closeQuickAction");
            	dismissActionPanel.fire();
                $A.get('e.force:refreshView').fire();
            }
            $A.util.removeClass(spinner, "slds-show");
            $A.util.addClass(spinner, "slds-hide");            
        });
        $A.enqueueAction(smsBodyAction);
    },
    validateSMSForm:function(cmp){
        
        return true;
    },
    getFromNumberHelper:function(cmp){
        
        var opts1=[];
        var configAction2 = cmp.get('c.getFromNumberAction');
        
        configAction2.setCallback(this,function(a){                                
            for(var i=0;i< a.getReturnValue().length;i++){
                if(a.getReturnValue()[i]=='None'){
                    opts1.push({label: "None", value: ""});
                }else{
                    opts1.push({label: a.getReturnValue()[i].replace('_',''), value: a.getReturnValue()[i].split('_')[1]});
                }
            }
            cmp.find('fromNumber').set('v.options',opts1);			
        });
        $A.enqueueAction(configAction2);
    }
  
})
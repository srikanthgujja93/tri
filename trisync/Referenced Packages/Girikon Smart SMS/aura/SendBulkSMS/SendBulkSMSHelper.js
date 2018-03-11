({
    MAX_FILE_SIZE: 4500000,
    CHUNK_SIZE: 950000,
    showUploadMessage:function(component,result){        
        var preview = document.getElementById('preview');
        if(result.status=='Success'){
            if(component.get('v.documentType')=='image'){                                  
                preview.style.display='block';
	            var imgTag = document.createElement("img");
                imgTag.setAttribute("src", result.documentUrl);
                imgTag.setAttribute("style", "width:110px;padding:5px;border:1px dashed #d8dde6;margin:2px;");
				preview.appendChild(imgTag);
            }
            if(component.get('v.uploadMediaUrls')==''){
            	component.set('v.uploadMediaUrls',result.documentUrl);    
            }
            else
            {
                component.set('v.uploadMediaUrls',component.get('v.uploadMediaUrls')+'_GKN_'+result.documentUrl);
            }
        }
    },
    uploadDocumentHelper:function(component, file, fileContents,event){
        var fromPos = 0;
        var toPos = Math.min(fileContents.length, fromPos + this.CHUNK_SIZE);		
        this.uploadChunk(component, file, fileContents, fromPos, toPos, '');
    },
    uploadChunk : function(component, file, fileContents, fromPos, toPos, documentId) {
        var action2 = component.get("c.uploadDocumentInChunk"); 
        var chunk = fileContents.substring(fromPos, toPos);
        var loading = component.find('uploadingstatus');
        $A.util.removeClass(loading,'hide');
        $A.util.addClass(loading,'show');
        
        action2.setParams({          
            documentBody: encodeURIComponent(chunk), 
            documentName: file.name,
            documentExtension: file.name.split('.').pop(),
            documentId: documentId
        });
        
        var self = this;
        console.log('uploading..31132.');        
        action2.setCallback(this, function(a) {           
            documentId = a.getReturnValue().documentId;            
            fromPos = toPos;
            toPos = Math.min(fileContents.length, fromPos + self.CHUNK_SIZE);            
            if (fromPos < toPos) {
                console.log('uploading...');
                self.uploadChunk(component, file, fileContents, fromPos, toPos, documentId);  
            }else{
                console.log('upload done');     
	            $A.util.removeClass(loading,'show');
            	$A.util.addClass(loading,'hide');           
                self.showUploadMessage(component,a.getReturnValue());
            }
        });
        $A.enqueueAction(action2);
    },
    getObjectNameHelper : function(cmp,id) {		
		var action1 = cmp.get('c.getObjectName');		
		action1.setParams({'objId':id});
		action1.setCallback(this,function(a){
			cmp.set('v.objName',a.getReturnValue());
			this.getTempHelper(cmp,a.getReturnValue());
			this.getToNumberHelper(cmp,a.getReturnValue());
			var spinner = cmp.find("smsSpinner");
			$A.util.addClass(spinner, "slds-hide");
		})
		$A.enqueueAction(action1);
	},
	getCountryCodeHelper : function(cmp,fromNum) {
        
		var action1 = cmp.get('c.getCountryCode');		
        action1.setParams({
            'fromNum':fromNum,
            'objectName':cmp.get('v.objName'),
            'toNum':cmp.get('v.toNumber'),
            'ids':cmp.get('v.allSelected').Ids
        });
		action1.setCallback(this,function(a){
            var obj = JSON.parse(a.getReturnValue());
            var arr = obj.Message.split('#');
            cmp.set("v.validNum",obj.validNumber);
			cmp.set('v.countryCode',obj.Status);
            if(arr[1]==='0')
            	cmp.set("v.messageType","error");
            else
                cmp.set("v.messageType","success");
            
            cmp.set("v.hasMessage",arr[0]);
            cmp.set("v.balance",parseInt(arr[1],10));
		})
		$A.enqueueAction(action1);
	},	    
	getFromNum : function(cmp) {
        var opts1=[];
        var configAction = cmp.get('c.getAllFromNumber');                 
        configAction.setCallback(this,function(a) {  
            for(var i=0;i< a.getReturnValue().length;i++) {    
                if(a.getReturnValue()[i]=='None') 
                    opts1.push({label: a.getReturnValue()[i], value: ''});
                else
                opts1.push({label: a.getReturnValue()[i].replace('__',''), value: a.getReturnValue()[i].split('__')[1]});                
            }
            cmp.find('fromNumber').set('v.options',opts1);			
        });
        $A.enqueueAction(configAction);               
    },    
    getTempHelper:function(cmp,objName){
    	var tempAction = cmp.get('c.getTemplate');
        tempAction.setParams({'objectName':objName});  
        var opts1=[];
        tempAction.setCallback(this,function(a){        	          
            for(var i=0;i< a.getReturnValue().length;i++){            	
                opts1.push({label: a.getReturnValue()[i]["Name"], value: a.getReturnValue()[i]["Id"]});
            }
            cmp.find('tempList').set('v.options',opts1);	
        });
        $A.enqueueAction(tempAction);
    },
    getTempBodyHelper:function(cmp,tempId){
        var smsBodyAction = cmp.get('c.getTemplateBody');
        smsBodyAction.setParams({'tempId':tempId});            
        smsBodyAction.setCallback(this,function(a){
            cmp.find('tempBody').set('v.value',a.getReturnValue());			
        });
        $A.enqueueAction(smsBodyAction);
    },
    getToNumberHelper:function(cmp,objectName){
    	var datas = cmp.get('v.allSelected');    
    	var toNumAction = cmp.get('c.getToNum');
    	toNumAction.setParams({
    		'objectName':objectName
    	});
    	toNumAction.setCallback(this,function(a){    		
    		cmp.set('v.toNumber',a.getReturnValue());
    		this.getSelectedRecord(cmp,a.getReturnValue(),objectName,datas.Ids);
    	});
    	$A.enqueueAction(toNumAction);
    },
    getSelectedRecord:function(cmp,tonum,objName,Ids){
    	var recordAction = cmp.get('c.getAllSelected');
    	recordAction.setParams({    		
    		'Ids':Ids,
    		'objectName':objName,
    		'tonum':tonum
    	});
    	if($A.util.isEmpty(objName) || $A.util.isEmpty(objName)){
    		return false;
    	}
    	
    	recordAction.setCallback(this,function(a){    	
            var obj = JSON.parse(a.getReturnValue());            
            if(obj!=null && obj[0].message!=null){
                cmp.set("v.hasMessage",obj[0].message);
                cmp.set("v.messageType",'error');
            }else{
                cmp.set("v.hasMessage",'');
                cmp.set("v.messageType",'');
                cmp.set('v.selectedRecord',obj);
            }			
        });
        $A.enqueueAction(recordAction);
    },
    
    sendBulkSMSHelper:function(component,event){
    	var sentsmsAction = component.get('c.sendBulkSMS');
    	var datas = component.get('v.allSelected');
    	var spinner = component.find("smsSpinner");
    	$A.util.removeClass(spinner, "slds-hide");
    	var btnEvent = event.getSource();
    	btnEvent.set('v.disabled',true);
        
        //get Media URL String
        var mediaURL = component.get('v.uploadMediaUrls');
        var inputFieldURL = component.find('mediaUrl').get('v.value');
        var finalURL = '';
        if(!$A.util.isEmpty(mediaURL)){
            finalURL = mediaURL;
        }
        if(!$A.util.isEmpty(inputFieldURL)){
        	finalURL = finalURL + '_GKN_' + inputFieldURL;
        }
        console.log('code: '+component.get('v.countryCode'));
        
    	sentsmsAction.setParams({
            'countryCode':component.get('v.countryCode'),
    		'objectName':component.get('v.objName'),
    		'fromNum':component.find('fromNumber').get('v.value'),
    		'smsBody':component.find('tempBody').get('v.value'),
    		'toNum':component.get('v.toNumber'),
    		'ids': datas.Ids,
            'mediaUrl':finalURL
    	});
        var self = this;
        sentsmsAction.setCallback(this,function(a){           	                        
            var result = a.getReturnValue();            
            if(result==null)
            {
                component.find('batchStatus').getElement().innerHTML = 'You did not have permission to send Bulk SMS';
            }
            else if(result.Status==null){
                component.find('batchStatus').getElement().innerHTML = 'A Apex Job ('+result.Id+') already running to send SMS.';
            }
            else
            {
                document.cookie = "jobId="+result.Id;            
                var str = '<div>Status: '+result.Status+
                    ', Number Of Errors: '+(result.NumberOfErrors)+
                    ', Items Processed: '+(result.JobItemsProcessed)+
                    ', Total Items: '+component.get('v.validNum')+
                    '</div>';
                component.find('batchStatus').getElement().innerHTML = str;
                self.getBatchStatusHelper(component,component.get('v.objName'));            
            }            
        });
    	$A.enqueueAction(sentsmsAction);
    },
    getBatchStatusHelper:function(component,objectName){
        var jobId = this.getCookieByName('jobId').trim();        
        if($A.util.isEmpty(jobId)){
            return false;
        }
        var str ='';
        var action = component.get('c.batchStatus');        
        action.setParams({'jobId':jobId})
        var self = this;
        action.setCallback(this,function(a){
            var result = a.getReturnValue();
            var errorCount = result.NumberOfErrors*10;
            var total = component.get('v.validNum');
            if(errorCount>total){
                errorCount = total;
            }                
            if(result.Status!='Completed' && result.Status!='Aborted')
            {
                str = '<div>Status: '+result.Status+
                    ', Number Of Errors: '+errorCount+
                    ', Items Processed: '+(result.JobItemsProcessed*10)+
                    ', Total Items: '+total+
                    '</div>';
                component.find('batchStatus').getElement().innerHTML = str;
                self.getBatchStatusHelper(component,objectName);
            }else{
                str = '<div>Status: '+result.Status+
                    ', Number Of Errors: '+errorCount+
                    ', Items Processed: '+component.get('v.validNum')+
                    ', Total Items: '+total+
                    '</div>';
                component.find('batchStatus').getElement().innerHTML = str;
                var loading = component.find('smsSpinner');
                $A.util.addClass(loading,'slds-hide');
                $A.util.removeClass(loading,'slds-show');
                document.cookie = "jobId=";                
            }            
        });
        $A.enqueueAction(action);
    },
    getCookieByName:function(cookieName){
        var name = cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";  
    },
    isValidate:function(cmp){
		var isValid=true;
		var fromNumber = cmp.find('fromNumber').get('v.value');
		if($A.util.isEmpty(fromNumber)){
			isValid=false;
			cmp.find('fromNumber').set("v.errors", [{message:"Please select a from number"}]); 
        } else {             
            cmp.find('fromNumber').set("v.errors", null); 
        }
        
        var smsBody = cmp.find('tempBody').get('v.value');
		if($A.util.isEmpty(smsBody)){
			isValid=false;
			cmp.find('tempBody').set("v.errors", [{message:"Template body can't be empty"}]); 
        } else {             
            cmp.find('tempBody').set("v.errors", null); 
        }  
        return  isValid;     
	}
})
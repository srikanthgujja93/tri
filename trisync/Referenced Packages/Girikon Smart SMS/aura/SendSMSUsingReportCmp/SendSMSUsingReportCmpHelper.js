({
    startApexBatchHelper : function(component,event) {
        event.getSource().set('v.disabled',true);
        var loading = component.find('proccessing');
        $A.util.addClass(loading,'slds-show');
        $A.util.removeClass(loading,'slds-hide');
        var action = component.get('c.startApexBatch');
        action.setParams(
            {
                'totalRecord':component.get('v.validRecord'),
                'objectName':component.get('v.objectName'),
                'toNumberField':component.get('v.toNumberField'),
                'fromNumber':component.find('fromNumber').get('v.value'),
                'SMSBody':component.get('v.templateBody'),
                'mediaUrl':''
            }
        );      
        var self = this;
        action.setCallback(this,function(a){           	                        
            var result = a.getReturnValue();            
            if(result==null)
            {
                component.find('batchStatus').getElement().innerHTML = 'You did not have permission to send Bulk SMS';
                $A.util.addClass(loading,'slds-hide');
                $A.util.removeClass(loading,'slds-show');
            }
            else if(result.Status==null){
                component.find('batchStatus').getElement().innerHTML = 'A Apex Job ('+result.Id+') already running to send SMS.';
                $A.util.addClass(loading,'slds-hide');
                $A.util.removeClass(loading,'slds-show');
            }
            else
            {
                document.cookie = "jobId="+result.Id;            
                var str = '<div>Status: '+result.Status+
                    ', Number Of Errors: '+(result.NumberOfErrors)+
                    ', Items Processed: '+(result.JobItemsProcessed)+
                    ', Total Items: '+component.get('v.validRecord')+
                    '</div>';
                component.find('batchStatus').getElement().innerHTML = str;
                self.getBatchStatusHelper(component,component.get('v.objectName'));            
            }
        });
        $A.enqueueAction(action);
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
            var total = component.get('v.validRecord');
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
                ', Items Processed: '+component.get('v.validRecord')+
                ', Total Items: '+total+
                '</div>';
                component.find('batchStatus').getElement().innerHTML = str;
                var loading = component.find('proccessing');
                $A.util.addClass(loading,'slds-hide');
                $A.util.removeClass(loading,'slds-show');
                document.cookie = "jobId=";
                self.getBulkSMSReportHelper(component);
            }            
        });
        $A.enqueueAction(action);
    },
    getBulkSMSReportHelper:function(component){
        var action = component.get('c.getAllBulkSMSReport');
        action.setCallback(this,function(a){
            if(a.getReturnValue()!=null)
            component.set('v.bulkSMSHistory',a.getReturnValue());
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
    getObjectListHelper : function(component) {
		var action = component.get('c.getObjectListFromConfigObject');        
        var opts1=[];
        action.setCallback(this,function(a){                                       
            for(var i=0;i< a.getReturnValue().length;i++){
                if( a.getReturnValue()[i]=='None')
                    opts1.push({"class": "", label: a.getReturnValue()[i], value: ''});
                else
                	opts1.push({"class": "", label: a.getReturnValue()[i], value: a.getReturnValue()[i]});
            }
            component.find('objects').set('v.options',opts1);	
        });
        $A.enqueueAction(action);
	},
    getFromNumberHelper : function(component) {
		var action = component.get('c.getAllFromNumber');        
        var opts1=[];
        action.setCallback(this,function(a){                                       
            for(var i=0;i< a.getReturnValue().length;i++){
                if( a.getReturnValue()[i]=='None')
                    opts1.push({label: a.getReturnValue()[i], value: ''});
                else
                	opts1.push({label: a.getReturnValue()[i].replace("_",""), value: a.getReturnValue()[i]});
            }
            component.find('fromNumber').set('v.options',opts1);	
        });
        $A.enqueueAction(action);
	},
    getTemplateHelper:function(component,objectName){
    	var action = component.get('c.getTemplateByObject');
        action.setParams({'objectName':objectName});  
        var opts1=[];
        action.setCallback(this,function(a){           
            opts1.push({label: "None", value: ""});                
            for(var i=0;i< a.getReturnValue().length;i++){
                opts1.push({label: a.getReturnValue()[i]["Name"], value: a.getReturnValue()[i]["Id"]});
            }
            component.find('template').set('v.options',opts1);	
        });
        $A.enqueueAction(action);
    },
    
    getToNumberFieldByObjectNameHelper:function(component,objectName){
    	var action = component.get('c.getToNumberFieldByObjectName');
        action.setParams({'objectName':objectName});        
        action.setCallback(this,function(a){
            var result = a.getReturnValue();            
            component.set('v.toNumberField',result.split('-')[0]);
            component.set('v.isSaveInCustomObject',result.split('-')[1]);
            //this.getRecordCountByObjectHelper(component,objectName,result.split('-')[0])
        });
        $A.enqueueAction(action);
    },
    
    getRecordCountByObjectHelper:function(component,objectName,toNumberField){        
        var countryCode = component.get("v.countryCode");
        
        var action = component.get('c.getRecordCount');
        action.setParams({'objectName':objectName,'toNumberField':toNumberField,'countryCode':countryCode});
        action.setCallback(this,function(a){
            var result = a.getReturnValue();
            console.log(result);
            component.set('v.totalRecord',result.total);
            component.set('v.validRecord',result.validRecord);
            component.set('v.invalidRecord',result.invalidRecord);
            component.set('v.message',result.message);
            if(result.validRecord>0){
                component.find("sendBulkSMSBtn").set("v.disabled",false);
            }else{
                component.find("sendBulkSMSBtn").set("v.disabled",true);
            }
        });
        $A.enqueueAction(action);
    },
    getTempBodyHelper:function(component,templateId){
        var action = component.get('c.getTemplateBodyById');
        action.setParams({'templateId':templateId});            
        action.setCallback(this,function(a){
            component.set('v.templateBody',a.getReturnValue());			
        });
        $A.enqueueAction(action);
    },
    getSMSBalanceHelper:function(component){
        var action = component.get('c.getBalance');
        action.setCallback(this,function(res){
            var obj = JSON.parse(res.getReturnValue());
            component.set('v.SMSBalance',obj.balanceSMS);
        });
        $A.enqueueAction(action);
    },
    getUpdatedBalanceHelper:function(component){
        var loading = component.find('loading');
        $A.util.addClass(loading,'slds-show');
        $A.util.removeClass(loading,'slds-hide');
        var action = component.get('c.getUpdatedSMSBalance');
        action.setCallback(this,function(res){
            var obj = JSON.parse(res.getReturnValue());
            component.set('v.SMSBalance',obj.balanceSMS);
            $A.util.addClass(loading,'slds-hide');
            $A.util.removeClass(loading,'slds-show');
        });
        $A.enqueueAction(action);
    },
    validateForm:function(component){
        var isvalid=true;
        var val = component.find('objects').get('v.value');
        if($A.util.isEmpty(val)){
            isvalid = false;
            component.find('objects').set('v.errors',[{message:"Please select an object."}]);
        }
        else
        {
            component.find('objects').set('v.errors',null);
        }
        val = component.find('fromNumber').get('v.value');
        if($A.util.isEmpty(val)){
            isvalid = false;
            component.find('fromNumber').set('v.errors',[{message:"Please select from number."}]);
        }
        else
        {
            component.find('fromNumber').set('v.errors',null);
        }
        val = component.find('smsbody').get('v.value');
        if($A.util.isEmpty(val)){
            isvalid = false;
            component.find('smsbody').set('v.errors',[{message:"SMS body can't be blank"}]);
        }
        else
        {
            component.find('smsbody').set('v.errors',null);
        }
        
        return isvalid;
    },
    getValidNumbersCountHelper:function(component,objname,countryCode){
        var action = component.get('c.getAllValidNumbersCount');
        action.setParams({'objname':objname,'countryCode':countryCode,"tonumfield":component.get("v.toNumberField")});
        action.setCallback(this,function(a){
            component.set('v.validNumbers',a.getReturnValue());
        });
        $A.enqueueAction(action);
    },
})
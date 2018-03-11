({
    doInit:function(component,event,helper){
        helper.checkApiKey(component);
        helper.getBalanceHelper(component);   
        $A.util.addClass(component.find("smsSpinner"), "slds-hide");        
	},
    editSiteUrl:function(component,event,helper){
        component.find('siteURL').set("v.disabled",false);
    },
    saveSiteUrl:function(component,event,helper){
        var siteUrl = component.get("v.siteUrl");
        var action = component.get('c.addSiteUrl');
        action.setParams({'siteUrl':siteUrl});	
        $A.util.addClass(component.find("smsSpinner"), "slds-show");       
        action.setCallback(this,function(res){
            
            $A.util.removeClass(component.find("smsSpinner"), "slds-show");       
            $A.util.addClass(component.find("smsSpinner"), "slds-hide");       
            if(res.getReturnValue().indexOf('saved')>0)
            {
                component.find('siteURL').set("v.disabled",true);
                component.find('siteURL').set("v.errors",null);
                alert(res.getReturnValue());
            }
            else
            {
                component.find('siteURL').set("v.errors",[{message:res.getReturnValue()}]);
            }            
        });        
        $A.enqueueAction(action);
    },
    doAfterScriptLoad:function(component,event,helper){
        helper.checkTheme(component);
    },
    Refresh:function(component,event,helper){
        var action = component.get('c.getRefreshBalance');
        var spinner = component.find("smsSpinner");
        $A.util.removeClass(spinner, "slds-hide");
        action.setCallback(this,function(res){
            $A.util.addClass(spinner, "slds-hide");
            var obj = JSON.parse(res.getReturnValue());            
            component.set('v.smsbalance',{'sobjectType': 'SMSBalance__c',
'gkn_sms__balanceSMS__c':obj.balanceSMS,'gkn_sms__totalSMS__c':obj.totalSMS,'gkn_sms__usageSms__c':obj.usageSms,
            'gkn_sms__IncomingSMSCount__c':obj.inBoundSMS,'gkn_sms__OutgoingSMSCount__c':obj.outBoundSMS});        	
        });
        
        function labelFormatter(label, series) {
            return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'><br/>" + Math.round(series.percent) + "%</div>";
        }
            var balanceData = component.get('v.smsbalance');
            var data = [
                { label: "Outgoing",  data: balanceData.gkn_sms__OutgoingSMSCount__c,color:'#e7b6f9'},
                { label: "Remaining",  data: balanceData.gkn_sms__balanceSMS__c,color:'#2ecbbe'},
                { label: "Incoming",  data: balanceData.gkn_sms__IncomingSMSCount__c,color:'#a1e29e'}
            ];
            $("#piechat").unbind();
            $.plot($("#piechat"), data, {
                series: {
                    pie: {
                        show: true,
                        radius: 1,
                        label: {
                            show: true,
                            radius: 2/3,
            				formatter: labelFormatter,
                            threshold: 0.1
                        }
                    }
                },
                legend: {
                    show: true
                }
            });
        $A.enqueueAction(action);
    },
	sendKey:function(component,event,helper)
	{
		helper.sendApiKey(component);
	},
	reSendKey:function(component,event,helper)
	{
		helper.sendApiKey(component);
	},
	saveApiKey:function(cmp,event,helper)
	{	
		var apiKey = cmp.find('apiKey').get('v.value');
		var updateAction = cmp.get('c.updateApiKey');		
		if($A.util.isEmpty(apiKey)){
			alert('Apikey should not empty');
			return false;
		}
		updateAction.setParams({'apiKey':apiKey});	
		updateAction.setCallback(this,function(a){			
			var state = a.getState();
            if (state !== "SUCCESS") {
				alert(a.getReturnValue());
			}else{				
				cmp.set("v.firstTimeActivate","Congratulations! you have successfully activated SmartSMS App. Girikon support team will contact you shortly for next steps.");
			}
			
			if(a.getReturnValue()=='Activated'){
				cmp.set('v.isActive2','true');
				cmp.set('v.isActive', 'created');
				cmp.set("v.msg","Activated");
			}
		});
		$A.enqueueAction(updateAction);
	}
	
})
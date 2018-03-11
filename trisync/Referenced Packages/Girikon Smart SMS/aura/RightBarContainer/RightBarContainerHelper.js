({
	sendApiKey:function(cmp){
		var loading = cmp.find('loading');
        $A.util.removeClass(loading,'slds-hide');
        $A.util.addClass(loading,'slds-show');
        var apiKeyaction = cmp.get('c.sendActivationKey');
		apiKeyaction.setCallback(this, function(a) {
            var obj = JSON.parse(a.getReturnValue());
            console.log(''+obj);
			if($A.util.isEmpty(obj.gkn_sms__API_Key__c))
			{	
				cmp.set("v.emailAddress",obj.gkn_sms__Email__c);
				cmp.set('v.isActive2','false');
                cmp.set('v.isActive','created');
                cmp.set("v.msg","Your account has been activated. Please check your mail box("+obj.gkn_sms__Email__c+")");
			}else
			{
                cmp.set("v.msg","Activated");
                cmp.find('siteURL').set("v.disabled",true);
				cmp.set('v.isActive', 'true');
				cmp.set("v.emailAddress", obj.gkn_sms__Email__c);
				cmp.set("v.msg","Your account has been activated. Please check your mail box("+obj.gkn_sms__Email__c+")");
			}
            $A.util.removeClass(loading,'slds-show');
            $A.util.addClass(loading,'slds-hide');
        });
        $A.enqueueAction(apiKeyaction);	
	},
    checkTheme:function(component){
        var action = component.get("c.getUIThemeDescription");
        var self = this;
        action.setCallback(this, function(a) {
            if(a.getReturnValue()=='Theme4t'){
                var leftdiv = component.find('leftdiv');
                var rightdiv = component.find('rightdiv');
                $A.util.removeClass(leftdiv,'slds-size--9-of-12');
                $A.util.addClass(leftdiv,'slds-size--12-of-12');
                $A.util.removeClass(rightdiv,'slds-size--9-of-12');
                $A.util.addClass(rightdiv,'slds-size--11-of-12');      
                $A.util.removeClass(component.find('sldsgrid'),'slds-grid');
                $A.util.addClass(component.find('sldsgrid'),'slds-p-left--large');
                
                $A.util.removeClass(component.find('section1heading'),'slds-text-heading--medium');
                $A.util.addClass(component.find('section1heading'),'slds-text-heading--small');
                $A.util.removeClass(component.find('section2heading'),'slds-text-heading--medium');
                $A.util.addClass(component.find('section2heading'),'slds-text-heading--small');
                $A.util.removeClass(component.find('section3heading'),'slds-text-heading--medium');
                $A.util.addClass(component.find('section3heading'),'slds-text-heading--small');
                $A.util.removeClass(component.find('section4heading'),'slds-text-heading--medium');
                $A.util.addClass(component.find('section4heading'),'slds-text-heading--small');
                
                $A.util.removeClass(component.find('badgebox'),'slds-grid');
                $A.util.removeClass(component.find('cataloguebox'),'slds-grid');
                $A.util.addClass(component.find('badge1'),'slds-size--12-of-12');
                $A.util.addClass(component.find('badge2'),'slds-size--12-of-12');
                $A.util.addClass(component.find('badge3'),'slds-size--12-of-12');
            }
            if(component.get("v.msg")==='Activated'){    
                self.drawchart(component);
            }
        });
        $A.enqueueAction(action);
    },
	getEmail:function(cmp){		
		var emailAction = cmp.get('c.getUserEmail1');
		emailAction.setCallback(this, function(data) {
			cmp.set("v.emailAddress", data.getReturnValue());
        });
        $A.enqueueAction(emailAction);
	},
	checkApiKey:function(cmp){
		var isactive = cmp.get('c.isActivate');
		isactive.setCallback(this, function(data) {
			var obj = JSON.parse(data.getReturnValue());
            console.log(obj);
			if(obj.gkn_sms__API_Key__c=='abc'){
				cmp.set('v.isActive', 'false');
			}			
			else if(obj.gkn_sms__API_Key__c!='abc' && obj.gkn_sms__Is_Active__c==false){
				cmp.set('v.isActive', 'created');
				cmp.set('v.isActive2','false');
			}			
			else{
				cmp.set("v.msg","Activated");
                cmp.find('siteURL').set("v.disabled",true);
				cmp.set('v.isActive', 'true');
			}
            cmp.set("v.siteUrl",obj.gkn_sms__siteUrl__c);
		});
        $A.enqueueAction(isactive);
	},
    getBalanceHelper:function(component){
        var action = component.get('c.getBalance');
        action.setCallback(this,function(res){
            var obj = JSON.parse(res.getReturnValue());
            console.log(res.getReturnValue());
            component.set('v.smsbalance',{'sobjectType': 'SMSBalance__c',
'gkn_sms__balanceSMS__c':obj.balanceSMS,'gkn_sms__totalSMS__c':obj.totalSMS,'gkn_sms__usageSms__c':obj.usageSms,
'gkn_sms__IncomingSMSCount__c':obj.inBoundSMS,'gkn_sms__OutgoingSMSCount__c':obj.outBoundSMS});
        });
        $A.enqueueAction(action);
    },
    drawchart:function(component){    	
       var balanceData = component.get('v.smsbalance'); 
        function labelFormatter(label, series) {
           console.log(series);
            return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'><br/>" + Math.round(series.percent) + "%</div>";
        }
        
        $(document).ready(function(){
        var data = [
         	{ label: "Outgoing",  data: balanceData.gkn_sms__OutgoingSMSCount__c,color:'#e7b6f9'},
         	{ label: "Remaining",  data: balanceData.gkn_sms__balanceSMS__c,color:'#2ecbbe'},
         	{ label: "Incoming",  data: balanceData.gkn_sms__IncomingSMSCount__c,color:'#a1e29e'}
        ];
       $.plot($("#piechat"), data, {
       	series: {
        	pie: {
                show: true,
                radius: 1,
                showTooltips: true,
                label: {
                show: true,
                radius: 2/3,
                formatter: labelFormatter,
                threshold: 0.1
                }
          	}
         },
         legend: {show: true}
       });
        });
	}
})
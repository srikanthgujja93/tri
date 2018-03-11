({
	getUserProfilePic : function(component)
    {
		var  action = component.get("c.getUserThumbPhoto");
        var self = this;
        action.setCallback(this,function(response){
            component.set("v.loggedinUserPic",response.getReturnValue());
            self.getSMSHistory(component);
        });
        $A.enqueueAction(action);
	},
    getCurrentUserHistory:function(component,userId){        
        var datas = component.get("v.histories"); 
        var temp = [];
        var dateObj='';
        var previousValue = '';        
        if(userId!=='-1'){                        
            for(var i=0;i<datas.length;i++){                                    
                if(datas[i].SMS_Type==="Outgoing" && datas[i].CreatedById===userId){
                    dateObj = new Date(Date.parse(datas[i].createddates));
                    if(previousValue!==dateObj.getUTCDate()+''+parseInt(dateObj.getUTCMonth()+1)+''+dateObj.getUTCFullYear()){
                        datas[i].isDateChange=true;
                    }else{
                        datas[i].isDateChange=false;
                    }
                    previousValue=dateObj.getUTCDate()+''+parseInt(dateObj.getUTCMonth()+1)+''+dateObj.getUTCFullYear();
                    temp.push(datas[i]);
                }
                else if(datas[i].SMS_Type!=="Outgoing"){
                    dateObj = new Date(Date.parse(datas[i].createddates));
                    if(previousValue!==dateObj.getUTCDate()+''+parseInt(dateObj.getUTCMonth()+1)+''+dateObj.getUTCFullYear()){
                        datas[i].isDateChange=true;
                    }else{
                        datas[i].isDateChange=false;
                    }                                            
                    previousValue=dateObj.getUTCDate()+''+parseInt(dateObj.getUTCMonth()+1)+''+dateObj.getUTCFullYear();
                    temp.push(datas[i]);
                }
            }            
            //console.log(temp);
            component.set("v.historyToDisplay",[]);
            component.set("v.historyToDisplay",[].concat(temp));
        }
        else
        {   
            component.set("v.historyToDisplay",[]);
            component.set("v.historyToDisplay",[].concat(datas));
        }        
        
        setTimeout(function(){            
            $A.util.addClass(document.getElementById(userId),"selected");
            var elem = component.find("conversation_container").getElement();                
            $(".discussion").animate({scrollTop: elem.scrollHeight+'px'}, 100);            
        },200);
    },
    getSMSHistory: function(component)
    {
        if($A.util.isEmpty(component.get("v.recordId")) || $A.util.isUndefined(component.get("v.recordId"))){
        	component.set('v.hasMessage','Record not found!');
            component.set('v.messageType','error');
            return;    
        }        
        var self = this;
        var  action = component.get("c.getSMSHistories");
        action.setParams({recordId:component.get("v.recordId")});
        action.setCallback(this,function(response){
            var obj = response.getReturnValue();
            component.set("v.histories",obj.smsList);
            component.set("v.userList",obj.UserList);
            component.set("v.toNumber",obj.toNumber);
            component.set("v.fromNumber",obj.fromNumber);    
            component.set("v.loggedInUserName",obj.loggedInUserName);
            component.set("v.loggedInUserId",obj.loggedInUserId);
            component.set("v.objectName",obj.objectName);
            component.set("v.parentRecordId",obj.parentRecordId);
            component.set("v.externalUserName",obj.externalUserName);    
            self.getCurrentUserHistory(component,obj.loggedInUserId);
            
            //Set scroll to bottom of container
            setTimeout(function(){
                var elem = component.find("conversation_container").getElement();                
                $(".discussion").animate({scrollTop: elem.scrollHeight+'px'}, 100);
            },1000);
            $A.util.addClass(component.find("spinner"),"slds-hide");
            $A.util.removeClass(component.find("spinner"),"slds-show");
        });
        $A.enqueueAction(action);
    },    
    startListening:function(component){
        //Get a valid Session Id
        var sessionAction = component.get("c.getUserSession");
		var self = this;
        sessionAction.setCallback(this, function (a) {
            var sid = a.getReturnValue();			
            $.cometd.init({
                url: '/cometd/39.0',
                requestHeaders: {Authorization: 'OAuth '+sid},
                appendMessageTypeToURL: false
            });
            //subscribe
            $.cometd.subscribe('/topic/SMSHistoryInsert', $A.getCallback(function (message) {      
                console.log(message.data.sobject.Id);     
                self.getSingleIncomingSMS(component,message.data.sobject.Id)
                component.find("soundEffect").getElement().play();
            }));
            //closes connection of window close
            window.onbeforeunload = function () {
                $.cometd.disconnect();
            };
        });
        $A.enqueueAction(sessionAction);
    },
    getSingleIncomingSMS:function(component,id){
        var self = this;
        var action = component.get("c.getSingleIncoming");
        
        action.setParams({idStr:id});       
        action.setCallback(this,function(res){
            var allSMS = component.get("v.histories");
            allSMS.push(res.getReturnValue());
            component.set("v.histories",allSMS);            
            self.getCurrentUserHistory(component,component.get("v.loggedInUserId"));            
            var elem = component.find("conversation_container").getElement();                
            $(".discussion").animate({scrollTop: elem.scrollHeight+'px'}, 800);
        });
        $A.enqueueAction(action);
    },
    sendSMS:function(component,message){
        var self = this;
        var action = component.get("c.sendSMS");
        action.setParams({
            toNumber:component.get("v.toNumber"),
            fromNumber:component.get("v.fromNumber"),
            messageBody:message,
            recordId:component.get("v.parentRecordId")
        });       
        
        action.setCallback(this,function(res){
            var result = res.getReturnValue();
            if(result==='Success'){
                try{
                    var allSMS = component.get("v.histories");
                    var data = allSMS[allSMS.length-1];
                    data.isSentOrReceived=true;    
                    allSMS[allSMS.length-1]=data;                    
                    component.set("v.histories",allSMS);
                }
                catch(e)
                {
                    console.log(e.message)
                }
            }else{
                var allSMS = component.get("v.histories");
                allSMS.pop(allSMS.length-1);
                component.set("v.histories",allSMS);
                
                if(result=='Authenticate'){
                    result = result + 'failed. Please contact your Adminstrator/SmartSMSApp Team.';
                }                
                component.set("v.hasMessage",result);
                component.set("v.messageType",'error');                
                var historyToDisplay = component.get("v.historyToDisplay");
                historyToDisplay.pop(historyToDisplay.length-1);
                component.set("v.historyToDisplay",historyToDisplay);
            }
            console.log('SMS Send Status: '+result);            
            self.getCurrentUserHistory(component,component.get("v.loggedInUserId"));
        });
        $A.enqueueAction(action);
    },
})
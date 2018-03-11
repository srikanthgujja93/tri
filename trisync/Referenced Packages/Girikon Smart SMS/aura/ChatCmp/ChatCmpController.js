({
    scriptLoaded:function(component, event, helper){
        helper.startListening(component);
    },
    closeToast : function(component,event,helper){
        component.set("v.hasMessage","");
        component.set("v.messageType","");
    },
    filterDatas:function(component, event, helper){
        var el = component.find("urserlist").getElement().childNodes;
        for(var i=0;i<el.length;i++){
            el[i].className ="";
        }        
        var userId = event.currentTarget.getAttribute("data-userid");        
        //$A.util.addClass(document.getElementById(userId),"selected");
        //Disable chat box if view as other user
        if(component.get("v.loggedInUserId")!==userId){
        	component.find("outgoingsms").set("v.disabled",true);    
        }else{
            component.find("outgoingsms").set("v.disabled",false);    
        }
        
        helper.getCurrentUserHistory(component,userId);
    },
    doInit : function(component, event, helper) 
    {
        if($A.util.isEmpty(component.get("v.recordId")) || $A.util.isUndefined(component.get("v.recordId"))){        	
            alert('You can not open this tab directly.');            
            return;    
        }
        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
            component.set("v.isFirefox",true);
        }
        $A.util.removeClass(component.find("spinner"),"slds-hide");
        $A.util.addClass(component.find("spinner"),"slds-show");        
		helper.getUserProfilePic(component);
	},
    handleUploadFinished:function(component,event,helper){
        
    },
    submitMsg:function(component,event,helper)
    {
        var charLeft=160;
        var segments=0;
        var totalChar = event.getSource().get("v.value").length;
        if(totalChar%160==0)
        {
            segments = parseInt(totalChar / 160,10);
        }
        else
        {
            segments = parseInt((totalChar / 160) + 1,10);
        }
        
        charLeft = (segments*160) - event.getSource().get("v.value").length;
        
        component.set("v.charleft",charLeft);
        component.set("v.totalchars",totalChar);
        component.set("v.totalSegment",segments);
                      
        if($A.util.isEmpty(event.getSource().get("v.value").trim())){
            return;
        }
        if (event.getParams().keyCode == 13 && event.getParams().shiftKey)
        {
            return;
        }
        
        if(event.getParams().keyCode == 13){
            var d = new Date();            
            var item = {
                "id":"42142342",
                "createddates":d.toISOString().toString(),
                "SMS_Body":event.getSource().get("v.value").trim(),
                "SMS_Type":"Outgoing",
                "mmsurl":"",
                "isDateChange":false,
                "UserName":component.get("v.loggedInUserName"),
                "CreatedById":component.get("v.loggedInUserId"),
                "isSentOrReceived":false,
                "pic":component.get("v.loggedinUserPic")
            }
            var allSMS = component.get("v.histories");
            allSMS.push(item);
            component.set("v.histories",allSMS);
            component.set("v.outgoing_msg",'');
            
            var historyToDisplay = component.get("v.historyToDisplay");
            historyToDisplay.push(item);
            component.set("v.historyToDisplay",historyToDisplay);
            component.set("v.charleft",160);
            component.set("v.totalchars",0);
            component.set("v.totalSegment",0);            
            setTimeout(function(){
                var elem = component.find("conversation_container").getElement();                
                $(".discussion").animate({scrollTop: elem.scrollHeight+'px'}, 800);                
            },300);            
            //send Reply
            helper.sendSMS(component,item.SMS_Body);
        }    
    }
})
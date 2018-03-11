/**
 *  @Author : Girikon App Team
 *  @Date : 12/June/2017 
 *  @Description : This handler has getMessages() function to fatch the task records.
 */

({
    // this function call getMsgNotification(pageNumber) method of NotificationController controller class 
    getMessages: function(component, page){
        $A.util.removeClass(component.find("spinner"),"slds-hide");
        $A.util.addClass(component.find("spinner"),"slds-show");
        
        var action = component.get("c.getMsgNotification");
        action.setParams({
            "pageNumber": page
        });
        action.setCallback(this, function(a) {
            $A.util.addClass(component.find("spinner"),"slds-hide");
            $A.util.removeClass(component.find("spinner"),"slds-show");
            var result = a.getReturnValue();
            component.set("v.Tasks", result.tasks);
            component.set("v.page", result.page);
            component.set("v.total", result.total);
            component.set("v.pages", Math.ceil(result.total / 4));
        });
        $A.enqueueAction(action);
    },
    startListening: function (component, event, helper) {
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
                self.getMessages(component,1);
                component.find("soundEffect").getElement().play();
            }));

            //closes connection of window close
            window.onbeforeunload = function () {
                $.cometd.disconnect();
            };
        });
        $A.enqueueAction(sessionAction);
    },
})
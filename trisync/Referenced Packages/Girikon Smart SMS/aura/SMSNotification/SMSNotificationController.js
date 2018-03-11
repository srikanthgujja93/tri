/**
 * @Author : Sudip Halder
 * @Date : 12/June/2017
 * @Description : This controller has following methods. doInit, previousPage,
 *              nextPage, replyMsg, closePopup
 */

({
    scriptLoaded:function(component, event, helper)
    {
        helper.startListening(component, event, helper);
    },
    
	// this function automatic call by when component load
	doInit : function(component, event, helper) {
		// this function call on the component load first time
		// get the page Number if it's not define, take 1 as default
		var page = component.get("v.page") || 1;
		// call the helper function getMessages
		helper.getMessages(component, page);
		// this section is for hide the popup at the time of loading the page.
		var cmpTarget = component.find('ReplyPopup');
		var cmpBack = component.find('ReplyPopupBg');
		$A.util.removeClass(cmpBack, 'slds-backdrop_open');
		$A.util.removeClass(cmpTarget, 'slds-slide-down-cancel');
	},

	// this function call when user click previous button
	previousPage : function(component, event, helper) {
		// this function call on click on the previous page button
		var page = component.get("v.page") || 1;
		// get the previous button label
		var direction = event.getSource().get("v.label");
		// set the current page,(using ternary operator.)
		page = direction === "Previous" ? (page - 1) : (page + 1);
		// call the helper function getMessages
		helper.getMessages(component, page);
	},

	// this function call when user click next button
	nextPage : function(component, event, helper) {
		// this function call on click on the next page button
		var page = component.get("v.page") || 1;
		// get the next button label
		var direction = event.getSource().get("v.label");
		// set the current page,(using ternary operator.) "(page + 1)"
		page = direction === "Previous" ? (page - 1) : (page + 1);
		// call the helper function getMessages
		helper.getMessages(component, page);
	},
	
    gotoDetailPage:function(component, event, helper){
        var pagetype = component.get("v.pageType");
        var recId = event.getSource().get('v.value');
		if (pagetype === 'classic') {
			window.open('/' + recId);
        }else{
            var navEvt = $A.get("e.force:navigateToSObject");
            navEvt.setParams({
                "recordId": recId
            });
            navEvt.fire();
        }
    },
    
	// this function call when user click reply button
	replyMsg : function(component, event, helper) {
		// this function get pageType i.e. Classic or lightning
		// according to this it will open the VF page or lightning popup
		var pagetype = component.get("v.pageType");
		var recId = event.getSource().get('v.value');
		if (pagetype === 'classic') {
			window.open('/apex/gkn_sms__chat?recordId=' + recId);
		} else {
            var urlEvent = $A.get("e.force:navigateToURL");
            urlEvent.setParams({
                "url": "/apex/gkn_sms__chat?recordId="+recId
            });
            urlEvent.fire();            
		}
	},

	// this function call when user click close [X] icon in popup
	closePopup : function(component, event, helper) {
		// this section close the popup
		var cmpTarget = component.find('ReplyPopup');
		var cmpBack = component.find('ReplyPopupBg');
		$A.util.removeClass(cmpBack, 'slds-backdrop_open');
		$A.util.removeClass(cmpTarget, 'slds-slide-down-cancel');
	},

	// this function automatic call by aura:waiting event
	showSpinner : function(component, event, helper) {
		// make Spinner attribute true for display loading spinner
		component.set("v.Spinner", true);
	},

	// this function automatic call by aura:doneWaiting event
	hideSpinner : function(component, event, helper) {
		// make Spinner attribute to false for hide loading spinner
		component.set("v.Spinner", false);
	}
})
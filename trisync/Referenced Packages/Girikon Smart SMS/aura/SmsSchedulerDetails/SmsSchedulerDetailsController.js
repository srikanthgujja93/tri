({
	doInit : function(component, event, helper) {
		var PageSize = component.get('v.SmsListPageSize');

		var action = component.get('c.FetchSmsScheduleDetails');
		action.setCallback(this, function(response) {
			component.set('v.smslist', response.getReturnValue());
            console.log(response.getReturnValue());
		});
		$A.enqueueAction(action);
	},
	viewDetail:function(component, event, helper){
		var obj = event.getSource().get('v.value');		
		component.set("v.viewObject",obj);
		helper.showModal(component);		
	},
	hideDetailModal:function(component, event, helper){
		helper.hideModal(component);
	}
})
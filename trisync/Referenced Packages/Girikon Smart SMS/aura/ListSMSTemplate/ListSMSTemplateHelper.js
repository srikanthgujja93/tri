({
	showPopupHelper : function(component, componentId, className) {
		var modal = component.find(componentId);
		$A.util.removeClass(modal, className + 'hide');
		$A.util.addClass(modal, className + 'open');
	},

	hidePopupHelper : function(component, componentId, className) {
		var modal = component.find(componentId);
		$A.util.addClass(modal, className + 'hide');
		$A.util.removeClass(modal, className + 'open');

	},
	deleteHelper: function(cmp,record){
		var delAction = cmp.get('c.deleteTemplate');
		delAction.setParams({'record':record});
		delAction.setCallback(this,function(a){
			if(a.getState()=='SUCCESS'){                
                cmp.set("v.hasMessage",a.getReturnValue().message);
                cmp.set("v.messageType",a.getReturnValue().messageType);                
                cmp.set('v.templateNames',a.getReturnValue().tempList);
			}
		});
		$A.enqueueAction(delAction);
	}
})
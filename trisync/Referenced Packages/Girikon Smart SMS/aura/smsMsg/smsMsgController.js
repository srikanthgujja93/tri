({
	doInit:function(component, event, helper) {
		
		setTimeout(function(){
			$A.util.addClass(component.find('sms-message'),'hide');
		},2000);
	},
	close : function(component, event, helper) {
		$A.util.addClass(component.find('sms-message'),'hide');
	}
})
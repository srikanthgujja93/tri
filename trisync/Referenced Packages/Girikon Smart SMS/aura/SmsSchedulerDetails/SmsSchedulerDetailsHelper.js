({
	showModal : function(component) {
		var modalObj = component.find("viewDetailModal");
		var backdropObj = component.find("viewDetailModalBackdrop");
		$A.util.addClass(modalObj,"slds-fade-in-open");
		$A.util.addClass(backdropObj,"slds-backdrop_open");
	},
	hideModal:function(component){
		var modalObj = component.find("viewDetailModal");
		var backdropObj = component.find("viewDetailModalBackdrop");
		$A.util.removeClass(modalObj,"slds-fade-in-open");
		$A.util.removeClass(backdropObj,"slds-backdrop_open");
	}
})
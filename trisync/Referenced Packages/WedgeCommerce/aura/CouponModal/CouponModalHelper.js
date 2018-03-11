({	
    createCoupon: function(component, coupon) {
		this.upsertCoupon(component, coupon, function(a) {
	        var coupons = component.get("v.Coupons");
	        coupons.push(a.getReturnValue());
	        component.set("v.Coupons", coupons);
	      });
	},
    upsertCoupon : function(component, coupon) {
	    var action = component.get("c.saveCoupon");
	    action.setParams({
	        "coupon": coupon
	    });
        action.setCallback(this,function(res){            
            var state = res.getState();
            if(state==='SUCCESS'){}
        });
	    $A.enqueueAction(action);
	},
})
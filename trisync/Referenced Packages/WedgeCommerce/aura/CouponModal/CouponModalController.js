({
    initialize:function(cmp,event,helper){        
		var couponId = cmp.get("v.CouponId");
        if(couponId!=null){
            var action = cmp.get("c.getCouponRow");
                action.setParams({
                    "couponId" : couponId
                });            
                action.setCallback(this,function(res){
                    var state = res.getState();
                    if(state=='SUCCESS'){    
                        cmp.set('v.newCoupon',res.getReturnValue());
                        
                    }
                });
            $A.enqueueAction(action);            
        }    
        var cmpTarget = cmp.find('Modalbox');
       	var cmpBack = cmp.find('MB-Back');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open');
    },
    createCouponCode:function(component){
        var action = component.get('c.createCouponcd');
        action.setCallback(this,function(res){
            var state = res.getState();
            if(state=='SUCCESS'){
                component.set('v.newCoupon.wk_wedge__Coupon_Code__c',res.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    createCoupon:function(component, event, helper) {
		var nameField = component.find("code");                       
        var nm = nameField.get("v.value");
        if(nm==''){
            nameField.set("v.errors", [{message:"This is a required Field."}]);
        }else{
            nameField.set("v.errors", null);
            var newCoupon = component.get("v.newCoupon"); 
            helper.createCoupon(component,newCoupon);            
            var updateList = component.getEvent("UpdateEvent");
            updateList.fire();
            var compEvent = component.getEvent("RemoveComponent");            
            compEvent.setParams({
                "comp" : component
            });
	    	compEvent.fire();            
        } 
	},
    removeComponent:function(component, event, helper){
        var compEvent = component.getEvent("RemoveComponent");
        compEvent.setParams({
        	"comp" : component
        });
	    compEvent.fire();    	
    },
})
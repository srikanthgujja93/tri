({	
    createProductFeature: function(component, productFeature, variants) {
		this.upsertProductFeature(component, productFeature, variants, function(a) {
	        var productFeatures = component.get("v.productFeatures");
	        productFeatures.push(a.getReturnValue());
	        component.set("v.productFeatures", productFeatures);
	      });
	},
    upsertProductFeature : function(component, productFeature, variants) {
	    var action = component.get("c.saveProductFeature");
	    action.setParams({
	        "productFeature": productFeature,
            "variants": variants
	    });
        action.setCallback(this,function(res){            
            var state = res.getState();
            if(state==='SUCCESS'){}
        });
	    $A.enqueueAction(action);
	},
})
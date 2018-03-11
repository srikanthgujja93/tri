({	
    createProductOption: function(component, productOption, variants) {
		this.upsertProductOption(component, productOption, variants, function(a) {
	        var productOptions = component.get("v.productOptions");
	        productOptions.push(a.getReturnValue());
	        component.set("v.productOptions", productOptions);
	      });
	},
    upsertProductOption : function(component, productOption, variants) {
	    var action = component.get("c.saveProductOption");
	    action.setParams({
	        "productOption": productOption,
            "variants": variants
	    });
        action.setCallback(this,function(res){
            
            var state = res.getState();
            if(state==='SUCCESS'){
               /* component.set('v.newArticle.Name','');
                component.set('v.newArticle.wk_wedge__Content__c','')
                content.set("v.value",'');
                con = content.get("v.value");
                content.set("v.body",'');
                //alert(con);*/
            }
        });
	    $A.enqueueAction(action);
	},
})
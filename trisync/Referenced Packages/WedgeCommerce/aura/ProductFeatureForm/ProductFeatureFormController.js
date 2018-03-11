({
	getCompnent: function(cmp,event) {
        var cmpBody=cmp.find("cmpBody");     
        $A.createComponent(
            "wk_wedge:ProductFeatureModal",{
                "ProductFeatureId":null 
            },
            function(newcomponent){
                if (cmp.isValid()) {
                    var body = cmp.get("v.body");
                    body.push(newcomponent);
                    cmp.set("v.body", body);                    
                }
            }            
        );
        var compEvent = cmp.getEvent("openPopup");
       	compEvent.fire();
    },
    getEditCompnent: function(cmp,event) {
		var cmpBody=cmp.find("cmpBody");        
        var productFeatureId = cmp.get("v.ProductFeatureId");
        $A.createComponent(
            "wk_wedge:ProductFeatureModal",{
                "ProductFeatureId":productFeatureId 
            },
            function(newcomponent){
                if (cmp.isValid()) {
                    var body = cmpBody.get("v.body");
                    body.pop();
                    body.push(newcomponent);
                    cmp.set("v.body", body);
                }
            }            
        );
        var compEvent = cmp.getEvent("openPopup");
       	compEvent.fire();
    },
    removeComponent:function(cmp,event){
        var cmpBody=cmp.find("cmpBody");
        var comp = event.getParam("comp");
        comp.destroy();		
    },
})
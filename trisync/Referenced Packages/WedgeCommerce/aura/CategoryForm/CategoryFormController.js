({
	getCompnent: function(cmp,event) {
        var cmpBody=cmp.find("cmpBody");
		var compEvent = cmp.getEvent("createCategory");        
        compEvent.setParams({
            "ProductId" : "",
            "comp" : "wk_wedge:CategoryModal"
        });
        compEvent.fire();
    },
    getEditCompnent: function(cmp,event) {
		var cmpBody=cmp.find("cmpBody"); 
        var CategoryId = cmp.get("v.CategoryId");
		var compEvent = cmp.getEvent("createCategory");        
        compEvent.setParams({
            "ProductId" : CategoryId,
            "comp" : "wk_wedge:CategoryModal"
        });
       	compEvent.fire();
    },
    removeComponent:function(cmp,event){
        var cmpBody=cmp.find("cmpBody");
        var comp = event.getParam("comp");
        comp.destroy();
    },
})
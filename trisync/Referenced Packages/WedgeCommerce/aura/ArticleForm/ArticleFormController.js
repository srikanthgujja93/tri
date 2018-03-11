({
	getCompnent: function(cmp,event) {
        //var articleId = cmp.get("v.ArticleId");
        var cmpBody=cmp.find("cmpBody");
        
        $A.createComponent(
            "wk_wedge:ArticleModal",{
                "ArticleId":null 
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
        var articleId = cmp.get("v.ArticleId");
        $A.createComponent(
            "wk_wedge:ArticleModal",{
                "ArticleId":articleId 
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
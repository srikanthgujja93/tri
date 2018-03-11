({
	getCompnent: function(cmp,event) {
        var cmpBody=cmp.find("cmpBody");
        var tcompid = cmp.get("v.tcompId");
		var compEvent = cmp.getEvent("createImageSlider");        
        compEvent.setParams({
        	"tcompId" : tcompid,
            "Id" : "",
            "comp" : "wk_wedge:SocialIconModal"
        });
        compEvent.fire();
    },
    getEditCompnent: function(cmp,event) {
		var cmpBody=cmp.find("cmpBody");        
        var tcompid = cmp.get("v.tcompid");
        var SocialIconId = cmp.get("v.SocialIconId");
		var compEvent = cmp.getEvent("createImageSlider");        
        compEvent.setParams({
        	"tcompId" : tcompid,
            "Id" : SocialIconId,
            "comp" : "wk_wedge:SocialIconModal"
        });
       	compEvent.fire();
    },
    removeComponent:function(cmp,event){
        var cmpBody=cmp.find("cmpBody");
        var comp = event.getParam("comp");
        comp.destroy();
    },
})
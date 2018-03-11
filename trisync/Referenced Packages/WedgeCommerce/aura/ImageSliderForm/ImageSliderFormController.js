({
	getCompnent: function(cmp,event) {
        var cmpBody=cmp.find("cmpBody");
        var tcompid = cmp.get("v.tcompid");
		var compEvent = cmp.getEvent("createImageSlider");        
        compEvent.setParams({
        	"tcompId" : tcompid,
            "Id" : "",
            "comp" : "wk_wedge:ImageSliderModal"
        });
        compEvent.fire();
    },
    getEditCompnent: function(cmp,event) {
		var cmpBody=cmp.find("cmpBody");        
        var tcompid = cmp.get("v.tcompid");
        var BannerId = cmp.get("v.BannerId");
		var compEvent = cmp.getEvent("createImageSlider");        
        compEvent.setParams({
        	"tcompId" : tcompid,
            "Id" : BannerId,
            "comp" : "wk_wedge:ImageSliderModal"
        });
       	compEvent.fire();
    },
    removeComponent:function(cmp,event){
        var cmpBody=cmp.find("cmpBody");
        var comp = event.getParam("comp");
        comp.destroy();
    },
})
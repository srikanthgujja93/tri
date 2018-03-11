({
	getCompnent: function(cmp,event) {
        var cmpBody=cmp.find("cmpBody");
        var tcompid = cmp.get("v.tcompid");
        var colname = cmp.get("v.colname");
		var compEvent = cmp.getEvent("createImageSlider");        
        compEvent.setParams({
        	"tcompId" : tcompid,
            "Id" : "",
            "colname" : colname,
            "comp" : "wk_wedge:CentralShowcaseModal"
        });
        compEvent.fire();
    },
    getEditCompnent: function(cmp,event) {
		var cmpBody=cmp.find("cmpBody");        
        var tcompid = cmp.get("v.tcompid");
        var BannerId = cmp.get("v.CentralShowcaseId");
		var compEvent = cmp.getEvent("createImageSlider");        
        compEvent.setParams({
        	"tcompId" : tcompid,
            "Id" : BannerId,
            "comp" : "wk_wedge:CentralShowcaseModal"
        });
       	compEvent.fire();
    },
    removeComponent:function(cmp,event){
        var cmpBody=cmp.find("cmpBody");
        var comp = event.getParam("comp");
        comp.destroy();
    },
})
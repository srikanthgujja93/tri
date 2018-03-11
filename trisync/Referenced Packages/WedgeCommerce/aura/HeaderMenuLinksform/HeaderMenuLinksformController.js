({
	getComponent: function(cmp,event) {
        var cmpBody=cmp.find("cmpBody");
        var tcompid = cmp.get("v.tcompid");
        var TemplateId = cmp.get("v.TemplateId");        
        $A.createComponent(
            "wk_wedge:HeaderMenuLinksModal",{
                "MenuLinksId":'',
                "tcompid" : tcompid,
                "TemplateId" : TemplateId 
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
        var menuLinksId = cmp.get("v.MenuLinksId");
        var tcompid = cmp.get("v.tcompid");
        var TemplateId = cmp.get("v.TemplateId");
        $A.createComponent(
            "wk_wedge:HeaderMenuLinksModal",{
                "MenuLinksId":menuLinksId,
                "tcompid" : tcompid,
                "TemplateId" : TemplateId 
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
        var comp = event.getParam("comp");
        comp.destroy();
    },
})
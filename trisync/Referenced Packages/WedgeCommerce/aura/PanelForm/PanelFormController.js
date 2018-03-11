({
	getCompnent: function(cmp,event) {
        var cmpBody=cmp.find("cmpBody");
        
        $A.createComponent(
            "wk_wedge:PanelModal",{
                "PanelId":null 
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
        var panelId = cmp.get("v.PanelId");
        $A.createComponent(
            "wk_wedge:PanelModal",{
                "PanelId":panelId 
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
        //alert(comp.toString());
        /*$A.createComponent(
            comp.toString(),{},
            function(newcomponent){
                //Add the new button to the body array
                if (cmp.isValid()) {
                    var body = cmpBody.get("v.body");
                    cmpBody.set("v.body",[]);
                }
            }
        );*/
    },
})
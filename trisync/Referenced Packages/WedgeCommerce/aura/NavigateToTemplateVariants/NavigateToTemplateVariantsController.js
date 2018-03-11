({
	scriptsLoaded : function(component,event,helper){
    },
    navigate:function(component,event,helper){
        var compEvent = component.getEvent("createTemplateVariants");
            var compVal = component.get('v.tcompName');
        	var tcompId = component.get('v.tcompId');
            var TemplateId = component.get('v.TemplateId');
            if(compVal=='Central Show Case'){
                compEvent.setParams({
                    "tempId" : tcompId,
                    "TemplateId" : TemplateId,
                    "comp" : "wk_wedge:CentralShowcase"
                });
                compEvent.fire();
            }else if(compVal=='Footer Menu Links'){
                compEvent.setParams({
                    "tempId" : tcompId,
                    "TemplateId" : TemplateId,
                    "comp" : "wk_wedge:FooterMenuLinksListing"
                });
                compEvent.fire();
            }else if(compVal=='Header Menu Links'){
                compEvent.setParams({
                    "tempId" : tcompId,
                    "TemplateId" : TemplateId,
                    "comp" : "wk_wedge:HeaderMenuLinksListing"
                });
                compEvent.fire();
            }else if(compVal=='Image Slider'){
                compEvent.setParams({
                    "tempId" : tcompId,
                    "TemplateId" : TemplateId,
                    "comp" : "wk_wedge:ImageSliderListing"
                });
                compEvent.fire();
            }else if(compVal=='Template Panels'){
                compEvent.setParams({
                    "tempId" : tcompId,
                    "TemplateId" : TemplateId,
                    "comp" : "wk_wedge:PanelListing"
                });
				compEvent.fire();                
            }else if(compVal=='Logo'){
                compEvent.setParams({
                    "tempId" : tcompId,
                    "TemplateId" : TemplateId,
                	"comp" : "wk_wedge:LogoForm"
            	});
                compEvent.fire();
            }else if(compVal=='Social Keys'){
                compEvent.setParams({
                    "tempId" : tcompId,
                    "TemplateId" : TemplateId,
                	"comp" : "wk_wedge:SocialIconListing"
            	});
                compEvent.fire();
            }else if(compVal=='Footer Text'){
            	var cmpBody=component.find("cmpBody");
                $A.createComponent(
                    "wk_wedge:FooterTextForm",{
                        "tempId" : tcompId,
                    	"TemplateId" : TemplateId
                    },
                    function(newcomponent){
                        if (component.isValid()) {
                            var body = component.get("v.body");
                            body.push(newcomponent);
                            component.set("v.body", body);
                        }
                    }            
                );                 
            }           
    },
    removeComponent:function(cmp,event){
        var cmpBody=cmp.find("cmpBody");
        var comp = event.getParam("comp");
        comp.destroy();
    },
})
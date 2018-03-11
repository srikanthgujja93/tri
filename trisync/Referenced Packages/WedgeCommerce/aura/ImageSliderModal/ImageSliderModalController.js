({
	getLink : function(component, event, helper) {
		var id = component.get("v.BannerId");        
        var tcompId = component.get("v.tcompid");
        if(id!=''){
            component.set("v.frameSrc",'/apex/AddImageBannerLightning?id='+id+'&tcompid='+tcompId);
        }else{
        	component.set("v.frameSrc",'/apex/AddImageBannerLightning?tcompid='+tcompId);    
        }
	}
})
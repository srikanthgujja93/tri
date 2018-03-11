({
	getLink : function(component, event, helper) {
		var id = component.get("v.Id");        
        var tcompId = component.get("v.tcompid");
        if(id!=''){
            component.set("v.frameSrc",'/apex/SocialIconsLightning?id='+id+'&tcompid='+tcompId);
        }else{
        	component.set("v.frameSrc",'/apex/SocialIconsLightning?tcompid='+tcompId);    
        }
	}
})
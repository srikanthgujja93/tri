({
	getLink : function(component, event, helper) {
		var id = component.get("v.BannerId");
        var colname = component.get("v.colname");
        var tcompId = component.get("v.tcompid");
        if(id!='' && id!=null){
            component.set("v.frameSrc",'/apex/CentralShowCaseLightning?col='+id+'&act=edit&tcompid='+tcompId);
        }else{
            colname=colname.replace(' ','+');
            colname+='&';
        	component.set("v.frameSrc",'/apex/CentralShowCaseLightning?col='+colname+'act=add&tcompid='+tcompId);    
        }
	}
})
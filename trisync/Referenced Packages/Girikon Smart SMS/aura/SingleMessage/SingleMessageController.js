({
	doInit : function(component, event, helper) {
        var today = new Date();        
        var createddate = new Date(Date.parse(component.get("v.createddate")));
        if(today.getFullYear()+(today.getMonth() + 1)+today.getDate()===createddate.getFullYear()+(createddate.getMonth() + 1)+createddate.getDate())                           
        {
			component.set("v.isToday",true);            
        }
    }
})
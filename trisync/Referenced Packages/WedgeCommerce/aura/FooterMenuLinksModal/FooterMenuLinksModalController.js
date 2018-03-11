({
	initialize:function(cmp,event,helper){		
        var menuLinkId = cmp.get("v.MenuLinksId");        
        var actionMenu = cmp.get("c.getAllSelectOption");
        var obj = [];
        actionMenu.setCallback(this,function(res){
            var state = res.getState();
            if(state=='SUCCESS'){
                var result = res.getReturnValue();
                obj = helper.getSelectOptions(cmp,result.menuTypes);
                cmp.set('v.menuLinkTypes',obj);
                
                obj = [];
                obj = helper.getSelectOptions(cmp,result.position);
                cmp.set('v.position',obj);
                
                obj = [];
                obj = helper.getSelectOptions(cmp,result.articles);
                cmp.set('v.article',obj);
            }
        });
        $A.enqueueAction(actionMenu);
        if(menuLinkId!=null){
            var action = cmp.get("c.getMenuLinkRow");
            var con = cmp.find("content"); 
                action.setParams({
                    "menuLinkId" : menuLinkId
                });            
                action.setCallback(this,function(res){
                    var state = res.getState();
                    if(state=='SUCCESS'){  
                        cmp.set('v.newFooterMenuLink',res.getReturnValue());
                        helper.renderform(cmp);
                    }
                });
            $A.enqueueAction(action);            
        }        
        var cmpTarget = cmp.find('Modalbox');
       	var cmpBack = cmp.find('MB-Back');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open'); 
    },
  	renderForm:function(component,event,helper){
        helper.renderform(component);
    },
    applycss:function(component,event,helper){
    	helper.applycss(component);  
    },
    handleremovecss:function(cmp,event){
	    var cmpTarget = cmp.find('Modalbox');
       	var cmpBack = cmp.find('MB-Back');
        $A.util.removeClass(cmpBack,'slds-backdrop--open');
	    $A.util.removeClass(cmpTarget, 'slds-fade-in-open');
	},
    createMenulink:function(component, event, helper) {
		var nameField = component.find("menuType");                       
        var nm = nameField.get("v.value");
		var tcompid =component.get('v.tcompid');
        var TemplateId =component.get('v.TemplateId');
        component.set('v.newFooterMenuLink.wk_wedge__Template_Component__c',tcompid);
        component.set('v.newFooterMenuLink.wk_wedge__Templates__c',TemplateId);
        if(nm==''){
            nameField.set("v.errors", [{message:"This is a required Field."}]);
        }else{
            nameField.set("v.errors", null);            
            var newFooterMenuLink = component.get("v.newFooterMenuLink");
            helper.createMenulink(component,newFooterMenuLink);
            var updateList = component.getEvent("UpdateEvent");
            updateList.fire();
            var compEvent = component.getEvent("RemoveComponent");
            compEvent.setParams({
                "comp" : component
            });
	    	compEvent.fire();            
        } 
	},
    removeComponent:function(component, event, helper){
        var compEvent = component.getEvent("RemoveComponent");
        compEvent.setParams({
        	"comp" : component
        });
	    compEvent.fire();    	
    }    
})
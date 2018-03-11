({
	initialize:function(cmp,event){
		var articleId = cmp.get("v.ArticleId");
        if(articleId!=null){
            var action = cmp.get("c.getArticleRow");
            var con = cmp.find("content"); 
                action.setParams({
                    "articleId" : articleId
                });            
                action.setCallback(this,function(res){
                    var state = res.getState();
                    if(state=='SUCCESS'){                    
                        //alert(res.getReturnValue());
                        cmp.set('v.newArticle',res.getReturnValue());
                        //con.set("v.value",res.getReturnValue().Content__c);
                    }
                });
            $A.enqueueAction(action);            
        }
        //alert(con.get("v.value"));
        var cmpTarget = cmp.find('Modalbox');
       	var cmpBack = cmp.find('MB-Back');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open'); 
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
    createArticle:function(component, event, helper) {
		var nameField = component.find("name");                       
        var nm = nameField.get("v.value");

        if(nm==''){
            nameField.set("v.errors", [{message:"This is a required Field."}]);
        }else{
            nameField.set("v.errors", null);            
            var newArticle = component.get("v.newArticle");
            helper.createArticle(component,newArticle);
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
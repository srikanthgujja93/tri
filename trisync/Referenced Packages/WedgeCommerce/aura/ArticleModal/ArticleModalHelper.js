({
	createArticle: function(component, article) {
		this.upsertArticle(component, article, function(a) {
	        var articles = component.get("v.articles");
	        articles.push(a.getReturnValue());
	        component.set("v.articles", articles);
	      });
	},
    upsertArticle : function(component, article) {
	    var action = component.get("c.saveArticle");
        var content = component.find("content");
        var con = content.get("v.value");
        var label = content.get("v.body");
	    action.setParams({
	        "article": article
	    });
        action.setCallback(this,function(res){            
            var state = res.getState();
            if(state==='SUCCESS'){
               /* component.set('v.newArticle.Name','');
                component.set('v.newArticle.wk_wedge__Content__c','')
                content.set("v.value",'');
                con = content.get("v.value");
                content.set("v.body",'');
                //alert(con);*/
            }
        });
	    $A.enqueueAction(action);
	},
})
({
	getSelectOptions : function(component,optString) {
    	var str = JSON.parse(optString);
        var feed = [];
        feed.push({
            label: '--None--',
        	value: '',
        });
        for(var key in str){
            feed.push({
                label: str[key]["label"],
                value: str[key]["value"],
            });                
        }
        return feed;
	},
    createMenulink: function(component, menulink) {
		this.upsertMenulink(component, menulink, function(a) {
	        var headerMenuLinks = component.get("v.HeaderMenuLinks");
	        headerMenuLinks.push(a.getReturnValue());
	        component.set("v.HeaderMenuLinks", headerMenuLinks);
	      });
	},
    upsertMenulink : function(component, menulink) {
	    var action = component.get("c.saveMenuLink");
	    action.setParams({
	        "menulink": menulink
	    });
        action.setCallback(this,function(res){            
            var state = res.getState();
            if(state==='SUCCESS'){}
        });
	    $A.enqueueAction(action);
	},
    renderform:function(component){
        var type = component.get('v.newHeaderMenuLink.wk_wedge__Header_menu_Type__c');        
        var title = component.getReference('v.newHeaderMenuLink.wk_wedge__title__c');
        var url = component.getReference('v.newHeaderMenuLink.wk_wedge__Url__c');
        var order = component.getReference('v.newHeaderMenuLink.wk_wedge__Order_Index__c');
        var description = component.getReference('v.newHeaderMenuLink.wk_wedge__Description__c');
        var articles = component.getReference('v.newHeaderMenuLink.wk_wedge__article__c');
        
        var article = component.get('v.article');  
        if(type==''){
            component.set('v.body',[]);
        }else if(type=='URL'){
            var body =[];
            $A.createComponent(
                "ui:inputText",{
                    "aura:id" : "url",
                    "label" : "URL",
                    "class" : "slds-input",
                    "labelClass" : "slds-form-element__label",
                    "class" : "slds-input",
                    "value" : url
                },
                function(newcomponent){
                    if (component.isValid()) {
                        body.push(newcomponent);
                        component.set("v.body", body);
                    }
                }            
            );
            $A.createComponent(
                "ui:inputText",{
                    "aura:id" : "order",
                    "label" : "Order",
                    "class" : "slds-input",
                    "labelClass" : "slds-form-element__label",
                    "class" : "slds-input",
                    "value" : order
                },
                function(newcomponent){
                    if (component.isValid()) {
                        body.push(newcomponent);
                        component.set("v.body", body);
                    }
                }            
            );              
        }else if(type=='Contact Us'){
            var body =[];
            $A.createComponent(
                "ui:inputText",{
                    "aura:id" : "url",
                    "label" : "URL",
                    "class" : "slds-input",
                    "labelClass" : "slds-form-element__label",
                    "class" : "slds-input",
                    "value" : '/w/contactus'
                },
                function(newcomponent){
                    if (component.isValid()) {
                        body.push(newcomponent);
                        component.set("v.body", body);
                        component.set('v.newHeaderMenuLink.wk_wedge__Url__c','/w/contactus');
                    }
                }            
            );
            $A.createComponent(
                "ui:inputText",{
                    "aura:id" : "order",
                    "label" : "Order",
                    "class" : "slds-input",
                    "labelClass" : "slds-form-element__label",
                    "class" : "slds-input",
                    "value" : order
                },
                function(newcomponent){
                    if (component.isValid()) {
                        body.push(newcomponent);
                        component.set("v.body", body);
                    }
                }            
            );
        }else if(type=='Article'){
            var body =[];
            $A.createComponent(
                "ui:inputText",{
                    "aura:id" : "order",
                    "label" : "Order",
                    "class" : "slds-input",
                    "labelClass" : "slds-form-element__label",
                    "class" : "slds-input",
                    "value" : order
                },
                function(newcomponent){
                    if (component.isValid()) {
                        body.push(newcomponent);
                        component.set("v.body", body);
                    }
                }            
            );
            for(var i = 0;i<article.length;i++){
                selectOption.push({ 
                    label: article[i]['label'],
                	value: article[i]['value'] 
            	});
            }
            $A.createComponent(
                "ui:inputSelect",{
                    "aura:id" : "article",
                    "label" : "Article",
                    "class" : "slds-input",
                    "labelClass" : "slds-form-element__label",
                    "class" : "slds-input",
                    "value" : articles,
                    "options" : selectOption
                },
                function(newcomponent){
                    if (component.isValid()) {
                        body.push(newcomponent);
                        component.set("v.body", body);
                                                
                    }
                }            
            );
        }
    }
})
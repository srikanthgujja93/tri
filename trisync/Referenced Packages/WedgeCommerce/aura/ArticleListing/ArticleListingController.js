({
    scriptsLoaded:function(cmp,evt,helper){
        $(document).on('click','#searchicon',function(){
            
        });
    },
    searchItems:function(cmp,evt,helper){
        var searchstr = cmp.get('v.searchstr');
    	var action = cmp.get('c.getSearchItem');
        action.setparam({
            'searchstr':searchstr
        });
        action.setCallback(this,function(res){
            
        });
        $A.enqueueAction(action);
    },
	getArticles : function(cmp, evt, helper) {
		var next = false;
        var prev = false;
        helper.getArticles(cmp,next,prev);
        if(screen.width<=1024){
        	var tabSidebar = cmp.find("tabSidebar");
        	$A.util.addClass(tabSidebar,'tabHeadingDisplay');
        	
        	var tabBottomPanel = cmp.find("tabBottomPanel");
        	$A.util.removeClass(tabBottomPanel,'tabHeadingDisplay');
        }
	},
    Next:function(cmp,event,helper){
        var next = true;
        var prev = false;
        var offset = cmp.get("v.offset");
        helper.getArticles(cmp,next,prev,offset); 
    },
    Previous:function(cmp,event,helper){
        var next = false;
        var prev = true;
        var offset = cmp.get("v.offset");
        helper.getArticles(cmp,next,prev,offset); 
    },	
	checkAll:function(component,event,helper){
        var master= component.find("master");
        var dep= component.find("dependent");
        var val= master.get("v.value");
        if(val==true){
            for(var i=0;i<dep.length;i++){
                dep[i].set("v.value",true);
            }
        }else{
           for(var i=0;i<dep.length;i++){
                dep[i].set("v.value",false);
            } 
        }
        
    },
    deleteList:function(component,event,helper){
        var cmpBack = component.find('MB-Back');
        $A.util.addClass(cmpBack, 'slds-backdrop--open'); 
        var dep = component.find("dependent");        
        var listOfId = [];
	    for(var i=0;i<dep.length;i++){     
	        if(dep[i].get("v.value")){
	        	listOfId.push(component.find("dependent")[i].get("v.text"));
            }  
        
        } // for loop close 
        component.set("v.massDeleteList" , listOfId);       
        var delIdsPassInClass = component.get("v.massDeleteList");
        if(delIdsPassInClass.length===0){
            $A.util.removeClass(cmpBack, 'slds-backdrop--open'); 
            alert("Select atleast 1 record(s)");            
        }else{
            var action = component.get("c.DeleteMass");
            if(confirm("Are you sure?")){
                action.setParams({ 
                   "delIDs" :  delIdsPassInClass
                });            
            }
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    $A.util.removeClass(cmpBack, 'slds-backdrop--open');  
                }
            });
             $A.enqueueAction(action);
            component.updateList();
    	}
    },
	applycss:function(cmp,event){
        var cmpTarget = cmp.find('Modalbox');
       	var cmpBack = cmp.find('MB-Back');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open');
    },
    handleremovecss:function(cmp,event){
	    var cmpTarget = cmp.find('Modalbox');
       	var cmpBack = cmp.find('MB-Back');
        $A.util.removeClass(cmpBack,'slds-backdrop--open');
	    $A.util.removeClass(cmpTarget, 'slds-fade-in-open');
        cmp.updateList();
	},
    updateArticlelist:function(cmp){
        cmp.updateList();
    }
    
})
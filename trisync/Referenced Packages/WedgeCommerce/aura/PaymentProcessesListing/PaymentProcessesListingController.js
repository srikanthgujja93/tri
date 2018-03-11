({
	getPaymentProcessors : function(cmp, evt, helper) {
		var next = false;
        var prev = false;
        helper.getPaymentProcessors(cmp,next,prev);
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
        helper.getPaymentProcessors(cmp,next,prev,offset); 
    },
    Previous:function(cmp,event,helper){
        var next = false;
        var prev = true;
        var offset = cmp.get("v.offset");
        helper.getPaymentProcessors(cmp,next,prev,offset); 
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
            alert("Select atleast 1 record(s)");
            $A.util.removeClass(cmpBack, 'slds-backdrop--open'); 
        }
        var action = component.get("c.DeleteMass");
        if(confirm("Are you sure?")){
            action.setParams({ 
               "delIDs" :  delIdsPassInClass
            });            
        }
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert(state);
            if (state === "SUCCESS") {
                $A.util.removeClass(cmpBack, 'slds-backdrop--open'); 
            }
        });
         $A.enqueueAction(action);
		component.updateList();
    },
    updatelistmeth:function(component,event,helper){
        component.updateList();
    }
    
})
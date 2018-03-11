({
	getContacts : function(cmp,next,prev,offset) {
		offset = offset || 0;
		var action = cmp.get("c.getAllContacts");
        action.setParams({
            "next" : next,
            "prev" : prev,
            "off" : offset,      
        });
        action.setCallback(this,function(res){
            var state = res.getState();            
            if(state=="SUCCESS"){
              var result = res.getReturnValue();
              cmp.set('v.offset',result.offst);
              cmp.set('v.ContactList',result.acc);
              cmp.set('v.next',result.hasnext);
              cmp.set('v.prev',result.hasprev);
              cmp.set('v.currentPage',result.currentPage);
              cmp.set('v.totalPages',result.totalPages);
            }
        });        
        $A.enqueueAction(action);
        var actionCount = cmp.get("c.getRecordCount");
        actionCount.setCallback(this,function(res){
        	var state = res.getState();
        	if(state == 'SUCCESS'){
        		cmp.set('v.count',res.getReturnValue());
        	}
        });
        $A.enqueueAction(actionCount);
	}
})
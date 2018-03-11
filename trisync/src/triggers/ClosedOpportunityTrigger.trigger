trigger ClosedOpportunityTrigger on Opportunity (before insert,before update) {
    
    
    list<Task> Tasktoinsert= new list<Task>();
    for(Opportunity ops:trigger.new)
    {
        if(ops.StageName=='Closed Won')
        {
            Task t = new Task();
            t.subject='Follow Up Test Task';
            t.WhatId=ops.Id;
            Tasktoinsert.add(t);
            
            
        }
        
    }
    if(Tasktoinsert.size()>0)
    {
        insert Tasktoinsert;
    }

}
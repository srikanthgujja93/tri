trigger accountdup on Account (before insert) {
	Integer count=[select count() from Account where name=:Trigger.New[0].Name];
    if(count> 0){
        Trigger.New[0].addError('Duplicate name already exits');
    }
}
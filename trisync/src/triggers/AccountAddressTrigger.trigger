trigger AccountAddressTrigger on Account (before insert, before Update) {
    
    for(account acct: trigger.new){
        
        if(acct.Match_Billing_Address__c== true){
            acct.ShippingPostalCode=acct.BillingPostalCode;
            }
        
    }
        
    

}
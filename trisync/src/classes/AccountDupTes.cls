@isTest
private class AccountDupTes {
	@isTest
    static void testme(){
        Account a1=new Account(Name='Test');
        insert a1;
        Integer count=[select count() from Account];
        Account a2=new Account(Name='Test');
        try{
            insert a2;
        }catch(Exception e){
            System.debug(e);
        }
        Integer size=[select count() from Account];
        System.assertEquals(count,size);
    }
}
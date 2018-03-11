public class AccountHandler {

    
    public static Account insertNewAccount(string name)
        
    {
        Account a=new Account();
        a.Name=name;
        try{
            insert a;
        }
        catch(exception e)
        {  return null;
        }
        return a;
    }
    
}
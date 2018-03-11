public class ContactSearch {
//its dont execute on developer console becose of static keyword try to remove static and run on developer console
    public static List<Contact> searchForContacts(String lastName, String mailingPostalCode) {
        List<Contact> conList = [SELECT Id, Name, LastName, MailingPostalCode
                                 FROM Contact
                                 WHERE LastName = :lastName AND MailingPostalCode = :mailingPostalCode];
        return conList;
    }   
}
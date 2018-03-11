/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class SMSHistory {
    global Id recordId;
    global List<gkn_sms__SMS_History__c> smsHistoryList {
        get;
        set;
    }
    global List<Task> smsList {
        get;
        set;
    }
    global SMSHistory(ApexPages.StandardController controller) {

    }
}

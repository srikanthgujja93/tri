/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
@RestResource(urlMapping='/sfdc_sms_api/')
global class SMSRestApi {
    global SMSRestApi() {

    }
    @HttpPost
    global static gkn_sms.SMSRestApi.ResponseStatus getIncomimgSMS(Long id, String fromNumber, String toNumber, String messageBody, Boolean isSavedToSalesforce, Boolean isOptOut, String messageSid, Integer numSegments, String accountSid, String smsStatus, String recordId, String sfOrgId, String otherKey) {
        return null;
    }
    @HttpGet
    global static gkn_sms.SMSRestApi.ResponseStatus updateOutgoingSMSStatus() {
        return null;
    }
global class ResponseStatus {
    global ResponseStatus(String status, String message) {

    }
}
}

<!-- 
	Created by   : Sudip Halder
    Created Date : 13/June/2017
    Description  : This APP contains two (SMSNotification, SMSReplyPopup)components. 
    It is used in VF pages (SMSNotification, SMSReply) to open the components. 
-->
<aura:application extends="ltng:outApp" access="global" >
    <aura:dependency resource="gkn_sms:SMSNotification"/>
    <aura:dependency resource="gkn_sms:SMSReplyPopup"/>    
</aura:application>
({
    InitializtaionofObjects : function(component,event){
        this.BindDropDownList(component);
        this.getObjectList(component);
        var today = new Date();
        var currentDate= today.getDate();
        if(currentDate.toString().length ==1)
            currentDate='0'+currentDate;
        //  alert(currentDate.toString().length)
        var currentMonth = today.getMonth()+1;
        if(currentMonth.toString().length ==1)
            currentMonth='0'+currentMonth;
        
        component.set('v.myDate', today.getFullYear() + "-" + currentMonth+ "-" + currentDate);
        component.set('v.LastDate', today.getFullYear() + "-" + currentMonth + "-" + currentDate);
        var MonthlyDays=[];
        for(var i=1;i<=31;i++){
            MonthlyDays.push({label: i, value: i});
        }
        MonthlyDays.push({label: 'Last', value: 'L'});
        component.find("InputSelectDay").set("v.options", MonthlyDays);  
        
        var lst= [{ label: "the 1st", value: "1", selected: "true" },
                  { label: "the 2nd", value: "2" },
                  { label: "the 3rd", value: "3"},
                  { label: "the 4th", value: "4" }
                  //, { class: "optionClass", label: "the Last", value: "L" }
                 ]
        component.find("Selectfirst").set("v.options", lst);   
        var days= [ { label: "Sunday", value: "SUN" },
                   { label: "Monday", value: "MON" , selected: "true"},
                   { label: "Tuesday", value: "TUE" },
                   { label: "Wednesday", value: "WED" },
                   { label: "Thursday", value: "THU" },
                   { label: "Friday", value: "FRI" },
                   { label: "Saturday", value: "SAT" }];
        component.find("Selectdays").set("v.options", days);         
        this.getWeekly(component, event);  
    },
    getObjectList : function(component) {
        var action=component.get("c.ObjectName");
        var obj =component.find("SelectedObject");
        action.setCallback(this,function(response){
            component.set('v.Objectname',response.getReturnValue());  
            var objlist= response.getReturnValue();
            var selectedobj=objlist[0]; 
            component.set('v.objname',selectedobj);   
            this.getViewList(component,selectedobj);
            this.getTempList(component,selectedobj);
            this.toFieldList(component,selectedobj);  
        }); 
        $A.enqueueAction(action);        
    },
    FromFieldList :function(component){
        var action= component.get("c.FromFieldList"); 
        action.setCallback(this,function(response){
            component.set('v.FromFieldList',response.getReturnValue());
            component.set('v.FromContactNo',response.getReturnValue()[0].Fromname); 
        });
        $A.enqueueAction(action);        
    },
    toFieldList :function(component,selectedobj){
        var opts = [];
        var TofieldList = component.find('ToField');
        var action= component.get("c.getFieldName");
        action.setParams({
            "selObj" : selectedobj 
        });
        
        action.setCallback(this,function(response){            
            var Data=response.getReturnValue();            
            if(response.getReturnValue() != null && response.getReturnValue().length >0 ) {     
                for(var i=0;i< Data.length;i++){
                    opts.push({label: Data[i].split('###')[1], value: Data[i].split('###')[0]});   
                }
                TofieldList.set('v.options',opts);
                component.set('v.Isspinner',false);
            }
        });
        $A.enqueueAction(action);        
    },
    
    getViewList : function(component,selectedobj){
        var action1=component.get("c.ViewName"); 
        action1.setParams({
            "objName" : selectedobj
        });
        action1.setCallback(this,function(response){
            component.set('v.Vname',response.getReturnValue());
            if(response.getReturnValue().length >0){
                component.set('v.viewname',response.getReturnValue()[0].viewid); }
        });
        $A.enqueueAction(action1);
        
    },
    getTempList : function(component,objName)
    {
        var action=component.get("c.getTemplate");        
        action.setParams({
            "obj"  : objName 
        });
        action.setCallback(this,function(response){
            var data=response.getReturnValue();            
            component.set('v.Templatename',data);
            if(data.length>0)
            {
                var Temp=data[0].tempid;
                component.set('v.tempname',Temp); 
                this.GetTemplateBody(component,Temp);
            }
        });
        $A.enqueueAction(action); 
    }, 
    getWeekly : function(component,event)
    {
        var divWeek = component.find('divradio-Weekly');
        var divMon =component.find('divradio-Monthly');
        $A.util.addClass(divWeek,'slds-show');
        $A.util.removeClass(divWeek,'slds-hide');        
        $A.util.addClass(divMon,'slds-hide');
        $A.util.removeClass(divMon,'slds-show');    
    },
    getMonthly : function (component,event,helper)
    {
        var divWeek = component.find('divradio-Weekly');
        var divMon =component.find('divradio-Monthly');
        $A.util.addClass(divMon,'slds-show');
        $A.util.removeClass(divMon,'slds-hide');
        $A.util.addClass(divWeek,'slds-hide');
        $A.util.removeClass(divWeek,'slds-show');
    },
    
    SaveSchedulingDetails : function (component,event,helper)
    { 
        if(this.CheckEmptyFields(component,event)) {
            var obj=component.find('SelectedObject').get('v.value');
            var temp=component.find('SelectedTemplate').get('v.value');
            var View=component.find('SelectedView').get('v.value');
            var startinhour=component.find('StartTimeHour').get('v.value');
            var startinMin=component.find('StartTimeMin').get('v.value');
            var expr='';
            if(obj==null){
                obj=component.get('v.objname');
            }
            if(temp==null){
                temp=component.get('v.tempname');
            }
            if(View==null){
                View=component.get('v.viewname');
            }
            
            
            var radWeek=document.getElementById('radio-Weekly').checked;
            var radMon=document.getElementById('radio-Monthly').checked;
            var Scheduletype='',SchedulingDays='';
            if(radWeek == true && radMon== false) {
                Scheduletype ='Weekly';
                expr= component.get('v.Weekday');
                SchedulingDays=expr;                
            }else if(radWeek == false && radMon== true) {
                Scheduletype ='Monthly';
                var chkonday =document.getElementById('radio-OnDay').checked;
                var chkthisdate=document.getElementById('radio-Onthis').checked;
                
                if(chkonday== true && chkthisdate==false ){
                    expr=component.find('InputSelectDay').get('v.value');
                    SchedulingDays='On' +expr +'of every Month';                    
                }else if(chkthisdate== true && chkonday==false) {
                    expr= component.find('Selectdays').get('v.value') +'#'+component.find('Selectfirst').get('v.value');
                    SchedulingDays='On' +component.find('Selectdays').get('v.value') +' ' +component.find('Selectfirst').get('v.value') +'of every Month';
                }
            }    
            
            SchedulingDays='#'+SchedulingDays +'#';
            var ToField= component.find('ToField').get('v.value');
            var startdate=component.find('StartDate').get('v.value');
            var EndDate=component.find('EndDate').get('v.value');  
            var FromField=component.find('SelectedFromField').get('v.value');
            var Title=component.find('TitleForSMS').get('v.value');
            var STime=startinhour +':'+startinMin;
            var SMSTemplateBody=component.find('TemplateBody').get('v.value');
            var action=component.get("c.SaveSchedulingDetails");
            
            action.setParams({
                "TemplateBody" : SMSTemplateBody, 
                "Title" : Title,
                "FromField" : FromField,
                "ToField" : ToField,
                "Obj": obj,
                "Template" : temp,
                "View" : View,
                "SchedulerType" : Scheduletype,
                "ScheduleDays" : SchedulingDays,
                "StartDate" : startdate,
                "EndDate" :  EndDate,
                "Starttime" : STime
            }); 
            action.setCallback(this,function(response){
                var status=response.getState();                
                var responseJson=JSON.parse(response.getReturnValue());
                if(responseJson.status == 'success'){
                    component.set('v.ErrorMessage' ,'');
                    component.set('v.Message' ,'');                    
                    var RecordID=responseJson.errorMessage;
                    this.SubmitScheduler(component,event,RecordID);
                }else if(responseJson.status == 'error'){
                    component.set('v.Message' ,'');
                    component.set('v.ErrorMessage','The Job is already Exist.Please change the name and try Again!');
                    component.find('TitleForSMS').set('v.errors',[{ message : 'Please change the name and try Again!'}]);
                    component.set('v.Isspinner',false);
                }else{
                    component.set('v.Isspinner',false);
                }   
            });
            $A.enqueueAction(action);
        }
        else{
            component.set('v.Isspinner',false);
        }
    },
    SubmitScheduler :function(component,event,RecordID){
        
        var JobTitle=component.find('TitleForSMS').get('v.value');
        var CronExpr='';
        var ValidateFields= true;        
        var obj=component.find('SelectedObject').get('v.value');
        var temp=component.find('SelectedTemplate').get('v.value');
        var View=component.find('SelectedView').get('v.value');
        var Startyear=component.find('StartDate').get('v.value').split('\-')[0];
        var Endyear=component.find('EndDate').get('v.value').split('\-')[0];
        var startinhour=component.find('StartTimeHour').get('v.value');
        var startinMin=component.find('StartTimeMin').get('v.value');
        var expr='';
        if(obj==null){
            obj=component.get('v.objname');
        }
        if(temp==null){
            temp=component.get('v.tempname');
        }
        if(View==null){
            View=component.get('v.viewname');
        }
        
        var radWeek=document.getElementById('radio-Weekly').checked;
        var radMon=document.getElementById('radio-Monthly').checked;
        var Scheduletype='',SchedulingDays='';
        if(radWeek == true && radMon== false) {
            Scheduletype ='Weekly';
            expr= component.get('v.Weekday');
            SchedulingDays=expr;
            CronExpr=' 0 '+startinMin +' '+ startinhour+' ? * '+ expr +' '+Startyear+'-'+Endyear;
        }else if(radWeek == false && radMon== true) {
            Scheduletype ='Monthly';
            var chkonday =document.getElementById('radio-OnDay').checked;
            var chkthisdate=document.getElementById('radio-Onthis').checked;
            
            if(chkonday== true && chkthisdate==false ){
                expr=component.find('InputSelectDay').get('v.value');
                SchedulingDays='On' +expr +'of every Month';
                CronExpr=' 0 '+startinMin +' '+ startinhour+' '+ expr +' * ? '+Startyear+'-'+Endyear;
            }else if(chkthisdate== true && chkonday==false) {
                expr= component.find('Selectdays').get('v.value') +'#'+component.find('Selectfirst').get('v.value');
                SchedulingDays='On' +component.find('Selectdays').get('v.value') +' ' +component.find('Selectfirst').get('v.value') +'of every Month';
                CronExpr=' 0 '+startinMin +' '+ startinhour+' ? * '+expr +' '+Startyear+'-'+Endyear;
            }
        } 
        var action=component.get("c.SubmitData");
        action.setParams({
            "Obj": obj ,
            "Template" : temp ,
            "View" : View,
            "CronExp" : CronExpr,
            "JobName" : JobTitle
        });        
        action.setCallback(this,function(response){
            var state=response.getState();
            var responseJson=JSON.parse(response.getReturnValue());
            if(responseJson.status != 'error'){
                component.set('v.Message','Schedule Successfully !');
                component.set('v.ErrorMessage' ,'');
                var JobId=responseJson.status;
                this.UpdateScheduleJobID(component,JobId,RecordID);
            }else if(responseJson.status == 'error'){
                component.set('v.ErrorMessage',responseJson.errorMessage);
                component.set('v.Message' ,'');
                component.set('v.Isspinner',false);
            }
        });
        $A.enqueueAction(action);
    },
    
    UpdateScheduleJobID: function(component,JobID,RecordID)
    {
        var action=component.get('c.UpdateJobID');
        action.setParams({
            "RecordID" : RecordID,
            "JobID" : JobID
        });
        action.setCallback(this,function(response){
            var responseJson=JSON.parse(response.getReturnValue());            
            if(responseJson.status=='success')
            {
                component.set('v.ErrorMessage' ,'');
                component.set('v.Message','Schedule Successfully !');
                this.ClearAllfield(component);
                //this.InitializtaionofObjects(component, event);
                component.set('v.Isspinner',false);           
                var evt = $A.get("e.gkn_sms:smsApp");
                if(evt!=undefined)
                {
                 	evt.fire();   
                }
            }else{
                component.set('v.Message','');
                component.set('v.ErrorMessage','Not Saved');
                component.set('v.Isspinner',false);
            }
            
        });
        
        $A.enqueueAction(action);
    },
    CheckEmptyFields: function(component,event){
        
        var IsValid=true;
        var obj=component.find('SelectedObject').get('v.value');
        var temp=component.find('SelectedTemplate').get('v.value');
        var View=component.find('SelectedView').get('v.value');
        var FromField=component.find('SelectedFromField').get('v.value');
        var Title=component.find('TitleForSMS').get('v.value');  
        var StartHours=component.find('StartTimeHour').get('v.value');  
        var StartMin=component.find('StartTimeMin').get('v.value'); 
        var TempBody=component.find('TemplateBody').get('v.value'); 
        if($A.util.isEmpty(Title) ){
            component.find('TitleForSMS').set('v.errors',[{ message : 'Please Enter Title' }]);
            IsValid=false;
        } else{
            component.find('TitleForSMS').set('v.errors',null);            
        }
        
        if($A.util.isEmpty(FromField) || FromField=='None'){
            component.find('SelectedFromField').set('v.errors',[{ message : 'Select From Field' }]);
            IsValid=false;
        } else{
            component.find('SelectedFromField').set('v.errors',null);            
        }
        
        if($A.util.isEmpty(obj) || obj=='None' ){
            component.find('SelectedObject').set('v.errors',[{ message : 'Select Object Name' }]);
            IsValid=false;
        } else{
            component.find('SelectedObject').set('v.errors',null);            
        }
        
        var Tofield=component.find('ToField').get('v.value');        
        if($A.util.isEmpty(Tofield) || Tofield=='None'){
            component.find('ToField').set('v.errors',[{ message : 'Select To field' }]);
            IsValid=false;
        } else{
            component.find('ToField').set('v.errors',null);           
        }
        
        if($A.util.isEmpty(temp) || temp=='None'){
            IsValid=false;
            component.find('SelectedTemplate').set('v.errors',[{ message : 'Select Template Name' }]);
        }else{
            component.find('SelectedTemplate').set('v.errors',null);
        }
        if($A.util.isEmpty(View) || View=='None'){
            IsValid=false;
            component.find('SelectedView').set('v.errors',[{ message : 'Select View Name' }]);
        }else{
            component.find('SelectedView').set('v.errors',null);
        }
        
        if($A.util.isEmpty(TempBody)){
            IsValid=false;
            component.find('TemplateBody').set('v.errors',[{ message : 'Please write Template body' }]);
        }else{
            component.find('TemplateBody').set('v.errors',null);
        }
        if(document.getElementById('radio-Weekly').checked==true){
            var weeklyDays=component.get('v.Weekday');
            if(weeklyDays==null || weeklyDays==undefined || weeklyDays=='') {
                IsValid=false;
                component.set('v.emptyWeekDays','Please select atleast one day to schedule this Job');
            }else{
                component.set('v.emptyWeekDays','');
            }
        }else{
            component.set('v.emptyWeekDays','');
        }
        
        if($A.util.isEmpty(StartHours)){
            component.find('StartTimeHour').set('v.errors',[{ message : 'Select Hours' }]);
            IsValid=false; 
        }else{
            component.find('StartTimeHour').set('v.errors',null);
        }
        if($A.util.isEmpty(StartMin)){
            component.find('StartTimeMin').set('v.errors',[{ message : 'Select Minute' }]);
            IsValid=false; 
        }else{
            component.find('StartTimeMin').set('v.errors',null);
        }
        
        var today = new Date();
        var currentDate= today.getDate();
        if(currentDate.toString().length ==1)
            currentDate='0'+currentDate;
        var currentMonth = today.getMonth()+1;
        if(currentMonth.toString().length ==1)
            currentMonth='0'+currentMonth;
        var Dateoftoday= today.getFullYear() + "-" + currentMonth + "-" + today.getDate()
        var StartDate=component.find('StartDate').get('v.value');
        var EndDate=component.find('EndDate').get('v.value');
        if(StartDate < Dateoftoday ){
            IsValid=false;
            component.find('StartDate').set('v.errors',[{ message : 'Start Date must be greater than or equal to current date' }]);
        }else{
            component.find('StartDate').set('v.errors',null);            
        }        
        if(EndDate < StartDate){
            IsValid=false;
            component.find('EndDate').set('v.errors',[{message : 'End date  must be greater than or equal to Start date' }]);
        }else{
            component.find('EndDate').set('v.errors',null);            
        }     
        return IsValid;
    },
    
    GetTemplateBody: function(component,templateID){        
        var TempID=templateID;
        var action1=component.get("c.FetchTemplateText");
        var TemplateBody='';
        action1.setParams({
            "TemplateID" : TempID
        });
        action1.setCallback(this, function(response){
            var status=response.getState();
            if(status=='SUCCESS')
            {
                TemplateBody=response.getReturnValue();
                component.find('TemplateBody').set('v.value',TemplateBody);
            }
            component.set('v.Isspinner',false);
        });
        $A.enqueueAction(action1);
    },
    
    BindDropDownList: function(component)
    {
        var Minutes=[];
        var Hours=[];
        Minutes.push({ label:'MM', value: ''}); 
        Hours.push({ label:'HH', value:''});
        for(var i=1; i<60; i++)
        {
            if(i<=9){            
                Minutes.push({ label:'0'+i, value: '0'+i}); 
                Hours.push({ label:'0'+i, value: i});
            } else if(i>9 && i<24){
                Minutes.push({ label:i, value: i});
                Hours.push({ label:i, value: i});
            }else if(i >= 24){
                Minutes.push({ label:i, value: i});
            }
        }
        component.find('StartTimeMin').set('v.options',Minutes);
        component.find('StartTimeHour').set('v.options',Hours);
        
    },
    ClearAllfield : function (component) {
        component.set("v.Isspinner",true);
        component.find("TitleForSMS").set('v.value','');
        component.find("SelectedObject").set('v.value','None');        
        component.find("SelectedFromField").set('v.value','None');
        component.find("ToField").set("v.value","");
        component.find("SelectedView").set('v.value','None');
        component.find("SelectedTemplate").set('v.value','None');       
    }   
    
})
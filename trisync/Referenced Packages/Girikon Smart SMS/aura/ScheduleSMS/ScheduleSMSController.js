({
    doInit : function(component, event, helper) {
        helper.InitializtaionofObjects(component, event);
        helper.FromFieldList(component);   
        var opts = [{ label: "None", value: "None", selected: "true" }];
        component.find("ToField").set("v.options", opts);
    },
    FetchTemplateBody : function(component,event,helper){
        component.set('v.Isspinner',true);
        var templateid= component.find('SelectedTemplate').get('v.value');
        helper.GetTemplateBody(component,templateid);
    },
    getObjectList: function (component, event, helper){
        component.set('v.Isspinner',true);
        var tempbody='';
        component.find('TemplateBody').set('v.value',tempbody);
        var  objName=component.find('SelectedObject').get('v.value');
        helper.getViewList(component,objName);
        helper.getTempList(component,objName);
        helper.toFieldList(component,objName); 
    },
    UpdateDay :function (component, event, helper){ 
        var Day=event.target.id;
        var chk = event.target.checked;  
        var daysList = component.get('v.Weekday');        
        if(chk==true)
        {
            daysList.push(event.target.id) ; 
            component.set('v.Weekday',daysList);
        }
        else if(chk==false)
        {
            var indx= daysList.indexOf(Day);
            daysList.splice(indx,1);              
            component.set('v.Weekday',daysList);
        }
        console.log(daysList);
    },
    getWeekly : function(component,event,helper)
    {
        helper.getWeekly(component, event, helper);
    },
    getMonthly : function (component,event,helper)
    {
        helper.getMonthly(component, event, helper);
    },  
    Cancel : function (component,event,helper){
        helper.ClearAllfield(component);
        component.find('StartTimeHour').set('v.errors',null);
        component.find('StartTimeMin').set('v.errors',null);
        component.find('TemplateBody').set('v.errors',null);
        component.find('SelectedView').set('v.errors',null);
        component.find('SelectedTemplate').set('v.errors',null);
        component.find('ToField').set('v.errors',null); 
        component.find('SelectedObject').set('v.errors',null); 
        component.find('SelectedFromField').set('v.errors',null);   
        component.find('TitleForSMS').set('v.errors',null);
        component.set('v.emptyWeekDays','');
        helper.InitializtaionofObjects(component, event);
    },
    Submit : function (component, event, helper){
        component.set('v.Isspinner',true);
        helper.SaveSchedulingDetails(component, event, helper);
    },
    closeMessage : function (component, event, helper){
        component.set('v.Message','');
        component.set('v.ErrorMessage','');
    }
})
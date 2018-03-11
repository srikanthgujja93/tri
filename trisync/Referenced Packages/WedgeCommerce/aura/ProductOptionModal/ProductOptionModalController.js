({
    scriptsLoaded : function(component, event, helper) {
		$( document).on("click"," .wdg-form--blockfields .wdg-variant-table .addRow",function(){
            $(this).parent().parent().parent().parent().after( "<tr >"+$("#PrimeRow").html()+"</tr>");
        });

        $( document).on("click"," .wdg-form--blockfields .wdg-variant-table .deleteRow",function(){
        	if($(".wdg-form--blockfields .wdg-variant-table tbody tr").length>1)
            	$(this).parent().parent().parent().parent().remove();
        }); 
	},
	initialize:function(cmp,event,helper){        
		var productOptionId = cmp.get("v.ProductOptionId");
        if(productOptionId!=null){
            var action = cmp.get("c.getProductOptionRow");
                action.setParams({
                    "productOptionId" : productOptionId
                });            
                action.setCallback(this,function(res){
                    var state = res.getState();
                    if(state=='SUCCESS'){    
                        cmp.set('v.newProductOption',res.getReturnValue());
                        document.getElementById('ip_type_sel').value = cmp.get('v.newProductOption.wk_wedge__Option_Type__c');
                        var ProductVariants = JSON.stringify(cmp.get('v.newProductOption.wk_wedge__Product_Option_Variants__r'));                        
                        if(ProductVariants!=null && ProductVariants!=''){
                            var variants=JSON.parse(ProductVariants);
                            for(var key in variants){
                                var arr=$(".wdg-form--blockfields .wdg-variant-table tbody tr");
                                $(".position input",arr[key]).val(variants[key]['wk_wedge__Order_Index__c']);
                                $(".variant input",arr[key]).val(variants[key]['Name']);
                                $(".modifier input",arr[key]).val(variants[key]['wk_wedge__Modifier__c']);
                                $(".typeval select",arr[key]).val(variants[key]['wk_wedge__Type__c']);
                                if($(".wdg-form--blockfields .wdg-variant-table tbody tr").length<variants.length)
                                    $(".wdg-form--blockfields .wdg-variant-table .addRow").last().trigger("click");
                            }
                        }
                    }
                });
            $A.enqueueAction(action);            
        }    
        var cmpTarget = cmp.find('Modalbox');
       	var cmpBack = cmp.find('MB-Back');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open');
    },
    tabOneAction : function(component) {
		var tab1 = component.find('t1');
        var showTab1 = component.find('tab1');
        
        var tab2 = component.find('t2');
        var showTab2 = component.find('tab2');
        
        $A.util.addClass(tab1, 'slds-active');
        $A.util.addClass(showTab1, 'slds-show');
        $A.util.removeClass(showTab1, 'slds-hide');
        
        $A.util.removeClass(tab2, 'slds-active');
        $A.util.removeClass(showTab2, 'slds-show');
        $A.util.addClass(showTab2, 'slds-hide');
	},
    tabTwoAction : function(component) {
        var val = document.getElementById('ipType').value;
        if(val!='S' && val!='C' && val!=''){
            var tab1 = component.find('t1');
            var showTab1 = component.find('tab1');
            
            var tab2 = component.find('t2');
            var showTab2 = component.find('tab2');
            
            $A.util.removeClass(tab1, 'slds-active');
            $A.util.removeClass(showTab1, 'slds-show');
            $A.util.addClass(showTab1, 'slds-hide');
            
            $A.util.addClass(tab2, 'slds-active');
            $A.util.removeClass(showTab2, 'slds-hide');
            $A.util.addClass(showTab2, 'slds-show');
        }else{
            alert('Variants cannot be defined for this feature type.');            
        }
		
	},
    createProductOption:function(component, event, helper) {
		var nameField = component.find("name");                       
        var nm = nameField.get("v.value");

        if(nm==''){
            nameField.set("v.errors", [{message:"This is a required Field."}]);
        }else{
            nameField.set("v.errors", null);
			var variants='';            
            var newProductOption = component.get("v.newProductOption");            
            if($("#ipType").val()=='M' || $("#ipType").val()=='T'){
                var arr=[];
                $(".wdg-form--blockfields .wdg-variant-table tbody tr").each(function(){
                    var obj={"pos":"","val":'',"modif":'',"type":''};
                    var a=$(".position input",this).val();
                    var b=$(".variant input",this).val();
                    var c=$(".modifier input",this).val();
                    var d=$(".typeval select",this).val();
                            
                    obj['pos']=a;
                    obj['val']=b;
                    obj['modif']=c;
                    obj['type']=d;
                	arr.push(obj);
                });
            	$("#variants").val(JSON.stringify(arr));
                variants=JSON.stringify(arr);
            }            
            helper.createProductOption(component,newProductOption,variants);
			            
            var updateList = component.getEvent("UpdateEvent");
            updateList.fire();
            var compEvent = component.getEvent("RemoveComponent");            
            compEvent.setParams({
                "comp" : component
            });
	    	compEvent.fire();            
        } 
	},
    removeComponent:function(component, event, helper){
        var compEvent = component.getEvent("RemoveComponent");
        compEvent.setParams({
        	"comp" : component
        });
	    compEvent.fire();    	
    },
    changeValue: function(component,event,helper){
    	component.set('v.newProductOption.wk_wedge__Option_Type__c',document.getElementById('ip_type_sel').value);
    }
})
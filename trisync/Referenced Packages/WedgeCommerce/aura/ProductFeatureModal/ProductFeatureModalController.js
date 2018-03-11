({
    scriptsLoaded : function(component, event, helper) {
		$( document).on("click"," .wdg-form--blockfields .wdg-variant-table .addRow",function(){
            $(this).parent().parent().parent().parent().after( "<tr >"+$("#PrimeRow").html()+"</tr>");
        });

        $( document).on("click"," .wdg-form--blockfields .wdg-variant-table .deleteRow",function(){
        	if($(".wdg-form--blockfields .wdg-variant-table tbody tr").length>1)
            	$(this).parent().parent().parent().parent().remove();
        });
        
        //----Category Tree----//
        var action = component.get("c.getAllCategories");
        var categories =[];
        action.setCallback(this,function(res){
            var state = res.getState();
            if(state=='SUCCESS'){
                component.set('v.jsonString',res.getReturnValue());
                categories = JSON.parse(res.getReturnValue());
                if(categories.length>0){
                    window.createtable(1, categories,'catRoot');
                }
            }
        });
        $A.enqueueAction(action);
        window.createtable = function(rootL, categories, containerID){
            var dataTable = '';
            for(var key in categories){
            	var catStatus=categories[key]['status']==true?'Active':'Hidden';
                dataTable='<table class="wdg-category--tableCategory cat-table cat-tree-table cat-table-nochild" style="border:none;">';
                dataTable+='<tbody><tr>';
                dataTable+='<td class="Xsmall">';
                dataTable+='<div class=""><input  class="check uiInput uiInputCheckbox uiInput--default uiInput--checkbox" type="checkbox"  Value="'+categories[key]['key']+'"/></div>';//custom-checkbox
                dataTable+='</td>'
                dataTable+='<td class=" halfwidth left-shift">';                             
                if(categories[key]['children'] ===undefined){
                	dataTable+= '<div class="child-expander hidden">'+addSpaces(rootL)+'<span></span>';
                }else{
                	dataTable+= '<div class="child-expander child-expander-active" data-target="cat-rl'+1+'-'+categories[key]['key']+'">'+addSpaces(rootL)+'<span></span>';
                }
                dataTable+= '<p class="display-inline--block">'+ categories[key]['title'] +'</p></div>';
                dataTable+='</td>';
                dataTable+='</tr></tbody></table>';
                if(categories[key]['children']!==undefined){
                    dataTable+='<div class="cat-middle-wrap" id="cat-rl'+1+'-'+categories[key]['key']+'" style="display:none"></div>'
                    $("#"+containerID).append(dataTable);
                    createtable(rootL+1, categories[key]['children'],'cat-rl'+1+'-'+categories[key]['key']);
                }else{
                	$("#"+containerID).append(dataTable);
                }
        	}
        }
        
        $("#dropdown").click(function(){
            $(this).html('<svg class="slds-icon slds-icon-text-default slds-icon--small" aria-hidden="true" data-aura-rendered-by="40:0"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="'+$A.get('$Resource.SLDS') +'/assets/icons/utility-sprite/svg/symbols.svg#down'+'"></use></svg><span class="slds-assistive-text" data-aura-rendered-by="42:0">Click</span>');
        });
        window.addSpaces=function(rootL){
        	var s='';
            for(var i=0;i<rootL;i++)
            	s+='&nbsp;&nbsp;&nbsp;';                    
            return s;                       
        }
        $( document ).on("click","div.child-expander span", function(){
            var a=$(this).parent().attr('data-target');
            $(this).toggleClass('content-expand');
            console.log(a);
        	$("#"+a).slideToggle(200);
        });
        
        $(document).on("click",'.check',function(){
			var variant='';            
            $(".categorydiv input:checked").each(function(){                
            	if($(this).prop('checked')==true){
                    variant += $(this).val()+',';                 
                }           
            });
            component.set('v.newProductFeature.wk_wedge__Category_ID__c',variant);
            console.log(component.get('v.newProductFeature.wk_wedge__Category_ID__c'));
        });
	},
	initialize:function(cmp,event,helper){        
		var productFeatureId = cmp.get("v.ProductFeatureId");
        if(productFeatureId!=null){
            var action = cmp.get("c.getProductFeatureRow");
                action.setParams({
                    "productFeatureId" : productFeatureId
                });            
                action.setCallback(this,function(res){
                    var state = res.getState();
                    if(state=='SUCCESS'){    
                        cmp.set('v.newProductFeature',res.getReturnValue());
                        document.getElementById('ip_type_sel').value = cmp.get('v.newProductFeature.wk_wedge__Type__c');
                        document.getElementById('catstring').value = cmp.get('v.newProductFeature.wk_wedge__Category_ID__c');                       
                        var str = document.getElementById('catstring').value;
                        var arr =[];
                        arr = str.split(',');
                        arr.pop();
                        for(var i=0;i<arr.length;i++){							                            
                            $(".categorydiv input:checkbox:not(:checked)").each(function(){                                 
                                //alert("working");
                                if(arr[i]==$(this).val()){
                                    //alert(arr[i]);
                                    $(this).prop('checked',true);                 
                                }           
                            });
                        }
                        var ProductVariants = JSON.stringify(cmp.get('v.newProductFeature.wk_wedge__Product_Feature_Variants__r'));                        
                        if(ProductVariants!=null && ProductVariants!=''){
                            var variants=JSON.parse(ProductVariants);
                            for(var key in variants){
                                var arr=$(".wdg-form--blockfields .wdg-variant-table tbody tr");
                                $(".position input",arr[key]).val(variants[key]['wk_wedge__order_Index__c']);
                                $(".variant input",arr[key]).val(variants[key]['Name']);
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
    createProductFeature:function(component, event, helper) {
		var nameField = component.find("name");                       
        var nm = nameField.get("v.value");

        if(nm==''){
            nameField.set("v.errors", [{message:"This is a required Field."}]);
        }else{
            nameField.set("v.errors", null);
			var variants='';            
            var newProductFeature = component.get("v.newProductFeature");            
            if($("#ipType").val()=='M' || $("#ipType").val()=='T'){
                var arr=[];
                $(".wdg-variant-table tbody tr").each(function(){
                    var obj={"pos":"","val":''};
                    var a=$(".position input",this).val();
                    var b=$(".variant input",this).val();
                    obj['pos']=a;
                    obj['val']=b;
                	arr.push(obj);
                });
            	$("#variants").val(JSON.stringify(arr));
                variants=JSON.stringify(arr);
            }   
            helper.createProductFeature(component,newProductFeature,variants);            
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
    	component.set('v.newProductFeature.wk_wedge__Type__c',document.getElementById('ip_type_sel').value);
    }
})
({
	scriptsLoaded : function(component, event, helper) {
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
        $("#dropdown").click(function(){
            $(this).html('<svg class="slds-icon slds-icon-text-default slds-icon--small" aria-hidden="true" data-aura-rendered-by="40:0"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="'+$A.get('$Resource.SLDS') +'/assets/icons/utility-sprite/svg/symbols.svg#down'+'"></use></svg><span class="slds-assistive-text" data-aura-rendered-by="42:0">Click</span>');
        });
        window.createtable = function(rootL, categories, containerID){
            var dataTable = '';
            for(var key in categories){
            	var catStatus=categories[key]['status']==true?'Active':'Hidden';
                dataTable='<table class="wdg-category--tableCategory cat-table cat-tree-table cat-table-nochild">';
                dataTable+='<tbody><tr>';
                dataTable+='<td class="Xsmall">';
                dataTable+='<div class="custom-checkbox"><input  class="eachselect" type="checkbox"  Value="'+categories[key]['key']+'"/></div>';
                dataTable+='</td>'
                dataTable+='<td class="small">';
                dataTable+= '<span>' +categories[key]['order']+'</span>';
                dataTable+='</td>';
                dataTable+='<td class=" halfwidth left-shift">';                             
                if(categories[key]['children'] ===undefined){
                	dataTable+= '<div class="child-expander hidden">'+addSpaces(rootL)+'<span></span>';
                }else{
                	dataTable+= '<div class="child-expander child-expander-active" data-target="cat-rl'+1+'-'+categories[key]['key']+'">'+addSpaces(rootL)+'<span></span>';
                }
                dataTable+= '<p class="display-inline--block">'+ categories[key]['title'] +'</p></div>';
                dataTable+='</td>';
                dataTable+='<td class="small">';
                dataTable+='<a target="_blank" href="'+categories[key]['href']+'" class="wdg-category--products">'+categories[key]['Products']+' </a>';
                dataTable+='</td>';
                dataTable+='<td class="medium">';
                dataTable+='<div class="dropdown status-dropdown">';
                dataTable+='<div data-toggle="dropdown" class="status status-value dropdown-toggle" id="ecm_status_Dropdown">';
                dataTable+='<span>'+catStatus+'</span> <span class="status-caret"></span>';
                dataTable+='</div>';
                dataTable+='<div class="status-dropdown-menu">';
                dataTable+='<span class="status status-option" targetid="'+categories[key]['key']+'"> Active</span>';
                dataTable+='<span class="status status-option" targetid="'+categories[key]['key']+'">Hidden</span>';
                dataTable+='</div></div>';
                dataTable+='</td>';
                //dataTable+='<td class="small">';
                //dataTable+='<a href="/apex/addcategories?id='+categories[key]['key']+'" class="wdg-ctrl--btn edit"><span></span></a>';
                //dataTable+='</td>';
                dataTable+='</tr></tbody></table>';
                if(categories[key]['children']!==undefined){
                	dataTable+='<div class="cat-middle-wrap" id="cat-rl'+1+'-'+categories[key]['key']+'"></div>'
                    $("#"+containerID).append(dataTable);
                    createtable(rootL+1, categories[key]['children'],'cat-rl'+1+'-'+categories[key]['key']);
                }else{
                	$("#"+containerID).append(dataTable);
                }
        	}
        }
        window.addSpaces=function(rootL){
        	var s='';
            for(var i=0;i<rootL;i++)
            	s+='&nbsp;&nbsp;&nbsp;';                    
            return s;                       
        }
        $( document ).on("click",".wdg-body .wdg-category--tableCategory td div.child-expander span", function(){
            var a=$(this).parent().attr('data-target');
            $(this).toggleClass('content-expand');
            console.log(a);
        	$("#"+a).slideToggle(200);
        });
        
	}
})
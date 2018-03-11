({
	scriptsLoaded : function(component, event, helper) {
        $(document ).on("click",".wdg .wdg-nav--menulist>li.wdg-accordion>a",function(){
        	if($(this).parent().hasClass("open")){
            	$(this).parent().removeClass("open");
                $(".wdg .wdg-nav--menulist>li.wdg-accordion>ul").slideUp();
                $(".wdg .wdg-nav--menulist>li.wdg-accordion>a>.carret").removeClass("down");
            }else if(!$(this).parent().hasClass("open")){
            	$(this).parent().addClass("open").siblings().removeClass("open");
                $(".wdg .wdg-nav--menulist>li.wdg-accordion>a>.carret").removeClass("down");
                $(".wdg .wdg-nav--menulist>li.wdg-accordion>ul").slideUp();
                $(".wdg .wdg-nav--menulist>li.wdg-accordion.open>ul").slideDown();
                $(".wdg .wdg-nav--menulist>li.wdg-accordion.open>a>.carret").addClass("down");
        	} 
    	});
        $("#collapse").click(function(){
            if($(".wdg-sideMenu").hasClass("expand")){
                $(".wdg .wdg-nav--menulist>li.wdg-accordion>ul").slideUp();
                $(".wdg-sideMenu").removeClass("expand");
            	$(".wdg-body").removeClass("move");
            }else if(!$(".wdg-sideMenu").hasClass("expand")){
                $(".wdg .wdg-nav--menulist>li.wdg-accordion.open>ul").slideDown();
                $(".wdg-sideMenu").addClass("expand");
            	$(".wdg-body").addClass("move");
        	}
    	});
	},
    initialize:function(component,event,helper){
        helper.getStoreAdmin(component,event);
    },
    storeAdmin:function(component,event,helper){
		helper.removeComponent(component);        
        helper.getStoreAdmin(component,event);
    },
    getArticleListing: function(cmp,event,helper) {
        var article = cmp.find('article');
        var storeAd = cmp.find('storeAd');
        var template = cmp.find('template');
        var paymentProcesses = cmp.find('paymentProcesses');
        var category = cmp.find('category');
        var prodFeatures = cmp.find('prodFeatures');
        var product = cmp.find('product');
        var prodOpt = cmp.find('prodOpt');
        var prodReview = cmp.find('prodReview');
        var coupons = cmp.find('coupons');
        var location = cmp.find('location');
        var shipmeth = cmp.find('shipmeth');
        var tax = cmp.find('loctax');
        var orders = cmp.find('orders');
        var customer = cmp.find('customer');
        var cartWishlist = cmp.find('cartWishlist');
        var productcat = cmp.find('productcat');
        var shipTax = cmp.find('shipTax');
        
        $A.util.removeClass(article,'article');
        $A.util.addClass(article,'articleblue');
        
        $A.util.removeClass(shipTax,'shipandtaxblue');
        $A.util.addClass(shipTax,'shipandtax');
               
        $A.util.removeClass(storeAd,'storeadminBlue');  
        $A.util.addClass(storeAd,'storeadmin');
        
        $A.util.removeClass(template,'templateblue');  
        $A.util.addClass(template,'template');
        
        $A.util.removeClass(paymentProcesses,'paymentblue');  
        $A.util.addClass(paymentProcesses,'payment');

        $A.util.removeClass(category,'categoryblue');  
        $A.util.addClass(category,'category');
        
        $A.util.removeClass(productcat,'productcatalogblue');
        $A.util.addClass(productcat,'productcatalog');        
        
        $A.util.removeClass(prodFeatures,'prodfeatureblue');  
        $A.util.addClass(prodFeatures,'prodfeature');
        
        $A.util.removeClass(product,'productblue');  
        $A.util.addClass(product,'product');
        
        $A.util.removeClass(prodOpt,'prodOptionsblue');  
        $A.util.addClass(prodOpt,'prodOptions');
        
        $A.util.removeClass(prodReview,'reviewblue');  
        $A.util.addClass(prodReview,'review');
        
        $A.util.removeClass(coupons,'couponsblue');  
        $A.util.addClass(coupons,'coupons');
        
        $A.util.removeClass(location,'locationblue');  
        $A.util.addClass(location,'location');
        
        $A.util.removeClass(shipmeth,'shippingmthblue');  
        $A.util.addClass(shipmeth,'shippingmth');
        
        $A.util.removeClass(tax,'taxblue');  
        $A.util.addClass(tax,'tax');
        
        $A.util.removeClass(orders,'orderblue');  
        $A.util.addClass(orders,'order');
        
        $A.util.removeClass(customer,'customerblue');  
        $A.util.addClass(customer,'customer');
        
        $A.util.removeClass(cartWishlist,'cartwishlistblue');  
        $A.util.addClass(cartWishlist,'cartwishlist');       
        var cmpBody=cmp.find("cmpBody");
        helper.removeComponent(cmp);
        $A.createComponent(
            "wk_wedge:ArticleListing",{},
            function(newcomponent){
                if (cmp.isValid()) {
                    var body = cmp.get("v.body");
                    body.push(newcomponent);
                    cmp.set("v.body", body);
                }
            }            
        );
    },
    getTemplatesListing: function(cmp,event,helper) {
        var article = cmp.find('article');
        var storeAd = cmp.find('storeAd');
        var template = cmp.find('template');
        var paymentProcesses = cmp.find('paymentProcesses');
        var category = cmp.find('category');
        var prodFeatures = cmp.find('prodFeatures');
        var product = cmp.find('product');
        var prodOpt = cmp.find('prodOpt');
        var prodReview = cmp.find('prodReview');
        var coupons = cmp.find('coupons');
        var location = cmp.find('location');
        var shipmeth = cmp.find('shipmeth');
        var tax = cmp.find('loctax');
        var orders = cmp.find('orders');
        var customer = cmp.find('customer');
        var cartWishlist = cmp.find('cartWishlist');
        var productcat = cmp.find('productcat');
        var shipTax = cmp.find('shipTax');
        
        $A.util.removeClass(article,'articleblue');
        $A.util.addClass(article,'article');
        
        $A.util.removeClass(shipTax,'shipandtaxblue');
        $A.util.addClass(shipTax,'shipandtax');
               
        $A.util.removeClass(storeAd,'storeadminBlue');  
        $A.util.addClass(storeAd,'storeadmin');
        
        $A.util.removeClass(template,'template');
        $A.util.addClass(template,'templateblue');       
        
        $A.util.removeClass(paymentProcesses,'paymentblue');  
        $A.util.addClass(paymentProcesses,'payment');

        $A.util.removeClass(category,'categoryblue');  
        $A.util.addClass(category,'category');
        
        $A.util.removeClass(productcat,'productcatalogblue');
        $A.util.addClass(productcat,'productcatalog'); 
        
        $A.util.removeClass(prodFeatures,'prodfeatureblue');  
        $A.util.addClass(prodFeatures,'prodfeature');
        
        $A.util.removeClass(product,'productblue');  
        $A.util.addClass(product,'product');
        
        $A.util.removeClass(prodOpt,'prodOptionsblue');  
        $A.util.addClass(prodOpt,'prodOptions');
        
        $A.util.removeClass(prodReview,'reviewblue');  
        $A.util.addClass(prodReview,'review');
        
        $A.util.removeClass(coupons,'couponsblue');  
        $A.util.addClass(coupons,'coupons');
        
        $A.util.removeClass(location,'locationblue');  
        $A.util.addClass(location,'location');
        
        $A.util.removeClass(shipmeth,'shippingmthblue');  
        $A.util.addClass(shipmeth,'shippingmth');
        
        $A.util.removeClass(tax,'taxblue');  
        $A.util.addClass(tax,'tax');
        
        $A.util.removeClass(orders,'orderblue');  
        $A.util.addClass(orders,'order');
        
        $A.util.removeClass(customer,'customerblue');  
        $A.util.addClass(customer,'customer');
        
        $A.util.removeClass(cartWishlist,'cartwishlistblue');  
        $A.util.addClass(cartWishlist,'cartwishlist');
        var cmpBody=cmp.find("cmpBody");
        helper.removeComponent(cmp);
        $A.createComponent(
            "wk_wedge:TemplateListing",{},
            function(newcomponent){
                if (cmp.isValid()) {
                    var body = cmp.get("v.body");
                    body.push(newcomponent);
                    cmp.set("v.body", body);
                }
            }            
        );
    },
    getTemplateComponent: function(cmp,event,helper) {        
        helper.removeComponent(cmp);              
        var tempId = event.getParam("TemplateId");
        var cmpBody=cmp.find("cmpBody");       
        $A.createComponent(
            "wk_wedge:TemplateComponent",{
                "TemplateId": tempId
            },
            function(newcomponent){
                if (cmp.isValid()) {
                    var body = cmp.get("v.body");
                    body.push(newcomponent);
                    cmp.set("v.body", body);
                }
            }            
        );
    },
    getTemplateVariants: function(cmp,event,helper) {
        var tempId = event.getParam("tempId");
        var TemplateId = event.getParam("TemplateId");
        var comp = event.getParam("comp");
        var cmpBody=cmp.find("cmpBody");        
        helper.removeComponent(cmp);
        $A.createComponent(
            comp,{
                "TempId": tempId,
                "TemplateId" : TemplateId
            },
            function(newcomponent){
                if (cmp.isValid()) {
                    var body = cmp.get("v.body");
                    body.push(newcomponent);
                    cmp.set("v.body", body);
                }
            }            
        );
    },
    getImageSlider:function(cmp,event,helper){
    	var tcompId = event.getParam("tcompId");
        var Id = event.getParam("Id");
        var colname = event.getParam("colname");
        var comp = event.getParam("comp");
        helper.removeComponent(cmp);
        $A.createComponent(
            comp,{
                "BannerId": Id,
                "tcompid" : tcompId,
                "colname" : colname
            },
            function(newcomponent){
                if (cmp.isValid()) {
                    var body = cmp.get("v.body");
                    body.push(newcomponent);
                    cmp.set("v.body", body);
                }
            }            
        );
    },
    getProduct:function(cmp,event,helper){  
        
        var ProductId = event.getParam("ProductId");
        var comp = event.getParam("comp");
        helper.removeComponent(cmp);
        $A.createComponent(
            comp,{
                "ProductId": ProductId
            },
            function(newcomponent){
                if (cmp.isValid()) {
                    var body = cmp.get("v.body");
                    body.push(newcomponent);
                    cmp.set("v.body", body);
                }
            }            
        );
    },
    getCategory:function(cmp,event,helper){        
        
       var CategoryId = event.getParam("ProductId");
        var comp = event.getParam("comp");
        helper.removeComponent(cmp);
        $A.createComponent(
            comp,{
                "CategoryId": CategoryId
            },
            function(newcomponent){
                if (cmp.isValid()) {
                    var body = cmp.get("v.body");
                    body.push(newcomponent);
                    cmp.set("v.body", body);
                }
            }            
        ); 
    },
    getPaymentProcessesListing: function(cmp,event,helper) {
        var article = cmp.find('article');
        var storeAd = cmp.find('storeAd');
        var template = cmp.find('template');
        var paymentProcesses = cmp.find('paymentProcesses');
        var category = cmp.find('category');
        var prodFeatures = cmp.find('prodFeatures');
        var product = cmp.find('product');
        var prodOpt = cmp.find('prodOpt');
        var prodReview = cmp.find('prodReview');
        var coupons = cmp.find('coupons');
        var location = cmp.find('location');
        var shipmeth = cmp.find('shipmeth');
        var tax = cmp.find('loctax');
        var orders = cmp.find('orders');
        var customer = cmp.find('customer');
        var cartWishlist = cmp.find('cartWishlist');
        var productcat = cmp.find('productcat');
        var shipTax = cmp.find('shipTax');
        
        $A.util.removeClass(productcat,'productcatalogblue');
        $A.util.addClass(productcat,'productcatalog');
        
        $A.util.removeClass(shipTax,'shipandtaxblue');
        $A.util.addClass(shipTax,'shipandtax');
        
        $A.util.removeClass(article,'articleblue');
        $A.util.addClass(article,'article');
               
        $A.util.removeClass(storeAd,'storeadminBlue');  
        $A.util.addClass(storeAd,'storeadmin');
        
        $A.util.removeClass(template,'templateblue'); 
        $A.util.addClass(template,'template');              
        
        $A.util.removeClass(paymentProcesses,'payment');
        $A.util.addClass(paymentProcesses,'paymentblue');        

        $A.util.removeClass(category,'categoryblue'); 
        $A.util.addClass(category,'category');        
        
        $A.util.removeClass(prodFeatures,'prodfeatureblue');  
        $A.util.addClass(prodFeatures,'prodfeature');
        
        $A.util.removeClass(product,'productblue');
        $A.util.addClass(product,'product');                
        
        $A.util.removeClass(prodOpt,'prodOptionsblue');  
        $A.util.addClass(prodOpt,'prodOptions');
        
        $A.util.removeClass(prodReview,'reviewblue');  
        $A.util.addClass(prodReview,'review');
        
        $A.util.removeClass(coupons,'couponsblue');  
        $A.util.addClass(coupons,'coupons');
        
        $A.util.removeClass(location,'locationblue');  
        $A.util.addClass(location,'location');
        
        $A.util.removeClass(shipmeth,'shippingmthblue');  
        $A.util.addClass(shipmeth,'shippingmth');
        
        $A.util.removeClass(tax,'taxblue');  
        $A.util.addClass(tax,'tax');
        
        $A.util.removeClass(orders,'orderblue');  
        $A.util.addClass(orders,'order');
        
        $A.util.removeClass(customer,'customerblue');  
        $A.util.addClass(customer,'customer');
        
        $A.util.removeClass(cartWishlist,'cartwishlistblue');  
        $A.util.addClass(cartWishlist,'cartwishlist');
        
        var cmpBody=cmp.find("cmpBody");
        helper.removeComponent(cmp);
        $A.createComponent(
            "wk_wedge:PaymentProcessesListing",{},
            function(newcomponent){
                if (cmp.isValid()) {
                    var body = cmp.get("v.body");
                    body.push(newcomponent);
                    cmp.set("v.body", body);
                }
            }            
        );
    },
    getCategoryListing: function(cmp,event,helper) {
        var article = cmp.find('article');
        var storeAd = cmp.find('storeAd');
        var template = cmp.find('template');
        var paymentProcesses = cmp.find('paymentProcesses');
        var category = cmp.find('category');
        var prodFeatures = cmp.find('prodFeatures');
        var product = cmp.find('product');
        var prodOpt = cmp.find('prodOpt');
        var prodReview = cmp.find('prodReview');
        var coupons = cmp.find('coupons');
        var location = cmp.find('location');
        var shipmeth = cmp.find('shipmeth');
        var tax = cmp.find('loctax');
        var orders = cmp.find('orders');
        var customer = cmp.find('customer');
        var cartWishlist = cmp.find('cartWishlist');
        var productcat = cmp.find('productcat');
        var shipTax = cmp.find('shipTax');
        
        $A.util.removeClass(article,'articleblue');
        $A.util.addClass(article,'article');
        
        $A.util.removeClass(shipTax,'shipandtaxblue');
        $A.util.addClass(shipTax,'shipandtax');
              
        $A.util.removeClass(storeAd,'storeadminBlue');  
        $A.util.addClass(storeAd,'storeadmin');
        
        $A.util.removeClass(template,'templateblue'); 
        $A.util.addClass(template,'template');              
        
        $A.util.removeClass(paymentProcesses,'paymentblue');  
        $A.util.addClass(paymentProcesses,'payment');

        $A.util.removeClass(category,'category');
        $A.util.addClass(category,'categoryblue'); 
	    
        $A.util.removeClass(productcat,'productcatalog');
        $A.util.addClass(productcat,'productcatalogblue');
        
        $A.util.removeClass(prodFeatures,'prodfeatureblue');  
        $A.util.addClass(prodFeatures,'prodfeature');
        
        $A.util.removeClass(product,'productblue');
        $A.util.addClass(product,'product');                
        
        $A.util.removeClass(prodOpt,'prodOptionsblue');  
        $A.util.addClass(prodOpt,'prodOptions');
        
        $A.util.removeClass(prodReview,'reviewblue');  
        $A.util.addClass(prodReview,'review');
        
        $A.util.removeClass(coupons,'couponsblue');  
        $A.util.addClass(coupons,'coupons');
        
        $A.util.removeClass(location,'locationblue');  
        $A.util.addClass(location,'location');
        
        $A.util.removeClass(shipmeth,'shippingmthblue');  
        $A.util.addClass(shipmeth,'shippingmth');
        
        $A.util.removeClass(tax,'taxblue');  
        $A.util.addClass(tax,'tax');
        
        $A.util.removeClass(orders,'orderblue');  
        $A.util.addClass(orders,'order');
        
        $A.util.removeClass(customer,'customerblue');  
        $A.util.addClass(customer,'customer');
        
        $A.util.removeClass(cartWishlist,'cartwishlistblue');  
        $A.util.addClass(cartWishlist,'cartwishlist');
        var cmpBody=cmp.find("cmpBody");
        helper.removeComponent(cmp);
        $A.createComponent(
            "wk_wedge:CategoryListing",{},
            function(newcomponent){
                if (cmp.isValid()) {
                    var body = cmp.get("v.body");
                    body.push(newcomponent);
                    cmp.set("v.body", body);
                }
            }            
        );
    },
    getProductFeatureListing: function(cmp,event,helper) {
        var article = cmp.find('article');
        var storeAd = cmp.find('storeAd');
        var template = cmp.find('template');
        var paymentProcesses = cmp.find('paymentProcesses');
        var category = cmp.find('category');
        var prodFeatures = cmp.find('prodFeatures');
        var product = cmp.find('product');
        var prodOpt = cmp.find('prodOpt');
        var prodReview = cmp.find('prodReview');
        var coupons = cmp.find('coupons');
        var location = cmp.find('location');
        var shipmeth = cmp.find('shipmeth');
        var tax = cmp.find('loctax');
        var orders = cmp.find('orders');
        var customer = cmp.find('customer');
        var cartWishlist = cmp.find('cartWishlist');
        var productcat = cmp.find('productcat');
        var shipTax = cmp.find('shipTax');
        
        $A.util.removeClass(article,'articleblue');
        $A.util.addClass(article,'article');
        
        $A.util.removeClass(shipTax,'shipandtaxblue');
        $A.util.addClass(shipTax,'shipandtax');
               
        $A.util.removeClass(storeAd,'storeadminBlue');  
        $A.util.addClass(storeAd,'storeadmin');
        
        $A.util.removeClass(template,'templateblue'); 
        $A.util.addClass(template,'template');              
        
        $A.util.removeClass(paymentProcesses,'paymentblue');  
        $A.util.addClass(paymentProcesses,'payment');

        $A.util.removeClass(category,'categoryblue');  
        $A.util.addClass(category,'category');
        
        $A.util.removeClass(prodFeatures,'prodfeature');
        $A.util.addClass(prodFeatures,'prodfeatureblue');        
        
        $A.util.removeClass(product,'productblue');  
        $A.util.addClass(product,'product');
        
        $A.util.removeClass(productcat,'productcatalog');
        $A.util.addClass(productcat,'productcatalogblue');
        
        $A.util.removeClass(prodOpt,'prodOptionsblue');  
        $A.util.addClass(prodOpt,'prodOptions');
        
        $A.util.removeClass(prodReview,'reviewblue');  
        $A.util.addClass(prodReview,'review');
        
        $A.util.removeClass(coupons,'couponsblue');  
        $A.util.addClass(coupons,'coupons');
        
        $A.util.removeClass(location,'locationblue');  
        $A.util.addClass(location,'location');
        
        $A.util.removeClass(shipmeth,'shippingmthblue');  
        $A.util.addClass(shipmeth,'shippingmth');
        
        $A.util.removeClass(tax,'taxblue');  
        $A.util.addClass(tax,'tax');
        
        $A.util.removeClass(orders,'orderblue');  
        $A.util.addClass(orders,'order');
        
        $A.util.removeClass(customer,'customerblue');  
        $A.util.addClass(customer,'customer');
        
        $A.util.removeClass(cartWishlist,'cartwishlistblue');  
        $A.util.addClass(cartWishlist,'cartwishlist');
        
        var cmpBody=cmp.find("cmpBody");
        helper.removeComponent(cmp);
        $A.createComponent(
            "wk_wedge:ProductFeatureListing",{},
            function(newcomponent){
                if (cmp.isValid()) {
                    var body = cmp.get("v.body");
                    body.push(newcomponent);
                    cmp.set("v.body", body);
                }
            }            
        );
    },
    getProductListing: function(cmp,event,helper) {
        var article = cmp.find('article');
        var storeAd = cmp.find('storeAd');
        var template = cmp.find('template');
        var paymentProcesses = cmp.find('paymentProcesses');
        var category = cmp.find('category');
        var prodFeatures = cmp.find('prodFeatures');
        var product = cmp.find('product');
        var prodOpt = cmp.find('prodOpt');
        var prodReview = cmp.find('prodReview');
        var coupons = cmp.find('coupons');
        var location = cmp.find('location');
        var shipmeth = cmp.find('shipmeth');
        var tax = cmp.find('loctax');
        var orders = cmp.find('orders');
        var customer = cmp.find('customer');
        var cartWishlist = cmp.find('cartWishlist');
        var productcat = cmp.find('productcat');
        var shipTax = cmp.find('shipTax');
        
        $A.util.removeClass(article,'articleblue');
        $A.util.addClass(article,'article');
        
        $A.util.removeClass(shipTax,'shipandtaxblue');
        $A.util.addClass(shipTax,'shipandtax');
               
        $A.util.removeClass(storeAd,'storeadminBlue');  
        $A.util.addClass(storeAd,'storeadmin');
        
        $A.util.removeClass(template,'templateblue'); 
        $A.util.addClass(template,'template');              
        
        $A.util.removeClass(paymentProcesses,'paymentblue');  
        $A.util.addClass(paymentProcesses,'payment');

        $A.util.removeClass(category,'categoryblue');  
        $A.util.addClass(category,'category');
        
        $A.util.removeClass(prodFeatures,'prodfeatureblue');  
        $A.util.addClass(prodFeatures,'prodfeature');
        
        $A.util.removeClass(productcat,'productcatalog');
        $A.util.addClass(productcat,'productcatalogblue');
        
        $A.util.removeClass(product,'product');
        $A.util.addClass(product,'productblue');        
        
        $A.util.removeClass(prodOpt,'prodOptionsblue');  
        $A.util.addClass(prodOpt,'prodOptions');
        
        $A.util.removeClass(prodReview,'reviewblue');  
        $A.util.addClass(prodReview,'review');
        
        $A.util.removeClass(coupons,'couponsblue');  
        $A.util.addClass(coupons,'coupons');
        
        $A.util.removeClass(location,'locationblue');  
        $A.util.addClass(location,'location');
        
        $A.util.removeClass(shipmeth,'shippingmthblue');  
        $A.util.addClass(shipmeth,'shippingmth');
        
        $A.util.removeClass(tax,'taxblue');  
        $A.util.addClass(tax,'tax');
        
        $A.util.removeClass(orders,'orderblue');  
        $A.util.addClass(orders,'order');
        
        $A.util.removeClass(customer,'customerblue');  
        $A.util.addClass(customer,'customer');
        
        $A.util.removeClass(cartWishlist,'cartwishlistblue');  
        $A.util.addClass(cartWishlist,'cartwishlist');
        var cmpBody=cmp.find("cmpBody");
        helper.removeComponent(cmp);
        $A.createComponent(
            "wk_wedge:ProductListing",{},
            function(newcomponent){
                if (cmp.isValid()) {
                    var body = cmp.get("v.body");
                    body.push(newcomponent);
                    cmp.set("v.body", body);
                }
            }            
        );
    },
    getProductOptionListing: function(cmp,event,helper) {
        var article = cmp.find('article');
        var storeAd = cmp.find('storeAd');
        var template = cmp.find('template');
        var paymentProcesses = cmp.find('paymentProcesses');
        var category = cmp.find('category');
        var prodFeatures = cmp.find('prodFeatures');
        var product = cmp.find('product');
        var prodOpt = cmp.find('prodOpt');
        var prodReview = cmp.find('prodReview');
        var coupons = cmp.find('coupons');
        var location = cmp.find('location');
        var shipmeth = cmp.find('shipmeth');
        var tax = cmp.find('loctax');
        var orders = cmp.find('orders');
        var customer = cmp.find('customer');
        var cartWishlist = cmp.find('cartWishlist');
        var productcat = cmp.find('productcat');
        var shipTax = cmp.find('shipTax');
        
        $A.util.removeClass(article,'articleblue');
        $A.util.addClass(article,'article');
        
        $A.util.removeClass(shipTax,'shipandtaxblue');
        $A.util.addClass(shipTax,'shipandtax');
               
        $A.util.removeClass(storeAd,'storeadminBlue');  
        $A.util.addClass(storeAd,'storeadmin');
        
        $A.util.removeClass(template,'templateblue'); 
        $A.util.addClass(template,'template');              
        
        $A.util.removeClass(paymentProcesses,'paymentblue');  
        $A.util.addClass(paymentProcesses,'payment');

        $A.util.removeClass(category,'categoryblue');  
        $A.util.addClass(category,'category');

		$A.util.removeClass(prodFeatures,'prodfeatureblue');             
        $A.util.addClass(prodFeatures,'prodfeature');           
        
        $A.util.removeClass(product,'productblue');  
        $A.util.addClass(product,'product');              
        
        $A.util.removeClass(productcat,'productcatalog');
        $A.util.addClass(productcat,'productcatalogblue');
        
        $A.util.removeClass(prodOpt,'prodOptions');
        $A.util.addClass(prodOpt,'prodOptionsblue');        
        
        $A.util.removeClass(prodReview,'reviewblue');  
        $A.util.addClass(prodReview,'review');
        
        $A.util.removeClass(coupons,'couponsblue');  
        $A.util.addClass(coupons,'coupons');
        
        $A.util.removeClass(location,'locationblue');  
        $A.util.addClass(location,'location');
        
        $A.util.removeClass(shipmeth,'shippingmthblue');  
        $A.util.addClass(shipmeth,'shippingmth');
        
        $A.util.removeClass(tax,'taxblue');  
        $A.util.addClass(tax,'tax');
        
        $A.util.removeClass(orders,'orderblue');  
        $A.util.addClass(orders,'order');
        
        $A.util.removeClass(customer,'customerblue');  
        $A.util.addClass(customer,'customer');
        
        $A.util.removeClass(cartWishlist,'cartwishlistblue');  
        $A.util.addClass(cartWishlist,'cartwishlist');
        
        var cmpBody=cmp.find("cmpBody");
        helper.removeComponent(cmp);
        $A.createComponent(
            "wk_wedge:ProductOptionListing",{},
            function(newcomponent){
                if (cmp.isValid()) {
                    var body = cmp.get("v.body");
                    body.push(newcomponent);
                    cmp.set("v.body", body);
                }
            }            
        );
    },
    getReviewListing: function(cmp,event,helper) {
        var article = cmp.find('article');
        var storeAd = cmp.find('storeAd');
        var template = cmp.find('template');
        var paymentProcesses = cmp.find('paymentProcesses');
        var category = cmp.find('category');
        var prodFeatures = cmp.find('prodFeatures');
        var product = cmp.find('product');
        var prodOpt = cmp.find('prodOpt');
        var prodReview = cmp.find('prodReview');
        var coupons = cmp.find('coupons');
        var location = cmp.find('location');
        var shipmeth = cmp.find('shipmeth');
        var tax = cmp.find('loctax');
        var orders = cmp.find('orders');
        var customer = cmp.find('customer');
        var cartWishlist = cmp.find('cartWishlist');
        var productcat = cmp.find('productcat');
        var shipTax = cmp.find('shipTax');
        
        $A.util.removeClass(article,'articleblue');
        $A.util.addClass(article,'article');
        
        $A.util.removeClass(shipTax,'shipandtaxblue');
        $A.util.addClass(shipTax,'shipandtax');
               
        $A.util.removeClass(storeAd,'storeadminBlue');  
        $A.util.addClass(storeAd,'storeadmin');
        
        $A.util.removeClass(template,'templateblue'); 
        $A.util.addClass(template,'template');              
        
        $A.util.removeClass(paymentProcesses,'paymentblue');  
        $A.util.addClass(paymentProcesses,'payment');

        $A.util.removeClass(category,'categoryblue');  
        $A.util.addClass(category,'category');

		$A.util.removeClass(prodFeatures,'prodfeatureblue');             
        $A.util.addClass(prodFeatures,'prodfeature');           
        
        $A.util.removeClass(product,'productblue');  
        $A.util.addClass(product,'product');              
        
        $A.util.removeClass(prodOpt,'prodOptionsblue');
        $A.util.addClass(prodOpt,'prodOptions');                
        
        $A.util.removeClass(prodReview,'review');
        $A.util.addClass(prodReview,'reviewblue');
        
        $A.util.removeClass(productcat,'productcatalog');
        $A.util.addClass(productcat,'productcatalogblue');
        
        $A.util.removeClass(coupons,'couponsblue');  
        $A.util.addClass(coupons,'coupons');
        
        $A.util.removeClass(location,'locationblue');  
        $A.util.addClass(location,'location');
        
        $A.util.removeClass(shipmeth,'shippingmthblue');  
        $A.util.addClass(shipmeth,'shippingmth');
        
        $A.util.removeClass(tax,'taxblue');  
        $A.util.addClass(tax,'tax');
        
        $A.util.removeClass(orders,'orderblue');  
        $A.util.addClass(orders,'order');
        
        $A.util.removeClass(customer,'customerblue');  
        $A.util.addClass(customer,'customer');
        
        $A.util.removeClass(cartWishlist,'cartwishlistblue');  
        $A.util.addClass(cartWishlist,'cartwishlist');
        
        var cmpBody=cmp.find("cmpBody");
        helper.removeComponent(cmp);
        $A.createComponent(
            "wk_wedge:ReviewListing",{},
            function(newcomponent){
                if (cmp.isValid()) {
                    var body = cmp.get("v.body");
                    body.push(newcomponent);
                    cmp.set("v.body", body);
                }
            }            
        );
    },
    getCouponListing: function(cmp,event,helper) {
        var article = cmp.find('article');
        var storeAd = cmp.find('storeAd');
        var template = cmp.find('template');
        var paymentProcesses = cmp.find('paymentProcesses');
        var category = cmp.find('category');
        var prodFeatures = cmp.find('prodFeatures');
        var product = cmp.find('product');
        var prodOpt = cmp.find('prodOpt');
        var prodReview = cmp.find('prodReview');
        var coupons = cmp.find('coupons');
        var location = cmp.find('location');
        var shipmeth = cmp.find('shipmeth');
        var tax = cmp.find('loctax');
        var orders = cmp.find('orders');
        var customer = cmp.find('customer');
        var cartWishlist = cmp.find('cartWishlist');
        var productcat = cmp.find('productcat');
        var shipTax = cmp.find('shipTax');
        
        $A.util.removeClass(article,'articleblue');
        $A.util.addClass(article,'article');
        
        $A.util.removeClass(shipTax,'shipandtaxblue');
        $A.util.addClass(shipTax,'shipandtax');
        
        $A.util.removeClass(productcat,'productcatalogblue');
        $A.util.addClass(productcat,'productcatalog'); 
        
        $A.util.removeClass(storeAd,'storeadminBlue');  
        $A.util.addClass(storeAd,'storeadmin');
        
        $A.util.removeClass(template,'templateblue'); 
        $A.util.addClass(template,'template');              
        
        $A.util.removeClass(paymentProcesses,'paymentblue');  
        $A.util.addClass(paymentProcesses,'payment');

        $A.util.removeClass(category,'categoryblue');  
        $A.util.addClass(category,'category');

		$A.util.removeClass(prodFeatures,'prodfeatureblue');             
        $A.util.addClass(prodFeatures,'prodfeature');           
        
        $A.util.removeClass(product,'productblue');  
        $A.util.addClass(product,'product');              
        
        $A.util.removeClass(prodOpt,'prodOptionsblue');
        $A.util.addClass(prodOpt,'prodOptions');                
        
        $A.util.removeClass(prodReview,'reviewblue'); 
        $A.util.addClass(prodReview,'review');         
        
        $A.util.removeClass(coupons,'coupons');
        $A.util.addClass(coupons,'couponsblue');        
        
        $A.util.removeClass(location,'locationblue');  
        $A.util.addClass(location,'location');
        
        $A.util.removeClass(shipmeth,'shippingmthblue');  
        $A.util.addClass(shipmeth,'shippingmth');
        
        $A.util.removeClass(tax,'taxblue');  
        $A.util.addClass(tax,'tax');
        
        $A.util.removeClass(orders,'orderblue');  
        $A.util.addClass(orders,'order');
        
        $A.util.removeClass(customer,'customerblue');  
        $A.util.addClass(customer,'customer');
        
        $A.util.removeClass(cartWishlist,'cartwishlistblue');  
        $A.util.addClass(cartWishlist,'cartwishlist');
        
        var cmpBody=cmp.find("cmpBody");
        helper.removeComponent(cmp);
        $A.createComponent(
            "wk_wedge:CouponListing",{},
            function(newcomponent){
                if (cmp.isValid()) {
                    var body = cmp.get("v.body");
                    body.push(newcomponent);
                    cmp.set("v.body", body);
                }
            }            
        );
    },
    getLocationListing: function(cmp,event,helper) {
        var article = cmp.find('article');
        var storeAd = cmp.find('storeAd');
        var template = cmp.find('template');
        var paymentProcesses = cmp.find('paymentProcesses');
        var category = cmp.find('category');
        var prodFeatures = cmp.find('prodFeatures');
        var product = cmp.find('product');
        var prodOpt = cmp.find('prodOpt');
        var prodReview = cmp.find('prodReview');
        var coupons = cmp.find('coupons');
        var location = cmp.find('location');
        var shipmeth = cmp.find('shipmeth');
        var tax = cmp.find('loctax');
        var orders = cmp.find('orders');
        var customer = cmp.find('customer');
        var cartWishlist = cmp.find('cartWishlist');
        var productcat = cmp.find('productcat');
        var shipTax = cmp.find('shipTax');
        
        $A.util.removeClass(article,'articleblue');
        $A.util.addClass(article,'article');
        
        $A.util.removeClass(shipTax,'shipandtax');   
        $A.util.addClass(shipTax,'shipandtaxblue');  
        
        $A.util.removeClass(productcat,'productcatalogblue');
        $A.util.addClass(productcat,'productcatalog'); 
        
        $A.util.removeClass(storeAd,'storeadminBlue');  
        $A.util.addClass(storeAd,'storeadmin');
        
        $A.util.removeClass(template,'templateblue'); 
        $A.util.addClass(template,'template');              
        
        $A.util.removeClass(paymentProcesses,'paymentblue');  
        $A.util.addClass(paymentProcesses,'payment');

        $A.util.removeClass(category,'categoryblue');  
        $A.util.addClass(category,'category');

		$A.util.removeClass(prodFeatures,'prodfeatureblue');             
        $A.util.addClass(prodFeatures,'prodfeature');           
        
        $A.util.removeClass(product,'productblue');  
        $A.util.addClass(product,'product');              
        
        $A.util.removeClass(prodOpt,'prodOptionsblue');
        $A.util.addClass(prodOpt,'prodOptions');                
        
        $A.util.removeClass(prodReview,'reviewblue'); 
        $A.util.addClass(prodReview,'review');         
        
        $A.util.removeClass(coupons,'couponsblue'); 
        $A.util.addClass(coupons,'coupons');               
        
        $A.util.removeClass(location,'location');
        $A.util.addClass(location,'locationblue');       
        
        $A.util.removeClass(shipmeth,'shippingmthblue');  
        $A.util.addClass(shipmeth,'shippingmth');
        
        $A.util.removeClass(tax,'taxblue');  
        $A.util.addClass(tax,'tax');
        
        $A.util.removeClass(orders,'orderblue');  
        $A.util.addClass(orders,'order');
        
        $A.util.removeClass(customer,'customerblue');  
        $A.util.addClass(customer,'customer');
        
        $A.util.removeClass(cartWishlist,'cartwishlistblue');  
        $A.util.addClass(cartWishlist,'cartwishlist');

        var cmpBody=cmp.find("cmpBody");
        helper.removeComponent(cmp);
        $A.createComponent(
            "wk_wedge:LocationListing",{},
            function(newcomponent){
                if (cmp.isValid()) {
                    var body = cmp.get("v.body");
                    body.push(newcomponent);
                    cmp.set("v.body", body);
                }
            }            
        );
    },
    getShippingMethodListing: function(cmp,event,helper) {
        var article = cmp.find('article');
        var storeAd = cmp.find('storeAd');
        var template = cmp.find('template');
        var paymentProcesses = cmp.find('paymentProcesses');
        var category = cmp.find('category');
        var prodFeatures = cmp.find('prodFeatures');
        var product = cmp.find('product');
        var prodOpt = cmp.find('prodOpt');
        var prodReview = cmp.find('prodReview');
        var coupons = cmp.find('coupons');
        var location = cmp.find('location');
        var shipmeth = cmp.find('shipmeth');
        var tax = cmp.find('loctax');
        var orders = cmp.find('orders');
        var customer = cmp.find('customer');
        var cartWishlist = cmp.find('cartWishlist');
        var productcat = cmp.find('productcat');
        var shipTax = cmp.find('shipTax');
        
        $A.util.removeClass(article,'articleblue');
        $A.util.addClass(article,'article');
        
        $A.util.removeClass(shipTax,'shipandtax');   
        $A.util.addClass(shipTax,'shipandtaxblue'); 
        
        $A.util.removeClass(productcat,'productcatalogblue');
        $A.util.addClass(productcat,'productcatalog'); 
        
        $A.util.removeClass(storeAd,'storeadminBlue');  
        $A.util.addClass(storeAd,'storeadmin');
        
        $A.util.removeClass(template,'templateblue'); 
        $A.util.addClass(template,'template');              
        
        $A.util.removeClass(paymentProcesses,'paymentblue');  
        $A.util.addClass(paymentProcesses,'payment');

        $A.util.removeClass(category,'categoryblue');  
        $A.util.addClass(category,'category');

		$A.util.removeClass(prodFeatures,'prodfeatureblue');             
        $A.util.addClass(prodFeatures,'prodfeature');           
        
        $A.util.removeClass(product,'productblue');  
        $A.util.addClass(product,'product');              
        
        $A.util.removeClass(prodOpt,'prodOptionsblue');
        $A.util.addClass(prodOpt,'prodOptions');                
        
        $A.util.removeClass(prodReview,'reviewblue'); 
        $A.util.addClass(prodReview,'review');         
        
        $A.util.removeClass(coupons,'couponsblue'); 
        $A.util.addClass(coupons,'coupons');               
        
        $A.util.removeClass(location,'locationblue');
        $A.util.addClass(location,'location');               
        
        $A.util.removeClass(shipmeth,'shippingmth');
        $A.util.addClass(shipmeth,'shippingmthblue');        
        
        $A.util.removeClass(tax,'taxblue');  
        $A.util.addClass(tax,'tax');
        
        $A.util.removeClass(orders,'orderblue');  
        $A.util.addClass(orders,'order');
        
        $A.util.removeClass(customer,'customerblue');  
        $A.util.addClass(customer,'customer');
        
        $A.util.removeClass(cartWishlist,'cartwishlistblue');  
        $A.util.addClass(cartWishlist,'cartwishlist');
        
        var cmpBody=cmp.find("cmpBody");
        helper.removeComponent(cmp);
        $A.createComponent(
            "wk_wedge:ShippingMethodListing",{},
            function(newcomponent){
                if (cmp.isValid()) {
                    var body = cmp.get("v.body");
                    body.push(newcomponent);
                    cmp.set("v.body", body);
                }
            }            
        );
    },
    getTaxListing: function(cmp,event,helper) {
        var article = cmp.find('article');
        var storeAd = cmp.find('storeAd');
        var template = cmp.find('template');
        var paymentProcesses = cmp.find('paymentProcesses');
        var category = cmp.find('category');
        var prodFeatures = cmp.find('prodFeatures');
        var product = cmp.find('product');
        var prodOpt = cmp.find('prodOpt');
        var prodReview = cmp.find('prodReview');
        var coupons = cmp.find('coupons');
        var location = cmp.find('location');
        var shipmeth = cmp.find('shipmeth');
        var tax = cmp.find('loctax');
        var orders = cmp.find('orders');
        var customer = cmp.find('customer');
        var cartWishlist = cmp.find('cartWishlist');
        var productcat = cmp.find('productcat');
        var shipTax = cmp.find('shipTax');
        
        $A.util.removeClass(article,'articleblue');
        $A.util.addClass(article,'article');
        
        $A.util.removeClass(shipTax,'shipandtax');   
        $A.util.addClass(shipTax,'shipandtaxblue');             
        
        $A.util.removeClass(productcat,'productcatalogblue');
        $A.util.addClass(productcat,'productcatalog'); 
        
        $A.util.removeClass(storeAd,'storeadminBlue');  
        $A.util.addClass(storeAd,'storeadmin');
        
        $A.util.removeClass(template,'templateblue'); 
        $A.util.addClass(template,'template');              
        
        $A.util.removeClass(paymentProcesses,'paymentblue');  
        $A.util.addClass(paymentProcesses,'payment');

        $A.util.removeClass(category,'categoryblue');  
        $A.util.addClass(category,'category');

		$A.util.removeClass(prodFeatures,'prodfeatureblue');             
        $A.util.addClass(prodFeatures,'prodfeature');           
        
        $A.util.removeClass(product,'productblue');  
        $A.util.addClass(product,'product');              
        
        $A.util.removeClass(prodOpt,'prodOptionsblue');
        $A.util.addClass(prodOpt,'prodOptions');                
        
        $A.util.removeClass(prodReview,'reviewblue'); 
        $A.util.addClass(prodReview,'review');         
        
        $A.util.removeClass(coupons,'couponsblue'); 
        $A.util.addClass(coupons,'coupons');               
        
        $A.util.removeClass(location,'locationblue');
        $A.util.addClass(location,'location');               
        
        $A.util.removeClass(shipmeth,'shippingmthblue'); 
        $A.util.addClass(shipmeth,'shippingmth');               
        
        $A.util.removeClass(tax,'tax');
        $A.util.addClass(tax,'taxblue');        
        
        $A.util.removeClass(orders,'orderblue');  
        $A.util.addClass(orders,'order');
        
        $A.util.removeClass(customer,'customerblue');  
        $A.util.addClass(customer,'customer');
        
        $A.util.removeClass(cartWishlist,'cartwishlistblue');  
        $A.util.addClass(cartWishlist,'cartwishlist');
        
        var cmpBody=cmp.find("cmpBody");
        helper.removeComponent(cmp);
        $A.createComponent(
            "wk_wedge:TaxListing",{},
            function(newcomponent){
                if (cmp.isValid()) {
                    var body = cmp.get("v.body");
                    body.push(newcomponent);
                    cmp.set("v.body", body);
                }
            }            
        );
    },
    getOrderListing: function(cmp,event,helper) {
        var article = cmp.find('article');
        var storeAd = cmp.find('storeAd');
        var template = cmp.find('template');
        var paymentProcesses = cmp.find('paymentProcesses');
        var category = cmp.find('category');
        var prodFeatures = cmp.find('prodFeatures');
        var product = cmp.find('product');
        var prodOpt = cmp.find('prodOpt');
        var prodReview = cmp.find('prodReview');
        var coupons = cmp.find('coupons');
        var location = cmp.find('location');
        var shipmeth = cmp.find('shipmeth');
        var tax = cmp.find('loctax');
        var orders = cmp.find('orders');
        var customer = cmp.find('customer');
        var cartWishlist = cmp.find('cartWishlist');
        var productcat = cmp.find('productcat');
        var shipTax = cmp.find('shipTax');
        
        $A.util.removeClass(article,'articleblue');
        $A.util.addClass(article,'article');
        
        $A.util.removeClass(shipTax,'shipandtaxblue');
        $A.util.addClass(shipTax,'shipandtax'); 
        
        $A.util.removeClass(productcat,'productcatalogblue');
        $A.util.addClass(productcat,'productcatalog'); 
        
        $A.util.removeClass(storeAd,'storeadminBlue');  
        $A.util.addClass(storeAd,'storeadmin');
        
        $A.util.removeClass(template,'templateblue'); 
        $A.util.addClass(template,'template');              
        
        $A.util.removeClass(paymentProcesses,'paymentblue');  
        $A.util.addClass(paymentProcesses,'payment');

        $A.util.removeClass(category,'categoryblue');  
        $A.util.addClass(category,'category');

		$A.util.removeClass(prodFeatures,'prodfeatureblue');             
        $A.util.addClass(prodFeatures,'prodfeature');           
        
        $A.util.removeClass(product,'productblue');  
        $A.util.addClass(product,'product');              
        
        $A.util.removeClass(prodOpt,'prodOptionsblue');
        $A.util.addClass(prodOpt,'prodOptions');                
        
        $A.util.removeClass(prodReview,'reviewblue'); 
        $A.util.addClass(prodReview,'review');         
        
        $A.util.removeClass(coupons,'couponsblue'); 
        $A.util.addClass(coupons,'coupons');               
        
        $A.util.removeClass(location,'locationblue');
        $A.util.addClass(location,'location');               
        
        $A.util.removeClass(shipmeth,'shippingmthblue'); 
        $A.util.addClass(shipmeth,'shippingmth');               
        
        $A.util.removeClass(tax,'taxblue');
        $A.util.addClass(tax,'tax');                
        
        $A.util.removeClass(orders,'order');
        $A.util.addClass(orders,'orderblue');        
        
        $A.util.removeClass(customer,'customerblue');  
        $A.util.addClass(customer,'customer');
        
        $A.util.removeClass(cartWishlist,'cartwishlistblue');  
        $A.util.addClass(cartWishlist,'cartwishlist');
        
        var cmpBody=cmp.find("cmpBody");
        helper.removeComponent(cmp);
        $A.createComponent(
            "wk_wedge:OrderListing",{},
            function(newcomponent){
                if (cmp.isValid()) {
                    var body = cmp.get("v.body");
                    body.push(newcomponent);
                    cmp.set("v.body", body);
                }
            }            
        );
    },
    getCustomerListing: function(cmp,event,helper) {        
        var article = cmp.find('article');
        var storeAd = cmp.find('storeAd');
        var template = cmp.find('template');
        var paymentProcesses = cmp.find('paymentProcesses');
        var category = cmp.find('category');
        var prodFeatures = cmp.find('prodFeatures');
        var product = cmp.find('product');
        var prodOpt = cmp.find('prodOpt');
        var prodReview = cmp.find('prodReview');
        var coupons = cmp.find('coupons');
        var location = cmp.find('location');
        var shipmeth = cmp.find('shipmeth');
        var tax = cmp.find('loctax');
        var orders = cmp.find('orders');
        var customer = cmp.find('customer');
        var cartWishlist = cmp.find('cartWishlist');
        var productcat = cmp.find('productcat');
        var shipTax = cmp.find('shipTax');
        
        $A.util.removeClass(article,'articleblue');
        $A.util.addClass(article,'article');
        
        $A.util.removeClass(shipTax,'shipandtaxblue');
        $A.util.addClass(shipTax,'shipandtax');        
        
        $A.util.removeClass(productcat,'productcatalogblue');
        $A.util.addClass(productcat,'productcatalog'); 
        
        $A.util.removeClass(storeAd,'storeadminBlue');  
        $A.util.addClass(storeAd,'storeadmin');
        
        $A.util.removeClass(template,'templateblue'); 
        $A.util.addClass(template,'template');              
        
        $A.util.removeClass(paymentProcesses,'paymentblue');  
        $A.util.addClass(paymentProcesses,'payment');

        $A.util.removeClass(category,'categoryblue');  
        $A.util.addClass(category,'category');

		$A.util.removeClass(prodFeatures,'prodfeatureblue');             
        $A.util.addClass(prodFeatures,'prodfeature');           
        
        $A.util.removeClass(product,'productblue');  
        $A.util.addClass(product,'product');              
        
        $A.util.removeClass(prodOpt,'prodOptionsblue');
        $A.util.addClass(prodOpt,'prodOptions');                
        
        $A.util.removeClass(prodReview,'reviewblue'); 
        $A.util.addClass(prodReview,'review');         
        
        $A.util.removeClass(coupons,'couponsblue'); 
        $A.util.addClass(coupons,'coupons');               
        
        $A.util.removeClass(location,'locationblue');
        $A.util.addClass(location,'location');               
        
        $A.util.removeClass(shipmeth,'shippingmthblue'); 
        $A.util.addClass(shipmeth,'shippingmth');               
        
        $A.util.removeClass(tax,'taxblue');
        $A.util.addClass(tax,'tax');                
        
        $A.util.removeClass(orders,'orderblue'); 
        $A.util.addClass(orders,'order');               
        
        $A.util.removeClass(customer,'customer');
        $A.util.addClass(customer,'customerblue'); 
        
        $A.util.removeClass(cartWishlist,'cartwishlistblue');  
        $A.util.addClass(cartWishlist,'cartwishlist');
        
        var cmpBody=cmp.find("cmpBody");
        helper.removeComponent(cmp);
        $A.createComponent(
            "wk_wedge:CustomerListing",{},
            function(newcomponent){
                if (cmp.isValid()) {
                    var body = cmp.get("v.body");
                    body.push(newcomponent);
                    cmp.set("v.body", body);
                }
            }            
        );
    },
    getCartListing: function(cmp,event,helper) {
        var article = cmp.find('article');
        var storeAd = cmp.find('storeAd');
        var template = cmp.find('template');
        var paymentProcesses = cmp.find('paymentProcesses');
        var category = cmp.find('category');
        var prodFeatures = cmp.find('prodFeatures');
        var product = cmp.find('product');
        var prodOpt = cmp.find('prodOpt');
        var prodReview = cmp.find('prodReview');
        var coupons = cmp.find('coupons');
        var location = cmp.find('location');
        var shipmeth = cmp.find('shipmeth');
        var tax = cmp.find('loctax');
        var orders = cmp.find('orders');
        var customer = cmp.find('customer');
        var cartWishlist = cmp.find('cartWishlist');
        var productcat = cmp.find('productcat');
        var shipTax = cmp.find('shipTax');
        
        $A.util.removeClass(article,'articleblue');
        $A.util.addClass(article,'article');
        
       $A.util.removeClass(shipTax,'shipandtaxblue');
        $A.util.addClass(shipTax,'shipandtax');           
        
        $A.util.removeClass(productcat,'productcatalogblue');
        $A.util.addClass(productcat,'productcatalog'); 
        
        $A.util.removeClass(storeAd,'storeadminBlue');  
        $A.util.addClass(storeAd,'storeadmin');
        
        $A.util.removeClass(template,'templateblue'); 
        $A.util.addClass(template,'template');              
        
        $A.util.removeClass(paymentProcesses,'paymentblue');  
        $A.util.addClass(paymentProcesses,'payment');

        $A.util.removeClass(category,'categoryblue');  
        $A.util.addClass(category,'category');

		$A.util.removeClass(prodFeatures,'prodfeatureblue');             
        $A.util.addClass(prodFeatures,'prodfeature');           
        
        $A.util.removeClass(product,'productblue');  
        $A.util.addClass(product,'product');              
        
        $A.util.removeClass(prodOpt,'prodOptionsblue');
        $A.util.addClass(prodOpt,'prodOptions');                
        
        $A.util.removeClass(prodReview,'reviewblue'); 
        $A.util.addClass(prodReview,'review');         
        
        $A.util.removeClass(coupons,'couponsblue'); 
        $A.util.addClass(coupons,'coupons');               
        
        $A.util.removeClass(location,'locationblue');
        $A.util.addClass(location,'location');               
        
        $A.util.removeClass(shipmeth,'shippingmthblue'); 
        $A.util.addClass(shipmeth,'shippingmth');               
        
        $A.util.removeClass(tax,'taxblue');
        $A.util.addClass(tax,'tax');                
        
        $A.util.removeClass(orders,'orderblue'); 
        $A.util.addClass(orders,'order');               
        
        $A.util.removeClass(customer,'customerblue'); 
        $A.util.addClass(customer,'customer');        
        
        $A.util.removeClass(cartWishlist,'cartwishlist');
        $A.util.addClass(cartWishlist,'cartwishlistblue');       
		        
        var cmpBody=cmp.find("cmpBody");
        helper.removeComponent(cmp);
        $A.createComponent(
            "wk_wedge:CartListing",{},
            function(newcomponent){
                if (cmp.isValid()) {
                    var body = cmp.get("v.body");
                    body.push(newcomponent);
                    cmp.set("v.body", body);
                }
            }            
        );
    },
})
({
	getStoreAdmin: function(cmp,event) {
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
        
        $A.util.removeClass(article,'articleblue');  
        $A.util.addClass(article,'article');
               
        $A.util.addClass(storeAd,'storeadminBlue');  
        $A.util.removeClass(storeAd,'storeadmin');
        
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
        
        $A.util.removeClass(cartWishlist,'cartwishlistblue');  
        $A.util.addClass(cartWishlist,'cartwishlist');
        
        var cmpBody=cmp.find("cmpBody");
        $A.createComponent(
            "wk_wedge:StoreAdministration",{},
            function(newcomponent){
                if (cmp.isValid()) {
                    var body = cmp.get("v.body");                    
                    body.push(newcomponent);
                    cmp.set("v.body", body);
                }
            }            
        );
    },
    removeComponent:function(cmp){
        cmp.set('v.body',[]);        
    },
})
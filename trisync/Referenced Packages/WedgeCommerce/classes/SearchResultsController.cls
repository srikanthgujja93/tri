/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class SearchResultsController {
    global String cid {
        get;
        set;
    }
    global String prodId {
        get;
        set;
    }
    global String prodimg {
        get;
        set;
    }
    global String Prodkey {
        get;
        set;
    }
    global String prodName {
        get;
        set;
    }
    global Decimal prodprice {
        get;
        set;
    }
    global static Map<Id,Product2> productsMap;
    global static Set<Id> wishlistProductIds {
        get;
        set;
    }
    global SearchResultsController() {

    }
    global void addtocart() {

    }
    global void addtowishlist() {

    }
    global String getCurrsymbol() {
        return null;
    }
    global String getFiltercode() {
        return null;
    }
    global String getSelectedLanguage() {
        return null;
    }
    global String getcontextId() {
        return null;
    }
    global void qViewopen() {

    }
    global void setFiltercode(String value) {

    }
    @RemoteAction
    global static String sortproduct(String fcode, String cid, String Prodkey, String selectedCurrency) {
        return null;
    }
    @RemoteAction
    global static String sortproducts(String fcode, String cid, String Prodkey) {
        return null;
    }
    global static void wishlistProducts(String usercontextid) {

    }
global class remoteParams {
    global remoteParams() {

    }
}
}

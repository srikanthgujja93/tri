'use strict';
//console.log('Started', self);
self.addEventListener('install', function(event) {
  self.skipWaiting();
  //console.log('Installed', event);
});
self.addEventListener('activate', function(event) {
  //console.log('Activated', event);
});
var url = '/';
self.addEventListener('push', function(event) {
  event.waitUntil(
    self.registration.pushManager.getSubscription().then(function(sub){
     url='/wedgeNotificationContent';
   
    }).then(function(obj){
        const pushInfoPromise  = fetch(url).then(function(response) {
        	return response.text();
        }).then(function(ret_content) {
	        var data = ret_content.substring(ret_content.search('<body>'));
    	    data = data.substring(6,data.search('</body>'));
        	data = data.trim();
	        //console.log(data);
    	    data = JSON.parse(data);
        	var title = data.title;
	        var message = data.body;
    	    var icon = data.icon;
	        return self.registration.showNotification(title, {
    	      //tag:'singleNotificationOnly',
        	  body: message,  
	          icon: icon,  
    	      data: {
        	    url: data.url
          	}
        });
      });  
    })
  );
});

self.addEventListener('notificationclick', function(event) {  
 
  event.notification.close();
 
  event.waitUntil(
    clients.matchAll({  
      type: "window"  
    })
    .then(function(clientList) {
      //console.log(clientList);
      for (var i = 0; i < clientList.length; i++) {  
        var client = clientList[i];  
        if (client.url == '/' && 'focus' in client)  
          return client.focus();  
      }  
      if (clients.openWindow && event.notification.data.url != '#') {
        return clients.openWindow(event.notification.data.url);  
      }
    })
  );
});
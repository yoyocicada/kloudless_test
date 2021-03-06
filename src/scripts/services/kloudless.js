define([], function() {
	'use strict';
    function kloudlessService($http) {
        return {
            saveToLocation: function (accountId, folderId,bearToken, contentStr) {
                var myblob = new Blob([contentStr], {
                    type: 'text/plain'
                });
                var fd = new FormData();
                fd.append('fname', 'markdown.txt');
                fd.append('data', myblob);

                var data = $http.post('https://api.kloudless.com/v1/accounts/'+ accountId +'/storage/files/?overwrite=true', fd, 
                {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined, 
                        'X-Kloudless-Metadata': JSON.stringify({
                            'parent_id': folderId,
                            'name': 'markdown.txt'
                        }), 
                        'Authorization': 'Bearer '+ bearToken
                    }
                })
                .then(function (response) {
                    return response;
                }, function (err) {
                    return err;
                });
                return data;
            }, 
            getAccountDetail: function(accountId, bearToken){
                var data = $http({
                    method: 'GET',
                    url: 'https://api.kloudless.com/v1/accounts/'+ accountId +'?retrieve_tokens=false&retrieve_full=true',
                    headers:{
                        'Authorization': 'Bearer '+ bearToken
                    },
                    contentType: 'application/json'
                })
                .then(function (response) {
                    return response;
                }, function (err) {
                    return err;
                });
                return data;                
            },
            downloadFile: function(accountId, fileId, bearToken){
                var data = $http({
                    method: 'GET',
                    url: 'https://api.kloudless.com/v1/accounts/'+ accountId +'/storage/files/'+ fileId + '/contents',
                    headers:{
                        'Authorization': 'Bearer '+ bearToken
                    },
                    contentType: 'application/json'
                })
                .then(function (response) {
                    return response;
                }, function (err) {
                    return err;
                });
                return data;
            },
            file: (function(){
                if(window.localStorage['file']) {
                    return  JSON.parse(window.localStorage['file']);
                } else {
                    return null;
                }
            })(),
            service: window.localStorage['service'],
            downloadId: window.localStorage['downloadId']
        };
    };
    kloudlessService.$inject = ['$http'];
	return kloudlessService;
});
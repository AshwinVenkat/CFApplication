angular.module('CFApp').factory('ManageSubscriberService', ['$http', '$q',  function($http, $q) {
    
        var getSubscribers = function(){              
                return $http({
                        url: '/api/subscriber',
                        method: 'GET',
                });
        }

        var addSubscriber = function(subscriber){
                return $http({
                        url: '/api/subscriber',
                        method: 'POST',
                        data: subscriber
                });
        }

        var updateSubscriber = function(id, subscriber){
                return $http({
                        url: '/api/subscriber/'+id,
                        method: 'PUT',
                        data: subscriber
                });
        }
    
        return {
            getSubscribers: getSubscribers,
            addSubscriber: addSubscriber,
            updateSubscriber: updateSubscriber
        }
}]);
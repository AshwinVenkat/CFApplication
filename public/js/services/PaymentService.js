angular.module('CFApp').factory('PaymentService', ['$http', '$q',  function($http, $q) {
    var getPaymentAndReceiptDetails = function(){              
        return $http({
                url: '/api/payment/',
                method: 'GET',
        });
    }

    return {
        getPaymentAndReceiptDetails: getPaymentAndReceiptDetails
    }        
}]);
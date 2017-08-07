angular.module('CFApp').factory('InstallmentReceiptService', ['$http', '$q',  function($http, $q) {
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
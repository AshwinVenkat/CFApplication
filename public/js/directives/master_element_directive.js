(function (angular) {
    var cfapp = angular.module('CFApp');
    cfapp.directive('cfelement', ['ManageSubscriberService', function (ManageSubscriberService) {
        

        var directive = {};

        directive.restrict = 'E';
        directive.transclude = true;

        directive.scope = {
            params: "=params",
            values: "=values"
        };

        directive.templateUrl = function (element, attributes) {
            return "views/templates/master_element_template.html";
        };

        directive.controller = ['$scope', '$filter', function($scope, $filter){
            $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
            $scope.altInputFormats = ['M!/d!/yyyy'];
            $scope.dateOptions = {
                formatYear: 'yy',
                maxDate: new Date(2050, 12, 31),
                minDate: new Date(),
                startingDay: 1
            };
            $scope.datepopup = {};

            $scope.showDatePopupInit = function(item){
                $scope.datepopup[item.id] = {};
                $scope.datepopup[item.id].opened = false;
            }

            $scope.showDatePopup = function(identifier){
                $scope.datepopup[identifier].opened = true;
            }

            $scope.getOptionsList = function(item){
                if (item.src != null && typeof (item.src) != "undefined") {
                    ManageSubscriberService.getSubscribers().then(
                    function(response){
                        var options = null;
                        if(response != null && response.data != null && response.data.length > 0){
                            options = new Array();
                            for(var index = 0;index < response.data.length; index++){
                                var obj = {
                                    id: response.data[index]._id,
                                    label: response.data[index].subscriber
                                };
                                options.push(obj);
                            }
                            item.options = options;
                        }
                    }, 
                    function(response){
                        
                    });

                    // $scope.$watch('item.options', function (newValue, oldValue) {
                    //     if (newValue != null && newValue.length > 0) {
                    //         $scope.values[item.model].id = $scope.values[item.model].id
                    //     }
                    // }, true);
                }
            }
        }];

        return directive;
    }]);
})(angular);

(function () {
    var CFApp = angular.module('CFApp');
    
    // CFApp.config(function(toastrConfig) {
    //     angular.extend(toastrConfig, {
    //         autoDismiss: false,
    //         containerId: 'toast-container',
    //         maxOpened: 1,    
    //         newestOnTop: true,
    //         positionClass: 'toast-bottom-full-width',
    //         preventDuplicates: false,
    //         preventOpenDuplicates: false,
    //         target: 'body',
    //         closeButton: true,
    //         closeHtml: '<button>&times;</button>',
    //         progressBar: true,
    //         timeOut: 10000
    //     });
    // });

    var IndexCtrl = function ($scope) {
        var base = this;

        base.menuItems = [
            { name: "Manage Subscribers", route: "/cf/managesubscribers" },
            { name: "Group Details", route: "/cf/groupdetails" },
        ];

        base.activeMenu = null;

        base.setActive = function(item){
            base.activeMenu = item;
        }
        
        base.clearActive = function(item){
            base.activeMenu = null;
        }
	}

    CFApp.controller('IndexCtrl', ['$scope', IndexCtrl]);
}());
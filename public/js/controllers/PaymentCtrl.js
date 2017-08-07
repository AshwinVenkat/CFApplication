(function () {
    var CFApp = angular.module('CFApp');

    var PaymentCtrl = function ($scope, PaymentService) {
        var ctrl = this;

        ctrl.pgTitle = "Payment & Receipt Details";
        ctrl.pgSubtitle = "";

        var paymentData = [];
        var TRANS_TYPE_PRIZEWINNER = 1;
        var TRANS_TYPE_RECEIPT = 2;

        var columnDefs = [
            {headerName: "Sl. No. ", Field: "rowNum", valueGetter: "node.id + 1", width: 70,
                cellStyle: function(params) {
                    var obj = {};
                    if (params.data["TransactionType"] == TRANS_TYPE_PRIZEWINNER) {
                        obj["background-color"] = "#f5d5d5";
                    } 
                    return obj;
                }
            },
            {headerName: "Transaction Type", field: 'TransactionType', hide: true},
            {headerName: "Subscriber", field: 'Subscriber', width: 200,
                cellStyle: function(params) {
                    var obj = {};
                    if (params.data["TransactionType"] == TRANS_TYPE_PRIZEWINNER) {
                        obj["background-color"] = "#f5d5d5";
                    } 
                    return obj;
                }
            },
            {headerName: "SubscriberID", field: 'SubscriberID', width: 200, hide: true},
            {headerName: "Particulars", field: 'Particulars', width: 250,
                cellStyle: function(params) {
                    var obj = {};
                    if (params.data["TransactionType"] == TRANS_TYPE_PRIZEWINNER) {
                        obj["background-color"] = "#f5d5d5";
                    } 
                    return obj;
                }
            },
            {headerName: "Receipt No", field: 'ReceiptNo', width: 100,
                cellStyle: function(params) {
                    var obj = {};
                    if (params.data["TransactionType"] == TRANS_TYPE_PRIZEWINNER)
                        obj["background-color"] = "#f5d5d5";
                    else
                        obj["background-color"] = "#f5d5d5";
                    return obj;
                }
            },
            {headerName: "Amount", field: 'Amount', width: 100, 
                cellStyle: function(params) {
                    var obj = {};
                    if (params.data["TransactionType"] == TRANS_TYPE_PRIZEWINNER) {
                        obj["background-color"] = "#f5d5d5";
                    } 
                    return obj;
                }
            },
        ];

        ctrl.gridOptions = {};
        
        ctrl.init = function (){
            rowData = [];
            ctrl.gridOptions = {
                rowData: [],
                virtualPaging: false,
                rowSelection: 'single',
                rowHeight: 33,
                enableSorting: true,
                enableFilter: true,
                enableColResize: true,
                onGridReady: function(params) {
                    params.api.setColumnDefs(columnDefs);
                }
            };

            getPaymentAndRececiptDetails();
        }

        var getPaymentAndRececiptDetails = function() {
            PaymentService.getPaymentAndReceiptDetails().then(
                function(response){
                    paymentData = getRowDataFromArray(response);
                    ctrl.gridOptions.api.setRowData(paymentData);
                }, 
                function(response){
                    
                }
            );
        }

        var getRowDataFromArray = function(response){
            var records = null;
            if(response != null && response.data != null && response.data.length > 0){
                records = new Array();
                for(var index = 0;index < response.data.length; index++){
                    var subscriber = response.data[index].item[response.data[index].item.length - 1].subscriber;
                    var obj = {
                        "TransactionType": TRANS_TYPE_PRIZEWINNER,
                        "Subscriber": subscriber,
                        "SubscriberID": response.data[index].data.prized_subscriber.id,
                        "Particulars": "Auction Prize Winner - "+subscriber,
                        "ReceiptNo": 0,
                        "Amount": response.data[index].data.prize_amount,
                    };
                    records.push(obj);
                }
            }
            return records;
        }
	}

    CFApp.controller('PaymentCtrl', ['$scope', 'PaymentService', PaymentCtrl]);
}());
(function () {
    var CFApp = angular.module('CFApp');
    var ManageSubscriberCtrl = function ($scope, ManageSubscriberService) {
        var ctrl = this;

        ctrl.pgTitle = "Manage Subscribers";
        ctrl.pgSubtitle = "Create / update subscriber details";

        ctrl.isPhotoSectionEnabled = false;
        ctrl.isNewClicked = false;
        ctrl.isEditClicked = false;
        
        ctrl.dynamicModelValues = {
            searchFieldParams: {},
            formParams: {}
        };

        ctrl.searchFieldParams = [
            {id:"sfp_search", label:"Search", inputType:"text", placeholder:"Search grid", model: "search_filter"}
        ];

        ctrl.formParams = {
            subscriber: [
                {id:"fps_title", label:"Title", inputType:"dropdown", placeholder:"Title", model: "title",
                    options: [
                        {id:"1", label:"Mr."}, {id:"2", label:"Mrs."}, {id:"3", label:"Ms."}, 
                        {id:"4", label:"Miss."}, {id:"5", label:"Sir."}, {id:"6", label:"Dr."}
                    ]
                },
                {id:"fps_name", label:"Name", inputType:"text", placeholder:"Name", model: "name"},
                {id:"fps_email", label:"Email", inputType:"email", placeholder:"Email", model: "email"},
                {id:"fps_mobile", label:"Mobile", inputType:"number", placeholder:"Mobile", model: "mobile"},
                {id:"fps_residence", label:"Residence No.", inputType:"number", placeholder:"Residence No", model: "residence"},
                {id:"fps_office", label:"Office No.", inputType:"number", placeholder:"Office No", model: "office"},
                {id:"fps_fax", label:"Fax No.", inputType:"number", placeholder:"Fax No", model: "fax"},
            ],
            address1: [
                {id:"fpa1_address", label:"Address", inputType:"text", placeholder:"Address", model: "address1"},
                {id:"fpa1_street", label:"Street", inputType:"text", placeholder:"Street", model: "stree1"},
                {id:"fpa1_city", label:"City", inputType:"dropdown", placeholder:"City", model: "city1",
                    options: [
                        {id:"1", label:"Bengaluru"}, {id:"2", label:"Mysore"}, {id:"3", label:"Mangalore"}, 
                        {id:"4", label:"Belgaum"}, {id:"5", label:"Gulbarga"}, {id:"6", label:"Davanagere"}, 
                        {id:"7", label:"Bellary"}, {id:"8", label:"Bijapur"}, {id:"9", label:"Shimoga"}, {id:"10", label:"Tumkur"}
                    ]
                },
                {id:"fpa1_zone", label:"Zone", inputType:"text", placeholder:"Zone", model: "zone1"},
                {id:"fpa1_pincode", label:"Pincode", inputType:"text", placeholder:"Pincode", model: "pincode1"}
            ],
            address2: [
                {id:"fpa2_address", label:"Address", inputType:"text", placeholder:"Address", model: "address2"},
                {id:"fpa2_street", label:"Street", inputType:"text", placeholder:"Street", model: "stree2"},
                {id:"fpa2_city", label:"City", inputType:"dropdown", placeholder:"City", model: "city2",
                    options: [
                        {id:"1", label:"Bengaluru"}, {id:"2", label:"Mysore"}, {id:"3", label:"Mangalore"}, 
                        {id:"4", label:"Belgaum"}, {id:"5", label:"Gulbarga"}, {id:"6", label:"Davanagere"}, 
                        {id:"7", label:"Bellary"}, {id:"8", label:"Bijapur"}, {id:"9", label:"Shimoga"}, {id:"10", label:"Tumkur"}
                    ]
                },
                {id:"fpa2_zone", label:"Zone", inputType:"text", placeholder:"Zone", model: "zone2"},
                {id:"fpa2_pincode", label:"Pincode", inputType:"text", placeholder:"Pincode", model: "pincode2"}
            ]
        };

        var columnDefs1 = [
            {headerName: "Sl. No. ", Field: "rowNum", valueGetter: "node.id + 1", width: 70},
            {headerName: "ID", field: '_id', width: 250},
            {headerName: "Name", field: 'name', width: 250},
            {headerName: "City", field: 'city', width: 250},
            {headerName: "Mobile No", field: 'mobile', width: 250},
        ];

        var rowData = [];
        ctrl.gridOptions = {}

        ctrl.init = function (){
            rowData = [];
            ctrl.gridOptions = {
                rowData: [],
                virtualPaging: false,
                rowSelection: 'single',
                rowHeight: 33,
                enableSorting: true,
                enableFilter: true,
                //onSelectionChanged: onSelectionChanged,
                onGridReady: function(params) {
                    params.api.setColumnDefs(columnDefs1);
                }
            };

            ManageSubscriberService.getSubscribers().then(
                function(response){
                    rowData = getRowDataFromArray(response);
                    ctrl.gridOptions.api.setRowData(rowData);
                }, 
                function(response){
                    
                }
            );
        }

        ctrl.onClickBtn = function(identifier){
            if(identifier == "New"){
                onNewClicked();
            } else if(identifier == "Edit"){
                onEditClicked();
            } else if(identifier == "Close"){
                onCloseClicked();
            } else if(identifier == "Print"){
                //DTOService.showToastMessage(DTOService.MessageType.INFO, DTOService.Messages.UnsupportedOp);
            } else if(identifier == "Clear"){
                onClearClicked();
            } else if(identifier == "Save"){
                onClickSave();
            } else {

            }
        }

        ctrl.applyFilter = function (model) {
            ctrl.gridOptions.api.setQuickFilter(ctrl.dynamicModelValues.searchFieldParams[model]);
            ctrl.gridOptions.api.refreshView();
        }

        /*
        PRIVATE METHODS
         */
        var onClickSave = function (){
            var subscriberData = angular.copy(ctrl.dynamicModelValues.formParams);
            var subscriber = {
                subscriber: ctrl.dynamicModelValues.formParams.name, 
                data: subscriberData
            };

            subscriber = JSON.stringify(subscriber);
            if(ctrl.isNewClicked){
                ManageSubscriberService.addSubscriber(subscriber).then(onSaveSuccess, onSaveError);
            }else {
                var id = subscriberData["id"];
                ManageSubscriberService.updateSubscriber(id, subscriber).then(onSaveSuccess, onSaveError);
            }
        }

        var onNewClicked = function(){
            ctrl.isNewClicked = true;
            ctrl.isEditClicked = false;
            ctrl.gridOptions.api.deselectAll();
            ctrl.dynamicModelValues.formParams = {};
        }

        var onEditClicked = function (){
            ctrl.isNewClicked = false;
            ctrl.isEditClicked = true;
            ctrl.dynamicModelValues.formParams = {};

            var selectedRows = ctrl.gridOptions.api.getSelectedRows();
            if(selectedRows != null && selectedRows.length > 0){
                ctrl.dynamicModelValues.formParams["id"] = selectedRows[selectedRows.length - 1]["_id"];
                var data = selectedRows[selectedRows.length - 1].data;
                for(var prop in data){
                    ctrl.dynamicModelValues.formParams[prop] = data[prop];
                }
            }
        }

        var onCloseClicked = function(){
            ctrl.gridOptions.api.deselectAll();
            ctrl.dynamicModelValues.formParams = {};
            ctrl.isNewClicked = false;
            ctrl.isEditClicked = false;
        }

        var onClearClicked = function(){
            ctrl.dynamicModelValues.formParams = {};
        }

        var onSaveSuccess = function(response){
            var insertedRowData = getRowDataFromObject(response);
            if(insertedRowData != null){
                if(rowData == null){
                    rowData = insertedRowData;
                    ctrl.gridOptions.api.setRowData(insertedRowData);
                }else {
                    for(var index = 0; index < insertedRowData.length; index++){
                        if(ctrl.isEditClicked){
                            var listIndex = findIndexOfObjectInList(insertedRowData[index]["_id"], rowData);
                            if (listIndex > -1) {
                                rowData.splice(listIndex, 1);
                            }
                        }
                        rowData.push(insertedRowData[index]);
                    }
                    ctrl.gridOptions.api.setRowData(rowData);
                }
            }
            onCloseClicked();
        }

        var onSaveError = function(response){
            
        }

        var getRowDataFromArray = function(response){
            var records = null;
            if(response != null && response.data != null && response.data.length > 0){
                records = new Array();
                for(var index = 0;index < response.data.length; index++){
                    var obj = {
                        _id: response.data[index]._id,
                        name: response.data[index].subscriber,
                        city: response.data[index].data["city1"].label,
                        mobile: response.data[index].data["mobile"],
                        data: response.data[index].data
                    };
                    records.push(obj);
                }
            }
            return records;
        }

        var getRowDataFromObject = function(response){
            var records = null;
            if(response != null && response.data != null){
                records = new Array();
                var obj = {
                    _id: response.data._id,
                    name: response.data.subscriber,
                    city: response.data.data["city1"].label,
                    mobile: response.data.data["mobile"],
                    data: response.data.data
                };              

                records.push(obj);
            }
            return records;
        }

        var findIndexOfObjectInList = function(id, list){
             var foundIndex = -1;
             for(var index = 0; index < list.length; index++){
                 if(list[index]["_id"] == id){
                     foundIndex = index;
                     break;
                 }
             }
             return foundIndex;
        }
	}

    CFApp.controller('ManageSubscriberCtrl', ['$scope','ManageSubscriberService', ManageSubscriberCtrl]);
}());
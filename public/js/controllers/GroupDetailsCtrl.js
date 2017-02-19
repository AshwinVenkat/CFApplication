(function () {
    var CFApp = angular.module('CFApp');
    var GroupDetailsCtrl = function ($scope, $filter, GroupDetailsService) {
        var ctrl = this;

        ctrl.pgTitle = "Group Details";
        ctrl.pgSubtitle = "Create / update / delete Group details";

        ctrl.isNewClicked = false;
        ctrl.isEditClicked = false;
        ctrl.stm_isEditClicked = false;

        ctrl.dynamicModelValues = {
            prior_permission: {},
            subscriber_ticket_mapping: {},
            commencement_details: {},
            configuration: {}
        };

        ctrl.stmModelValues = {
            form_values: {}
        }

        ctrl.datepopup = {
            pp_resolution_date: {opened: false},
            pp_permission_application_date: {opened: false},
            pp_challan_date: {opened: false},
            cd_prior_permission_date: {opened: false},
            cd_comm_application_date: {opened: false},
            cd_challan_date: {opened: false},
            bc_expiry_date: {opened: false},
            c_comm_certificate_date: {opened: false},
            c_first_auction_date: {opened: false},
            c_last_auction_date: {opened: false}
        }

        var dateFieldList = ["resolution_date", "permission_application_date", "pp_challan_date", "prior_permission_date", "comm_application_date", 
            "cd_challan_date", "bc_expiry_date", "c_comm_certificate_date", "first_auction", "c_last_auction_date"];

        ctrl.formParams = {
            prior_permission: [
                {id:"pp_group_name", label:"Group Name", inputType:"text", placeholder:"Name", model: "group_name"},
                {id:"pp_chit_value", label:"Chit Value", inputType:"number", placeholder:"Chit Value", model: "chit_value"},
                {id:"pp_no_of_subscriber", label:"No. of Subscribers", inputType:"number", placeholder:"No. of Subscribers", model: "subscribers"},
                {id:"pp_installment_amount", label:"Installment Amount", inputType:"number", placeholder:"Installment Amount", model: "installment"},
                {id:"pp_resolution_date", label:"Resolution Date", inputType:"date", placeholder:"Resolution Date", model: "resolution_date"},
                {id:"pp_permission_application_date", label:"Application Date", inputType:"date", placeholder:"Permission Application Date", model: "permission_application_date"},
                {id:"pp_department", label:"Department", inputType:"dropdown", placeholder:"Department", model: "department",
                    options: [
                        {id:"1", label:"Assistant Registrar of Co-op Societies & Chits"}, 
                        {id:"2", label:"Deputy Registrar of Co-op Societies & Chits"}, 
                        {id:"3", label:"Joint Registrar of Co-op Societies & Chits"}, 
                        {id:"4", label:"Sale Tax officer"}
                    ]
                },
                {id:"pp_bank_challan", label:"Challan of Bank", inputType:"dropdown", placeholder:"Challan of Bank", model: "pp_challan_of_bank",
                    options: [
                        {id:"1", label:"ICICI Bank"}, {id:"2", label:"HDFC Bank"}, {id:"3", label:"Kotak Bank"}, 
                        {id:"4", label:"Axis Bank"}, {id:"5", label:"Canara Bank"}, {id:"6", label:"State Bank of India"}
                    ]
                },
                {id:"pp_challan_date", label:"Challan Date", inputType:"date", placeholder:"Challan Date", model: "pp_challan_date"},
                {id:"pp_challan_no", label:"Challan No", inputType:"number", placeholder:"Challan No", model: "pp_challan_no"},
                {id:"pp_p_p_fees", label:"P P Fees", inputType:"number", placeholder:"P P Fees", model: "p_p_fees"}
            ],
            commencement_details: [
                {id:"cd_prior_permission_date", label:"Prior Permission Date", inputType:"date", placeholder:"Permission Date", model: "prior_permission_date"},
                {id:"cd_prior_permission_ref_no", label:"Permission Ref. No.", inputType:"text", placeholder:"Ref. No.", model: "prior_permission_ref_no"},
                {id:"cd_comm_application_date", label:"Comm. Application Date", inputType:"date", placeholder:"Application Date", model: "comm_application_date"},
                {id:"cd_bank_challan", label:"Challan of Bank", inputType:"dropdown", placeholder:"Challan of Bank", model: "cd_challan_of_bank",
                    options: [
                        {id:"1", label:"ICICI Bank"}, {id:"2", label:"HDFC Bank"}, {id:"3", label:"Kotak Bank"}, 
                        {id:"4", label:"Axis Bank"}, {id:"5", label:"Canara Bank"}, {id:"6", label:"State Bank of India"}
                    ]
                },
                {id:"cd_challan_date", label:"Challan Date", inputType:"date", placeholder:"Challan Date", model: "cd_challan_date"},
                {id:"cd_challan_no", label:"Challan No", inputType:"number", placeholder:"Challan No", model: "cd_challan_no"},
                {id:"cd_comm_fee", label:"Comm. Fees", inputType:"number", placeholder:"Comm. Fees", model: "comm_fees"},
                {id:"cd_bank_collateral", label:"Bank Collateral", inputType:"dropdown", placeholder:"Bank Collateral", model: "cd_bank_collateral",
                    options: [
                        {id:"1", label:"Yes"}, {id:"0", label:"No"}
                    ]
                }
            ],
            bank_collateral:[
                {id:"bc_bank_name", label:"Bank Name", inputType:"dropdown", placeholder:"Bank Name", model: "bc_bank_name",
                    options: [
                        {id:"1", label:"ICICI Bank"}, {id:"2", label:"HDFC Bank"}, {id:"3", label:"Kotak Bank"}, 
                        {id:"4", label:"Axis Bank"}, {id:"5", label:"Canara Bank"}, {id:"6", label:"State Bank of India"}
                    ]
                },
                {id:"bc_ref_no", label:"Reference No.", inputType:"number", placeholder:"Reference No.", model: "bc_reference_no"},
                {id:"bc_amount", label:"Amount", inputType:"number", placeholder:"Amount", model: "bc_amount"},
                {id:"bc_expiry_date", label:"Expiry Date", inputType:"date", placeholder:"Expiry Date", model: "bc_expiry_date"}
            ],
            configuration: [
                {id:"c_comm_certificate_date", label:"Comm. Certificate Date", inputType:"date", placeholder:"Comm. Certificate Date", model: "c_comm_certificate_date"},
                {id:"c_comm_certificate_no", label:"Comm. Certificate No.", inputType:"text", placeholder:"Comm. Certificate No", model: "c_comm_certificate_no"},
                {id:"c_min_bid", label:"Minimum Bid (%)", inputType:"number", placeholder:"Min Bid", model: "c_minimum_bid"},
                {id:"c_max_bid", label:"Maximum Bid (%)", inputType:"number", placeholder:"Max Bid", model: "c_maximum_bid"},
                {id:"c_company_commission", label:"Company Commission (%)", inputType:"number", placeholder:"Company Commission", model: "c_company_commission"},
                {id:"c_first_auction_date", label:"First Auction Date", inputType:"date", placeholder:"First Auction Date", model: "first_auction"},
                {id:"c_auction_every", label:"Auction Every (days)", inputType:"number", placeholder:"Auction Every", model: "c_auction_every"},
                {id:"c_auction_time", label:"Auction Time", inputType:"date", placeholder:"Auction Time", model: "c_auction_time"},
                {id:"c_last_auction_date", label:"Last Auction Date", inputType:"date", placeholder:"Last Auction Date", model: "c_last_auction_date"}
            ],
            dividend_distribution: [
                {id:"dd_dividend_distribution", label:"Dividend Distribution", inputType:"dropdown", placeholder:"Dividend Distribution", model: "dd_dividend_distribution",
                    options: [
                        {id:"1", label:"CMOA: Current Month On Auction"}, 
                        {id:"2", label:"CMOA: Current Month On Receipt"},
                        {id:"3", label:"NMOA: Next Month On Auction"},
                        {id:"4", label:"NMOR: Next Month On Receipt"}
                    ]
                }
            ],
            subscriber_ticket_mapping:[
                {id:"stm_subscriber", label:"Subscriber", inputType:"dropdown", placeholder:"Subscriber", model: "subscriber",
                        src: "stm_subscriber", options: []
                },
                {id:"stm_introduced_by", label:"Introduced By", inputType:"dropdown", placeholder:"Introduced By", model: "introduced_by",
                    options: [{id:"1", label:"Aditya"}, {id:"2", label:"Bharat"}, {id:"3", label:"Murali"}, 
                        {id:"4", label:"Preethi"}, {id:"5", label:"Shreshta"}, {id:"6", label:"Gautam"}]
                },
                {id:"stm_collector", label:"Collector", inputType:"dropdown", placeholder:"Collector", model: "collector",
                    options: [{id:"1", label:"Aditya"}, {id:"2", label:"Bharat"}, {id:"3", label:"Murali"}, 
                        {id:"4", label:"Preethi"}, {id:"5", label:"Shreshta"}, {id:"6", label:"Gautam"}]
                },
                {id:"stm_nominee", label:"Nominee", inputType:"text", placeholder:"Nominee", model: "nominee"},
                {id:"stm_nominee_age", label:"Nom. Age", inputType:"number", placeholder:"Nominee Age", model: "nominee_age"},
                {id:"stm_relationship", label:"Relationship", inputType:"dropdown", placeholder:"Relationship", model: "relationship",
                    options: [{id:"1", label:"Father"}, {id:"2", label:"Mother"}, {id:"3", label:"Son"}, 
                        {id:"4", label:"Daughter"}, {id:"5", label:"Husband"}, {id:"6", label:"Wife"}]
                }
            ]
        };

        var summary_coldef = [
            {headerName: "Sl. No. ", Field: "rowNum", valueGetter: "node.id + 1", width: 70},
            {headerName: "ID", field: '_id', width: 100},
            {headerName: "Group Name", field: 'group_name', width: 250},
            {headerName: "Chit Value", field: 'chit_value', width: 150},
            {headerName: "Subscribers", field: 'subscribers', width: 100},
            {headerName: "Installment", field: 'installment', width: 100},
            {headerName: "First Auction", field: 'first_auction', width: 150},
            {headerName: "Department", field: 'department', width: 300}
        ];

        var summary_rowData = [];
        ctrl.summary_gridOptions = {
            rowData: [],
            virtualPaging: false,
            rowSelection: 'single',
            rowHeight: 33,
            enableColResize: true,
            enableSorting: true,
            enableFilter: true,
            //onSelectionChanged: onSelectionChanged,
            onGridReady: function(params) {
			    params.api.setColumnDefs(summary_coldef);
		    }
        };

        var stm_coldef = [
            {headerName: "ID", field: '_id', width: 100},
            {headerName: "GroupID", field: 'groupid', width: 100},
            {headerName: "Ticket No", field: 'ticket_no', width: 100},
            {headerName: "Subscriber", field: 'subscriber', width: 200, editable: true},
            {headerName: "Indroduced By", field: 'introduced_by', width: 200, editable: true},
            {headerName: "Collector", field: 'collector', width: 200, editable: true},
            {headerName: "Nominee", field: 'nominee', width: 100, editable: true},
            {headerName: "Nom Age", field: 'nominee_age', width: 100, editable: true},
            {headerName: "Relationship", field: 'relationship', width: 150, editable: true}
        ];

        var stm_rowData = [];
        ctrl.stm_gridOptions = {
            rowData: stm_rowData,
            virtualPaging: false,
            rowSelection: 'single',
            rowHeight: 33,
            enableColResize: true,
            enableSorting: true,
            enableFilter: true,
            onGridReady: function(params) {
			    params.api.setColumnDefs(stm_coldef);
		    }
        };

        ctrl.init = function (){
            GroupDetailsService.getGroupDetails().then(
                function(response){
                    summary_rowData = getRowDataFromArray(response);
                    ctrl.summary_gridOptions.api.setRowData(summary_rowData);
                }, 
                function(response){
                    
                }
            );
        }

        ctrl.applyFilter = function (model) {
            ctrl.gridOptions.api.setQuickFilter(ctrl.dynamicModelValues.searchFieldParams[model]);
            ctrl.gridOptions.api.refreshView();
        }

        ctrl.onClickBtn = function (identifier){
            switch(identifier){
                case "New": onNewClicked(); break;
                case "Edit": onEditClicked(); break;
                case "Delete": break;
                case "Close": onCloseClicked(); break;
                case "stm_edit": stm_onEditClicked(); break;
                case "stm_close": stm_onCloseClicked(); break;
                case "stm_save": saveSubscriberTicketMapping(); break;
                case "stm_clear": clearSubscriberTicketMapping(); break;
                case "pp_save": savePriorPermission(); break;
                case "pp_clear": clearPriorPermission(); break;
                case "cd_save": saveCommencementDetails(); break;
                case "cd_clear": clearCommencementDetails(); break;
                case "c_save": saveConfigurationDetails(); break;
                case "c_clear": clearConfigurationDetails(); break;
            }
        }

        /*
        PRIVATE METHODS
         */
        var savePriorPermission = function(){
            var groupdetailsdata = angular.copy(ctrl.dynamicModelValues);
            var groupdetails = {
                groupname: groupdetailsdata.prior_permission["group_name"],
                subscriberscount: groupdetailsdata.prior_permission["subscribers"],
                data: groupdetailsdata,
            }
            groupdetails = JSON.stringify(groupdetails);

            if(ctrl.isNewClicked){
                GroupDetailsService.addGroupDetails(groupdetails).then(onPriorPermissionSaveSuccess, onSaveError);
            }else {
                var selectedRows = ctrl.summary_gridOptions.api.getSelectedRows();
                var id = selectedRows[selectedRows.length - 1]["_id"];
                GroupDetailsService.updateGroupDetails(id, groupdetails).then(onSaveSuccess, onSaveError);
            }
        } 

        var clearPriorPermission = function(){
            ctrl.dynamicModelValues.prior_permission = {};
        } 

        var saveCommencementDetails = function(){
            var groupdetailsdata = angular.copy(ctrl.dynamicModelValues);
            var groupdetails = {
                groupname: groupdetailsdata.prior_permission["group_name"],
                subscriberscount: groupdetailsdata.prior_permission["subscribers"],
                data: groupdetailsdata,
            }
            groupdetails = JSON.stringify(groupdetails);

            var selectedRows = ctrl.summary_gridOptions.api.getSelectedRows();
            var id = selectedRows[selectedRows.length - 1]["_id"];
            GroupDetailsService.updateGroupDetails(id, groupdetails).then(onSaveSuccess, onSaveError);
        } 

        var clearCommencementDetails = function(){
            ctrl.dynamicModelValues.commencement_details = {};
        } 

        var saveConfigurationDetails = function(){
            var groupdetailsdata = angular.copy(ctrl.dynamicModelValues);
            var groupdetails = {
                groupname: groupdetailsdata.prior_permission["group_name"],
                subscriberscount: groupdetailsdata.prior_permission["subscribers"],
                data: groupdetailsdata,
            }
            groupdetails = JSON.stringify(groupdetails);

            var selectedRows = ctrl.summary_gridOptions.api.getSelectedRows();
            var id = selectedRows[selectedRows.length - 1]["_id"];
            GroupDetailsService.updateGroupDetails(id, groupdetails).then(onSaveSuccess, onSaveError);
        } 

        var clearConfigurationDetails = function(){
            ctrl.dynamicModelValues.configuration = {};
        } 

        var onPriorPermissionSaveSuccess = function(response){
            var insertedRowData = getRowDataFromObject(response);
            if(insertedRowData != null){
                if(summary_rowData == null){
                    summary_rowData = insertedRowData;
                    ctrl.summary_gridOptions.api.setRowData(summary_rowData);
                }else {
                    for(var index = 0; index < insertedRowData.length; index++){
                        if(ctrl.isEditClicked){
                            var listIndex = findIndexOfObjectInList(insertedRowData[index]["_id"], summary_rowData);
                            if (listIndex > -1) {
                                summary_rowData.splice(listIndex, 1);
                            }
                        }
                        summary_rowData.push(insertedRowData[index]);
                    }
                    ctrl.summary_gridOptions.api.setRowData(summary_rowData);
                }

                //make api call to create required default subscriber ticket mapping
                var id = insertedRowData[0]["_id"];
                var count = insertedRowData[0]["subscribers"];
                GroupDetailsService.createDefaultSubscriberTicketMapping(id, count)
                .then(function(response){

                }, function(response){

                });

            }
            onCloseClicked();
        }

        var onSaveSuccess = function(response){
            var insertedRowData = getRowDataFromObject(response);
            if(insertedRowData != null){
                if(summary_rowData == null){
                    summary_rowData = insertedRowData;
                    ctrl.summary_gridOptions.api.setRowData(summary_rowData);
                }else {
                    for(var index = 0; index < insertedRowData.length; index++){
                        if(ctrl.isEditClicked){
                            var listIndex = findIndexOfObjectInList(insertedRowData[index]["_id"], summary_rowData);
                            if (listIndex > -1) {
                                summary_rowData.splice(listIndex, 1);
                            }
                        }
                        summary_rowData.push(insertedRowData[index]);
                    }
                    ctrl.summary_gridOptions.api.setRowData(summary_rowData);
                }
            }
            onCloseClicked();
        }

        var onSaveError = function(response){

        }

        var onNewClicked = function(){
            ctrl.isNewClicked = true;
            ctrl.isEditClicked = false;
            ctrl.summary_gridOptions.api.deselectAll();
            clearDynamicModelValues();
        }

        var onEditClicked = function (){
            var selectedRows = ctrl.summary_gridOptions.api.getSelectedRows();
            if(selectedRows != null && selectedRows.length > 0){
                ctrl.isNewClicked = false;
                ctrl.isEditClicked = true;
                clearDynamicModelValues();

                if(selectedRows != null && selectedRows.length > 0){
                    var groupid = selectedRows[selectedRows.length - 1]["_id"];

                    GroupDetailsService.getSubscriberTicketMapping(groupid).then(
                    function(response){
                        if(response != null){
                            stm_rowData = extractSubscriberTicketMappingData(response.data);
                            ctrl.stm_gridOptions.api.setRowData(stm_rowData);
                        }
                    }, function(response){

                    });

                    var data = selectedRows[selectedRows.length - 1].data;
                    for(var tab in data){
                        ctrl.dynamicModelValues[tab] = {};
                        for(var prop in data[tab]){
                            var value = data[tab][prop];
                            if(dateFieldList.indexOf(prop) !== -1){
                                ctrl.dynamicModelValues[tab][prop] = 
                                    angular.copy(new Date($filter('date')(new Date(data[tab][prop]), 'dd-MMM-yyyy')));
                            }else {
                                ctrl.dynamicModelValues[tab][prop] = angular.copy(data[tab][prop]);
                            }
                        }
                    }
                }
            }
        }

        var onCloseClicked = function(){
            ctrl.summary_gridOptions.api.deselectAll();
            clearDynamicModelValues();
            ctrl.isNewClicked = false;
            ctrl.isEditClicked = false;
        }

        var stm_onEditClicked = function (){
            var selectedRows = ctrl.stm_gridOptions.api.getSelectedRows();
            if(selectedRows != null && selectedRows.length > 0){
                ctrl.stm_isEditClicked = true;
                stm_clearDynamicModelValues();
                var selectedRow = selectedRows[selectedRows.length - 1];
                var formData = ctrl.stmModelValues.form_values;
                for(var prop in selectedRow){
                    switch(prop){
                        case "collector":
                            formData.collector = {id: getSelectedOptionFromLabel(selectedRow[prop], 
                                ctrl.formParams.subscriber_ticket_mapping[2].options).value.id}; 
                            break;

                        case "introduced_by":
                            formData.introduced_by = {id: getSelectedOptionFromLabel(selectedRow[prop], 
                                ctrl.formParams.subscriber_ticket_mapping[1].options).value.id};
                            break;
                            
                        case "nominee":
                            formData.nominee = selectedRow[prop];
                            break;
                        
                        case "nominee_age":
                            formData.nominee_age = selectedRow[prop];
                            break;
                        
                        case "relationship":
                            formData.relationship = {id: getSelectedOptionFromLabel(selectedRow[prop], 
                                ctrl.formParams.subscriber_ticket_mapping[5].options).value.id};
                            break;

                        case "subscriber":
                            formData.subscriber = {id: getSelectedOptionFromLabel(selectedRow[prop], 
                                ctrl.formParams.subscriber_ticket_mapping[0].options).value.id};
                            break;
                    }
                }
            }
        }

        var stm_onCloseClicked = function(){
            ctrl.stm_gridOptions.api.deselectAll();
            stm_clearDynamicModelValues();
            ctrl.stm_isEditClicked = false;
        }

        var saveSubscriberTicketMapping = function(){
            var selectedRows = ctrl.stm_gridOptions.api.getSelectedRows();
            if(selectedRows != null && selectedRows.length > 0){
                var stm_gridData = angular.copy(stm_rowData);
                var ticketNo = selectedRows[selectedRows.length - 1].ticket_no;

                var stm_array = new Array();
                stm_gridData.forEach(function(item){
                    var obj = {};    
                    if(item.ticket_no == ticketNo){
                        var formData = ctrl.stmModelValues.form_values;
                        obj.subscriber = getSelectedOption(formData.subscriber.id, ctrl.formParams.subscriber_ticket_mapping[0].options).value.label;
                        obj.introduced_by = getSelectedOption(formData.introduced_by.id, ctrl.formParams.subscriber_ticket_mapping[1].options).value.label;
                        obj.collector = getSelectedOption(formData.collector.id, ctrl.formParams.subscriber_ticket_mapping[2].options).value.label;
                        obj.nominee = formData.nominee;
                        obj.nominee_age = formData.nominee_age;
                        obj.relationship = getSelectedOption(formData.relationship.id, ctrl.formParams.subscriber_ticket_mapping[5].options).value.label;
                    }else {
                        obj.subscriber = item.subscriber;
                        obj.introduced_by = item.introduced_by;
                        obj.collector = item.collector;
                        obj.nominee = item.nominee;
                        obj.nominee_age = item.nominee_age;
                        obj.relationship = item.relationship;
                    }
                    stm_array.push(obj);
                });

                var id = selectedRows[selectedRows.length - 1]._id;
                var group_id = selectedRows[selectedRows.length - 1].groupid;
                var data = {
                    group_id: group_id,
                    data: stm_array
                }
                data = JSON.stringify(data);

                GroupDetailsService.updateSubscriberTicketMapping(id, data)
                .then(function(response){
                    if(response != null){
                        stm_rowData = extractSubscriberTicketMappingData(response.data);
                        ctrl.stm_gridOptions.api.setRowData(stm_rowData);
                        stm_onCloseClicked();
                    }
                }, 
                function(response){
                    
                });
            }
        }

        var clearSubscriberTicketMapping = function(){
            stm_clearDynamicModelValues();
        }

        var getRowDataFromArray = function(response){
            var records = null;
            if(response != null && response.data != null && response.data.length > 0){
                records = new Array();
                for(var index = 0;index < response.data.length; index++){
                    var obj = {
                        _id: response.data[index]["_id"],
                        group_name: response.data[index]["groupname"],
                        subscribers: response.data[index]["subscriberscount"],
                        chit_value: response.data[index].data.prior_permission["chit_value"],
                        installment: response.data[index].data.prior_permission["installment"],
                        department: response.data[index].data.prior_permission["department"].label,
                        first_auction: response.data[index].data.configuration != null ? 
                            response.data[index].data.configuration["first_auction"] : "",
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
                    _id: response.data["_id"],
                    group_name: response.data["groupname"],
                    subscribers: response.data["subscriberscount"],
                    chit_value: response.data.data.prior_permission["chit_value"],
                    installment: response.data.data.prior_permission["installment"],
                    department: response.data.data.prior_permission["department"].label,
                    first_auction: response.data.data.configuration != null ? 
                        response.data.data.configuration["first_auction"] : "",
                    data: response.data.data
                };
                records.push(obj);
            }
            return records;
        } 

        var extractSubscriberTicketMappingData = function(response){
            var list = response.data;
            var id = response._id;
            var groupid = response.group_id;

            var records = [];
            for(var index = 0; index < list.length; index++){
                var obj = {
                    _id: id,
                    groupid: groupid,
                    ticket_no: typeof(list[index]["ticket_no"]) == "undefined" ?
                         index+1: list[index]["ticket_no"],
                    subscriber: list[index]["subscriber"],
                    introduced_by: list[index]["introduced_by"],
                    collector: list[index]["collector"],
                    nominee: list[index]["nominee"],
                    nominee_age: list[index]["nominee_age"],
                    relationship:list[index]["relationship"]
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

        var getSelectedOption = function(id, list){
            var foundObj = {index: -1, value:{}};
            for(var index = 0; index < list.length; index++){
                if(list[index]["id"] == id){
                    foundObj.index = index;
                    foundObj.value = list[index];
                    break;
                }
            }
            return foundObj;
        }

        var getSelectedOptionFromLabel = function(label, list){
            var foundObj = {index: -1, value:{}};
            for(var index = 0; index < list.length; index++){
                if(list[index]["label"] == label){
                    foundObj.index = index;
                    foundObj.value = list[index];
                    break;
                }
            }
            return foundObj;
        }

        var clearDynamicModelValues = function(){
            ctrl.dynamicModelValues.prior_permission = {};
            ctrl.dynamicModelValues.subscriber_ticket_mapping = {};
            ctrl.dynamicModelValues.commencement_details = {};
            ctrl.dynamicModelValues.configuration = {};
        }

        var stm_clearDynamicModelValues = function(){
            ctrl.stmModelValues.form_values = {};
        }
	}

    CFApp.controller('GroupDetailsCtrl', ['$scope', '$filter', 'GroupDetailsService', GroupDetailsCtrl]);
}());
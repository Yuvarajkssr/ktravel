sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/format/DateFormat",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/ui/integration/library",
	"sap/ui/core/library",
	"sap/m/MessageBox"
], function (Controller, JSONModel, DateFormat, MessageToast, Fragment, integrationLibrary, CoreLibrary, MessageBox) {
	"use strict";

	var ValueState = CoreLibrary.ValueState,
		oData = {
			tripNameState: ValueState.Error,
			countryState: ValueState.Error,
			cityState: ValueState.Error,
			backButtonVisible: false,
			submitButtonVisible: false
		};

	return Controller.extend("kaar.ktdev.controller.App", {

		onInit: function () {
			// var oView = this.getView();

			var oModel = new JSONModel(),
				oInitialModelState = Object.assign({}, oData);
			oModel.setData(oInitialModelState);
			this.getView().setModel(oModel);
			this._oWizard = this.byId("TravelRequestWizard");
			this.handleButtonsVisibility();
			this._oSFFlight = this.byId("flightDatePicker");
			this._oSFCar = this.byId("carDatePicker");
			this._oSFHotel = this.byId("hotelDatePicker");
			this._oSFCostCenter = this.byId("costCenterInput");
			this._oSFExpense = this.byId("newExpense");

			var tableid = this.getView().byId("expenseTable");
			var oModelTable = new sap.ui.model.json.JSONModel();
			oModelTable.setData([]);
			tableid.setModel(oModelTable);

			$.ajax({
				// url: "/sap_hcmcloud_core_odata/odata/v2/JobApplication?$select=jobReqId,firstName,lastName,candidateId,applicationId,jobAppStatus&$expand=jobAppStatus",
				//	url: "/sap_hcmcloud_core_odata/odata/v2/cust_Travel_request?select=cust_City,cust_Country,cust_costCenterCode,cust_costCenterName,cust_descriptionOfTrip,cust_purposeOfTrip,cust_requestId,cust_tripEndDate",
				//	url: "/sap_hcmcloud_core_odata/odata/v2/cust_Travel_request/User(106020)",
				//	url: "/sap_hcmcloud_core_odata/odata/v2/cust_Travel_request(cust_costCenterCode=oap)",
				url: "/sap_hcmcloud_core_odata/odata/v2/cust_Travel_request?$filter=User eq '106020'",
				type: "GET",
				dataType: "json",
				headers: {
					"DataServiceVersion": "2.0",
					"X-CSRF-Token": "Fetch",
					"Content-Type": "application/json; charset=utf-8"
				},
				success: function (result, status, response) {
					//code to bind data to view

					// console.log(result);
					// getData = result.d.results[0];
					// header_xcsrf_token = response.getResponseHeader("x-csrf-token");
					// oHeaders = {
					// 	"x-csrf-token": header_xcsrf_token,
					// 	"Accept": "application/json",
					// 	"Content-Type": "application/json; charset=utf-8",
					// 	"x-http-method": "POST"
					// };

				}
			});
		},
		handleButtonsVisibility: function () {
			var oModel = this.getView().getModel();
			switch (this._oWizard.getProgress()) {
			case 1:
				oModel.setProperty("/nextButtonVisible", true);
				oModel.setProperty("/nextButtonEnabled", true);
				oModel.setProperty("/backButtonVisible", false);
				// oModel.setProperty("/reviewButtonVisible", false);
				oModel.setProperty("/submitButtonVisible", false);
				break;
			case 2:
				oModel.setProperty("/backButtonVisible", true);
				oModel.setProperty("/nextButtonVisible", true);
				oModel.setProperty("/nextButtonEnabled", true);
				break;
			case 3:
				// oModel.setProperty("/backButtonVisible", true);
				// 	oModel.setProperty("/nextButtonVisible", true);
				// oModel.setProperty("/nextButtonEnabled", true);
				break;
			case 4:
				// oModel.setProperty("/backButtonVisible", true);
				// 	oModel.setProperty("/nextButtonVisible", true);
				// oModel.setProperty("/nextButtonEnabled", true);
				break;
			case 5:
				
				oModel.setProperty("/nextButtonVisible", false);
				// oModel.setProperty("/reviewButtonVisible", false);
				// oModel.setProperty("/backButtonVisible", true);
				oModel.setProperty("/nextButtonVisible", false);
				oModel.setProperty("/submitButtonVisible", true);
				break;
			
			default:
				break;
			}

		},
		tripHeadersValidation: function () {
			var oModel = this.getView().getModel(),
				sName = this.byId("TripName").getValue(),
				sCountry = this.byId("Country").getValue(),
				sCity = this.byId("City").getValue();

			this.handleButtonsVisibility();

			if (sName.length < 1) {
				oModel.setProperty("/tripNameState", ValueState.Error);
			} else {
				oModel.setProperty("/tripNameState", ValueState.None);
			}
			if (sCountry.length < 1) {
				oModel.setProperty("/countryState", ValueState.Error);
			} else {
				oModel.setProperty("/countryState", ValueState.None);
			}
			if (sCity.length < 1) {
				oModel.setProperty("/cityState", ValueState.Error);
			} else {
				oModel.setProperty("/cityState", ValueState.None);
			}

			if (sName.length < 1 || sCountry.length < 1 || sCity.length < 1) {
				this._oWizard.invalidateStep(this.byId("TravelHeaders"));
				oModel.setProperty("/nextButtonEnabled", false);
				oModel.setProperty("/finishButtonVisible", false);
			} else {

				this._oWizard.validateStep(this.byId("TravelHeaders"));
				oModel.setProperty("/nextButtonEnabled", true);
			}
		},
		segmentsValidation: function () {
			// var oModel = this.getView().getModel(),
			// 	sName = this.byId("TripName").getValue(),
			// 	sCountry = this.byId("Country").getValue(),
			// 	sCity = this.byId("City").getValue();

			this.handleButtonsVisibility();

			// if (sName.length < 1) {
			// 	oModel.setProperty("/tripNameState", ValueState.Error);
			// } else {
			// 	oModel.setProperty("/tripNameState", ValueState.None);
			// }
			// if (sCountry.length < 1) {
			// 	oModel.setProperty("/countryState", ValueState.Error);
			// } else {
			// 	oModel.setProperty("/countryState", ValueState.None);
			// }
			// if (sCity.length < 1) {
			// 	oModel.setProperty("/cityState", ValueState.Error);
			// } else {
			// 	oModel.setProperty("/cityState", ValueState.None);
			// }

			// if (sName.length < 1 || sCountry.length < 1 || sCity.length < 1) {
			// 	this._oWizard.invalidateStep(this.byId("TravelHeaders"));
			// 	oModel.setProperty("/nextButtonEnabled", false);
			// 	oModel.setProperty("/finishButtonVisible", false);
			// } else {

			// 	this._oWizard.validateStep(this.byId("TravelHeaders"));
			// 	oModel.setProperty("/nextButtonEnabled", true);
			// }
		},
		onDialogNextButton: function () {
			if (this._oWizard.getProgressStep().getValidated()) {
				this._oWizard.nextStep();
			}

			this.handleButtonsVisibility();
		},
		addFlightDatePicker: function () {
			var oFlightLableFrom = new sap.m.Label({
				text: "From",
				required: true
			});
			var oFlightInputFromCountry = new sap.m.Input({
				placeholder: "Country",
				required: true
			});
			var oFlightInputFromCity = new sap.m.Input({
				placeholder: "City",
				required: true
			});
			var oFlightLableTo = new sap.m.Label({
				text: "To",
				required: true
			});
			var oFlightInputToCountry = new sap.m.Input({
				placeholder: "Country",
				required: true
			});
			var oFlightInputToCity = new sap.m.Input({
				placeholder: "City",
				required: true
			});
			var oFlightLableDate = new sap.m.Label({
				text: "Date",
				required: true
			});
			var oFlightDatePicker = new sap.m.DatePicker({
				placeholder: "Flight Date",
				required: true
			});
			var delIcon = new sap.m.Button({
				// src: "sap-icon://delete",
				text: "Delete",
				type: "Emphasized",
				press: this.onDelete
			});
			var _oFlightFirstLayout = new sap.ui.layout.form.SimpleForm({
				content: [oFlightLableFrom, oFlightInputFromCountry, oFlightInputFromCity, oFlightLableTo, oFlightInputToCountry,
					oFlightInputToCity, oFlightLableDate, oFlightDatePicker, delIcon
				]
			});
			this._oSFFlight.addContent(_oFlightFirstLayout);

		},
		// getValue: function () {
		// 	debugger;
		// 	var values = "";
		// 	var pnlDom = this._oPnl.getDomRef()
		// 	$(pnlDom).find('input').each(function (index, elem) {
		// 		debugger;
		// 		values += ", " + $(elem)[0].value;
		// 	});
		// 	alert(values);
		// },
		addCarDatePicker: function () {
			var oCarLableFrom = new sap.m.Label({
				text: "From",
				required: true
			});
			var oCarInputFrom = new sap.m.Input({
				placeholder: "pick-up location",
				required: true
			});
			var oCarTimePickerFrom = new sap.m.TimePicker({
				placeholder: "pick-up Timing",
				required: true
			});
			var oCarLableTo = new sap.m.Label({
				text: "To",
				required: true
			});
			var oCarInputTo = new sap.m.Input({
				placeholder: "drop location",
				required: true
			});

			var oCarTimePickerto = new sap.m.TimePicker({
				placeholder: "drop-turn Timing",
				required: true
			});
			var oCarLableDate = new sap.m.Label({
				text: "Date",
				required: true
			});
			var oCarDateRangeSelection = new sap.m.DateRangeSelection({
				showFooter: true,
				required: true
			});
			var delIcon = new sap.m.Button({
				// src: "sap-icon://delete",
				text: "Delete",
				type: "Emphasized",
				press: this.onDelete
			});
			var _oCarFirstLayout = new sap.ui.layout.form.SimpleForm({
				content: [oCarLableFrom, oCarInputFrom, oCarTimePickerFrom, oCarLableTo, oCarInputTo, oCarTimePickerto, oCarLableDate,
					oCarDateRangeSelection, delIcon
				]
			});
			this._oSFCar.addContent(_oCarFirstLayout);

		},
		onBackButton: function () {
			this._oWizard.previousStep();
			this.handleButtonsVisibility();
		},
		addHotelDatePicker: function () {
			var oHotelLabelFrom = new sap.m.Label({
				text: "Check-in Date",
				required: true
			});
			var oHotelDatePickerCheckIn = new sap.m.DatePicker({
				placeholder: "Check-in Date"
			});
			var oHotelLabelTO = new sap.m.Label({
				text: "Check-out Date",
				required: true
			});
			var oHotelDatePickerCheckOut = new sap.m.DatePicker({
				placeholder: "Check-out Date"
			});
			var oHotelLableMeals = new sap.m.Label({
				text: "Food",
				required: true
			});
			var oHotelSwitchFood = new sap.m.Switch({
				customTextOff: "No",
				customTextOn: "Yes"
			});
			var oHotelInputCity = new sap.m.Input({
				placeholder: "City"
			});
			var delIcon = new sap.m.Button({
				// src: "sap-icon://delete",
				text: "Delete",
				type: "Emphasized",
				press: this.onDelete
			});
			var _oHotelFirstLayout = new sap.ui.layout.form.SimpleForm({
				content: [oHotelLabelFrom, oHotelDatePickerCheckIn, oHotelLabelTO, oHotelDatePickerCheckOut, oHotelInputCity,
					oHotelLableMeals,
					oHotelSwitchFood, delIcon
				]
			});
			this._oSFHotel.addContent(_oHotelFirstLayout);

		},
		addCostCenterInput: function () {
			var oCostCenterLabel = new sap.m.Label({
				text: "Cost Center",
				required: true
			});

			var oCostCenterNameInput = new sap.m.Input({
				placeholder: "Cost-Center Name e.g HO-WFH"
			});
			var oCostCenterCodeInput = new sap.m.Input({
				placeholder: "Cost-Center Code e.g CKTXXXOAP"
			});
			var oCommentsLabel = new sap.m.Label({
				text: "Comments",
				required: true
			});
			var oCommentsInput = new sap.m.Input({
				placeholder: "Comments"
			});
			var delIcon = new sap.m.Button({
				// src: "sap-icon://delete",
				text: "Delete",
				type: "Emphasized",
				press: this.onDelete
			});
			var _oCostCenterFirstLayout = new sap.ui.layout.form.SimpleForm({
				content: [oCostCenterLabel, oCostCenterNameInput, oCostCenterCodeInput, oCommentsLabel, oCommentsInput, delIcon]
			});
			this._oSFCostCenter.addContent(_oCostCenterFirstLayout);

		},
		onDelete: function (oEvent) {
			var rowItemContainer = oEvent.getSource().getParent();
			rowItemContainer.destroy();
		},
		handleWizardCancel: function () {
			this._handleMessageBoxOpen("Are you sure you want to cancel your Travel Request?", "warning");
		},
		handleWizardSubmit: function () {
			this._handleMessageBoxOpen("Are you sure you want to submit your Travel Request?", "confirm");
		},
		_handleMessageBoxOpen: function (sMessage, sMessageBoxType) {
			MessageBox[sMessageBoxType](sMessage, {
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === MessageBox.Action.YES) {
						this._oWizard.discardProgress(this._oWizard.getSteps()[0]);
						MessageToast.show("Your Travel Request is subimitted succesfully");
						// this.byId("wizardDialog").close();
						this.getView().getModel().setData(Object.assign({}, oData));
					}
					else if (oAction === MessageBox.Action.NO) {
						this._oWizard.discardProgress(this._oWizard.getSteps()[0]);
						MessageToast.show("Your Travel Request is flushed");
						// this.byId("wizardDialog").close();
						this.getView().getModel().setData(Object.assign({}, oData));
					}
				}.bind(this)
			});
		},
		discardProgress: function () {
			// var oModel = this.getView().getModel();
			this._oWizard.discardProgress(this.byId("TravelRequestWizard"));

			var clearContent = function (aContent) {
				for (var i = 0; i < aContent.length; i++) {
					if (aContent[i].setValue) {
						aContent[i].setValue("");
					}

					if (aContent[i].getContent) {
						clearContent(aContent[i].getContent());
					}
				}
			};

			// oModel.setProperty("/productWeightState", ValueState.Error);
			// oModel.setProperty("/productNameState", ValueState.Error);
			clearContent(this._oWizard.getSteps());
		},
		onAddPress: function () {
			this.receivedRowDialog = sap.ui.xmlfragment("kaar.ktdev.view.fragment.AddNewRowDialog", this);
			this.getView().addDependent(this.receivedRowDialog);
			this.receivedRowDialog.open();
		},

		onSubmitPress: function (oEvent) {
			var oTab = this.getView().byId("expenseTable").getModel().getProperty("/");
			var sid = sap.ui.getCore().byId("id").getValue();
			var sexpenseType = sap.ui.getCore().byId("expenseType").getValue();
			var sDRSexpense = sap.ui.getCore().byId("DRSexpense").getValue();
			var sCCC = sap.ui.getCore().byId("CCC").getValue();
			var sCCN = sap.ui.getCore().byId("CCN").getValue();
			var samount = sap.ui.getCore().byId("amount").getValue();
			var data = [{
				RequestID: sid,
				Date: sexpenseType,
				ExpenseType: sDRSexpense,
				Costcentercode: sCCC,
				Costcentername: sCCN,
				Amount: samount
			}];
			oTab.push(data[0]);
			//	oTab.push(data[0]);
			this.getView().byId("expenseTable").getModel().setProperty("/", oTab);

			this.receivedRowDialog.destroy();
			var total = "0";
			for (var i = 0; i < this.getView().byId("expenseTable").getModel().getData().length; i++) {
				total = Number(total) + Number(this.getView().byId("expenseTable").getModel().getData()[i].Amount);
			}
			this.getView().byId("totalamount").setValue(total);
		},
		onpressClaimRequest: function (oEvent) {
			var msg = "Your Claim Request is sent Successfully";
			MessageToast.show(msg);
		},

			onAction: function (oEvent) {
			if (oEvent.getParameter("type") === integrationLibrary.CardActionType.Navigation) {
				MessageToast.show("URL: " + oEvent.getParameter("parameters").url);
			}
		}

	});
});
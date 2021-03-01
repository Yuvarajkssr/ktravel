/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"kaar/ktdev/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
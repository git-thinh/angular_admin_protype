'use strict';

/* Controllers */

function controller($scope, $window, $http, $route, $routeParams, $compile, svCore, MODULE_DEFAULT) {
    //var moduleID = $routeParams.name;
    // if (moduleID == null || moduleID == undefined || moduleID == 'undefined') moduleID = MODULE_DEFAULT;
    var moduleID = svCore.getModuleID();
    var controllerID = moduleID.split('-').join('').split('.').join('') + 'Ctrl';


    $scope.moduleCtrl = controllerID;
    //$scope.moduleID = moduleID;

    ////console.clear();
    console.log('CONTROLLER moduleID = ' + moduleID);
    console.log('CONTROLLER controllerID = ' + controllerID);

    /******************************************************/
    //var jq = $.noConflict();
    ////jQuery('#message_title').css({ 'color': 'red' });
    /******************************************************/
}

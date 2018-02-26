
function articleviewCtrl($scope, svCore) {

    console.log($scope.article);


    $scope.close = function () {
        //console.log($scope.popupID);
        svCore.popupClose($scope);
    }

    $scope.getViewContent = function (s) {
    }
};
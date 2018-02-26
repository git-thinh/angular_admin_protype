
function blankCtrl($scope) {
    $scope.message = 'md-header controller';

    $scope.sendMsg = function () {
        alert('$scope.message = ' + $scope.message);
    }
}
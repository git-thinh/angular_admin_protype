
function mdmenu11Ctrl($scope, $http) {
    $scope.message = 'md-menu1.1 controller';

    $http.get($scope.PATH + 'label-en.json').then(function (response) {
        //console.log(response.data);
        $scope.label = response.data;
    });

    $scope.formSubmit = function () {
        alert('$scope.message =  ' + $scope.message);
    }
    $scope.formCancel = function () {
        alert('$scope.message =  ' + $scope.message);
    }
}
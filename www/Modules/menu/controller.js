
function menuCtrl($scope, $http, $rootScope, MSG, SEARCH) {

    $http.get('/api.ashx?mod=articles').then(function (response) {
        $scope.articles = response.data;
        //$scope.$parent.menuChild = false;
    });

    $scope.$on('SEARCH', function (message) {
        var articles = SEARCH.Get();
        $scope.articles = articles; 
        console.log('menuCtrl', articles);
        if ($scope.browserName != 'pc')
            jQuery('#menu').removeClass('hideMenu');
    });

    $scope.itemClick = function (key) {
        $scope.selectKey = key;
        $http.get('/api.ashx?mod=article&key=' + key).then(function (response) {
            var item = response.data;
            console.log('itemClick', item);
            MSG.Set(item);
            $rootScope.$broadcast('MSG', item);
            if ($scope.browserName != 'pc')
                jQuery('#menu').removeClass('hideMenu');
        });
    };

    $scope.isSelected = function (key) {
        var ok = $scope.selectKey === key;
        return ok;
    }
}


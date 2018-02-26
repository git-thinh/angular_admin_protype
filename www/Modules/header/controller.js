
function headerCtrl($scope, $http, $rootScope, SEARCH) {
    var browser = '';
    var slideout = null;

    aready(function () {
        //if ($scope.isIE == false) {
        //    slideout = new Slideout({
        //        'panel': document.getElementById('main'),
        //        'menu': document.getElementById('menu'),
        //        'padding': 256,
        //        'tolerance': 70
        //    });
        //    //slideout.toggle();
        //}

        $scope.message = 'MENU';
    });
     
    $scope.search = function (keyword) {
        $http.get('/api.ashx?mod=search&key=' + keyword).then(function (response) {
            var items = response.data;
            console.log('search', items);
            SEARCH.Set(items);
            $rootScope.$broadcast('SEARCH', items); 
        });
    }

    $scope.toggleMenuLeft = function () {
        jQuery('#menu').toggleClass('hideMenu');
    }
}

//homeCtrl.$inject = ['$scope'];
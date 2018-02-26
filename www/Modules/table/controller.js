
function tableCtrl($scope, $window, $compile, svCore, MSG) {
    var titleOld = '';
    $scope.$on('MSG', function (message) {
        var article = MSG.Get();
        titleOld = article.Title;
        $scope.article = article;
        console.log('tableCtrl', article); 
    });

    $scope.goView = function () {
        console.log('goView', $scope.article);

        svCore.popupShow($scope, 'article-view', { article: $scope.article });
    }

    $scope.goSave = function () {
        var tit = document.getElementById('article.Title.Edit').value;
        console.log(tit);
        console.log(titleOld);

        if (tit == titleOld) {
            var ok = svCore.postSynchronous('/api.ashx?mod=content&key=' + $scope.article.Key, $scope.article.Content);
            if (ok == 'OK')
                alertShow({ type: 'complete', content: 'Update content success' });
            else
                alertShow({ type: 'error', content: 'Update content error' });
        } else {
            var ok2 = svCore.postSynchronous('/api.ashx?mod=content&key=' + $scope.article.Key, $scope.article.Content);
            var ok1 = svCore.postSynchronous('/api.ashx?mod=title&key=' + $scope.article.Key, tit);

            if (ok1 == 'OK' && ok2 == 'OK') {
                alertShow({ type: 'complete', content: 'Update article success' });
                titleOld = tit;
            }
            else
                alertShow({ type: 'error', content: 'Update article error' });
        }
    }

    $scope.goTheme = function () {
        console.log('goPublish', $scope.article);
    }

    $scope.goSite = function () {
        var url = '/' + $scope.article.Key + '.html';
        $window.open(url, '_blank', '');
    }
}
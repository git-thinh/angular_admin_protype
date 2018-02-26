'use strict';

function cooSet(cname, cvalue, exdays) {
    if (exdays == null) exdays = 1;
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function cooGet(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function aready(func) {
    angular.element(document).ready(function () {
        func();
    });
}

/******************************************************/
//var user = cooGet('username');
//var pass = cooGet('password');
//if (user == null || user == '' || user == undefined || pass == null || pass == '' || pass == undefined)
//    if (location.href.toString().indexOf('login') == -1)
//        location.href = '/home.html#login';
/******************************************************/

(function (window, angular, undefined) {
    'use strict';
    var agl = angular || {};
    var ua = navigator.userAgent;

    agl.ISFF = ua.indexOf('Firefox') != -1;
    agl.ISOPERA = ua.indexOf('Opera') != -1;
    agl.ISCHROME = ua.indexOf('Chrome') != -1;
    agl.ISSAFARI = ua.indexOf('Safari') != -1 && !agl.ISCHROME;
    agl.ISWEBKIT = ua.indexOf('WebKit') != -1;

    agl.ISIE = ua.indexOf('Trident') > 0 || navigator.userAgent.indexOf('MSIE') > 0;
    agl.ISIE6 = ua.indexOf('MSIE 6') > 0;
    agl.ISIE7 = ua.indexOf('MSIE 7') > 0;
    agl.ISIE8 = ua.indexOf('MSIE 8') > 0;
    agl.ISIE9 = ua.indexOf('MSIE 9') > 0;
    agl.ISIE10 = ua.indexOf('MSIE 10') > 0; 
    agl.ISOLD = agl.ISIE6 || agl.ISIE7 || agl.ISIE8; // MUST be here

    agl.ISIE11UP = ua.indexOf('MSIE') == -1 && ua.indexOf('Trident') > 0;
    agl.ISIE10UP = agl.ISIE10 || agl.ISIE11UP;
    agl.ISIE9UP = agl.ISIE9 || agl.ISIE10UP;

})(window, window.angular);

/* Declare app level module which depends on filters, and services */
angular
    .module('app', ['app.filters', 'app.services', 'app.directives'])
    .constant('URL_WEBSOCKET', 'http://web-socket.com/')
    .constant('URL_API_POST', 'http://api-post.com/')
    .constant('MODULE_DEFAULT', 'table')
    .constant('PAGE_BACKGROUND_COLOR', '#DDD')
    .constant('MENU_BACKGROUND_COLOR', '#CCC')
    .constant('saveInterval', 15000)
    .constant('appId', '123456789')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', { template: '<div ng-module-controller="moduleCtrl"></div>', controller: controller });
        $routeProvider.when('/:name', { template: '<div ng-module-controller="moduleCtrl"></div>', controller: controller });
        $routeProvider.otherwise({ redirectTo: '/' });
    }])
    .controller('noneCtrl', function ($scope) {
    });


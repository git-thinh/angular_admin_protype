'use strict';

/* Directives */


angular.module('app.directives', [])
    .directive('ngAppVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }])
    .directive('ngResize', function ($window) {
        return function (scope, element) {
            var w = angular.element($window);
            scope.getWindowDimensions = function () {
                var wi = $window.innerWidth && document.documentElement.clientWidth ? Math.min($window.innerWidth, document.documentElement.clientWidth) :
                    $window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
                var hi = $window.innerHeight && document.documentElement.clientHeight ? Math.min($window.innerHeight, document.documentElement.clientHeight) :
                    $window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;

                //console.log(wi + '|' + hi);

                return {
                    //'h': w.height(),
                    //'w': w.width()
                    'h': hi,
                    'w': wi,
                };
            };
            scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
                scope.windowHeight = newValue.h;
                scope.windowWidth = newValue.w;

                scope.resizeClass = function () {
                    var bro = '';
                    if (scope.browserName == null || scope.browserName == undefined) {
                        if (angular.ISCHROME) bro = ' chrome';
                        else if (angular.ISSAFARI) bro = ' safari';
                        else if (angular.ISWEBKIT) bro = ' webKit';
                        else if (angular.ISFF) bro = ' firefox';
                        else if (angular.ISIE11UP) bro = ' ie11';
                        else if (angular.ISIE10) bro = ' ie10';
                        else if (angular.ISIE9) bro = ' ie9';
                        scope.browserName = bro;                        
                    } else
                        bro = scope.browserName;

                    var css = 'pc';
                    
                    if (newValue.w < 480)
                        css = 'mobile';
                    else if (newValue.w < 1024)
                        css = 'tablet';

                    if (bro.indexOf('ie') == 1) {
                        scope.isIE = true;
                        css += ' ie'
                    } else
                        scope.isIE = false;

                    console.log(css + bro);

                    return css + bro;
                };
            }, true);

            w.bind('resize', function () {
                scope.$apply();
            });
        }
    })
    .directive('ngModuleController', function ($compile, $window, $http, $routeParams, $timeout, svCore, MODULE_DEFAULT) {
        var linker = function (scope, element, attr) {
            var moduleID = svCore.getModuleID();

            var controllerID = scope[attr.ngModuleController];
            element.attr('ng-controller', controllerID);
            element.removeAttr("ng-module-controller");

            console.log('DIRECTIVE moduleID = ' + moduleID);
            console.log('DIRECTIVE controllerID = ' + controllerID);
            
            var path = '/Modules/' + moduleID + '/';
            scope.PATH = path;
            scope.moduleID = moduleID;

            var js = svCore.getSynchronous(path + 'controller.js');
            if (js == null) {
                js = '';
                element.attr('ng-controller', 'noneCtrl');
                alertShow({ type: 'error', content: 'Cannot find controller: ' + controllerID });
            }

            var script = document.createElement('script');
            script.setAttribute("type", "text/javascript");
            script.innerHTML = js;
            element.parent().append(script);

            //newElement = $compile("<div my-directive='n'></div>")(scope)
            //element.parent().append(newElement)

            var css = svCore.getSynchronous(path + 'css.css');
            if (css == null) css = '';
            var style = document.createElement('style');
            style.setAttribute("type", "text/css");
            style.innerHTML = css;
            element.parent().append(style);

            var temp = svCore.getSynchronous(path + 'temp.htm');
            if (temp == null) temp = '';
            element[0].innerHTML = temp;
            
            $compile(element)(scope);
            //jQuery('html, body').scrollTop(0);
        };

        return { 
            restrict: 'A',
            terminal: true,
            priority: 1000,
            link: linker
        };
    })

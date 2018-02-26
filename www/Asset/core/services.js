'use strict';

/* Services */

/* Demonstrate how to register services In this case it is a simple value service. */
angular.module('app.services', [])
.value('version', '0.1')
.factory('MSG', function () {
    var msg = {};
    return {
        Get: function () { return msg; },
        Set: function (m) { msg = m; }
    };
})
.factory('SEARCH', function () {
    var items = [];
    return {
        Get: function () { return items; },
        Set: function (m) { items = m; }
    };
})
.factory('svCore', function ($window, $compile, MODULE_DEFAULT) {
    var service = {
        getModuleID: function () {
            var url = $window.location.href;
            var a = url.split('/');
            var moduleID = a[a.length - 1];

            if (moduleID == null || moduleID == undefined || moduleID == 'undefined' || moduleID == '' || moduleID == '/')
                moduleID = MODULE_DEFAULT;

            return moduleID;
        },
        popupClose: function (scope) {
            var popupID = scope.popupID;
            if (popupID != null) {
                document.getElementById(popupID).remove();
            }
        },
        popupShow: function (scope, moduleID, data) {
            //var moduleID = 'article-view';

            var parent = scope.$parent;
            if (data != null) {
                for (var key in data) {
                    parent[key] = data[key];
                }
            }

            /** create id modal */
            var id = 'popup-' + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            parent.popupID = id;

            var pop = document.createElement('div');
            pop.id = id;
            var element = document.createElement('div');
            element.className = 'popup';
            pop.appendChild(element);
            $('body').append(pop);
            //var element = document.getElementById('popup');

            var controllerID = moduleID.split('-').join('').split('.').join('') + 'Ctrl';

            element.setAttribute('ng-controller', controllerID);

            console.log('goView moduleID = ' + moduleID);
            console.log('goView controllerID = ' + controllerID);

            var path = '/Modules/' + moduleID + '/';
            scope.PATH = path;
            scope.moduleID = moduleID;

            var js = service.getSynchronous(path + 'controller.js');
            if (js == null) {
                js = '';
                element.getAttribute('ng-controller', 'noneCtrl');
                alertShow({ type: 'error', content: 'Cannot find controller: ' + controllerID });
            }

            var script = document.createElement('script');
            script.setAttribute("type", "text/javascript");
            script.innerHTML = js;
            element.parentElement.appendChild(script);

            //newElement = $compile("<div my-directive='n'></div>")(scope)
            //element.parent().append(newElement)

            var css = service.getSynchronous(path + 'css.css');
            if (css == null) css = '';
            var style = document.createElement('style');
            style.setAttribute("type", "text/css");
            style.innerHTML = css;
            element.parentElement.appendChild(style);

            var temp = service.getSynchronous(path + 'temp.htm');
            if (temp == null) temp = '';
            element.innerHTML = temp;

            $compile(element)(parent);

            jQuery("#popup").show();
        },
        checkLink: function (url) {
            var request = new XMLHttpRequest();
            request.open('GET', url, false);  // `false` makes the request synchronous
            request.send(null);

            if (request.status === 200) {
                return true;
            }
            return false;
        },
        getSynchronous: function (url) {
            var request = new XMLHttpRequest();
            request.open('GET', url, false);
            //request.timeout = 5000;
            //request.ontimeout = function () {
            //};
            request.send(null);

            if (request.status === 200) {
                return request.responseText;
            }
            return null;
        },
        postSynchronous: function (url, data) {
            var request = new XMLHttpRequest();
            request.open('POST', url, false);
            //request.timeout = 5000;  
            //request.ontimeout = function () {
            //};
            request.send(data);

            if (request.status === 200) {
                return request.responseText;
            }
            return null;
        }
    };
    return service;
})
.factory('svMenu', function ($http) {
    var jsonTransform = function (data, headers) {
        return angular.fromJson(data);
    };
    var service = {
        //getData: function () {
        //    return $http.get('/Modules/md-menu/data.json', { transformResponse: jsonTransform });
        //}
    };
    return service;
})
.factory('svControl', function ($http, svCore) {
    var service = {
        groupRadio: function (item, scope) {
            if (item == undefined || item == null) return '';
            var htm = '';
            var val = item['item'], list = item['list'];

            for (var i = 0; i < list.length; i++) {
                var it = list[i];
                if (val == it['id'])
                    htm += '<div class="radio"><label><input checked type="radio" name="radio" data-value="' + it['id'] + '"><span class="label-title">' + it['text'] + '</span></label></div>';
                else
                    htm += '<div class="radio"><label><input type="radio" name="radio" data-value="' + it['id'] + '"><span class="label-title">' + it['text'] + '</span></label></div>';
            }

            return htm;
        },
        dropDownMenu: function (item, scope) {
            if (item == undefined || item == null) return '';
            var htm = '';
            var val = item['item'], list = item['list'];

            for (var i = 0; i < list.length; i++) {
                var it = list[i];
                if (val == it)
                    htm += '<li class="active"><a href="javascript:void(0);" data-value="' + it + '">' + it + '</a></li>';
                else
                    htm += '<li><a href="javascript:void(0);" data-value="' + it + '">' + it + '</a></li>';
            }

            return htm;
        },
        textBox: function (item, scope) {
            if (item == undefined || item == null) return '';
            var readonly = '';
            if (item['disabled'] == true || item['disabled'] == 'true') readonly = ' readonly="readonly" ';

            var htm =
                '<input class="form-control" type="text" data-control="text" data-title="' + item['title'] + '" data-category="' + item['category'] + '" ' +
                'data-item="' + item['item'] + '" ' + readonly + ' data-validate="' + item['validate'] + '" data-type="' + item['type'] + '" ' +
                'id="' + item['id'] + '" data-active="' + item['active'] + '" value="' + item['value'] + '">';
            return htm;
        },
        checkBox: function (item, scope) {
            if (item == undefined || item == null) return '';
            var check = '';
            if (item['value'] == true || item['value'] == 'true') check = ' checked ';
            var htm =
                '<input type="checkbox" data-category="' + item['category'] + '" data-item="' + item['item'] + '" ' + check +
                'id="' + item['id'] + '" data-active="' + item['active'] + '">' +
                '<label for="' + item['id'] + '" class="label-title">' + item['label'] + '</label>';
            return htm;
        },
        switchToggle: function (item, scope) {
            if (item == undefined || item == null) return '';
            var check = '';
            if (item['value'] == true || item['value'] == 'true') check = ' checked ';
            var htm =
                '<input type="checkbox" data-control="' + item['control'] + '" data-category="' + item['category'] + '" data-item="' + item['item'] + '" ' + check +
                'id="' + item['id'] + '" data-active="' + item['active'] + '">' +
                '<label for="' + item['id'] + '"></label>';
            return htm;
        },
    };
    return service;
})
.factory('api', function ($http) {
    var jsonTransform = function (data, headers) {
        return angular.fromJson(data);
    };
    var service = {
        user: function () {
            return $http.get('/user', { transformResponse: jsonTransform });
        },
        about: function () {
            return $http.get('/about', { transformResponse: jsonTransform });
        },
        load: function (id) {
            return $http.get('/svc', {
                transformResponse: jsonTransform,
                params: {
                    'file_id': id
                }
            });
        },
        save: function (fileInfo, newRevision) {

            return $http({
                url: '/svc',
                method: fileInfo.resource_id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    'newRevision': newRevision
                },
                transformResponse: jsonTransform,
                data: JSON.stringify(fileInfo)
            });
        }
    };
    return service;
})

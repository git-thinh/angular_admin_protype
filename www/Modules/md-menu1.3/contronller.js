
function mdmenu13Ctrl($scope, $http, $filter) {
    $scope.message = 'md-menu1.3 controller';
    //$scope.var1 = 'This is some text.';
    //$scope.var2 = 'And this is appended with custom filter.';

    var data = {};
    $http.get($scope.PATH + 'label-en.json').then(function (response) {
        //console.log(response.data);
        var label = response.data;
        $scope.label = label;

        $http.get($scope.PATH + 'data.json').then(function (response) {
            data = response.data;
            //console.log('data', data);
            //$scope.data = data;

            /*////////////////////////////*/
            var settingcategory1_enable = '';
            var settingname1_setting1 = '';
            var settingname1_setting2 = '';
            var settingname1_setting3 = '';
            var settingcategory2_enable = '';
            var settingcategory3_setting1 = '';
            var settingcategory4_setting1 = '';

            try {
                settingcategory1_enable = data['SettingCategory1']['Enable'];
                settingname1_setting1 = data['SettingCategory1']['Setting']['Setting1'];
                settingname1_setting2 = data['SettingCategory1']['Setting']['Setting2'];
                settingname1_setting3 = data['SettingCategory1']['Setting']['Setting3'];
                settingcategory2_enable = data['SettingCategory2']['Enable'];
                settingcategory3_setting1 = data['SettingCategory3']['Setting1'];
                settingcategory4_setting1 = data['SettingCategory4']['Setting1'];
            } catch (e1) {
                alertShow({ type: 'error', content: 'Cannot find some key, ' + e1.toString() });
                return;
            }

            /*////////////////////////////*/
            //#region /* SETTING CATEGORY 1 */
            /*////////////////////////////*/


            var settingcategory1_enable_val = false;
            var settingcategory1_enable_htm = '';
            var settingname1_disable = false;
            if (settingcategory1_enable == 'true' || settingcategory1_enable == true) {
                settingcategory1_enable_htm = ' checked ';
                settingcategory1_enable_val = true;
            } else {
                settingname1_disable = true;
            }

            $scope.settingcategory1_enable_checkbox = {
                id: "checkbox001",
                control: "",
                disabled: "",
                item: "SettingCategory1.Enable",
                active: "settingname1.setting1;settingname1.setting2;settingname1.setting3",
                category: "settingcategory1",
                label: label.Res_0103_01_01_01,
                value: settingcategory1_enable_val,
                style: "",
            };

            $scope.settingname1_setting1_switch = {
                id: "settingname1.setting1",
                control: "switch",
                disabled: settingname1_disable,
                item: "SettingCategory1.Setting.Setting1",
                active: "",
                category: "settingcategory1",
                label: '',
                value: (settingname1_setting1 == 'On' ? true : false),
                style: (settingname1_disable == true ? ' style="opacity: 0.5;" ' : ' '),
            };

            $scope.settingname1_setting2_switch = {
                id: "settingname1.setting2",
                control: "switch",
                disabled: settingname1_disable,
                item: "SettingCategory1.Setting.Setting2",
                active: "",
                category: "settingcategory1",
                label: '',
                value: (settingname1_setting2 == 'On' ? true : false),
                style: (settingname1_disable == true ? ' style="opacity: 0.5;" ' : ' '),
            };

            $scope.settingname1_setting3_switch = {
                id: "settingname1.setting3",
                control: "switch",
                disabled: settingname1_disable,
                item: "SettingCategory1.Setting.Setting3",
                active: "",
                category: "settingcategory1",
                label: '',
                value: (settingname1_setting3 == 'On' ? true : false),
                style: (settingname1_disable == true ? ' style="opacity: 0.5;" ' : ' '),
            };

            //#endregion

            /*////////////////////////////*/
            //#region /* SETTING CATEGORY 2 */
            /*////////////////////////////*/

            $scope.settingcategory2_enable_checkbox = {
                id: "checkbox002",
                control: "",
                disabled: "",
                item: "SettingCategory2.Enable",
                active: "settingname2.setting1",
                category: "settingcategory2",
                label: label.Res_0103_01_02_01,
                value: settingcategory2_enable,
                style: "",
            };

            var settingcategory2_setting1_val = false;
            if (settingcategory2_enable == 'false' || settingcategory2_enable == false)
                settingcategory2_setting1_val = true;

            $scope.settingcategory2_setting1_textbox = {
                id: "settingname2.setting1",
                control: "",
                disabled: settingcategory2_setting1_val,
                item: "SettingCategory2.Setting1",
                active: "settingname2.setting1",
                category: "settingcategory2",
                label: '',
                title: 'SettingCategory2/Setting1',
                value: data['SettingCategory2']['Setting1'],
                validate: 'vali_max_length|255',
                style: "",
            };

            //#endregion

            /*////////////////////////////*/
            //#region /* SETTING CATEGORY 3 */
            /*////////////////////////////*/

            $scope.settingcategory3_setting1_items = {
                item: settingcategory3_setting1,
                list: ['List Item 1', 'List Item 2', 'List Item 3']
            };
            $scope.settingcategory3_setting1 = settingcategory3_setting1;

            $scope.settingcategory3_setting2_textbox = {
                id: "settingname3.setting2",
                type: 'number',
                control: "",
                disabled: '',
                item: "SettingCategory3.Setting2",
                active: "settingname3.setting2",
                category: "settingcategory3",
                label: '',
                title: 'SettingCategory3/Setting2',
                value: data['SettingCategory3']['Setting2'],
                validate: 'vali_number_between|1|99',
                style: "",
            };

            $scope.settingcategory3_setting3_textbox = {
                id: "settingname3.setting3",
                type: 'number',
                control: "",
                disabled: '',
                item: "SettingCategory3.Setting3",
                active: "settingname3.setting3",
                category: "settingcategory3",
                label: '',
                title: 'SettingCategory3/Setting3',
                value: data['SettingCategory3']['Setting3'],
                validate: 'vali_number_between|1|99',
                style: "",
            };

            //#endregion

            /*////////////////////////////*/
            /* SETTING CATEGORY 4 */
            /*////////////////////////////*/

            $scope.settingcategory4_setting1_items = {
                item: settingcategory4_setting1,
                list: [
                    { id: '1', text: 'Radio 1' },
                    { id: '2', text: 'Radio 2' },
                    { id: '3', text: 'Radio 3' }
                ]
            };
            $scope.settingcategory4_setting1 = settingcategory4_setting1;

            /*////////////////////////////*/
        });
    });

    $scope.formSubmit = function () {
        alert('$scope.message = md-menu1.3, ' + $scope.message);

        console.clear();
        var $boxModule = $('#box-module');
        var fdata = formSerialize($boxModule, true, false);

        if (fdata != null) {
            var lsKey = new Array();
            var lsValue = new Array();

            jQuery.each(fdata, function (key_, val_) {
                lsKey.push(key_);
                lsValue.push(val_);
            });

            var obj = data;//__modItem.Data;
            //console.log('data', obj);
            formFormatData('', obj, lsKey, lsValue);
            console.log(obj);
            console.log(lsKey);
            //console.log(JSON.stringify(obj));

            showInfiniteIndicator();
            setTimeout(function () {
                closeInfiniteIndicator();
                alertShow({ type: 'complete', content: 'Completed', ok: function () { } });
            }, 1000);
        }


        /** POST TO API SERVICE CASSINI TO SAVE JSON DATA */
        /**
        //console.clear();   
        var $boxModule = $('#box-module');
        var fdata = formSerialize($boxModule, true, false);
        if (fdata != null) {
    
            showInfiniteIndicator();
    
            var lsKey = new Array();
            var lsValue = new Array();
    
            jQuery.each(fdata, function (key_, val_) {
                lsKey.push(key_);
                lsValue.push(val_);
            });
    
            var obj =  data;//__modItem.Data;
            formFormatData('', obj, lsKey, lsValue);
            console.log(obj);
            console.log(lsKey);
    
            var json = JSON.stringify(obj);
            //alert(json);
            var url = __urlAPI + '?mod=' + __modItem.Id;
            callAjax(url, {
                ok: function (result) {
                    __modItem.Data = obj;
                    modulePublish();
                    //alert('OK: ' + result);
                    setTimeout(function () {
                        closeInfiniteIndicator();
                        alertShow({ type: 'complete', content: 'Completed', ok: function () { } });
                    }, 1000);
                },
                error404: function () {
                    closeInfiniteIndicator();
                    var msg404 = 'Cannot find page: ' + __urlAPI + '<br>Please check existion the file.'
                    alertShow({ type: 'error', content: msg404, cancel: function () { } });
                },
                error: function (error) {
                    closeInfiniteIndicator();
                    alert('ERROR: ' + error);
                }
            }, json, 'POST');
        } 
        */
    }

    $scope.formCancel = function () {
        alert('$scope.message = md-menu1.3, ' + $scope.message);
    }
}
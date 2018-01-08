/// <reference path="../jquery/jquery-2.0.3.js" />

var controllers = angular.module('controllers', []);
/********************************************************************ORG********************************************************************/
//机构管理
controllers.controller('orgCtrl', ['$scope', '$rootScope', '$routeParams', '$http', '$modal', 'orgService', '$location', '$log',
    function ($scope, $rootScope, $routeParams, $http, $modal, orgService, $location, $log) {
        $rootScope.active = 'org';
        bootbox.setLocale("zh_CN");
        $scope.queryKey = $routeParams.queryKey || '';
        $scope.CurrentNode = null;//当前节点
        window.localStorage.rowSize = window.localStorage.rowSize || 20;//表格默认显示行数
        console.log(window.localStorage.rowSize); //打印行数
        $scope.CurrentParent = null;//当前节点父节点
        $scope.arrList = {};

        //获取根节点
        $scope.getRootNode = function () {
            orgService.getOrgData({parentId: " ", isAll: false, code: 0}, function (data) {
                console.log(data);
                for (var i = 0; i < data.data.length; i++) {
                    data.data[i].isChecked = false; //显示背景颜色为不选中(ture:为选中 背景变色)
                    data.data[i].isPlus = true; //显示树状结构的图片("+"图标,false："-")
                }
                $scope.data = data;
                $scope.orgDatail = data.data[0]; //显示默认数
            });
        };

        $scope.getRootNode();//加载数据

        $scope.getChildData = function (Id, node) {
            orgService.getOrgData({parentId: Id, isAll: false, code: 0}, function (data) {
                for (var i = 0; i < data.data.length; i++) {
                    data.data[i].isChecked = false;//显示背景颜色为不选中(ture:为选中 背景变色)
                    data.data[i].isPlus = true;//显示树状结构的图片("+"图标,false："-")
                }
                node.childData = data;
                node.isPlus = false;
            });
        };

        //图标点击事件
        $scope.checkTreeClick = function (org) { //点击图片加载子节点

            $scope.arrList[org.id] = org;
            //获取父节点
            $scope.parentData = org;
            //判断当前节点是否展开 如果是展开 则关闭（图标换为“+”）,否则加载数据并改变图标为“-”
            if (!org.isPlus) {
                //清空当前节点的子节点（如果有再次点击不请求服务器  应该交给第三变量）
                org.childData = null;
                //更改图标为“+”
                org.isPlus = true;
            } else {
                //改变图片为“-”
                org.isPlus = false;
                $scope.getChildData(org.id, org);
            }
        };

        //添加方法
        $scope.create = function (Id, ParentId, IndexCode) {
            orgService.getOrgTypeData({id: Id}, function (data) {
                console.log(data);
                var modalInstance = $modal.open({
                    templateUrl: 'orgcreatetpl',
                    controller: orgCreateCtrl,
                    resolve: {
                        items: function () {
                            return {"parentId": ParentId, "indexCode": IndexCode, "data": data.orgType};
                        }
                    }
                });
                modalInstance.result.then(function (dialogResult) {
                    $log.info('dialogResult: ' + dialogResult);
                    if (Id == 0) {
                        $scope.getRootNode();
                    }
                    else {
                        $scope.getChildData(Id, $scope.CurrentNode);
                        //设置当前节点含有子节点（显示图标）
                        $scope.CurrentNode.isHasChild = 1;
                        //设置图标为“-”
                        $scope.isPlus = false;
                    }
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            });

        };

        //节点选中事件
        $scope.createShow = function (org) {
            $scope.arrList[org.id] = org;
            //判断CurrentNode是否为空
            if ($scope.CurrentNode != null || $scope.CurrentNode == true) {
                //此时CurrentNode为上次选中节点，将上次选中节点背景色改为非选中状态
                $scope.CurrentNode.isChecked = false;
            }
            //将当前节点改为选中状态(改变背景色)
            org.isChecked = true;
            //将CurrentNode 改变为当前选中节点
            $scope.CurrentNode = org;
            //页面右侧详细信息 展示
            $scope.orgDatail = org;
        };

        //编辑对话框
        $scope.edit = function (org) {
            orgService.getOrgTypeData({id: org.id}, function (data) {
                data.orgList.push({"Name": "根机构", "Id": ' '});
                var modalInstance = $modal.open({
                    templateUrl: 'orgedittpl',
                    controller: orgEditCtrl,
                    resolve: {
                        items: function () {
                            return {"org": org, "data": data.orgType, "orgData": data.orgList}
                        }
                    }
                });

                modalInstance.result.then(function (orgEdit) {
                    if ($scope.arrList[orgEdit.parentId] != null) {
                        $scope.arrList[orgEdit.parentId].childData = orgService.getOrgData({
                            "parentId": orgEdit.parentId,
                            isAll: false,
                            code: 0
                        }, function (data) {
                            $scope.CurrentNode = $scope.arrList[orgEdit.parentId];
                            $scope.CurrentNode.isChecked = true;
                            $scope.orgDatail = $scope.arrList[orgEdit.parentId];
                            $scope.arrList[orgEdit.parentId].isHasChild = 1;
                            $scope.arrList[orgEdit.parentId].isPlus = false;

                            for (var i = 0; i < data.data.length; i++) {
                                if (data.data[i].isHasChild == 1) {
                                    data.data[i].isPlus = true;//显示树状结构的图片("+"图标,false："-")
                                }
                            }
                        });
                        if ($scope.arrList[org.parentId] != null) {
                            $scope.arrList[org.parentId].childData = orgService.getOrgData({
                                "parentId": org.parentId,
                                isAll: false,
                                code: 0
                            }, function (data) {
                                if (data.data.length == 0) {
                                    $scope.arrList[org.parentId].isHasChild = 0;
                                }
                                $scope.arrList[org.parentId].isPlus = false;
                                for (var i = 0; i < data.data.length; i++) {
                                    if (data.data[i].isHasChild == 1) {
                                        data.data[i].isPlus = true;//显示树状结构的图片("+"图标,false："-")
                                    }
                                }

                            });
                        }
                        else {
                            $scope.getRootNode();//加载数据
                        }
                    } else {
                        $scope.getRootNode();//加载数据
                    }
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            });

        };

        //删除Org
        $scope.delete = function (id, parentId) {
            if (id == '') {
                bootbox.alert("未选择任何记录！")
            } else {
                bootbox.confirm("确定要删除数据吗？", function (result) {
                    if (result) {
                        orgService.deleteOrg({idString: id, ParentId: parentId}, function (data) {
                            if (!data.result) {
                                bootbox.alert(data.message);
                            } else {
                                //删除成功后 刷新列表
                                if ($scope.arrList[parentId] != null) {
                                    $scope.arrList[parentId].childData = orgService.getOrgData({
                                        "parentId": parentId,
                                        isAll: false,
                                        code: 0
                                    }, function (data) {
                                        $scope.CurrentNode = $scope.arrList[parentId];
                                        $scope.CurrentNode.isChecked = true;
                                        $scope.orgDatail = $scope.arrList[parentId];
                                        for (var i = 0; i < data.data.length; i++) {
                                            // data.data[i].isChecked = true;//显示背景颜色为不选中(ture:为选中 背景变色)
                                            data.data[i].isPlus = true;//显示树状结构的图片("+"图标,false："-")
                                        }
                                        if (data.data.length == 0) {
                                            $scope.arrList[parentId].isHasChild = 0;
                                        }
                                    });
                                } else {
                                    $scope.getRootNode();//加载数据
                                }
                            }
                        });
                    }
                });
            }
        };

        $scope.query = function () {
            $log.info('query querykey:' + $scope.queryKey);
            $location.path('/org' + ($scope.queryKey != '' ? ('/search/' + $scope.queryKey) : ''));
        };
        //$scope.getRootNode();
    }]
);

//创建对话框控制器
var orgCreateCtrl = function ($scope, $modalInstance, items, orgService) {
    $scope.Title = "添加";//给弹出框重新定义头部标题
    $scope.wrongMessage = "温馨提示：机构编码不超过50个字符长度， 机构名称不超过50字符长度，排序顺序必须是数字";
    $scope.OrgTypeData = items.data;
    $scope.org = {"orgType": items.data[0].id};
    $scope.add = function (org) {
        console.log("items.parentId:" + items.parentId);
        org.parentId = items.parentId;
        org.indexCode = items.indexCode;
        console.log("org:" + org);
        orgService.add(org, function (data) {
            if (data.result == false) {
                $scope.wrongMessage = data.message;
            } else {
                $modalInstance.close('ok');
            }
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};


//机构编辑对话框控制器
var orgEditCtrl = function ($scope, $modalInstance, items, orgService) {
    $scope.Title = "编辑";//给弹出框重新定义头部标题
    $scope.wrongMessage = "温馨提示：机构编号不超过50个字符长度， 机构名称不超过50字符长度，排序顺序必须是数字";
    $scope.org = jQuery.extend({}, items.org);
    $scope.OrgTypeData = items.data;
    $scope.orgName = items.orgData;
    $scope.add = function (org) {
        orgService.edit(org, function (data) {
            if (data.result == false) {
                $scope.wrongMessage = data.message;
            } else {
                items.org = org;
                $modalInstance.close(org);
            }
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};


/************************************************************************App*************************************************************/

controllers.controller('appCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$modal', '$log', 'appService',
    function ($scope, $rootScope, $routeParams, $location, $modal, $log, appService) {
        $rootScope.active = 'app';
        bootbox.setLocale("zh_CN");
        $scope.queryKey = $routeParams.queryKey || '';
        window.localStorage.rowSize = window.localStorage.rowSize || 20;//表格默认显示行数
        $scope.pageSize = window.localStorage.rowSize;
        $scope.paging = {totalItems: 0, currentPage: $routeParams.currentPage || 1, maxSize: 10}; //分页配置
        //获取列表数据
        $scope.getData = function () {
            appService.query({
                queryKey: $scope.queryKey,
                page: $scope.paging.currentPage || 1,
                pageSize: $scope.pageSize //显示默认行数
            }, function (data) {
                $scope.paging.totalItems = data.totalCount;//配置分页总记录数
                $scope.data = data.data;
            });
        };

        //字符串显示截取
        $scope.showString = function (str, length) {
            if (str == null || str == undefined) {
                str = "";
            }
            return str.length > length ? str.substr(0, length) + "……" : str;
        };

        //查看详细信息
        $scope.detail = function (app) {
            var modalInstance = $modal.open({
                // templateUrl: '/templates/app/Detail.html',
                templateUrl: 'appdetailtpl',
                controller: appEditCtrl,
                resolve: {
                    items: function () {
                        return app;
                    }
                }
            });
        };
        //添加对话框
        $scope.create = function () {
            var modalInstance = $modal.open({
                templateUrl: 'appcreatetpl',
                controller: appCreateCtrl,
                resolve: {
                    items: function () {
                        return null;
                    }
                }
            });

            modalInstance.result.then(function (dialogResult) {
                $log.info('dialogResult: ' + dialogResult);
                $scope.getData();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        //编辑对话框
        $scope.edit = function (app) {
            var modalInstance = $modal.open({
                templateUrl: 'appedittpl',
                controller: appEditCtrl,
                resolve: {
                    items: function () {
                        return app;
                    }
                }
            });

            modalInstance.result.then(function (dialogResult, app) {
                $log.info('dialogResult: ' + dialogResult);
                $scope.getData();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        //搜索
        $scope.search = function () {
            //设置当前页为第一页
            $scope.paging.currentPage = 1;
            $scope.getData();
            //更新显示URL
            $scope.query();
        };
        //删除App
        $scope.delete = function (id) {
            bootbox.confirm("确认要删除？", function (result) {
                if (result) {
                    appService.deleteApp({idString: id}, function (data) {
                        if (!data.result) {
                            bootbox.alert(data.message);
                        } else {
                            $scope.getData();
                        }
                    });
                }
            })
        };

        $scope.pageChanged = function (page) {
            $scope.paging.currentPage = page;
            $scope.getData();
            $scope.query();
        };

        $scope.query = function () {
            $log.info('query querykey:' + $scope.queryKey + ' currentPage:' + $scope.paging.currentPage);
            $location.path('/app' + ($scope.queryKey != '' ? ('/search/' + $scope.queryKey) : ''));
        };
        $scope.query();
        $scope.getData();
    }]
);

//App添加控制器
var appCreateCtrl = function ($scope, $modalInstance, items, appService) {
    $scope.title = "添加应用";
    $scope.Message = "温馨提示：编号、名称不超过50个字符长度，备注、描述不超过200字符长度";

    $scope.add = function (app) {
        appService.add(app, function (data) {
            if (!data.result) {
                $scope.Message = data.message;
            } else {
                $modalInstance.close('ok');
            }
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

//App编辑对话框
var appEditCtrl = function ($scope, $modalInstance, items, appService) {
    $scope.app = jQuery.extend({}, items);
    $scope.title = "编辑应用";
    $scope.Message = "温馨提示：编号、名称不超过50个字符长度，备注、描述不超过200字符长度";
    //更新方法
    $scope.add = function (app) {
        appService.edit(app, function (data) {
            if (!data.result) {
                $scope.Message = data.message;
            } else {
                $modalInstance.close('ok', app);
            }
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};


//************************************************** 角色管理开始 **********************************************************************

//角色管理控制器
controllers.controller('roleCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$modal', '$log', 'roleService',
    function ($scope, $rootScope, $routeParams, $location, $modal, $log, roleService) {
        $rootScope.active = 'role';

        $scope.queryKey = $routeParams.queryKey || '';
        window.localStorage.rowSize = window.localStorage.rowSize || 20;//表格默认显示行数
        $scope.pageSize = window.localStorage.rowSize;

        bootbox.setLocale("zh_CN");
        //加载角色数据
        $scope.loadData = function (orderBy) {
            roleService.getPagedData({
                pageIndex: $scope.paging.currentPage,
                pageSize: $scope.pageSize,//显示默认行数
                queryKey: $scope.queryKey,
                orderBy: orderBy == null ? "num" : orderBy
            }, function (data) {
                $scope.data = data.data;
                $scope.paging.totalItems = data.totalCount;//配置分页总记录数

                //初始化复选框
                for (var i in data.data) {
                    var row = data.data[i];
                    if ($scope.roleCheckList[row.id] == "true")
                        row.isCheck = "true";
                    else
                        row.isCheck = "false";

                }
            });
        };
        $scope.paging = {totalItems: 0, currentPage: $routeParams.currentPage || 1, maxSize: 10};//分页配置


        //加载数据
        $scope.loadData();

        //详细页面
        $scope.detail = function (id) {
            var modalInstance = $modal.open({
                templateUrl: 'roledetailtpl',
                controller: roleEditCtrl,
                resolve: {
                    items: function () {
                        return id;
                    }
                }
            });
        };

        //添加角色
        $scope.create = function () {
            var modalInstance = $modal.open({
                templateUrl: 'rolecreatetpl',
                controller: roleCreateCtrl,
                resolve: {
                    items: function () {
                        return null;
                    }
                }
            });

            modalInstance.result.then(function (dialogResult) {
                if (dialogResult == "ok")
                    $scope.loadData();
                $log.info('dialogResult: ' + dialogResult);
                $scope.query();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        //编辑角色
        $scope.edit = function (id) {
            var modalInstance = $modal.open({
                templateUrl: 'roleedittpl',
                controller: roleEditCtrl,
                resolve: {
                    items: function () {
                        return id;
                    }
                }
            });

            modalInstance.result.then(function (dialogResult) {
                if (dialogResult == "ok") {
                    $scope.loadData();
                    //location.reload();
                }
                $log.info('dialogResult: ' + dialogResult);
                $scope.query();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        //初始化复选框列表数组
        $scope.roleCheckList = $scope.roleCheckList == null ? [] : $scope.roleCheckList;

        //复选框点击
        $scope.onChecked = function (id, e) {
            $scope.roleCheckList[id] = e.checked.toString();
        };

        //全选事件
        $scope.checkAll = function (e) {
            for (var i in $scope.data.data) {
                var role = $scope.data.data[i];
                $scope.roleCheckList[role.Id] = e.checked.toString();

                role.isCheck = e.checked.toString();
            }
        };

        //删除角色
        $scope.delete = function (ids) {//ids是要删除的对象的主键的集合形如：1,2,3
            var arr = [];
            for (var i in $scope.roleCheckList) {
                if ($scope.roleCheckList[i] == "true")
                    arr[arr.length] = i;
            }
            if (!ids && arr.length <= 0)
                bootbox.alert("请先选择要删除的记录！");
            else {
                bootbox.confirm("确定要删除数据吗？", function (result) {
                    if (result) {
                        if (!!ids) {
                            roleService.del({ids: ids}, function (data) {
                                if (data[0] == "1")
                                    $scope.loadData();
                                else
                                    bootbox.alert("删除失败，存在用户使用此角色！");
                            }); //单个删除
                        } else {
                            roleService.del({ids: arr.join(",")}, function (data) {
                                if (data[0] == "1")
                                    $scope.loadData();
                                else {
                                    bootbox.alert("删除失败，存在用户使用此角色！");
                                }
                            });
                        }
                    }
                })
            }
        };


        //搜索
        $scope.search = function () {
            //设置当前页为第一页
            $scope.paging.currentPage = 1;
            $scope.query();
            $scope.loadData();
        };

        //排序
        $scope.order = function (condition) {
            $scope.loadData(condition);
        };

        //换页
        $scope.pageChanged = function (page) {
            $scope.paging.currentPage = page;
            $scope.loadData();
            $scope.query();
        };

        //授权
        $scope.grant = function (id) {
            var modalInstance = $modal.open({
                templateUrl: 'rolegranttpl',
                controller: roleGrantCtrl,
                resolve: {
                    items: function () {
                        return id;
                    }
                }
            });

            modalInstance.result.then(function (dialogResult) {
                if (dialogResult == "ok") {
                    $log.info('用户权限修改成功: ' + new Date());
                }
            });
        };

        //日志路由处理
        $scope.query = function () {
            $log.info('query querykey:' + $scope.queryKey + ' currentPage:' + $scope.paging.currentPage);//记录日志
            $location.path('/role' + ($scope.queryKey != '' ? ('/search/' + $scope.queryKey) : ''));//路由配置问题
        };

        $scope.query();
    }]
);

//新增编辑数据校验
var validate = function (role) {
    if (role.num.length > 50 || role.name.length > 50)
        return false;
    if (role.description != null && role.remark != null) {
        if (role.description.length > 100 || role.remark.length > 200)
            return false;
    }
    return true;
};

//角色添加页面的控制器
var roleCreateCtrl = function ($scope, $modalInstance, items, roleService) {
    $scope.role = {name: '', description: '', remark: ''};
    $scope.status = "温馨提示：角色编号不超过50个字符长度， 名称不超过50字符长度，描述不超过100字符长度，备注不超过200字符长度";
    //确定
    $scope.update = function (role) {

        if (validate(role)) {
            roleService.getByNum({num: role.name}, function (data) {
                if (data.id != null) {
                    $scope.status = "此角色编号已被存在，请选择其他角色编号！";
                } else {
                    roleService.add({
                        num: role.num,
                        name: role.name,
                        description: role.description,
                        remark: role.remark
                    }, function () {
                        $modalInstance.close('ok');
                    });
                }
            });
        }
        else
            $scope.status = "数据有误，请确保角色编号长度小于50，名称长度小于50，描述长度小于100，备注长度小于200";
    };
    //取消
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

//角色编辑页面的控制器
var roleEditCtrl = function ($scope, $modalInstance, items, roleService) {
    $scope.role = roleService.getById({id: items});

    //加载权限列表
    roleService.getPermByRoleId({id: items}, function (rl) {
        $scope.checkList = rl;
        $scope.appGroups = getDistictApp();
        var i = 0;
    });

    //app分组去重
    var getDistictApp = function () {
        var arr = [];
        for (var i = 0; i < $scope.checkList.length; i++) {
            var appId = $scope.checkList[i].appId;
            var appName = $scope.checkList[i].appName;
            if (arr.length <= 0) {
                arr.push({appId: appId, appName: appName});
                continue;
            }
            for (var j = 0; j < arr.length; j++) {
                if (arr[j].appId == appId)
                    break;
                if (j == arr.length - 1 && arr[j].appId != appId) {
                    arr.push({appId: appId, appName: appName});
                    break;
                }
            }
        }
        return arr;
    };

    //提示消息
    $scope.status = "温馨提示：角色名称不超过50字符长度，描述不超过100字符长度，备注不超过200字符长度";

    //确定
    $scope.update = function (role) {
        if (validate(role)) {
            roleService.getByNum({num: role.num}, function (data) {
                if (data.id != null && data.id != role.id)
                    $scope.status = "此角色编号已被存在，请选择其他角色编号！";
                else {
                    roleService.update(role, function () {
                        $modalInstance.close('ok');
                    });
                }
            });
        }
        else
            $scope.status = "数据有误，请确保角色编号长度小于50，名称长度小于50，描述长度小于100，备注长度小于200";
    };

    //取消
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

//角色授权页面的控制器
var roleGrantCtrl = function ($scope, $modalInstance, items, roleService, appService, permService) {

    //初始化已有权限复选框
    var initCheckBox = function () {
        if ($scope.checkList.length >= 0) {
            for (var i in $scope.permisssions) {
                $scope.permisssions[i].isChecked = "false";
                for (var j in $scope.checkList) {
                    var ck = $scope.checkList[j];
                    if ($scope.permisssions[i].id == ck.permId)
                        $scope.permisssions[i].isChecked = "true";
                }
            }
        }
    };

    //切换Tab页签
    $scope.tabClick = function (id, name, index, e) {
        if (!!e) e.preventDefault();

        $scope.tabAppId = id;
        $scope.tabAppName = name;

        permService.query({appId: id, page: 1, pageSize: 20}, function (data) {
            $scope.permisssions = data.data;
            $("#appTabContent>div:nth-child(" + index + ")").show().siblings().hide();//调整样式

            //初始化分页参数
            $scope.paging = {totalItems: data.totalCount, currentPage: 1, maxSize: 10};

            initCheckBox();
        });

    };

    //翻页
    $scope.pageChanged = function (page, appId) {
        permService.query({appId: appId, page: page, pageSize: 20}, function (data) {
            $scope.permisssions = data.data;
            initCheckBox();
        });
    };

    //加载应用列表
    $scope.loadData = function () {
        appService.query({page: 1, pageSize: 9999999}, function (data) {
            $scope.apps = data.data;

            //初始化已有权限 获取当前角色的所有权限
            roleService.getPermByRoleId({id: items}, function (rl) {
                $scope.checkList = rl;
                $scope.appGroups = getDistictApp();
                $scope.tabClick($scope.apps[0].id, $scope.apps[0].name, 1);//默认点击第一个页签
            });
        });
    };

    $scope.loadData();

    //app分组去重
    var getDistictApp = function () {
        var arr = [];
        for (var i = 0; i < $scope.checkList.length; i++) {
            var appId = $scope.checkList[i].appId;
            var appName = $scope.checkList[i].appName;
            if (arr.length <= 0) {
                arr.push({appId: appId, appName: appName});
                continue;
            }
            for (var j = 0; j < arr.length; j++) {
                if (arr[j].appId == appId)
                    break;
                if (j == arr.length - 1 && arr[j].appId != appId) {
                    arr.push({appId: appId, appName: appName});
                    break;
                }
            }
        }
        return arr;
    };

    //复选框点击
    $scope.doCheck = function (id, name, appId, appName, e) {
        if (e.checked) {
            if (!contains(id))
                $scope.checkList.push({permId: id, permName: name, appId: appId, appName: appName});
        }
        else {
            contains(id, true);
        }
        $scope.appGroups = getDistictApp();
        console.log($scope.checkList);
        console.log($scope.appGroups);
    };

    //移除权限
    $scope.remove = function (id) {
        contains(id, true);
        initCheckBox();
        $scope.appGroups = getDistictApp();
    };

    //权限Id是否存在, 如果存在是否删除
    var contains = function (id, isRemove) {
        var isContains = false;
        for (var i = 0; i < $scope.checkList.length; i++) {
            if ($scope.checkList[i].permId == id) {
                isContains = true;
                if (isRemove) {
                    $scope.checkList.splice(i, 1);
                }
            }
        }
        return isContains;
    };

    //保存授权
    $scope.grant = function () {
        var pms = [];
        if ($scope.checkList.length > 0) {
            for (var i = 0; i < $scope.checkList.length; i++) {
                var pm = $scope.checkList[i];
                pms.push(pm.permId + "|" + (pm.options == null ? "" : pm.options));
            }
        }
        var rc = {perms: pms.join(","), rid: items};
        roleService.savePermission(rc);

        $modalInstance.close('ok');
    };

    //取消
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};


//************************************************** 角色管理结束 ********************************************************************


/**********************************************************************  权限  *************************************************************/

controllers.controller('permCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$modal', '$log', 'appService', 'permService',
    function ($scope, $rootScope, $routeParams, $location, $modal, $log, appService, permService) {
        $rootScope.active = 'perm';
        bootbox.setLocale("zh_CN");
        $scope.queryKey = $routeParams.queryKey || '';
        window.localStorage.rowSize = window.localStorage.rowSize || 20;//表格默认显示行数
        $scope.pageSize = window.localStorage.rowSize;
        $scope.paging = {totalItems: 0, currentPage: $routeParams.currentPage || 1, maxSize: 10}; //分页配置
        $scope.currentApp = {'id': $routeParams.currentAppId};

        //获取当前App下的权限列表
        $scope.getData = function () {
            permService.query({
                queryKey: $scope.queryKey,
                appId: $scope.currentApp.id,
                page: $scope.paging.currentPage || 1,
                pageSize: $scope.pageSize //显示默认行数
            }, function (data) {
                $scope.paging.totalItems = data.totalCount;//配置分页总记录数
                $scope.data = data.data;
            });
        };

        //获取所有App
        $scope.appData = appService.getAll(function (data) {
            if (data.length > 0) {
                if ($scope.currentApp.id == null) {
                    $scope.currentApp = data[0];
                    $scope.index = 0;

                } else {
                    for (var i = 0; i < data.length; i++) {
                        if ($scope.currentApp.id == data[i].id) {
                            $scope.currentApp = data[i];
                            $scope.index = i;
                        }
                    }
                }
                $scope.getData();
            }
        });

        //tab切换事件
        $scope.tabClick = function (app) {
            $scope.currentApp = app;
            $scope.paging.currentPage = 1;
            $scope.getData();
        };

        //字符串显示截取
        $scope.showString = function (str, length) {
            if (str == null || str == undefined) {
                str = "";
            }
            return str.length > length ? str.substr(0, length) + "……" : str;
        };

        //查看详细信息
        $scope.detail = function (perm) {
            var modalInstance = $modal.open({
                // templateUrl: '/templates/perm/Detail.html',
                // templateUrl: 'permDetail',
                templateUrl: 'permdetailtpl',
                controller: permEditCtrl,
                resolve: {
                    items: function () {
                        return {"perm": perm, "appData": $scope.appData, "app": $scope.currentApp};
                    }
                }
            });
        };
        //添加对话框
        $scope.create = function () {
            var modalInstance = $modal.open({
                // templateUrl: '/templates/perm/create.html',
                templateUrl: 'permcreatetpl',
                controller: permCreateCtrl,
                resolve: {
                    items: function () {
                        return {"appData": $scope.appData, "app": $scope.currentApp};
                    }
                }
            });

            modalInstance.result.then(function (dialogResult) {
                $log.info('dialogResult: ' + dialogResult);
                $scope.getData();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        //编辑对话框
        $scope.edit = function (perm) {
            var modalInstance = $modal.open({
                // templateUrl: '/templates/perm/create.html',
                templateUrl: 'permedittpl',
                controller: permEditCtrl,
                resolve: {
                    items: function () {
                        return {"perm": perm, "appData": $scope.appData, "app": $scope.currentApp};
                    }
                }
            });

            modalInstance.result.then(function (dialogResult, app) {
                $log.info('dialogResult: ' + dialogResult);
                $scope.getData();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        //搜索
        $scope.search = function () {
            //设置当前页为第一页
            $scope.paging.currentPage = 1;
            //更新显示URL
            $scope.query();
            $scope.getData();
        }
        //删除
        $scope.delete = function (id) {
            bootbox.confirm("确认要删除？", function (result) {
                if (result) {
                    permService.deletePrem({idString: id}, function (data) {
                        if (!data.result) {
                            bootbox.alert(data.message);
                        } else {
                            $scope.getData();
                        }
                    });
                }
            })
        };

        $scope.pageChanged = function (page) {
            $scope.paging.currentPage = page;
            $scope.getData();
            //$scope.query();
        };

        $scope.query = function () {
            $log.info('query querykey:' + $scope.queryKey + ' currentPage:' + $scope.paging.currentPage);
            //$location.path('/perm' + ($scope.queryKey != '' ? ('/search/' + $scope.queryKey) : ''));
            var path = '/perm' + ($scope.queryKey != '' ? ('/search/' + $scope.queryKey) : '') + ($scope.currentApp.id != null ? ('/appId/' + $scope.currentApp.id) : '');
            $location.path(path);
        };
        //$scope.query();
    }]
);

//Permission 添加控制器
var permCreateCtrl = function ($scope, $modalInstance, items, permService) {
    $scope.title = "添加权限";
    $scope.Message = "温馨提示：编号、名称、Action、Controller、不超过50个字符长度，URL、描述、备注不超过200字符长度";

    $scope.appData = items.appData;
    $scope.perm = {"appId": items.app.id};
    $scope.add = function (perm) {
        permService.add(perm, function (data) {
            if (!data.result) {
                $scope.Message = data.message;
            } else {
                $modalInstance.close('ok');
            }
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

//Permission编辑对话框
var permEditCtrl = function ($scope, $modalInstance, items, permService) {
    $scope.title = "编辑权限";
    $scope.Message = "温馨提示：编号、名称、Action、Controller、不超过50个字符长度，URL、描述、备注不超过200字符长度";

    $scope.appData = items.appData;
    $scope.perm = jQuery.extend({}, items.perm);
    $scope.perm.appName = items.app.name;
    //更新方法
    $scope.add = function (perm) {
        //
        permService.edit(perm, function (data) {
            if (!data.result) {
                $scope.Message = data.message;
            } else {
                $modalInstance.close('ok', perm);
            }
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};


/**********************************************************************  用户  *************************************************************/

controllers.controller('userCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$modal', '$log', 'userService', 'orgService',
    function ($scope, $rootScope, $routeParams, $location, $modal, $log, userService, orgService) {
        $rootScope.active = 'user';
        bootbox.setLocale("zh_CN");
        $scope.queryIsEnabled = '';
        window.localStorage.rowSize = window.localStorage.rowSize || 20;//表格默认显示行数
        $scope.pageSize = window.localStorage.rowSize || 20;
        $scope.paging = {totalItems: 0, currentPage: $routeParams.currentPage || 1, maxSize: 10};//分页配置
        if ($routeParams.queryKey != '' && $routeParams.queryKey != undefined) {
            if ($routeParams.queryKey.indexOf('&') < 0) {
                $scope.queryKey = $routeParams.queryKey;
                $scope.orgName = '';
            } else {
                $scope.queryKey = $routeParams.queryKey.slice(0, $routeParams.queryKey.indexOf('&'));
                $scope.orgName = $routeParams.queryKey.slice($routeParams.queryKey.indexOf('&') + 1);
            }
        } else {
            $scope.queryKey = '';
            $scope.orgName = '';
        }

        //获取列表数据
        $scope.getData = function () {
            userService.query({
                queryKey: $scope.queryKey,
                orgName: $scope.orgName,
                isEnabled: $scope.queryIsEnabled,
                page: $scope.paging.currentPage || 1,
                pageSize: $scope.pageSize //显示默认行数
            }, function (data) {
                console.log(data);
                $scope.paging.totalItems = data.totalCount;//配置分页总记录数
                $scope.data = data.data;
            });
        };

        //添加对话框
        $scope.create = function () {
            var modalInstance = $modal.open({
                // templateUrl: '/templates/user/create.html',
                templateUrl: 'usercreatetpl',
                controller: userCreateCtrl,
                resolve: {
                    items: function () {
                        return null;
                    }
                }
            });

            modalInstance.result.then(function (dialogResult) {
                $log.info('dialogResult: ' + dialogResult);
                $scope.getData();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        //编辑对话框
        $scope.edit = function (user) {
            var modalInstance = $modal.open({
                // templateUrl: '/templates/user/Edit.html',
                templateUrl: 'useredittpl',
                controller: userEditCtrl,
                resolve: {
                    items: function () {
                        return user;
                    }
                }
            });

            modalInstance.result.then(function (dialogResult, app) {
                $log.info('dialogResult: ' + dialogResult);
                $scope.getData();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
                if (dialogResult == "ok") {
                    $scope.getData();
                    //$log.info('用户权限修改成功: ' + new Date());
                }
            });
        };

        $scope.updatePwd = function (user) {
            var modalInstance = $modal.open({
                // templateUrl: '/templates/user/cpwd.html',
                templateUrl: 'userpwdtpl',
                controller: userPwd,
                resolve: {
                    items: function () {
                        return user;
                    }
                }
            });

            modalInstance.result.then(function (dialogResult, app) {
                $log.info('dialogResult: ' + dialogResult);
                $scope.getData();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        //查看详细信息
        $scope.detail = function (user) {
            var modalInstance = $modal.open({
                // templateUrl: '/templates/user/Detail.html',
                templateUrl: 'userdetailtpl',
                controller: userEditCtrl,
                resolve: {
                    items: function () {
                        return user;
                    }
                }
            });
        }

        //搜索
        $scope.search = function () {
            //设置当前页为第一页
            $scope.paging.currentPage = 1;
            //更新显示URL
            $scope.query();

            $scope.getData();
        }

        //删除
        $scope.delete = function (userId) {
            bootbox.confirm("确认要删除？", function (result) {
                if (result) {
                    userService.deleteUser({id: userId}, function (data) {
                        if (!data.result) {
                            bootbox.alert(data.message);
                        } else {
                            $scope.getData();
                        }
                    });
                }
            })
        }

        $scope.assign = function (userId) {
            var modalInstance = $modal.open({
                // templateUrl: '/templates/user/assign.html',
                templateUrl: 'userassigntpl',
                controller: userAssignCtrl,
                resolve: {
                    items: function () {
                        return userId;
                    }
                }
            });

            modalInstance.result.then(function (dialogResult) {
                if (dialogResult == "ok") {
                    $scope.getData();
                    //$log.info('用户权限修改成功: ' + new Date());
                }
            });
        }

        //更改是否启用
        // $scope.changEnable = function (user) {
        //     user.isEnabled = !user.isEnabled;
        //     userService.set({id: user.id, isEnabled: user.isEnabled}, function (data) {
        //         if (!data.executeResult) {
        //             $scope.wrongMessage = data.message;
        //             user.isEnabled = !user.isEnabled;
        //         }
        //     })
        // }

        //executeResult
        $scope.changEnable = function (user) {
            user.enabled = !user.enabled;
            userService.set({id: user.id, isEnabled: user.enabled}, function (data) {
                if (!data.result) {
                    $scope.wrongMessage = data.message;
                    user.enabled = !user.enabled;
                }
            })
        };

        //页码点击事件
        $scope.pageChanged = function (page) {
            $scope.paging.currentPage = page;
            $scope.getData();
            //$scope.query();
        };

        $scope.query = function () {
            $log.info('query querykey:' + $scope.queryKey + ' currentPage:' + $scope.paging.currentPage);

            var loc = '';
            if ($scope.queryKey == '' && $scope.orgName == '') {
                loc = '';
            } else if ($scope.queryKey == '' && $scope.orgName != '') {
                loc = '/search/&' + $scope.orgName;
            } else if ($scope.queryKey != '' && $scope.orgName != '') {
                loc = '/search/' + $scope.queryKey + '&' + $scope.orgName;
            } else if ($scope.queryKey != '' && $scope.orgName == '') {
                loc = '/search/' + $scope.queryKey;
            }


            //$location.path('/user' + ($scope.queryKey != '' ? ('/search/' + $scope.queryKey + '&' + '') : ''));
            $location.path('/user' + loc);
        };

        $scope.getData();

    }]
);

//User 添加控制器
var userCreateCtrl = function ($scope, $modalInstance, items, userService, orgService) {
    $scope.title = "添加用户";
    $scope.user = {"gender": "-1"};
    orgService.getOrgData({parentId: '', isAll: true, code: 0}, function (data) {
        $scope.orgList = data;
        $scope.user.orgId = data.data[0].id;
    });

    $scope.add = function (user) {
        userService.add(user, function (data) {
            if (!data.result) {
                $scope.wrongMessage = data.message;
            } else {
                $modalInstance.close('ok');
            }
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

var userPwd = function ($scope, $modalInstance, items, userService, orgService) {
    $scope.change = function (user) {

        if (user.newPwd != user.confirm) {
            $scope.wrongMessage = "密码与确认密码不一致";
            return;
        }
        items.Password = user.newPwd;
        userService.edit(items, function (data) {
            if (!data.result) {
                $scope.wrongMessage = data.message;
            } else {
                $modalInstance.close('ok', user);
            }
        });

    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

//User 编辑对话框
var userEditCtrl = function ($scope, $modalInstance, items, userService, orgService) {
    $scope.user = jQuery.extend({}, items);
    orgService.getOrgData({parentId: '', isAll: true, code: 1, userId: $scope.user.id}, function (data) {
        console.log(data);
        $scope.restOrgs = data.result;
    });
    orgService.getOrgData({parentId: '', isAll: true, code: 2, userId: $scope.user.id}, function (data) {
        console.log(data);
        $scope.myOrgs = data.result;

    });
    orgService.getOrgTypeData({id: 0}, function (data) {
        var vm = $scope.vm = {};
        vm.orgTypeData = data.orgType;
        vm.selects = vm.orgTypeData[0];
    });
    //移除所有机构
    $scope.removeAllOrgs = function () {
        $("#selMyOrg option").appendTo($("#selAllOrg"));
        //userService.removeallorgs({ code: 4, UserId: $scope.user.Id }, function (data) {
        //    judgeResult(data);
        //});
    };

    //移除选中的机构
    $scope.removeOrg = function () {
        var orgs = [];
        var sel = $("#selMyOrg :selected");
        if (sel.length <= 0)
            return;
        var list = [];
        sel.each(function () {
            list.push(sel.val());
            orgs.push($(this).val());
            $(this).appendTo($("#selAllOrg"));
        });
        //userService.removeorgs({ code: 3, Orgs: list.join("|"), UserId: $scope.user.Id }, function (data) {
        //    judgeResult(data);
        //});
    };

    //添加所有机构
    $scope.addAllOrgs = function () {
        $("#selAllOrg option").appendTo($("#selMyOrg"));
        //userService.addallorgs({ code: 2, UserId: $scope.user.Id }, function (data) {
        //    judgeResult(data);
        //});
    };

    //添加选中机构
    $scope.addOrg = function () {
        var orgs = [];
        var sel = $("#selAllOrg :selected");
        if (sel.length <= 0)
            return;
        sel.each(function () {
            orgs.push($(this).val());
            $(this).appendTo($("#selMyOrg"));
        });
        //userService.addorgs({ code: 1, Orgs: getMyOrg(), UserId: $scope.user.Id }, function (data) {
        //    judgeResult(data);
        //});
    };

    function getMyOrg() {
        var res = [];
        $("#selMyOrg option").each(function () {
            res.push($(this).val());
        });
        return res.join("|");
    };

    function judgeResult(data) {
        var res = "";
        for (var i in data)
            res += data[i];
        if (res.indexOf("true") < 0) {
            bootbox.alert("机构分配失败");
            return false;
        }
        return true;
    }


    //更新方法
    $scope.add = function (user) {
        userService.edit(user, function (data) {
            if (!data.result) {
                $scope.wrongMessage = data.message;
            } else {
                userService.saveOrgs({code: 5, orgs: getMyOrg(), userId: $scope.user.id}, function (data) {
                    if (judgeResult(data)) $modalInstance.close('ok', user);
                });
            }
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

var userAssignCtrl = function ($scope, $modalInstance, items, userService, roleService, $location) {

    $scope.paging = {totalItems: 0, currentPage: $scope.currentPage || 1, maxSize: 10};

    $scope.checkList = new Array();
    //获取当前角色列表
    $scope.userRoleList = function (callBack) {
        userService.getUserRole({id: items}, function (data) {
            for (var i = 0; i < data.length; i++) {
                var hasId = 0;
                for (var j = 0; j < $scope.checkList.length; j++) {
                    if (data[i].roleId == $scope.checkList[j].roleId) {
                        hasId = 1;
                    }
                }
                if (hasId == 0) {
                    $scope.checkList.push({
                        roleId: data[i].roleId,
                        options: data[i].options,
                        roleName: data[i].roleName
                    });
                }
            }
            callBack();
        });
    };


    //获取角色列表
    $scope.getRoleData = function () {
        roleService.getPagedData({
            pageIndex: $scope.paging.currentPage,
            pageSize: 12,
            queryKey: '',
            orderBy: 'num'
        }, function (data) {
            $scope.paging.totalItems = data.totalCount;
            $scope.roleList = data.data;
            $scope.userRoleList(InitCheckbox);
            //InitCheckbox();       
        });
    };

    //初始化checkbox
    function InitCheckbox() {
        for (var i = 0; i < $scope.roleList.length; i++) {
            for (var j = 0; j < $scope.checkList.length; j++) {
                if ($scope.roleList[i].id == $scope.checkList[j].roleId) {
                    $scope.roleList[i].checked = true;
                    //$scope.checkList[j].Name = $scope.roleList[i].Name
                }
            }
        }

    }


    //checkbox点击事件
    $scope.checked = function (role, e) {
        if (e.target.checked) {
            $scope.checkList.push({roleName: role.name, roleId: role.id});
        } else {
            for (var i = 0; i < $scope.checkList.length; i++) {
                if (role.id == $scope.checkList[i].roleId) {
                    $scope.checkList.splice(i, 1);
                }
            }
        }

    }

    //移除角色
    $scope.remove = function (roleId) {
        //移除权限列表
        for (var i = 0; i < $scope.checkList.length; i++) {
            if ($scope.checkList[i].roleId == roleId) {
                $scope.checkList.splice(i, 1);
            }
        }
        //取消checkbox 选中
        for (var i = 0; i < $scope.roleList.length; i++) {
            if ($scope.roleList[i].id == roleId) {
                $scope.roleList[i].checked = false;
            }
        }
    }

    //页码点击事件
    $scope.pageChanged = function (page) {
        $scope.paging.currentPage = page;
        $scope.getRoleData();
    };

    //确认分配权限
    $scope.assign = function () {
        var role = '', options = '';
        for (var i = 0; i < $scope.checkList.length; i++) {
            if ($scope.checkList[i].options == null)
                $scope.checkList[i].options = "";
            role += $scope.checkList[i].roleId + '|' + $scope.checkList[i].options + ',';
        }
        if (role.length > 0) {
            role = role.substr(0, role.length - 1);
        }

        userService.assign({roles: role, uid: items}, function (data) {
            if (!data.result) {
                $scope.wrongMessage = data.message;
            } else {
                $modalInstance.close('ok');
            }
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.getRoleData();
};


controllers.controller('uumCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$modal', '$log', 'uumService',
    function ($scope, $rootScope, $routeParams, $location, $modal, $log, uumService, userService) {
        $scope.changePwd = function (name) {
            var modalInstance = $modal.open({
                // templateUrl: '/templates/account/cpwd.html',
                templateUrl: 'uumchangetpl',
                controller: uumChangeCtrl,
                resolve: {
                    items: function () {
                        return name;
                    }
                }
            });

            modalInstance.result.then(function (dialogResult) {
                $log.info('dialogResult: ' + dialogResult);
                $scope.getData();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        //显示全局默认行数弹层事件
        $scope.changeRows = function () {
            window.localStorage.rowSize = window.localStorage.rowSize || 20; //表格默认显示行数
            var modalInstance = $modal.open({
                // templateUrl: '/templates/account/cpwd.html',
                templateUrl: 'uumchangerowtpl',
                controller: uumChangeCtrlRows,
                resolve: {
                    items: function () {
                        return null;
                    }
                }
            });

            modalInstance.result.then(function (dialogResult) {
                $log.info('dialogResult: ' + dialogResult);
                $scope.getData();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }]
);

var uumChangeCtrl = function ($scope, $modalInstance, items, uumService, userService) {

    $scope.change = function (uum) {
        var newPwd = $("#newPwd").val();
        var confirm = $("#confirm").val();
        if (newPwd != confirm) {
            $scope.wrongMessage = "新密码跟确认密码不同！";
            return;
        }
        uumService.cpwd({name: items, oldPwd: uum.oldPwd, newPwd: uum.newPwd}, function (data) {
            if (!data.result) {
                $scope.wrongMessage = data.message;
            } else {
                bootbox.alert("密码修改成功，请记住新密码！");
                $modalInstance.close('ok');
            }
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

//显示全局默认行数方法事件
var uumChangeCtrlRows = function ($scope, $modalInstance, items, uumService, userService) {

    $scope.rowSize = window.localStorage.rowSize || 20; //表格默认行数变量
    $scope.changeRows = function () {
        window.localStorage.rowSize = $(".row-size").val(); //获取变量rowSize的值，显示行数
        $modalInstance.dismiss('cancel');
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};


/******************************************************************** USER ********************************************************************/

controllers.controller('loginCtrl', ['$scope', '$rootScope', '$routeParams', '$http', '$modal', 'orgService', '$location', '$log',
    function ($scope, $rootScope, $routeParams, $http, $modal, orgService, $location, $log) {
        $rootScope.active = 'account';

    }]
);

controllers.controller('authCtrl', ['$scope', '$rootScope', '$routeParams', '$http',
    function ($scope, $rootScope, $routeParams, $http) {
        $rootScope.active = 'auth';
    }]
);

controllers.controller('onlineCtrl', ['$scope', '$rootScope', '$routeParams', '$http',
    function ($scope, $rootScope, $routeParams, $http) {
        $rootScope.active = 'online';
    }]
);

controllers.controller('xxCtrl', ['$scope', '$rootScope', '$routeParams', '$http',
    function ($scope, $rootScope, $routeParams, $http) {


    }]
);


//*************************************************************** 在线用户 ******************************************************************

//在线用户控制器
controllers.controller('onlineCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$modal', '$log', 'onlineService',
    function ($scope, $rootScope, $routeParams, $location, $modal, $log, onlineService) {
        $rootScope.active = 'online';
        bootbox.setLocale("zh_CN");
        $scope.queryKey = $routeParams.queryKey || '';
        window.localStorage.rowSize = window.localStorage.rowSize || 20;//表格默认显示行数
        $scope.pageSize = window.localStorage.rowSize || 20;//表格默认显示行数
        $scope.paging = {totalItems: 0, currentPage: $routeParams.currentPage || 1, maxSize: 10};//分页配置
        //加载在线用户数据
        $scope.loadData = function (orderBy) {
            onlineService.getPagedData({
                pageIndex: $scope.paging.currentPage,
                pageSize: $scope.pageSize, //显示默认行数
                queryKey: $scope.queryKey,
                orderBy: orderBy == null ? "loginname" : orderBy
            }, function (data) {
                console.log(data);
                $scope.data = data;
                $scope.paging.totalItems = data.totalCount;//配置分页总记录数
            });
        };

        //加载数据
        $scope.loadData();

        //强制用户下线
        $scope.delete = function (id, appCode) {
            onlineService.del({loginName: id, appCode: appCode}, function () {
                $scope.loadData();
            });
        };

        //搜索
        $scope.search = function () {
            $scope.query();
            $scope.loadData();
        };

        //排序
        $scope.order = function (condition) {
            $scope.loadData(condition);
        };

        //换页
        $scope.pageChanged = function (page) {
            $scope.paging.currentPage = page;
            $scope.loadData();
            $scope.query();
        };

        //日志路由处理
        $scope.query = function () {
            $log.info('query querykey:' + $scope.queryKey + ' currentPage:' + $scope.paging.currentPage);//记录日志
            $location.path('/online' + ($scope.queryKey != '' ? ('/search/' + $scope.queryKey) : ''));//路由配置问题
        };

        $scope.query();
    }]
);

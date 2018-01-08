/**
 * Created by localadmin on 17/4/21.
 */
Ext.define('UumApp.view.user.userlist.UserListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user_userlist',
    requires: [
        'UumApp.view.user.userlist.userdetail.UserDetail',
        'UumApp.view.user.userlist.useradd.UserAdd',
        'UumApp.view.user.userlist.useredit.UserEdit',
        'UumApp.view.user.userlist.usermodify.UserModify',
        'UumApp.view.user.userlist.userrole.UserRole'
    ],
    cellclick:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this,
            view = me.getView(),
            ele = Ext.get(e.getTarget()),
            id = ele.getId(),
            enabled = !record.data.enabled;
        if(cellIndex==1){
            me.showDetail();
        }
        if(ele.hasCls('role')){
            me.role();
        }else if(ele.hasCls('modify')){
            me.modifyPwd();
        }else if(ele.hasCls('edit')){
            me.editUser();
        }else if(ele.hasCls('delete')){
            me.deleteUser(record.getId());
        }else if(ele.hasCls('enabled')){
            me.setActive(record.getId(),enabled);
        }

    },
    showDetail:function (id) {
        var me = this,
            view = me.getView(),
            store = view.getStore(),
            vm = view.getViewModel(),
            record = vm.get('focusApplication');
        var win = new Ext.window.Window({
            ghost:false,
            title: '详细信息',
            resizable: false,
            width: 360,
            layout: 'fit',
            modal: true,
            closeAction: 'close',
            items: [{
                xtype: 'user_userdetail',
                viewModel: {
                    data: {
                        formModel: record
                    }
                }
            }]
        });
        win.show();
    },
    setActive:function (id,enabled) {
        Ext.Ajax.request({
            url: 'user',
            params: {id: id, isEnabled: enabled },
            method: 'GET',
            success: function (response, options) {
                // Ext.MessageBox.alert('成功', '从服务端获取结果: ' + response.responseText);
                Ext.MessageBox.alert('提示','修改成功');
            },
            failure: function (response, options) {
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });
    },
    filter:function () {
        var me = this,
            view = me.getView(),
            store = view.getStore();
        var queryKey = Ext.getCmp("queryKey").getValue();
        var orgName = Ext.getCmp("orgName").getValue();
        var isEnabled = Ext.getCmp("isEnabled").getValue();
        store.getProxy().extraParams = {
            isEnabled: isEnabled,
            orgName: orgName,
            queryKey: queryKey
        };
        store.loadPage(1);
    },
    addUser:function () {
        var me = this,
            store = me.getViewModel().getStore('gridstore'),
            record = Ext.create('UumApp.model.user.userlist.UserAdd', {
                id: '0'
            });

        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '添加用户',
            resizable: false,
            modal: true,
            width: 360,
            layout: 'fit',
            items: {
                xtype: 'user_userlist_useradd',
                viewModel: {
                    data: {
                        addUser: record
                    }
                },
                callback: function () {
                    store.reload();
                }
            }
        }).show();
    },
    deleteUser:function (id) {
        var me = this,
            store = me.getViewModel().getStore('gridstore');
        Ext.MessageBox.confirm('提示', '确认要删除？', function (btn) {
            if(btn == 'yes'){
                Ext.Ajax.request({
                    url: 'user',
                    params: {id: id},
                    method: 'GET',
                    success: function (response, options) {
                        Ext.MessageBox.alert('提示','删除成功');
                        store.reload();
                    },
                    failure: function (response, options) {
                        Ext.MessageBox.alert('提示', '请求超时或网络故障,错误编号：' + response.status);
                    }
                });
            }
        });

    },
    editUser:function () {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('gridstore'),
            record = vm.get('focusApplication');
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '修改用户',
            resizable: false,
            modal: true,
            width: 360,
            layout: 'fit',
            items: {
                xtype: 'user_userlist_useredit',
                // viewModel: {
                //     data: {
                //         editUser: record
                //     }
                // },
                callback: function () {
                    store.reload();
                }
            },
            listeners: {
                beforeclose: function () {
                    store.rejectChanges();
                }
            }
        }).show();
        Ext.getCmp('userEditForm').getForm().loadRecord(record);
    },
    modifyPwd:function () {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('gridstore'),
            record = vm.get('focusApplication');
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '修改密码',
            resizable: false,
            modal: true,
            width: 480,
            layout: 'fit',
            items: {
                xtype: 'user_userlist_usermodify',
                // viewModel: {
                //     data: {
                //         editUser: record
                //     }
                // },
                callback: function () {
                    store.reload();
                }
            },
            listeners: {
                beforeclose: function () {
                    store.rejectChanges();
                }
            }
        }).show();
        Ext.getCmp('userModifyForm').getForm().loadRecord(record);
    },
    role:function () {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('gridstore'),
            record = vm.get('focusApplication');
        var roleListStore = Ext.getCmp('roleListStore').getStore();
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '角色分配',
            resizable: false,
            modal: true,
            width: 780,
            layout: 'fit',
            items: {
                xtype: 'user_userlist_userrole',
                roleId: record.get('id')
            },
            listeners: {
                beforeclose: function () {
                    store.rejectChanges();
                    roleListStore.load();
                }
            }
        }).show();
    }
});

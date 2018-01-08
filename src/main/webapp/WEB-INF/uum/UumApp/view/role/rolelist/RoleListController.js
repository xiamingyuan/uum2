/**
 * Created by localadmin on 17/4/21.
 */
Ext.define('UumApp.view.role.rolelist.RoleListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.role_rolelist',
    requires: [
        'UumApp.view.role.rolelist.rolegrant.RoleGrant',
        'UumApp.view.role.rolelist.roleadd.RoleAdd',
        'UumApp.view.role.rolelist.roleedit.RoleEdit',
        'UumApp.view.role.rolelist.roledetail.RoleDetail'
    ],
    filter:function () {
        var me = this,
            view = me.getView(),
            store = view.getStore();
        var queryKey = Ext.getCmp("queryKey").getValue();
        store.getProxy().extraParams = {
            queryKey: queryKey
        };
        store.loadPage(1);
    },
    cellclick:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this,
            view = me.getView(),
            ele = Ext.get(e.getTarget()),
            id = ele.getId();
        if(cellIndex==1){
            me.showDetail();
        }
        if(ele.hasCls('grant')){
            me.grant(record.getId());
        }else if(ele.hasCls('edit')){
            me.editRole();
        }else if(ele.hasCls('delete')){
            me.deleteRole(record.getId());
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
                xtype: 'role_roledetail',
                viewModel: {
                    data: {
                        formModel: record
                    }
                }
            }]
        });
        win.show();
    },
    //角色授权
    grant:function (id) {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('gridstore');
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '角色授权',
            resizable: false,
            modal: true,
            width: 780,
            layout: 'fit',
            items: {
                xtype: 'role_rolelist_rolegrant',
                roleId: id
            },
            listeners: {
                beforeclose: function () {
                    store.rejectChanges();
                }
            }
        }).show();
    },
    //添加角色
    addRole:function () {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('gridstore');
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '添加角色',
            resizable: false,
            modal: true,
            width: 360,
            layout: 'fit',
            items: {
                xtype: 'role_rolelist_roleadd',
                callback: function () {
                    store.reload();
                }
            }
        }).show();
    },
    editRole:function () {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('gridstore'),
            record = vm.get('focusApplication');
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '修改角色',
            resizable: false,
            modal: true,
            width: 360,
            layout: 'fit',
            items: {
                xtype: 'role_rolelist_roleedit',
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
        Ext.getCmp('roleEditForm').getForm().loadRecord(record);
    },
    deleteRole:function (id) {
        var me = this,
            store = me.getViewModel().getStore('gridstore');
        Ext.MessageBox.confirm('提示', '确认要删除？', function (btn) {
            if(btn == 'yes'){
                Ext.Ajax.request({
                    url: 'roledelete',
                    params: {ids: id},
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
    }
});
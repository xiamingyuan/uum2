/**
 * Created by localadmin on 17/4/21.
 */
Ext.define('UumApp.view.apps.appslist.AppsListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.apps_appslist',
    requires: [
        'UumApp.view.apps.appslist.appslistdetail.AppsListDetail',
        'UumApp.view.apps.appslist.appslistadd.AppsListAdd',
        'UumApp.view.apps.appslist.appslistedit.AppsListEdit'
    ],
    cellclick:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this,
            ele = Ext.get(e.getTarget()),
            id = ele.getId();
        if(cellIndex==2){
            me.showDetail();
        }
        if(ele.hasCls('edit')){
            me.editSoftware();
        }else if(ele.hasCls('delete')){
            me.deleteSoftware(record.getId());
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
                xtype: 'apps_appslistdetail',
                viewModel: {
                    data: {
                        formModel: record
                    }
                }
            }]
        });
        win.show();
    },
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
    addSoftware:function () {
        var me = this,
            store = me.getViewModel().getStore('gridstore'),
            record = Ext.create('UumApp.model.apps.appslist.AppsListAdd', {
                id: '0'
            });

        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '添加应用',
            resizable: false,
            modal: true,
            width: 360,
            layout: 'fit',
            items: {
                xtype: 'apps_appslist_appslistadd',
                viewModel: {
                    data: {
                        addSoftware: record
                    }
                },
                callback: function () {
                    store.reload();
                }
            }
        }).show();
    },
    deleteSoftware:function (id) {
        var me = this,
            store = me.getViewModel().getStore('gridstore');
        Ext.MessageBox.confirm('提示', '确认要删除？', function (btn) {
            if(btn == 'yes'){
                Ext.Ajax.request({
                    url: 'appdelete',
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
    editSoftware:function () {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('gridstore'),
            record = vm.get('focusApplication');
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '编辑应用',
            resizable: false,
            modal: true,
            layout: 'fit',
            items: {
                xtype: 'apps_appslist_appslistedit',
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
        Ext.getCmp('softwareEditForm').getForm().loadRecord(record);
    }
});
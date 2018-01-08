/**
 * Created by localadmin on 17/4/21.
 */
Ext.define('UumApp.view.online.onlinelist.OnlineListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.online_onlinelist',
    requires: [

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
            ele = Ext.get(e.getTarget()),
            appCode = record.data.appCode,
            username = record.data.username;
        if(ele.hasCls('force-offline')){
            me.forceOffline(appCode,username);
        }
    },
    forceOffline:function (appCode,username) {
        var me = this,
            store = me.getViewModel().getStore('gridstore');
        Ext.MessageBox.confirm('提示', '确认要强制下线？', function (btn) {
            if(btn == 'yes'){
                Ext.Ajax.request({
                    url: 'forceoffline',
                    params: {appCode: appCode,username:username},
                    method: 'GET',
                    success: function (response, options) {
                        Ext.MessageBox.alert('提示','强制下线成功');
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
/**
 * Created by localadmin on 17/4/21.
 */
Ext.define('UumApp.store.online.onlinelist.OnlineList', {
    extend: 'Ext.data.Store',
    alias: 'store.uumapp_online_onlinelist',
    model: 'UumApp.model.online.onlinelist.OnlineList',
    requires: [
        'UumApp.model.online.onlinelist.OnlineList'
    ],
    proxy: {
        type: 'ajax',
        url: 'onlineuser',
        method: 'GET',
        extraParams: {
            queryKey:''
        },
        reader: {
            type: 'json',
            rootProperty: 'data',//返回数据字段
            totalProperty : 'totalCount'
        }
    }
});
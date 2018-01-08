/**
 * Created by localadmin on 17/4/21.
 */
Ext.define('UumApp.store.perm.permlist.PermList', {
    extend: 'Ext.data.Store',
    alias: 'store.uumapp_perm_permlist',
    model: 'UumApp.model.perm.permlist.PermList',
    remoteSort: true,//服务端排序必须参数
    requires: [
        'UumApp.model.perm.permlist.PermList'
    ],
    proxy: {
        type: 'ajax',
        url: 'permlist',
        method: 'GET',
        extraParams: {
            queryKey:'',
            appId:''
        },
        reader: {
            type: 'json',
            rootProperty: 'data',//返回数据字段
            totalProperty : 'totalCount'
        }
    }
});
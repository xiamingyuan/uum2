/**
 * Created by localadmin on 17/4/21.
 */
Ext.define('UumApp.store.apps.appslist.AppsList', {
    extend: 'Ext.data.Store',
    alias: 'store.uumapp_apps_appslist',
    model: 'UumApp.model.apps.appslist.AppsList',
    requires: [
        'UumApp.model.apps.appslist.AppsList'
    ],
    proxy: {
        type: 'ajax',
        url: 'app',
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
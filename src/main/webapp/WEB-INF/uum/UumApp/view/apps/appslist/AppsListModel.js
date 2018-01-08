/**
 * Created by localadmin on 17/4/21.
 */
Ext.define('UumApp.view.apps.appslist.AppsListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.apps_appslist',
    requires: [
        'UumApp.view.apps.appslist.AppsListController',
        'UumApp.store.apps.appslist.AppsList'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'uumapp_apps_appslist'
        }
    },
    data: {
        focusApplication: null,
        searchModel:{
            queryKey:''
        }
    }
});
/**
 * Created by localadmin on 17/4/21.
 */
Ext.define('UumApp.view.online.onlinelist.OnlineListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.online_onlinelist',
    requires: [
        'UumApp.view.online.onlinelist.OnlineListController',
        'UumApp.store.online.onlinelist.OnlineList'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'uumapp_online_onlinelist'
        }
    },
    data: {
        focusApplication: null,
        searchModel:{
            queryKey:''
        }
    }
});
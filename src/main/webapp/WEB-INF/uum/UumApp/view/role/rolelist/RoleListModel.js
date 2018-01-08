/**
 * Created by localadmin on 17/4/21.
 */
Ext.define('UumApp.view.role.rolelist.RoleListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.role_rolelist',
    requires: [
        'UumApp.view.role.rolelist.RoleListController',
        'UumApp.store.role.rolelist.RoleList'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'uumapp_role_rolelist'
        }
    },
    data: {
        focusApplication: null,
        searchModel:{
            queryKey:''
        }
    }
});
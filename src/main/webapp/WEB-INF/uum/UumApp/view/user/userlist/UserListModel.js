/**
 * Created by localadmin on 17/4/21.
 */
Ext.define('UumApp.view.user.userlist.UserListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.user_userlist',
    requires: [
        'UumApp.view.user.userlist.UserListController',
        'UumApp.store.user.userlist.UserList'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type:"uumapp_user_userlist"
        }
    },
    data: {
        focusApplication: null,
        searchModel:{
            isEnabled: "",
            orgName: "",
            queryKey: ""
        }
    }
});
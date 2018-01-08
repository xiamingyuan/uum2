/**
 * Created by localadmin on 17/4/21.
 */
Ext.define('UumApp.store.user.userlist.UserList', {
    extend: 'Ext.data.Store',
    alias: 'store.uumapp_user_userlist',
    model: 'UumApp.model.user.userlist.UserList',
    autoLoad: true,
    requires: [
        'UumApp.model.user.userlist.UserList'
    ],
    proxy: {
        type: 'ajax',
        url: 'userlist',
        method: 'GET',
        extraParams: {
            isEnabled: "",
            orgName: "",
            queryKey: ""
        },
        reader: {
            type: 'json',
            rootProperty: 'data',//返回数据字段
            totalProperty : 'totalCount'
        }
    }
});
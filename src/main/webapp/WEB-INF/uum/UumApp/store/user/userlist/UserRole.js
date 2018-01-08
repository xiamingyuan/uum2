/**
 * Created by apple on 2017/3/23.
 */
Ext.define('UumApp.store.user.userlist.UserRole', {
    extend: 'Ext.data.Store',
    alias: 'store.uumapp_user_userrole',
    pageSize:4,
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'role',
        method: 'GET',
        extraParams: {
            orderBy: "num",
            queryKey: ""
        },
        reader: {
            type: 'json',
            rootProperty: 'data',//返回数据字段
            totalProperty : 'totalCount'
        }
    }
});
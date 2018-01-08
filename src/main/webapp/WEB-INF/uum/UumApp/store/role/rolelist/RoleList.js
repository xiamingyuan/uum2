/**
 * Created by localadmin on 17/4/21.
 */
Ext.define('UumApp.store.role.rolelist.RoleList', {
    extend: 'Ext.data.Store',
    alias: 'store.uumapp_role_rolelist',
    model: 'UumApp.model.role.rolelist.RoleList',
    requires: [
        'UumApp.model.role.rolelist.RoleList'
    ],
    proxy: {
        type: 'ajax',
        url: 'getrolelist',
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
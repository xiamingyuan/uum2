/**
 * Created by localadmin on 17/4/21.
 */
Ext.define('UumApp.model.user.userlist.UserList', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'name', type: 'string' },
        { name: 'gender', type: 'int' },
        { name: 'enabled', type: 'bool' },
        { name: 'userOrgInfo', type: 'string' },
        { name: 'userRoleInfo', type: 'string' },
        { name: 'createTime', type: 'date',dateFormat : 'time'}
    ],
    validators: {
    }
});
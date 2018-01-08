/**
 * Created by localadmin on 17/4/21.
 */
Ext.define('UumApp.model.role.rolelist.RoleList', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'num',type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'createTime', type: 'date',dateFormat : 'time'}
    ],
    validators: {
    }
});
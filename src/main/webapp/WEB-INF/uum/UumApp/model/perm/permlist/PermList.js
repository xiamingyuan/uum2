/**
 * Created by localadmin on 17/4/21.
 */
Ext.define('UumApp.model.perm.permlist.PermList', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'code',type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'createTime', type: 'date',dateFormat : 'time'},
    ],
    validators: {
    }
});
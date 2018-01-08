/**
 * Created by localadmin on 17/4/21.
 */
Ext.define('UumApp.model.apps.appslist.AppsList', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'code', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'remark', type: 'string' },
        { name: 'createTime', type: 'date',dateFormat : 'time',align : 'center'}
    ],
    validators: {
    }
});
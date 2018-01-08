/**
 * Created by localadmin on 17/4/21.
 */
Ext.define('UumApp.model.org.orglist.OrgList', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'code', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'typeName', type: 'string'},
        {name: 'orderNum', type: 'string'},
        {name: 'createTime', type: 'date',dateFormat : 'time'}
    ]
});
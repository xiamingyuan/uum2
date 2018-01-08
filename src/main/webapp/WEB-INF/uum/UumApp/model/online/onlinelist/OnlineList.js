/**
 * Created by localadmin on 17/4/21.
 */
Ext.define('UumApp.model.online.onlinelist.OnlineList', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'loginName', type: 'string' },
        { name: 'ipAddress', type: 'string' },
        { name: 'loginTime', type: 'date',dateFormat : 'time'},
        { name: 'onlineTime', type: 'string' },
        { name: 'appName', type: 'string' }
    ],
    validators: {
    }
});
/**
 * Created by localadmin on 17/4/21.
 */
Ext.define('UumApp.store.org.orglist.OrgList', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.uumapp_org_orglist',
    model: 'UumApp.model.org.orglist.OrgList',
    requires: [
        'UumApp.model.org.orglist.OrgList'
    ],
    proxy: {
        type: 'ajax',
        url: 'getorglist',
        method: 'GET',
        extraParams: {
            isAll: false
        }
    }
});
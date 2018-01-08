/**
 * Created by localadmin on 17/4/21.
 */
Ext.define('UumApp.view.org.orglist.OrgListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.org_orglist',
    requires: [
        'UumApp.view.org.orglist.OrgListController',
        'UumApp.store.org.orglist.OrgList'
    ],
    data: {
        formModel:null,
    },
    stores: {
        gridstore: {
            type: 'uumapp_org_orglist'
        }
    },
    formulas: {

    }
});
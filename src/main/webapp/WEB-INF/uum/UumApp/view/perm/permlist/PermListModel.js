/**
 * Created by localadmin on 17/4/21.
 */
Ext.define('UumApp.view.perm.permlist.PermListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.perm_permlist',
    requires: [
        'UumApp.view.perm.permlist.PermListController',
        'UumApp.store.perm.permlist.PermList'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type:"uumapp_perm_permlist"
        }
    },
    data: {
        focusApplication: null,
        searchModel:{
            queryKey:''
        }
    },
    formulas: {
        createTimeF: function (get) {
            var v = new Date(get('detailPermList.createTime'));
            return Ext.Date.format(v, 'Y-m-d');
        }
    }
});
/**
 * Created by localadmin on 17/3/23.
 */
Ext.define('UumApp.view.apps.appslist.appslistdetail.AppsListDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.apps_appslistdetail',

    onCancel: function () {
        this.getView().up('window').close();
    }
});
/**
 * Created by localadmin on 17/4/25.
 */
Ext.define('UumApp.view.role.rolelist.roledetail.RoleDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.role_roledetail',
    onCancel: function () {
        this.getView().up('window').close();
    }
});
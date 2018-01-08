/**
 * Created by apple on 2017/3/22.
 */
Ext.define('UumApp.view.user.userlist.userdetail.UserDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user_userdetail',
    
    onCancel: function () {
        this.getView().up('window').close();
    }
});
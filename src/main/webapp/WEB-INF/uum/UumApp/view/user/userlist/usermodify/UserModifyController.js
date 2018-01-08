/**
 * Created by apple on 2017/3/23.
 */
Ext.define('UumApp.view.user.userlist.usermodify.UserModifyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user_userlist_usermodify',

    onSave: function () {
        var me = this,
            view = me.getView(),
            window = view.up('window'),
            formValues = Ext.getCmp('userModifyForm').getForm().getValues(),
            data = {};
        data.id = formValues.id;
        data.username = formValues.username;
        data.password = formValues.newpassword;
        Ext.Ajax.request({
            url: 'useredit',
            method: 'POST',
            params: data,
            success: function (res) {
                var resText = Ext.util.JSON.decode(res.responseText);
                if (resText.code==200) {
                    Ext.MessageBox.alert('提示', '用户密码修改成功');
                    setTimeout(function(){
                        Ext.MessageBox.hide();
                        view.callback();
                        window.close();
                    }, 500);
                }
            }
        });
    },
    onClose: function () {
        this.getView().up('window').close();
    }
});
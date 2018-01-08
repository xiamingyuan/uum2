/**
 * Created by apple on 2017/3/23.
 */
Ext.define('UumApp.view.user.userlist.useredit.UserEditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user_userlist_useredit',

    onSave: function () {
        var me = this,
            view = me.getView(),
            window = view.up('window'),
            formValues = Ext.getCmp('userEditForm').getForm().getValues();
        formValues.id = formValues.id;
        Ext.Ajax.request({
            url: 'useredit',
            method: 'post',
            params: formValues,
            success: function (res) {
                var resText = Ext.util.JSON.decode(res.responseText);
                if (resText.code==200) {
                    Ext.MessageBox.alert('提示', '用户资料修改成功');
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
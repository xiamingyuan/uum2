/**
 * Created by apple on 2017/3/22.
 */
Ext.define('UumApp.view.user.userlist.useradd.UserAddController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user_userlist_useradd',

    onSave: function () {
        var me = this,
            view = me.getView(),
            window = view.up('window'),
            newUser = me.getViewModel().get('addUser');
        // RSA对密码加密
        // setMaxDigits(130);
        var data = newUser.getData();
        data.gender=Ext.getCmp('gender').getValue();
        // data.Password = encryptedString(new RSAKeyPair(Fm.Server.Config["RsaPubKeyExponent"], "", Fm.Server.Config["RsaPubKeyModulus"]), data.Password);
        Ext.Ajax.request({
            url: 'useradd',
            method: 'POST',
            params: data,
            success: function (res) {
                var resText = Ext.util.JSON.decode(res.responseText);
                if (resText.code==200) {
                    Ext.MessageBox.alert('提示', '添加成功');
                    setTimeout(function(){
                        Ext.MessageBox.hide();
                        view.callback();
                        window.close();
                    }, 1000);
                }
            }
        });
    },
    onClose: function () {
        this.getView().up('window').close();
    }
});
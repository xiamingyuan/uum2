/**
 * Created by apple on 2017/3/22.
 */
Ext.define('UumApp.view.apps.appslist.appslistadd.AppsListAddController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.apps_appslist_appslistadd',

    onSave: function () {
        var me = this,
            view = me.getView(),
            window = view.up('window'),
            newSoftware = me.getViewModel().get('addSoftware');
        // RSA对密码加密
        // setMaxDigits(130);
        var data = newSoftware.getData();
        // data.gender=Ext.getCmp('gender').getValue();
        // data.Password = encryptedString(new RSAKeyPair(Fm.Server.Config["RsaPubKeyExponent"], "", Fm.Server.Config["RsaPubKeyModulus"]), data.Password);
        Ext.Ajax.request({
            url: 'appadd',
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
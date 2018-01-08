/**
 * Created by apple on 2017/3/23.
 */
Ext.define('UumApp.view.apps.appslist.appslistedit.AppsListEditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.apps_appslist_appslistedit',

    onSave: function () {
        var me = this,
            view = me.getView(),
            window = view.up('window'),
            formValues = Ext.getCmp('softwareEditForm').getForm().getValues();
        Ext.Ajax.request({
            url: 'appedit',
            method: 'post',
            params: formValues,
            success: function (res) {
                var resText = Ext.util.JSON.decode(res.responseText);
                if (resText.code==200) {
                    Ext.MessageBox.alert('提示', '应用修改成功');
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
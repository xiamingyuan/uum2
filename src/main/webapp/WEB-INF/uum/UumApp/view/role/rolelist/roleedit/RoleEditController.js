/**
 * Created by localadmin on 17/4/25.
 */
Ext.define('UumApp.view.role.rolelist.roleedit.RoleEditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.role_rolelist_roleedit',
    onSave: function () {
        var me = this,
            view = me.getView(),
            window = view.up('window'),
            formValues = Ext.getCmp('roleEditForm').getForm().getValues();
        formValues.id = formValues.id;
        Ext.Ajax.request({
            url: 'roleedit',
            method: 'POST',
            params: formValues,
            success: function (res) {
                var resText = Ext.decode(res.responseText);
                if (resText.code==200) {
                    Ext.MessageBox.alert('提示', '修改成功');
                    setTimeout(function(){
                        Ext.MessageBox.hide();
                        view.callback();
                        window.close();
                    }, 500);
                }else {
                    Ext.MessageBox.alert('提示', resText.msg);
                }
            }
        });
    },
    onClose: function () {
        this.getView().up('window').close();
    }
});

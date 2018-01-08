/**
 * Created by localadmin on 17/4/25.
 */
Ext.define('UumApp.view.role.rolelist.roleadd.RoleAddController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.role_rolelist_roleadd',
    onSave: function () {
        var me = this,
            view = me.getView(),
            window = view.up('window'),
            form = Ext.getCmp('roleAddForm').getForm().getValues();
        Ext.Ajax.request({
            url: 'roleadd',
            method: 'GET',
            params: form,
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code==200){
                    Ext.MessageBox.alert('提示', '添加成功');
                    setTimeout(function(){
                        Ext.MessageBox.hide();
                        view.callback();
                        window.close();
                    }, 500);
                }else{
                    Ext.MessageBox.alert('提示', data.msg);
                }
            }
        });
    },
    onClose: function () {
        this.getView().up('window').close();
    }
});
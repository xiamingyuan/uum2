/**
 * Created by apple on 2017/3/24.
 */
Ext.define('UumApp.view.user.userlist.userrole.UserRoleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user_userlist_userrole',
    init:function () {
        var me = this,
            view = me.getView(),
            store = view.store;

    },
    onSave: function () {
        var me = this,
            view = me.getView(),
            window = view.up().up('window'),
            selectArr = view.selectArr,
            id = view.up().roleId,
            ids,role='';
        if(selectArr.length>0){
            for (var i = 0; i < selectArr.length; i++) {
                role += selectArr[i] + '|,';
            }
        }else{
            role = '';
        }
        if (role.length > 0) {
            role = role.substr(0, role.length - 1);
        }
        Ext.Ajax.request({
            url: 'usersetrole',
            method: 'GET',
            params: {
                roles:role,
                uid:id
            },
            success: function (res) {
                if(res.status==200){
                    Ext.MessageBox.alert('提示', '用户角色分配成功');
                    setTimeout(function(){
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
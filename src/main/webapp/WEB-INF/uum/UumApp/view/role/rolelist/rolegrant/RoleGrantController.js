/**
 * Created by apple on 2017/4/24.
 */
Ext.define('UumApp.view.role.rolelist.rolegrant.RoleGrantController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.role_rolelist_rolegrant',
    tabsrender:function () {
        var me = this,
            role = Ext.getCmp('appsTabs'),
            RoleGrantDataview = Ext.getCmp('RoleGrantDataview');
        role.removeAll();
        Ext.Ajax.request({
            url: 'app',
            method: 'GET',
            success: function (res,opts) {
                var data = Ext.decode(res.responseText);
                if(res.status==200){
                    var apps = data;
                    RoleGrantDataview.store.getProxy().extraParams.appId = apps[0].id;
                    RoleGrantDataview.store.load();
                    for(var i=0;i<apps.length;i++){
                        role.add({
                            title:apps[i].name,
                            tabid:apps[i].id,
                            listeners:{
                                beforeshow:function () {
                                    var me = this;
                                    RoleGrantDataview.store.getProxy().extraParams.appId = me.tabid;
                                    RoleGrantDataview.store.loadPage(1);
                                }
                            }
                        });
                    }
                    role.setActiveItem(0)
                }
            }
        });
    },
    onSave: function () {
        var me = this,
            view = me.getView(),
            window = view.up().up('window'),
            selectArr = view.selectArr,
            id = view.up().roleId,
            ids,role='';
        var pms = [];
        if(selectArr.length>0){
            for (var i = 0; i < selectArr.length; i++) {
                pms.push(selectArr[i] + '|');
            }
        }
        var rc = {perms: pms.join(","), id: id};

        Ext.Ajax.request({
            url: 'role',
            method: 'POST',
            jsonData: rc,
            success: function (res) {
                if(res.status==200){
                    Ext.MessageBox.alert('提示', '用户角色授权成功');
                    setTimeout(function(){
                        Ext.MessageBox.hide();
                        // store.reload();
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
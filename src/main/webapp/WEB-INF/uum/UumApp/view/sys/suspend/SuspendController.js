/**
 * Created by apple on 2017/3/20.
 */
Ext.define('UumApp.view.sys.suspend.SuspendController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'UumApp.view.sys.changepassword.ChangePassword'
    ],
    alias: 'controller.fmsys_suspend',
    modifyPwd: function () {
        var win = Ext.create('Ext.window.Window', {
            ghost:false,
            id:'changePwdWin',
            autoShow: true,
            draggable : true,//禁止拖动
            resizable : false,//禁止缩放
            title: '修改密码',
            width: 500,
            height: 300,
            layout: 'fit',
            plain:true,
            modal:true,
            items: {
                xtype: 'changepassword'
            }
        });
    }
});
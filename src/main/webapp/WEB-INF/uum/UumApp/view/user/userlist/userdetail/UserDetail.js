/**
 * Created by apple on 2017/3/22.
 */
Ext.define('UumApp.view.user.userlist.userdetail.UserDetail', {
    extend: 'Ext.form.Panel',
    requires: [
        'UumApp.view.user.userlist.userdetail.UserDetailController',
        'UumApp.view.user.userlist.userdetail.UserDetailModel'
    ],
    alias: 'widget.user_userdetail',
    controller: 'user_userdetail',
    viewModel: {
        type: 'user_userdetail'
    },
    defaults: {
        labelAlign: 'right',
        width: 340,
        labelWidth: 60,
        margin: 10,
        anchor:'-20'
    },
    items: [
        {
            xtype: 'displayfield',
            fieldLabel: '用户名',
            bind: '{formModel.username}'
        },
        {
            xtype: 'displayfield',
            fieldLabel: '性别',
            bind: '{formModel.gender}',
            renderer:function (val) {//转换性别
                if(val==-1){
                    return '未知';
                }else if(val==0){
                    return '女';
                }else{
                    return '男';
                }
            }
        },
        {
            xtype: 'displayfield',
            fieldLabel: '启用',
            bind: '{formModel.enabled}',
            renderer:function (val) {//转换性别
                if(val==true){
                    return '启用中';
                }else{
                    return '未启用';
                }
            }
        },
        {
            xtype: 'displayfield',
            fieldLabel: '机构',
            bind: '{formModel.userOrgInfo}'
        },
        {
            xtype: 'displayfield',
            fieldLabel: '手机',
            bind: '{formModel.mobilePhone}'
        },
        {
            xtype: 'displayfield',
            fieldLabel: '固话',
            bind: '{formModel.fixedPhone}'
        },
        {
            xtype: 'displayfield',
            fieldLabel: '邮箱',
            bind: '{formModel.mail}'
        },
        {
            xtype: 'displayfield',
            fieldLabel: '备注',
            bind: '{formModel.remark}'
        }
    ],
    buttons: [
        {
            text: '确定',
            handler: 'onCancel'
        }
    ]
});
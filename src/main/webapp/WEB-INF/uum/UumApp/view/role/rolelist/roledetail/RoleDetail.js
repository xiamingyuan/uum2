/**
 * Created by apple on 2017/3/22.
 */
Ext.define('UumApp.view.role.rolelist.roledetail.RoleDetail', {
    extend: 'Ext.form.Panel',
    requires: [
        'UumApp.view.role.rolelist.roledetail.RoleDetailController',
        'UumApp.view.role.rolelist.roledetail.RoleDetailModel'
    ],
    alias: 'widget.role_roledetail',
    controller: 'role_roledetail',
    viewModel: {
        type: 'role_roledetail'
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
            fieldLabel: '角色编号',
            bind: '{formModel.code}'
        },
        {
            xtype: 'displayfield',
            fieldLabel: '角色名称',
            bind: '{formModel.name}'
        },
        {
            xtype: 'displayfield',
            fieldLabel: '描述',
            bind: '{formModel.description}'
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
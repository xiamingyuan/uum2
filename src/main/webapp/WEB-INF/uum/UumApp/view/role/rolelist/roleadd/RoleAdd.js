/**
 * Created by localadmin on 17/4/25.
 */
Ext.define('UumApp.view.role.rolelist.roleadd.RoleAdd', {
    extend: 'Ext.form.Panel',
    alias: 'widget.role_rolelist_roleadd',
    requires: [
        'UumApp.view.role.rolelist.roleadd.RoleAddController',
        'UumApp.view.role.rolelist.roleadd.RoleAddModel'
    ],
    controller: 'role_rolelist_roleadd',
    viewModel: { type: 'role_rolelist_roleadd' },
    bodyPadding: 10,
    width: 360,
    modelValidation: true,
    id:'roleAddForm',
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 60,
        width:'100%',
        margin:'10 0',
        anchor:'-20'
    },
    items: [
        {
            xtype: 'textfield',
            fieldLabel: '角色编号',
            name:'code',
            // bind: '{addRole.num}'
            allowBlank: false,
            blankText: "角色编号不能为空！"
        },
        {
            xtype: 'textfield',
            fieldLabel: '角色名称',
            name:'name',
            // bind: '{addRole.name}'
            allowBlank: false,
            blankText: "角色名称不能为空！"
        },
        {
            xtype: 'textfield',
            fieldLabel: '描述',
            name:'description',
            // bind: '{addRole.description}'
            maxLength : 100,
            maxLengthText : '描述长度不能超过100个字符'
        },
        {
            xtype: 'textareafield',
            fieldLabel: '备注',
            name:'remark',
            // bind: '{addRole.remark}',
            height: 80,
            maxLength : 200,
            maxLengthText : '备注长度不能超过200个字符'
        }
    ],
    buttons: [
        { text: '取  消', handler: 'onClose' },
        { text: '确  定', formBind: true, handler: 'onSave' }
    ]
});
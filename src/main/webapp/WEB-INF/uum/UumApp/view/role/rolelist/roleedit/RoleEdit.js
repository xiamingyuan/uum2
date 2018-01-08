/**
 * Created by localadmin on 17/4/25.
 */
Ext.define('UumApp.view.role.rolelist.roleedit.RoleEdit', {
    extend: 'Ext.form.Panel',
    alias: 'widget.role_rolelist_roleedit',
    requires: [
        'UumApp.view.role.rolelist.roleedit.RoleEditController',
        'UumApp.view.role.rolelist.roleedit.RoleEditModel'
    ],
    controller: 'role_rolelist_roleedit',
    viewModel: { type: 'role_rolelist_roleedit' },
    bodyPadding: 10,
    width: 360,
    modelValidation: true,
    id:'roleEditForm',
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 60,
        width:'100%',
        margin:'10 0',
        anchor:'-20'
    },
    items: [
        {
            xtype: 'hiddenfield',
            name:'id'
            // bind: '{addRole.id}'
        },
        {
            xtype: 'textfield',
            fieldLabel: '角色编号',
            name:'code',
            // bind: '{addRole.num}'
            msgTarget: 'under',
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
            xtype: 'textareafield',
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
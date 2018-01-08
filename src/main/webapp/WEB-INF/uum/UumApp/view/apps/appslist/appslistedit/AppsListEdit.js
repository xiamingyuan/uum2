/**
 * Created by apple on 2017/3/23.
 */
Ext.define('UumApp.view.apps.appslist.appslistedit.AppsListEdit', {
    extend: 'Ext.form.Panel',
    alias: 'widget.apps_appslist_appslistedit',
    requires: [
        'UumApp.view.apps.appslist.appslistedit.AppsListEditController',
        'UumApp.view.apps.appslist.appslistedit.AppsListEditModel'
    ],
    controller: 'apps_appslist_appslistedit',
    viewModel: { type: 'apps_appslist_appslistedit' },
    id:'softwareEditForm',
    bodyPadding: 10,
    width: 360,
    modelValidation: true,
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
            // bind: '{editUser.id}'
        },
        {
            xtype: 'textfield',
            fieldLabel: '编码',
            name:'code',
            // bind: '{editUser.name}'
            allowBlank: false,
            blankText: "编码不能为空！"
        },
        {
            xtype: 'textfield',
            fieldLabel: '名称',
            name:'name',
            // bind: '{editUser.name}'
            allowBlank: false,
            blankText: "名称不能为空！"
        },
        {
            xtype: 'textfield',
            fieldLabel: '描述',
            name:'description',
            // bind: '{editUser.remark}',
            maxLength : 50,
            maxLengthText : '描述长度不能超过50个字符'
        },
        {
            xtype: 'textareafield',
            fieldLabel: '备注',
            name:'remark',
            // bind: '{editUser.remark}',
            height: 80,
            maxLength : 100,
            maxLengthText : '备注长度不能超过100个字符'
        }
    ],
    buttons: [
        { text: '取  消', handler: 'onClose' },
        { text: '确  定', formBind: true, handler: 'onSave' }
    ]
});
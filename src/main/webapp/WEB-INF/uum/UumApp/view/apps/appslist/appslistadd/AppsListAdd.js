/**
 * Created by apple on 2017/3/22.
 */
Ext.define('UumApp.view.apps.appslist.appslistadd.AppsListAdd', {
    extend: 'Ext.form.Panel',
    alias: 'widget.apps_appslist_appslistadd',
    requires: [
        'UumApp.view.apps.appslist.appslistadd.AppsListAddController',
        'UumApp.view.apps.appslist.appslistadd.AppsListAddModel'
    ],
    controller: 'apps_appslist_appslistadd',
    viewModel: { type: 'apps_appslist_appslistadd' },
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
            xtype: 'textfield',
            fieldLabel: '编号',
            // name:'name'
            bind: '{addSoftware.code}',
            allowBlank: false,
            blankText: "编码不能为空！"
        },
        {
            xtype: 'textfield',
            fieldLabel: '名称',
            // name:'password',
            bind: '{addSoftware.name}',
            allowBlank: false,
            blankText: "名称不能为空！"
        },
        {
            xtype: 'textfield',
            fieldLabel: '描述',
            // name:'remark',
            bind: '{addSoftware.description}',
            maxLength : 50,
            maxLengthText : '描述长度不能超过50个字符'
        },
        {
            xtype: 'textareafield',
            fieldLabel: '备注',
            // name:'remark',
            bind: '{addSoftware.remark}',
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
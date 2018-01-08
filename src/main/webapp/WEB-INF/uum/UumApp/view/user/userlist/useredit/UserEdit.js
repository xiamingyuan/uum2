/**
 * Created by apple on 2017/3/23.
 */
Ext.define('UumApp.view.user.userlist.useredit.UserEdit', {
    extend: 'Ext.form.Panel',
    alias: 'widget.user_userlist_useredit',
    requires: [
        'UumApp.view.user.userlist.useredit.UserEditController',
        'UumApp.view.user.userlist.useredit.UserEditModel'
    ],
    controller: 'user_userlist_useredit',
    viewModel: { type: 'user_userlist_useredit' },
    id:'userEditForm',
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
            fieldLabel: '用户名',
            name:'username',
            allowBlank: false,
            blankText: "用户名不能为空！"
            // bind: '{editUser.name}'
        },
        {
            xtype: 'hiddenfield',
            name:'password',
            inputType:'password',
            allowBlank: false,
            blankText: "密码不能为空！"
            // bind: '{editUser.password}'
        },
        {
            xtype: 'radiogroup',
            id:'gender',
            columns: 5,
            fieldDefaults: {
                margin:0
            },

            fieldLabel: '性别',
            defaults: {
                name: 'gender'
            },
            items: [
                {boxLabel: '男', inputValue:1},
                {boxLabel: '女',  inputValue:0},
                {boxLabel: '未知',  inputValue:-1, checked:true}
            ]
        },
        {
            xtype: 'checkbox',
            id:'enabled',
            columns: 5,
            fieldLabel: '启用',
            name:'enabled'
            // bind: {
            //     value: '{editUser.enabled}'
            // }
            // items: [
            //     { boxLabel: '', inputValue: true,name:'isEnabled',checked: true}
            // ]
        },
        {
            xtype: 'textfield',
            fieldLabel: '手机',
            name:'mobilePhone'
            // bind: '{editUser.telphone}'
        },
        {
            xtype: 'textfield',
            fieldLabel: '固话',
            name:'fixedPhone'
            // bind: '{editUser.phone}'
        },
        {
            xtype: 'textfield',
            fieldLabel: '邮箱',
            name:'mail'
            // bind: '{editUser.mail}'
        },
        {
            xtype: 'textareafield',
            fieldLabel: '备注',
            name:'remark',
            // bind: '{editUser.remark}',
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
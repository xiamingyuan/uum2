/**
 * Created by apple on 2017/3/22.
 */
Ext.define('UumApp.view.user.userlist.useradd.UserAdd', {
    extend: 'Ext.form.Panel',
    alias: 'widget.user_userlist_useradd',
    requires: [
        'UumApp.view.user.userlist.useradd.UserAddController',
        'UumApp.view.user.userlist.useradd.UserAddModel'
    ],
    controller: 'user_userlist_useradd',
    viewModel: { type: 'user_userlist_useradd' },
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
            fieldLabel: '用户名',
            // name:'name'
            bind: '{addUser.username}',
            allowBlank: false,
            blankText: "用户名不能为空！"
        },
        {
            xtype: 'textfield',
            fieldLabel: '密码',
            // name:'password',
            inputType:'password',
            bind: '{addUser.password}',
            allowBlank: false,
            blankText: "密码不能为空！"
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
            bind: {
                value: '{addUser.gender}'
            },
            items: [
                {boxLabel: '男', inputValue:1},
                {boxLabel: '女',  inputValue:0},
                {boxLabel: '未知',  inputValue:-1, checked: true}
            ]
        },
        {
            xtype: 'checkbox',
            id:'enabled',
            columns: 5,
            fieldLabel: '启用',
            bind: {
                value: '{addUser.enabled}'
            }
            // items: [
            //     { boxLabel: '', inputValue: true,name:'isEnabled',checked: true}
            // ]
        },
        {
            xtype: 'textfield',
            fieldLabel: '手机',
            // name:'telphone',
            bind: '{addUser.mobilePhone}'
        },
        {
            xtype: 'textfield',
            fieldLabel: '固话',
            // name:'phone',
            bind: '{addUser.fixedPhone}'
        },
        {
            xtype: 'textfield',
            fieldLabel: '邮箱',
            // name:'mail'
            bind: '{addUser.mail}'
        },
        {
            xtype: 'textareafield',
            fieldLabel: '备注',
            // name:'remark',
            bind: '{addUser.remark}',
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
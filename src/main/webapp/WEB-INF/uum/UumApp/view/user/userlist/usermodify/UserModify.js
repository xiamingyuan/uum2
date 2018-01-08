/**
 * Created by apple on 2017/3/23.
 */
/**
 * Created by apple on 2017/3/23.
 */
Ext.define('UumApp.view.user.userlist.usermodify.UserModify', {
    extend: 'Ext.form.Panel',
    alias: 'widget.user_userlist_usermodify',
    requires: [
        'UumApp.view.user.userlist.usermodify.UserModifyController',
        'UumApp.view.user.userlist.usermodify.UserModifyModel'
    ],
    controller: 'user_userlist_usermodify',
    viewModel: { type: 'user_userlist_usermodify' },
    bodyPadding: '10 10 20',
    id:'userModifyForm',
    width: 400,
    modelValidation: true,
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 80,
        width:'100%',
        anchor:'-20'
    },
    items: [
        {
            xtype: 'hiddenfield',
            name:'id'
            // bind: '{editUser.id}'
        },
        {
            xtype: 'hiddenfield',
            name:'username'
            // bind: '{editUser.id}'
        },
        {
            xtype: 'textfield',
            id:'newPass',
            fieldLabel: '新密码',
            name:'newpassword',
            inputType:'password'
            // bind: '{editUser.password}'
        },
        {
            xtype: 'textfield',
            fieldLabel: '新密码确认',
            // name:'passwordRepeat',
            inputType:'password',
            vtype: 'repetition',
            repetition: { targetCmpId: 'newPass' }
            // bind: '{editUser.password}'
        }
    ],
    buttons: [
        { text: '取  消', handler: 'onClose' },
        { text: '确  定', formBind: true, handler: 'onSave' }
    ]
});
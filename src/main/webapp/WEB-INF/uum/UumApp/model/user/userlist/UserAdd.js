/**
 * Created by apple on 2017/3/22.
 */
Ext.define('UumApp.model.user.userlist.UserAdd', {
        extend: 'Uum.base.Model',
        fields: [
            { name: 'name', type: 'string' },
            { name: 'password', type: 'string' },
            { name: 'gender', type: 'int' },
            { name: 'isEnabled', type: 'bool' },
            { name: 'telphone', type: 'string' },
            { name: 'phone', type: 'string' },
            { name: 'mail', type: 'string' },
            { name: 'remark', type: 'string' }
        ],
        idProperty: 'id',
        validators: {
            name: [
                { type: 'length', min: 2, max: 50 }
            ],
            remark: [
                { type: 'length', min: 0, max: 200, bothMessage: '输入字符超过最大长度({1}个汉字)' }
            ]
        }
    }
);
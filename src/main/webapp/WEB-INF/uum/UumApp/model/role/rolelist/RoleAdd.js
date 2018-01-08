/**
 * Created by apple on 2017/3/22.
 */
Ext.define('UumApp.model.role.rolelist.RoleAdd', {
        extend: 'Uum.base.Model',
        fields: [
            { name: 'num', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'remark', type: 'string' }
        ],
        idProperty: 'id',
        validators: {
            name: [
                { type: 'length', min: 2, max: 50 }
            ],
            description: [
                { type: 'length', min: 0, max: 100, bothMessage: '输入字符超过最大长度({1}个汉字)' }
            ],
            remark: [
                { type: 'length', min: 0, max: 200, bothMessage: '输入字符超过最大长度({1}个汉字)' }
            ]
        }
    }
);
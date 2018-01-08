/**
 * Created by apple on 2017/3/22.
 */
Ext.define('UumApp.model.apps.appslist.AppsListAdd', {
        extend: 'Uum.base.Model',
        fields: [
            { name: 'code', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'description', type: 'string' },
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
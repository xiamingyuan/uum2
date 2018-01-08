/**
 * Created by localadmin on 17/3/23.
 */
Ext.define('UumApp.view.apps.appslist.appslistdetail.AppsListDetail', {
    extend: 'Ext.form.Panel',
    requires: [
        'UumApp.view.apps.appslist.appslistdetail.AppsListDetailController',
        'UumApp.view.apps.appslist.appslistdetail.AppsListDetailModel'
    ],
    alias: 'widget.apps_appslistdetail',
    controller: 'apps_appslistdetail',
    viewModel: {
        type: 'apps_appslistdetail'
    },
    defaults: {
        labelAlign: 'right',
        width: 340,
        labelWidth: 60,
        margin: 10,
        anchor:'-20'
    },
    items: [
        {
            xtype: 'displayfield',
            fieldLabel: '编号',
            bind: '{formModel.code}'
        },
        {
            xtype: 'displayfield',
            fieldLabel: '名称',
            bind: '{formModel.name}'
        },
        {
            xtype: 'displayfield',
            fieldLabel: '时间',
            bind: '{formModel.createTime}',
            renderer:Ext.util.Format.dateRenderer('Y-m-d H:i')
        },
        {
            xtype: 'displayfield',
            fieldLabel: '描述',
            bind: '{formModel.description}'
        },
        {
            xtype: 'displayfield',
            fieldLabel: '备注',
            bind: '{formModel.remark}'
        }
    ],
    buttons: [
        {
            text: '确定',
            handler: 'onCancel'
        }
    ]
});
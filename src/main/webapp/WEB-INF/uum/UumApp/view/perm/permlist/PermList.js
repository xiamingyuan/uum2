/**
 * Created by localadmin on 17/4/21.
 */
Ext.define("UumApp.view.perm.permlist.PermList", {
    extend: "Uum.base.Grid",
    alias: 'widget.permlist',
    requires: [
        'UumApp.view.perm.permlist.PermListController',
        'UumApp.view.perm.permlist.PermListModel'
    ],
    controller: 'perm_permlist',
    viewModel: {
        type:'perm_permlist'
    },
    width : '100%',
    columnLines: true,
    iconCls:'fa fa-home',
    title: '当前位置 : 权限管理',
    multiColumnSort:false,
    startRowGroupsCollapsed: false,
    isPage:true,//是否需要分页,
    border:true,
    id:'permGrid',
    bind: {
        store: '{gridstore}',
        selection: '{focusApplication}'
    },
    tbar: {
        xtype: 'toolbar',
        padding: 5,
        height:38,
        width: '100%',
        defaults: {
            labelAlign: 'right',
            margin: '0 10 0 0'
        },
        items: [
            {
                xtype: 'combo',
                id:"permTypeId",
                name:"permTypeName",
                labelWidth: 55,
                fieldLabel: '权限选项',
                width: 200,
                editable:false,//不可编辑
                store:Ext.create('Ext.data.Store', {
                    fields: ['id', 'name'],
                    autoload:true,
                    proxy: {
                        type: 'ajax',
                        url: 'app',
                        method: 'GET',
                        reader: {
                            type: 'json',
                            rootProperty: 'data'//返回数据字段
                        }
                    }
                }),
                displayField: 'name',
                valueField: 'id',
                listeners: {
                    change: 'filter',
                    afterrender:function (combo) {
                        var task = new Ext.util.DelayedTask(function(){
                            //这里放置要延迟加载的代码段
                            combo.getStore().load(function (s, r, o) {
                                combo.setValue(s[0].get('id'));//第一个值
                            });
                        });
                        task.delay(300);
                    }
                }
            },
            {
                id:"queryKey",
                labelWidth: 70,
                width: 180,
                xtype: 'textfield',
                emptyText:'编码,名称',
                bind: '{searchModel.queryKey}',
                enableKeyEvents:true
            },
            {
                text: '查询',
                id:"userSearch",
                name: 'userSearch',
                listeners:{
                    click: 'filter'
                }
            },
            {
                text: '添加',
                listeners:{
                    click: 'add'
                }
            }
        ]
    },
    columns : [
        { text: '序号', xtype: 'rownumberer', align: 'center', width: 40,height:30 },//创建序号
        { text: '编码',flex:1,minWidth:'100', dataIndex: 'code'},
        { text: '权限名称',flex:1,minWidth:'100', dataIndex: 'name' },
        { text: '日期',width: 140,align:'center', dataIndex: 'createTime',renderer:Ext.util.Format.dateRenderer('Y-m-d') },
        { text: '操作',sortable: false, width: 100, renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
            return "<a href='javascript:void(0);' class='edit fa fa-edit'>编辑</a> " +
                "&nbsp|&nbsp"+
                "<a  href='javascript:void(0);' class='delete fa fa-trash-o fa-fw'>删除</a>"
        }}

    ],
    listeners: {
        cellclick: 'cellclick'
    }
});
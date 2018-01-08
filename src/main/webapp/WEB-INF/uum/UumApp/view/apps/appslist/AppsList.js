/**
 * Created by localadmin on 17/4/21.
 */
Ext.define("UumApp.view.apps.appslist.AppsList", {
    extend: "Uum.base.Grid",
    alias: 'widget.appslist',
    requires: [
        'UumApp.view.apps.appslist.AppsListController',
        'UumApp.view.apps.appslist.AppsListModel'
    ],
    controller: 'apps_appslist',
    viewModel: {
        type:'apps_appslist'
    },
    width : '100%',
    columnLines: true,
    iconCls:'fa fa-home',
    title: '当前位置 : 应用管理',
    multiColumnSort:false, //单个排序功能
    isPage:true,//是否需要分页,
    border:true,
    bind: {
        store: '{gridstore}',
        selection: '{focusApplication}'
    },
    tbar: {
        xtype: 'toolbar',
        padding: 5,
        width: '100%',
        defaults: {
            labelAlign: 'right',
            margin: '0 10 0 0'
        },
        items: [{
            id:"queryKey",
            labelWidth: 0,
            width: 250,
            xtype: 'textfield',
            emptyText:'编号,名称,描述,备注',
            enableKeyEvents:true,
            bind: '{searchModel.queryKey}'
        },{
            text: '搜索',
            id:"userSearch",
            name: 'userSearch',
            listeners:{
                click: 'filter'
            }
        },{
            xtype: 'button',
            text: '添加',
            width:60,
            id:"addSoftware",
            name: 'addSoftware',
            listeners: {
                click: 'addSoftware'
            }
        }]
    },
    columns : [
        { text: '序号', xtype: 'rownumberer', align: 'center', width: 40},//创建序号
        { text: '编号',width: 140, dataIndex: 'code' },
        { text: '应用名称', width: 200,dataIndex: 'name',renderer:function (val) {
            return "<a href='javascript:void(0);' class='detail'>"+val+"</a> "
        } },
        { text: '描述', flex: 1,minWidth:'100',dataIndex: 'description' },
        { text: '备注', width: 140, dataIndex: 'remark' },
        { text: '日期', width: 140,dataIndex: 'createTime',align:'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i')},
        { text: '操作',sortable: false, width: 90,align:'center', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
            return "<a  href='javascript:void(0);' class='edit fa fa-edit'>编辑</a>" +
                "&nbsp|&nbsp"+
                "<a  href='javascript:void(0);' class='delete fa fa-trash-o'>删除</a>"
        }}
    ],
    listeners: {
        cellclick: 'cellclick'
    }
});
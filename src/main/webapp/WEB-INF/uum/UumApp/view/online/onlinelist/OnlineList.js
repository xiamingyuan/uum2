/**
 * Created by localadmin on 17/4/21.
 */
Ext.define("UumApp.view.online.onlinelist.OnlineList", {
    extend: "Uum.base.Grid",
    alias: 'widget.onlinelist',
    requires: [
        'UumApp.view.online.onlinelist.OnlineListController',
        'UumApp.view.online.onlinelist.OnlineListModel'
    ],
    controller: 'online_onlinelist',
    viewModel: {
        type:'online_onlinelist'
    },
    width : '100%',
    columnLines: true,
    iconCls:'fa fa-home',
    title: '当前位置 : 在线用户',
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
            labelWidth: 40,
            width: 180,
            xtype: 'textfield',
            fieldLabel: '用户名',
            enableKeyEvents:true,
            bind: '{searchModel.queryKey}'
        },{
            text: '搜索',
            id:"userSearch",
            name: 'userSearch',
            listeners:{
                click: 'filter'
            }
        }]
    },
    columns : [
        { text: '序号', xtype: 'rownumberer', align: 'center', width: 50 },//创建序号
        { text: '用户名',width: 120, align: 'center', dataIndex: 'username'},
        { text: '登录IP', width: 160, align: 'center',dataIndex: 'ipAddress' },
        { text: '登录时间', width: 180, align: 'center',dataIndex: 'loginTime',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i')},
        { text: '在线时间', flex: 1,minWidth:'100', align: 'center',dataIndex: 'onlineTime' },
        { text: '应用名称', flex: 1, minWidth:'100',align: 'center',dataIndex: 'appName' },
        { text: '操作',sortable: false, width:80,align:'center', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
            return "<a href='javascript:void(0);' class='force-offline fa fa-share-square-o'>强制下线</a> "
        }}
    ],
    listeners: {
        cellclick: 'cellclick'
    }
});
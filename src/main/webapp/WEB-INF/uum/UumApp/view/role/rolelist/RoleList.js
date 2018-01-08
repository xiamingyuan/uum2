/**
 * Created by localadmin on 17/4/21.
 */
Ext.define("UumApp.view.role.rolelist.RoleList", {
    extend: "Uum.base.Grid",
    alias: 'widget.rolelist',
    requires: [
        'UumApp.view.role.rolelist.RoleListController',
        'UumApp.view.role.rolelist.RoleListModel'
    ],
    controller: 'role_rolelist',
    viewModel: {
        type:'role_rolelist'
    },
    width : '100%',
    columnLines: true,
    iconCls:'fa fa-home',
    title: '当前位置 : 角色管理',
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
            labelWidth: 90,
            width: 240,
            xtype: 'textfield',
            emptyText:'角色名称，描述',
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
            id:"addRoleId",
            name: 'addRoleName',
            listeners: {
                click: 'addRole'
            }
        }]
    },
    columns : [
        { text: '序号', xtype: 'rownumberer', align: 'center', width: 50 },//创建序号
        { text: '角色编号',width: 200, dataIndex: 'code'},
        { text: '角色名称', width: 200,dataIndex: 'name' },
        { text: '描述', flex: 1,minWidth:'100', align: 'center',dataIndex: 'description' },
        { text: '日期', width: 140, align: 'center',dataIndex: 'createTime',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i')},
        { text: '操作',sortable: false, width: 150,align:'center', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
            return "<a href='javascript:void(0);' class='grant fa fa-user-circle-o'>授权</a> " +
                "&nbsp|&nbsp"+
                "<a  href='javascript:void(0);' class='edit fa fa-edit'>编辑</a>" +
                "&nbsp|&nbsp"+
                "<a  href='javascript:void(0);' class='delete fa fa-trash-o'>删除</a>"
        }}
    ],
    listeners: {
        cellclick: 'cellclick'
    }
});
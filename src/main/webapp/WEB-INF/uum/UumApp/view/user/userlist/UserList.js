/**
 * Created by localadmin on 17/4/21.
 */
Ext.define("UumApp.view.user.userlist.UserList", {
    extend: "Uum.base.Grid",
    alias: 'widget.userlist',
    requires: [
        'UumApp.view.user.userlist.UserListController',
        'UumApp.view.user.userlist.UserListModel'
    ],
    controller: 'user_userlist',
    viewModel: {
        type:'user_userlist'
    },
    width : '100%',
    columnLines: true,
    iconCls:'fa fa-home',
    title: '当前位置 : 用户管理',
    multiColumnSort:false, //单个排序功能
    isPage:true,//是否需要分页,
    border:true,
    bind: {
        store: '{gridstore}',
        selection: '{focusApplication}'
    },
    id:'roleListStore',
    tbar: {
        xtype: 'toolbar',
        padding: 5,
        height:34,
        width: '100%',
        defaults: {
            labelAlign: 'right',
            margin: '0 10 0 0'
        },
        items: [{
            id:"queryKey",
            name:'queryKey',
            labelWidth: 40,
            width: 140,
            xtype: 'textfield',
            fieldLabel: '用户名',
            bind: '{searchModel.queryKey}',
            enableKeyEvents:true
        },{
            id:"orgName",
            name:'orgName',
            labelWidth: 40,
            width: 140,
            xtype: 'textfield',
            fieldLabel: '机构名',
            bind: '{searchModel.orgName}',
            enableKeyEvents:true
        },{
            xtype: 'combo',
            id:"isEnabled",
            name:"isEnabled",
            labelWidth: 30,
            fieldLabel: '状态',
            width: 130,
            editable:false,//不可编辑
            store:Ext.create('Ext.data.Store', {
                fields: ['value', 'name'],
                data : [
                    {"value":"", "name":"全部"},
                    {"value":"1", "name":"启用"},
                    {"value":"0", "name":"禁用"}
                ]
            }),
            displayField: 'name',
            valueField: 'value',
            listeners: {
                afterRender: function(combo) {
                    combo.setValue('');//同时下拉框会将与name为firstValue值对应的 text显示
                }
            },
            bind: '{searchModel.isEnabled}'
        },{
            text: '查询',
            id:"onlineSearch",
            name: 'onlineSearch',
            listeners:{
                click: 'filter'
            }
        }, {
            text: '添加',
            listeners:{
                click: 'addUser'
            }
        }]
    },
    columns : [
        { text: '序号', xtype: 'rownumberer', align: 'center', width: 50 },//创建序号
        { text: '用户名',width: 100, dataIndex: 'username',renderer:function (val) {
            return "<a href='javascript:void(0);' class='detail'>"+val+"</a> "
        } },
        { text: '性别', width: 100,dataIndex: 'gender',align:'center',renderer:function (val) {//转换性别
            if(val==-1){
                return '未知';
            }else if(val==0){
                return '女';
            }else{
                return '男';
            }
        } },
        { text: '启用', sortable: false,width: 50,dataIndex: 'enabled',align:'center',renderer: function (val) {
            if(val)
                return '<input class="enabled" type="checkbox" checked/>';
            else
                return '<input class="enabled" type="checkbox"/>';
        }},
        { text: '机构名称', width: 200,dataIndex: 'userOrgInfo' },
        { text: '角色', flex: 1,minWidth:'100',dataIndex: 'userRoleInfo' },
        { text: '注册时间', width: 200,dataIndex: 'createTime',align:'center', renderer:Ext.util.Format.dateRenderer('Y-m-d H:i')},
        { text: '操作',sortable: false, width: 250,align:'center', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
            return "<a href='javascript:void(0);' class='role fa fa-user-circle-o'>分配角色</a> " +
                "&nbsp|&nbsp"+
                "<a  href='javascript:void(0);' class='modify fa fa-wrench'>修改密码</a>" +
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
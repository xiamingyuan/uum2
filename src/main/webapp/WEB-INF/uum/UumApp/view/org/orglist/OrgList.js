/**
 * Created by localadmin on 17/4/21.
 */
Ext.define("UumApp.view.org.orglist.OrgList", {
    extend: "Ext.tree.Panel",
    alias: 'widget.orglist',
    requires: [
        'UumApp.view.org.orglist.OrgListController',
        'UumApp.view.org.orglist.OrgListModel'
    ],
    controller: 'org_orglist',
    viewModel: {
        type:'org_orglist'
    },
    width : '100%',
    iconCls:"fa fa-home",
    title: '当前位置 : 机构管理',
    rootVisible: false,
    singleExpand: true,
    border:true,
    bind:{
        store:'{gridstore}',
        selection: '{focusApplication}'
    },
    defaults:{
        flex:1
    },
    tbar: {
        xtype: 'toolbar',
        padding: 5,
        height:34,
        width: '100%',
        defaults: {
            labelAlign: 'right',
            height:24,
            margin: '0 10 0 0'
        },
        items: [{
            xtype: 'label',
            text: '机构列表',
            style:'line-height:24px;color: #6b747e;font-size: 12px;font-weight: 400;',
            margin:'0 0 0 5',
        },'->', {
            text: '添加根机构',
            listeners:{
                click:'addRoot'
            }
        }, {
            text: '添加子机构',
            listeners:{
                click:'addChild'
            }
        }]
    },
    columns: [
        {xtype: 'treecolumn', text: '机构编号', dataIndex: 'code', flex: 2, sortable: false},
        { text: '机构名称', dataIndex: 'name', flex: 1,align: 'center', sortable: false},
        { text: '机构类型', dataIndex: 'orgTypeName', flex: 1,align: 'center', sortable: false},
        { text: '排序顺序', dataIndex: 'orderNum', width:80, align: 'center', sortable: false},
        { text: '创建时间', dataIndex: 'createTime', width:120, align: 'center', sortable: false,renderer:Ext.util.Format.dateRenderer('Y-m-d H:i')},
        { text: '操作',sortable: false, width: 90,align:'center', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
            return "<a href='javascript:void(0);' class='edit fa fa-edit'>编辑</a> " +
                "&nbsp|&nbsp"+
                "<a  href='javascript:void(0);' class='delete fa fa-trash-o'>删除</a>"
        }}
    ],
    bbar: {
        xtype: 'toolbar',
        padding: 5,
        height:34,
        width: '100%',
        items: [{
            xtype: 'displayfield',
            bind:{
                value: '共：{count} 个机构'
            }
        }]
    },
    listeners:{
        'afterrender':'render',
        'cellclick':'cellclick'
    }
});
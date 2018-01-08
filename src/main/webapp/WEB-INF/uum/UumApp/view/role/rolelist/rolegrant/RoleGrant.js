/**
 * Created by apple on 2017/4/24.
 */
Ext.define('apps-tabs', {
    extend: 'Ext.tab.Panel',
    id:'appsTabs',
    xtype: 'apps-tabs',
    requires: [
        'UumApp.view.role.rolelist.rolegrant.RoleGrantController'
    ],
    controller: 'role_rolelist_rolegrant',
    items:[
        {
            title:'default'//默认需要添加一个才能正确渲染tab.Panel 渲染完成之后删除默认的
        }
    ],
    listeners:{
        afterrender:'tabsrender'
    }
});

Ext.define('RoleGrant-dataview', {
    extend: 'Ext.panel.Panel',
    xtype: 'RoleGrant-dataview',
    id:'RoleGrantDataview',
    loadMask:false,
    requires: [
        'UumApp.view.role.rolelist.rolegrant.RoleGrantController'
    ],
    controller: 'role_rolelist_rolegrant',
    initComponent: function() {
        var role = this,
            roleId = role.up().roleId;//获取角色ID
        role.arr = [];
        role.selectArr = [];
        role.selectNameArr = [];

        Ext.Ajax.request({
            url: 'role',
            method: 'GET',
            params: {
                id:roleId,
                mark:true
            },
            success: function (res,opts) {
                var data = Ext.decode(res.responseText);
                if(res.status==200){
                    if(res.responseText.length>4){
                        var roleContainer = Ext.getCmp('roleContainer'),
                            items = {};

                        role.arr = data;
                        for(var i = 0;i<role.arr.length;i++){
                            role.selectArr.push(role.arr[i].permId);
                            role.selectNameArr.push({
                                roleName:role.arr[i].permName,
                                roleId:role.arr[i].permId
                            });
                        }
                        roleContainer.store.loadData(role.selectNameArr);
                        // for(var j=0;j<role.selectNameArr.length;j++){
                        //     roleContainer.add({
                        //         html:role.selectNameArr[j].roleName,
                        //         viewCls:role.selectNameArr[j].roleId
                        //     })
                        // }
                    }
                }
            }
        });

        this.store = Ext.create('Ext.data.Store', {
            pageSize:20,
            autoLoad: true,
            fields: ['name', 'id'],
            proxy: {
                type: 'ajax',
                method: 'GET',
                extraParams: {
                    appId: "",
                    queryKey: ""
                },
                url : 'permlist',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty : 'totalCount'
                }
            },
            listeners:{
                endupdate:function () {
                    var me = this;
                    data = this.getData().items;
                    for(var i=0;i<data.length;i++){
                        for(var j=0;j<role.selectArr.length;j++){
                            if(data[i].id==role.selectArr[j]){
                                Ext.getElementById(data[i].id).setAttribute('checked',true)
                            }
                        }
                    }
                }
            }
        });
        this.items = [
            {
                xtype: 'dataview',
                height:160,
                tpl: [
                    '<tpl for=".">',
                    '<span class="thumb-wrap" style="display: inline-block;width: 22%;margin: 5px;overflow: hidden;height: 20px;"> ',
                    '<input type="checkbox" id="{id}">',
                    '<label title="{name}">{name}</label>',
                    '</span> ',
                    '</tpl>'
                ],
                itemSelector: 'span.thumb-wrap',
                store: role.store,
                listeners:{
                    itemclick:function (ele , records , eOpts) {
                        var me = this,
                            num = 0;
                        var roleContainer = Ext.getCmp('roleContainer'),
                            items = roleContainer.getStore().getData().items;
                        if(Ext.getDom(records.id.toString()).checked){
                            if(role.selectArr.length>0){
                                for(var i=0;i<role.selectArr.length;i++){
                                    if(role.selectArr[i]!=records.id){
                                        num++
                                    }
                                }
                                if(num==role.selectArr.length){
                                    role.selectArr.push(records.id);
                                    roleContainer.store.add({
                                        roleName:records.getData().name,
                                        roleId:records.getData().id
                                    });
                                    // Ext.getCmp('roleContainer').add({
                                    //     html:records.getData().name,
                                    //     viewCls:records.getData().id
                                    // });
                                }
                            }else{
                                role.selectArr.push(records.id);
                                roleContainer.store.add({
                                    roleName:records.getData().name,
                                    roleId:records.getData().id
                                });
                                // Ext.getCmp('roleContainer').add({
                                //     html:records.getData().name,
                                //     viewCls:records.getData().id
                                // });
                            }
                        }else{
                            for(var i=0;i<role.selectArr.length;i++){
                                if(role.selectArr[i]==records.id){
                                    role.selectArr.splice(i,1);
                                }
                            }
                            for(var j=0;j<items.length;j++){
                                if(items[j].getData().roleId==records.getData().id){
                                    roleContainer.store.remove(items[j]);
                                    // Ext.getCmp('roleContainer').remove(items[j]);
                                }
                            }
                        }
                    }
                }
            },
            {
                xtype: 'panel',
                layout: {
                    type: 'column'
                },
                items: [
                    {
                        xtype: 'pagingtoolbar',
                        store: role.store,
                        displayInfo: true,
                        displayMsg: '共{2}个用户',
                        emptyMsg: "暂无数据!",
                        columnWidth: 0.8
                    },
                    {
                        xtype: 'button',
                        text: '取消',
                        columnWidth: 0.1,
                        margin:"2 5",
                        height:30,
                        handler: 'onClose'
                    },
                    {
                        xtype: 'button',
                        text: '保存',
                        columnWidth: 0.1,
                        margin:"2 5",
                        height:30,
                        handler: 'onSave'
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});

Ext.define('UumApp.view.role.rolelist.rolegrant.RoleGrant', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.role_rolelist_rolegrant',
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    minHeight: 350,
    items: [
        {
            xtype: 'apps-tabs',
            height:32
        },
        {
            xtype: 'RoleGrant-dataview',
            height:200
        },
        {
            xtype: 'dataview',
            height:300,
            scrollable: 'y',
            id:'roleContainer',
            tpl: [
                '<tpl for=".">',
                '<span class="role-wrap" style="display: inline-block;width: 22%;margin: 5px;overflow: hidden;height: 20px;"> ',
                '<div>{roleName}</div>',
                '</span> ',
                '</tpl>'
            ],
            itemSelector: 'span.role-wrap',
            store: {
                fields: ['roleName'],
                data: []
            }
        }
        // {
        //     xtype: 'panel',
        //     flex: 1,
        //     height:300,
        //     scrollable: 'y',
        //     id:'roleContainer',
        //     layout: {
        //         type: 'table',
        //         columns: 4,
        //         tableAttrs: {
        //             style: {
        //                 width: '100%'
        //             }
        //         }
        //     },
        //     defaults: {
        //         bodyPadding: '10 15'
        //     },
        //     items: [
        //     ]
        // }
    ]
});
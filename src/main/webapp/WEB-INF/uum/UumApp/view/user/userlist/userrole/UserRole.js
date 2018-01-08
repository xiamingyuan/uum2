/**
 * Created by apple on 2017/3/23.
 */
Ext.define('UserRole-dataview', {
    extend: 'Ext.panel.Panel',
    xtype: 'UserRole-dataview',
    requires: [
        'UumApp.view.user.userlist.userrole.UserRoleController'
    ],
    controller: 'user_userlist_userrole',
    initComponent: function() {
        var role = this,
            roleId = role.up().roleId;//获取角色ID
        role.arr = [];
        role.selectArr = [];
        role.selectNameArr = [];
        Ext.Ajax.request({
            url: 'userrole',
            method: 'GET',
            params: {id:roleId},
            success: function (res,opts) {
                if(res.status==200){
                    if(res.responseText.length>4){
                        var roleContainer = Ext.getCmp('roleContainer'),
                            items = {};

                        role.arr = res.responseText.substring(1,res.responseText.length-2).split("},");

                        for(var i = 0;i<role.arr.length;i++){
                            role.selectArr.push(JSON.parse(role.arr[i]+='}').roleId);
                            role.selectNameArr.push({
                                roleName:JSON.parse(role.arr[i]).roleName,
                                roleId:JSON.parse(role.arr[i]).roleId
                            });
                        }
                        for(var j=0;j<role.selectNameArr.length;j++){
                            roleContainer.add({
                                html:role.selectNameArr[j].roleName,
                                viewCls:role.selectNameArr[j].roleId
                            })
                        }
                    }
                }
            }
        });

        this.store = Ext.create('Ext.data.Store', {
            pageSize:12,
            autoLoad: true,
            fields: ['name', 'id'],
            proxy: {
                type: 'ajax',
                method: 'GET',
                extraParams: {
                    orderBy: "code",
                    queryKey: ""
                },
                url : 'getrolelist',
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
                },
                datachanged:function (ele , eOpts) {
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
                    '<input type="checkbox" id="{id}" class="checkboxClick">',
                    '<label title="{name}" class="ng-binding">{name}</label>',
                    '</span> ',
                    '</tpl>'
                ],
                itemSelector: 'input.checkboxClick',
                store: role.store,
                listeners:{
                    itemclick:function (ele , records , eOpts) {
                        var me = this,
                            num = 0;
                        var roleContainer = Ext.getCmp('roleContainer'),
                            items = Ext.getCmp('roleContainer').items.items;
                        if(Ext.getDom(records.id.toString()).checked){
                            Ext.getCmp('roleContainer').add({
                                html:records.getData().name,
                                viewCls:records.getData().id
                            });
                            if(role.selectArr.length>0){
                                for(var i=0;i<role.selectArr.length;i++){
                                    if(role.selectArr[i]!=records.id){
                                        num++
                                    }
                                }
                                if(num==role.selectArr.length){
                                    role.selectArr.push(records.id);
                                }
                            }else{
                                role.selectArr.push(records.id);
                            }
                        }else{
                            for(var i=0;i<role.selectArr.length;i++){
                                if(role.selectArr[i]==records.id){
                                    role.selectArr.splice(i,1);
                                }
                            }
                            for(var j=0;j<items.length;j++){
                                if(items[j].viewCls==records.getData().id){
                                    Ext.getCmp('roleContainer').remove(items[j]);
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

Ext.define('UumApp.view.user.userlist.userrole.UserRole', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.user_userlist_userrole',
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    minHeight: 350,
    items: [
        {
            xtype: 'UserRole-dataview',
            height:200
        },
        {
            xtype: 'panel',
            flex: 1,
            id:'roleContainer',
            layout: {
                type: 'table',
                columns: 4,
                tableAttrs: {
                    style: {
                        width: '100%'
                    }
                }
            },
            defaults: {
                bodyPadding: '10 15'
            },
            items: [
            ]
        }
    ]
});
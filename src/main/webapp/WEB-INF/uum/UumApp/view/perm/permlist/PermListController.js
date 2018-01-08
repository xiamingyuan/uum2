/**
 * Created by localadmin on 17/4/21.
 */
Ext.define('UumApp.view.perm.permlist.PermListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.perm_permlist',
    requires: [

    ],
    cellclick:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this,
            view = me.getView(),
            ele = Ext.get(e.getTarget()),
            id = ele.getId();
        if(cellIndex==1){
            me.showDetail();
        }
        if(ele.hasCls('edit')){
            me.edit(record.getId());
        }else if(ele.hasCls('delete')){
            me.delete(record.getId());
        }
    },
    filter:function () {
        var me = this,
            view = me.getView(),
            store = view.getStore();
        var queryKey = Ext.getCmp("queryKey").getValue();
        var id = Ext.getCmp("permTypeId").getValue();//获取ID
        var name = Ext.getCmp("permTypeId").getRawValue();//获取name
        store.getProxy().extraParams = {
            queryKey: queryKey,
            appId:id
        };
        store.loadPage(1);
    },
    add:function () {
        var me = this,
            view = me.getView(),
            store = view.getStore(),
            vm = me.getViewModel();

        var permId = Ext.getCmp("permTypeId").getValue();//获取ID
        var permName = Ext.getCmp("permTypeId").getRawValue();//获取name


        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '添加权限',
            id:'addPermWin',
            resizable: false,
            draggable:true,
            modal: true,
            bodyPadding:'20 30',
            width: 360,
            layout: 'fit',
            items: {
                xtype: 'form',
                id:'addPermForm',
                defaults:{
                    labelAlign: 'right',
                    labelWidth:55,
                    margin:'0 0 12',
                    anchor:'100%'
                },
                items: [
                    {
                        xtype: 'textfield',
                        name:'appId',
                        id:'appPermId',
                        fieldLabel: 'appId',
                        hidden:true
                    },
                    {
                        xtype: 'displayfield',
                        id:'appPermName',
                        name:'permName',
                        fieldLabel: '所属应用'
                    },
                    {
                        xtype: 'textfield',
                        name:'code',
                        fieldLabel: '编号',
                        blankText : "编号不能为空！",
                        allowBlank: false
                    }, 
                    {
                        xtype: 'textfield',
                        name:'name',
                        fieldLabel: '名称',
                        blankText : "名称不能为空！",
                        allowBlank: false
                    },
                    {
                        xtype: 'textareafield',
                        height:80,
                        name:'description',
                        fieldLabel: '描述',
                        maxLength : 200,
                        maxLengthText : '描述长度不能超过200个字符'
                    },
                    {
                        xtype: 'textareafield',
                        height:80,
                        name:'remark',
                        fieldLabel: '备注',
                        maxLength : 200,
                        maxLengthText : '备注长度不能超过200个字符'
                    }
                ]
            },
            buttons: [
                {
                    text: '保存',
                    formBind: true,
                    listeners: {
                        click:function () {
                            var window = Ext.getCmp('addPermWin'),
                                form = Ext.getCmp('addPermForm').getForm(),
                                data = form.getValues();

                            if(form.isValid()){
                                Ext.Ajax.request({
                                    url: 'permadd',
                                    params: data,
                                    method: 'POST',
                                    success: function (response, options) {
                                        var data = Ext.decode(response.responseText);
                                        if(data.result==true){
                                            window.close();
                                            store.reload();
                                        }else {
                                            Ext.MessageBox.alert('提示', data.msg);
                                        }
                                    }
                                });
                            }
                        }
                    }
                },
                {
                    text: '取消',
                    listeners: {
                        click:function () {
                            var window = Ext.getCmp('addPermWin');
                            window.close();
                        }
                    }
                }
            ],
            listeners:{
                afterrender:function () {
                    Ext.getCmp('appPermName').setValue(permName);
                    Ext.getCmp('appPermId').setValue(permId);
                }
            }
        }).show();
    },
    edit:function (id) {
        var me = this,
            view = me.getView(),
            store = view.getStore(),
            vm = me.getViewModel(),
        record = vm.get('focusApplication');
        var permName = Ext.getCmp("permTypeId").getRawValue();//获取name
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '编辑权限',
            id:'editPermWin',
            resizable: false,
            draggable:true,
            modal: true,
            bodyPadding:'20 30',
            width: 360,
            layout: 'fit',
            items: {
                xtype: 'form',
                id:'editPermForm',
                defaults:{
                    labelAlign: 'right',
                    labelWidth:55,
                    margin:'0 0 12',
                    anchor:'100%'
                },
                viewModel: {
                    data: {
                        editPermList: record
                    }
                },
                items: [
                    {
                        xtype: 'textfield',
                        name:'appId',
                        bind:'{editPermList.appId}',
                        id:'appPermId',
                        fieldLabel: 'appId',
                        hidden:true
                    },
                    {
                        xtype: 'displayfield',
                        id:'editPermName',
                        name:'permName',
                        // bind:'{editPermList.permName}',
                        fieldLabel: '所属应用'
                    },
                    {
                        xtype: 'textfield',
                        name:'code',
                        bind:'{editPermList.code}',
                        fieldLabel: '编号',
                        blankText : "科室编号不能为空！",
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        name:'name',
                        bind:'{editPermList.name}',
                        fieldLabel: '名称',
                        blankText : "科室名称不能为空！",
                        allowBlank: false
                    },
                    {
                        xtype: 'textareafield',
                        height:80,
                        name:'description',
                        bind:'{editPermList.description}',
                        fieldLabel: '描述',
                        maxLength : 200,
                        maxLengthText : '描述长度不能超过200个字符'
                    },
                    {
                        xtype: 'textareafield',
                        height:80,
                        name:'remark',
                        bind:'{editPermList.remark}',
                        fieldLabel: '备注',
                        maxLength : 200,
                        maxLengthText : '备注长度不能超过200个字符'
                    }
                ]
            },
            buttons: [
                {
                    text: '保存',
                    formBind: true,
                    listeners: {
                        click:function () {
                            var window = Ext.getCmp('editPermWin'),
                                form = Ext.getCmp('editPermForm').getForm(),
                                data = form.getValues();
                                data.id = id;
                            if(form.isValid()){
                                Ext.Ajax.request({
                                    url: 'permupdate',
                                    params: data,
                                    method: 'POST',
                                    success: function (response, options) {
                                        var data = Ext.decode(response.responseText);
                                        if(data.result==true){
                                            window.close();
                                            store.reload();
                                        }else {
                                            Ext.MessageBox.alert('提示', data.msg);
                                        }
                                    }
                                });
                            }
                        }
                    }
                },
                {
                    text: '取消',
                    listeners: {
                        click:function () {
                            var window = Ext.getCmp('editPermWin');
                            window.close();
                        }
                    }
                }
            ],
            listeners:{
                afterrender:function () {
                    Ext.getCmp('editPermName').setValue(permName);
                    // Ext.getCmp('editPermId').setValue(permId);
                }
            }
        }).show();
    },
    showDetail:function (id) {
        var me = this,
            view = me.getView(),
            store = view.getStore(),
            vm = me.getViewModel(),
            record = vm.get('focusApplication');
        var detailPermNamea = Ext.getCmp("permTypeId").getRawValue();//获取name
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '权限详情',
            id:'editPermWin',
            resizable: false,
            draggable:true,
            modal: true,
            bodyPadding:'20 30',
            width: 360,
            layout: 'fit',
            items: {
                xtype: 'form',
                id:'detailPermWin',
                defaults:{
                    labelAlign: 'right',
                    labelWidth:55,
                    margin:'0 0 12',
                    anchor:'100%'
                },
                viewModel: {
                    data: {
                        detailPermList: record
                    }
                },
                items: [
                    {
                        xtype: 'displayfield',
                        name:'appId',
                        bind:'{detailPermList.appId}',
                        id:'appPermId',
                        fieldLabel: 'appId',
                        hidden:true
                    },
                    {
                        xtype: 'displayfield',
                        id:'detailPermName',
                        name:'permName',
                        fieldLabel: '所属应用'
                    },
                    {
                        xtype: 'displayfield',
                        name:'code',
                        bind:'{detailPermList.code}',
                        fieldLabel: '编号'
                    },
                    {
                        xtype: 'displayfield',
                        name:'name',
                        bind:'{detailPermList.name}',
                        fieldLabel: '名称'
                    },
                    {
                        xtype: 'displayfield',
                        name:'description',
                        bind:'{detailPermList.description}',
                        fieldLabel: '描述'
                    },
                    {
                        xtype: 'displayfield',
                        name:'remark',
                        bind:'{detailPermList.remark}',
                        fieldLabel: '备注'
                    }
                ]
            },
            buttons: [
                {
                    text: '确定',
                    listeners: {
                        click:function () {
                            var me = this,
                                window = me.up('window');
                            window.close();
                        }
                    }
                }
            ],
            listeners:{
                afterrender:function () {
                    Ext.getCmp('detailPermName').setValue(detailPermNamea);
                }
            }
        }).show();
    },
    delete:function (id) {
        var me = this,
            store = Ext.getCmp('permGrid').getStore();
        Ext.MessageBox.confirm('提示', '确定删除该权限？', function (btn) {
            if(btn=='yes'){
                Ext.Ajax.request({
                    url: 'permdelete',
                    params: {idString:id},
                    method: 'GET',
                    success: function (response, options) {
                        var data = Ext.decode(response.responseText);
                        if(data.result==true){
                            store.reload();
                            Ext.MessageBox.alert('提示', "删除成功");
                        }else{
                            Ext.MessageBox.alert('提示', data.msg);
                        }
                    }
                });
            }
        });
    }
});
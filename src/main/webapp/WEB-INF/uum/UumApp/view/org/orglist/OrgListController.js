/**
 * Created by localadmin on 17/4/21.
 */
Ext.define('UumApp.view.org.orglist.OrgListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.org_orglist',
    requires: [

    ],
    render:function () {
        var me = this,
            view = me.getView(),
            store = view.getStore();
        me.getViewModel().get('gridstore').load();
        me.getCount();
    },
    getCount:function () {//获取机构一级数目
        var me = this;
        Ext.Ajax.request({
            url: 'getorglistcount',
            params: {node:0},
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code==200){
                    me.getViewModel().setData({count:data.count})
                }
            }
        });
    },
    cellclick:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this,
            view = me.getView(),
            ele = Ext.get(e.getTarget());
        if(ele.hasCls('edit')){
            me.edit(record);
        }else if(ele.hasCls('delete')){
            me.delete(record);
        }
    },
    delete:function (record) {//删除城市
        var me = this,
            id = record.getId();
        var parentId = record.data.parentId;
        if(record.data.leaf==false){
            Ext.MessageBox.alert('提示', '含有子集目录，不能删除!');
        }else{
            Ext.MessageBox.confirm('提示', '确定删除该数据？',function (btn) {
                if(btn =='yes'){
                    me.deleteFun(id);
                }
            });
        }
    },
    deleteFun:function (id) {
        var me = this;
        Ext.Ajax.request({
            url: 'orgdelete',
            params: {idString:id},
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.result==true){
                    me.getCount();
                    me.getViewModel().get('gridstore').load();
                }else{
                    Ext.MessageBox.alert('提示', data.msg);
                }
            }
        });
    },
    edit:function (record) {//编辑机构
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            record = vm.get('focusApplication');
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '编辑机构',
            resizable: false,
            draggable:true,
            modal: true,
            bodyPadding:'20 30',
            width: 360,
            layout: 'fit',
            items: {
                xtype: 'form',
                id:'editFrom',
                viewModel: {
                    data: {
                        editFrom: record
                    }
                },
                defaults: {
                    // hideLabel: 'true'
                    labelWidth:80,
                    margin:'0 0 12',
                    anchor:'100%'
                },
                items: [
                    {
                        xtype: 'hiddenfield',
                        name:'id',
                        bind:{
                            value:'{editFrom.id}'
                        }
                    },
                    {
                        xtype: 'hiddenfield',
                        name:'indexCode',
                        bind:{
                            value:'{editFrom.indexCode}'
                        }
                    },
                    {
                        xtype: 'hiddenfield',
                        name:'hasChild',
                        bind:{
                            value:'{editFrom.hasChild}'
                        }
                    },
                    {
                        xtype: 'hiddenfield',
                        name:'parentId',
                        bind:{
                            value:'{editFrom.parentId}'
                        }
                    },
                    {
                        xtype: 'textfield',
                        name:'code',
                        fieldLabel: '机构编码',
                        bind:{
                            value:'{editFrom.code}'
                        },
                        msgTarget: 'side',
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        name:'name',
                        fieldLabel: '机构名称',
                        bind:{
                            value:'{editFrom.name}'
                        },
                        msgTarget: 'side',
                        allowBlank: false
                    },
                    {
                        xtype: 'combo',
                        id:"orgTypeCombo",
                        name:'orgType',
                        fieldLabel: '机构类型',
                        bind:{
                            value:'{editFrom.orgType}'
                        },
                        editable:false,//不可编辑
                        store:Ext.create('Ext.data.Store', {
                            fields: ['id', 'name'],
                            autoLoad: true,
                            proxy: {
                                type: 'ajax',
                                url: 'orgtype',
                                method: 'GET',
                                extraParams: {
                                    id:"0"
                                },
                                reader: {
                                    type: 'json',
                                    rootProperty: 'orgType'//返回数据字段
                                }
                            }
                        }),
                        displayField: 'name',
                        valueField: 'id',
                        listeners: {
                            afterRender: function(combo) {
                                combo.setValue('');//同时下拉框会将与name为firstValue值对应的 text显示
                            }
                        }
                    },
                    {
                        xtype: 'textfield',
                        name:'orderNum',
                        bind:{
                            value:'{editFrom.orderNum}'
                        },
                        fieldLabel: '排序顺序'
                    }
                ]
            },
            buttons: [
                {
                    text: '保存',
                    formBind: true,
                    listeners:{
                        click:function () {
                            var ele = this,
                                window = ele.up('window'),
                                form = Ext.getCmp('editFrom').getForm(),
                                data = form.getValues();
                            data.parentId = data.parentId=="root"?null:Number(data.parentId);
                            data.id = Number(data.id);
                            data.orderNum = Number(data.orderNum);
                            data.orgType = Number(data.orgType);
                            if(form.isValid()){
                                Ext.Ajax.request({
                                    url: 'orgedit',
                                    jsonData: data,
                                    headers: {'Content-Type':'application/json'},
                                    method: 'POST',
                                    success: function (response, options) {
                                        var data = Ext.decode(response.responseText);
                                        if(data.result){
                                            window.close();
                                            me.getViewModel().get('gridstore').load();
                                            Ext.MessageBox.alert('提示', '修改成功');
                                        }else{
                                            window.close();
                                            me.getViewModel().get('gridstore').load();
                                            Ext.MessageBox.alert('提示', '修改失败');
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
                            var ele = this,
                                window = ele.up('window');
                            window.close();
                            me.getViewModel().get('gridstore').load();
                        }
                    }
                }
            ]
        }).show();

    },
    addChild:function () {//添加城市
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = view.getStore(),
            record = view.getSelectionModel().getSelection();
        if(record.length==0){
            Ext.MessageBox.alert('提示','请选择父级机构');
        }else{
            Ext.create('Ext.window.Window', {
                ghost:false,
                title: '添加子机构',
                resizable: false,
                draggable:true,
                modal: true,
                bodyPadding:'20 30',
                width: 360,
                layout: 'fit',
                items: {
                    xtype: 'form',
                    id:'addChildFrom',
                    defaults: {
                        // hideLabel: 'true'
                        labelWidth:80,
                        margin:'0 0 12',
                        anchor:'100%'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name:'code',
                            fieldLabel: '机构编码',
                            value: '',
                            msgTarget: 'side',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            name:'name',
                            fieldLabel: '机构名称',
                            value: '',
                            msgTarget: 'side',
                            allowBlank: false
                        },
                        {
                            xtype: 'combo',
                            id:"orgTypeCombo",
                            name:"orgType",
                            fieldLabel: '机构类型',
                            editable:false,//不可编辑
                            store:Ext.create('Ext.data.Store', {
                                fields: ['id', 'name'],
                                autoLoad: true,
                                proxy: {
                                    type: 'ajax',
                                    url: 'orgtype',
                                    method: 'GET',
                                    extraParams: {
                                        id:"0"
                                    },
                                    reader: {
                                        type: 'json',
                                        rootProperty: 'orgType'//返回数据字段
                                    }
                                }
                            }),
                            displayField: 'name',
                            valueField: 'id',
                            listeners: {
                                afterRender: function(combo) {
                                    combo.setValue('');//同时下拉框会将与name为firstValue值对应的 text显示
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            name:'orderNum',
                            fieldLabel: '排序顺序',
                            value: ''
                        }
                    ]
                },
                buttons: [
                    {
                        text: '保存',
                        formBind: true,
                        listeners:{
                            click:function () {
                                var ele = this,
                                    window = ele.up('window'),
                                    form = Ext.getCmp('addChildFrom').getForm(),
                                    formValues = form.getValues();
                                formValues.parentId = record[0].data.id;
                                formValues.indexCode = record[0].data.code;

                                if(form.isValid()){
                                    Ext.Ajax.request({
                                        url: 'orgadd',
                                        jsonData: formValues,
                                        headers: {'Content-Type':'application/json'},
                                        method: 'POST',
                                        success: function (response, options) {
                                            var data = Ext.decode(response.responseText);
                                            if(data.code==200){
                                                Ext.MessageBox.hide();
                                                window.close();
                                                me.getCount();
                                                me.getViewModel().get('gridstore').load();
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
                                var me = this,
                                    window = me.up('window');
                                window.close();
                            }
                        }
                    }
                ]
            }).show();
        }

    },
    addRoot:function () {//添加根目录
        var me = this,
            view = me.getView(),
            vm = view.getViewModel();
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '添加根机构',
            resizable: false,
            draggable:true,
            modal: true,
            bodyPadding:'20 30',
            width: 360,
            layout: 'fit',
            items: {
                xtype: 'form',
                id:'addRoot',
                defaults: {
                    // hideLabel: 'true'
                    labelWidth:80,
                    margin:'0 0 12',
                    anchor:'100%'
                },
                items: [
                    {
                        xtype: 'textfield',
                        name:'code',
                        fieldLabel: '机构编码',
                        value: '',
                        msgTarget: 'side',
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        name:'name',
                        fieldLabel: '机构名称',
                        value: '',
                        msgTarget: 'side',
                        allowBlank: false
                    },
                    {
                        xtype: 'combo',
                        id:"orgTypeCombo",
                        name:"orgType",
                        fieldLabel: '机构类型',
                        editable:false,//不可编辑
                        store:Ext.create('Ext.data.Store', {
                            fields: ['id', 'name'],
                            autoLoad: true,
                            proxy: {
                                type: 'ajax',
                                url: 'orgtype',
                                method: 'GET',
                                extraParams: {
                                    id:"0"
                                },
                                reader: {
                                    type: 'json',
                                    rootProperty: 'orgType'//返回数据字段
                                }
                            }
                        }),
                        displayField: 'name',
                        valueField: 'id',
                        listeners: {
                            afterRender: function(combo) {
                                combo.setValue('');//同时下拉框会将与name为firstValue值对应的 text显示
                            }
                        }
                    },
                    {
                        xtype: 'textfield',
                        name:'orderNum',
                        fieldLabel: '排序顺序',
                        value: ''
                    }
                ]
            },
            buttons: [
                {
                    text: '保存',
                    formBind: true,
                    listeners:{
                        click:function () {
                            var ele = this,
                                window = ele.up('window'),
                                form = Ext.getCmp('addRoot').getForm(),
                                formValues = form.getValues();
                            formValues.parent_id = null;
                            if(form.isValid()){
                                Ext.Ajax.request({
                                    url: 'orgadd',
                                    headers: {'Content-Type':'application/json'},
                                    jsonData: formValues,
                                    method: 'POST',
                                    success: function (response, options) {
                                        var data = Ext.decode(response.responseText);
                                        if(data.code==200){
                                            Ext.MessageBox.hide();
                                            window.close();
                                            me.getCount();
                                            me.getViewModel().get('gridstore').load();
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
                            var me = this,
                                window = me.up('window');
                            window.close();
                        }
                    }
                }
            ]
        }).show();
    },
    onClose: function () {
        this.getView().up('window').close();
    }
});
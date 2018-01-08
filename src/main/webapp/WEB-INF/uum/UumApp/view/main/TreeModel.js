/**
 * Created by apple on 2017/3/25.
 */
Ext.define('UumApp.view.main.TreeModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tree-list',
    stores: {
        navItems: {
            type: 'tree',
            root: {
                expanded: true,
                children: [
                    {
                    text: '机构管理',
                    id:'org',
                    iconCls: 'fa fa-cogs',
                    leaf: true
                },{
                    text: '应用管理',
                    id:'apps',
                    iconCls: 'fa fa-cog',
                    leaf: true

                },{
                    text: '角色管理',
                    id:'role',
                    iconCls: 'fa fa-street-view ',
                    leaf: true

                },{
                    text: '权限管理',
                    id:'perm',
                    iconCls: 'fa fa-wrench',
                    leaf: true

                },{
                    text: '用户管理',
                    id:'user',
                    iconCls: 'fa fa-user',
                    leaf: true

                },{
                    text: '在线用户',
                    id:'online',
                    iconCls: 'fa fa-users',
                    leaf: true

                }
                ]
            }
        }
    }
});
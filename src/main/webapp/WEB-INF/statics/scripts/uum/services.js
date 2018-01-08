var services = angular.module('services', ['ngResource']);

//appService
services.factory('appService', ['$resource',
  function ($resource) {
      return $resource('app/:appId', {}, {
          query: { method: 'GET', params: { appId: '', queryKey: '', page: 1, pageSize: 10 }, isArray: false },
          getAll: { method: 'GET', params: {}, isArray: true },
          add: { method: 'POST', params: {} },
          deleteApp: { method: 'DELETE', params: { idString: '' }, isArray: false },
          // edit: { method: 'PUT', params: {} }
          edit: { method: 'PUT', params: {} }
      });
  }]);

// services.factory()

//角色管理服务
services.factory('roleService', ['$resource',
  function ($resource) {
      return $resource('role/:roleId', {}, {
          add: { method: 'Get', params: { num: '', name: '', description: '', remark: '' }, isArray: false },//新增数据
          getByNum: { method: 'GET', params: { num: '', mark: '' }, isArray: false },//获得指定Name的数据
          // getById: { method: 'Get', params: { id: 'Id' }, isArray: false },//获得指定Id的数据
          getById: { method: 'Get', params: { id: '' }, isArray: false },//获得指定Id的数据
          update: { method: 'Put', params: { id: '', num: '', name: '', description: '', remark: '' }, isArray: true },//更新数据
          del: { method: 'Delete', params: { ids: 'ids' }, isArray: false },//删除数据
          getPagedData: { method: 'Get', params: { pageIndex: "index", pageSize: 10, queryKey: "queryKey", orderBy: "orderBy" }, isArray: false },//获取分页数据
          getPermByRoleId: { method: 'Get', params: { id: '', mark: true }, isArray: true },//获取指定角色的所有权限
          savePermission: { method: 'Post', params: { perms: '', rid: '' }, isArray: true }//更新权限
      });
  }]);

//在线用户管理服务
services.factory('onlineService', ['$resource',
  function ($resource) {
      return $resource('onlineuser/:onlineId', {}, {
          del: { method: 'Delete', params: { loginName: '',appCode:'' }, isArray: false },//删除数据
          getPagedData: { method: 'Get', params: { pageIndex: "", queryKey: "", orderBy: "",pageSize:"" }, isArray: false }//获取分页数据
      });
  }]);


services.factory('orgService', ['$resource',
  function ($resource) {
      return $resource('org/:orgId', {}, {
          //query: { method: 'GET', params: { orgid: '', queryKey: '', page: 1 }, isArray: false },
          getOrgData: { method: 'GET', params: { parentId: '', code: 0, userId: '' }, isArray: false },
          add: { method: 'POST', params: {} },
          deleteOrg: { method: 'DELETE', params: { idString: '', ParentId: '' }, isArray: false },
          edit: { method: 'PUT', params: {} },
         getOrgTypeData: { method: 'GET', params: {}, isArray: false }
      });

  }]);

//permService
services.factory('permService', ['$resource',
  function ($resource) {
      return $resource('perm/:permId', {}, {
          getApp: { method: 'GET', params: {}, isArray: true },
          query: { method: 'GET', params: { queryKey: '', appId: '', page: '', pageSize: '' }, isArray: false },
          add: { method: 'POST', params: {} },
          deletePrem: { method: 'DELETE', params: { idString: '' }, isArray: false },
          edit: { method: 'PUT', params: {} }
      });
  }]);

//UserService
services.factory('userService', ['$resource',
  function ($resource) {
      return $resource('user/:userId', {}, {
          query: { method: 'GET', params: { queryKey: '', orgName: '', isEnabled: '', page: '', pageSize: '' }, isArray: false },
          assign: { method: 'DELETE', params: { list: "asdf" }, isArray: false },
          add: { method: 'POST', params: { code: 0 } },
          addorgs: { method: 'POST', params: { code: 1, orgs: '', userId: '' }, isArray: false },
          addallorgs: { method: 'POST', params: { code: 2, orgs: '', userId: '' }, isArray: false },
          removeorgs: { method: 'POST', params: { code: 3, orgs: '', userId: '' }, isArray: false },
          removeallorgs: { method: 'POST', params: { code: 4, orgs: '', userId: '' }, isArray: false },
          saveOrgs: { method: 'POST', params: { code: 5, orgs: '', userId: '' }, isArray: false },
          deleteUser: { method: 'DELETE', params: { idString: '' }, isArray: false },
          edit: { method: 'PUT', params: {} },
          set: { method: 'DELETE', params: {}, isArray: false },
          getUserRole: { method: "GET", params: { id: '' }, isArray: true },
          changPwd: { method: "PUT", params: { id: '', pwd: '' }, isArray: false }
      });
  }]);

services.factory('uumService', ['$resource',
  function ($resource) {
      return $resource('uum/:u', {}, {
          cpwd: { method: 'Get', params: '', isArray: false },
      });
  }]);
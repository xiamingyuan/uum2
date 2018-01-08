<%--
  Created by IntelliJ IDEA.
  User: konglh
  Date: 16/4/15
  Time: 上午11:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<nav class="navbar navbar-default" role="navigation">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="javascript:void(0)" ng-click="search()">用户管理</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
            <li class="active"><a href="javascript:void(0)" ng-click="search()">查看</a></li>
            <li><a href="javascript:void(0)" ng-click="create()">添加</a></li>

        </ul>
        <form class="navbar-form navbar-left" role="search">
            <div class="form-group form-group-pop">
                <input type="text" class="form-control" ng-model="queryKey" placeholder="用户名">
            </div>
            <div class="form-group form-group-pop">
                <input type="text" class="form-control" ng-model="orgName" placeholder="机构名">
            </div>
            <div class="form-group form-group-pop">
                <label style="color: #868686;font-weight: normal;">状态:</label>
                <select class="form-control form-group-pop" ng-model="queryIsEnabled"  style="width:120px;">
                    <option value="">全部</option>
                    <option value="1">启用</option>
                    <option value="0">禁用</option>
                </select>
            </div>
            <button type="submit" class="btn btn-default form-group-pop" ng-click="search()" style="line-height: 28px;">搜索</button>
        </form>

    </div>
    <!-- /.navbar-collapse -->
</nav>
<!--状态栏 end -->

<style>

    .substr {
        display:inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>

<div class="panel panel-warning tablebox tableboxpos clearfix tableboxpos-color">
    <!-- Default panel contents -->
    <div class="panel-heading panel-heading-new-color"><i class="icon-table"></i>用户列表</div>

    <table class="table table-hover" align="center">
        <thead>
        <tr>
            <th width="5%" class="text-center">序号</th>
            <th width="10%" class="text-center">用户名</th>
            <th width="5%" class="text-center">性别</th>
            <th width="5%" class="text-center">启用</th>
            <th width="15%" class="text-center">机构名称</th>
            <th width="25%" class="text-center">角色</th>
            <th width="15%" class="text-center">注册时间</th>
            <th width="20%" class="text-center">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr ng-if="!data">
            <td colspan="8" align="center">
                暂无数据
            </td>
        </tr>
        <tr ng-repeat="user in data">
            <td class="text-center" ng-bind="(paging.currentPage-1)*pageSize + $index+1"></td>
            <td class="text-left"><a href="javascript:" ng-click="detail(user)" target="_self" ng-bind="user.name"></a></td>
            <td class="text-center" ng-bind="user.gender !=-1 ? user.gender==1?'男':'女':'未知'"></td>
            <td class="text-center">
                <%--<input type="checkbox" ng-model="user.isEnabled" ng-checked="user.isEnabled" ng-click="changEnable(user)" />--%>
                <input type="checkbox" ng-model="user.enabled" ng-checked="user.enabled" ng-click="changEnable(user)" />
            </td>
            <td class="text-left">
                <span class="substr" tooltip style="max-width:250px;" data-toggle="tooltip" data-placement="bottom" title="{{user.userOrgInfo}}" ng-bind="user.userOrgInfo"> </span>
            </td>
            <td class="text-left">
                <span class="substr" tooltip style="max-width:250px;" data-toggle="tooltip" data-placement="bottom" title="{{user.userRoleInfo}}" ng-bind="user.userRoleInfo"> </span>
            </td>

            <td class="text-center" ng-bind="user.createTime | date:'yyyy-MM-dd HH:mm'">注册时间</td>
            <td class="text-center operating-btn">
                <a href="javascript:" ng-click="assign(user.id)" class="character">分配角色</a>
                <a href="javascript:" ng-click="updatePwd(user)" class="password">修改密码</a>
                <a href="javascript:" ng-click="edit(user)" class="edit">编辑</a>
                <a href="javascript:" ng-click="delete(user.id)" value="删除" class="delete">删除</a>
            </td>
        </tr>
        </tbody>
        <tfoot style="display: none;">
        <tr>
            <td colspan="8"></td>
        </tr>
        </tfoot>
    </table>


    <!--<div class="pagination pagination-sm margin_per45">-->


    <!--</div>-->
    <div class="pagepos clearfix">
        <div style="float: left;margin-left: 20px;">
            <span ng-show="paging.totalItems!=0">
                <pagination total-items="paging.totalItems" page="paging.currentPage" max-size="paging.maxSize" items-per-page="pageSize"  class="pagination-sm" boundary-links="true" rotate="false" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;" on-select-page="pageChanged(page)"></pagination>
            </span>
        </div>
        <div style="float: right;margin-right: 20px;">
            <div style="margin-bottom: 0px; margin-top:0px;;line-height: 30px;">
                共：{{paging.totalItems}} 个用户
            </div>
        </div>
    </div>
</div>

<%--
  Created by IntelliJ IDEA.
  User: konglh
  Date: 16/4/15
  Time: 上午11:03
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    .substr {
        display:inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>
<nav class="navbar navbar-default" role="navigation">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="javascript:void(0)" ng-click="search()">角色管理</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
            <li class="active"><a href="javascript:void(0)">查看</a></li>
            <li><a href="javascript:;" ng-click="create()">添加</a></li>
            <li><a href="javascript:;" ng-click="delete()">删除</a></li>
        </ul>
        <form class="navbar-form navbar-left" role="search">
            <div class="form-group form-group-pop" style="margin-right: 28px;">
                <input type="text" class="form-control" ng-model="queryKey" placeholder="角色名称，描述">
                <button ng-click="search()" class="btn btn-default">搜索</button>
            </div>
        </form>
        <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">排序 <b class="caret"></b></a>
                <ul class="dropdown-menu">
                    <li><a href="javascript:void(0)" ng-click="order('num')">默认</a></li>
                    <li class="divider"></li>
                    <li><a href="javascript:void(0)" ng-click="order('name')">名称</a></li>
                    <li><a href="javascript:void(0)" ng-click="order('description')">描述</a></li>
                </ul>
            </li>
        </ul>
    </div>
    <!-- /.navbar-collapse -->
</nav>
<!--状态栏 end -->

<div class="panel panel-warning tablebox tableboxpos clearfix tableboxpos-color">
    <!-- Default panel contents -->
    <div class="panel-heading panel-heading-new-color"><i class="icon-table"></i>角色列表</div>

    <table class="table table-hover" align="center">
        <thead>
        <tr>
            <th width="3%" class="text-center">
                <input type="checkbox" ng-click="checkAll($event.target)" />
            </th>
            <th width="5%" class="text-center">序号</th>
            <th width="180px" class="text-center">角色编号</th>
            <th width="20%">角色名称</th>
            <th>描述</th>
            <th width="15%" class="text-center">日期</th>
            <th width="15%" class="text-center">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr ng-if="!data">
            <td colspan="7" align="center">
                暂无数据
            </td>
        </tr>
        <tr ng-repeat="role in data">
            <td class="text-center">
                <input type="checkbox" ng-click="onChecked(role.id,$event.target)" ng-model="role.isCheck" ng-true-value="true" ng-false-value="false" />
            </td>
            <td align="center">{{(paging.currentPage-1)*pageSize+($index+1)}}</td>
            <td align="left">
                <span class="substr" style="max-width: 180px" tooltip  data-toggle="tooltip" data-placement="bottom" title="{{role.num}}" ng-bind="role.num"></span>
            </td>
            <td><a href="javascript:void(0)" ng-click="detail(role.id)" target="_self">{{role.name.length > 18 ? role.name.substr(0, 18) + "…" : role.name}}</a></td>
            <td>{{role.description.length > 30 ? role.description.substr(0, 30) + "…" : role.description}}</td>
            <td align="center">{{role.createTime|date:'yyyy-MM-dd HH:mm'}}</td>
            <td align="center" class="operating-btn"><a href="javascript:void(0)" ng-click="grant(role.id)" class="authorize">授权</a> <a href="javascript:void(0)" ng-click="edit(role.id)" class="edit">编辑</a> <a href="javascript:void(0)" ng-click="delete(role.id)" class="delete">删除</a></td>
        </tr>
        </tbody>
        <tfoot style="display: none;">
        <tr>
            <td colspan="7"></td>
        </tr>
        </tfoot>
    </table>
    <div class="pagepos clearfix">
        <div style="float: left;margin-left: 20px;">
            <span ng-show="paging.totalItems!=0">
                <pagination total-items="paging.totalItems" page="paging.currentPage" max-size="paging.maxSize" items-per-page="pageSize"  class="pagination-sm" boundary-links="true" rotate="false" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;" on-select-page="pageChanged(page)"></pagination>
            </span>
        </div>
        <div style="float: right;margin-right: 20px;">
            <div style="margin-bottom: 0px; margin-top:0px;;line-height: 30px;">
                共：{{paging.totalItems}} 个角色
            </div>
        </div>
    </div>
</div>



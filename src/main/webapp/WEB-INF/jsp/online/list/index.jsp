<%--
  Created by IntelliJ IDEA.
  User: konglh
  Date: 16/4/15
  Time: 上午11:04
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
        <a class="navbar-brand" href="javascript:void(0)" ng-click="search()">在线用户</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
            <li class="active"><a href="javascript:void(0)">查看</a></li>
        </ul>
        <form class="navbar-form navbar-left" role="search">
            <div class="form-group form-group-pop" style="margin-right:28px;">
                <input type="text" class="form-control" ng-model="queryKey" placeholder="用户名,备注">
                <button ng-click="search()" class="btn btn-default">搜索</button>
            </div>
        </form>
        <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">排序 <b class="caret"></b></a>
                <ul class="dropdown-menu">
                    <li><a href="javascript:void(0)" ng-click="order('name')">默认</a></li>
                    <li class="divider"></li>
                    <li><a href="javascript:void(0)" ng-click="order('name')">用户名</a></li>
                    <li><a href="javascript:void(0)" ng-click="order('remark')">备注</a></li>
                </ul>
            </li>
        </ul>
    </div>
    <!-- /.navbar-collapse -->
</nav>
<!--状态栏 end -->

<div class="panel panel-warning tablebox tableboxpos clearfix tableboxpos-color">
    <!-- Default panel contents -->
    <div class="panel-heading">在线用户</div>

    <table class="table table-hover" align="center">
        <thead>
        <tr>
            <th width="50px" class="text-center">序号</th>
            <th width="50px" class="text-center">用户名</th>
            <th width="" class="text-center">登录IP</th>
            <th width="" class="text-center">登录时间</th>
            <th width="" class="text-center">在线时间</th>
            <th width="" class="text-center">应用名称</th>
            <th width="50px" class="text-center">操作</th>
        </tr>
        </thead>

        <tbody>
        <tr ng-if="!data.data">
            <td colspan="6" align="center">
                暂无数据
            </td>
        </tr>
        <tr ng-repeat="ou in data.data">
            <td align="center">{{(paging.currentPage-1)*paging.maxSize+($index+1)}}</td>
            <td align="center" ng-bind="ou.loginName"></td>
            <td align="center" ng-bind="ou.ipAddress"></td>
            <td align="center" ng-bind="ou.loginTime|date:'yyyy-MM-dd HH:mm'"></td>
            <td align="center" ng-bind="ou.onlineTime"></td>
            <td align="center" ng-bind="ou.appName"></td>
            <td align="center" class="operating-btn"><a href="javascript:void(0)" ng-click="delete(ou.loginName,ou.appCode)" class="downline">强制下线</a></td>
        </tr>
        </tbody>


        <tfoot style="display: none;">
        <tr>
            <td colspan="6"></td>
        </tr>
        </tfoot>
    </table>
    <div class="pagepos clearfix">
        <div style="float: left;margin-left: 20px;">
            <span ng-show="paging.totalItems!=0">
                <pagination total-items="paging.totalItems" page="paging.currentPage" max-size="paging.maxSize" items-per-page="pageSize" class="pagination-sm" boundary-links="true" rotate="false" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;" on-select-page="pageChanged(page)"></pagination>
            </span>
        </div>
        <div style="float: right;margin-right: 20px;">
            <div style="margin-bottom: 0px; margin-top:0px;;line-height: 30px;">
                共：{{paging.totalItems}} 个在线用户
            </div>
        </div>
    </div>
</div>

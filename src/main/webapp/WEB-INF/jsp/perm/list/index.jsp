<%--
  Created by IntelliJ IDEA.
  User: konglh
  Date: 16/4/15
  Time: 上午10:56
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style type="text/css">
    .selected {
        color: #555555;
        cursor: default;
        background-color: #ffffff;
        border: 1px solid red;
        border-bottom-color: transparent;
    }
    .nav-tabs > li.active > a, .nav-tabs > li.active > a:hover, .nav-tabs > li.active > a:focus{border-color: #fff;}
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
        <a class="navbar-brand" ng-click="search()" href="javascript:void(0)">权限管理</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
            <li class="active"><a href="javascript:void(0)" ng-click="query()">查看</a></li>
            <li><a href="javascript:void(0)" ng-click="create()">添加</a></li>
            <!--<li><a href="#" class="dropdown-toggle">删除</a></li>-->
        </ul>
        <form class="navbar-form navbar-left" role="search">
            <div class="form-group form-group-pop" style="margin-right: 28px;">
                <input type="text" class="form-control" ng-model="queryKey" placeholder="编号，名称">
                <button type="submit" class="btn btn-default" ng-click="search()">搜索</button>
            </div>
        </form>

    </div>
    <!-- /.navbar-collapse -->
</nav>
<!--状态栏 end -->

<div class="tablebox tableboxpos panel panel-warning clearfix tableboxpos-color">
    <div id="perm_tab" style="background-color: #f2f2f2;border-radius: 4px 4px 0 0;">
        <ul class="nav nav-tabs" style="border-color: #ddd;">
            <li class="{{ $index==index ? 'active' : '' }}" ng-repeat="app in appData"><a data-toggle="tab" href="javascript:void(0)" ng-click="tabClick(app)" ng-bind="app.name"></a></li>
        </ul>
    </div>
    <div>
        <table class="table table-hover" align="center" style="margin-bottom: 0px;">
            <thead>
            <tr>
                <th width="5%" class="text-center">序号</th>
                <th width="10%" class="text-left">编码</th>
                <th width="45%" class="text-left">权限名称</th>
                <th width="5%" class="text-center">URL</th>
                <th width="5%" class="text-center">Action</th>
                <th width="5%" class="text-center">Controller</th>
                <th width="15%" class="text-center">日期</th>
                <th width="10%" class="text-center">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr ng-if="!data">
                <td colspan="8" align="center">
                    暂无数据
                </td>
            </tr>
            <tr ng-repeat="perm in data">
                <td class="text-center" align="center">{{(paging.currentPage-1)*pageSize + $index+1}}</td>
                <td class="text-left" align="center">{{perm.code}}</td>
                <td class="text-left"><a href="javascript:" ng-click="detail(perm)" target="_self">{{showString(perm.name,30)}}</a></td>
                <td class="text-left">{{perm.url}}</td>
                <td class="text-center">{{perm.action}}</td>
                <td class="text-center">{{perm.controller}}</td>
                <td class="text-center">{{perm.createTime | date:'yyyy-MM-dd HH:mm'}}</td>
                <td class="text-center operating-btn">
                    <a href="javascript:" value="编辑" ng-click="edit(perm)"  class="edit" />编辑</a>   </a><a href="javascript:" ng-click="delete(perm.id)" value="删除"  class="delete"/>删除</a>
                </td>
            </tr>
            </tbody>
            <tfoot style="display:none;">
            <tr>
                <td colspan="10"></td>
            </tr>
            </tfoot>
        </table>


        <div class="pagepos clearfix">
            <div style="float: left;margin-left: 20px;">
                <span><%-- ng-show="paging.totalItems!=0"--%>
                    <pagination total-items="paging.totalItems" page="paging.currentPage" max-size="paging.maxSize" items-per-page="pageSize" class="pagination-sm" boundary-links="true" rotate="false" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;" on-select-page="pageChanged(page)"></pagination>
                </span>
            </div>
            <div style="float: right;margin-right: 20px;">
                <div style="margin-bottom: 0px; margin-top:0px;;line-height: 30px;">
                    共：{{paging.totalItems}} 个权限项
                </div>
            </div>
        </div>
    </div>
</div>

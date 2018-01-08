<%--
  Created by IntelliJ IDEA.
  User: konglh
  Date: 16/4/14
  Time: 下午4:59
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
        <a class="navbar-brand" ng-click="search()" href="javascript:void(0)">应用管理</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
            <li class="active"><a href="javascript:;" ng-click="query()">查看</a></li>
            <li><a href="javascript:;" ng-click="create()">添加</a></li>
        </ul>
        <form class="navbar-form navbar-left" role="search">
            <div class="form-group form-group-pop" style="margin-right: 28px;">
                <input type="text" class="form-control" placeholder="编号，名称，描述，备注" ng-model="queryKey" style="width:200px;">
                <button type="submit" class="btn btn-default" ng-click="search()">搜索</button>
            </div>
        </form>

    </div>
    <!-- /.navbar-collapse -->
</nav>
<!--状态栏 end -->

<div class="panel panel-warning tablebox tableboxpos clearfix tableboxpos-color">
    <!-- Default panel contents -->
    <div class="panel-heading panel-heading-new-color"><i class="icon-table"></i>应用列表</div>

    <table class="table table-hover" align="center">
        <thead>
        <tr>
            <th width="5%" class="text-center">序号</th>
            <th width="10%" class="text-center">编号</th>
            <th width="16%" class="text-center">应用名称</th>
            <th width="22%" class="text-center">描述</th>
            <th width="22%" class="text-center">备注</th>
            <th width="15%" class="text-center">日期</th>
            <th width="10%" class="text-center">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr ng-if="!data">
            <td colspan="7" align="center">
                暂无数据
            </td>
        </tr>
        <tr ng-repeat="app in data">
            <td class="text-center" align="center">{{(paging.currentPage-1)*pageSize + $index+1}}</td>
            <td class="text-center" align="center">{{app.code}}</td>
            <td class="text-center"><a href="javascript:" ng-click="detail(app)" target="_self">{{showString(app.name,10)}}</a></td>
            <td class="text-left">{{showString(app.description,20)}}</td>
            <td class="text-left">{{showString(app.remark,20)}}</td>
            <td class="text-center">{{app.createTime | date:'yyyy-MM-dd HH:mm'}}</td>
            <td class="text-center operating-btn">
                <a href="javascript:" value="编辑" ng-click="edit(app)" class="edit"/>编辑</a>   </a><a href="javascript:" ng-click="delete(app.id)" value="删除" class="delete"/>删除</a>
            </td>
        </tr>

        </tbody>
        <tfoot style="display: none;">
        <tr>
            <td colspan="7"></td>
        </tr>
        </tfoot>
    </table>


    <!--        <ul class="pagination pagination-sm margin_per45">
            <li><a href="#">&laquo;</a></li>
            <li class="active"><a href="#">1 <span class="sr-only">(current)</span></a></li>

            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li><a href="#">&raquo;</a></li>
        </ul>-->
    <div class="pagepos clearfix">
        <div style="float: left;margin-left: 20px;">
            <span ng-show="paging.totalItems!=0">
                <pagination total-items="paging.totalItems" page="paging.currentPage" max-size="paging.maxSize" items-per-page="pageSize"  class="pagination-sm" boundary-links="true" rotate="false" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;" on-select-page="pageChanged(page)"></pagination>
            </span>
        </div>
        <div style="float: right;margin-right: 20px;">
            <div style="margin-bottom: 0px; margin-top:0px;;line-height: 30px;">
                共：{{paging.totalItems}} 个应用
            </div>
        </div>
    </div>
</div>

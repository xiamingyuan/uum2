<%--
  Created by IntelliJ IDEA.
  User: konglh
  Date: 16/4/14
  Time: 下午4:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<style type="text/css">
    .tree {
        min-height: 20px;
        padding: 19px;
        background-color: #fbfbfb;
        /*border: 1px solid #ffffff;*/
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
        -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
    }

    .tree li {
        list-style-type: none;
        margin: 0;
        padding: 10px 5px 0 20px;
        position: relative;
    }
    .tree li i.ng-scope{margin-left:-20px;position: relative;z-index: 1;}
    .tree li::before, .tree li::after {
        content: '';
        left: -20px;
        position: absolute;
        right: auto;
    }

    .tree li::before {
        border-left: 1px solid #999;
        bottom: 50px;
        height: 100%;
        top: 0;
        width: 1px;
    }

    .tree li::after {
        border-top: 1px solid #999;
        height: 20px;
        top: 25px;
        width: 25px;
    }

    .tree li span {
        -moz-border-radius: 5px;
        -webkit-border-radius: 5px;
        border: 1px solid #999;
        border-radius: 5px;
        display: inline-block;
        padding: 3px 8px;
        text-decoration: none;
    }
    /*.tree li:first-child span{background-color: #f7e2ac;}*/

    .tree li.parent_li > span {
        cursor: pointer;
    }

    .tree > ul > li::before, .tree > ul > li::after {
        border: 0;
    }

    .tree li:last-child::before {
        height: 25px;
    }

    .tree li.parent_li > span:hover, .tree li.parent_li > span:hover + ul li span {
        background: #eee;
        border: 1px solid #94a0b4;
        color: #000;
    }

    .selected {
        background-color: #f7e2ac;
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
        <a class="navbar-brand" href="javascript:">机构管理</a>
    </div>
    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
            <!-- <li class="active"><a href="#">查看</a></li>-->
            <li><a href="javascript:;" ng-click="create(0,0,0)">添加根机构</a></li>
            <!--  <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">删除 <b class="caret"></b></a>
                <ul class="dropdown-menu">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li class="divider"></li>
                    <li><a href="#">Separated link</a></li>
                    <li class="divider"></li>
                    <li><a href="#">One more separated link</a></li>
                </ul>
            </li>-->
        </ul>
        <!--<form class="navbar-form navbar-left" role="search">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="请输入关键字" ng-model="queryKey">
            </div>
            <button type="submit" class="btn btn-default" ng-click="query()">搜索</button>
        </form>-->
        <!-- <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">排序 <b class="caret"></b></a>
                <ul class="dropdown-menu">
                  <li><a href="javascript:void(0)" ng-click="order('id')">默认</a></li>
                    <li class="divider"></li>
                    <li><a href="javascript:void(0)" ng-click="order('name')">名称</a></li>
                </ul>
            </li>
        </ul>-->
    </div>
    <!-- /.navbar-collapse -->
</nav>
<!--状态栏 end -->


<div style="min-width: 900px; position: relative;min-height: calc(100% - 116px);">
    <div style="width: 48%; float: left; margin-left: 20px; position:relative;min-height: 600px;border-color: #f2f2f2;" class="panel panel-warning">
        <!--<!-- Default panel contents -->

        <div class="panel-heading">机构列表</div>
        <div class="tree" style="overflow-y: auto; position: absolute;top:41px;left: 0;right: 0;bottom: 49px;">
            <ul style="font-size: 15px; list-style: none;">
                <li style="margin-left: 10px;" ng-repeat="item in data.data" ng-include="'scripts/uum/tree_item_renderer.html'"></li>
            </ul>
        </div>
        <div class="alert alert-warning" style="background-color: #f2f2f2; margin-bottom: 0px;position: absolute;left: 0;right:0;bottom: 0;border:none;">
            共：{{data.totalCount}} 个机构
        </div>
    </div>


    <div style="width: 46%; margin-right: 20px;position: relative;float: right;min-height: 600px;border-color:#f2f2f2;" class="panel panel-warning">
        <!--<!-- Default panel contents -->

        <div class="panel-heading">机构信息</div>
        <div style="padding: 10px;">
            <table style="width: 100%;">
                <tbody>
                <tr>
                    <th style="width: 80px; height: 21px">机构编号： </th>
                    <td>{{orgDatail.code}}</td>
                </tr>
                <tr>
                    <th style="width: 80px; height: 21px">机构名称：</th>
                    <td>{{orgDatail.name}}</td>
                </tr>
                <tr>
                    <th style="width: 80px; height: 21px">机构类型： </th>
                    <td>{{orgDatail.typeName}}</td>
                </tr>
                <tr>
                    <th style="width: 80px; height: 21px">排序顺序： </th>
                    <td>{{orgDatail.orderNum}}</td>
                </tr>
                <tr>
                    <th style="width: 80px; height: 21px">创建时间： </th>
                    <td>{{orgDatail.createTime | date:'yyyy-MM-dd HH:mm'}}</td>
                </tr>

                </tbody>
            </table>
        </div>
        <div style="min-width: 10px;position: absolute;bottom: 10px;right: 20px;">
            <button type="button" class="btn btn-default" ng-click="create(orgDatail.id, orgDatail.parentId, orgDatail.indexCode)"><span style="color: #ff6a00">添加子机构</span></button>
            <button type="button" class="btn btn-default" ng-click="edit(orgDatail)"><span style="color: #ff6a00">编辑</span></button>
            <button type="button" class="btn btn-default" ng-click="delete(orgDatail.id,orgDatail.parentId)"><span style="color: #ff6a00">删除</span></button>
        </div>
    </div>

</div>
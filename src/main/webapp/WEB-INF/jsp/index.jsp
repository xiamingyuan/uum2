<%--
  Created by IntelliJ IDEA.
  User: konglh
  Date: 16/4/14
  Time: 上午11:03
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<html lang="zh-cn" xmlns="http://www.w3.org/1999/xhtml" ng-app="app">
<head>
    <%--<meta name="viewport" content="width=device-width, initial-scale=1.0;charset=UTF-8" http-equiv="Content-Type";>--%>
    <title>新健康-权限</title>

    <link rel="shortcut icon" type="image/x-icon" href="image/favicon.ico" media="screen" />
    <link href="css/80shades/style.css" rel="stylesheet" />
    <link href="css/bootstrap/css/bootstrap.css" rel="stylesheet" />
    <link href="css/site.css" rel="stylesheet" />
    <link href="css/user.css" rel="stylesheet" />

    <%--<script type="text/javascript" src="scripts/angular/angular.min.js"></script>--%>
    <%--<script type="text/javascript" src="scripts/angular/angular-route.min.js"></script>--%>
    <%--<script type="text/javascript" src="scripts/angular/angular-resource.min.js"></script>--%>
    <%--<script type="text/javascript" src="scripts/angular-ui/ui-bootstrap-tpls-0.10.0.min.js"></script>--%>

    <%--<script type="text/javascript" src="scripts/uum/app.js"></script>--%>
    <%--<script type="text/javascript" src="scripts/uum/controllers.js"></script>--%>
    <%--<script type="text/javascript" src="scripts/uum/directives.js"></script>--%>
    <%--<script type="text/javascript" src="scripts/uum/filters.js"></script>--%>
    <%--<script type="text/javascript" src="scripts/uum/services.js"></script>--%>


    <script type="text/javascript" src="scripts/jquery/jquery-2.0.3.js"></script>
    <script type="text/javascript" src="css/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="scripts/angular-ui-bootbox/bootbox.js"></script>



</head>
<body>
<!--header start -->
<div class="header">
    <p class="logo">
        <a href="#">
            <img src="image/logo.png" alt="logo" /></a>
    </p>
    <p class="name">
        <span class="name_cn">新健康用户管理系统</span><br />
        <span class="name_en">CIS Subscriber Management System</span>
    </p>
    <div class="btn-group f_right" style="position: absolute; right: 10px; top: 17px; z-index: 1001" ng-controller="uumCtrl">
        <a class=" dropdown-toggle btn_userid" data-toggle="dropdown">{{ '${username}' | greet }}<span class="caret"></span>
        </a>
        <ul class="dropdown-menu" role="menu" style="min-width: 120px;">
            <li><a href="javascript:void(0)" ng-click="changeRows()">默认行数</a></li>
            <li><a href="javascript:void(0)" ng-click="changePwd('${username}')">修改密码</a></li>
            <li><a href="logout">退出</a></li>
        </ul>
    </div>
    <%--<p class="close_top">--%>
        <%--<a href="logout">--%>
            <%--<img src="image/icon_exit.png" width="26" height="26" />--%>
        <%--</a>--%>
    <%--</p>--%>
</div>
<!--header end -->

<!--container_body start -->
<div class="container_body clearfix">
    <!--container_leftmenu start -->
    <div class="container_leftmenu">
        <ul class="leftmenu {{active}}">
            <li><a class="org" ng-href="#/{{active}}" ng-click="active='org'"><span class="tit_icon"><i class="icon-80shades-newspaper "></i></span><span class="tit">机构管理</span></a></li>
            <li><a class="app" ng-href="#/{{active}}" ng-click="active='app'"><span class="tit_icon"><i class="icon-80shades-settings "></i></span><span class="tit">应用管理</span></a></li>
            <li><a class="role" ng-href="#/{{active}}" ng-click="active='role'"><span class="tit_icon"><i class="icon-80shades-instagram"></i></span><span class="tit">角色管理</span></a></li>
            <li><a class="perm" ng-href="#/{{active}}" ng-click="active='perm'"><span class="tit_icon"><i class="icon-80shades-inbox "></i></span><span class="tit">权限管理</span></a></li>
            <li><a class="user" ng-href="#/{{active}}" ng-click="active='user'"><span class="tit_icon"><i class="icon-80shades-users "></i></span><span class="tit">用户管理</span></a></li>
            <!--    <li><a class="auth" ng-href="#/{{active}}" ng-click="active='auth'"><span class="tit_icon"><i class="icon-80shades-task"></i></span><span class="tit">用户授权</span></a></li>-->
            <li><a class="online" ng-href="#/{{active}}" ng-click="active='online'"><span class="tit_icon"><i class="icon-80shades-globe "></i></span><span class="tit">在线用户</span></a></li>
        </ul>
    </div>
    <!--container_leftmenu end -->
    <!--container_right start -->
    <div class="container_right" >
        123
    </div>
</div>
<!--container_body end -->

<!--footer start -->
<div class="footer" style="display: none;">版权所有:中公网医疗信息技术有限公司</div>
<!--footer end -->


</body>
</html>

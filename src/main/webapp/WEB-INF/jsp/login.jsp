<%--
  Created by IntelliJ IDEA.
  User: konglh
  Date: 16/4/14
  Time: 下午1:20
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<html>
<head>
    <title>用户管理系统</title>
    <link rel="shortcut icon" type="image/x-icon" href="image/favicon.ico" media="screen" />
    <script type="text/javascript">
        window.onload=function () {
            var hash = window.location.hash.toString();
            document.getElementById("hashUrl").value=hash;
        };
    </script>
</head>
<link href="css/bootstrap/css/bootstrap.css" rel="stylesheet"/>
<script type="text/javascript" src="css/bootstrap/js/bootstrap.min.js"></script>

<link rel="stylesheet" type="text/css" href="css/bootstrap/css/80shades/style.css"/>
<link rel="stylesheet" type="text/css" href="css/bootstrap/css/bootstrap.css"/>


<link rel="stylesheet" type="text/css" href="css/site.css"/>
<script type="text/javascript" src="css/bootstrap/css/80shades/lte-ie7.js"></script>
<script type="text/javascript" src="css/bootstrap/js/bootstrap.js"></script>

<body class="body_login">
<!--header start -->
<div class="header_login">
    <div class="header">
        <p class="logo">
            <a href="#">
                <img src="image/logo.png" alt="" width="58" height="60"/></a>
        </p>
        <p class="name">
            <span class="name_cn">新健康用户管理系统</span><br/>
            <span class="name_en">CIS Subscriber Management System</span>
        </p>

    </div>
</div>
<!--header end -->
<div class="container_login">
    <!--container_menu start -->
    <div class="container_loginform">

        <form class="form_login" action="login" method="post">
            <ul class="logingroup">
                <li>
                    <input name="username" type="text" id="username" value="" size="45" placeholder="用户名"/></li>
                <li>
                    <input name="password" type="password" placeholder="密 码" id="password" value="" size="45"/>
                    <input name="hashUrl" id="hashUrl" value="" type="text" style="display: none;">
                </li>

                <li>
                    <input type="submit" class="btn btn-warning " style="width: 80px; height: 37px; float: left"
                           value="登&nbsp;&nbsp;录"/>
                    <div style="line-height:24px; color: red; font-size: 16px; float: left">${message}</div>
                </li>
            </ul>
        </form>
    </div>
</div>
<div class="footer_login">版权所有:中公网医疗信息技术有限公司</div>

</body>
</html>

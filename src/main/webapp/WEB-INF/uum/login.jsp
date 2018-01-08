<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<!Doctype html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8" />
    <title>新健康-用户权限管理</title>
    <link rel="shortcut icon" type="image/x-icon" href="image/favicon.ico" media="screen" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta content="" name="description" />
    <meta content="" name="author" />
    <link href="css/login/bootstrap-2.3.2.min.css" rel="stylesheet" type="text/css" />
    <link href="css/login/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="css/login/style-metro.css" rel="stylesheet" type="text/css" />
    <link href="css/login/style.css" rel="stylesheet" type="text/css" />
    <link href="css/login/login-soft.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
        window.onload=function () {
            var hash = window.location.hash.toString();
            document.getElementById("hashUrl").value=hash;
        };
    </script>
    <style>
      .errorInfo{position: absolute;width: 100%;text-align: center;
            font-size:12px;bottom: -22px;left: 0;color: red;}
    </style>
</head>
<body class="login">
<div class="logo"> </div>
<div class="content">
    <form class="form_login" action="login" method="post">
        <h3 class="form-title">新健康用户权限管理系统</h3>
        <div class="control-group logingroup">
            <!--隐藏域，特殊用途 -->
            <input type="hidden" value="bd340160-2b41-11e7-9369-1866daf4eab0"/>
            <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
            <label class="control-label visible-ie8 visible-ie9">用户名</label>
            <div class="controls">
                <div class="input-icon left">
                    <i class="icon-user"></i>
                    <input class="m-wrap placeholder-no-fix" name="username" type="text" id="username" value="" size="45" placeholder="用户名" autocomplete="off"/>
                </div>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label visible-ie8 visible-ie9">******</label>
            <div class="controls">
                <div class="input-icon left">
                    <i class="icon-lock"></i>
                    <input class="m-wrap placeholder-no-fix" name="password" type="password" placeholder="密 码" id="password" value="" size="45" autocomplete="off"/>
                    <input name="hashUrl" id="hashUrl" value="" type="text" style="display: none;">
                </div>
            </div>
        </div>
        <div style="height:1px; margin:20px 0 20px; background:#8ea6bb;"></div>
        <div style="margin-bottom:25px;position: relative;">
            <button type="submit" class="btn purple btn-block"> 登录 </button>
            <div class="errorInfo">${message}</div>
        </div>
        <span style="width: 270px;display: inline-block;text-align: center;color: #ccc;font-size: 14px;">仅限使用chrome、firefox、safari浏览器</span>
    </form>
</div>
</body>
</html>

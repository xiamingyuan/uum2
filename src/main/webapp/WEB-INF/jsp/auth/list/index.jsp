<%--
  Created by IntelliJ IDEA.
  User: konglh
  Date: 16/4/17
  Time: 下午3:43
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!--状态栏 start -->
<!-- <div class="statusbar">
<p class="f_left">知识库
<input type="text" class="form-control"   size="40" />
<button type="button" class="btn btn-warning">
搜索
</button>
<a href="../search/ad_search.html"  class="btn btn-default ">高级搜索</a></p>
<p class="f_right">当前有 <span class="text-danger x-large bold">7</span>个用户在线</p>
</div>-->
<nav class="navbar navbar-default" role="navigation">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">用户授权</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
            <li class="active"><a href="#">查看</a></li>
            <li><a href="#">添加</a></li>
            <li class="dropdown">
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
            </li>
        </ul>
        <form class="navbar-form navbar-left" role="search">
            <div class="form-group"  style="margin-right:28px;">
                <input type="text" class="form-control" placeholder="请输入关键字">
            </div>
            <button type="submit" class="btn btn-default">搜索</button>
        </form>
        <ul class="nav navbar-nav navbar-right">
            <li><a href="#">Link</a></li>
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">排序 <b class="caret"></b></a>
                <ul class="dropdown-menu">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li class="divider"></li>
                    <li><a href="#">Separated link</a></li>
                </ul>
            </li>
        </ul>
    </div>
    <!-- /.navbar-collapse -->
</nav>
<!--状态栏 end -->

<div class="panel panel-warning tablebox">
    <!-- Default panel contents -->
    <div class="panel-heading">机构列表</div>

    <table class="table table-hover" align="center">
        <thead>
        <tr>
            <th width="2%" class="text-center">
                <input name="" type="checkbox" value="" /></th>
            <th width="5%" class="text-center">编号</th>
            <th>机构名称</th>
            <th width="15%">地址</th>
            <th width="9%" class="text-center">日期</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td class="text-center">
                <input name="" type="checkbox" value="" /></td>
            <td align="center">01 </td>
            <td><a href="view.shtml" target="_self">前置审核数据整理工作注意事项；</a></td>
            <td>医院前置审核/三院项目</td>
            <td>2013-08-12 13:35</td>
        </tr>
        <tr>
            <td class="text-center">
                <input name="" type="checkbox" value="" /></td>
            <td align="center">02 </td>
            <td><a href="view.shtml" target="_self">数据匹配要求； </a></td>
            <td>医保审核/数据采集比对/三院项目</td>
            <td>2013-08-12 13:35</td>
        </tr>
        <tr>
            <td class="text-center">
                <input name="" type="checkbox" value="" /></td>
            <td align="center">03 </td>
            <td><a href="view.shtml">工作场所信息安全及环环境卫生注意事项； </a></td>
            <td>医院前置审核/三院项目</td>
            <td>2013-08-12 13:35</td>
        </tr>
        <tr>
            <td class="text-center">
                <input name="" type="checkbox" value="" /></td>
            <td align="center">04 </td>
            <td><a href="view.shtml">前置审核数据整理工作注意事项；</a></td>
            <td>医院前置审核/三院项目</td>
            <td>2013-08-12 13:35</td>
        </tr>
        <tr>
            <td class="text-center">
                <input name="" type="checkbox" value="" /></td>
            <td align="center">05</td>
            <td><a href="#">工作场所信息安全及环环境卫生注意事项；</a></td>
            <td>医保审核/数据采集比对/三院项目</td>
            <td>2013-08-12 13:35</td>
        </tr>
        <tr>
            <td class="text-center">
                <input name="" type="checkbox" value="" /></td>
            <td align="center">06</td>
            <td><a href="#">工作场所信息安全及环环境卫生注意事项；</a></td>
            <td>医保审核/数据采集比对/三院项目</td>
            <td>2013-08-12 13:35</td>
        </tr>
        <tr>
            <td class="text-center">
                <input name="" type="checkbox" value="" /></td>
            <td align="center">07 </td>
            <td><a href="#">前置审核数据整理工作注意事项；</a></td>
            <td>医院前置审核/三院项目</td>
            <td>2013-08-12 13:35</td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
            <td colspan="5"></td>
        </tr>
        </tfoot>
    </table>


    <ul class="pagination pagination-sm margin_per45">
        <li><a href="#">&laquo;</a></li>
        <li class="active"><a href="#">1 <span class="sr-only">(current)</span></a></li>

        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#">4</a></li>
        <li><a href="#">5</a></li>
        <li><a href="#">&raquo;</a></li>
    </ul>
</div>


<%--
  Created by IntelliJ IDEA.
  User: konglh
  Date: 16/4/17
  Time: 下午3:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="modal-header">
    <button type="button" class="close" ng-click="cancel()" aria-hidden="true">&times;</button>
    <h4 class="modal-title" id="H1">详细信息</h4>
</div>
<div>
    <div class="modal-body">
        <div class="form-horizontal tablebox" name="form" role="form" novalidate>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">编号：</label>
                <p style="padding-top: 7px" class="col-sm-8 padding_l15" ng-bind="perm.code"></p>
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">名称：</label>
                <p style="padding-top: 7px" class="col-sm-8 padding_l15" ng-bind="perm.name"></p>
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">所属应用：</label>
                <p style="padding-top: 7px" class="col-sm-8 padding_l15" ng-bind="perm.appName"></p>
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">URL：</label>
                <p style="padding-top: 7px" class="col-sm-8 padding_l15" ng-bind="perm.url"></p>
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">Active：</label>
                <p style="padding-top: 7px" class="col-sm-8 padding_l15" ng-bind="perm.action"></p>
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">Controller：</label>
                <p style="padding-top: 7px" class="col-sm-8 padding_l15" ng-bind="perm.controller"></p>
            </div>
            <!--<div class="form-group">-->
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">描述：</label>
                <p style="padding-top: 7px" class="col-sm-8 padding_l15" ng-bind="perm.description"></p>
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">备注：</label>
                <p style="padding-top: 7px" class="col-sm-8 padding_l15" ng-bind="perm.remark"></p>
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">时间：</label>
                <p style="padding-top: 7px" class="col-sm-8 padding_l15" ng-bind="perm.createTime | date:'yyyy-MM-dd HH:mm'"></p>
            </div>
            <!--</div>-->
        </div>
    </div>
</div>
<div class="modal-footer">
    <button type="button" class="btn btn-primary" ng-click="cancel()">确定</button>
</div>


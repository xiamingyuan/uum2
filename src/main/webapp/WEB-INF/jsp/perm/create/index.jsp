<%--
  Created by IntelliJ IDEA.
  User: konglh
  Date: 16/4/16
  Time: 下午11:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="modal-header">
    <button type="button" class="close" ng-click="cancel()" aria-hidden="true">&times;</button>
    <h4 class="modal-title" id="myModalLabel" ng-bind="title"></h4>
</div>
<div>
    <div class="modal-body">
        <form class="form-horizontal tablebox" name="form" role="form" novalidate>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">所属应用：</label>

                <div style="padding-left: 15px; padding-top: 7px; float: left; width: 80%;">
                    <p style="float: left; width: 33%;" ng-repeat="app in appData">
                        <input type="radio" name="app" id="{{app.id}}" value="{{app.id}}" ng-model="perm.appId" required>
                        <label for="{{app.id}}" style="cursor: pointer" title="{{app.name}}">{{app.name.length>8?app.name.substr(0,8)+'…':app.name}}</label>
                    </p>
                </div>
                <!--<p class=" padding_l15" style="float:left;width:25%;" ng-repeat="app in appData">
                    <input type="radio" name="app"  value="{{app.Id}}" ng-model="perm.AppId" required>{{app.Name}}
                </p>-->
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">编号<b style="color: red; font-size: 15px;">*</b>：</label>
                <p class="col-sm-8 padding_l15">
                    <input type="text" class="form-control has-error" ng-model="perm.code" maxlength="50" required>
                </p>
            </div>

            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">名称<b style="color: red; font-size: 15px;">*</b>：</label>
                <p class="col-sm-8 padding_l15">
                    <input type="text" class="form-control has-error" ng-model="perm.name" maxlength="50" required>
                </p>
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">URL：</label>
                <p class="col-sm-8 padding_l15">
                    <input type="text" class="form-control has-error" ng-model="perm.url" maxlength="200">
                </p>
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">Controller：</label>
                <p class="col-sm-8 padding_l15">
                    <input type="text" class="form-control has-error" ng-model="perm.controller" maxlength="50">
                </p>
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">Action：</label>
                <p class="col-sm-8 padding_l15">
                    <input type="text" class="form-control has-error" ng-model="perm.action" maxlength="50">
                </p>
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">描述：</label>
                <p class="col-sm-8 padding_l15">
                    <textarea class="form-control" rows="3" ng-model="perm.description" maxlength="200" style="resize: none"></textarea>
                </p>
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">备注：</label>
                <p class="col-sm-8 padding_l15">
                    <textarea class="form-control" rows="3" ng-model="perm.remark" maxlength="200" style="resize: none"></textarea>
                </p>
            </div>
        </form>
        <div class="alert alert-warning ng-binding" ng-bind="Message"></div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" ng-click="cancel()">取消</button>
        <button type="button" class="btn btn-primary enter-default" ng-click="add(perm)" ng-disabled="form.$invalid">确定</button>
    </div>
</div>

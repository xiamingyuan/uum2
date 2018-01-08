<%--
  Created by IntelliJ IDEA.
  User: konglh
  Date: 16/4/15
  Time: 下午2:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="modal-header">
    <button type="button" class="close" ng-click="cancel()" aria-hidden="true">&times;</button>
    <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
</div>
<div>
    <div class="modal-body">
        <form class="form-horizontal tablebox" name="form" role="form" novalidate>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">编号<b style="color: red; font-size: 15px;">*</b>：</label>
                <p class="col-sm-8 padding_l15">
                    <input type="text" class="form-control has-error" ng-model="app.code" maxlength="50" required>
                </p>
            </div>

            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">名称<b style="color: red; font-size: 15px;">*</b>：</label>
                <p class="col-sm-8 padding_l15">
                    <input type="text" class="form-control has-error" ng-model="app.name" maxlength="50" required>
                </p>
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">描述：</label>
                <p class="col-sm-8 padding_l15">
                    <textarea class="form-control" rows="3" ng-model="app.description" maxlength="200" style="resize: none"></textarea>
                </p>
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">备注：</label>
                <p class="col-sm-8 padding_l15">
                    <textarea class="form-control" rows="3" ng-model="app.remark" maxlength="200" style="resize: none"></textarea>
                </p>
            </div>

        </form>
        <div class="alert alert-warning ng-binding" ng-bind="Message"></div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" ng-click="cancel()">取消</button>
        <button type="button" class="btn btn-primary enter-default" ng-click="add(app)" ng-disabled="form.$invalid">确定</button>
    </div>
</div>

<%--
  Created by IntelliJ IDEA.
  User: konglh
  Date: 16/4/16
  Time: 下午2:45
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="modal-header">
    <button type="button" class="close" ng-click="cancel()" aria-hidden="true">&times;</button>
    <h4 class="modal-title" id="myModalLabel">添加角色</h4>
</div>
<div>
    <div class="modal-body">
        <form class="form-horizontal tablebox" name="form" role="form" novalidate>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">角色编号 <b style="color:red;font-size: 15px;">*</b>：</label>
                <p class="col-sm-8 padding_l15">
                    <input type="text" class="form-control has-error" ng-model="role.num" maxlength="50" required>
                </p>
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">角色名称 <b style="color:red;font-size: 15px;">*</b>：</label>
                <p class="col-sm-8 padding_l15">
                    <input type="text" class="form-control has-error" ng-model="role.name" maxlength="50" required>
                </p>
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">描述：</label>
                <p class="col-sm-8 padding_l15">
                    <textarea class="form-control" rows="3" ng-model="role.description" maxlength="100" style="resize: none"></textarea>
                </p>
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">备注：</label>
                <p class="col-sm-8 padding_l15">
                    <textarea class="form-control" rows="3" ng-model="role.remark" maxlength="200" style="resize:none"></textarea>
                </p>
            </div>
            <div style="width: 100%;height: 30px;">
                <label for="inputEmail3" class="col-sm-2 control-label"></label>
                <p class="col-sm-8 padding_l15" style="color: red" ng-bind="wrongMessage">
                </p>
            </div>
        </form>
        <div class="alert alert-warning">{{status}}</div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" ng-click="cancel()">取消</button>
        <button type="button" class="btn btn-primary enter-default" ng-click="update(role)" ng-disabled="form.$invalid">确定</button>
    </div>
</div>

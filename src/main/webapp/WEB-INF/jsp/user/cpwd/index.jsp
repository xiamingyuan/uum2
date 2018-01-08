<%--
  Created by IntelliJ IDEA.
  User: konglh
  Date: 16/4/17
  Time: 下午3:20
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="modal-header">
    <button type="button" class="close" ng-click="cancel()" aria-hidden="true">&times;</button>
    <h4 class="modal-title" id="myModalLabel">修改密码</h4>
</div>
<div>
    <div class="modal-body">
        <form class="form-horizontal tablebox" name="form" role="form" novalidate>

            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">新密码：</label>
                <p class="col-sm-8 padding_l15">
                    <input id="newPwd" type="password" class="form-control has-error" ng-model="uum.newPwd" maxlength="50" maxlength="20" required>
                </p>
            </div>

            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">新密码确认：</label>
                <p class="col-sm-8 padding_l15">
                    <input id="confirmPwd" type="password" class="form-control has-error" ng-model="uum.confirm" maxlength="50" maxlength="20" required>
                </p>
            </div>
            <div>
                <label for="inputEmail3" class="col-sm-2 control-label"></label>
                <p class="col-sm-8 padding_l15" style="color: red" ng-bind="wrongMessage">
                </p>
            </div>
        </form>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" ng-click="cancel()">取消</button>
        <button type="button" class="btn btn-primary enter-default" ng-click="change(uum)" ng-disabled="form.$invalid">确定</button>
    </div>
</div>


<%--
  Created by IntelliJ IDEA.
  User: konglh
  Date: 16/4/16
  Time: 下午11:59
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
                <label for="inputEmail3" class="col-sm-2 control-label">用户名<b style="color:red;font-size: 15px;">*</b>：</label>
                <p class="col-sm-8 padding_l15">
                    <input type="text" class="form-control has-error" ng-model="user.name" maxlength="50" required>
                </p>
            </div>

            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">密码<b style="color:red;font-size: 15px;">*</b>：</label>
                <p class="col-sm-8 padding_l15">
                    <input type="password" class="form-control has-error" ng-model="user.password" maxlength="50" required>
                </p>
            </div>
            <%--{{user.gender}}--%>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">性别：</label>
                <p style="margin-top: 7px" class="col-sm-8 padding_l15">
                    <span style="margin-right: 15px">
                        <input id="m" type="radio" name="gender" ng-model="user.gender" value="1" checked="checked">
                        <label style="font-weight: normal;cursor:pointer" for="m">男</label>
                    </span>
                    <span>
                        <input id="f" type="radio" name="gender" ng-model="user.gender" value="0">
                        <label style="font-weight: normal;cursor:pointer" for="f">女</label>
                    </span>
                    <span>
                        <input id="w" type="radio" name="gender" ng-model="user.gender" value="-1">
                        <label style="font-weight: normal;cursor:pointer" for="w">未知</label>
                    </span>
                </p>
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">启用：</label>
                <p style="margin-top: 7px" class="col-sm-8 padding_l15">
                    <input type="checkbox" ng-model="user.enabled">
                </p>
            </div>
            <!--<div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">机构：</label>
                <p style="margin-top: 7px" class="col-sm-8 padding_l15">
                    <select class="form-control" ng-model="user.OrgId" style="width: 390px">
                        <option ng-selected='item.Id==user.OrgId' ng-repeat="item in orgList.Data" value="{{item.Id}}">{{item.Name}}</option>
                    </select>--><!--{{item.Id==org.ParentId ? selected : ''}}<!--ng-selected='item.Id==org.ParentId ?true:false'-->
            <!--</p>
        </div>-->

            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">手机<!--<b style="color:red;font-size: 15px;">*</b>-->：</label>
                <p class="col-sm-8 padding_l15">
                    <input type="text" class="form-control has-error" ng-model="user.phone" maxlength="11" ng-pattern="/^[0-9]{11}$/" >
                </p>
            </div>

            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">固话：</label>
                <p class="col-sm-8 padding_l15">
                    <input type="text" class="form-control has-error" ng-model="user.telphone" maxlength="50" ng-pattern="/^(0[0-9]{2,3})?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/">
                </p>
            </div>

            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">邮箱：</label>
                <p class="col-sm-8 padding_l15">
                    <input type="email" class="form-control has-error" ng-model="user.mail" maxlength="50">
                </p>
            </div>

            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">备注：</label>
                <p class="col-sm-8 padding_l15">
                    <textarea class="form-control" rows="3" ng-model="user.remark" maxlength="200" style="resize:none"></textarea>
                </p>
            </div>
            <div style="width: 100%;height: 30px;">
                <label for="inputEmail3" class="col-sm-2 control-label"></label>
                <p class="col-sm-8 padding_l15" style="color: red" ng-bind="wrongMessage">
                </p>
            </div>

        </form>
        <div class="alert alert-warning ng-binding">温馨提示：用户名、密码不超过50个字符长度，固话为区号+号码、手机号为11位字符，备注不超过200字符长度</div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" ng-click="cancel()">取消</button>
        <button type="button" class="btn btn-primary enter-default" ng-click="add(user)" ng-disabled="form.$invalid">确定</button>
    </div>
</div>

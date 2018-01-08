<%--
  Created by IntelliJ IDEA.
  User: konglh
  Date: 16/4/17
  Time: 下午3:21
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
                <label for="inputEmail3" class="col-sm-2 control-label">用户名：</label>
                <p style="padding-top: 7px" class="col-sm-8 padding_l15" ng-bind="user.name"></p>
            </div>

            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">性别：</label>
                <p style="padding-top: 7px" class="col-sm-8 padding_l15" ng-bind="user.gender !=-1 ? user.gender==1?'男':'女':'未知'"></p>
            </div>

            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">启用：</label>
                <p style="padding-top: 7px" class="col-sm-8 padding_l15" ng-bind="user.enabled?'启用中':'未启用'"></p>
            </div>
            <!--<div class="form-group">
               <label for="inputEmail3" class="col-sm-2 control-label">机构：</label>
                <p style="padding-top: 7px" class="col-sm-8 padding_l15">123</p>
                <ul>
                    <li>456</li>
                </ul>
           </div>-->
            <div class="form-group">
                <label class="col-sm-2 control-label">机构：</label>
                <div class="pull-left" style="padding-top:8px;text-indent:15px" ng-repeat="item in myOrgs">
                    <div>{{item.orgName}}</div>
                </div>
            </div>

            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">手机：</label>
                <p style="padding-top: 7px" class="col-sm-8 padding_l15" ng-bind="user.phone"></p>
            </div>

            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">固话：</label>
                <p style="padding-top: 7px" class="col-sm-8 padding_l15" ng-bind="user.telphone"></p>
            </div>

            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">邮箱：</label>
                <p style="padding-top: 7px" class="col-sm-8 padding_l15" ng-bind="user.mail"></p>
            </div>


            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">备注：</label>
                <p style="padding-top: 7px" class="col-sm-8 padding_l15" ng-bind="user.remark"></p>
            </div>

            <div>
                <label for="inputEmail3" class="col-sm-2 control-label"></label>
                <p class="col-sm-8 padding_l15" style="color: red" ng-bind="wrongMessage"></p>
            </div>
        </div>
    </div>
</div>
<div class="modal-footer">
    <button type="button" class="btn btn-primary" ng-click="cancel()">确定</button>
</div>


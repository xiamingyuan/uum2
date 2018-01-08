<%--
  Created by IntelliJ IDEA.
  User: konglh
  Date: 16/4/17
  Time: 下午3:40
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="modal-header">
    <button type="button" class="close" ng-click="cancel()" aria-hidden="true">&times;</button>
    <h4 class="modal-title" id="myModalLabel">{{Title}}机构</h4>
</div>
<div>
    <div class="modal-body">
        <form class="form-horizontal tablebox" name="form" role="form" novalidate>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">机构编码：</label>
                <p class="col-sm-8 padding_l15">
                    <input type="text" class="form-control has-error" ng-model="org.code" maxlength="50" required>
                </p>
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">机构名称：</label>
                <p class="col-sm-8 padding_l15">
                    <input type="text" class="form-control has-error" ng-model="org.name" maxlength="50" required>
                </p>
            </div>

            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">机构类型：</label>
                <label class="checkbox-inline" ng-repeat="orgType in OrgTypeData">
                    <input type="radio" value="{{orgType.id}}" name="radio" ng-model="org.orgType" style="float: left; line-height: 20px;" required>{{orgType.name}}
                </label>
            </div>

            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">上级机构：</label>
                <p class="col-sm-8 padding_l15">
                    <select class="form-control" ng-model="org.ParentId" style="width: 390px">
                        <option ng-selected='item.id==org.parentId ?true:false' ng-repeat="item in orgName" value="{{item.id}}">{{item.name}}</option>
                    </select><!--{{item.Id==org.ParentId ? selected : ''}}-->
                </p>
            </div>

            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">排序顺序：</label> <!--ng-model="org.OrderNum-->
                <p class="col-sm-8 padding_l15">
                    <input type="number" class="form-control has-error" min="0" max="90000"  value="{{org.orderNum | number}}" ng-model="org.orderNum"  name="org.orderNum | number"  required >
                </p>
            </div>

            <!--<div>
                <label for="inputEmail3" class="col-sm-2 control-label"></label>
                <p class="col-sm-8 padding_l15" style="color: red" ng-bind="wrongMessage">
                </p>
            </div>-->
            <div class="alert alert-warning" ng-bind="wrongMessage">{{status}}  </div>
        </form>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" ng-click="cancel()">取消</button>
        <button type="button" class="btn btn-primary" ng-click="add(org)" ng-disabled="form.$invalid">确定</button>
    </div>
</div>






<%--
  Created by IntelliJ IDEA.
  User: konglh
  Date: 16/4/17
  Time: 下午3:45
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="modal-header">
    <button type="button" class="close" ng-click="cancel()" aria-hidden="true">&times;</button>
    <h4 class="modal-title" id="myModalLabel">默认行数</h4>
</div>
<div class="modal-body" ng-controller="uumCtrl">
    <form class="form-horizontal tablebox" name="rowForm" role="form" novalidate>
        <div class="form-group">
            <label class="col-sm-2 control-label">行数：</label>
            <p class="col-sm-8 padding_l15">
                <input type="number" class="form-control has-error row-size"  required pattern="/^[0-9]\d*$/" value="{{rowSize}}"/>
            </p>
            <div ng-show="rowForm.$submitted || rowForm.rowSize.$touched">
                <span class="error-info" ng-show="rowForm.rowSize.$error.pattern">顺序必须为数字！</span>
            </div>
        </div>
    </form>
</div>
<div class="modal-footer">
    <button type="button" class="btn btn-default" data-dismiss="modal" ng-click="cancel()">取消</button>
    <button type="button" class="btn btn-primary enter-default" ng-click="changeRows()" onclick="window.location.reload()">确定</button>
</div>


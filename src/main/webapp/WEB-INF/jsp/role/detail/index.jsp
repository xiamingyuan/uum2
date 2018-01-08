<%--
  Created by IntelliJ IDEA.
  User: konglh
  Date: 16/4/17
  Time: 下午3:37
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="modal-header">
    <button type="button" class="close" ng-click="cancel()" aria-hidden="true">&times;</button>
    <h4 class="modal-title" id="myModalLabel">详细信息</h4>
</div>
<div>
    <div class="modal-body">
        <form class="form-horizontal tablebox" name="form" role="form" novalidate>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">角色编号：</label>
                <p style="padding-top: 7px" class="col-sm-8 padding_l15">
                    {{role.num}}
                </p>
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">角色名称：</label>
                <p style="padding-top: 7px" class="col-sm-8 padding_l15" ng-model="role.name">
                    {{role.name}}
                </p>
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">描述：</label>
                <p style="padding-top: 7px" class="col-sm-8 padding_l15">
                    {{role.description}}
                </p>
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">备注：</label>
                <p style="padding-top: 7px" class="col-sm-8 padding_l15">
                    <span>
                        {{role.remark}}
                    </span>
                </p>
            </div>

            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label" style="display:inline-block;">权限：</label>
                <div style="display:inline-block;width:80%;">
                    <table ng-repeat="g in appGroups">
                        <tr>
                            <%--<td class="label label-success" style="position:relative;top:8px;">{{g.appName}}</td>--%>
                            <td style="position:relative;top:8px;vertical-align: top;"><label class="label label-success">{{g.appName}}</label></td>
                            <%--<label class="label label-success"></label>--%>
                            <td>
                                <div style="display:inline-block;padding-left:25px;font-size: 12px;height: 200px;overflow: auto;">
                                    <div ng-repeat="cl in checkList|filter:{appId:g.appId}" class="alert alert-warning alert-dismissable" style="width:42%;padding:3px 10px 3px 10px;margin:0 10px 10px 0px;display:inline-block;">
                                        {{cl.permName}}
                                        <input type="text" ng-model="cl.options" disabled="disabled" style=" width: 100%;border:0;display:block;padding:0 10px;height: 24px;line-height:24px;position:relative;outline:0;margin-top:5px;" placeholder="备注信息" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-primary" ng-click="cancel()">关闭</button>
    </div>
</div>
<%--
  Created by IntelliJ IDEA.
  User: konglh
  Date: 16/4/16
  Time: 下午2:55
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style type="text/css">
    #appTabContent span {
        width: 24%;
        display: inline-block;
        margin: 4px;
        position: relative;
        color: #b96e03;
        height: 40px; /*border: 1px solid red;*/
    }

    .permission_list {
        margin: 10px 0px;
    }

    .modal .modal-dialog {
        width: 1000px;
    }
</style>

<div>
    <div class="modal-header">
        <button type="button" class="close" ng-click="cancel()" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalLabel">角色授权</h4>
    </div>

    <%--<div>--%>
    <div class="modal-body">
        <div class="bs-example bs-example-tabs">
            <ul id="appTab" class="nav nav-tabs">
                <li ng-repeat="app in apps" class="{{$first?'active':''}}"><a href="{{'#'+app.id}}" data-toggle="tab"
                                                                              ng-click="tabClick(app.id,app.name,$index+1,$event)">{{app.name.length
                    > 10 ? app.name.substr(0, 10) + "…" : app.name
                    }}</a></li>
            </ul>

            <div id="appTabContent" class="tab-content">
                <div ng-repeat="app in apps" ng-class="{{'tab-pane fade active in '+($first?'active in':'')}}"
                     id="{{app.id}}">
                    <div class="permission_list">
                        <span ng-repeat="ps in permisssions">
                            <input type="checkbox" ng-click="doCheck(ps.id,ps.name,tabAppId,tabAppName,$event.target)"
                                   id="{{'ck_'+$index}}" ng-model="ps.isChecked" ng-true-value="true"
                                   ng-false-value="false"/>
                            <label for="{{'ck_'+$index}}" title="{{ps.name}}">{{ps.name.length > 15 ? ps.name.substr(0, 15) + "…" : ps.name}}</label>
                        </span>
                    </div>


                    <div>
                        <div style="float: left">
                            <nnn>
                                <pagination total-items="paging.totalItems" page="paging.currentPage"
                                            max-size="paging.maxSize" items-per-page="20" class="pagination-sm"
                                            boundary-links="true" rotate="false" previous-text="&lsaquo;"
                                            next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"
                                            on-select-page="pageChanged(page,app.id)"></pagination>
                            </nnn>
                        </div>
                        <div style="float: left;margin-left: 20px;">
                            <div style="margin-bottom: 0px; margin-top: 25px;">
                                共：{{paging.totalItems}} 个权限项
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer" style="padding-top: 15px;">
                <button type="button" class="btn btn-default" ng-click="cancel()">取消</button>
                <button type="button" class="btn btn-primary" ng-click="grant()">确定</button>
            </div>
        </div>
        <div>
            <table style="clear: both;font-size: 12px;" ng-repeat="g in appGroups">
                <tr>
                    <td class="label label-success" style="position: relative; top: 10px;">
                        <div style="width: 100px;text-align: center;display: inline-block;">{{g.appName}}</div>
                    </td>
                    <td>
                        <div style="display: inline-block; padding-left: 25px;height: 200px;overflow: auto;">
                            <div ng-repeat="cl in checkList|filter:{appId:g.appId}"
                                 class="alert alert-warning alert-dismissable"
                                 style="position:relative;width: 25%; padding: 5px 15px; margin: 5px 20px 0px 0px; display: inline-block;">
                                <button ng-click="remove(cl.permId)" type="button" class="close" data-dismiss="alert"
                                        aria-hidden="true"
                                        style="position: absolute;top: -5px;right: -1px;">&times;</button>
                                {{cl.permName}}
                                <input type="text" class="form-control" ng-model="cl.options"
                                       style="border: 0; width:100%;height: 24px; position: relative;outline: 0;margin-top: 5px;"
                                       maxlength="50"/>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>

    <%--</div>--%>
</div>

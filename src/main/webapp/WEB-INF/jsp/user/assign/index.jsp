<%--
  Created by IntelliJ IDEA.
  User: konglh
  Date: 16/4/17
  Time: 下午3:17
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style type="text/css">
    #appTabContent span {
        width: 22%;
        display: inline-block;
        margin: 5px;
        position: relative;
        color:#b96e03;
        height: 40px; /*border: 1px solid red;*/
    }

    .permission_list {
        padding-left: 20px;
        margin: 10px;
    }
</style>

<div class="modal-header">
    <button type="button" class="close" ng-click="cancel()" aria-hidden="true">&times;</button>
    <h4 class="modal-title" id="myModalLabel">分配角色</h4>
</div>

<div>
    <div class="modal-body">
        <div class="bs-example bs-example-tabs">

            <div id="appTabContent" class="tab-content">

                <div class="permission_list">
                    <span ng-repeat="rl in roleList">
                        <input type="checkbox" id="{{'ck_'+$index}}" ng-checked="rl.checked" ng-click="checked(rl,$event)" ng-true-value="true" ng-false-value="false" />
                        <label for="{{'ck_'+$index}}" title="{{rl.name}}">{{rl.name.length>10?rl.name.substr(0, 6)+'……':rl.name}}</label>
                    </span>
                </div>


                <div>
                    <ttt style="float: left">
                        <SHOW ng-show="paging.totalItems!=0">
                            <pagination total-items="paging.totalItems" page="paging.currentPage" max-size="paging.maxSize" items-per-page="pageSize" class="pagination-sm" boundary-links="true" rotate="false" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;" on-select-page="pageChanged(page)"></pagination>
                        </SHOW>
                    </ttt>
                    <ttt style="float: left;margin-left: 20px;">
                        <div style="margin-bottom: 0px; margin-top: 25px;">
                            共：{{paging.totalItems}} 个角色
                        </div>
                    </ttt>
                </div>

                <!--<show ng-show="paging.totalItems!=0">
                    <pagination total-items="paging.totalItems" page="paging.currentPage" max-size="paging.maxSize" class="pagination-sm" boundary-links="true" rotate="false" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;" on-select-page="pageChanged(page)"></pagination>
                </show>-->
            </div>
            <div class="modal-footer" style="padding-top: 15px;">
                <button type="button" class="btn btn-default" ng-click="cancel()">取消</button>
                <button type="button" class="btn btn-primary" ng-click="assign()">确定</button>
            </div>
            <!--<table ng-repeat="g in checkList">
                <tr>
                    <td class="label label-success" style="position: relative; top: 8px;">{{g.Name}}</td>
                    <td>-->
            <div style="clear: both;max-height: 200px;overflow-y: auto;">
                <div style="display: inline-block; padding-left: 25px;">
                    <div ng-repeat="url in checkList" class="alert alert-warning alert-dismissable" style="width: 170px; padding: 5px 30px 2px 10px; margin-bottom: 5px; margin-right: 20px; display: inline-block;">
                        <button ng-click="remove(url.roleId)" type="button" class="close" data-dismiss="alert" aria-hidden="true" style="left: 15px;">&times;</button>
                        {{url.roleName}}
                    </div>
                </div>
            </div>
            <!--</td>
                </tr>
            </table>-->
        </div>


    </div>
</div>


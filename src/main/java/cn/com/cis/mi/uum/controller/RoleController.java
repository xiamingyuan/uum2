package cn.com.cis.mi.uum.controller;

import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.service.uum.UUMService;
import cn.com.cis.mi.service.uum.dataObjects.*;
import cn.com.cis.mi.service.uum.domain.Role;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by tangwenpei on 16/3/28.
 */
@Controller
public class RoleController {

    @Autowired
    private UUMService uumService;


    @RequestMapping(value = "/role", method = RequestMethod.GET, params = {"pageIndex", "queryKey"})
    @ResponseBody
    public Object Get(int pageIndex, String queryKey) throws Exception {
        ServiceResult<PagedData<RoleInfo>> result = uumService.getRoleList(queryKey, "", pageIndex, 10);
        result.availableAssert(result.getMessage());
        return result.getResult();
    }

    @RequestMapping(value = "/role", method = RequestMethod.GET, params = {"id"})
    @ResponseBody
    public RoleInfo Get(String id) throws Exception {
        ServiceResult<RoleInfo> result = uumService.getRoleById(id);
        result.availableAssert(result.getMessage());
        return result.getResult();
    }

    @RequestMapping(value = "/role", method = RequestMethod.GET, params = {"num", "mark"})
    @ResponseBody
    public RoleInfo Get(String num, String mark) throws Exception {
        ServiceResult<RoleInfo> result = uumService.getRoleByNum(num);
        result.availableAssert(result.getMessage());
        return result.getResult();
    }

    //获取分配角色就角色列表
    @RequestMapping(value = "/getrolelist", method = RequestMethod.GET)
    @ResponseBody
    public Object getRoleList(int page, int start, int limit, String queryKey, String orderBy) throws Exception {
        ServiceResult<PagedData<RoleInfo>> result = uumService.getRoleList(queryKey, orderBy, page, limit);
        result.availableAssert(result.getMessage());
        return result.getResult();
    }

    @RequestMapping(value = "/role", method = RequestMethod.GET, params = {"id", "mark"})
    @ResponseBody
    public List<AppPermissionInfo> Get(String id, boolean mark) throws Exception {
        ServiceResult<List<AppPermissionInfo>> result = uumService.getPermissionByRoleId(id);
        result.availableAssert(result.getMessage());
        return result.getResult();
    }

    //角色授权
    @RequestMapping(value = "/role", method = RequestMethod.POST)
    @ResponseBody
    public void Post(@RequestBody RoleInfo rc) throws Exception {
        String[] pers = (rc.getPerms() == null ? "" : rc.getPerms()).split(",");
        List<RolePermissionInfo> list = new ArrayList<RolePermissionInfo>();
        for (String pe : pers) {
            String[] parts = pe.split("\\|", -1);
            if (parts.length == 2) {
                RolePermissionInfo rolePermissionInfo = new RolePermissionInfo();
                rolePermissionInfo.setPermissionId(parts[0]);
                rolePermissionInfo.setOptions(parts[1]);
                list.add(rolePermissionInfo);
            }
        }
        ServiceResult<Boolean> result = uumService.grantRolePermission(list, String.valueOf(rc.getId()));
        result.availableAssert(result.getMessage());
    }


    // 新增角色
    @RequestMapping(value = "/roleadd", method = RequestMethod.GET, params = {"description", "name", "code", "remark"})
    @ResponseBody
    public Object Get(String code, String name, String description, String remark) throws Exception {
        Map result = new HashMap();
        Role role = new Role();
        role.setCode(code);
        role.setName(name);
        role.setDescription(description);
        role.setRemark(remark);
//        || Get(roleInfo.getNum(), null) != null
        if (!Validate(role))
            return false;
        ServiceResult<Boolean> res = uumService.addRole(role);
//        res.availableAssert(res.getMessage());
        if(res.getStatus().equals(ResultStatus.OK)){
            result.put("code",200);
            result.put("msg","添加成功");
        }else{
            result.put("code",201);
            result.put("msg",res.getMessage());
        }
        return result;
    }

    //角色更新
    @RequestMapping(value = "/roleedit", method = RequestMethod.POST)
    @ResponseBody
    public Object roleEdit(@ModelAttribute Role role) throws Exception {
        Map result = new HashMap();
        //字段长度校验
        if (!Validate(role))
            return false;
        //存在性校验
        RoleInfo oldrole = Get(String.valueOf(role.getId()));
        if (oldrole == null)
            return false;
//        编号唯一性校验
        RoleInfo curRole = GetRoleByCode(role.getCode(), null);
        if (curRole != null && !curRole.getId().equals(role.getId())) {
            result.put("code",201);
            result.put("msg","已存在相同编号的角色！");
        }else{
            ServiceResult<Boolean> res = uumService.updateRole(role);
//            res.availableAssert(res.getMessage());
            if(res.getStatus().equals(ResultStatus.OK)){
                result.put("code",200);
                result.put("msg","编辑成功");
            }else{
                result.put("code",201);
                result.put("msg",res.getMessage());
            }
        }
        return result;
    }


//     删除角色
    @RequestMapping(value = "/roledelete", method = RequestMethod.GET)
    @ResponseBody
    public int roleDelete(String ids) throws Exception {
        String[] pks = ids.split(",");
        for (String id : pks) {
            ServiceResult<Integer> result = uumService.getUserRoleCountByRoleId(id);
            result.availableAssert(result.getMessage());
            if (result.getResult() > 0) {
                return 0;
            }
            ServiceResult<Boolean> result1 = uumService.deleteRole(ids.split(","));
            result1.availableAssert(result1.getMessage());
            return 1;
        }
        return 0;
    }





    //合法验证
    boolean Validate(Role role) {
        boolean isValide = true;
        if (StringUtils.isEmpty(role.getCode()) || StringUtils.isEmpty(role.getName()) || role.getDescription() == null || role.getRemark() == null)
            isValide = false;
        else if (role.getCode().length() > 50 || role.getName().length() > 50 || role.getDescription().length() > 100 || role.getRemark().length() > 200)
            isValide = false;

        return isValide;
    }

    public RoleInfo GetRoleByCode(String num, String mark) throws Exception {
        ServiceResult<RoleInfo> result = uumService.getRoleByNum(num);
//        result.availableAssert(result.getMessage());
        if (result != null) {
            return result.getResult();
        }
        return null;
    }
}

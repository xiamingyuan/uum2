package cn.com.cis.mi.uum.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.service.uum.UUMService;
import cn.com.cis.mi.service.uum.dataObjects.PagedData;
import cn.com.cis.mi.service.uum.dataObjects.Result;
import cn.com.cis.mi.service.uum.dataObjects.UserInfo;
import cn.com.cis.mi.service.uum.dataObjects.UserRoleInfo;
import cn.com.cis.mi.service.uum.domain.User;
import com.alibaba.fastjson.JSONObject;
import com.sun.tracing.dtrace.Attributes;
import org.apache.commons.collections4.map.HashedMap;
import org.apache.commons.lang3.StringUtils;
import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by tangwenpei on 16/3/28.
 */
@Controller
public class UserController {
    private Mapper mapper = new DozerBeanMapper();

    @Autowired
    private UUMService uumService;

    @RequestMapping(value = "/user", method = RequestMethod.GET, params = {"queryKey", "orgName", "page", "pageSize"})
    @ResponseBody
    public PagedData Get(String queryKey, String orgName, int page, int pageSize) throws Exception {
        ServiceResult<PagedData<UserInfo>> result = uumService.getUser(queryKey, orgName, page, pageSize);
        result.availableAssert(result.getMessage());
        return result.getResult();
    }
    @RequestMapping(value = "/userlist", method = RequestMethod.GET, params = {"isEnabled", "orgName", "queryKey", "page", "start", "limit"})
    @ResponseBody
    public PagedData Get(String queryKey, String orgName, String isEnabled,int page, int start, int limit) throws Exception {
        ServiceResult<PagedData<UserInfo>> result = uumService.getUserList(queryKey, orgName, isEnabled, page, limit);
        result.availableAssert(result.getMessage());
        return result.getResult();
    }

    @RequestMapping(value = "/user", method = RequestMethod.GET, params = {"isEnabled", "orgName", "page", "pageSize", "queryKey"})
    @ResponseBody
    public PagedData Get(String queryKey, String orgName, String isEnabled, int page, int pageSize) throws Exception {
        ServiceResult<PagedData<UserInfo>> result = uumService.getUserList(queryKey, orgName, isEnabled, page, pageSize);
        result.availableAssert(result.getMessage());
        return result.getResult();
    }

    @RequestMapping(value = "/userrole", method = RequestMethod.GET, params = {"id"})
    @ResponseBody
    public UserRoleInfo[] Get(String id) throws Exception {
        ServiceResult<List<UserRoleInfo>> result = uumService.getUserRole(id);
        result.availableAssert(result.getMessage());
        List<UserRoleInfo> list = result.getResult();
        UserRoleInfo[] res = list.toArray(new UserRoleInfo[list.size()]);
        return res;
    }

    @RequestMapping(value = "/useradd", method = RequestMethod.POST)
    @ResponseBody
    public Object Post(@ModelAttribute User model ) throws Exception {
        Map result=new HashedMap();
        ServiceResult<Boolean> res = uumService.addUser(mapper.map(model, UserInfo.class));
        res.availableAssert(res.getMessage());
        if(res.getResult()){
            result.put("code",200);
            result.put("msg","添加用户成功");
        }else{
            result.put("code",201);
            result.put("msg",res.getMessage());
        }
        return result;
    }

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    @ResponseBody
    public Object Post(int code, @RequestBody User user) throws Exception {
        switch (code) {
            case 1:
                ServiceResult<Boolean> result = uumService.addOrgsOfUser(user.getOrgs().split("\\|"), user.getUserId());
                result.availableAssert(result.getMessage());
                return result.getResult();
            case 2:
                ServiceResult<Boolean> result1 = uumService.addAllOrgsOfUser(user.getUserId());
                result1.availableAssert(result1.getMessage());
                return result1.getResult();
            case 3:
                ServiceResult<Boolean> result2 = uumService.removeOrgsOfUser(user.getOrgs().split("\\|"), user.getUserId());
                result2.availableAssert(result2.getMessage());
                return result2.getResult();
            case 4:
                ServiceResult<Boolean> result3 = uumService.removeAllOrgsByUserID(user.getUserId());
                result3.availableAssert(result3.getMessage());
                return result3.getResult();
            case 5:
                ServiceResult<Boolean> result4 = uumService.removeAllOrgsByUserID(user.getUserId());
                ServiceResult<Boolean> result5;
                if(user.getOrgs().split("\\|").length>=1&&!user.getOrgs().split("\\|")[0].equals("")){
                    result5 = uumService.addOrgsOfUser(user.getOrgs().split("\\|"), user.getUserId());

                }else {
                   result5 = uumService.addOrgsOfUser(new String[]{}, user.getUserId());

                }
                result4.availableAssert(result4.getMessage());
                result5.availableAssert(result5.getMessage());
                return result4.getResult() ? result5.getResult() : false;
            case 0:
            default:
                ServiceResult<Boolean> result6 = uumService.addUser(mapper.map(user, UserInfo.class));
                result6.availableAssert(result6.getMessage());
                return result6.getResult();
        }
    }

    @RequestMapping(value = "/usersetrole", method = RequestMethod.GET)
    @ResponseBody
    public ServiceResult<Boolean> Delete(String roles, String uid) throws Exception {
        List<UserRoleInfo> list = new ArrayList<UserRoleInfo>();
        if (!StringUtils.isEmpty(roles)) {
            String[] role = roles.split(",");
            for (String item : role) {
                String[] r = item.split("\\|", -1);
                UserRoleInfo userRoleInfo = new UserRoleInfo();
                userRoleInfo.setRoleId(r[0]);
                userRoleInfo.setOptions(r[1]);
                userRoleInfo.setUserId(uid);
                list.add(userRoleInfo);
            }
        }
        ServiceResult<Boolean> result =uumService.assignRole(uid, list.toArray(new UserRoleInfo[list.size()]));
        result.availableAssert(result.getMessage());
        return result;
    }


    @RequestMapping(value = "/useredit", method = RequestMethod.POST)
    @ResponseBody
    public Object Put(@ModelAttribute User user) throws Exception {
        Map result=new HashedMap();
        UserInfo userInfo;
        userInfo = mapper.map(user, UserInfo.class);
        ServiceResult<Boolean> editResult = uumService.updateUser(userInfo);
        editResult.availableAssert(editResult.getMessage());
        if(editResult.getResult()){
            result.put("code",200);
            result.put("msg","编辑用户成功");
        }else{
            result.put("code",201);
            result.put("msg",editResult.getMessage());
        }
        return result;
    }

    @RequestMapping(value = "/user", method = RequestMethod.GET, params = {"id", "isEnabled"})
    @ResponseBody
    public ServiceResult<Boolean> Delete(String id, boolean isEnabled) throws Exception {
        ServiceResult<Boolean> result = uumService.setUserEnable(id, isEnabled);
        result.availableAssert(result.getMessage());
        return result;
    }

    @RequestMapping(value = "/user", method = RequestMethod.GET, params = {"id"})
    @ResponseBody
    public ServiceResult<Boolean> Delete(String id) throws Exception {
        ServiceResult<Boolean> result = uumService.deleteUser(id);
        result.availableAssert(result.getMessage());
        return result;
    }
}

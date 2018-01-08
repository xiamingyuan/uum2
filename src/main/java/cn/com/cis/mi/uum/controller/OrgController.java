package cn.com.cis.mi.uum.controller;

import cn.com.cis.mi.common.service.ResultStatus;
import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.service.uum.UUMService;
import cn.com.cis.mi.service.uum.dataObjects.*;
import cn.com.cis.mi.service.uum.domain.Org;
import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by tangwenpei on 16/3/28.
 */
@Controller
public class OrgController {
    @Autowired
    private UUMService uumService;

    private Mapper mapper = new DozerBeanMapper();

    @RequestMapping(value = "/orgtype", method = RequestMethod.GET, params = {"id"})
    @ResponseBody
    public Object GetOrgTypeAndList(String id) throws Exception {
        ServiceResult<OrgAndOrgType> result = uumService.getOrgTypeAndOrgList(id);
        result.availableAssert(result.getMessage());
        return result.getResult();
    }

    @RequestMapping(value = "/org", method = RequestMethod.GET, params = {"parentId", "isAll", "code", "userId"})
    @ResponseBody
    public Object Get(String parentId, boolean isAll, int code, String userId) throws Exception {
        switch (code) {
            case 1:
                ServiceResult<List<UserOrgInfo>> result =uumService.getNotOrgsOfUser(userId);
                result.availableAssert(result.getMessage());
                return result.getResult();
            default :
                ServiceResult<List<UserOrgInfo>> result1=uumService.getOrgsOfUser(userId);
                result1.availableAssert(result1.getMessage());
                return result1.getResult();
        }
    }

    @RequestMapping(value = "/orgadd", method = RequestMethod.POST)
    @ResponseBody
    public Object Post(@RequestBody Org org) throws Exception {
        Map result = new HashMap();
        OrgInfo orgInfo;
        orgInfo = mapper.map(org, OrgInfo.class);
        ServiceResult<Boolean> res= uumService.addOrg(orgInfo);
//        result.availableAssert(result.getMessage());
        if(res.getStatus().equals(ResultStatus.OK)){
            result.put("code",200);
            result.put("msg","添加成功");
        }else{
            result.put("code",201);
            result.put("msg",res.getMessage());
        }
        return result;
    }

    @RequestMapping(value = "/orgedit", method = RequestMethod.POST)
    @ResponseBody
    public ServiceResult<Boolean> orgEdit(@RequestBody Org org) throws Exception {
        ServiceResult<Boolean> result = uumService.editOrg(org);
        result.availableAssert(result.getMessage());
        return result;
    }

    @RequestMapping(value = "/orgdelete", method = RequestMethod.GET)
    @ResponseBody
    public ServiceResult<Boolean> Delete(String idString) throws Exception {
//        String idString = node.trim();
        ServiceResult<Boolean> result =uumService.deleteOrg(Integer.parseInt(idString));
        result.availableAssert(result.getMessage());
        return result;
    }


    //获取机构
    @RequestMapping(value = "/getorglist", method = RequestMethod.GET)
    @ResponseBody
    public Object getOrgList(String node,boolean isAll) throws Exception {
        String parentId = node.trim().equals("root")?"0":node;
        ServiceResult<PagedData<OrgInfo>> result = uumService.getOrg(Integer.parseInt(parentId), isAll);
        result.availableAssert(result.getMessage());
        return result.getResult().getData();
    }

    //获取机构数量
    @RequestMapping(value = "/getorglistcount", method = RequestMethod.GET)
    @ResponseBody
    public Object getOrgListCount(String node,boolean isAll) throws Exception {
        Map result = new HashMap();
        String parentId = node.trim().equals("root")?"0":node;
        ServiceResult<PagedData<OrgInfo>> list = uumService.getOrg(Integer.parseInt(parentId), isAll);
        list.availableAssert(list.getMessage());
        result.put("code",200);
        result.put("count",list.getResult().getTotalCount());
        return result;
    }

}

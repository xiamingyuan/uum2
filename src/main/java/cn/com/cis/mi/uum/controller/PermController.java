package cn.com.cis.mi.uum.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.service.uum.UUMService;
import cn.com.cis.mi.service.uum.dataObjects.PagedData;
import cn.com.cis.mi.service.uum.dataObjects.PermissionInfo;
import cn.com.cis.mi.service.uum.dataObjects.Result;
import cn.com.cis.mi.service.uum.domain.Permission;
import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by tangwenpei on 16/3/28.
 */
@Controller
public class PermController {

    @Autowired
    private UUMService uumService;

    private Mapper mapper = new DozerBeanMapper();

    @RequestMapping(value = "/permlist", method = RequestMethod.GET)
    @ResponseBody
    public PagedData Get(String queryKey, String appId, int page, int limit) throws Exception
    {
        ServiceResult<PagedData<PermissionInfo>> result = uumService.getPermissionAsPage(queryKey,appId,page,limit);
        result.availableAssert(result.getMessage());
        return result.getResult();
    }

    @RequestMapping(value = "/permadd", method = RequestMethod.POST)
    @ResponseBody
    public ServiceResult<Boolean> Post(@ModelAttribute Permission perm) throws Exception
    {
        PermissionInfo permissionInfo;
        permissionInfo=mapper.map(perm,PermissionInfo.class);
        ServiceResult<Boolean> result = uumService.addPermission(permissionInfo);
        result.availableAssert(result.getMessage());
        return result;
    }

    @RequestMapping(value = "/permupdate", method = RequestMethod.POST)
    @ResponseBody
    public ServiceResult<Boolean> Put(@ModelAttribute Permission perm) throws Exception
    {
        PermissionInfo permissionInfo;
        permissionInfo=mapper.map(perm,PermissionInfo.class);
        ServiceResult<Boolean> result = uumService.updatePermission(permissionInfo);
        result.availableAssert(result.getMessage());
        return result;
    }

    @RequestMapping(value = "/permdelete", method = RequestMethod.GET)
    @ResponseBody
    public ServiceResult<Boolean> Delete(String idString) throws Exception
    {
        ServiceResult<Boolean> result = uumService.deletePermission(idString);
        result.availableAssert(result.getMessage());
        return result;
    }
}

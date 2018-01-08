package cn.com.cis.mi.uum.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.service.uum.UUMService;
import cn.com.cis.mi.service.uum.dataObjects.AppInfo;
import cn.com.cis.mi.service.uum.dataObjects.PagedData;
import cn.com.cis.mi.service.uum.dataObjects.Result;
import cn.com.cis.mi.service.uum.domain.App;
import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;

/**
 * Created by tangwenpei on 16/3/28.
 */
@Controller
public class AppController {
    @Autowired
    private UUMService uumService;

    @RequestMapping(value = "/apptpl", method = RequestMethod.GET)
    public ModelAndView App() throws Exception {
        return new ModelAndView("/app/list/index");
    }

    @RequestMapping(value = "/appedittpl", method = RequestMethod.GET)
    public ModelAndView AppEdit() throws Exception {
        return new ModelAndView("/app/create/index");
    }

    @RequestMapping(value = "/appcreatetpl", method = RequestMethod.GET)
    public ModelAndView AppCreate() throws Exception {
        return new ModelAndView("/app/create/index");
    }

    @RequestMapping(value = "/appdetailtpl", method = RequestMethod.GET)
    public ModelAndView AppDetail() throws Exception {
        return new ModelAndView("/app/detail/index");
    }

    @RequestMapping(value = "/app", method = RequestMethod.GET)
    @ResponseBody
    public Object Get() throws Exception {
        ServiceResult<List<App>> list = uumService.getAppAll();
        list.availableAssert(list.getMessage());
        return list.getResult();
    }

    @RequestMapping(value = "/app", method = RequestMethod.GET, params = {"page", "queryKey", "start", "limit"})
    @ResponseBody
    public Object Get(int page, int limit, String queryKey) throws Exception {
        ServiceResult<PagedData<App>> list = uumService.getAppAsPage(queryKey, page, limit);
        list.availableAssert(list.getMessage());
        return list.getResult();
    }

    @RequestMapping(value = "/appedit", method = RequestMethod.POST)
    @ResponseBody
    public Object Put(@ModelAttribute AppInfo appInfo) throws Exception {
//        Result result;
        Map result=new HashedMap();
        ServiceResult<Boolean> serviceResult = uumService.updateApp(appInfo);
        serviceResult.availableAssert(serviceResult.getMessage());
        if(serviceResult.getResult()){
            result.put("code",200);
            result.put("msg","编辑成功");
        }else{
            result.put("code",201);
            result.put("msg",serviceResult.getMessage());
        }
        return result;
    }

    @RequestMapping(value = "/appadd", method = RequestMethod.POST)
    @ResponseBody
    public Object Post(@ModelAttribute AppInfo appInfo) throws Exception {
//        Result result;
        Map result=new HashedMap();
        ServiceResult<Boolean> serviceResult = uumService.addApp(appInfo);
        serviceResult.availableAssert(serviceResult.getMessage());
        if(serviceResult.getResult()){
            result.put("code",200);
            result.put("msg","添加成功");
        }else{
            result.put("code",201);
            result.put("msg",serviceResult.getMessage());
        }
        return result;
    }

    @RequestMapping(value = "/appdelete", method = RequestMethod.GET)
    @ResponseBody
    public Object Put(String id) throws Exception {
//        Result result;
        ServiceResult<Boolean> result = uumService.deleteApp(id);
        result.availableAssert(result.getMessage());
        return result;
    }
}
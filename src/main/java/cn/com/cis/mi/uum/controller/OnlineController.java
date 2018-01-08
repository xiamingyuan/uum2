package cn.com.cis.mi.uum.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.service.uum.UUMService;
import cn.com.cis.mi.service.uum.dataObjects.OnlineUserInfo;
import cn.com.cis.mi.service.uum.dataObjects.PagedData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by tangwenpei on 16/3/28.
 */
@Controller
public class OnlineController {
    @Autowired
    private UUMService uumService;

    @RequestMapping(value = "/onlinetpl", method = RequestMethod.GET)
    public ModelAndView online() throws Exception {
        return new ModelAndView("/online/list/index");
    }

    @RequestMapping(value = "/onlineuser", method = RequestMethod.GET)
    @ResponseBody
    public Map Get(int page, String queryKey, String orderBy, int limit) throws Exception {
        if (limit == 0) {
            limit = 10;
        }
        Map map = new HashMap();
        ServiceResult<PagedData<OnlineUserInfo>> pagedData = uumService.getOnlineUserList(queryKey, orderBy, page, limit);
        pagedData.availableAssert(pagedData.getMessage());
        map.put("data", pagedData.getResult().getData());
        map.put("totalCount", pagedData.getResult().getTotalCount());
        return map;
    }

    @RequestMapping(value = "/onlineuser", method = RequestMethod.DELETE)
    @ResponseBody
    public Object Delete(String loginName, String appCode) throws Exception {
        ServiceResult<Boolean> result = uumService.kickOnlineUser(loginName, appCode);
        result.availableAssert(result.getMessage());
        return result;
    }

    @RequestMapping(value = "/forceoffline", method = RequestMethod.GET)
    @ResponseBody
    public Object ForceOffline(String username, String appCode) throws Exception {
        ServiceResult<Boolean> result = uumService.kickOnlineUser(username, appCode);
        result.availableAssert(result.getMessage());
        return result;
    }
}

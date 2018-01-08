package cn.com.cis.mi.uum.controller;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.service.uum.UUMService;
import cn.com.cis.mi.service.uum.dataObjects.PagedData;
import cn.com.cis.mi.service.uum.dataObjects.Result;
import cn.com.cis.mi.service.uum.dataObjects.UserInfo;
import cn.com.cis.mi.service.uum.dataObjects.UserRoleInfo;
import cn.com.cis.mi.service.uum.domain.User;
import org.apache.commons.lang3.StringUtils;
import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by tangwenpei on 16/3/28.
 */
@Controller
public class UumController {
    @Autowired
    private UUMService uumService;

    @RequestMapping(value = "/uumchangetpl", method = RequestMethod.GET)
    public ModelAndView User() throws Exception {
        return new ModelAndView("/account/cpwd/index");
    }

    @RequestMapping(value = "/uumchangerowtpl", method = RequestMethod.GET)
    public ModelAndView UserRows() throws Exception {
        return new ModelAndView("/account/rows/index");
    }

    @RequestMapping(value = "/uum", method = RequestMethod.GET)
    @ResponseBody
    public ServiceResult<Boolean> Get(String name, String oldPwd, String newPwd) throws Exception {
        ServiceResult<Boolean> result = uumService.changeUumPwd(name, oldPwd, newPwd);
        result.availableAssert(result.getMessage());
        return result;
    }
}

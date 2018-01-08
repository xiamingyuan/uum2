package cn.com.cis.mi.uum.controller;

import cn.com.cis.mi.service.uum.UUMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by tangwenpei on 16/3/28.
 */
@Controller
public class TestController {


    @Autowired
    private UUMService uumService;

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public ModelAndView Test() {
        Map<String,Object> models = new HashMap<String, Object>();
        models.put("say", uumService.getAppIdByCode("app1code"));
        return new ModelAndView("/test", models);
    }

}

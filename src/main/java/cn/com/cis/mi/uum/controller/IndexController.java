package cn.com.cis.mi.uum.controller;

import cn.com.cis.mi.service.uum.UUMService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by tangwenpei on 16/3/28.
 */
@Controller
public class IndexController {

    @Autowired
    private UUMService uumService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String Index(Model model) throws Exception {
        Subject subject = SecurityUtils.getSubject();
        model.addAttribute("username", subject.getPrincipal());
        return "/index";
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String Login(String redirectURL, HttpServletRequest request) throws Exception {
        Subject subject = SecurityUtils.getSubject();
        if (subject != null && subject.isAuthenticated()) {
            subject.logout();
        }
        return "/login";
    }


    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(HttpSession session, Model model) throws Exception {
        Subject subject = SecurityUtils.getSubject();
        if (subject != null && subject.isAuthenticated()) {
            model.addAttribute("username", subject.getPrincipal());
            return "/index";
        } else {
            Object loginError = session.getAttribute("login_error");
            if (loginError != null) {
                model.addAttribute("message", loginError);
            } else {
                model.addAttribute("message", "请输入正确的用户名和密码!");
            }
            return "/login";
        }
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String Logout(HttpServletRequest request, HttpServletResponse response) throws Exception {
        Subject subject = SecurityUtils.getSubject();
        if (subject != null && subject.isAuthenticated()) {
            subject.logout();
        }
        return "/login";
    }


    @RequestMapping(value = "/error", method = RequestMethod.GET)
    public ModelAndView Error() throws Exception {
        return new ModelAndView("/error");
    }

}

package cn.com.cis.mi.uum.security;

import cn.com.cis.mi.common.service.ServiceResult;
import cn.com.cis.mi.service.uum.UUMService;
import cn.com.cis.mi.service.uum.dataObjects.Result;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by tangwenpei on 15/12/2.
 */
public class Realm extends AuthorizingRealm {
    private static final Log logger = LogFactory.getLog(Realm.class);

    @Autowired
    private UUMService uumService;


    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        return null;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws AuthenticationException {
        try{
            UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
            String username = token.getUsername();
            String password = String.valueOf(token.getPassword());

            if (StringUtils.isNotBlank(username) && StringUtils.isNotBlank(password)) {
                ServiceResult<Boolean> result = uumService.getUumUser(username, password);
                result.availableAssert(result.getMessage());
//                Result result = uumService.getUumUser(username, password);
                if (result.getResult()) {
                    AuthenticationInfo authcInfo = new SimpleAuthenticationInfo(username, password, "系统管理员");
                    logger.info("登录成功");
                    return authcInfo;
                } else {
                    setSession("login_error", result.getMessage());
                }
            }
            logger.info("登录失败");
            return null;
        }catch (Exception ex){
            return null;
        }

    }

    private void setSession(Object key, Object value) {
        Subject currentUser = SecurityUtils.getSubject();
        if (null != currentUser) {
            Session session = currentUser.getSession();
            System.out.println("Session默认超时时间为[" + session.getTimeout() + "]毫秒");
            if (null != session) {
                session.setAttribute(key, value);
            }
        }
    }
}

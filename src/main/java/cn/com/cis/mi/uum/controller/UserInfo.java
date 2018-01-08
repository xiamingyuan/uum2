package cn.com.cis.mi.uum.controller;

import java.io.Serializable;

/**
 * Created by apple on 17/3/3.
 */
public class UserInfo implements Serializable {
    private String userName;
    private String password;

    public UserInfo(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

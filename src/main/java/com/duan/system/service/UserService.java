package com.duan.system.service;

import com.duan.system.pojo.User;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface UserService {
    List<User> findAll();

    /*是否登录成功,返回消息*/
    String login(String username, String password, HttpServletRequest request);
}

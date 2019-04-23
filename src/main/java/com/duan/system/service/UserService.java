package com.duan.system.service;

import com.duan.system.pojo.User;
import com.duan.system.utils.PageBean;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

public interface UserService {
    int addUser(User user);

    PageBean findAll(int pageCode, int pageSize);

    PageBean findByDisplayName(int pageCode,int pageSize,String displayname);

    String findSuperPwdById(int id);
    /*是否登录成功,返回消息*/
    String login(String username, String password, HttpServletRequest request);

    int deleteById(int id);
    /*更新用户信息*/
    void modifyinformation(String message, String value, int id, HttpSession session);

    List<String> findUserList();
}

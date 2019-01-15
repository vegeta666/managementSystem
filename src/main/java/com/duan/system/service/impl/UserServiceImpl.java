package com.duan.system.service.impl;

import com.duan.system.dao.UserMapper;
import com.duan.system.pojo.User;
import com.duan.system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;
    @Override
    public List<User> findAll() {

        List<User> users = userMapper.selectAll();
        return users;
    }

    @Override
    public String login(String username, String password, HttpServletRequest request) {
        User user = userMapper.selectByUsername(username);
        if(user == null){
            return "user";
        }else if(!user.getUserpassword().equals(password)){
            return "password";
        }else{
            HttpSession session = request.getSession();
            session.setAttribute("user",user);
            return "ok";
        }
    }
}

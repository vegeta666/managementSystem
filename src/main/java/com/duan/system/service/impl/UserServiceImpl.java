package com.duan.system.service.impl;

import com.duan.system.dao.UserMapper;
import com.duan.system.pojo.User;
import com.duan.system.service.UserService;
import com.duan.system.utils.PageBean;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
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
    public int addUser(User user) {
        return userMapper.insert(user);
    }

    @Override
    public PageBean findAll(int pageCode, int pageSize) {
        //mybatis分页插件自动分页
        PageHelper.startPage(pageCode,pageSize);

        Page<User> page = userMapper.selectAll();

        return new PageBean(page.getTotal(),page.getResult());
    }

    @Override
    public PageBean findByDisplayName(int pageCode,int pageSize,String displayname) {
        PageHelper.startPage(pageCode,pageSize);
        Page<User> page = userMapper.selectByDisplayName(displayname);
        return new PageBean(page.getTotal(),page.getResult());
    }

    @Override
    public String findSuperPwdById(int id) {
        String res = userMapper.selectSuperPwdById(id);
        return res;
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
    /*
    * 通过id删除管理员
    * */
    @Override
    public int deleteById(int id) {
        int res = userMapper.deleteById(id);
        return res;
    }

    @Override
    public void modifyinformation(String message, String value, int id,HttpSession session) {
        User user = (User)session.getAttribute("user");
        if(message.equals("displayname")){

            userMapper.updateDisplayNameById(value,null,id);
            user.setDisplayname(value);
        }else if(message.equals("password") ){
            userMapper.updateDisplayNameById(null,value,id);
            user.setUserpassword(value);
        }
    }

    @Override
    public List<String> findUserList() {
        return userMapper.selectUserList();
    }
}

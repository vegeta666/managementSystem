package com.duan.system.controller;

import com.duan.system.pojo.User;
import com.duan.system.service.UserService;
import com.duan.system.utils.JsonUtils;
import com.duan.system.utils.PageBean;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

@Controller
public class UserController {
    @Autowired
    UserService userService;
    /*
    * 分页查询用户
    * */
    @PostMapping(value = "/findByPage",produces = "application/json; charset=utf-8")
    @ResponseBody
    public String findByPage(@RequestParam("pageCode") int pageCode,@RequestParam("pageSize") int pageSize){

        PageBean pageBean =  userService.findAll(pageCode,pageSize);
        return JsonUtils.JsontoString(pageBean);
    }
    @PostMapping(value = "/findByDisplayName",produces = "application/json; charset = utf-8")
    @ResponseBody
    public String findByDisplayName(@RequestParam("pageCode") int pageCode,@RequestParam("pageSize") int pageSize,
    @RequestParam("displayname") String displayname){
        PageBean pageBean = userService.findByDisplayName(pageCode,pageSize,displayname);
        return JsonUtils.JsontoString(pageBean);
    }

    @PostMapping("/deleteById")
    @ResponseBody
    public int deleteById(@RequestParam("id") int id){
        int res = userService.deleteById(id);
        return res;
    }
    @GetMapping("/findSuperPwdById")
    @ResponseBody
    public String findSuperPwdById(){
        String res = userService.findSuperPwdById(1000);
        return res;
    }
    @PostMapping(value = "/addUser",produces = "application/json; charset=utf-8")
    @ResponseBody
    public int addUser(@RequestBody String user, HttpSession session){

       User currentUser = (User) session.getAttribute("user");
       Gson u  = new Gson();
       User newUser = u.fromJson(user,User.class);
       newUser.setCreatetime(new Date());
       newUser.setCreateby(currentUser.getDisplayname());
       int res = userService.addUser(newUser);
       return res;
    }
    @PostMapping(value = "/findUserList",produces = "application/json; charset=utf-8")
    @ResponseBody
    public List<String> findUserList(){
        return userService.findUserList();
    }
}

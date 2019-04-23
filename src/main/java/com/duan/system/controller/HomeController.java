package com.duan.system.controller;

import com.duan.system.pojo.User;
import com.duan.system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class HomeController {

    @Autowired
    UserService userService;


    /*根目录跳转登录界面*/
    @GetMapping("/index")
    public String index(){

        return "login";
    }

    /*跳转至welcome方法(redirect是指路径更改)*/
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    @ResponseBody
    public String login(String username, String password, HttpServletRequest request){

        String judgeresult = userService.login(username,password,request);

        return judgeresult;

    }
    @PostMapping(value = "/modify")
    @ResponseBody
    public String modify(String message,String value,HttpSession session){
        User user = (User) session.getAttribute("user");
        int id = user.getId();
        userService.modifyinformation(message,value,id,session);
        return value;
    }
    @GetMapping(value = "/getCurrentUser",produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getCurrentUser(HttpSession session){
        User user = (User) session.getAttribute("user");
        String currentUsername = user.getDisplayname();

        return currentUsername;
    }

    @GetMapping(value = "/getPassword",produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getCurrentPassword(HttpSession session){
        User user = (User) session.getAttribute("user");
        String password = user.getUserpassword();

        return password;
    }

    @GetMapping("/welcome")
    public String welcome(){
        return "home";
    }

    /*退出登录*/
    @GetMapping("/logout")
    public String logout(HttpSession session){
        session.removeAttribute("user");
        return "login";
    }
}

package com.duan.system.controller;

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



    @GetMapping("/welcome")
    public String welcome(){
        return "main";
    }

    /*退出登录*/
    @GetMapping("/logout")
    public String logout(HttpSession session){
        session.removeAttribute("user");
        return "login";
    }
}

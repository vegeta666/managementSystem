package com.duan.system.controller;

import com.duan.system.pojo.Visitor;
import com.duan.system.service.VisitorService;
import com.duan.system.utils.JsonUtils;
import com.duan.system.utils.PageBean;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class VisitorController {
    @Autowired
    VisitorService visitorService;
    @PostMapping(value = "/findVByPage",produces = "application/json; charset=utf-8")
    @ResponseBody
    public String findVByPage(@RequestParam("pageCode") int pageCode,@RequestParam("pageSize") int pageSize){
        PageBean pageBean = visitorService.findAll(pageCode,pageSize);
        return JsonUtils.JsontoString(pageBean);
    }
    @PostMapping(value = "/findVByOlderNameAndOperator",produces = "application/json; charset=utf-8")
    @ResponseBody
    public String findByOlderNameAndOperator(@RequestParam("pageCode") int pageCode,@RequestParam("pageSize") int pageSize,
                                             @RequestParam("olderName") String olderName,@RequestParam("operator") String operator){
        PageBean pageBean = visitorService.findByOlderNameAndOperator(pageCode,pageSize,olderName,operator);
        return JsonUtils.JsontoString(pageBean);
    }
    @PostMapping(value = "/addVisitor",produces = "application/json; charset = utf-8")
    @ResponseBody
    public int addVisitor(@RequestBody String visitor){
        Gson g = new Gson();
        Visitor newVisitor = g.fromJson(visitor,Visitor.class);
        return visitorService.insert(newVisitor);
    }
}

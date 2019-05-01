package com.duan.system.controller;

import com.duan.system.pojo.Attendant;
import com.duan.system.pojo.Older_Attendant;
import com.duan.system.service.AttendantService;
import com.duan.system.utils.JsonUtils;
import com.duan.system.utils.PageBean;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class AttendantController {
    @Autowired
    AttendantService attendantService;

    @PostMapping(value = "/findAByPage",produces = "application/json; charset=utf-8")
    @ResponseBody
    public String findAByPage(@RequestParam("pageCode") int pageCode, @RequestParam("pageSize") int pageSize){
        PageBean pageBean = attendantService.findAll(pageCode,pageSize);
        return JsonUtils.JsontoString(pageBean);
    }
    @PostMapping(value = "/findAByGradeAndStatus",produces = "application/json; charset=utf-8")
    @ResponseBody
    public String findAByGradeAndStatus(@RequestParam("pageCode") int pageCode, @RequestParam("pageSize") int pageSize,
                                        @RequestParam("grade") String grade,@RequestParam("status") String status){
        PageBean pageBean = attendantService.findAByGradeAndStatus(pageCode, pageSize, grade, status);
        return JsonUtils.JsontoString(pageBean);
    }
    @PostMapping(value = "/addAttendant",produces = "application/json; charset=utf-8")
    @ResponseBody
    public int addAttendant(@RequestBody String attendant){
        Gson g = new Gson();
        Attendant newAttendant = g.fromJson(attendant,Attendant.class);
        return attendantService.insert(newAttendant);
    }
    @PostMapping(value = "/findNameByGrade",produces = "application/json; charset=utf-8")
    @ResponseBody
    public List<String> finNameByGrade(@RequestParam("grade") String grade){
        return attendantService.findNameByGrade(grade);
    }
    @PostMapping(value = "/findIdByName",produces = "application/json; charset=utf-8")
    @ResponseBody
    public int findIdByName(@RequestParam("name") String name){
        return attendantService.findIdByName(name);
    }
    @PostMapping(value = "/addO_A",produces = "application/json; charset=utf-8")
    @ResponseBody
    public int addO_A(@RequestBody String o_A){
        Gson g = new Gson();
        Older_Attendant newO_A = g.fromJson(o_A,Older_Attendant.class);
        return attendantService.insertO_A(newO_A);
    }
}

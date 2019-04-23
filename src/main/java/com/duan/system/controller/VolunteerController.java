package com.duan.system.controller;

import com.duan.system.pojo.Volunteer;
import com.duan.system.service.VolunteerService;
import com.duan.system.utils.JsonUtils;
import com.duan.system.utils.PageBean;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class VolunteerController {
    @Autowired
    VolunteerService volunteerService;
    @PostMapping(value = "/updateVT")
    @ResponseBody
    public int updateVT(@RequestBody String volunteer){
        Gson g = new Gson();
        Volunteer newVolunteer = g.fromJson(volunteer,Volunteer.class);
        return volunteerService.updateById(newVolunteer);
    }
    @PostMapping(value = "/deleteVT")
    @ResponseBody
    public int deleteVT(@RequestParam("id") int id){
        return volunteerService.deleteById(id);
    }
    @PostMapping(value = "/findVTByPage",produces = "application/json; charset=utf-8")
    @ResponseBody
    public String findVTByPage(@RequestParam("pageCode") int pageCode, @RequestParam("pageSize") int pageSize){
        PageBean pageBean = volunteerService.findAll(pageCode,pageSize);
        return JsonUtils.JsontoString(pageBean);
    }
    @PostMapping(value = "/findVTByNameAndTeam",produces = "application/json; charset=utf-8")
    @ResponseBody
    public String findVTByNameAndTeam(@RequestParam("pageCode") int pageCode,@RequestParam("pageSize") int pageSize,
                                      @RequestParam("name") String name,@RequestParam("team") String team){
        PageBean pageBean = volunteerService.findByNameAndTeam(pageCode, pageSize, name, team);
        return JsonUtils.JsontoString(pageBean);
    }
    @PostMapping(value = "/addVolunteer",produces = "application/json; charset = utf-8")
    @ResponseBody
    private int addVolunteer(@RequestBody String volunteer){
        Gson g = new Gson();
        Volunteer newVolunteer = g.fromJson(volunteer,Volunteer.class);
        return volunteerService.insert(newVolunteer);
    }
}

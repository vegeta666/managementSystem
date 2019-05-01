package com.duan.system.controller;

import com.duan.system.pojo.*;
import com.duan.system.service.*;
import com.duan.system.utils.JsonUtils;
import com.duan.system.utils.PageBean;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class OlderController {
    @Autowired
    OlderService olderService;
    @Autowired
    OlderHealthService olderHealthService;
    @Autowired
    OlderHomeService olderHomeService;
    @Autowired
    OlderCostService olderCostService;
/*    @Autowired
    OlderPositionService olderPositionService;*/

    @PostMapping(value = "/findOByName",produces = "application/json; charset=utf-8")
    @ResponseBody
    public String findOByName(@RequestParam("pageCode") int pageCode,@RequestParam("pageSize") int pageSize,
                              @RequestParam("name") String name){
        PageBean pageBean = olderService.findOByName(pageCode, pageSize, name);
        return JsonUtils.JsontoString(pageBean);
    }
    @PostMapping(value = "/findOByPage",produces = "application/json; charset=utf-8")
    @ResponseBody
    public String findOByPage(@RequestParam("pageCode") int pageCode,@RequestParam("pageSize") int pageSize){
        PageBean pageBean = olderService.findAll(pageCode,pageSize);
        return JsonUtils.JsontoString(pageBean);
    }
    @PostMapping(value = "/findAllOlderName",produces = "application/json; charset=utf-8")
    @ResponseBody
    public List<String> findAllOlderName(){
        return olderService.findAllName();
    }

    @PostMapping(value = "/addOlder",produces = "application/json; charset=utf-8")
    @ResponseBody
    public int addOlder(@RequestBody String older){
        Gson g = new Gson();
        Older newOlder = g.fromJson(older,Older.class);
        return olderService.insert(newOlder);
    }
    @PostMapping(value = "/findOlderId",produces = "application/json; charset=utf-8")
    @ResponseBody
    public int findOlderId(@RequestParam("idcard") String idcard){
        return olderService.findIdByCard(idcard);
    }

    @PostMapping(value = "/addOlderHealth",produces = "application/json; charset=utf-8")
    @ResponseBody
    public int addOlderHealth(@RequestBody String olderHealth){
        Gson g = new Gson();
        OlderHealth newOlderHealth = g.fromJson(olderHealth,OlderHealth.class);
        return olderHealthService.insert(newOlderHealth);
    }
    @PostMapping(value = "/addOlderCost",produces = "application/json; charset=utf-8")
    @ResponseBody
    public int addOlderCost(@RequestBody String olderCost){
        Gson g = new Gson();
        OlderCost newOlderCost = g.fromJson(olderCost,OlderCost.class);
        return olderCostService.insert(newOlderCost);
    }
    @PostMapping(value = "/addOlderHome",produces = "application/json; charset=utf-8")
    @ResponseBody
    public int addOlderHome(@RequestBody String olderHome){
        Gson g = new Gson();
        OlderHome newOlderHome = g.fromJson(olderHome,OlderHome.class);
        return olderHomeService.insert(newOlderHome);
    }
/*    @PostMapping(value = "/addOlderPosition",produces = "application/json; charset=utf-8")
    @ResponseBody
    public int addOlderPosition(@RequestBody String olderPosition){
        Gson g = new Gson();
        OlderPosition newOlderPosition = g.fromJson(olderPosition,OlderPosition.class);
        return olderPositionService.insert(newOlderPosition);
    }*/
/*    @PostMapping(value = "/findAdress",produces = "application/json; charset=utf-8")
    @ResponseBody
    public List<String> findAdress(){
        return olderPositionService.findAdress();
    }
    @PostMapping(value = "/findRoomByAdress",produces = "application/json; charset=utf-8")
    @ResponseBody
    public List<String> findRoomByAress(@RequestParam("adress") String adress){
        return olderPositionService.findRoomByAdress(adress);
    }
    @PostMapping(value = "/findEmptyBedByAdressAndRoom",produces = "application/json; charset=utf-8")
    public List<String> findEmptyBedByAdressAndRoom(@RequestParam("adress") String adress,@RequestParam("room") String room){
        return olderPositionService.findEmptyBedByAdressAndRoom(adress, room);
    }*/
}

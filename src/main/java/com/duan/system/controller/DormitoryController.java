package com.duan.system.controller;

import com.duan.system.pojo.Dormitory;
import com.duan.system.service.DormitoryService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class DormitoryController {
    @Autowired
    DormitoryService dormitoryService;
    @PostMapping(value = "/addDormitory",produces = "application/json; charset=utf-8")
    @ResponseBody
    public int addDormitory(@RequestBody String dormitory){
        Gson g = new Gson();
        Dormitory tempDormitory = g.fromJson(dormitory,Dormitory.class);
        int base = dormitoryService.findBedCount(tempDormitory.getAdress(),tempDormitory.getRoom()) + 1;
        int count = Integer.parseInt(tempDormitory.getBed());
        for (int i = 0; i < count; i++) {
            tempDormitory.setBed(String.valueOf(base + i));
            dormitoryService.insert(tempDormitory);
        }
        return 1;
    }
    @PostMapping(value = "/findAdress",produces = "application/json; charset=utf-8")
    @ResponseBody
    public List<String> findAdress(){
        return dormitoryService.findAdress();
    }
    @PostMapping(value = "/findRoomByAdress",produces = "application/json; charset=utf-8")
    @ResponseBody
    public List<String> findRoomByAress(@RequestParam("adress") String adress){
        return dormitoryService.findRoomByAdress(adress);
    }

    @PostMapping(value = "/findEmptyBedByAdressAndRoom",produces = "application/json; charset=utf-8")
    @ResponseBody
    public List<String> findEmptyBedByAdressAndRoom(@RequestParam("adress") String adress,@RequestParam("room") String room){
        return dormitoryService.findEmptyBedByAdressAndRoom(adress, room);
    }
    @PostMapping(value = "/updateStatus",produces = "application/json; charset=utf-8")
    @ResponseBody
    public int updateStatus(@RequestParam("adress") String adress,@RequestParam("room") String room,
                            @RequestParam("bed") String bed,@RequestParam("olderid") int olderid){
        return dormitoryService.updateStatus(adress,room,bed,olderid);
    }
}

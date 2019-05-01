package com.duan.system.service;

import com.duan.system.pojo.Dormitory;

import java.util.List;

public interface DormitoryService {
    int insert(Dormitory dormitory);

    int findBedCount(String adress,String room);

    List<String> findAdress();

    List<String> findRoomByAdress(String adress);

    List<String> findEmptyBedByAdressAndRoom(String adress,String room);

    int updateStatus(String adress,String room,String bed,int olderid);
}

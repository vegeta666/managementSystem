package com.duan.system.service;

import com.duan.system.pojo.OlderPosition;

import java.util.List;

public interface OlderPositionService {
    int insert(OlderPosition olderPosition);

    List<String> findAdress();

    List<String> findRoomByAdress(String adress);

    List<String> findEmptyBedByAdressAndRoom(String adress,String room);
}

package com.duan.system.dao;

import com.duan.system.pojo.OlderPosition;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OlderPositionMapper {
    int insert(OlderPosition olderPosition);

    List<String> findAdress();

    List<String> findRoomByAdress(String adress);

    List<String> findEmptyBedByAdressAndRoom(@Param("adress") String adress, @Param("room") String room);
}

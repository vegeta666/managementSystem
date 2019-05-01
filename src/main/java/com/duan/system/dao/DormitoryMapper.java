package com.duan.system.dao;

import com.duan.system.pojo.Dormitory;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface DormitoryMapper {
    int insert(Dormitory dormitory);

    int findBedCount(@Param("adress") String adress,@Param("room") String room);

    List<String> findAdress();

    List<String> findRoomByAdress(String adress);

    List<String> findEmptyBedByAdressAndRoom(@Param("adress") String adress, @Param("room") String room);

    int updateStatus(@Param("adress") String adress,@Param("room") String room,
                     @Param("bed") String bed,@Param("olderid") int olderid);
}

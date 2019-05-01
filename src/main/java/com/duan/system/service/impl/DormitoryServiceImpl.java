package com.duan.system.service.impl;

import com.duan.system.dao.DormitoryMapper;
import com.duan.system.pojo.Dormitory;
import com.duan.system.service.DormitoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DormitoryServiceImpl implements DormitoryService {
    @Autowired
    DormitoryMapper dormitoryMapper;
    @Override
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public int insert(Dormitory dormitory) {
        return dormitoryMapper.insert(dormitory);
    }

    @Override
    public int findBedCount(String adress, String room) {
        return dormitoryMapper.findBedCount(adress,room);
    }
    @Override
    public List<String> findAdress() {
        return dormitoryMapper.findAdress();
    }

    @Override
    public List<String> findRoomByAdress(String adress) {
        return dormitoryMapper.findRoomByAdress(adress);
    }

    @Override
    public List<String> findEmptyBedByAdressAndRoom(String adress, String room) {
        return dormitoryMapper.findEmptyBedByAdressAndRoom(adress,room);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public int updateStatus(String adress, String room, String bed, int olderid) {
        return dormitoryMapper.updateStatus(adress, room, bed, olderid);
    }
}

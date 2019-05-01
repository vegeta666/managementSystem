package com.duan.system.service.impl;

import com.duan.system.dao.OlderPositionMapper;
import com.duan.system.pojo.OlderPosition;
import com.duan.system.service.OlderPositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OlderPositionServiceImpl implements OlderPositionService {
    @Autowired
    OlderPositionMapper olderPositionMapper;
    @Override
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public int insert(OlderPosition olderPosition) {
        return olderPositionMapper.insert(olderPosition);
    }

    @Override
    public List<String> findAdress() {
        return olderPositionMapper.findAdress();
    }

    @Override
    public List<String> findRoomByAdress(String adress) {
        return olderPositionMapper.findRoomByAdress(adress);
    }

    @Override
    public List<String> findEmptyBedByAdressAndRoom(String adress, String room) {
        return olderPositionMapper.findEmptyBedByAdressAndRoom(adress,room);
    }
}

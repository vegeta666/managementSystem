package com.duan.system.service.impl;

import com.duan.system.dao.OlderPositionMapper;
import com.duan.system.pojo.OlderPosition;
import com.duan.system.service.OlderPositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OlderPositionServiceImpl implements OlderPositionService {
    @Autowired
    OlderPositionMapper olderPositionMapper;
    @Override
    public int insert(OlderPosition olderPosition) {
        return olderPositionMapper.insert(olderPosition);
    }
}

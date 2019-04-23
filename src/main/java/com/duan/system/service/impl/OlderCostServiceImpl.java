package com.duan.system.service.impl;

import com.duan.system.dao.OlderCostMapper;
import com.duan.system.pojo.OlderCost;
import com.duan.system.service.OlderCostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OlderCostServiceImpl implements OlderCostService {
    @Autowired
    OlderCostMapper olderCostMapper;
    @Override
    public int insert(OlderCost olderCost) {
        return olderCostMapper.insert(olderCost);
    }
}

package com.duan.system.service.impl;

import com.duan.system.dao.OlderCostMapper;
import com.duan.system.pojo.OlderCost;
import com.duan.system.service.OlderCostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OlderCostServiceImpl implements OlderCostService {
    @Autowired
    OlderCostMapper olderCostMapper;
    @Override
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public int insert(OlderCost olderCost) {
        return olderCostMapper.insert(olderCost);
    }
}

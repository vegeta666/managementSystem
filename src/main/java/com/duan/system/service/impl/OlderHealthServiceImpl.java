package com.duan.system.service.impl;

import com.duan.system.dao.OlderHealthMapper;
import com.duan.system.pojo.OlderHealth;
import com.duan.system.service.OlderHealthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OlderHealthServiceImpl implements OlderHealthService {
    @Autowired
    OlderHealthMapper olderHealthMapper;
    @Override
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public int insert(OlderHealth olderHealth) {
        return olderHealthMapper.insert(olderHealth);
    }
}

package com.duan.system.service.impl;

import com.duan.system.dao.OlderHealthMapper;
import com.duan.system.pojo.OlderHealth;
import com.duan.system.service.OlderHealthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OlderHealthServiceImpl implements OlderHealthService {
    @Autowired
    OlderHealthMapper olderHealthMapper;
    @Override
    public int insert(OlderHealth olderHealth) {
        return olderHealthMapper.insert(olderHealth);
    }
}

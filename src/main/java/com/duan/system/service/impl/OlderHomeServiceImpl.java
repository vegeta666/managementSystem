package com.duan.system.service.impl;

import com.duan.system.dao.OlderHomeMapper;
import com.duan.system.pojo.OlderHome;
import com.duan.system.service.OlderHomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OlderHomeServiceImpl implements OlderHomeService {
    @Autowired
    OlderHomeMapper olderHomeMapper;
    @Override
    public int insert(OlderHome olderHome) {
        return olderHomeMapper.insert(olderHome);
    }
}

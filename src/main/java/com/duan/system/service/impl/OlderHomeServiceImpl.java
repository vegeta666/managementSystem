package com.duan.system.service.impl;

import com.duan.system.dao.OlderHomeMapper;
import com.duan.system.pojo.OlderHome;
import com.duan.system.service.OlderHomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OlderHomeServiceImpl implements OlderHomeService {
    @Autowired
    OlderHomeMapper olderHomeMapper;
    @Override
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public int insert(OlderHome olderHome) {
        return olderHomeMapper.insert(olderHome);
    }
}

package com.duan.system.service.impl;

import com.duan.system.dao.LogMapper;
import com.duan.system.pojo.Log;
import com.duan.system.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
@Service
public class LogServiceImpl implements LogService {
    @Autowired
    LogMapper logMapper;
    @Override
    public boolean addLog(Log log) throws SQLException {
        return logMapper.insert(log) > 0 ? true : false;
    }
}

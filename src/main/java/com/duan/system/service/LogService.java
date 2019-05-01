package com.duan.system.service;

import com.duan.system.pojo.Log;

import java.sql.SQLException;

public interface LogService {
    /**
     * 增加日志
     * @param log
     * @return
     * @throws SQLException
     */
    public boolean addLog(Log log) throws SQLException;
}

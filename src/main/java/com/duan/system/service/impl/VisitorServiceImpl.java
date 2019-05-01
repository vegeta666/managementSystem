package com.duan.system.service.impl;

import com.duan.system.dao.VisitorMapper;
import com.duan.system.pojo.Visitor;
import com.duan.system.service.VisitorService;
import com.duan.system.utils.PageBean;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VisitorServiceImpl implements VisitorService {
    @Autowired
    VisitorMapper visitorMapper;
    @Override
    public PageBean findAll(int pageCode, int pageSize) {
        PageHelper.startPage(pageCode,pageSize);
        Page<Visitor> page = visitorMapper.selectAll();

        return new PageBean(page.getTotal(),page.getResult());

    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public int insert(Visitor visitor) {
        return visitorMapper.insert(visitor);
    }

    @Override
    public PageBean findByOlderNameAndOperator(int pageCode, int pageSize, String oldername, String operator) {
        PageHelper.startPage(pageCode,pageSize);
        Page<Visitor> page = visitorMapper.selectByOldNameAndOperator(oldername,operator);
        return new PageBean(page.getTotal(),page.getResult());
    }
}

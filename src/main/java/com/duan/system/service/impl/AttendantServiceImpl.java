package com.duan.system.service.impl;

import com.duan.system.dao.AttendantMapper;
import com.duan.system.pojo.Attendant;
import com.duan.system.pojo.Older_Attendant;
import com.duan.system.service.AttendantService;
import com.duan.system.utils.PageBean;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AttendantServiceImpl implements AttendantService {
    @Autowired
    AttendantMapper attendantMapper;
    @Override
    public PageBean findAll(int pageCode, int pageSize) {
        PageHelper.startPage(pageCode,pageSize);

        Page<Attendant> page = attendantMapper.findAll();

        return new PageBean(page.getTotal(),page.getResult());
    }

    @Override
    public PageBean findAByGradeAndStatus(int pageCode, int pageSize, String grade, String status) {
        PageHelper.startPage(pageCode,pageSize);

        Page<Attendant> page = attendantMapper.findAByGradeAndStatus(grade, status);

        return new PageBean(page.getTotal(),page.getResult());
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public int insert(Attendant attendant) {
        return attendantMapper.insert(attendant);
    }

    @Override
    public List<String> findNameByGrade(String grade) {
        return attendantMapper.findNameByGrade(grade);
    }

    @Override
    public int findIdByName(String name) {
        return attendantMapper.findIdByName(name);
    }
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    @Override
    public int insertO_A(Older_Attendant older_attendant) {
        return attendantMapper.insertConnect(older_attendant);
    }
}

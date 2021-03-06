package com.duan.system.service.impl;

import com.duan.system.dao.VolunteerMapper;
import com.duan.system.pojo.Volunteer;
import com.duan.system.service.VolunteerService;
import com.duan.system.utils.PageBean;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VolunteerServiceImpl implements VolunteerService {
    @Autowired
    VolunteerMapper volunteerMapper;
    @Override
    public PageBean findAll(int pageCode, int pageSize) {
        PageHelper.startPage(pageCode,pageSize);
        Page<Volunteer> page = volunteerMapper.selectAll();

        return new PageBean(page.getTotal(),page.getResult());
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public int insert(Volunteer volunteer) {
        return volunteerMapper.insert(volunteer);
    }

    @Override
    public PageBean findByNameAndTeam(int pageCode, int pageSize, String name, String team) {
        PageHelper.startPage(pageCode,pageSize);
        Page<Volunteer> page = volunteerMapper.selectByNameAndTeam(name,team);

        return new PageBean(page.getTotal(),page.getResult());
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public int updateById(Volunteer volunteer) {
        return volunteerMapper.updateById(volunteer);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public int deleteById(int id) {
        return volunteerMapper.deleteById(id);
    }
}

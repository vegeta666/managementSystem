package com.duan.system.service.impl;

import com.duan.system.dao.OlderMapper;
import com.duan.system.pojo.Older;
import com.duan.system.service.OlderService;
import com.duan.system.utils.PageBean;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OlderServiceImpl implements OlderService {
    @Autowired
    OlderMapper olderMapper;
    @Override
    public PageBean findAll(int pageCode, int pageSize) {
        PageHelper.startPage(pageCode,pageSize);

        Page<Older> page = olderMapper.findAll();

        return new PageBean(page.getTotal(),page.getResult());
    }

    @Override
    public List<String> findAllName() {
        return olderMapper.findAllName();
    }

    @Override
    public int findIdByCard(String idcard) {
        return olderMapper.selectIdByCard(idcard);
    }

    @Override
    public int insert(Older older) {
        return olderMapper.insert(older);
    }
}

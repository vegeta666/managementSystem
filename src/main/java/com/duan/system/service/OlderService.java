package com.duan.system.service;

import com.duan.system.pojo.Older;
import com.duan.system.utils.PageBean;

import java.util.List;

public interface OlderService {
    PageBean findAll(int pageCode, int pageSize);
    List<String> findAllName();
    int findIdByCard(String idcard);
    int insert(Older older);
    PageBean findOByName(int pageCode,int pageSize,String name);
}

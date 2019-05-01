package com.duan.system.dao;

import com.duan.system.pojo.Older;
import com.github.pagehelper.Page;

import java.util.List;

public interface OlderMapper {
    Page<Older> findAll();
    List<String> findAllName();
    int insert(Older older);
    int selectIdByCard(String idcard);
    Page<Older> findOByName(String name);
}

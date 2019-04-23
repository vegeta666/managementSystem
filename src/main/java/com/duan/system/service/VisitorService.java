package com.duan.system.service;

import com.duan.system.pojo.Visitor;
import com.duan.system.utils.PageBean;

public interface VisitorService {

    PageBean findAll(int pageCode,int pageSize);

    int insert(Visitor visitor);

    PageBean findByOlderNameAndOperator(int pageCode,int pageSize,String oldername,String operator);
}

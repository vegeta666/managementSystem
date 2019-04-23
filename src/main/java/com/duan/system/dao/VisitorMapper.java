package com.duan.system.dao;

import com.duan.system.pojo.Visitor;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Param;

public interface VisitorMapper {
    Page<Visitor> selectAll();

    int insert(Visitor visitor);

    Page<Visitor> selectByOldNameAndOperator(@Param("oldername") String oldername, @Param("operator") String operator);
}

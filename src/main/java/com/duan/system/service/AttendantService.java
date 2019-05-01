package com.duan.system.service;

import com.duan.system.pojo.Attendant;
import com.duan.system.pojo.Older_Attendant;
import com.duan.system.utils.PageBean;

import java.util.List;

public interface AttendantService {
    PageBean findAll(int pageCode, int pageSize);

    PageBean findAByGradeAndStatus(int pageCode,int pageSize,String grade,String status);

    int insert(Attendant attendant);

    List<String> findNameByGrade(String grade);

    int findIdByName(String name);

    int insertO_A(Older_Attendant older_attendant);
}

package com.duan.system.service;

import com.duan.system.pojo.Volunteer;
import com.duan.system.utils.PageBean;

public interface VolunteerService {
    PageBean findAll(int pageCode,int pageSize);

    int insert(Volunteer volunteer);

    PageBean findByNameAndTeam(int pageCode,int pageSize,String name,String team);

    int updateById(Volunteer volunteer);

    int deleteById(int id);


}

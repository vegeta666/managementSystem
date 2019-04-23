package com.duan.system.dao;

import com.duan.system.pojo.Volunteer;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Param;

public interface VolunteerMapper {
    Page<Volunteer> selectAll();

    int insert(Volunteer volunteer);

    Page<Volunteer> selectByNameAndTeam(@Param("name") String name,@Param("team") String team);

    int updateById(Volunteer volunteer);

    int deleteById(int id);
}

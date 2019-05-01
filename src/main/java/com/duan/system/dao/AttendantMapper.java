package com.duan.system.dao;

import com.duan.system.pojo.Attendant;
import com.duan.system.pojo.Older_Attendant;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AttendantMapper {
    Page<Attendant> findAll();

    Page<Attendant> findAByGradeAndStatus(@Param("grade") String grade,@Param("status") String status);

    int insert(Attendant attendant);

    List<String> findNameByGrade(String grade);

    int insertConnect(Older_Attendant older_attendant);

    int findIdByName(String name);
}

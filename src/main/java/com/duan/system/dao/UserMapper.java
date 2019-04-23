package com.duan.system.dao;

import com.duan.system.pojo.User;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserMapper {


    Page<User> selectAll();

    User selectByUsername(String username);

    int updateDisplayNameById(@Param("displayname") String dispalyname,@Param("password") String password,@Param("id") int id);

    int deleteById(int id);

    String selectSuperPwdById(int id);

    int insert(User user);

    Page<User> selectByDisplayName(@Param("displayname") String displayname);

    List<String> selectUserList();
}

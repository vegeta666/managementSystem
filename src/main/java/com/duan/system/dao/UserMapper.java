package com.duan.system.dao;

import com.duan.system.pojo.User;

import java.util.List;

public interface UserMapper {


    List<User> selectAll();

    User selectByUsername(String username);

}

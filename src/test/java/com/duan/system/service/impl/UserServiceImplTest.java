package com.duan.system.service.impl;

import com.duan.system.pojo.User;
import com.duan.system.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import java.io.IOException;
import java.util.List;

@WebAppConfiguration
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath*:spring/spring-*.xml")
public class UserServiceImplTest {
    @Autowired
   private  UserService userService;
    @Test
    public void findAll() {
        List<User> userList = userService.findAll();
        ObjectMapper mapper = new ObjectMapper();
        for(User user : userList){
            System.out.println(user);
            String userString = null;
            try {
                userString = mapper.writeValueAsString(user);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
            try {
                JsonNode nodeUser = mapper.readTree(userString);
                System.out.println(nodeUser.get("createtime"));
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
    }
}
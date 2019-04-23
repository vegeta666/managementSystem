package com.duan.system.pojo;

import lombok.Data;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
@Data
@ToString
public class User {
    private int id;

    private String username;

    private String displayname;

    private String userpassword;

    private String createby;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createtime;

}

package com.duan.system.pojo;

import lombok.Data;
import lombok.ToString;

import java.util.Date;
@Data
@ToString
public class User {
    private Long id;

    private String username;

    private String displayname;

    private String userpassword;

    private Long createby;

    private Date createtime;

}

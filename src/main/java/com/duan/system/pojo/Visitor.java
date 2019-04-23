package com.duan.system.pojo;

import lombok.Data;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
@Data
@ToString
public class Visitor {
    private int id;
    private String name;
    private String phone;
    private String oldername;
    private String idcard;
    private String relationship;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date vtime;
    private String operator;
}

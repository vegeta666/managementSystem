package com.duan.system.pojo;

import lombok.Data;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
@Data
@ToString
public class Volunteer {
    private int id;
    private String name;
    private String team;
    private String phone;
    private String target;
    private String head;
    private int count;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date starttime;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date endtime;
    private String task;
}

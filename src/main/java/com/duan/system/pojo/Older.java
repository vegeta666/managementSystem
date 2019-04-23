package com.duan.system.pojo;

import lombok.Data;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@ToString
@Data
public class Older {
    private int id;
    private String name;
    private int gender;
    private String idcard;
    private String hospital;
    private String doctor;
    private String doctornum;
    private String home;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date adddate;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date birthday;
    private String phone;
}

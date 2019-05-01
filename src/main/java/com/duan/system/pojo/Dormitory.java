package com.duan.system.pojo;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class Dormitory {
    private int id;
    private String adress;
    private String room;
    private String bed;
    private int status;
    private int olderid;
}

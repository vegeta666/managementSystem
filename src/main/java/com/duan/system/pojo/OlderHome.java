package com.duan.system.pojo;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class OlderHome {
    private int id;
    private int olderid;
    private String main;
    private String mainNum;
    private String mainRelationship;
    private String second;
    private String secondNum;
    private String secondRelationship;
}

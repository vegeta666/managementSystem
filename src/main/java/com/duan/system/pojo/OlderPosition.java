package com.duan.system.pojo;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class OlderPosition {
    private int id;
    private String address;
    private String room;
    private String bed;
    private int status;
    private int olderid;
}

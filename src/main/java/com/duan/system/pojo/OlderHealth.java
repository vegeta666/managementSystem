package com.duan.system.pojo;

import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class OlderHealth {
    private int id;
    private int olderid;
    private String status;
    private String medhistory;
    private String attention;
    private String hobby;
}

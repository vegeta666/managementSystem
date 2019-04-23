package com.duan.system.pojo;

import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class OlderCost {
    private int id;
    private int olderid;
    private int shouldCost;
    private int actualCost;
    private int arrears;
}

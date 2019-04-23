package com.duan.system.utils;

import lombok.Data;
import lombok.ToString;

import java.util.List;
@ToString
@Data
public class PageBean{
    //当前页
    private long total;
    //当前页记录
    private List rows;

    public PageBean(long total, List<?> result) {
        this.total = total;
        this.rows = result;
    }


}

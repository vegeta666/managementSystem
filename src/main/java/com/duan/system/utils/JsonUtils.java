package com.duan.system.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtils {
    public static String JsontoString(PageBean pageBean){
        ObjectMapper mapper = new ObjectMapper();
        String resString = null;
        try{
            resString = mapper.writeValueAsString(pageBean);
        }catch (JsonProcessingException e){
            e.printStackTrace();
        }
        return  resString;
    }


}

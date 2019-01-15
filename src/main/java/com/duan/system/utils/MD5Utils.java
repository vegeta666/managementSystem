package com.duan.system.utils;

import org.springframework.util.DigestUtils;

/*
*使用MD5方式对密码加密
*
* */
public class MD5Utils {

    /*复杂字符串*/
    private static final String SALT = "naniquwuguana^2389";

    public static String getMD5(String password){
        String base = password + "/" + SALT;
        String passwdMD5 = DigestUtils.md5DigestAsHex(base.getBytes());
        return passwdMD5;


    }
}

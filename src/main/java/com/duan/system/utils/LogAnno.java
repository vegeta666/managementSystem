package com.duan.system.utils;

import java.lang.annotation.*;

/**
 * 日志注解
 *
 * @author
 *
 */
@Target(ElementType.METHOD) // 方法注解
@Retention(RetentionPolicy.RUNTIME) // 运行时可见
@Documented
public @interface LogAnno {
    String operateType();// 记录日志的操作类型
}

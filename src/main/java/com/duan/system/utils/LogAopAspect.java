package com.duan.system.utils;

import com.duan.system.pojo.Log;
import com.duan.system.pojo.User;
import com.duan.system.service.LogService;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.sql.SQLException;


@Aspect
@Service
public class LogAopAspect {
    @Autowired
    LogService logService;
    @Autowired
    private HttpSession session;
    @Pointcut(value = "execution(* com.duan.system.service.*.*(..))")
    public void pc() {
    }
    @Around("LogAopAspect.pc() && @annotation(logAnno)")
    public Object aroundAdvice(ProceedingJoinPoint pjp,LogAnno logAnno) throws Throwable {
        User user = (User) session.getAttribute("user");
        String operateType = logAnno.operateType();
        //System.out.println(operateType);
        Log log = new Log();
        log.setOperator(user.getDisplayname());
        log.setOperatetype(operateType);
        Object result = null;
        try {
            result = pjp.proceed();
            log.setOperateresult("正常");// 设置操作结果
        }catch (SQLException e){
            log.setOperateresult("失败");
        }finally {

            log.setDate(new java.util.Date());// 设置操作日期
            logService.addLog(log);// 添加日志记录
        }
        return result;
    }

}

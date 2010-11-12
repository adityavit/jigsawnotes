package controllers;

import play.mvc.Controller;
import play.data.validation.Required;
import models.*;

public class UserController extends Application {
    
    public static void login(String userNameOrEmail,String password){
        User user = User.validateUser(userNameOrEmail,password);
        if(user != null){
            session.put("userName", user.userName);
            flash.success("Welcome, ", user.userName);
            DeskController.userDesk();
            //render("@Application.deskScreen",user);
        }else{
            flash.error("Login Failed");
            Application.index();
        }
    }
    
    public static void logout() {
        session.clear();
        Application.index();
    }
    
}

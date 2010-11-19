package controllers;

import play.mvc.Controller;
import play.data.validation.Required;
import play.data.validation.Valid;
import models.*;

public class UserController extends Application {
    
    public static void login(String userNameOrEmail,String password){
        User user = User.validateUser(userNameOrEmail,password);
        if(user != null){
            session.put("userName", user.userName);
            flash.success("Welcome, ", user.userName);
            DeskController.userDesk();
        }else{
            flash.error("Login Failed");
            Application.index();
        }
    }
    
    public static void logout() {
        session.clear();
        Application.index();
    }
    
    public static void userRegister(@Valid User user, String verifyPassword){
        validation.required(verifyPassword);
        validation.equals(verifyPassword, user.password).message("Your password doesn't match");
        if(validation.hasErrors()) {
            render("@userRegister", user, verifyPassword);
        }
        User newUser = new User(user.email,user.password,user.userName);
        newUser.persistNewUser();
        session.put("userName", newUser.userName);
        flash.success("Welcome, " + newUser.userName);
        DeskController.userDesk();
    }
    
}

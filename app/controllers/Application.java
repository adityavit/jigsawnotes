package controllers;

import play.data.validation.Required;
import play.mvc.*;
import models.*;

public class Application extends Controller {

    public static void index() {
        render();
    }
    
    public static void deskScreen(){
        String userName = session.get("user");
        User user = User.getUser(userName);
        if(user == null){
            System.out.println("user object present");
        }
        render(user);
    }

}
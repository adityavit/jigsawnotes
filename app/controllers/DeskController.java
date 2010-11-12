package controllers;

import models.User;
import play.mvc.Before;

public class DeskController extends Application {
    
    @Before
    static void checkUser() {
        if(connected() == null) {
            flash.error("Please log in first");
            Application.index();
        }
    }
    
    public static void userDesk(){
        User user = connected();
        if(user==null){
            Application.index();
        }
        render(user);
    }
    
    
}

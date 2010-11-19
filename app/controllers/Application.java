package controllers;

import play.data.validation.Required;
import play.mvc.*;
import models.*;

public class Application extends Controller {
    
    /**
     * Checks for the User in the session if available places it in the Template HashMap.
     */
    @Before
    static void addUser() {
        User user = connected();
        if(user != null) {
            renderArgs.put("user", user);
        }
    }
    /**
     * Is connection Method to return the Authenticated User.Else If there is no user in the session will return null.
     * @return Authenticated User Object.
     */
    static User connected() {
        if(renderArgs.get("user") != null) {
            return renderArgs.get("user", User.class);
        }
        String userName = session.get("userName");
        if(userName != null) {
            return User.getUser(userName);
        } 
        return null;
    }
    
    public static void index() {
    	if(connected()==null){
          render();
    	}else{
    	  DeskController.userDesk();
    	}
    }
    

}
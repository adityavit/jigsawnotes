package controllers;

import models.*;
import play.mvc.Before;
import com.google.gson.*;


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
    
    public static void deskData(){
        User user = connected();
        if(user != null){
            renderJSON(user.getDesksJsonObj());
        }else{
            Application.index();
        }
    }
    
    public static void deskNotesData(Long id) {
        User user = connected();
        if (id == null) {
          
        } else {
            if (user != null) {
                Desk requestedDesk = Desk.find("deskUser = ? and id = ?", user, id).first();
                renderJSON(requestedDesk.getDeskNoteData());
            } else {
                Application.index();
            }
        }

    }
    
    
}

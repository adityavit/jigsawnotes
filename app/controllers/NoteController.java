package controllers;

import play.mvc.Controller;
import models.*;
import play.mvc.Before;

public class NoteController extends Application {

    @Before
    static void checkUser() {
        if (connected() == null) {
            flash.error("Please log in first");
            Application.index();
        }
    }

    public static void addNewNote(Long id) {
        User user = connected();
        if (id == null) {

        } else {
            if (user != null) {
                Desk selectedDesk = Desk.find("deskUser = ? and id = ?", user, id).first();
                renderJSON(selectedDesk.addNewDeskNote());
            }
        }
    }
}

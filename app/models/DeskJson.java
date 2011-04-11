package models;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class DeskJson {

     public String deskName;
     public String deskId;
     public String deskDescription;
     public ArrayList<NoteJson> deskNotes;
     public NoteJson deskNote;
     
     public DeskJson(Desk userDesk){
         this.deskName = userDesk.deskName;
         this.deskId = userDesk.id.toString();
         this.deskDescription = userDesk.deskDescription;
     }
     
     public DeskJson(Desk selectDeskObj,List <Note> deskNotes){
         this.deskId = selectDeskObj.id.toString();
         ArrayList <NoteJson> notesJsonObj = new ArrayList();
         Iterator <Note> noteItr = deskNotes.iterator();
         while(noteItr.hasNext()){
             NoteJson noteJsonObj = new NoteJson(noteItr.next());
             notesJsonObj.add(noteJsonObj);
         }
         this.deskNotes = notesJsonObj;
     }
     
     public DeskJson(Desk selectDeskObj, Note deskNote) {
        this.deskId = selectDeskObj.id.toString();
        NoteJson noteJsonObj = new NoteJson(deskNote);
        this.deskNote = noteJsonObj;
    }
}

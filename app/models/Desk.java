package models;

import play.db.jpa.Model;
import java.util.*;

import javax.persistence.*;

@Entity
public class Desk extends Model {
    
    public String deskName;
    
    @ManyToOne
    public User deskUser;
    
    public String deskDescription;
    
    @OneToMany(mappedBy="noteDesk",cascade=CascadeType.ALL)
    public List<Note> notes;
    
    private String defaultDeskName = "My Desk";
    private String defaultDeskDesc = "Private Desk to add Your Notes";
    
    public Desk(String deskName,User deskUser,String deskDesc){
        this.notes = new ArrayList<Note>();
        this.deskName = (deskName!=null)?deskName:defaultDeskName;
        this.deskUser = deskUser;
        this.deskDescription = (deskDesc!=null)?deskDesc:defaultDeskDesc;
    }
    
    public void addDeskNote(String title,String noteBody){
        Note newNote = new Note(title,noteBody,this);
        this.notes.add(newNote);
        this.save();
    }
}

package models;

import play.db.jpa.Model;
import java.util.*;
import javax.persistence.*;

@Entity
public class Note extends Model {
    
    public String title;
    
    @Lob
    public String noteBody;
    
    public Date noteTimeStamp;
    
    @ManyToOne
    public Desk noteDesk;
    
    public Note(String title,String noteBody,Desk noteDesk){
        this.title = title;
        this.noteBody = noteBody;
        this.noteTimeStamp = new Date();
        this.noteDesk = noteDesk;
    }
}

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

    public Integer noteTop;

    public Integer noteLeft;

    public Integer height;

    public Integer width;
    
    @Transient
    private static Integer noteDefaultHeight = 250;

    @Transient
    private static Integer noteDefaultWidth = 200;

    @ManyToOne
    public Desk noteDesk;

    public Note(String title, String noteBody, Desk noteDesk, Integer noteTop,
            Integer noteLeft, Integer height, Integer width) {
        this.title = title;
        this.noteBody = noteBody;
        this.noteTimeStamp = new Date();
        this.noteDesk = noteDesk;
        this.noteLeft = noteLeft;
        this.noteTop = noteTop;
        if (height == null) {
            this.height = Note.noteDefaultHeight;
        } else {
            this.height = height;
        }

        if (width == null) {
            this.width = Note.noteDefaultWidth;
        } else {
            this.width = width;
        }

    }

    public Note(String title, String noteBody, Desk noteDesk) {
        this.title = title;
        this.noteBody = noteBody;
        this.noteTimeStamp = new Date();
        this.noteDesk = noteDesk;
    }
    
    public Note(Desk noteDesk){
        this.noteDesk = noteDesk;
        this.noteTimeStamp = new Date();
    }
    
    public void updateNotePosition(Integer noteLeft, Integer noteTop,
            Integer height, Integer width) {
        this.noteLeft = noteLeft;
        this.noteTop = noteTop;
        this.height = height;
        this.width = width;
    }
}
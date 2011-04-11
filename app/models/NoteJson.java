package models;
import java.util.*;

public class NoteJson {
    
    public String id;

    public String title;

    public String body;

    public String timeStamp;

    public String position;

    public String dimension;

    public NoteJson(Note note){
        this.id = note.id.toString();
        this.title = note.title;
        this.body = note.noteBody;
        setTimeStamp(note.noteTimeStamp);
        setDimension(note.height,note.width);
        setPosition(note.noteTop,note.noteLeft);
    }
    
    private void setTimeStamp(Date noteTimeStamp){
        if(noteTimeStamp != null){
            this.timeStamp = noteTimeStamp.toString();
        }else{
            this.timeStamp = null;
        }
    }
    
    private void setDimension(Integer height,Integer width){
        if(height != null){
            this.dimension = height.toString() + ":";
        }else{
            this.dimension = "0:";
        }
        if(width != null){
            this.dimension = this.dimension + width.toString();
        }else{
            this.dimension = this.dimension + "0";
        }
    }
    
    private void setPosition(Integer top, Integer left){
        if(top != null){
            this.position = top.toString() + ":";
        }else{
            this.position = "0:";
        }
        if(left != null){
            this.position = this.position + left.toString();
        }else{
            this.position = this.position + "0";
        }
    }

}
